import Link from "next/link";
import { LuArrowRight, LuPhone } from "react-icons/lu";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export default function CtaBand({
  title = "Ready to secure your IPv4 space?",
  description = "Talk to an IP specialist today. Free valuation, transparent pricing and end-to-end RIR transfer handling.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container-x py-20">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 px-6 py-14 text-center text-white shadow-2xl shadow-blue-600/30 sm:px-12 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-50/90">{description}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn bg-white text-blue-700 shadow-lg hover:-translate-y-0.5 hover:bg-blue-50">
            Get a free quote <LuArrowRight className="h-4 w-4" />
          </Link>
          <a href={site.phoneHref} className="btn-light">
            <LuPhone className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
