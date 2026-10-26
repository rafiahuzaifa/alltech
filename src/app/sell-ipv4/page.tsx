import ServiceTemplate from "@/components/service/ServiceTemplate";
import { faqsFor } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sell IPv4 Addresses — Free Valuation",
  description:
    "Sell unused IPv4 address blocks for the best market price. Free valuation, vetted global buyers and a secure, legal RIR transfer managed by All Tech Cloud Services.",
  path: "/sell-ipv4",
  keywords: ["sell IPv4 addresses", "sell IPv4 block", "IPv4 valuation", "IPv4 buyers", "monetize IPv4", "sell IP addresses"],
});

export default function SellPage() {
  return (
    <ServiceTemplate
      type="sell"
      path="/sell-ipv4"
      crumb="Sell IPv4"
      eyebrow="Sell IPv4 addresses"
      title={<>Sell IPv4 addresses for <span className="text-gradient">top market value</span></>}
      heroText="Unused IPv4 space is capital waiting to be unlocked. Get a free valuation and let us connect you with vetted buyers worldwide."
      schemaName="Sell IPv4 Addresses"
      schemaDescription="IPv4 address sales brokerage: free valuation, buyer matching and secure RIR transfer for IPv4 block owners."
      introTitle="Secure & efficient IPv4 address sales"
      intro={[
        "We excel as an IPv4 block sales platform, linking sellers with qualified buyers across the globe. As part of our full-service offering, we work with you and the buyer to complete the transfer legally, safely and efficiently.",
        "From valuation to the final registry update, a dedicated specialist manages every detail — so you get paid without the paperwork headache.",
      ]}
      bullets={["Free, no-obligation valuation", "Vetted buyers in 50+ countries", "Legal transfer agreements", "Registry filing handled for you", "Choose your payment method", "Strict confidentiality"]}
      image={{ src: "/images/SELL.png", alt: "Selling IPv4 address blocks with All Tech Cloud Services" }}
      stepsTitle="How selling IPv4 works"
      steps={[
        { title: "Selling request", text: "Submit your block, receive our offer and agree on terms — no obligation until you sign." },
        { title: "Ownership check", text: "We verify your registry ownership and review the block's reputation and routing history." },
        { title: "Agreement & transfer", text: "We prepare a formal agreement between buyer and seller and file the transfer with the RIR." },
        { title: "Get paid", text: "As soon as the transfer completes, funds are released using your preferred payment option." },
      ]}
      benefits={[
        { title: "Best market price", text: "Our global buyer network creates competition for your block, helping you achieve a stronger price." },
        { title: "Zero hassle", text: "We handle documentation, buyer vetting and registry communication from start to finish." },
        { title: "Secure payment", text: "Funds are released only when the transfer is confirmed, protecting both parties." },
      ]}
      faqs={faqsFor("sell")}
      formTitle="Get a free valuation"
    />
  );
}
