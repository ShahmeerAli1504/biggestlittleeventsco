// Vercel Go serverless function: POST /api/inquiry
package handler

import (
	"net/http"

	"biggestlittleeventsco/pkg/inquiry"
)

// Handler is invoked by the Vercel Go runtime for every request to /api/inquiry.
func Handler(w http.ResponseWriter, r *http.Request) {
	inquiry.Handler(w, r)
}
