import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="atcs-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path
        d="M14 34h21a8 8 0 0 0 1.4-15.9A11 11 0 0 0 15.3 16 9 9 0 0 0 14 34Z"
        fill="none"
        stroke="url(#atcs-g)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M19 27h7m-3-6h8m-2 6v-6" stroke="url(#atcs-g)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="27" r="2.4" fill="#2563eb" />
      <circle cx="23" cy="21" r="2.4" fill="#0ea5e9" />
      <circle cx="29" cy="27" r="2.4" fill="#22d3ee" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="All Tech Cloud Services — home">
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          ALL TECH
        </span>
        <span className={`text-[10px] font-semibold tracking-[0.22em] ${light ? "text-cyan-300" : "text-brand-2"}`}>
          CLOUD SERVICES
        </span>
      </span>
    </Link>
  );
}
