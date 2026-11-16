import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icons";
import { Reel } from "@/components/Reel";
import { DjForm } from "@/components/forms/Forms";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a DJ | DJ Weezy — Biggest Little Events Co, Reno NV",
  description:
    "Book DJ Weezy through Biggest Little Events Co — traveling open-format DJ, Dholi & MC for weddings, sangeets, corporate events and parties in Reno, NV and beyond.",
  alternates: { canonical: "/dj" },
};

const Eq = () => (
  <div className="eq" aria-hidden="true"><i /><i /><i /><i /><i /></div>
);

const offer: { icon: IconName; title: string; text: string }[] = [
  { icon: "music", title: "Open-Format DJ", text: "Bollywood, Bhangra, hip-hop, R&B, Latin, EDM, Top 40 and throwbacks — blended live for your crowd." },
  { icon: "mic", title: "MC & Hosting", text: "Grand entrances, toasts, announcements and a timeline that runs on cue." },
  { icon: "drum", title: "Live Dhol", text: "Baraats, sangeets and dance-floor peaks with live Dholi energy." },
  { icon: "light", title: "Lighting & Effects", text: "Uplighting, moving party lights, fog and cold sparks for unforgettable moments." },
  { icon: "sync", title: "Seamless Timeline", text: "We coordinate with your planner, venue and our own décor & hospitality team." },
  { icon: "pin", title: "We Travel", text: "Reno, Tahoe, Northern California and destination events across the West." },
];

const packages = [
  { title: "The Party", for: "Birthdays, anniversaries & private celebrations", items: ["Open-format DJ set", "Professional sound system", "Dance-floor party lighting", "Custom playlist consultation", "Wireless mic for toasts"], cta: "Secure Your Date" },
  { title: "The Celebration", for: "Weddings & receptions", featured: true, items: ["DJ + MC for the full reception", "Grand entrance & first-dance coordination", "Uplighting in your colors", "Ceremony & cocktail-hour audio", "Planning meeting & timeline build", "Cold sparks or fog add-on"], cta: "Secure Your Date" },
  { title: "The Grand Affair", for: "Multi-day weddings, sangeets & baraats", items: ["Multi-event DJ coverage", "Live Dhol & MC", "Baraat sound & mobile setup", "Full lighting & effects package", "Bundle décor, bar staff & VIP service"], cta: "Request Access" },
];

