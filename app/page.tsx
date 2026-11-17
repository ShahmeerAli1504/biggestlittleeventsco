import Link from "next/link";
import { Icon, type IconName } from "@/components/Icons";
import { Lookbook } from "@/components/Lookbook";
import { ContactList } from "@/components/ContactList";
import { EventForm } from "@/components/forms/Forms";

const occasions = ["Weddings", "Sangeets & Baraats", "Birthdays", "Elite Parties", "Corporate Galas", "Anniversaries", "Quinceañeras", "Holiday Parties", "Graduations", "Baby Showers"];

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "glass", title: "Table-Side Cocktails", text: "1–2 elite servers assigned entirely to your VIP circle." },
  { icon: "crown", title: "Prestige, Not Delivery", text: "Your head table, treated like the private lounge it should be." },
  { icon: "clock", title: "Zero-Wait, All Night", text: "No bar lines for the people who matter most." },
  { icon: "shield", title: "Certified & Professional", text: "Polished, uniformed, certified hospitality staff." },
];

const services: { icon: IconName; title: string; text: string; href: string; cta: string }[] = [
  { icon: "decor", title: "Decor & Design", text: "Backdrops, centerpieces, florals, draping and complete room transformations.", href: "/services#rentals", cta: "Discover" },
  { icon: "chair", title: "Tables & Chairs", text: "Round tables and quality chairs with black or white linens — delivered and set.", href: "/services#tables-chairs", cta: "Discover" },
  { icon: "music", title: "Professional DJ", text: "Mobile, traveling open-format DJs, MC & dhol — wherever your destination.", href: "/dj", cta: "Book a DJ" },
  { icon: "bar", title: "Bartending Staff", text: "Certified, professional bartenders and hospitality staffing for any size crowd.", href: "/services#bartending", cta: "Discover" },
  { icon: "catering", title: "Catering Coordination", text: "Buffet styling, service staff and timeline coordination with your caterer.", href: "/services#catering", cta: "Discover" },
  { icon: "crown", title: "VIP Black Table", text: "Dedicated table-side cocktail servers for your inner circle.", href: "#vip", cta: "Discover" },
];

const steps = [
  { title: "Share Your Timeline", text: "Six quick details in our custom inquiry form — date, occasion, services and upgrades." },
  { title: "Receive Your Blueprint", text: "A hand-crafted, itemized proposal in your inbox within 24–48 hours." },
  { title: "Lock Your Date", text: "Weekend slots fill fast. Confirm and we build your décor, music and staffing plan." },
  { title: "Be a Guest", text: "We arrive in one synchronized wave. You enjoy the night you imagined." },
];

const faqs = [
  ["Why don’t you list prices?", "No two events are the same. Your proposal is tailored to your venue layout, guest count and creative vision — so you only pay for exactly what your event needs."],
  ["What areas do you serve?", "We’re based in Reno and serve Sparks, Lake Tahoe, Carson City and all of Northern Nevada. Our DJs also travel for destination events — just ask."],
  ["Do you provide the alcohol for bartending or VIP service?", "No. All alcohol is securely provided by the client/venue host. We provide the certified, professional hospitality staffing."],
  ["Can I book only a DJ, or only rentals?", "Absolutely. Every service is available on its own — but bundling decor, DJ and hospitality means one contract, one point of contact and one synchronized setup."],
  ["How far in advance should I book?", "For weddings and peak-season weekends, 3–6 months ahead is ideal. Weekend slots fill incredibly fast, so check your date as early as possible."],
  ["Do you handle setup and breakdown?", "Yes — delivery, setup, styling and breakdown are part of every rental and décor proposal."],
];

