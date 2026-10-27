import type { Metadata } from "next";
import { SITE_URL, fullAddress, site } from "./site";
import type { Faq } from "./faq";

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      // A page-level openGraph object replaces the root one, so the shared image must be repeated here.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${title} — ${site.name}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  alternateName: [site.legalName, site.shortName],
  url: SITE_URL,
  logo: `${SITE_URL}${site.logo}`,
  image: `${SITE_URL}/opengraph-image`,
  description: site.description,
  foundingDate: String(site.foundingYear),
  telephone: site.phone,
  email: site.emails.sales,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: "Worldwide",
  knowsAbout: ["IPv4 brokerage", "IPv4 transfers", "IPv4 leasing", "ASN", "Regional Internet Registries", "BGP"],
  contactPoint: [
    { "@type": "ContactPoint", telephone: site.phone, email: site.emails.sales, contactType: "sales", availableLanguage: ["English"] },
    { "@type": "ContactPoint", email: site.emails.ipv4, contactType: "customer support", availableLanguage: ["English"] },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IPv4 services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buy IPv4 addresses", url: `${SITE_URL}/buy-ipv4` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sell IPv4 addresses", url: `${SITE_URL}/sell-ipv4` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lease IPv4 addresses", url: `${SITE_URL}/lease-ipv4` } },
    ],
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export const faqLd = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const serviceLd = ({ name, description, path }: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: "IPv4 brokerage",
  url: `${SITE_URL}${path}`,
  areaServed: "Worldwide",
  provider: { "@id": `${SITE_URL}/#organization`, name: site.name, address: fullAddress },
});