export default function DjPage() {
  return (
    <>
      <section className="dj-hero">
        <video autoPlay muted loop playsInline preload="metadata" poster="/assets/img/gallery-sparks-16.jpg" aria-hidden="true">
          <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="shell">
          <Eq />
          <p className="eyebrow">Biggest Little Events Co · DJ &amp; Entertainment</p>
          <img className="dj-logo" src="/assets/img/weezy-logo.jpg" alt="WEEZY DJ logo — bearded figure in sunglasses inside a neon ring" width={1284} height={1080} />
          <h1>Pack the <span className="gold-text">Dance Floor</span></h1>
          <p className="sub">
            Traveling open-format DJ, Dholi &amp; MC — catering to all events. Pristine sound, a seamless timeline and the energy your
            guests will talk about for years.
          </p>
          <div className="btn-row center">
            <a className="btn" href="#book">Secure Your Date</a>
            <a className="btn btn-ghost" href="#reels">Watch the Energy</a>
          </div>
        </div>
      </section>
      <div className="neon-line" />

      <section className="section darker">
        <div className="shell dj-intro">
          <div className="dj-portrait reveal">
            <img src="/assets/img/dj-weezy-studio.jpg" alt="DJ Weezy mixing on Pioneer decks in the studio" loading="lazy" width={960} height={540} />
            <span className="badge">#WeezyOnTheBeat</span>
          </div>
          <div className="reveal d1">
            <p className="eyebrow left">Meet Your DJ</p>
            <h2>DJ Weezy</h2>
            <p className="serif-lead text-gold-2">“When you align passion with purpose, the sky isn’t the limit — it’s just the view.”</p>
            <p className="text-text-dim">
              Par “Weezy” Gosal is a Reno-based traveling DJ who moves effortlessly between Bollywood, Bhangra, hip-hop, Top 40 and
              everything in between. As a Dholi and MC, he doesn’t just play the night — he leads it. From intimate anniversaries to
              destination weddings in the mountains of Montana, Weezy brings the same rule to every booth: read the room, build the
              energy, and never let the floor go quiet.
            </p>
            <div className="dj-stats">
              <div><b>Open Format</b>Every genre</div>
              <div><b>Dholi · MC</b>Live energy</div>
              <div><b>Traveling</b>Reno &amp; beyond</div>
            </div>
            <div className="btn-row">
              <a className="btn" href="#book">Book Weezy</a>
              <a className="btn btn-ghost" href={site.instagramDj} target="_blank" rel="noopener">@_theweezy_</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark" id="reels">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">Real Events · Real Energy</p>
            <h2 className="reveal">Watch the Floor Come Alive</h2>
            <p className="lede reveal d1">Tap any reel to play with sound.</p>
          </div>
          <div className="reels">
            <Reel src="/assets/video/avneet-colby-wedding.mp4" poster="/assets/img/poster-avneet-colby-wedding.jpg" kicker="Wedding · DJs Preet & Weezy" title="Night on the Books — Avneet Weds Colby" />
            <Reel wide src="/assets/video/leah-shree-whitefish-wedding.mp4" poster="/assets/img/poster-leah-shree-whitefish-wedding.jpg" kicker="Destination Wedding · Whitefish, MT" title="Leah & Shree’s Epic Mountain Wedding" />
            <Reel src="/assets/video/tesla-owners-anniversary.mp4" poster="/assets/img/poster-tesla-owners-anniversary.jpg" kicker="Private Party · Reno" title="Tesla Owners NorCal-Reno 8-Year Anniversary" />
          </div>
          <div className="reels mt-5">
            <Reel wide src="/assets/video/weezy-ny-mix.mp4" poster="/assets/img/poster-weezy-ny-mix.jpg" kicker="Studio Mix" title="“Ever Since You Left Me” Remix — NY Mix" />
            <div className="reel-note reveal flex flex-col justify-center border border-line-gold bg-[linear-gradient(135deg,rgba(75,125,255,.07),rgba(181,75,255,.07))] p-[clamp(24px,4vw,50px)]">
              <p className="eyebrow left">The Booth Philosophy</p>
              <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)]">“Nothing is possible without an absolutely great team.”</h3>
              <p className="text-text-dim">
                Elevate your mind, elevate your brand — most importantly, elevate the room. Your DJ works hand-in-hand with our décor,
                lighting and hospitality teams so every entrance, toast and first dance lands right on cue.
              </p>
              <div className="sc-card mt-4">
                <div className="flex items-center gap-5">
                  <Eq />
                  <div><h3>WEEZYBEATS</h3><p>Mixes &amp; edits on SoundCloud</p></div>
                </div>
                <a className="btn btn-ghost" href={site.soundcloudDj} target="_blank" rel="noopener"><Icon name="sc" /> Listen Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section darker">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">What We Bring</p>
            <h2 className="reveal">The Full Entertainment Experience</h2>
          </div>
          <div className="dark">
            <div className="services">
              {offer.map((o, i) => (
                <div key={o.title} className={`service reveal ${["", "d1", "d2"][i % 3]}`}>
                  <Icon name={o.icon} />
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">Experiences, Not Price Tags</p>
            <h2 className="reveal">Choose Your Energy</h2>
            <p className="lede reveal d1">Every package is tailored to your timeline and guest count — tell us what you’re planning and we’ll curate the rest.</p>
          </div>
          <div className="packages">
            {packages.map((p, i) => (
              <div key={p.title} className={`pkg reveal ${["", "d1", "d2"][i]}${p.featured ? " featured" : ""}`}>
                <h3>{p.title}</h3>
                <p className="for">{p.for}</p>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a className={`btn${p.featured ? "" : " btn-ghost"}`} href="#book">{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section darker" id="book">
        <div className="shell form-wrap">
          <div className="form-aside">
            <p className="eyebrow left">Book a DJ</p>
            <h2 className="reveal">Secure Your Date</h2>
            <p className="lede">Weekend slots fill incredibly fast. Share your event details and we’ll confirm availability with a custom entertainment proposal.</p>
            <ul className="contact-list">
              <li><Icon name="cal" /><span><small>Availability</small>Confirmed within 24–48 hours</span></li>
              <li><Icon name="ig" /><span><small>Instagram</small><a href={site.instagramDj} target="_blank" rel="noopener">@_theweezy_</a></span></li>
              <li><Icon name="sc" /><span><small>SoundCloud</small><a href={site.soundcloudDj} target="_blank" rel="noopener">WEEZYBEATS</a></span></li>
              {site.phoneDisplay && <li><Icon name="phone" /><span><small>Call / Text</small><a href={telHref()}>{site.phoneDisplay}</a></span></li>}
            </ul>
            <div className="promise">
              <b>Make it the full experience:</b> pair your DJ with décor rentals, bartending and VIP Black Table Service — one team, one synchronized arrival.
            </div>
          </div>
          <div className="reveal d1"><DjForm id="dj" /></div>
        </div>
      </section>
    </>
  );
}
