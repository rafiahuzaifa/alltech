import PageHero from "@/components/ui/PageHero";
import { BlogCards } from "@/components/home/Sections";
import CtaBand from "@/components/ui/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/sanity";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "IPv4 Insights & Guides",
  description:
    "Expert guides on the IPv4 market: buying vs leasing, IPv4 block sizes, transfer processes and the benefits of working with an IPv4 broker.",
  path: "/blog",
});

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>IPv4 market <span className="text-gradient">insights &amp; guides</span></>}
        description="Practical, expert advice on buying, selling, leasing and transferring IPv4 address space."
        crumbs={[{ name: "Insights", path: "/blog" }]}
      />
      <section className="container-x py-20">
        {posts.length ? <BlogCards posts={posts} /> : <p className="text-center text-muted">New articles are coming soon.</p>}
      </section>
      <CtaBand />
    </>
  );
}