const delay = (i: number) => ["", "d1", "d2", "d3"][i % 3];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow left reveal">Reno, Nevada · Tables · Chairs · Events</p>
            <h1 className="reveal d1">
              <span>Transform Spaces.</span>
              <span className="gold-text">Pack Dance Floors.</span>
              <span>Elevate the Host Experience.</span>
            </h1>
            <p className="sub reveal d2">
              Premium event decor rentals, professional DJ services, and elite VIP table hospitality — flawlessly synchronized under one roof.
            </p>
            <div className="btn-row reveal d3">
              <Link className="btn" href="/contact">Check Date &amp; Get a Quote</Link>
              <Link className="btn btn-ghost" href="/dj">Book a DJ</Link>
            </div>
            <div className="hero-badges reveal d3">
              <div><b>One Team</b>Decor · Sound · Staff</div>
              <div><b>One Arrival</b>Synchronized setup</div>
              <div><b>Zero Templates</b>Tailored proposals</div>
            </div>
          </div>
          <div className="hero-visual reveal d2">
            <div className="hero-frame">
              <div className="clip">
                <img
                  src="/assets/img/logo-hero.jpg"
                  alt="Biggest Little Events Co — chairs around a black-linen round table with a white floral centerpiece, mountain and Reno skyline motif"
                  width={792}
                  height={863}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
        <span className="scroll-cue" aria-hidden="true" />
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...occasions, ...occasions].map((o, i) => <span key={i}>{o}</span>)}
        </div>
      </div>

      <section className="section marble light" id="experiences">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">The Editorial Showcase</p>
            <h2 className="reveal">Three Experiences. <em className="font-serif font-normal">One Flawless Night.</em></h2>
            <p className="lede reveal d1">Every detail of your event, curated by a single team — from the first centerpiece to the last song.</p>
          </div>
          <div className="matrix">
            <article className="matrix-card reveal">
              <div className="matrix-media">
                <img src="/assets/img/logo-hero.jpg" alt="Styled round table with chairs and white floral centerpiece" loading="lazy" className="object-[50%_30%]" />
                <span className="matrix-num">I · Decor</span>
              </div>
              <div className="matrix-body">
                <h3>Rentals &amp; Decor</h3>
                <p className="matrix-trigger">The precision before the doors open.</p>
                <p>We transform raw rooms into unforgettable visual atmospheres tailored to your aesthetic palette.</p>
                <div><a className="btn btn-ghost" href="#lookbook">Explore Lookbook</a></div>
              </div>
            </article>
            <article className="matrix-card is-dark reveal d1">
              <div className="matrix-media">
                <img src="/assets/img/gallery-dancefloor-34.jpg" alt="Packed wedding dance floor under string lights and colorful party lighting" loading="lazy" />
                <span className="matrix-num">II · Sound</span>
              </div>
              <div className="matrix-body">
                <h3>Professional DJ</h3>
                <p className="matrix-trigger">The energy everyone talks about tomorrow.</p>
                <p>A packed dance floor, pristine acoustic engineering, and a seamless timeline.</p>
                <div><Link className="btn" href="/dj#book">Secure Your Date</Link></div>
              </div>
            </article>
            <article className="matrix-card reveal d2">
              <div className="matrix-media">
                <img src="/assets/img/logo-monogram-card.jpg" alt="Biggest Little Events Co BL monogram on marble" loading="lazy" className="!object-contain bg-[#efeeec]" />
                <span className="matrix-num">III · Hospitality</span>
              </div>
              <div className="matrix-body">
                <h3>VIP Hospitality</h3>
                <p className="matrix-trigger">Status, pampering, exclusivity.</p>
                <p>White-glove drink delivery and private table service. Complete hands-off luxury.</p>
                <div><Link className="btn btn-ghost" href="/contact?service=vip">Request Access</Link></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section light" id="advantage">
        <div className="shell split">
          <div>
            <p className="eyebrow left">The All-Inclusive Advantage</p>
            <h2 className="reveal">One Contract.<br />One Synchronized Wave.</h2>
            <div className="quote-block reveal d1">
              <p>
                Booking your DJ, decor, and bartending separately means managing multiple contracts, varying arrival times, and major
                coordination headaches. When you book our hybrid teams, we arrive in one synchronized wave, setting up your visuals,
                sound, and hospitality staff flawlessly.
              </p>
            </div>
            <div className="btn-row mt-8"><Link className="btn" href="/contact">Build My Bundle</Link></div>
          </div>
          <div className="compare reveal d2">
            <div className="compare-col lose">
              <h4>Booking Separately</h4>
              <ul>
                <li>3+ vendors, 3+ contracts</li>
                <li>Staggered, uncoordinated arrivals</li>
                <li>Décor and lighting that clash</li>
                <li>You become the coordinator</li>
                <li>Finger-pointing when things slip</li>
              </ul>
            </div>
            <div className="compare-col win">
              <h4>Biggest Little Events Co</h4>
              <ul>
                <li>One proposal, one point of contact</li>
                <li>Single synchronized setup</li>
                <li>Lighting tuned to your décor palette</li>
                <li>DJ &amp; staff run one shared timeline</li>
                <li>You get to be a guest</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section vip" id="vip">
        <div className="shell split">
          <div className="vip-card reveal">
            <p className="eyebrow left">Exclusive Upgrade</p>
            <h2><span className="gold-text">VIP Black Table</span><br />Service</h2>
            <p className="serif-lead text-ivory">“Be a guest at your own event.”</p>
            <p className="text-text-dim">
              Our dedicated cocktail servers manage your head tables seamlessly, ensuring your closest inner circle enjoys a white-glove,
              zero-wait hospitality experience all night.
            </p>
            <div className="vip-perks">
              {perks.map((p) => (
                <div key={p.title}>
                  <Icon name={p.icon} />
                  <div><h4>{p.title}</h4><p>{p.text}</p></div>
                </div>
              ))}
            </div>
            <Link className="btn" href="/contact?service=vip">Request Access</Link>
            <p className="disclaimer">
              <Icon name="info" />
              <span>All alcohol is securely provided by the client/venue host. Our business explicitly provides the certified, professional hospitality staffing.</span>
            </p>
          </div>
          <div className="vip-media reveal d2">
            <img src="/assets/img/logo-hero.jpg" alt="Black-linen VIP table set with gold chairs and florals" loading="lazy" className="object-[50%_32%]" />
            <span className="tag">White-Glove · Zero-Wait</span>
          </div>
        </div>
      </section>

      <section className="section dark" id="lookbook">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">The Lookbook</p>
            <h2 className="reveal">Moments We’ve Made</h2>
            <p className="lede reveal d1">From candle-lit tablescapes to cold-spark first dances and packed dance floors.</p>
          </div>
          <Lookbook />
          <div className="btn-row center mt-12"><Link className="btn btn-ghost" href="/services">See Every Service</Link></div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <p className="eyebrow">Why You Won’t Find a Price Sheet</p>
          <p className="serif-lead reveal">
            “Because no two milestones are ever identical, we completely reject generic, cookie-cutter pricing sheets. Every proposal we
            curate is strictly tailored to your specific venue layout, exact guest count, and creative vision.”
          </p>
          <Link className="btn" href="/contact">Request My Custom Proposal</Link>
        </div>
      </section>

      <section className="section marble light" id="services">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">Everything Under One Roof</p>
            <h2 className="reveal">Our Services</h2>
          </div>
          <div className="services">
            {services.map((s, i) => (
              <div key={s.title} className={`service reveal ${delay(i)}`}>
                <Icon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link className="text-link" href={s.href}>{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light" id="process">
        <div className="shell">
          <div className="section-head center">
            <p className="eyebrow">How It Works</p>
            <h2 className="reveal">From Inquiry to Last Dance</h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={s.title} className={`step reveal ${["", "d1", "d2", "d3"][i]}`}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="inquire">
        <div className="shell form-wrap">
          <div className="form-aside">
            <p className="eyebrow left">Check Your Date</p>
            <h2 className="reveal">Begin Your Custom Event Experience</h2>
            <p className="lede">
              Which matters most to you right now —{" "}
              <em className="font-serif text-[1.15em] text-gold-2">the Aesthetics, the Energy, or the Experience?</em> Tell us, and
              we’ll build everything around it.
            </p>
            <ContactList />
            <div className="promise">
              <b>Our promise:</b> every proposal is hand-crafted — never a template. Expect your itemized blueprint within 24–48 hours.
            </div>
          </div>
          <div className="reveal d1"><EventForm id="ev" /></div>
        </div>
      </section>

      <section className="section light" id="faq">
        <div className="narrow">
          <div className="section-head center">
            <p className="eyebrow">Good to Know</p>
            <h2 className="reveal">Frequently Asked</h2>
          </div>
          <div className="faq">
            {faqs.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell">
          <p className="eyebrow">Your Date Is Waiting</p>
          <h2 className="reveal">Let’s Make It the<br /><span className="gold-text">Biggest Little Night</span> of the Year</h2>
          <div className="btn-row center mt-8">
            <Link className="btn" href="/contact">Check Date &amp; Get a Quote</Link>
            <Link className="btn btn-ghost" href="/dj">Book a DJ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
