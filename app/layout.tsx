import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconSprite } from "@/components/Icons";
import { MobileBar, RevealObserver } from "@/components/Effects";
import { site } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });

const description =
  "Premium event decor rentals, tables & chairs, professional DJ services, bartending staff and VIP Black Table Service — flawlessly synchronized under one roof in Reno, NV.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Biggest Little Events Co | Luxury Event Decor, DJ & VIP Hospitality — Reno, NV",
    template: "%s",
  },
  description,
  icons: { icon: "/assets/img/favicon.png", apple: "/assets/img/apple-touch-icon.png" },
  openGraph: { type: "website", images: ["/assets/img/og-image.jpg"], description },
};

export const viewport: Viewport = { themeColor: "#0a0908" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Biggest Little Events Co",
  description:
    "Premium event decor rentals, tables & chairs, professional DJ services, bartending staffing and VIP Black Table Service in Reno, NV.",
  address: { "@type": "PostalAddress", addressLocality: "Reno", addressRegion: "NV", addressCountry: "US" },
  areaServed: ["Reno", "Sparks", "Lake Tahoe", "Carson City", "Northern Nevada"],
  image: "/assets/img/logo-badge.jpg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <IconSprite />
        <a className="sr-only" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
      </body>
    </html>
  );
}
