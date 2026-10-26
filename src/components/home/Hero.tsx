"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight, LuBadgeCheck, LuCheck, LuClock, LuGlobe, LuShieldCheck } from "react-icons/lu";

const STEPS = ["Request received", "Ownership verified", "Agreement signed", "RIR transfer filed", "Transfer complete"];

const trust = [
  { icon: LuBadgeCheck, text: "APNIC-registered broker" },
  { icon: LuGlobe, text: "All 5 RIRs" },
  { icon: LuClock, text: "Leases in 48 hours" },
  { icon: LuShieldCheck, text: "Reputation-checked blocks" },
];

function TransferCard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (STEPS.length + 1)), 1400);
    return () => clearInterval(id);
  }, []);
  const pct = Math.min(step, STEPS.length) / STEPS.length;

  return (
    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Example transfer</p>
          <p className="mt-1 font-mono text-xl font-semibold text-white">203.0.113.0/24</p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Clean · ARIN</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          ["256", "Addresses"],
          ["254", "Usable hosts"],
          ["/24", "Prefix"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3">
            <p className="font-display text-lg font-bold text-white">{v}</p>
            <p className="text-[11px] text-slate-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" animate={{ width: `${pct * 100}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
      </div>
      <ol className="mt-5 space-y-3">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full border text-[11px] transition-all duration-500 ${
                  done ? "border-cyan-300 bg-cyan-300 text-slate-900" : active ? "border-cyan-300 text-cyan-300" : "border-white/15 text-slate-500"
                }`}
              >
                {done ? <LuCheck className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`transition-colors duration-500 ${done ? "text-white" : active ? "text-cyan-200" : "text-slate-500"}`}>{s}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050a16] text-white">
      <Image src="/images/haxagon.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050a16]/30 via-[#050a16]/60 to-[#050a16]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 mask-fade-y" />
      <div className="absolute top-1/4 -left-32 -z-10 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="container-x grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Trusted IPv4 brokerage since 2019
          </motion.span>

          <motion.h1
            initial={{ y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Buy, sell &amp; lease <span className="text-gradient">IPv4 addresses</span> with confidence
          </motion.h1>

          <motion.p
            initial={{ y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
          >
            Where connectivity meets possibility. We source clean, reputation-checked IPv4 blocks and manage every step of
            the RIR transfer — so you get the address space you need, fast and fully compliant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="btn-primary !px-7 !py-3.5 text-base">
              Get a free quote <LuArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/sell-ipv4" className="btn-light !px-7 !py-3.5 text-base">Value my IPv4 block</Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-300"
          >
            {trust.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-cyan-300" /> {text}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full bg-blue-500/30 blur-[100px]" />
          <div className="animate-float w-full max-w-md">
            <TransferCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
