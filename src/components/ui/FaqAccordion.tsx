"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";
import type { Faq } from "@/lib/faq";

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-semibold text-ink transition hover:bg-surface sm:text-lg"
              >
                {f.q}
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-line text-muted"
                  }`}
                >
                  <LuPlus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            {/* Closed answers are still rendered as sr-only text below, so crawlers always see every answer */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-7 text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!isOpen && <p className="sr-only">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
