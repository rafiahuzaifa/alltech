"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuMessageCircleQuestion, LuX } from "react-icons/lu";
import { popupActive } from "@/components/site/popupGate";

/*
 * "Clients often ask" cards: rotates genuine questions IPv4 buyers, sellers and lessees ask,
 * each with a short answer and a link to the full guide or a quote. No invented people or orders.
 */

type Q = { q: string; a: string; href: string; cta: string };

const QUESTIONS: Q[] = [
  { q: "How long does it take to buy IPv4 addresses?", a: "Many purchases complete in one to four weeks, depending on block size, availability and the registry's processing time.", href: "/blog/how-to-buy-ipv4-addresses", cta: "Read the buying guide" },
  { q: "How fast can I lease IPv4 addresses?", a: "Leased space is usually delivered within 48 hours — contract, payment, then an LOA so you can announce it from your ASN.", href: "/lease-ipv4", cta: "Get a lease quote" },
  { q: "What is my unused IPv4 block worth?", a: "It depends on size, registry, reputation and current demand. We give free, no-obligation valuations.", href: "/sell-ipv4", cta: "Value my block" },
  { q: "Should I lease or buy IPv4?", a: "Buying is a long-term asset with no recurring fees; leasing costs less upfront and is more flexible.", href: "/blog/ipv4-address-price-factors", cta: "Compare the costs" },
  { q: "How many IPs are in a /22?", a: "A /22 has 1,024 addresses — four /24 blocks. Try any prefix in our free calculator.", href: "/ipv4-subnet-calculator", cta: "Open the calculator" },
  { q: "Do you check blocks for blacklists?", a: "Yes. Every block is screened against major blacklists and its routing history before it's offered.", href: "/buy-ipv4", cta: "Request clean IPv4" },
  { q: "Which registries do you work with?", a: "All five: ARIN, RIPE NCC, APNIC, LACNIC and AFRINIC — including inter-RIR transfers where policy allows.", href: "/faq", cta: "See all FAQs" },
];

const DISMISS_KEY = "atcs-questions-off";
const FIRST_DELAY = 18000; // first card after 18 s
const SHOW_FOR = 9000; // visible for 9 s unless the visitor engages
const GAP = 30000; // 30 s between cards
const MAX_PER_VISIT = 4;

export default function QuestionToasts() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<Q | null>(null);
  const [expanded, setExpanded] = useState(false);
  const count = useRef(0);
  const idx = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    let off = false;
    try {
      off = sessionStorage.getItem(DISMISS_KEY) === "1";
      idx.current = Number(sessionStorage.getItem("atcs-questions-idx") || Math.floor(Math.random() * QUESTIONS.length));
    } catch {}
    if (off || pathname.startsWith("/studio")) return;

    let hideTimer: number | undefined;
    const showNext = () => {
      if (count.current >= MAX_PER_VISIT) return;
      // Stay out of the way of the quote popup / install banner, and of anyone typing in a form.
      if (popupActive() || document.activeElement?.closest("form")) return;
      const q = QUESTIONS[idx.current % QUESTIONS.length];
      idx.current += 1;
      count.current += 1;
      try {
        sessionStorage.setItem("atcs-questions-idx", String(idx.current));
      } catch {}
      setExpanded(false);
      setCurrent(q);
      hideTimer = window.setTimeout(function hide() {
        if (hovering.current) hideTimer = window.setTimeout(hide, 2000);
        else setCurrent((c) => (c === q ? null : c));
      }, SHOW_FOR);
    };

    const first = window.setTimeout(showNext, FIRST_DELAY);
    const loop = window.setInterval(showNext, GAP);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  // Hide immediately if a bigger popup opens
  useEffect(() => {
    if (!current) return;
    const obs = new MutationObserver(() => popupActive() && setCurrent(null));
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-popup"] });
    return () => obs.disconnect();
  }, [current]);

  const turnOff = () => {
    setCurrent(null);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 z-[60] w-[min(22rem,calc(100vw-1.5rem))] sm:bottom-5 sm:left-5">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.q}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            onMouseEnter={() => (hovering.current = true)}
            onMouseLeave={() => (hovering.current = false)}
            onFocus={() => (hovering.current = true)}
            onBlur={() => (hovering.current = false)}
            className="pointer-events-auto relative overflow-hidden rounded-2xl border border-line bg-card/95 shadow-2xl shadow-blue-900/10 backdrop-blur-xl"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400" />
            <button type="button" onClick={turnOff} aria-label="Hide popular questions" className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink">
              <LuX className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => { hovering.current = true; setExpanded(true); }} aria-expanded={expanded} className="flex w-full items-start gap-3 p-4 pr-10 text-left">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><LuMessageCircleQuestion className="h-5 w-5" /></span>
              <span>
                <span className="block text-[11px] font-semibold tracking-wide text-brand uppercase">Clients often ask</span>
                <span className="mt-0.5 block text-sm leading-snug font-semibold text-ink">{current.q}</span>
                {!expanded && <span className="mt-1 block text-xs text-muted">Tap to see the answer</span>}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 pl-16">
                    <p className="text-sm leading-6 text-muted">{current.a}</p>
                    <Link href={current.href} onClick={() => setCurrent(null)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                      {current.cta} <LuArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
