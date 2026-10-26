import ServiceTemplate from "@/components/service/ServiceTemplate";
import { faqsFor } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Buy IPv4 Addresses — Clean /24 to /16 Blocks",
  description:
    "Buy clean, reputation-checked IPv4 address blocks at competitive prices. All Tech Cloud Services handles due diligence and the full ARIN, RIPE, APNIC, LACNIC or AFRINIC transfer.",
  path: "/buy-ipv4",
  keywords: ["buy IPv4 addresses", "buy IPv4 block", "purchase IPv4", "IPv4 for sale", "buy /24 IPv4", "IPv4 address price"],
});

export default function BuyPage() {
  return (
    <ServiceTemplate
      type="buy"
      path="/buy-ipv4"
      crumb="Buy IPv4"
      eyebrow="Buy IPv4 addresses"
      title={<>Buy IPv4 addresses — <span className="text-gradient">clean, compliant, fast</span></>}
      heroText="Secure the IPv4 space your network needs. We match you with reputation-checked blocks at competitive prices and manage the registry transfer end-to-end."
      schemaName="Buy IPv4 Addresses"
      schemaDescription="IPv4 address acquisition service: sourcing, due diligence and RIR transfer of IPv4 blocks from /24 upwards."
      introTitle="Own your IPv4 space with complete confidence"
      intro={[
        "Buying IPv4 addresses turns IP space into a long-term business asset. We maintain a broad inventory and a global seller network, so we can find the block size and registry that fits your needs — from a single /24 to large /16 allocations.",
        "As a trusted IPv4 broker, every transaction follows strict due diligence and registry policy. And with our 100% satisfaction guarantee, you can buy with confidence.",
      ]}
      bullets={["Blocks from /24 to /16 and larger", "Blacklist & routing-history checks", "ARIN, RIPE, APNIC, LACNIC, AFRINIC", "Transfer paperwork handled for you", "Competitive, transparent pricing", "100% satisfaction guarantee"]}
      image={{ src: "/images/buy.png", alt: "Buying IPv4 address blocks through All Tech Cloud Services" }}
      stepsTitle="How buying IPv4 works"
      steps={[
        { title: "Acquisition request", text: "Tell us the block size, registry and timeline. We locate a matching offer from our inventory or seller network." },
        { title: "Contract & payment", text: "Agree terms, sign the purchase agreement and arrange payment through your preferred method." },
        { title: "Ownership transfer", text: "We prepare all documentation and file the transfer with the relevant Regional Internet Registry." },
        { title: "Transaction complete", text: "Once the RIR confirms registration in your name, funds are released to the seller and the block is yours." },
      ]}
      benefits={[
        { title: "Long-term asset", text: "Purchased IPv4 space is yours to use, re-assign or sell later — with no recurring lease fees." },
        { title: "Clean reputation", text: "Every block is screened before sale so you can announce it immediately without deliverability issues." },
        { title: "Expert guidance", text: "A dedicated specialist helps you choose the right size and registry for your growth plans." },
      ]}
      faqs={faqsFor("buy")}
      formTitle="Request IPv4 inventory"
    />
  );
}
