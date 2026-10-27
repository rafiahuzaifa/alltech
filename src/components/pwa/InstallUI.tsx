"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { LuDownload, LuPlus, LuShare, LuSquarePlus, LuX, LuZap, LuWifiOff, LuSmartphone } from "react-icons/lu";
import Image from "next/image";
import { rememberDismissal, useInstall, wasRecentlyDismissed } from "./install";

const OPEN_EVENT = "atcs:open-install";
export const openInstallDialog = () => window.dispatchEvent(new Event(OPEN_EVENT));

function useInstallAction() {
  const { method, promptInstall } = useInstall();
  return useCallback(async () => {
    if (method === "native") {
      const outcome = await promptInstall();
      if (outcome === "accepted") toast.success("All Tech is being installed — find it on your home screen or app list.");
      else if (outcome === "dismissed") rememberDismissal();
    } else {
      openInstallDialog();
    }
  }, [method, promptInstall]);
}

/** Compact header button — rendered only where installation is actually possible. */
export function InstallButton({ variant = "header" }: { variant?: "header" | "menu" }) {
  const { canInstall } = useInstall();
  const install = useInstallAction();
  if (!canInstall) return null;
  if (variant === "menu") {
    return (
      <button type="button" onClick={install} className="btn-ghost mt-2 w-full">
        <LuDownload className="h-4 w-4" /> Install the app
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={install}
      className="hidden h-10 items-center gap-2 rounded-full border border-line bg-card/70 px-4 text-sm font-medium text-ink transition hover:border-brand/50 hover:text-brand md:inline-flex"
    >
      <LuDownload className="h-4 w-4" /> Install app
    </button>
  );
}

/** Platform-specific manual instructions (iOS / iPadOS / macOS Safari). */
export function InstallDialog() {
  const { method, isIOS } = useInstall();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const steps =
    method === "macos-safari"
      ? [
          { icon: LuShare, text: <>In Safari&apos;s menu bar, choose <strong>File</strong> (or click the <strong>Share</strong> button).</> },
          { icon: LuSquarePlus, text: <>Select <strong>Add to Dock…</strong></> },
          { icon: LuPlus, text: <>Click <strong>Add</strong>. All Tech opens from your Dock like any other app.</> },
        ]
      : [
          { icon: LuShare, text: <>Tap the <strong>Share</strong> button {isIOS ? "in the browser toolbar (bottom on iPhone, top on iPad)" : ""}.</> },
          { icon: LuSquarePlus, text: <>Scroll down and tap <strong>Add to Home Screen</strong>.</> },
          { icon: LuPlus, text: <>Tap <strong>Add</strong>. The All Tech icon appears on your home screen.</> },
        ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
            className="card w-full max-w-md p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/icons/icon-192.png" alt="" width={48} height={48} className="rounded-xl" />
                <div>
                  <h2 id="install-title" className="text-lg font-bold text-ink">Install All Tech</h2>
                  <p className="text-sm text-muted">{method === "macos-safari" ? "Add to your Dock in 3 steps" : "Add to your home screen in 3 steps"}</p>
                </div>
              </div>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink">
                <LuX className="h-5 w-5" />
              </button>
            </div>
            <ol className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><s.icon className="h-5 w-5" /></span>
                  <p className="pt-2 text-sm leading-6 text-ink">{s.text}</p>
                </li>
              ))}
            </ol>
            {method === "ios" && (
              <p className="mt-5 rounded-xl bg-surface p-3 text-xs leading-5 text-muted">
                Don&apos;t see &ldquo;Add to Home Screen&rdquo;? Open this page in <strong>Safari</strong>, or make sure your browser is up to date.
              </p>
            )}
            <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Got it</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Polite banner: appears once the visitor has engaged, never on first paint, and respects "Not now". */
export function InstallBanner() {
  const { canInstall, method } = useInstall();
  const install = useInstallAction();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!canInstall || wasRecentlyDismissed() || pathname.startsWith("/studio")) {
      setShow(false);
      return;
    }
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShow(true);
      cleanup();
    };
    const onScroll = () => window.scrollY > 900 && reveal();
    const timer = window.setTimeout(reveal, 25000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, [canInstall, pathname]);

  const dismiss = () => {
    rememberDismissal();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && canInstall && (
        <motion.aside
          aria-label="Install the All Tech app"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          // On phones, sit above the floating WhatsApp button instead of covering it.
          className="fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-[90] mx-auto max-w-lg sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
        >
          <div className="card relative flex items-start gap-4 p-4 pr-11 shadow-2xl sm:p-5 sm:pr-12">
            <Image src="/icons/icon-192.png" alt="" width={52} height={52} className="shrink-0 rounded-2xl" />
            <div className="min-w-0">
              <p className="font-display font-bold text-ink">Get the All Tech app</p>
              <p className="mt-0.5 text-sm text-muted">Faster access to IPv4 quotes, your calculator and our team — right from your {method === "macos-safari" ? "Dock" : "home screen"}.</p>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                <li className="flex items-center gap-1"><LuZap className="h-3 w-3 text-brand" /> Opens instantly</li>
                <li className="flex items-center gap-1"><LuWifiOff className="h-3 w-3 text-brand" /> Works on weak signal</li>
                <li className="flex items-center gap-1"><LuSmartphone className="h-3 w-3 text-brand" /> No app store</li>
              </ul>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => { setShow(false); install(); }} className="btn-primary !px-4 !py-2">
                  <LuDownload className="h-4 w-4" /> Install app
                </button>
                <button type="button" onClick={dismiss} className="btn-ghost !px-4 !py-2">Not now</button>
              </div>
            </div>
            <button type="button" onClick={dismiss} aria-label="Dismiss install banner" className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink">
              <LuX className="h-4 w-4" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
