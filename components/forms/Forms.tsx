"use client";

import { Check, Legend, LuxForm } from "./LuxForm";

/* ============ Event proposal (home + contact) ============ */
export function EventForm({ id = "ev" }: { id?: string }) {
  return (
    <LuxForm
      kind="event"
      title="Begin Your Custom Event Experience"
      sub="Six quick details. A hand-crafted, itemized proposal delivered to your inbox within 24–48 hours."
      footNote="No generic price sheets — every proposal is tailored to your venue, guest count and vision."
      submitLabel="Request My Custom Proposal"
      success={(name, date) => (
        <>
          <h3>Your Inquiry Is Secured, {name}.</h3>
          <p>
            We have officially secured your custom inquiry for <b>{date}</b>. Every proposal we curate is hand-crafted — your
            itemized blueprint will arrive in your inbox within 24–48 hours.
          </p>
        </>
      )}
    >
      <fieldset className="fieldset">
        <Legend n="I">Who You Are</Legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor={`${id}-name`}>Full Name <span className="req">*</span></label>
            <input id={`${id}-name`} name="Full Name" autoComplete="name" required maxLength={120} />
            <span className="err">Please share your full name.</span>
          </div>
          <div className="field">
            <label htmlFor={`${id}-email`}>Direct Email Address <span className="req">*</span></label>
            <input id={`${id}-email`} type="email" name="Email" autoComplete="email" required maxLength={200} />
            <span className="err">Please enter a valid email.</span>
          </div>
        </div>
        <div className="field mt-[18px]">
          <label htmlFor={`${id}-phone`}>
            Phone <small className="font-light text-text-mid">(optional — for a quick 10-minute call)</small>
          </label>
          <input id={`${id}-phone`} type="tel" name="Phone" autoComplete="tel" maxLength={40} />
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="II">Your Event</Legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor={`${id}-date`}>Event Date <span className="req">*</span></label>
            <input id={`${id}-date`} type="date" name="Event Date" required />
            <span className="err">Please choose your date.</span>
          </div>
          <div className="field">
            <label htmlFor={`${id}-type`}>Event Profile <span className="req">*</span></label>
            <select id={`${id}-type`} name="Event Profile" required defaultValue="">
              <option value="">Select your occasion</option>
              <option>Wedding</option><option>Birthday</option><option>Elite Party</option><option>Corporate</option><option>Other</option>
            </select>
            <span className="err">Please select an event profile.</span>
          </div>
        </div>
        <div className="grid-2">
          <div className="field">
            <label htmlFor={`${id}-guests`}>Estimated Guest Count</label>
            <input id={`${id}-guests`} type="number" min={1} max={100000} name="Guest Count" inputMode="numeric" />
          </div>
          <div className="field">
            <label htmlFor={`${id}-venue`}>Venue / City</label>
            <input id={`${id}-venue`} name="Venue" placeholder="e.g. backyard in South Reno" maxLength={200} />
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="III">Curated Service Selections</Legend>
        <div className="checks" data-require-one>
          <Check name="Services" service="decor" value="Bespoke Party Decor & Event Design Rentals" title="Bespoke Party Decor & Event Design Rentals" desc="Backdrops, centerpieces, linens, florals, draping & full room styling." />
          <Check name="Services" service="tables" value="Tables & Chairs Rentals" title="Tables & Chairs" desc="Round tables & quality chairs with black or white linens, delivered and set." />
          <Check name="Services" service="dj" value="Professional DJ, Sound & Dancefloor Lighting Systems" title="Professional DJ, Sound & Dancefloor Lighting Systems" desc="Open-format DJ, MC, pro audio, uplighting & dance-floor effects." />
          <Check name="Services" service="bartending" value="Elite Bartending Staffing Services" title="Elite Bartending Staffing Services" desc="Certified, professional bartenders & hospitality staff." />
          <Check name="Services" service="catering" value="Catering Coordination" title="Catering Coordination" desc="We coordinate your caterer’s timeline, service staff and buffet styling." />
        </div>
        <span className="err group-err hidden mt-2 text-[.8rem] text-[#a3392b]">Please select at least one service.</span>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="IV">Luxury Experience Upgrades</Legend>
        <div className="checks">
          <Check
            vip
            name="Upgrades"
            service="vip"
            value="Premium VIP Black Table Service"
            title={<>Premium VIP Black Table Service<span className="pill">VIP</span></>}
            desc="Dedicated table-side cocktail servers for your inner circle — white-glove, zero-wait hospitality all night."
          />
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-vision`}>Tell us your vision</label>
        <textarea id={`${id}-vision`} name="Vision" placeholder="Colors, theme, timeline, must-haves…" maxLength={4000} />
      </div>
    </LuxForm>
  );
}

/* ============ DJ booking (dj page + contact) ============ */
const MUSIC = ["Bollywood", "Bhangra / Punjabi", "Hip-Hop & R&B", "Top 40", "Latin", "EDM / House", "Throwbacks", "Country", "Open Format"];
const DJ_TYPES = ["Wedding Reception", "Sangeet / Mehndi", "Baraat", "Birthday", "Anniversary", "Corporate / Club Event", "Private Party", "Club / Lounge Night", "Other"];

export function DjForm({ id = "dj" }: { id?: string }) {
  return (
    <LuxForm
      kind="dj"
      title="Secure Your DJ Date"
      sub="Tell us about the night. We’ll confirm availability and send a custom entertainment proposal within 24–48 hours."
      footNote="Weekend dates fill incredibly fast — submit early to hold your spot."
      submitLabel="Secure My Date"
      success={(name, date) => (
        <>
          <h3>Your DJ Request Is In, {name}.</h3>
          <p>
            We’re checking availability for <b>{date}</b> now. Expect your custom entertainment proposal in your inbox within 24–48 hours.
          </p>
        </>
      )}
    >
      <fieldset className="fieldset">
        <Legend n="I">Contact</Legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor={`${id}-name`}>Full Name <span className="req">*</span></label>
            <input id={`${id}-name`} name="Full Name" autoComplete="name" required maxLength={120} />
            <span className="err">Please share your full name.</span>
          </div>
          <div className="field">
            <label htmlFor={`${id}-email`}>Email <span className="req">*</span></label>
            <input id={`${id}-email`} type="email" name="Email" autoComplete="email" required maxLength={200} />
            <span className="err">Please enter a valid email.</span>
          </div>
        </div>
        <div className="field mt-[18px]">
          <label htmlFor={`${id}-phone`}>Phone <span className="req">*</span></label>
          <input id={`${id}-phone`} type="tel" name="Phone" autoComplete="tel" required maxLength={40} />
          <span className="err">Please add a phone number.</span>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="II">The Event</Legend>
        <div className="grid-2">
          <div className="field">
            <label htmlFor={`${id}-type`}>Event Type <span className="req">*</span></label>
            <select id={`${id}-type`} name="Event Type" required defaultValue="">
              <option value="">Select one</option>
              {DJ_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <span className="err">Please select an event type.</span>
          </div>
          <div className="field">
            <label htmlFor={`${id}-date`}>Event Date <span className="req">*</span></label>
            <input id={`${id}-date`} type="date" name="Event Date" required />
            <span className="err">Please choose a date.</span>
          </div>
        </div>
        <div className="grid-3">
          <div className="field">
            <label htmlFor={`${id}-start`}>Start Time</label>
            <input id={`${id}-start`} type="time" name="Start Time" />
          </div>
          <div className="field">
            <label htmlFor={`${id}-end`}>End Time</label>
            <input id={`${id}-end`} type="time" name="End Time" />
          </div>
          <div className="field">
            <label htmlFor={`${id}-guests`}>Guest Count</label>
            <input id={`${id}-guests`} type="number" min={1} max={100000} name="Guest Count" inputMode="numeric" />
          </div>
        </div>
        <div className="field mt-[18px]">
          <label htmlFor={`${id}-venue`}>Venue &amp; City <span className="req">*</span></label>
          <input id={`${id}-venue`} name="Venue" required placeholder="Venue name, city / state (we travel!)" maxLength={200} />
          <span className="err">Please tell us where.</span>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="III">The Sound</Legend>
        <p className="-mt-1 mb-3 text-[.84rem] text-text-mid">Music styles you love (choose any)</p>
        <div className="chip-checks">
          {MUSIC.map((m) => (
            <label key={m} className="chip-check">
              <input type="checkbox" name="Music Styles" value={m} />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <Legend n="IV">Add-Ons</Legend>
        <div className="checks">
          <Check name="DJ Add-Ons" value="MC / Host Services" title="MC & Host" desc="Grand entrances, announcements and crowd-moving hype." />
          <Check name="DJ Add-Ons" value="Live Dhol" title="Live Dhol Performance" desc="High-energy dhol for baraats, entrances and the dance floor." />
          <Check name="DJ Add-Ons" value="Uplighting & Dancefloor Lighting" title="Uplighting & Dance-Floor Lighting" desc="Wash the room in your colors, plus moving party lights." />
          <Check name="DJ Add-Ons" value="Cold Sparks / Fog Effects" title="Cold Sparks & Fog Effects" desc="First-dance and grand-entrance moments (venue permitting)." />
          <Check name="DJ Add-Ons" value="Ceremony / Cocktail Hour Audio" title="Ceremony & Cocktail Hour Audio" desc="Wireless mics and separate sound for every part of the day." />
          <Check name="DJ Add-Ons" value="Add Decor, Bartending or VIP Service" title="Bundle the full experience" desc="Add decor rentals, bartending staff or VIP Black Table Service — one team, one synchronized arrival." />
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-notes`}>Must-play songs, do-not-play list or anything else</label>
        <textarea id={`${id}-notes`} name="Notes" maxLength={4000} />
      </div>
    </LuxForm>
  );
}

