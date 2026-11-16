/* ============================================================
   SITE CONFIG — public contact details shown across the site.
   Empty values are hidden automatically.
   (Email delivery settings live in server env vars — see .env.example.)
   ============================================================ */
export const site = {
  name: "Biggest Little Events Co",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://biggestlittleeventsco.com",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "", // e.g. "(775) 555-0123"
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL || "", // e.g. "+17755550123"
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "", // public email shown on the site
  instagramEvents: process.env.NEXT_PUBLIC_INSTAGRAM_EVENTS || "",
  instagramDj: "https://www.instagram.com/_theweezy_/",
  soundcloudDj: "https://on.soundcloud.com/tydSL1hfUvZmGVie7",
  yelp: "https://www.yelp.com/biz/biggest-little-events-reno",
  tiktok: "https://www.tiktok.com/@theweezy",
};

export const telHref = () =>
  site.phoneDisplay ? `tel:${site.phoneTel || site.phoneDisplay.replace(/[^\d+]/g, "")}` : "";
