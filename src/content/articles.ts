import type { Article } from "./types";

const AUTHOR = "All Tech Cloud Services";

export const articles: Article[] = [
  {
    slug: "how-to-buy-ipv4-addresses",
    title: "How to Buy IPv4 Addresses: A Step-by-Step Guide for Businesses",
    description:
      "Learn how to buy IPv4 addresses safely: sizing your block, choosing a registry, vetting reputation, signing the agreement and completing the RIR transfer.",
    publishedAt: "2026-10-26T09:00:00.000Z",
    author: AUTHOR,
    keywords: ["how to buy IPv4 addresses", "buy IPv4 block", "IPv4 transfer", "IPv4 broker"],
    sections: [
      {
        paragraphs: [
          "Every Regional Internet Registry (RIR) has exhausted its free pool of IPv4 addresses. If your business needs new IPv4 space today — for hosting, a growing ISP, a SaaS platform or a new data center — the practical route is to **buy IPv4 addresses on the transfer market** from an organization that no longer needs them.",
          "Buying IPv4 is not like buying a domain name. The addresses must be formally re-registered to you by the relevant RIR, and a block's history can affect how useful it is. This guide walks through the process step by step so you know what to expect and what to check.",
        ],
      },
      {
        heading: "Step 1: Work out how many addresses you need",
        paragraphs: [
          "Start by sizing your requirement in CIDR notation. A **/24 contains 256 addresses** and is the smallest prefix generally accepted in the global BGP routing table, so it is the minimum most businesses buy for public use. Each step up doubles the size: a /23 is 512 addresses, a /22 is 1,024 and so on.",
          "Plan for at least 12–24 months of growth. Buying one larger block is usually simpler to route and manage than several small ones. Our free [IPv4 subnet calculator](/ipv4-subnet-calculator) shows the address count, usable hosts and masks for any prefix.",
        ],
      },
      {
        heading: "Step 2: Know which registry you will use",
        paragraphs: [
          "IPv4 space is registered with one of five RIRs: **ARIN** (North America), **RIPE NCC** (Europe, the Middle East and Central Asia), **APNIC** (Asia Pacific), **LACNIC** (Latin America and the Caribbean) and **AFRINIC** (Africa). You normally need an account (membership) with the RIR that will hold your registration.",
          "Each registry has its own transfer policy. Some require the buyer to document a need for the addresses before the transfer is approved; some apply holding periods after a transfer; and inter-RIR transfers are only possible between registries whose policies allow them. A good broker will check the current policy for your specific case before you commit.",
        ],
      },
      {
        heading: "Step 3: Source a block and check its reputation",
        paragraphs: [
          "Once you know the size and registry, a broker can match you with available inventory. Before agreeing a price, the block should be checked for:",
        ],
        list: [
          "**Blacklist history** — listings on major spam and abuse databases can cause email delivery and access problems.",
          "**Routing history** — previous announcements, hijack reports or unusual BGP activity.",
          "**Geolocation data** — where geo-IP databases currently place the block, which can affect streaming, banking and ad services for your users.",
          "**Clean registration** — the seller must be the verified registrant with the right to transfer the block.",
        ],
      },
      {
        heading: "Step 4: Agree terms and sign the transfer agreement",
        paragraphs: [
          "Price per address depends on block size, registry, reputation and market conditions (see our guide on [what drives IPv4 prices](/blog/ipv4-address-price-factors)). Once terms are agreed, buyer and seller sign a written transfer agreement that covers the block, price, payment timing and each party's obligations.",
          "Payment is usually structured so that funds are only released to the seller after the registry has confirmed the transfer, protecting both sides.",
        ],
      },
      {
        heading: "Step 5: Complete the RIR transfer",
        paragraphs: [
          "The transfer request is submitted to the registry with the supporting documents. The RIR reviews ownership, policy compliance and — where required — the buyer's justification. Timelines vary by registry and by how complete the paperwork is; many purchases complete within one to four weeks.",
          "When the registry updates the record, the block is registered to your organization. You can then create route objects and RPKI ROAs and announce the prefix from your ASN.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        list: [
          "Buying the smallest possible block and running out within months.",
          "Skipping reputation checks to save time — cleaning up a listed block later is slow.",
          "Paying before the registry transfer is confirmed.",
          "Not checking whether your registry requires needs justification before you sign.",
        ],
      },
      {
        heading: "Buy IPv4 with an experienced broker",
        paragraphs: [
          "All Tech Cloud Services has helped businesses across 50+ countries buy clean IPv4 space since 2019, handling due diligence, agreements and the RIR transfer end-to-end. [Request IPv4 inventory](/buy-ipv4) and a specialist will reply within 24 hours.",
        ],
      },
    ],
    faqs: [
      { q: "What is the smallest IPv4 block I can buy?", a: "Most buyers start with a /24 (256 addresses) because it is the smallest prefix generally accepted in global BGP routing. Smaller blocks are hard to use on the public internet." },
      { q: "How long does it take to buy IPv4 addresses?", a: "Many purchases complete in one to four weeks, depending on block availability, how quickly the agreement is signed and the registry's processing time." },
      { q: "Do I need to be an RIR member to buy IPv4?", a: "In most cases the buyer needs an account with the registry that will hold the registration. Your broker can confirm the requirements for your region." },
    ],
  },
  {
    slug: "how-to-sell-ipv4-addresses",
    title: "How to Sell IPv4 Addresses and Get the Best Price",
    description:
      "Have unused IPv4 space? Learn how to sell IPv4 addresses: valuing your block, preparing ownership documents, choosing a buyer and completing a secure transfer.",
    publishedAt: "2026-10-26T09:00:00.000Z",
    author: AUTHOR,
    keywords: ["sell IPv4 addresses", "sell IPv4 block", "IPv4 valuation", "monetize unused IP addresses"],
    sections: [
      {
        paragraphs: [
          "Many organizations hold IPv4 addresses they no longer use — legacy allocations from the early internet, space freed up by network consolidation, or blocks left over after moving workloads to the cloud. Because IPv4 supply is fixed, that unused space has real market value.",
          "Selling IPv4 addresses is a regulated process: the block must be transferred through the Regional Internet Registry (RIR). Here is how to do it safely and get a strong price.",
        ],
      },
      {
        heading: "1. Confirm what you actually hold",
        paragraphs: [
          "Start with an inventory. Log in to your RIR account (ARIN, RIPE NCC, APNIC, LACNIC or AFRINIC) and list every block registered to your organization. Check:",
        ],
        list: [
          "The exact prefixes and their sizes (for example 203.0.113.0/24).",
          "That the registered organization name matches your current legal entity. Mergers, acquisitions and name changes often leave records out of date and must be fixed before a sale.",
          "Whether any of the space is still announced or used internally — it must be renumbered or released before transfer.",
        ],
      },
      {
        heading: "2. Understand what determines value",
        paragraphs: [
          "The price per address is influenced by block size, registry, the block's reputation and current demand. Larger contiguous blocks are generally easier to sell and can command a stronger per-address price than fragmented small blocks. Clean history — no blacklisting or abuse — also matters. Read more in our guide to [IPv4 pricing factors](/blog/ipv4-address-price-factors).",
        ],
      },
      {
        heading: "3. Clean up the block before listing",
        list: [
          "Stop announcing the prefix (or plan a cut-over date) and remove it from customer use.",
          "Request removal from any blacklists where it is listed.",
          "Delete or update stale route objects and RPKI ROAs once the space is no longer in use.",
          "Gather documents proving your organization's right to the block.",
        ],
      },
      {
        heading: "4. Choose how to sell",
        paragraphs: [
          "You can try to find a buyer yourself, list on a marketplace, or work with a broker. A broker brings a network of vetted buyers, handles negotiation and paperwork, and manages the registry process — which matters, because a failed or delayed transfer costs time and money for both sides.",
        ],
      },
      {
        heading: "5. Sign the agreement and complete the transfer",
        paragraphs: [
          "After agreeing a price, seller and buyer sign a transfer agreement. The transfer is submitted to the RIR, which verifies ownership and policy compliance. Once the registry confirms the new registration, funds are released to you using your preferred payment method.",
        ],
      },
      {
        heading: "Get a free valuation",
        paragraphs: [
          "All Tech Cloud Services connects IPv4 sellers with qualified buyers worldwide and manages the transfer end-to-end. [Submit your block for a free, no-obligation valuation](/sell-ipv4) — we reply within 24 hours.",
        ],
      },
    ],
    faqs: [
      { q: "Can I sell only part of my IPv4 allocation?", a: "Often yes — a larger block can usually be split and part of it transferred, subject to the registry's policy. Keeping the sold portion as a clean, aligned prefix makes it easier to sell." },
      { q: "When do I get paid for my IPv4 addresses?", a: "Typically after the Regional Internet Registry confirms the transfer to the buyer. This protects both parties." },
      { q: "Do I need to stop using the addresses before selling?", a: "Yes. The block must be free of customers and announcements by the time it is transferred, so plan any renumbering in advance." },
    ],
  },
  {
    slug: "ipv4-address-price-factors",
    title: "How Much Does an IPv4 Address Cost? 6 Factors That Drive the Price",
    description:
      "IPv4 prices vary block by block. Learn the six factors behind what an IPv4 address costs: size, registry, reputation, demand, transfer terms and leasing.",
    publishedAt: "2026-10-26T09:00:00.000Z",
    author: AUTHOR,
    keywords: ["IPv4 price", "IPv4 address cost", "price per IP address", "IPv4 market value"],
    sections: [
      {
        paragraphs: [
          "“How much does an IPv4 address cost?” is the first question most buyers and sellers ask. There is no single fixed price: IPv4 is a secondary market where every block is different, and prices move with supply and demand. What you can do is understand the factors that push a specific block's price up or down.",
        ],
      },
      {
        heading: "1. Block size",
        paragraphs: [
          "Prices are usually quoted **per address**, but the size of the block changes that per-address figure. Larger contiguous blocks (for example /20 or /16) are scarce and attractive to large networks, while small blocks such as a single /24 serve a much wider pool of buyers. Because the dynamics differ, per-address pricing can vary noticeably between small and large blocks.",
        ],
      },
      {
        heading: "2. Regional Internet Registry",
        paragraphs: [
          "Where the block is registered — ARIN, RIPE NCC, APNIC, LACNIC or AFRINIC — affects who can buy it and how easily it can be transferred. Policies on needs justification, holding periods and inter-RIR transfers all influence demand for space in each region.",
        ],
      },
      {
        heading: "3. Reputation and history",
        paragraphs: [
          "A block that has been blacklisted, used for spam or involved in abuse is worth less, because the buyer inherits clean-up work. Clean routing history, accurate geolocation and no outstanding abuse reports support a higher price.",
        ],
      },
      {
        heading: "4. Market demand",
        paragraphs: [
          "Demand from cloud providers, hosting companies, ISPs and enterprises rises and falls over time, as does the volume of space being released by sellers. Broker quotes reflect the market at the time of the deal, so a price from last year may not hold today.",
        ],
      },
      {
        heading: "5. Transfer terms",
        paragraphs: [
          "Who pays registry fees, how quickly the transfer must close, and how payment is protected all affect the final number. Simple, well-documented transfers with motivated parties tend to close at better terms for both sides.",
        ],
      },
      {
        heading: "6. Buying versus leasing",
        paragraphs: [
          "Buying is a one-off capital cost for a long-term asset you can later resell. [Leasing](/blog/ipv4-leasing-explained) is a recurring monthly cost with no ownership, but a much lower upfront spend. Which is cheaper depends on how long you need the space.",
        ],
      },
      {
        heading: "Get an accurate quote",
        paragraphs: [
          "Because every block is different, the reliable way to know the price is a current quote for your exact size and registry. [Request a buying quote](/buy-ipv4), [get a free valuation for your block](/sell-ipv4), or [compare leasing options](/lease-ipv4) with All Tech Cloud Services.",
        ],
      },
    ],
    faqs: [
      { q: "Is IPv4 priced per address or per block?", a: "Prices are normally quoted per address and multiplied by the block size, but the per-address figure itself depends on the size and quality of the block." },
      { q: "Will IPv4 prices go down as IPv6 grows?", a: "Nobody can predict prices with certainty. Demand depends on how quickly networks and services adopt IPv6, and most still rely heavily on IPv4 today." },
    ],
  },
  {
    slug: "ipv4-leasing-explained",
    title: "IPv4 Leasing Explained: How It Works, LOA, ROA and What to Check",
    description:
      "How IPv4 leasing works: what an LOA and RPKI ROA are, how to announce leased space from your ASN, and what to check before you sign a lease.",
    publishedAt: "2026-10-26T09:00:00.000Z",
    author: AUTHOR,
    keywords: ["lease IPv4 addresses", "IPv4 leasing", "IPv4 LOA", "ROA for leased IP", "rent IPv4"],
    sections: [
      {
        paragraphs: [
          "Leasing IPv4 addresses lets you use public IPv4 space without buying it. It is popular with hosting providers, VPN and proxy services, start-ups and any network that needs capacity quickly or only for a defined period. Here is how IPv4 leasing works and what to look for in a provider.",
        ],
      },
      {
        heading: "How an IPv4 lease works",
        paragraphs: [
          "The block stays registered to the owner (the lessor), and you (the lessee) receive the right to use it for an agreed term in exchange for a recurring fee. Typical terms range from one month to several years. Because ownership does not change, there is no RIR transfer — which is why leased space can be delivered quickly, often within 48 hours.",
        ],
      },
      {
        heading: "Letter of Authorization (LOA)",
        paragraphs: [
          "An **LOA** is a document from the address holder authorizing your network to announce the prefix. Your upstream providers and transit carriers will usually ask for it before they accept routes for the leased block from your ASN.",
        ],
      },
      {
        heading: "RPKI ROA and route objects",
        paragraphs: [
          "More and more networks drop routes that fail **RPKI** validation. A **ROA (Route Origin Authorization)** published by the address holder states which ASN may originate the prefix. For leased space, the lessor should create a ROA authorizing your ASN, and route objects in the relevant Internet Routing Registry (IRR) should match. Without these, parts of the internet may not reach your addresses.",
        ],
      },
      {
        heading: "What to check before signing a lease",
        list: [
          "**Reputation** — the block should be checked against major blacklists before delivery.",
          "**Geolocation** — confirm where geo-IP databases place the block and whether it can be updated for your users.",
          "**ROA and IRR support** — the provider should create ROAs and route objects for your ASN.",
          "**Term and notice period** — know how long you are committed and how much notice is needed to renew or end the lease.",
          "**Abuse handling** — understand how abuse reports are handled, since they reference the address holder.",
          "**Scalability** — check whether you can add more space later from the same provider.",
        ],
      },
      {
        heading: "Do you need your own ASN?",
        paragraphs: [
          "To announce leased space independently via BGP you need an Autonomous System Number. If you don't have one, some providers can route the addresses on your behalf, or you can apply for an ASN through your RIR.",
        ],
      },
      {
        heading: "Lease IPv4 within 48 hours",
        paragraphs: [
          "All Tech Cloud Services leases clean, reputation-checked IPv4 blocks on flexible terms, with LOA provided so you can announce from your ASN. [Request a lease quote](/lease-ipv4) and our team will reply within 24 hours.",
        ],
      },
    ],
    faqs: [
      { q: "What is an LOA for IPv4?", a: "A Letter of Authorization is a document from the address holder that authorizes your network to announce a specific prefix. Upstream providers usually require it." },
      { q: "Why do I need a ROA for leased IPv4 space?", a: "Networks that enforce RPKI may reject your routes if no valid ROA authorizes your ASN to originate the prefix, making your addresses unreachable for some users." },
      { q: "Is leasing cheaper than buying IPv4?", a: "Leasing has a much lower upfront cost, while buying avoids recurring fees. Over a long period buying can work out cheaper; for short or uncertain needs leasing is usually more economical." },
    ],
  },
  {
    slug: "ipv4-vs-ipv6-why-businesses-still-need-ipv4",
    title: "IPv4 vs IPv6: Why Businesses Still Need IPv4 Addresses",
    description:
      "IPv6 adoption is growing, so why do businesses still buy and lease IPv4? We compare IPv4 and IPv6 and explain why IPv4 remains essential for most networks.",
    publishedAt: "2026-10-26T09:00:00.000Z",
    author: AUTHOR,
    keywords: ["IPv4 vs IPv6", "why IPv4 still matters", "IPv4 exhaustion", "IPv6 transition"],
    sections: [
      {
        paragraphs: [
          "IPv6 was designed to solve IPv4 exhaustion, and its adoption keeps growing. Yet demand for IPv4 addresses remains strong. If you are planning network growth, it helps to understand the difference between the two protocols — and why most businesses still need IPv4.",
        ],
      },
      {
        heading: "IPv4 and IPv6 at a glance",
        list: [
          "**Address size:** IPv4 uses 32-bit addresses (about 4.3 billion in total); IPv6 uses 128-bit addresses, an almost unlimited pool.",
          "**Format:** IPv4 looks like 203.0.113.10; IPv6 looks like 2001:db8::10.",
          "**Availability:** every RIR has exhausted its free IPv4 pool; IPv6 is still readily available from registries.",
          "**Compatibility:** the two protocols are not directly compatible — an IPv6-only device cannot talk to an IPv4-only service without translation.",
        ],
      },
      {
        heading: "Why IPv4 is still essential",
        list: [
          "**Much of the internet is still reachable only over IPv4.** Many websites, APIs, email servers and enterprise systems have no IPv6 support.",
          "**Customers expect it.** Hosting clients, VPN users and enterprise customers frequently require dedicated public IPv4 addresses.",
          "**Dual-stack is the norm.** Most networks run IPv4 and IPv6 side by side during the transition, which still needs IPv4 space.",
          "**Translation has costs.** Carrier-grade NAT and IPv6-to-IPv4 translation add equipment, complexity and troubleshooting overhead, and can break some applications.",
        ],
      },
      {
        heading: "What this means for your business",
        paragraphs: [
          "Deploying IPv6 is a smart long-term investment, but it does not remove the need for IPv4 in the near term. Most growing networks need a plan for both: IPv6 for scale and future-proofing, and enough IPv4 to stay reachable by every user and service.",
          "If you need more IPv4, you can [buy IPv4 addresses](/buy-ipv4) as a long-term asset or [lease IPv4](/lease-ipv4) for flexibility. And if your transition to IPv6 frees up space, you can [sell your unused IPv4 block](/sell-ipv4).",
        ],
      },
    ],
    faqs: [
      { q: "Will IPv6 replace IPv4?", a: "IPv6 adoption is increasing, but the two will coexist for many years. Most networks currently run both protocols (dual-stack)." },
      { q: "Why did IPv4 addresses run out?", a: "IPv4 has only about 4.3 billion addresses, and the rapid growth of internet-connected devices and services used up the free pools held by the Regional Internet Registries." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug.toLowerCase() === slug.toLowerCase());
