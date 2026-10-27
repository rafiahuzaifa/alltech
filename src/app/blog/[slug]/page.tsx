import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { LuArrowLeft, LuArrowRight, LuCalendar, LuClock, LuUser } from "react-icons/lu";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import ArticleBody from "@/components/blog/ArticleBody";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { faqLd } from "@/lib/seo";
import { excerpt, getPost, getPosts, readingTime } from "@/lib/sanity";
import { SITE_URL, site } from "@/lib/site";
import { urlFor } from "@/sanity/lib/client";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const description = post.description || excerpt(post.plain, 155);
  const suffix = " | All Tech Cloud Services";
  return {
    // Long headlines would be truncated by Google, so drop the brand suffix for those.
    title: post.title.length + suffix.length > 65 ? { absolute: post.title } : post.title,
    description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: [
        post.image
          ? { url: `${post.image}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630 }
          : { url: "/opengraph-image", width: 1200, height: 630 },
      ],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [post.image ? `${post.image}?w=1200&h=630&fit=crop&auto=format` : "/opengraph-image"] },
  };
}

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      let href: string = value?.href || "#";
      // Editors sometimes paste "www.example.com" or "http:www.example.com", which browsers can resolve as relative paths.
      if (/^www\./i.test(href)) href = `https://${href}`;
      href = href.replace(/^(https?):(?!\/\/)/i, "$1://");
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image src={urlFor(value).width(1400).auto("format").url()} alt={value.alt || ""} width={1400} height={788} className="h-auto w-full rounded-2xl" />
      ) : null,
  },
};

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description || excerpt(post.plain, 155),
          keywords: post.keywords?.join(", "),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: site.name },
          publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${SITE_URL}${site.logo}` } },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          image: post.image ? [post.image] : [`${SITE_URL}/opengraph-image`],
          wordCount: post.plain?.split(/\s+/).length,
        }}
      />
      <PageHero
        eyebrow="Insights"
        title={post.title}
        crumbs={[
          { name: "Insights", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
          {post.author && <span className="flex items-center gap-2"><LuUser className="h-4 w-4 text-cyan-300" /> {post.author}</span>}
          <span className="flex items-center gap-2"><LuCalendar className="h-4 w-4 text-cyan-300" /> <time dateTime={post.publishedAt}>{date}</time></span>
          <span className="flex items-center gap-2"><LuClock className="h-4 w-4 text-cyan-300" /> {readingTime(post.plain)} min read</span>
        </div>
      </PageHero>

      <article className="container-x max-w-3xl py-16">
        {post.image && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-line">
            <Image src={`${post.image}?w=1400&auto=format`} alt={post.imageAlt || post.title} width={1400} height={788} priority className="h-auto w-full" />
          </div>
        )}
        <div className="prose-article">
          {post.sections ? <ArticleBody sections={post.sections} /> : post.body && <PortableText value={post.body} components={components} />}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-14" aria-labelledby="article-faq">
            <JsonLd data={faqLd(post.faqs.map((f) => ({ ...f, tags: [] })))} />
            <h2 id="article-faq" className="mb-6 text-2xl font-extrabold text-ink sm:text-3xl">Frequently asked questions</h2>
            <FaqAccordion items={post.faqs.map((f) => ({ ...f, tags: [] }))} />
          </section>
        )}

        <nav aria-label="More articles" className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="card card-hover p-5">
              <span className="flex items-center gap-1.5 text-xs text-muted"><LuArrowLeft className="h-3.5 w-3.5" /> Previous</span>
              <span className="mt-1 block font-semibold text-ink">{older.title}</span>
            </Link>
          ) : <span />}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="card card-hover p-5 text-right">
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted">Next <LuArrowRight className="h-3.5 w-3.5" /></span>
              <span className="mt-1 block font-semibold text-ink">{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
      <CtaBand />
    </>
  );
}
