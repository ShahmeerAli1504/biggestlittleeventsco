"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm, DjForm, EventForm } from "./forms/Forms";

const tabs = [
  { hash: "event", label: "Event Proposal" },
  { hash: "dj", label: "Book a DJ" },
  { hash: "message", label: "General Message" },
] as const;

type Hash = (typeof tabs)[number]["hash"];

export function ContactTabs({ aside }: { aside: React.ReactNode }) {
  const [active, setActive] = useState<Hash>("event");
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links: /contact#dj, /contact#message
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.hash === h)) setActive(h as Hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function select(h: Hash, focus = false) {
    setActive(h);
    history.replaceState(null, "", "#" + h);
    if (focus) btns.current[tabs.findIndex((t) => t.hash === h)]?.focus();
  }

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Inquiry type">
        {tabs.map((t, i) => (
          <button
            key={t.hash}
            ref={(el) => { btns.current[i] = el; }}
            role="tab"
            id={`t-${t.hash}`}
            aria-controls={`p-${t.hash}`}
            aria-selected={active === t.hash}
            tabIndex={active === t.hash ? 0 : -1}
            onClick={() => select(t.hash)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
              select(tabs[n].hash, true);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="form-wrap">
        {aside}
        <div>
          <div role="tabpanel" id="p-event" aria-labelledby="t-event" hidden={active !== "event"}><EventForm id="ev" /></div>
          <div role="tabpanel" id="p-dj" aria-labelledby="t-dj" hidden={active !== "dj"}><DjForm id="cdj" /></div>
          <div role="tabpanel" id="p-message" aria-labelledby="t-message" hidden={active !== "message"}><ContactForm id="c" /></div>
        </div>
      </div>
    </>
  );
}
