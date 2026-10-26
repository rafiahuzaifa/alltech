// Articles written in code (alongside Sanity posts). Inline text supports **bold** and [label](/link).
export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  keywords: string[];
  sections: ArticleSection[];
  faqs?: { q: string; a: string }[];
};
