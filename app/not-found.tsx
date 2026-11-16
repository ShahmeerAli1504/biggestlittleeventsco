import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Biggest Little Events Co",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <section className="page-hero grid min-h-[80vh] place-items-center">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1>This Room Is <span className="gold-text">Still Being Styled</span></h1>
        <p className="lede">The page you’re looking for doesn’t exist.</p>
        <div className="btn-row center">
          <Link className="btn" href="/">Back Home</Link>
          <Link className="btn btn-ghost" href="/contact">Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}
