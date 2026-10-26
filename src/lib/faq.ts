export type Faq = { q: string; a: string; tags: ("general" | "buy" | "sell" | "lease" | "asn")[] };

export const faqs: Faq[] = [
  {
    q: "What is an IPv4 address?",
    a: "An IPv4 (Internet Protocol version 4) address is a unique 32-bit numerical identifier assigned to a device or network interface. It lets devices find and talk to each other on the internet and is still the backbone of global connectivity.",
    tags: ["general"],
  },
  {
    q: "Why are IPv4 addresses still so valuable?",
    a: "Only about 4.3 billion IPv4 addresses exist and every Regional Internet Registry has exhausted its free pool. Because most networks, cloud platforms and customers still rely on IPv4 while IPv6 adoption continues, the only way to get new space is the secondary market — buying, selling or leasing existing blocks.",
    tags: ["general", "buy"],
  },
  {
    q: "How does an IPv4 transfer work?",
    a: "We match a buyer and seller, verify the seller's ownership and the block's reputation, sign a transfer agreement, and then file the transfer with the relevant Regional Internet Registry (ARIN, RIPE NCC, APNIC, LACNIC or AFRINIC). Funds are released once the RIR confirms the new registration.",
    tags: ["general", "buy", "sell"],
  },
  {
    q: "How long does it take to buy IPv4 addresses?",
    a: "Most purchases complete in one to four weeks. The main variables are the size of the block, inventory availability and the processing time of the Regional Internet Registry involved. We handle the paperwork and keep you updated at every step.",
    tags: ["buy"],
  },
  {
    q: "How much is my IPv4 block worth?",
    a: "Price per address depends on block size (larger blocks usually command a higher per-IP price), the registry, the block's reputation history and current market demand. Submit your block through our sell form and we'll send a free, no-obligation valuation.",
    tags: ["sell"],
  },
  {
    q: "Do you check the reputation of IPv4 blocks?",
    a: "Yes. Every block we broker is checked against major blacklists and reviewed for routing history and abuse reports before it is offered, so you receive clean space that is ready to announce.",
    tags: ["buy", "lease"],
  },
  {
    q: "How quickly can I lease IPv4 addresses?",
    a: "Leased IPv4 space can typically be delivered within 48 hours: we agree the block size and term, sign a service contract, invoice you, and issue a Letter of Authorization (LOA) so you can announce the prefix from your ASN.",
    tags: ["lease"],
  },
  {
    q: "Should I lease or buy IPv4 addresses?",
    a: "Buying makes the addresses a long-term business asset with full control and no recurring fees. Leasing has a lower upfront cost and more flexibility for short projects or fast growth. We can help you model both options for your situation.",
    tags: ["lease", "buy"],
  },
  {
    q: "What is an ASN and do I need one?",
    a: "An Autonomous System Number (ASN) uniquely identifies a network that has its own routing policy. You need one to announce your IP space independently via BGP. You can obtain an ASN from your Regional Internet Registry, and we can guide you through the process.",
    tags: ["asn", "lease"],
  },
  {
    q: "What are Regional Internet Registries (RIRs)?",
    a: "RIRs are the five organizations that allocate and register IP addresses and ASNs: ARIN (North America), RIPE NCC (Europe, Middle East, Central Asia), APNIC (Asia Pacific), LACNIC (Latin America) and AFRINIC (Africa). We work with all five.",
    tags: ["general"],
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept bank transfer, major cards (Visa, Mastercard, American Express), PayPal, Payoneer, Wise and selected digital options. Payment terms are confirmed in your service contract.",
    tags: ["general", "buy", "lease"],
  },
  {
    q: "Why choose All Tech Cloud Services?",
    a: "We are an APNIC-registered IPv4 broker founded in 2019, with 1,200+ successful projects across 50+ countries. You get a dedicated IP specialist, clean reputation-checked blocks, transparent pricing and end-to-end handling of every RIR transfer.",
    tags: ["general"],
  },
];

export const faqsFor = (tag: Faq["tags"][number], limit = 6) =>
  faqs.filter((f) => f.tags.includes(tag)).slice(0, limit);
