// Package inquiry implements POST /api/inquiry: it validates a website form
// submission, emails it to the business inbox and (optionally) sends the
// client an instant confirmation — all through Gmail SMTP.
package inquiry

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"net/url"
	"os"
	"strings"
	"time"
	"unicode/utf8"

	"biggestlittleeventsco/pkg/mailer"
)

const (
	maxBody     = 64 << 10 // 64 KB
	maxFields   = 40
	maxValueLen = 4000
	minFillTime = 2 * time.Second // faster than this is almost certainly a bot
)

// Field is one form value, kept in the order the visitor saw it.
type Field struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

// Request is the JSON body posted by the website.
type Request struct {
	Kind      string  `json:"kind"`
	Fields    []Field `json:"fields"`
	Website   string  `json:"website"`   // honeypot — humans never fill it
	ElapsedMs int64   `json:"elapsedMs"` // time between page load and submit
}

type kindSpec struct {
	label    string
	required []string
	allowed  []string
}

var common = []string{"Full Name", "Email", "Phone"}

var kinds = map[string]kindSpec{
	"event": {
		label:    "Custom Event Proposal Request",
		required: []string{"Full Name", "Email", "Event Date", "Event Profile", "Services"},
		allowed:  append(append([]string{}, common...), "Event Date", "Event Profile", "Guest Count", "Venue", "Services", "Upgrades", "Vision"),
	},
	"dj": {
		label:    "DJ Booking Request",
		required: []string{"Full Name", "Email", "Phone", "Event Type", "Event Date", "Venue"},
		allowed:  append(append([]string{}, common...), "Event Type", "Event Date", "Start Time", "End Time", "Guest Count", "Venue", "Music Styles", "DJ Add-Ons", "Notes"),
	},
	"contact": {
		label:    "Website Message",
		required: []string{"Full Name", "Email", "Message"},
		allowed:  append(append([]string{}, common...), "Topic", "Message"),
	},
}

// Submission is a validated request.
type Submission struct {
	Kind   string
	Spec   kindSpec
	Fields []Field
}

func (s Submission) Get(name string) string {
	for _, f := range s.Fields {
		if f.Name == name {
			return f.Value
		}
	}
	return ""
}

// Validate cleans the request and reports the first problem found.
func Validate(req Request) (Submission, error) {
	spec, ok := kinds[req.Kind]
	if !ok {
		return Submission{}, errors.New("unknown form type")
	}
	if len(req.Fields) > maxFields {
		return Submission{}, errors.New("too many fields")
	}
	allowed := map[string]bool{}
	for _, n := range spec.allowed {
		allowed[n] = true
	}

	sub := Submission{Kind: req.Kind, Spec: spec}
	seen := map[string]bool{}
	for _, f := range req.Fields {
		name := strings.TrimSpace(f.Name)
		if !allowed[name] || seen[name] {
			continue // ignore anything the site's forms don't send
		}
		val := strings.TrimSpace(f.Value)
		if !utf8.ValidString(val) {
			return Submission{}, fmt.Errorf("%s is not valid text", name)
		}
		if utf8.RuneCountInString(val) > maxValueLen {
			return Submission{}, fmt.Errorf("%s is too long", name)
		}
		if val == "" {
			continue
		}
		seen[name] = true
		sub.Fields = append(sub.Fields, Field{Name: name, Value: val})
	}

	for _, r := range spec.required {
		if sub.Get(r) == "" {
			return Submission{}, fmt.Errorf("%s is required", r)
		}
	}

	email := sub.Get("Email")
	if strings.ContainsAny(email, "\r\n<>,; ") {
		return Submission{}, errors.New("email address is invalid")
	}
	if a, err := mail.ParseAddress(email); err != nil || a.Address != email {
		return Submission{}, errors.New("email address is invalid")
	}
	if strings.ContainsAny(sub.Get("Full Name"), "\r\n") || utf8.RuneCountInString(sub.Get("Full Name")) > 120 {
		return Submission{}, errors.New("name is invalid")
	}
	if d := sub.Get("Event Date"); d != "" {
		if _, err := time.Parse("2006-01-02", d); err != nil {
			return Submission{}, errors.New("event date is invalid")
		}
	}
	return sub, nil
}

