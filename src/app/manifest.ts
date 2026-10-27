import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: site.name,
    short_name: "All Tech",
    description: site.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    background_color: "#050a16",
    theme_color: "#050a16",
    lang: "en-US",
    dir: "ltr",
    categories: ["business", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Buy IPv4", url: "/buy-ipv4?source=pwa-shortcut", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Sell IPv4", url: "/sell-ipv4?source=pwa-shortcut", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Lease IPv4", url: "/lease-ipv4?source=pwa-shortcut", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Contact us", url: "/contact?source=pwa-shortcut", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
