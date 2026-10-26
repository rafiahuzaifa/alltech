import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuBadgeCheck,
  LuFileCheck,
  LuHandshake,
  LuHeadset,
  LuScale,
  LuSearch,
  LuShieldCheck,
  LuWallet,
  LuZap,
  LuGlobe,
} from "react-icons/lu";
import { Counter, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { paymentMethods, stats } from "@/lib/site";
import type { PostCard } from "@/lib/sanity";
import { excerpt, readingTime } from "@/lib/sanity";

export function Stats() {
  return (
    <section aria-label="Company highlights" className="container-x py-20">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-card p-8 text-center sm:p-10">
            <p className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { icon: LuSearch, title: "Tell us what you need", text: "Share the block size, registry and timeline — or the block you want to sell. We respond within 24 hours." },
  { icon: LuBadgeCheck, title: "Due diligence", text: "We verify ownership, check blacklists and routing history, and confirm the block meets RIR transfer policy." },
  { icon: LuFileCheck, title: "Agreement & payment", text: "A clear transfer agreement is signed by both parties and payment is arranged through your preferred method." },
  { icon: LuHandshake, title: "RIR transfer & handover", text: "We file and track the transfer with the registry. Once it's registered to you, funds are released to the seller." },
];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-surface py-24" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="A transparent, four-step transfer process"
          description="No guesswork and no hidden steps. A dedicated IP specialist guides you from first enquiry to completed registration."
        />
        <div className="relative mt-16">
        <div aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
              <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card text-brand shadow-sm lg:mx-0">
                <s.icon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-[11px] font-bold text-white">{i + 1}</span>
              </div>
              <h3 className="mt-6 text-center text-lg font-bold text-ink lg:text-left">{s.title}</h3>
              <p className="mt-2 text-center text-sm leading-6 text-muted lg:text-left">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: LuShieldCheck, title: "Clean, verified blocks", text: "Every block is screened against major blacklists and abuse databases before it reaches you." },
  { icon: LuScale, title: "Fully compliant", text: "Transfers follow ARIN, RIPE NCC, APNIC, LACNIC and AFRINIC policy, with legal agreements for both sides." },
  { icon: LuZap, title: "Fast turnaround", text: "Leases delivered within 48 hours and purchases typically completed in one to four weeks." },
  { icon: LuWallet, title: "Transparent pricing", text: "Competitive market rates with no hidden fees — you know the full cost before you sign." },
  { icon: LuHeadset, title: "Dedicated specialist", text: "One expert point of contact who manages your deal end-to-end and keeps you updated." },
  { icon: LuGlobe, title: "Global reach", text: "Buyers and sellers across 50+ countries, giving you more inventory and better offers." },
];

export function WhyUs() {
  return (
    <section className="container-x py-24" aria-labelledby="why-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow="Why All Tech"
            title={<>A broker built on <span className="text-gradient">trust and speed</span></>}
            description="Since 2019 we've helped ISPs, hosting providers, SaaS companies and enterprises secure the IPv4 space they need — and helped sellers unlock the value of unused blocks."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn-ghost">About our team <LuArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06} className="card card-hover p-6">
              <r.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-bold text-ink">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogCards({ posts }: { posts: PostCard[] }) {
  if (!posts.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <Reveal as="article" key={p.slug} delay={i * 0.08}>
          <Link href={`/blog/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-500">
              {p.image ? (
                <Image src={`${p.image}?w=800&auto=format`} alt={p.imageAlt || p.title} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <span className="absolute bottom-4 left-5 font-mono text-sm text-white/80">IPv4 · Insights</span>
                </>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs text-muted">
                <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                {" · "}{readingTime(p.plain)} min read
              </p>
              <h3 className="mt-3 text-lg leading-snug font-bold text-ink transition-colors group-hover:text-brand">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{excerpt(p.plain, 150)}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand">
                Read article <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function Payments() {
  return (
    <section className="container-x pb-8" aria-labelledby="pay-title">
      <div className="card flex flex-col items-center gap-8 p-8 sm:p-10 lg:flex-row lg:justify-between">
        <div className="max-w-md text-center lg:text-left">
          <h2 id="pay-title" className="text-xl font-bold text-ink">Flexible, secure payments</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Bank transfer, Visa, Mastercard, American Express, PayPal, Payoneer, Wise and selected digital options.
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {paymentMethods.map((m) => (
            <li key={m.alt} className="flex h-14 w-24 items-center justify-center rounded-xl border border-line bg-white p-2.5">
              <Image src={m.src} alt={m.alt} width={80} height={36} className="max-h-8 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
