import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBand from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/site/JsonLd";
import { faqs } from "@/lib/faq";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "IPv4 & ASN FAQ — Buying, Selling, Leasing and Transfers",
  description:
    "Answers to common questions about IPv4 addresses, IPv4 transfers, leasing, pricing, ASNs and Regional Internet Registries from the experts at All Tech Cloud Services.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <PageHero
        eyebrow="FAQ"
        title={<>Frequently asked <span className="text-gradient">questions</span></>}
        description="Everything you need to know about IPv4 addresses, transfers, leasing and ASNs."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <section className="container-x max-w-4xl py-20">
        <Reveal>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>
      <CtaBand title="Still have questions?" description="Our IPv4 specialists are happy to help — reach out and we'll reply within 24 hours." />
    </>
  );
}
