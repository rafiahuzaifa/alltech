import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep preview/staging deployments out of search results.
  const isProd = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  if (!isProd || process.env.NEXT_PUBLIC_NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
