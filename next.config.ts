import type { NextConfig } from "next";

// Old (pre-redesign) URLs → new SEO-friendly URLs. Permanent (308) so search engines transfer ranking.
// Redirects that differ only by letter case (/FAQ → /faq) live in src/middleware.ts: Vercel matches
// config redirects case-insensitively, so here they would redirect /faq to itself forever.
const legacy: [string, string][] = [
  ["/Aboutus", "/about"],
  ["/aboutus", "/about"],
  ["/buyip", "/buy-ipv4"],
  ["/sellip", "/sell-ipv4"],
  ["/Leaseip", "/lease-ipv4"],
  ["/leaseip", "/lease-ipv4"],
  ["/contactus", "/contact"],
  ["/PrivicyPolicy", "/privacy-policy"],
  ["/blog_menu", "/blog"],
  ["/blogs", "/blog"],
  ["/Home", "/"],
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Make legacy redirects like /FAQ → /faq case-sensitive (otherwise they would loop).
    caseSensitiveRoutes: true,
    optimizePackageImports: ["react-icons", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // www is the primary host — send apex traffic there so only one version gets indexed.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "alltechcloudservices.com" }],
        destination: "https://www.alltechcloudservices.com/:path*",
        permanent: true,
      },
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
