import ServiceTemplate from "@/components/service/ServiceTemplate";
import { faqsFor } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lease IPv4 Addresses in 48 Hours",
  description:
    "Lease clean IPv4 addresses on flexible monthly terms. Secure, stable IP blocks with LOA provided — delivered within 48 hours by All Tech Cloud Services.",
  path: "/lease-ipv4",
  keywords: ["lease IPv4 addresses", "rent IPv4", "IPv4 leasing", "IPv4 rental", "lease /24", "IPv4 LOA"],
});

export default function LeasePage() {
  return (
    <ServiceTemplate
      type="lease"
      path="/lease-ipv4"
      crumb="Lease IPv4"
      eyebrow="Lease IPv4 addresses"
      title={<>Lease IPv4 addresses <span className="text-gradient">within 48 hours</span></>}
      heroText="Flexible IPv4 rental plans with clean, stable address space — perfect for fast growth, new projects and short-term capacity."
      schemaName="Lease IPv4 Addresses"
      schemaDescription="IPv4 address leasing with flexible terms, Letter of Authorization (LOA) and delivery within 48 hours."
      introTitle="Reliable IPv4 space, without the upfront cost"
      intro={[
        "Looking for a reliable IP address provider? Lease IPv4 blocks from us and enjoy secure, stable addresses on flexible rental plans with quick, hassle-free setup.",
        "We issue a Letter of Authorization (LOA) so you can announce the prefix from your own ASN — typically within 48 hours of payment.",
      ]}
      bullets={["Secure, stable IPv4 blocks", "Flexible monthly to multi-year terms", "LOA for your ASN", "Delivered within 48 hours", "Reputation-checked space", "Scale up as you grow"]}
      image={{ src: "/images/b10.webp", alt: "Leasing IPv4 addresses for network infrastructure" }}
      stepsTitle="3 steps to lease IPv4 within 48 hours"
      steps={[
        { title: "Choose size & term", text: "Tell us how many addresses you need and for how long. We confirm availability right away." },
        { title: "Service contract", text: "Our IP specialist prepares the service contract for the agreed block size and leasing period." },
        { title: "Payment", text: "Once the contract is signed you receive an invoice and complete payment." },
        { title: "LOA & go live", text: "We issue the Letter of Authorization and assign the IP space — ready to announce from your ASN." },
      ]}
      benefits={[
        { title: "Lower upfront cost", text: "Get the IPv4 capacity you need now without the capital outlay of a purchase." },
        { title: "Maximum flexibility", text: "Scale your allocation up or down as projects and customer demand change." },
        { title: "Fast deployment", text: "From signed contract to announced prefix in as little as 48 hours." },
      ]}
      faqs={faqsFor("lease")}
      formTitle="Request a lease quote"
    />
  );
}
