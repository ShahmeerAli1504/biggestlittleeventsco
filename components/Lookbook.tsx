"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  { cls: "lb-a", d: "", src: "/assets/img/logo-hero.jpg", alt: "Signature table styling with gold chiavari chairs", cap: "Signature Tablescape" },
  { cls: "lb-b", d: "d1", src: "/assets/img/gallery-sparks-16.jpg", alt: "Couple's first dance framed by cold-spark fountains", cap: "Cold-Spark First Dance" },
  { cls: "lb-c", d: "d2", src: "/assets/img/gallery-dancefloor-18.jpg", alt: "Wedding reception under string lights with party lighting", cap: "String-Light Reception" },
  { cls: "lb-d", d: "", src: "/assets/img/gallery-sparks-20.jpg", alt: "Newlyweds dancing between spark fountains at night", cap: "Grand Moments" },
  { cls: "lb-e", d: "d1", src: "/assets/img/gallery-dancefloor-56.jpg", alt: "Guests dancing at a wedding celebration", cap: "Full Dance Floor" },
  { cls: "lb-f", d: "d2", src: "/assets/img/gallery-dj-booth.jpg", alt: "DJ booth set up at an outdoor evening wedding", cap: "DJ Booth · Whitefish, MT", pos: "50% 40%" },
];

export function Lookbook() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="lookbook">
        {items.map((it) => (
          <button key={it.src + it.cls} className={`lb-item ${it.cls} reveal ${it.d}`} onClick={() => setOpen(it)}>
            <img src={it.src} alt={it.alt} loading="lazy" style={it.pos ? { objectPosition: it.pos } : undefined} />
            <figcaption>{it.cap}</figcaption>
          </button>
        ))}
      </div>
      <div
        className={`lightbox${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        aria-hidden={!open}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
      >
        <button ref={closeRef} aria-label="Close preview" onClick={() => setOpen(null)}>×</button>
        {open && <img src={open.src} alt={open.alt} />}
      </div>
    </>
  );
}
