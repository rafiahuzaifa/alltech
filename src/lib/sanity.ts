import { client } from "@/sanity/lib/client";
import type { PortableTextBlock } from "next-sanity";

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

export type Post = PostCard & { body: PortableTextBlock[] };

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

export async function getPosts(limit?: number): Promise<PostCard[]> {
  try {
    const range = limit ? `[0...${limit}]` : "";
    const posts = await client.fetch<PostCard[]>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)${range}{${CARD_FIELDS}}`,
      {},
      { next: { revalidate: 300, tags: ["posts"] } },
    );
    return posts.map(normalize);
  } catch (err) {
    console.error("Sanity getPosts failed:", err);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
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
