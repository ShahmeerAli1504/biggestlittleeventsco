package inquiry

import (
	"encoding/json"
	"net/http"

	"biggestlittleeventsco/pkg/mailer"
)

// Health is GET /api/health — a quick deployment check.
func Health(w http.ResponseWriter, r *http.Request) {
	_, err := mailer.FromEnv()
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":               err == nil,
		"emailConfigured":  err == nil,
		"autoresponse":     autoresponseEnabled(),
		"notifyRecipients": len(recipients("x")),
	})
}
