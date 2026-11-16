// Vercel Go serverless function: GET /api/health
package handler

import (
	"net/http"

	"biggestlittleeventsco/pkg/inquiry"
)

// Health reports whether email delivery is configured (never exposes secrets).
func Health(w http.ResponseWriter, r *http.Request) {
	inquiry.Health(w, r)
}
