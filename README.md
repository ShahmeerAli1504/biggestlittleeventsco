# Biggest Little Events Co — Website

Full-stack site for **Biggest Little Events Co** (Reno, NV) — event decor rentals, tables & chairs, professional DJ (DJ Weezy), bartending staffing, catering coordination and VIP Black Table Service.

| Layer    | Tech |
|----------|------|
| Frontend | Next.js (App Router, TypeScript) + Tailwind CSS v4 — pages are statically prerendered |
| Backend  | Go serverless functions in `/api` (Vercel Go runtime) |
| Email    | Gmail SMTP (`smtp.gmail.com:587`, STARTTLS) via Go's standard library — no third-party form service |

## Project layout
```
app/                    Next.js routes: / , /services , /dj , /contact , 404
  globals.css           Tailwind import + brand tokens (@theme) + component styles
components/             Header, Footer, icons, lookbook/lightbox, video reels, contact tabs
components/forms/       LuxForm (validation + submit) and the Event / DJ / Contact forms
lib/site.ts             Public contact details (phone, email, socials)
public/assets/          Images and videos
api/                    Vercel serverless functions (each .go file = one function)
  inquiry.go            POST /api/inquiry  → validates + emails the lead
  health.go             GET  /api/health   → is email configured?
pkg/mailer/             Gmail SMTP client (STARTTLS / TLS, multipart text+HTML)
pkg/inquiry/            Validation, spam checks, email templates, tests
cmd/devserver/          Runs the same Go handlers locally on :8080
```

## How a form submission works
1. Visitor submits a form → browser `POST /api/inquiry` with `{ kind, fields[], website, elapsedMs }`.
2. The Go function drops bots (honeypot field / submitted in < 2 s), validates required fields per form type, and ignores unknown fields.
3. **Lead email** goes to `MAIL_TO` (defaults to the Gmail account) with **Reply-To set to the client**, so hitting *Reply* in Gmail answers them directly.
4. **Instant confirmation ("Email 1")** goes to the client, personalized with their name, event type and date (`SEND_AUTORESPONSE=true`).

## Gmail setup (one time)
1. Use the Gmail / Google Workspace account that should send the mail.
2. Turn on **2-Step Verification** for it.
3. Create an **App Password**: Google Account → Security → 2-Step Verification → *App passwords*. Copy the 16-character code.
4. Set the env vars below. Your normal Google password will not work.

> Gmail allows roughly 500 messages/day on a free account (2,000 on Workspace). Each inquiry sends 2 emails.

## Environment variables
See [.env.example](.env.example). Required:

| Variable | Example | Notes |
|---|---|---|
| `GMAIL_USER` | `bookings@gmail.com` | Sending account |
| `GMAIL_APP_PASSWORD` | `abcd efgh ijkl mnop` | App Password (spaces optional) |

Optional: `MAIL_TO` (comma-separated inboxes), `MAIL_FROM_NAME`, `SEND_AUTORESPONSE`, `ALLOWED_ORIGINS`, `SMTP_HOST`, `SMTP_PORT`, and the public `NEXT_PUBLIC_*` contact details (empty values are hidden on the site).

## Local development
Requires Node 20+ and Go 1.22+.
```bash
npm install
cp .env.example .env.local      # then fill in GMAIL_USER / GMAIL_APP_PASSWORD
npm run dev:api                 # terminal 1 — Go API on :8080
npm run dev                     # terminal 2 — Next.js on :3000 (proxies /api/* to Go)
```
Check `http://localhost:3000/api/health` → `"emailConfigured": true`.

Tests & checks:
```bash
npm run test:api     # go test ./...
npm run typecheck
npm run build
```

## Deploy (Vercel)
1. Import the repo in Vercel — framework is detected as **Next.js**; the Go files in `/api` are built automatically as serverless functions.
2. Add the environment variables (Production + Preview).
3. Deploy, then open `/api/health` and submit a test inquiry.

Old `.html` URLs (`/services.html`, `/dj.html`, `/contact.html`) permanently redirect to the new routes.

**Email 2 (48-hour nudge)** still needs a scheduler — paste it into a Gmail template or your email tool:

> Hi [Client Name], I have put the finishing touches on your custom event proposal for your [Event Type] on [Event Date]. Weekend slots fill incredibly fast. To ensure we match your timeline perfectly, which element is your absolute main priority right now? The Aesthetics, The Energy, or The Experience? Reply directly or let's jump on a quick 10-minute call.

## Brand
- Colors: black lacquer `#0a0908`, charcoal `#14120f`, ivory marble `#efe9de`, metallic gold `#c9a45c` (gradient in `--gold-grad`) — available as Tailwind colors (`bg-ink`, `text-gold`, `text-gold-2`, …)
- Fonts (via `next/font`): Cinzel (`font-display`), Cormorant Garamond (`font-serif`), Jost (`font-sans`)