/* ============ General message (contact) ============ */
export function ContactForm({ id = "c" }: { id?: string }) {
  return (
    <LuxForm
      kind="contact"
      title="Send Us a Message"
      sub="Questions, partnerships, venue walkthroughs — we’d love to hear from you."
      footNote="We reply personally within 24–48 hours."
      submitLabel="Send Message"
      success={(name) => (
        <>
          <h3>Thank You, {name}.</h3>
          <p>Your message is in. A member of our team will reply personally within 24–48 hours.</p>
        </>
      )}
    >
      <div className="grid-2">
        <div className="field">
          <label htmlFor={`${id}-name`}>Full Name <span className="req">*</span></label>
          <input id={`${id}-name`} name="Full Name" autoComplete="name" required maxLength={120} />
          <span className="err">Please share your name.</span>
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>Email <span className="req">*</span></label>
          <input id={`${id}-email`} type="email" name="Email" autoComplete="email" required maxLength={200} />
          <span className="err">Please enter a valid email.</span>
        </div>
      </div>
      <div className="grid-2">
        <div className="field">
          <label htmlFor={`${id}-phone`}>Phone</label>
          <input id={`${id}-phone`} type="tel" name="Phone" autoComplete="tel" maxLength={40} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-topic`}>Topic</label>
          <select id={`${id}-topic`} name="Topic">
            <option>General Question</option><option>Decor &amp; Rentals</option><option>DJ Services</option>
            <option>Bartending / VIP Service</option><option>Vendor / Venue Partnership</option>
          </select>
        </div>
      </div>
      <div className="field mt-[18px]">
        <label htmlFor={`${id}-msg`}>Message <span className="req">*</span></label>
        <textarea id={`${id}-msg`} name="Message" required maxLength={4000} />
        <span className="err">Please write a short message.</span>
      </div>
    </LuxForm>
  );
}
