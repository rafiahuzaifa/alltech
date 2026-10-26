import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/sanity";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/buy-ipv4", 0.9, "monthly"],
    ["/sell-ipv4", 0.9, "monthly"],
    ["/lease-ipv4", 0.9, "monthly"],
    ["/ipv4-subnet-calculator", 0.7, "yearly"],
    ["/blog", 0.7, "weekly"],
    ["/about", 0.6, "yearly"],
    ["/faq", 0.6, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/privacy-policy", 0.2, "yearly"],
  ];
  const posts = await getPosts();

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
