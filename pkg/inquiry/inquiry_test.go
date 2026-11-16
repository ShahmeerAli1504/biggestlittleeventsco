package inquiry

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func f(n, v string) Field { return Field{Name: n, Value: v} }

func TestValidate(t *testing.T) {
	ok := Request{Kind: "event", Fields: []Field{
		f("Full Name", "Jane Doe"), f("Email", "jane@example.com"), f("Event Date", "2027-06-12"),
		f("Event Profile", "Wedding"), f("Services", "Tables & Chairs Rentals"), f("Injected", "x"),
	}}
	sub, err := Validate(ok)
	if err != nil {
		t.Fatalf("expected valid, got %v", err)
	}
	if sub.Get("Injected") != "" {
		t.Error("unknown fields must be dropped")
	}

	cases := map[string]Request{
		"unknown kind":    {Kind: "nope"},
		"missing service": {Kind: "event", Fields: ok.Fields[:4]},
		"bad email":       {Kind: "contact", Fields: []Field{f("Full Name", "A"), f("Email", "a@b.com\r\nBcc: x@y.z"), f("Message", "hi")}},
		"bad date":        {Kind: "dj", Fields: []Field{f("Full Name", "A"), f("Email", "a@b.com"), f("Phone", "1"), f("Event Type", "Baraat"), f("Event Date", "soon"), f("Venue", "Reno")}},
	}
	for name, req := range cases {
		if _, err := Validate(req); err == nil {
			t.Errorf("%s: expected error", name)
		}
	}
}

func TestRenderEscapesHTML(t *testing.T) {
	sub, err := Validate(Request{Kind: "contact", Fields: []Field{
		f("Full Name", "Eve"), f("Email", "eve@example.com"), f("Message", "<script>alert(1)</script>"),
	}})
	if err != nil {
		t.Fatal(err)
	}
	n := RenderNotification(sub)
	if strings.Contains(n.HTML, "<script>") {
		t.Error("HTML body must escape user input")
	}
	if !strings.Contains(n.Subject, "Website Message — Eve") {
		t.Errorf("unexpected subject %q", n.Subject)
	}
	a := RenderAutoresponse(sub)
	if !strings.Contains(a.Text, "Hi Eve") {
		t.Errorf("autoresponse should greet by first name: %q", a.Text)
	}
}

func TestHandlerRejectsAndHoneypot(t *testing.T) {
	// Wrong method
	rec := httptest.NewRecorder()
	Handler(rec, httptest.NewRequest(http.MethodGet, "/api/inquiry", nil))
	if rec.Code != http.StatusMethodNotAllowed {
		t.Errorf("GET: got %d", rec.Code)
	}

	// Honeypot filled → silent success, nothing sent (no SMTP env needed).
	rec = httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/inquiry", strings.NewReader(`{"kind":"contact","website":"spam","fields":[]}`))
	req.Header.Set("Content-Type", "application/json")
	Handler(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("honeypot: got %d", rec.Code)
	}

	// Validation error → 422
	rec = httptest.NewRecorder()
	req = httptest.NewRequest(http.MethodPost, "/api/inquiry", strings.NewReader(`{"kind":"contact","elapsedMs":5000,"fields":[{"name":"Full Name","value":"A"}]}`))
	req.Header.Set("Content-Type", "application/json")
	Handler(rec, req)
	if rec.Code != http.StatusUnprocessableEntity {
		t.Errorf("invalid: got %d", rec.Code)
	}
}
