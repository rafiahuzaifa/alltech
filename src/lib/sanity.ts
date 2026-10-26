import { client } from "@/sanity/lib/client";
import type { PortableTextBlock } from "next-sanity";
import { articles, getArticle } from "@/content/articles";
import type { Article, ArticleSection } from "@/content/types";
import { sectionsToPlain } from "@/components/blog/ArticleBody";

export type PostCard = {
  title: string;
  slug: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  imageAlt?: string;
  plain?: string;
};

export type Post = PostCard & {
  body?: PortableTextBlock[];
  // Present for articles written in code (src/content/articles.ts)
  sections?: ArticleSection[];
  faqs?: { q: string; a: string }[];
  description?: string;
  keywords?: string[];
};

const fromArticle = (a: Article): Post => ({
  title: a.title,
  slug: a.slug,
  author: a.author,
  publishedAt: a.publishedAt,
  updatedAt: a.publishedAt,
  plain: sectionsToPlain(a.sections),
  sections: a.sections,
  faqs: a.faqs,
  description: a.description,
  keywords: a.keywords,
});

const CARD_FIELDS = `
  title,
  "slug": slug.current,
  "author": author->name,
  publishedAt,
  "updatedAt": _updatedAt,
  "image": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "plain": pt::text(body)
`;

// Editors sometimes paste titles wrapped in quotes — strip them for display and SEO.
export const cleanTitle = (t = "") => t.replace(/^[\s"“”'‘’]+|[\s"“”'‘’]+$/g, "").trim();

export const excerpt = (text = "", len = 160) => {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > len ? `${t.slice(0, len).replace(/\s+\S*$/, "")}…` : t;
};

export const readingTime = (text = "") => Math.max(1, Math.round(text.split(/\s+/).length / 220));

const normalize = <T extends PostCard>(p: T): T => ({ ...p, title: cleanTitle(p.title) });

async function getSanityPosts(): Promise<PostCard[]> {
  try {
    const posts = await client.fetch<PostCard[]>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){${CARD_FIELDS}}`,
      {},
      { next: { revalidate: 300, tags: ["posts"] } },
    );
    return posts.map(normalize);
  } catch (err) {
    console.error("Sanity getPosts failed:", err);
    return [];
  }
}

/** Sanity posts and code-authored articles, newest first. */
export async function getPosts(limit?: number): Promise<PostCard[]> {
  const local = articles.map(fromArticle);
  const sanity = (await getSanityPosts()).filter((p) => !local.some((l) => l.slug === p.slug));
  const all = [...local, ...sanity].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return limit ? all.slice(0, limit) : all;
}

export async function getPost(slug: string): Promise<Post | null> {
  const local = getArticle(slug);
  if (local) return fromArticle(local);
  try {
    const post = await client.fetch<Post | null>(
      `*[_type == "post" && lower(slug.current) == lower($slug)][0]{${CARD_FIELDS}, body}`,
      { slug },
      { next: { revalidate: 300, tags: ["posts"] } },
    );
    return post ? normalize(post) : null;
  } catch (err) {
    console.error("Sanity getPost failed:", err);
    return null;
  }
}
