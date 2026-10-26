export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://alltechcloudservices.com").replace(/\/$/, "");

export const site = {
  name: "All Tech Cloud Services",
  shortName: "ATCS",
  legalName: "AllTechCloudServices",
  tagline: "Where Connectivity Meets Possibility",
  description:
    "APNIC-registered IPv4 broker since 2019. Buy, sell and lease clean IPv4 address blocks across ARIN, RIPE NCC, APNIC, LACNIC and AFRINIC — fast, compliant and fully managed.",
  foundingYear: 2019,
  phone: "+1 (737) 304-5613",
  phoneHref: "tel:+17373045613",
  whatsapp: "923322530689",
  emails: {
    sales: "sales@alltechcloudservices.com",
    ipv4: "ipv4@alltechcloudservices.com",
    info: "info@alltechcloudservices.com",
  },
  address: {
    street: "5900 Balcones Drive, STE 17904",
    city: "Austin",
    region: "TX",
    postalCode: "78731",
    country: "US",
  },
  mapEmbed:
    "https://www.google.com/maps?q=5900+Balcones+Dr,+Austin,+TX+78731&output=embed",
  logo: "/images/main.jpg",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const nav = [
  { href: "/buy-ipv4", label: "Buy IPv4" },
  { href: "/sell-ipv4", label: "Sell IPv4" },
  { href: "/lease-ipv4", label: "Lease IPv4" },
  { href: "/ipv4-subnet-calculator", label: "Calculator" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

export const rirs = [
  { name: "ARIN", region: "North America", logo: "/images/r3.png", url: "https://www.arin.net" },
  { name: "RIPE NCC", region: "Europe & Middle East", logo: "/images/r1.jpeg", url: "https://www.ripe.net" },
  { name: "APNIC", region: "Asia Pacific", logo: "/images/r4.png", url: "https://www.apnic.net" },
  { name: "LACNIC", region: "Latin America", logo: "/images/r5.png", url: "https://www.lacnic.net" },
  { name: "AFRINIC", region: "Africa", logo: "/images/r6.png", url: "https://afrinic.net" },
] as const;

export const stats = [
  { value: 6, suffix: "+", label: "Years of brokerage experience" },
  { value: 1200, suffix: "+", label: "Successful projects" },
  { value: 20, suffix: "+", label: "In-house IP specialists" },
  { value: 50, suffix: "+", label: "Countries served" },
] as const;

export const paymentMethods = [
  { src: "/images/p12.png", alt: "PayPal" },
  { src: "/images/p2.jpeg", alt: "Mastercard" },
  { src: "/images/p13.png", alt: "Payoneer" },
  { src: "/images/p5.png", alt: "Bank transfer" },
  { src: "/images/p61.png", alt: "Slash" },
  { src: "/images/p3.png", alt: "Wise" },
] as const;
