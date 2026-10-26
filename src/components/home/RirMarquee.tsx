import Image from "next/image";
import { rirs } from "@/lib/site";

export default function RirMarquee() {
  const items = [...rirs, ...rirs, ...rirs];
  return (
    <section aria-label="Regional Internet Registries we work with" className="border-y border-line bg-surface py-10">
      <p className="container-x text-center text-sm font-medium text-muted">
        Compliant IPv4 transfers across every Regional Internet Registry
      </p>
      <div className="group mt-7 overflow-hidden mask-fade-x">
        <ul className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((r, i) => (
            <li key={i} aria-hidden={i >= rirs.length} className="flex h-16 w-48 items-center justify-center rounded-2xl border border-line bg-white px-5 shadow-sm">
              <Image src={r.logo} alt={`${r.name} — ${r.region}`} width={150} height={44} className="max-h-10 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
