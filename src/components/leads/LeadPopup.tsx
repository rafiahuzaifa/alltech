"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBadgeCheck,
  LuCircleCheck,
  LuClock,
  LuLoaderCircle,
  LuRepeat,
  LuShieldCheck,
  LuShoppingCart,
  LuTag,
  LuX,
} from "react-icons/lu";
import { claimPopup, releasePopup } from "@/components/site/popupGate";

/*
 * Lead-capture popup. Opens at most once per visit and only when the visitor shows intent:
 *  - desktop: exit intent (pointer leaves through the top of the window) after ≥ 8 s on the site
 *  - touch devices: ≥ 40 s on the site and ≥ 40 % of the current page read
 * Closing it snoozes it for 7 days; sending a request snoozes it for 90 days.
 */

const SNOOZE_KEY = "atcs-lead-snooze-until";
const START_KEY = "atcs-visit-start";
const SKIP_PATHS = ["/contact", "/studio", "/privacy-policy"];

type Service = "buy" | "sell" | "lease";
type Values = { name: string; email: string; size: string; ipBlock: string; website: string };

const SERVICES: { id: Service; title: string; text: string; icon: typeof LuShoppingCart }[] = [
  { id: "buy", title: "Buy IPv4", text: "Own clean address space", icon: LuShoppingCart },
  { id: "lease", title: "Lease IPv4", text: "Live within 48 hours", icon: LuRepeat },
  { id: "sell", title: "Sell IPv4", text: "Free valuation", icon: LuTag },
];
const SIZES = ["/24 (256 IPs)", "/23 (512 IPs)", "/22 (1,024 IPs)", "/21 (2,048 IPs)", "/20 or larger", "Not sure yet"];

