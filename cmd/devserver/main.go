// Local development server for the Go API.
//
// On Vercel each file in /api runs as its own serverless function. Locally,
// this binary mounts the same handlers on :8080 and `next dev` proxies /api/*
// to it (see next.config.ts). Run with:  npm run dev:api
package main

import (
	"bufio"
	"log"
	"net/http"
	"os"
	"strings"

	"biggestlittleeventsco/pkg/inquiry"
)

func main() {
	loadEnv(".env.local")
	loadEnv(".env")

	mux := http.NewServeMux()
	mux.HandleFunc("/api/inquiry", inquiry.Handler)
	mux.HandleFunc("/api/health", inquiry.Health)

	addr := ":" + envOr("API_PORT", "8080")
	log.Printf("Go API listening on http://127.0.0.1%s (routes: /api/inquiry, /api/health)", addr)
	log.Fatal(http.ListenAndServe(addr, logRequests(mux)))
}

func logRequests(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		h.ServeHTTP(w, r)
	})
}

// loadEnv reads KEY=VALUE lines; variables already set in the shell win.
func loadEnv(path string) {
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()
	s := bufio.NewScanner(f)
	for s.Scan() {
		line := strings.TrimSpace(s.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		k = strings.TrimSpace(k)
		v = strings.Trim(strings.TrimSpace(v), `"'`)
		if _, exists := os.LookupEnv(k); !exists {
			os.Setenv(k, v)
		}
	}
}

func envOr(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}
