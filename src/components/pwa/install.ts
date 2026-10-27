"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/** Inline <head> script: capture `beforeinstallprompt` before React hydrates so it is never missed. */
export const installCaptureScript = `(function(){window.__bip=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__bip=e;window.dispatchEvent(new Event('atcs:bip'))});window.addEventListener('appinstalled',function(){window.__bip=null;try{localStorage.setItem('atcs-installed','1')}catch(_){}window.dispatchEvent(new Event('atcs:installed'))})})();`;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __bip?: BeforeInstallPromptEvent | null;
  }
}

/** How this browser can install the app (if at all). */
export type InstallMethod =
  | "native" // beforeinstallprompt available (Chrome, Edge, Samsung Internet, Opera…)
  | "ios" // iPhone/iPad: Share → Add to Home Screen
  | "macos-safari" // Safari 17+ on macOS: File → Add to Dock
  | "none"; // not installable here (e.g. Firefox desktop) or criteria not met yet

export type Platform = { isIOS: boolean; isAndroid: boolean; isMacSafari: boolean; isStandalone: boolean };

export function detectPlatform(): Platform {
  if (typeof window === "undefined") return { isIOS: false, isAndroid: false, isMacSafari: false, isStandalone: false };
  const ua = navigator.userAgent;
  // iPadOS reports itself as Mac; touch support tells them apart.
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Edg\/|OPR\//.test(ua);
  const safariVersion = Number(ua.match(/Version\/(\d+)/)?.[1] ?? 0);
  const isMacSafari = !isIOS && /Macintosh/.test(ua) && isSafari && safariVersion >= 17;
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return { isIOS, isAndroid, isMacSafari, isStandalone };
}

function subscribe(cb: () => void) {
  const events = ["atcs:bip", "atcs:installed"];
  events.forEach((e) => window.addEventListener(e, cb));
  const mq = window.matchMedia("(display-mode: standalone)");
  mq.addEventListener?.("change", cb);
  return () => {
    events.forEach((e) => window.removeEventListener(e, cb));
    mq.removeEventListener?.("change", cb);
  };
}

const getSnapshot = () => {
  const p = detectPlatform();
  // Running as the installed app. (After installing from a browser tab, the tab itself is not
  // standalone, but the prompt event is consumed, so the install UI hides anyway.)
  const installed = p.isStandalone;
  return `${installed ? 1 : 0}|${window.__bip ? 1 : 0}|${p.isIOS ? 1 : 0}|${p.isMacSafari ? 1 : 0}|${p.isAndroid ? 1 : 0}`;
};

/** Reactive install state shared by the header button and the banner. */
export function useInstall() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => "0|0|0|0|0");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const [installed, hasPrompt, isIOS, isMacSafari, isAndroid] = snap.split("|").map((v) => v === "1");
  const method: InstallMethod = installed ? "none" : hasPrompt ? "native" : isIOS ? "ios" : isMacSafari ? "macos-safari" : "none";

  /** Must be called from a user gesture (click). Resolves to the user's choice. */
  const promptInstall = async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
    const evt = window.__bip;
    if (!evt) return "unavailable";
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    // A prompt event can only be used once.
    window.__bip = null;
    window.dispatchEvent(new Event("atcs:bip"));
    return outcome;
  };

  return { ready: hydrated, installed, method, isIOS, isAndroid, canInstall: hydrated && method !== "none", promptInstall };
}

const DISMISS_KEY = "atcs-install-dismissed-at";
const DISMISS_DAYS = 14;

export function wasRecentlyDismissed() {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY) || 0);
    return Date.now() - at < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
}

export function rememberDismissal() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {}
}
