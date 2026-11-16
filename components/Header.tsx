"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#lookbook", label: "Lookbook" },
  { href: "/#vip", label: "VIP Service" },
  { href: "/dj", label: "Book a DJ", className: "nav-dj" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav" aria-label="Main">
        <Link className="brand" href="/" aria-label="Biggest Little Events Co home">
          <Image src="/assets/img/logo-badge.jpg" alt="" width={52} height={52} priority />
          <span className="brand-text">
            <b>BIGGEST LITTLE</b>
            <small>EVENTS CO</small>
          </span>
        </Link>
        <ul className="nav-links" id="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={l.className}
                aria-current={!l.href.includes("#") && pathname === l.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mobile-cta">
            <Link className="btn" href="/contact" onClick={() => setOpen(false)}>
              Check Date &amp; Get a Quote
            </Link>
          </li>
        </ul>
        <Link className="btn nav-cta" href="/contact">
          Check Date &amp; Get a Quote
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
      </nav>
    </header>
  );
}
