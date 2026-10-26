import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCheck, LuMail, LuPhone } from "react-icons/lu";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBand from "@/components/ui/CtaBand";
import InquiryForm, { type InquiryType } from "@/components/forms/InquiryForm";
import JsonLd from "@/components/site/JsonLd";
import type { Faq } from "@/lib/faq";
import { faqLd, serviceLd } from "@/lib/seo";
import { site } from "@/lib/site";

export type ServiceContent = {
  type: InquiryType;
  path: string;
  crumb: string;
  eyebrow: string;
  title: React.ReactNode;
  heroText: string;
  schemaName: string;
  schemaDescription: string;
  introTitle: string;
  intro: string[];
  bullets: string[];
  image: { src: string; alt: string };
  stepsTitle: string;
  steps: { title: string; text: string }[];
  benefits?: { title: string; text: string }[];
  faqs: Faq[];
  formTitle: string;
};

export default function ServiceTemplate(c: ServiceContent) {
  return (
    <>
      <JsonLd data={[serviceLd({ name: c.schemaName, description: c.schemaDescription, path: c.path }), faqLd(c.faqs)]} />
      <PageHero eyebrow={c.eyebrow} title={c.title} description={c.heroText} crumbs={[{ name: c.crumb, path: c.path }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#request" className="btn-primary">{c.formTitle} <LuArrowRight className="h-4 w-4" /></a>
          <a href={site.phoneHref} className="btn-light"><LuPhone className="h-4 w-4" /> {site.phone}</a>
        </div>
      </PageHero>

      <section className="container-x py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{c.introTitle}</h2>
            {c.intro.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lg leading-8 text-muted">{p}</p>
            ))}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"><LuCheck className="h-3.5 w-3.5" /></span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-cyan-400/20 blur-2xl" />
            <div className="card overflow-hidden p-2">
              <Image src={c.image.src} alt={c.image.alt} width={800} height={560} sizes="(min-width:1024px) 50vw, 100vw" className="h-auto w-full rounded-[1.25rem] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-24" aria-labelledby="steps-title">
        <div className="container-x">
          <SectionHeading id="steps-title" eyebrow="Process" title={c.stepsTitle} />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="card card-hover relative p-7">
                <span className="font-display text-5xl font-extrabold text-brand/15">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {c.benefits && (
        <section className="container-x py-24" aria-labelledby="benefits-title">
          <SectionHeading id="benefits-title" eyebrow="Benefits" title={`Why ${c.crumb.toLowerCase()} with All Tech`} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="card p-7">
                <h3 className="text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="request" className="scroll-mt-24 py-24" aria-label={c.formTitle}>
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Free consultation</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{c.formTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Tell us a little about your requirements and a dedicated IP specialist will reply within one business day.
            </p>
            <div className="mt-8 space-y-3">
              <a href={site.phoneHref} className="card card-hover flex items-center gap-4 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand"><LuPhone className="h-5 w-5" /></span>
                <span><span className="block text-xs text-muted">Call us</span><span className="font-semibold text-ink">{site.phone}</span></span>
              </a>
              <a href={`mailto:${site.emails.ipv4}`} className="card card-hover flex items-center gap-4 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand"><LuMail className="h-5 w-5" /></span>
                <span><span className="block text-xs text-muted">Email us</span><span className="font-semibold text-ink">{site.emails.ipv4}</span></span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <InquiryForm type={c.type} />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface py-24" aria-labelledby="svc-faq-title">
        <div className="container-x max-w-4xl">
          <SectionHeading id="svc-faq-title" eyebrow="FAQ" title="Frequently asked questions" />
          <Reveal delay={0.1} className="mt-12">
            <FaqAccordion items={c.faqs} />
          </Reveal>
          <p className="mt-8 text-center text-sm text-muted">
            More questions? <Link href="/faq" className="font-semibold text-brand hover:underline">Browse all FAQs</Link> or{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">contact us</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