type response struct {
	OK    bool   `json:"ok"`
	Error string `json:"error,omitempty"`
}

func writeJSON(w http.ResponseWriter, status int, v response) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// originAllowed rejects cross-site posts when ALLOWED_ORIGINS is configured
// (comma-separated, e.g. "https://biggestlittleeventsco.com,https://www.biggestlittleeventsco.com").
func originAllowed(r *http.Request) bool {
	list := strings.TrimSpace(os.Getenv("ALLOWED_ORIGINS"))
	origin := r.Header.Get("Origin")
	if list == "" || origin == "" {
		return true
	}
	u, err := url.Parse(origin)
	if err != nil {
		return false
	}
	// Same host as the request (covers Vercel preview URLs automatically).
	if u.Host == r.Host {
		return true
	}
	for _, o := range strings.Split(list, ",") {
		if strings.EqualFold(strings.TrimRight(strings.TrimSpace(o), "/"), origin) {
			return true
		}
	}
	return false
}

// Handler is the net/http handler for POST /api/inquiry.
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeJSON(w, http.StatusMethodNotAllowed, response{Error: "method not allowed"})
		return
	}
	if !originAllowed(r) {
		writeJSON(w, http.StatusForbidden, response{Error: "forbidden"})
		return
	}
	if ct := r.Header.Get("Content-Type"); !strings.HasPrefix(ct, "application/json") {
		writeJSON(w, http.StatusUnsupportedMediaType, response{Error: "expected application/json"})
		return
	}

	var req Request
	dec := json.NewDecoder(http.MaxBytesReader(w, r.Body, maxBody))
	if err := dec.Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, response{Error: "invalid request body"})
		return
	}

	// Bots: pretend success so they don't retry, but send nothing.
	if req.Website != "" || (req.ElapsedMs > 0 && time.Duration(req.ElapsedMs)*time.Millisecond < minFillTime) {
		writeJSON(w, http.StatusOK, response{OK: true})
		return
	}

	sub, err := Validate(req)
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, response{Error: err.Error()})
		return
	}

	cfg, err := mailer.FromEnv()
	if err != nil {
		log.Printf("inquiry: %v", err)
		writeJSON(w, http.StatusInternalServerError, response{Error: "email is not configured"})
		return
	}

	notifyTo := recipients(cfg.Username)
	clientAddr := mail.Address{Name: sub.Get("Full Name"), Address: sub.Get("Email")}

	// 1) Lead notification to the business — this one must succeed.
	n := RenderNotification(sub)
	if err := mailer.Send(cfg, mailer.Message{
		To:      notifyTo,
		ReplyTo: clientAddr.String(), // hit "Reply" in Gmail to answer the client directly
		Subject: n.Subject,
		Text:    n.Text,
		HTML:    n.HTML,
	}); err != nil {
		log.Printf("inquiry: notification failed: %v", err)
		writeJSON(w, http.StatusBadGateway, response{Error: "could not send your request, please try again"})
		return
	}

	// 2) Instant confirmation to the client — best effort.
	if autoresponseEnabled() {
		a := RenderAutoresponse(sub)
		if err := mailer.Send(cfg, mailer.Message{
			To:      []string{clientAddr.Address},
			ReplyTo: notifyTo[0],
			Subject: a.Subject,
			Text:    a.Text,
			HTML:    a.HTML,
		}); err != nil {
			log.Printf("inquiry: autoresponse failed: %v", err)
		}
	}

	writeJSON(w, http.StatusOK, response{OK: true})
}

// recipients returns MAIL_TO (comma-separated) or falls back to the Gmail account itself.
func recipients(fallback string) []string {
	var out []string
	for _, a := range strings.Split(os.Getenv("MAIL_TO"), ",") {
		if a = strings.TrimSpace(a); a != "" {
			out = append(out, a)
		}
	}
	if len(out) == 0 {
		out = []string{fallback}
	}
	return out
}

func autoresponseEnabled() bool {
	v := strings.ToLower(strings.TrimSpace(os.Getenv("SEND_AUTORESPONSE")))
	return v == "" || v == "true" || v == "1" || v == "yes"
}