const snooze = (days: number) => {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + days * 864e5));
  } catch {}
};
const isSnoozed = () => {
  try {
    return Date.now() < Number(localStorage.getItem(SNOOZE_KEY) || 0);
  } catch {
    return true; // storage blocked: stay quiet rather than risk showing it on every page
  }
};
const secondsOnSite = () => {
  try {
    let start = Number(sessionStorage.getItem(START_KEY));
    if (!start) sessionStorage.setItem(START_KEY, String((start = Date.now())));
    return (Date.now() - start) / 1000;
  } catch {
    return 0;
  }
};

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const shownThisVisit = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues: { size: "" } });

  const show = useCallback(() => {
    if (shownThisVisit.current || isSnoozed()) return;
    if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return;
    // Don't interrupt someone already filling in a form on the page.
    const active = document.activeElement;
    if (active && active.closest("form")) return;
    if (!claimPopup("lead")) return;
    shownThisVisit.current = true;
    setOpen(true);
  }, [pathname]);

  // Triggers
  useEffect(() => {
    secondsOnSite(); // starts the visit clock on first page
    const touch = window.matchMedia("(pointer: coarse)").matches;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget && secondsOnSite() >= 8) show();
    };
    const check = () => {
      const doc = document.documentElement;
      const read = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (secondsOnSite() >= 40 && read >= 0.4) show();
    };

    if (touch) {
      const timer = window.setInterval(check, 5000);
      window.addEventListener("scroll", check, { passive: true });
      return () => {
        window.clearInterval(timer);
        window.removeEventListener("scroll", check);
      };
    }
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [show]);

  const close = useCallback(() => {
    setOpen(false);
    releasePopup("lead");
    if (!sent) snooze(7);
  }, [sent]);

  // Escape to close, focus the dialog for keyboard and screen-reader users
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onSubmit = async (v: Values) => {
    setError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: service,
          name: v.name,
          email: v.email,
          blockSize: service !== "sell" ? v.size : undefined,
          ipBlock: service === "sell" ? v.ipBlock : undefined,
          message: "Sent from the quick-quote popup.",
          website: v.website,
          page: `${window.location.pathname} (quick-quote popup)`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
      snooze(90);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send. Please try again.");
    }
  };

  const chosen = SERVICES.find((s) => s.id === service);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-2xl outline-none"
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/5 text-muted hover:bg-black/10 hover:text-ink dark:bg-white/10">
              <LuX className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              {/* Brand side */}
              <div className="relative hidden overflow-hidden bg-[#050a16] p-8 text-white md:block">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-600/40 blur-3xl" />
                <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Free · No obligation
                  </span>
                  <p className="mt-6 font-display text-3xl leading-tight font-extrabold">
                    Your IPv4 quote, <span className="text-gradient">in 30 seconds</span>
                  </p>
                  <ul className="mt-8 space-y-4 text-sm text-slate-300">
                    <li className="flex gap-3"><LuClock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> Reply from an IP specialist within 24 hours</li>
                    <li className="flex gap-3"><LuShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> Clean, reputation-checked blocks</li>
                    <li className="flex gap-3"><LuBadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> APNIC-registered broker since 2019</li>
                  </ul>
                </div>
              </div>

              {/* Form side */}
              <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
                {sent ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500"><LuCircleCheck className="h-8 w-8" /></div>
                    <h2 id="lead-title" className="mt-5 text-2xl font-bold text-ink">Request received</h2>
                    <p className="mx-auto mt-2 max-w-xs text-muted">An IP specialist will email you within one business day.</p>
                    <button type="button" onClick={close} className="btn-primary mt-7">Continue browsing</button>
                  </div>
                ) : !service ? (
                  <>
                    <p className="text-xs font-semibold tracking-wide text-brand uppercase">Step 1 of 2</p>
                    <h2 id="lead-title" className="mt-2 pr-8 text-2xl font-extrabold text-ink">What can we help you with?</h2>
                    <p className="mt-1 text-sm text-muted md:hidden">Free quote from an IP specialist within 24 hours.</p>
                    <div className="mt-6 space-y-3">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setService(s.id)}
                          className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-bg p-4 text-left transition hover:border-brand/60 hover:bg-brand/5"
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><s.icon className="h-5 w-5" /></span>
                          <span className="flex-1">
                            <span className="block font-semibold text-ink">{s.title}</span>
                            <span className="block text-sm text-muted">{s.text}</span>
                          </span>
                          <LuArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={close} className="mt-5 w-full text-center text-sm text-muted hover:text-ink">No thanks, I&apos;m just browsing</button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
                    <button type="button" onClick={() => setService(null)} className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                      <LuArrowLeft className="h-3.5 w-3.5" /> Step 2 of 2 · {chosen?.title}
                    </button>
                    <h2 id="lead-title" className="mt-2 pr-8 text-2xl font-extrabold text-ink">
                      {service === "sell" ? "Get your free valuation" : "Where should we send your quote?"}
                    </h2>
                    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("website")} />
                    <div className="mt-5 space-y-4">
                      <div>
                        <label htmlFor="lead-name" className="label">Name</label>
                        <input id="lead-name" autoComplete="name" className="input" placeholder="Jane Smith" {...register("name", { required: "Please enter your name" })} />
                        {errors.name && <p role="alert" className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lead-email" className="label">Work email</label>
                        <input id="lead-email" type="email" autoComplete="email" className="input" placeholder="jane@company.com"
                          {...register("email", { required: "Please enter your email", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" } })} />
                        {errors.email && <p role="alert" className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                      {service === "sell" ? (
                        <div>
                          <label htmlFor="lead-block" className="label">Your IP block <span className="font-normal text-muted">(optional)</span></label>
                          <input id="lead-block" className="input font-mono" placeholder="203.0.113.0/24" {...register("ipBlock")} />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="lead-size" className="label">How many addresses?</label>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {SIZES.map((s) => (
                              <label key={s} className="cursor-pointer">
                                <input type="radio" value={s} className="peer sr-only" {...register("size", { required: "Choose a size" })} />
                                <span className="block rounded-xl border border-line px-2 py-2 text-center text-xs text-muted transition peer-checked:border-brand peer-checked:bg-brand/10 peer-checked:text-brand peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--ring)] hover:border-brand/50">{s}</span>
                              </label>
                            ))}
                          </div>
                          {errors.size && <p role="alert" className="mt-1 text-xs text-red-500">{errors.size.message}</p>}
                        </div>
                      )}
                    </div>
                    {error && <p role="alert" className="mt-4 text-sm text-red-500">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full !py-3.5">
                      {isSubmitting ? <><LuLoaderCircle className="h-4 w-4 animate-spin" /> Sending…</> : <>Get my free quote <LuArrowRight className="h-4 w-4" /></>}
                    </button>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted"><LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> No spam. Your details stay confidential.</p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
