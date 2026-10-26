import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuRepeat, LuShoppingCart, LuTag, LuRoute } from "react-icons/lu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

const services = [
  {
    href: "/buy-ipv4",
    icon: LuShoppingCart,
    title: "Buy IPv4 addresses",
    text: "Own your address space outright. We match you with clean, competitively priced IPv4 blocks from our inventory and seller network — backed by a 100% satisfaction guarantee.",
    image: "/images/b8.jpg",
    span: "lg:col-span-2",
    points: ["/24 to /16 and larger", "Reputation-checked", "Full RIR transfer handled"],
  },
  {
    href: "/sell-ipv4",
    icon: LuTag,
    title: "Sell IPv4 addresses",
    text: "Turn unused IPv4 space into capital. Free valuation, vetted buyers worldwide and a secure, legal transfer.",
    image: "/images/b9.avif",
    span: "",
  },
  {
    href: "/lease-ipv4",
    icon: LuRepeat,
    title: "Lease IPv4 addresses",
    text: "Flexible monthly plans with LOA provided — get clean IPv4 space announced from your ASN within 48 hours.",
    image: "/images/b10.webp",
    span: "",
  },
  {
    href: "/contact",
    icon: LuRoute,
    title: "Transfer & RIR support",
    text: "Already found a counterparty? Our specialists handle due diligence, agreements and registry paperwork with ARIN, RIPE NCC, APNIC, LACNIC and AFRINIC, so your transfer completes without surprises.",
    image: "/images/b11.jpg",
    span: "lg:col-span-2",
    points: ["Ownership verification", "Transfer agreements", "Registry filing & follow-up"],
  },
];

export default function ServicesBento() {
  return (
    <section className="container-x py-24" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">grow your network</span></>}
        description="One partner for the entire IPv4 lifecycle — acquisition, monetization, leasing and compliant registry transfers."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.href} delay={i * 0.08} className={s.span}>
            <Link href={s.href} className="card card-hover group relative flex h-full min-h-[320px] flex-col overflow-hidden p-8">
              <Image src={s.image} alt="" fill sizes="(min-width:1024px) 66vw, 100vw" className="-z-10 object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-15" />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25">
                  <s.icon className="h-6 w-6" />
                </span>
                <LuArrowUpRight className="h-6 w-6 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
              </div>
              <h3 className="mt-8 text-2xl font-bold text-ink">{s.title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-muted">{s.text}</p>
              {s.points && (
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink/80">{p}</li>
                  ))}
                </ul>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
