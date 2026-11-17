import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Biggest Little Events Co — Reno, NV",
  description:
    "Event decor rentals, tables & chairs, professional DJ, bartending staffing, catering coordination and VIP Black Table Service in Reno, NV.",
  alternates: { canonical: "/services" },
};

type Detail = {
  id: string;
  img: string;
  alt: string;
  pos?: string;
  title: string;
  lead: string;
  body: string;
  chips: string[];
  soon?: string[];
  href: string;
  cta: string;
};

const details: Detail[] = [
  {
    id: "rentals", img: "/assets/img/logo-hero.jpg", alt: "Styled event table with floral centerpiece and gold chairs", pos: "50% 30%",
    title: "Rentals & Decor", lead: "We transform raw rooms into unforgettable visual atmospheres.",
    body: "From statement backdrops to the final candle, our design team builds a cohesive look around your palette — then installs it with precision before a single guest arrives.",
    chips: ["Backdrops", "Centerpieces", "Florals", "Black & White Linens", "Draping", "Candles & Lanterns", "Signage", "Lounge Vignettes"],
    href: "/contact?service=decor", cta: "Explore My Look",
  },
  {
    id: "tables-chairs", img: "/assets/img/logo-badge-wide.jpg", alt: "Biggest Little Events Co badge with table and chairs",
    title: "Tables & Chairs", lead: "The foundation of every beautiful room.",
    body: "Round tables with quality, comfortable chairs, dressed in classic black or white linens — delivered, set to your floor plan and cleared after the last dance.",
    chips: ["Round Tables", "Quality Chairs", "Black or White Linens"],
    soon: ["Gold Chiavari Chairs", "Banquet Tables", "Cocktail Highboys", "Sweetheart Tables", "Head Tables"],
    href: "/contact?service=tables", cta: "Reserve Tables & Chairs",
  },
  {
    id: "dj", img: "/assets/img/gallery-dancefloor-34.jpg", alt: "Packed dance floor with colorful party lighting", pos: "50% 50%",
    title: "Professional DJ, Sound & Lighting", lead: "A packed dance floor, pristine acoustic engineering, and a seamless timeline.",
    body: "Mobile, traveling open-format DJs who come to you wherever your destination is. We read the room — Bollywood to hip-hop, Latin to Top 40 — with MC services, live dhol, pro audio and dance-floor lighting that matches your décor.",
    chips: ["Open-Format DJ", "Mobile & Traveling", "MC / Host", "Live Dhol", "Uplighting", "Cold Sparks", "Fog Effects", "Ceremony Audio"],
    href: "/dj#book", cta: "Book a DJ",
  },
  {
    id: "bartending", img: "/assets/img/gallery-sparks-20.jpg", alt: "Elegant evening celebration", pos: "50% 50%",
    title: "Elite Bartending Staffing", lead: "Certified, professional and polished.",
    body: "Polished, uniformed bartenders and hospitality staff who keep the drinks flowing and the bar beautiful. You (or your venue) supply the alcohol — we supply the expertise.",
    chips: ["Certified Bartenders", "Barbacks", "Signature Cocktail Menus", "Bar Styling"],
    href: "/contact?service=bartending", cta: "Add Bartending",
  },
  {
    id: "catering", img: "/assets/img/gallery-dancefloor-18.jpg", alt: "Reception hall under string lights", pos: "50% 50%",
    title: "Catering Coordination", lead: "Your caterer’s timeline, seamlessly woven into the night.",
    body: "We coordinate with your chosen caterer on service timing, buffet and station styling and service staffing, so dinner flows straight into toasts, first dances and the party.",
    chips: ["Caterer Coordination", "Buffet & Station Styling", "Service Staff", "Dessert Tables", "Timeline Planning"],
    href: "/contact?service=catering", cta: "Plan My Catering",
  },
  {
    id: "vip-service", img: "/assets/img/logo-hero.jpg", alt: "VIP black-linen table setting", pos: "50% 35%",
    title: "VIP Black Table Service", lead: "Be a guest at your own event.",
    body: "1–2 elite cocktail servers assigned entirely to your head tables — white-glove, zero-wait hospitality for your inner circle all night. All alcohol is provided by the client/venue host; we provide certified, professional hospitality staffing.",
    chips: ["Dedicated Servers", "Table-Side Cocktails", "Head-Table Focus", "Uniformed Staff"],
    href: "/contact?service=vip", cta: "Request Access",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="crumbs"><Link href="/">Home</Link> · Services</p>
          <p className="eyebrow">Everything Under One Roof</p>
          <h1>Our <span className="gold-text">Services</span></h1>
          <p className="lede">Decor, furniture, sound and hospitality — designed together, delivered together.</p>
        </div>
      </section>

      <section className="light">
        <div className="shell">
          {details.map((d, i) => (
            <article key={d.id} className="detail scroll-mt-24" id={d.id}>
              <div className="detail-media reveal">
                <img src={d.img} alt={d.alt} loading="lazy" style={d.pos ? { objectPosition: d.pos } : undefined} />
              </div>
              <div className="reveal d1">
                <span className="detail-index">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-[.4rem]">{d.title}</h2>
                <p className="serif-lead text-gold-deep">{d.lead}</p>
                <p className="text-text-mid">{d.body}</p>
                <ul className="chips">
                  {d.chips.map((c) => <li key={c}>{c}</li>)}
                  {d.soon?.map((c) => <li key={c} className="soon">{c}<em>Coming Soon</em></li>)}
                </ul>
                <Link className="btn" href={d.href}>{d.cta}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <p className="eyebrow">The All-Inclusive Advantage</p>
          <p className="serif-lead reveal">
            When you book our hybrid teams, we arrive in one synchronized wave — setting up your visuals, sound, and hospitality staff flawlessly.
          </p>
          <Link className="btn" href="/contact">Check Date &amp; Get a Quote</Link>
        </div>
      </section>
    </>
  );
}
