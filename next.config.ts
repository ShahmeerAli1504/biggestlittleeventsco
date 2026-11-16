import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // In production, Vercel routes /api/* straight to the Go serverless functions
  // in /api. Locally, `npm run dev:api` runs those same handlers on :8080 and
  // Next proxies to them so the frontend code is identical in both environments.
  async rewrites() {
    if (!isDev) return [];
    const target = process.env.GO_API_URL || "http://127.0.0.1:8080";
    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
  // Keep old static-site URLs working (links, bookmarks, search results).
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/dj.html", destination: "/dj", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
