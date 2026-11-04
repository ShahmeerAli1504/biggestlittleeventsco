# Biggest Little Events Co — Website

Luxury static website for **Biggest Little Events Co** (Reno, NV) — event decor rentals, tables & chairs, professional DJ (DJ Weezy), bartending staffing, catering coordination and VIP Black Table Service.

Pure HTML/CSS/JS — no build step. Deploy straight to Vercel (framework preset: **Other**, root directory `/`).

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Hero, editorial showcase matrix, All-Inclusive Advantage, VIP Black Table Service (dark luxury block), lookbook, "no-prices" value copy, process, FAQ, 6-part inquiry form |
| `services.html` | Deep-dive on every service with CTAs that pre-select the service in the form (`/contact.html?service=decor`) |
| `dj.html` | **Book a DJ** tab — DJ Weezy intro, video reels, SoundCloud, packages (no prices), detailed DJ booking form |
| `contact.html` | Tabbed forms: Event Proposal · Book a DJ (`#dj`) · General Message (`#message`) |
| `404.html` | Branded not-found page |

## Before launch — edit `js/config.js`
```js
FORM_EMAIL: "bookings@yourdomain.com",   // inbox that receives all forms
PHONE_DISPLAY: "(775) 555-0123",
PHONE_TEL: "+17755550123",
INSTAGRAM_EVENTS: "https://www.instagram.com/…",
```
Empty values are hidden automatically across the site.

### Forms (FormSubmit)
Forms post to [FormSubmit](https://formsubmit.co) (free, no backend).
1. Set `FORM_EMAIL`, deploy, submit one test inquiry.
2. FormSubmit emails an **activation link** to that inbox — click it once.
3. Every inquiry after that arrives as a formatted table email.

**Email 1 (Instant)** from the blueprint is sent automatically to the client via FormSubmit's autoresponse, personalized with their name, event type and date.
**Email 2 (48-hour nudge)** needs a scheduler — paste it into your email tool (Gmail template, Mailchimp/GoDaddy automation, etc.):

> Hi [Client Name], I have put the finishing touches on your custom event proposal for your [Event Type] on [Event Date]. Weekend slots fill incredibly fast. To ensure we match your timeline perfectly, which element is your absolute main priority right now? The Aesthetics, The Energy, or The Experience? Reply directly or let's jump on a quick 10-minute call.

Until `FORM_EMAIL` is set, forms fall back to opening the visitor's email app pre-filled.

## Swap in real photos
Gallery/lookbook images live in `assets/img/`. Replace these with real event photos (keep the filenames, or update the `src` in the HTML):
- `gallery-*.jpg` — lookbook tiles
- For best results follow the blueprint: a centerpiece close-up (Decor), a behind-the-booth crowd shot (DJ), and a server handing a cocktail at a set table (VIP).

## Brand
- Colors: black lacquer `#0a0908`, charcoal `#14120f`, ivory marble `#efe9de`, metallic gold `#c9a45c` (gradient in `--gold-grad`)
- Fonts: Cinzel (headings), Cormorant Garamond (accents), Jost (body)
