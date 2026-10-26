"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export const themeScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}`;

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      setDark(next);
    };
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    // View Transitions API for a smooth cross-fade where supported
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else apply();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card/70 text-ink transition hover:border-brand/50 hover:text-brand"
    >
      {dark === null ? <span className="h-4 w-4" /> : dark ? <LuSun className="h-4 w-4" /> : <LuMoon className="h-4 w-4" />}
    </button>
  );
}
