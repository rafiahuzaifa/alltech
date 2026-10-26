import Link from "next/link";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import Logo from "./Logo";
import { fullAddress, site } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/buy-ipv4", label: "Buy IPv4 Addresses" },
      { href: "/sell-ipv4", label: "Sell IPv4 Addresses" },
      { href: "/lease-ipv4", label: "Lease IPv4 Addresses" },
      { href: "/ipv4-subnet-calculator", label: "IPv4 Subnet Calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Insights & Guides" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050a16] text-slate-300">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-y" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            Founded in {site.foundingYear}, {site.name} is a privately held, APNIC-registered IPv4 broker headquartered in
            Austin, Texas — helping businesses buy, sell and lease IPv4 address space worldwide.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold tracking-wide text-white">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-cyan-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">Get in touch</h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex gap-3"><LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> {fullAddress}</p>
            <a href={site.phoneHref} className="flex gap-3 hover:text-cyan-300"><LuPhone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> {site.phone}</a>
            <a href={`mailto:${site.emails.sales}`} className="flex gap-3 hover:text-cyan-300"><LuMail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> {site.emails.sales}</a>
            <a href={`mailto:${site.emails.ipv4}`} className="flex gap-3 hover:text-cyan-300"><LuMail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> {site.emails.ipv4}</a>
          </address>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>IPv4 brokerage · ARIN · RIPE NCC · APNIC · LACNIC · AFRINIC</p>
        </div>
      </div>
    </footer>
  );
}
