"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { LuMail, LuMenu, LuPhone, LuX, LuArrowRight } from "react-icons/lu";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { InstallButton } from "@/components/pwa/InstallUI";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <div className="hidden border-b border-line bg-surface text-xs text-muted md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="inline-flex items-center gap-1.5 hover:text-brand">
              <LuPhone className="h-3.5 w-3.5" /> {site.phone}
            </a>
            <a href={`mailto:${site.emails.sales}`} className="inline-flex items-center gap-1.5 hover:text-brand">
              <LuMail className="h-3.5 w-3.5" /> {site.emails.sales}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/faq" className="hover:text-brand">FAQ</Link>
            <Link href="/privacy-policy" className="hover:text-brand">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-brand">Contact</Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
          scrolled ? "border-b border-line bg-bg/75 shadow-sm backdrop-blur-xl" : "border-b border-transparent bg-bg/0"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "text-brand" : "text-ink/80 hover:text-ink"
                }`}
              >
                {isActive(l.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-brand/10" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <InstallButton />
            <ThemeToggle />
            <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
              Get a quote <LuArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card/70 lg:hidden"
            >
              {open ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-600 to-cyan-400" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
              {[...nav, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={l.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 font-display text-lg font-semibold ${
                      isActive(l.href) ? "bg-brand/10 text-brand" : "text-ink hover:bg-surface"
                    }`}
                  >
                    {l.label} <LuArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <Link href="/contact" className="btn-primary mt-4">Get a free quote</Link>
              <a href={site.phoneHref} className="btn-ghost mt-2"><LuPhone className="h-4 w-4" /> {site.phone}</a>
              <InstallButton variant="menu" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
