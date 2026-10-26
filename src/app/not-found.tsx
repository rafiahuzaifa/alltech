import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 mask-fade-y" />
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm text-brand">Error 404 · 0.0.0.0/0</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink sm:text-7xl">
          This route <span className="text-gradient">doesn&apos;t resolve</span>
        </h1>
        <p className="mt-5 max-w-lg text-lg text-muted">The page you&apos;re looking for has moved or no longer exists.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Back to home <LuArrowRight className="h-4 w-4" /></Link>
          <Link href="/contact" className="btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
