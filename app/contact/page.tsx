import type { Metadata } from "next";
import Link from "next/link";
import { ContactTabs } from "@/components/ContactTabs";
import { ContactList } from "@/components/ContactList";

export const metadata: Metadata = {
  title: "Contact & Get a Quote | Biggest Little Events Co — Reno, NV",
  description:
    "Check your date and request a custom proposal for event decor, tables & chairs, DJ, bartending and VIP Black Table Service in Reno, NV.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="crumbs"><Link href="/">Home</Link> · Contact</p>
          <p className="eyebrow">Check Date &amp; Get a Quote</p>
          <h1>Let’s Plan Something <span className="gold-text">Unforgettable</span></h1>
          <p className="lede">Choose how you’d like to begin. Every inquiry receives a personal, hand-crafted reply within 24–48 hours.</p>
        </div>
      </section>
      <section className="section dark pt-[70px]">
        <div className="shell">
          <ContactTabs
            aside={
              <div className="form-aside">
                <p className="eyebrow left">Reach Us</p>
                <h2>Biggest Little Events Co</h2>
                <p className="lede">Tables · Chairs · Events — and the sound, style and service that bring them to life.</p>
                <ContactList />
                <div className="promise">
                  <b>Ask about VIP Black Table Service</b> — 1 to 2 elite cocktail servers assigned entirely to your VIP circle.
                </div>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
