"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello, I need assistance with IPv4!")}`;

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 240;
      setVisible(past);
      if (past) setBubble(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex items-end gap-3"
        >
          <AnimatePresence>
            {bubble && !dismissed && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: 0.6 }}
                className="mb-2 hidden max-w-[15rem] items-start gap-2 rounded-2xl border border-line bg-card p-3 text-sm text-ink shadow-xl sm:flex"
              >
                <p>Need help with IPv4? <span className="font-semibold">Chat with an expert.</span></p>
                <button type="button" aria-label="Dismiss" onClick={() => setDismissed(true)} className="text-muted hover:text-ink">
                  <LuX className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-600/30 transition hover:scale-105"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
            <FaWhatsapp className="relative h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
