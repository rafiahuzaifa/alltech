import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Hero from "@/components/home/Hero";
import RirMarquee from "@/components/home/RirMarquee";
import ServicesBento from "@/components/home/ServicesBento";
import { BlogCards, Payments, Process, Stats, WhyUs } from "@/components/home/Sections";
import SubnetCalculator from "@/components/tools/SubnetCalculator";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBand from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/site/JsonLd";
import { faqsFor } from "@/lib/faq";
import { faqLd } from "@/lib/seo";
import { getPosts } from "@/lib/sanity";

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getPosts(3);
  const homeFaqs = faqsFor("general", 6);

  return (
    <>
      <JsonLd data={faqLd(homeFaqs)} />
      <Hero />
      <RirMarquee />
      <Stats />
      <ServicesBento />
      <Process />

      <section className="container-x py-24" aria-labelledby="calc-title">
        <SectionHeading
          id="calc-title"
          eyebrow="Free tool"
          title={<>How many IPv4 addresses <span className="text-gradient">do you need?</span></>}
          description="Use our subnet calculator to size your block — see total addresses, usable hosts and masks for any CIDR prefix."
        />
        <Reveal delay={0.1} className="mt-12">
          <SubnetCalculator compact />
        </Reveal>
      </section>

      <WhyUs />

      {posts.length > 0 && (
        <section className="bg-surface py-24" aria-labelledby="blog-title">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading id="blog-title" align="left" eyebrow="Insights" title="IPv4 market guides" description="Practical advice on buying, selling and leasing IPv4 space." />
              <Link href="/blog" className="btn-ghost shrink-0">All articles <LuArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-12">
              <BlogCards posts={posts} />
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-24" aria-labelledby="faq-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="faq-title" align="left" eyebrow="FAQ" title="Questions, answered" description="Everything you need to know about IPv4 addresses and transfers." />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/faq" className="btn-ghost">View all FAQs <LuArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FaqAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      <Payments />
      <CtaBand />
    </>
  );
}
