package inquiry

import (
	"bytes"
	"fmt"
	"html/template"
	"strings"
	"time"
)

// Rendered is a ready-to-send email.
type Rendered struct {
	Subject string
	Text    string
	HTML    string
}

func firstName(full string) string {
	if f := strings.Fields(full); len(f) > 0 {
		return f[0]
	}
	return "there"
}

func humanDate(v string) string {
	if t, err := time.Parse("2006-01-02", v); err == nil {
		return t.Format("Monday, January 2, 2006")
	}
	return "your event date"
}

var layout = template.Must(template.New("layout").Parse(`<!doctype html>
<html><body style="margin:0;background:#f7f2e8;font-family:Helvetica,Arial,sans-serif;color:#1c1915">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f2e8;padding:28px 12px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fbf8f2;border:1px solid #e3d6bb">
<tr><td style="background:#0a0908;padding:26px 30px;border-bottom:3px solid #c9a45c">
  <div style="font-family:Georgia,serif;letter-spacing:3px;color:#e3c88a;font-size:18px">BIGGEST LITTLE EVENTS CO</div>
  <div style="font-size:11px;letter-spacing:4px;color:#a99f8e;margin-top:4px">TABLES · CHAIRS · EVENTS · RENO, NV</div>
</td></tr>
<tr><td style="padding:30px">
  {{if .Heading}}<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;margin:0 0 16px;color:#1c1915">{{.Heading}}</h1>{{end}}
  {{range .Paragraphs}}<p style="font-size:15px;line-height:1.6;margin:0 0 14px;color:#3d3830">{{.}}</p>{{end}}
  {{if .Rows}}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px">
    {{range .Rows}}<tr>
      <td style="padding:10px 12px;border:1px solid #e3d6bb;background:#f3ecdf;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8f6b2e;width:34%;vertical-align:top">{{.Name}}</td>
      <td style="padding:10px 12px;border:1px solid #e3d6bb;font-size:15px;white-space:pre-wrap;vertical-align:top">{{.Value}}</td>
    </tr>{{end}}
  </table>{{end}}
  {{if .Footer}}<p style="font-size:13px;color:#8a8174;margin:22px 0 0">{{.Footer}}</p>{{end}}
</td></tr>
</table>
</td></tr></table>
</body></html>`))

type view struct {
	Heading    string
	Paragraphs []string
	Rows       []Field
	Footer     string
}

func render(v view) string {
	var b bytes.Buffer
	if err := layout.Execute(&b, v); err != nil {
		return ""
	}
	return b.String()
}

// RenderNotification builds the lead email sent to the business inbox.
func RenderNotification(s Submission) Rendered {
	name := s.Get("Full Name")
	subject := fmt.Sprintf("New %s — %s", s.Spec.label, name)
	if d := s.Get("Event Date"); d != "" {
		subject += " · " + humanDate(d)
	}

	var text strings.Builder
	fmt.Fprintf(&text, "%s\n\n", s.Spec.label)
	for _, f := range s.Fields {
		fmt.Fprintf(&text, "%s: %s\n", f.Name, f.Value)
	}
	text.WriteString("\nReply to this email to respond to the client directly.\n")

	return Rendered{
		Subject: subject,
		Text:    text.String(),
		HTML: render(view{
			Heading:    "New " + s.Spec.label,
			Paragraphs: []string{"Submitted " + time.Now().UTC().Format("Jan 2, 2006 15:04 MST") + " from the website."},
			Rows:       s.Fields,
			Footer:     "Hit Reply to respond to " + name + " directly.",
		}),
	}
}

// RenderAutoresponse builds the instant "Email 1" confirmation sent to the client.
func RenderAutoresponse(s Submission) Rendered {
	name := firstName(s.Get("Full Name"))
	date := humanDate(s.Get("Event Date"))

	var subject string
	var paras []string
	switch s.Kind {
	case "dj":
		eventType := s.Get("Event Type")
		subject = "Your DJ booking request is secured — Biggest Little Events Co"
		paras = []string{
			"Hi " + name + ",",
			"Thank you for sharing your upcoming timeline! We have officially secured your DJ booking request for your " + eventType + " on " + date + ".",
			"Every proposal we curate is hand-crafted, and we will deliver your custom entertainment blueprint directly to your inbox within 24–48 hours.",
			"Want the complete experience? Ask us about pairing your DJ with our decor rentals, bartending staff, and exclusive VIP Black Table Service.",
		}
	case "contact":
		subject = "We received your message — Biggest Little Events Co"
		paras = []string{
			"Hi " + name + ",",
			"Thank you for reaching out to Biggest Little Events Co! A member of our team will reply personally within 24–48 hours.",
		}
	default:
		eventType := s.Get("Event Profile")
		subject = "Your custom event inquiry is secured — Biggest Little Events Co"
		paras = []string{
			"Hi " + name + ",",
			"Thank you for sharing your upcoming timeline! We have officially secured your custom inquiry form for your " + eventType + " on " + date + ".",
			"Every proposal we curate is hand-crafted, and we will deliver your itemized blueprint directly to your inbox within 24–48 hours.",
			"Want to elevate your head tables to absolute luxury? Ask us about our exclusive VIP Black Table Service with 1 to 2 elite cocktail servers assigned entirely to your VIP circle.",
		}
	}
	paras = append(paras, "— Biggest Little Events Co, Reno NV")

	return Rendered{
		Subject: subject,
		Text:    strings.Join(paras, "\n\n") + "\n",
		HTML: render(view{
			Paragraphs: paras,
			Rows:       s.Fields,
			Footer:     "A copy of the details you shared is above. Just reply to this email if anything changes.",
		}),
	}
}
