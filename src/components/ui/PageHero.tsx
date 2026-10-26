import Image from "next/image";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#050a16] text-white">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Image src="/images/haxagon.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050a16]/40 via-[#050a16]/70 to-[#050a16]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 mask-fade-y" />
      <div className="absolute -top-24 left-1/2 -z-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="container-x py-20 sm:py-24 lg:py-28">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                <LuChevronRight className="h-3.5 w-3.5" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-slate-200">{c.name}</span>
                ) : (
                  <Link href={c.path} className="hover:text-white">{c.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
