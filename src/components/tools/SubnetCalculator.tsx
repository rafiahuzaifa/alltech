"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LuArrowRight, LuCheck, LuCopy } from "react-icons/lu";

const toIp = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
const parseIp = (ip: string) => {
  const p = ip.trim().split(".");
  if (p.length !== 4 || p.some((x) => !/^\d{1,3}$/.test(x) || +x > 255)) return null;
  return p.reduce((a, x) => ((a << 8) | +x) >>> 0, 0);
};

export default function SubnetCalculator({ compact = false }: { compact?: boolean }) {
  const [ip, setIp] = useState("203.0.113.0");
  const [prefix, setPrefix] = useState(24);
  const [copied, setCopied] = useState(false);

  const r = useMemo(() => {
    const base = parseIp(ip);
    const total = 2 ** (32 - prefix);
    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const usable = prefix >= 31 ? total : total - 2;
    if (base === null) return { valid: false as const, total, usable, mask: toIp(mask) };
    const network = (base & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    return {
      valid: true as const,
      total,
      usable,
      mask: toIp(mask),
      wildcard: toIp(~mask >>> 0),
      network: toIp(network),
      broadcast: toIp(broadcast),
      first: toIp(prefix >= 31 ? network : network + 1),
      last: toIp(prefix >= 31 ? broadcast : broadcast - 1),
      cidr: `${toIp(network)}/${prefix}`,
    };
  }, [ip, prefix]);

  const slash24s = prefix <= 24 ? 2 ** (24 - prefix) : null;

  const rows: [string, string][] = r.valid
    ? [
        ["Network address", r.network],
        ["Broadcast address", r.broadcast],
        ["First usable host", r.first],
        ["Last usable host", r.last],
        ["Subnet mask", r.mask],
        ["Wildcard mask", r.wildcard],
      ]
    : [];

  const copy = async () => {
    if (!r.valid) return;
    try {
      await navigator.clipboard.writeText(r.cidr);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
          <label htmlFor="calc-ip" className="label">IP address</label>
          <input
            id="calc-ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            inputMode="decimal"
            spellCheck={false}
            className={`input font-mono text-base ${r.valid ? "" : "!border-red-500"}`}
            aria-invalid={!r.valid}
          />
          {!r.valid && <p role="alert" className="mt-1.5 text-xs text-red-500">Enter a valid IPv4 address, e.g. 203.0.113.0</p>}

          <div className="mt-6 flex items-center justify-between">
            <label htmlFor="calc-prefix" className="label !mb-0">Prefix length</label>
            <span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-sm font-bold text-brand">/{prefix}</span>
          </div>
          <input
            id="calc-prefix"
            type="range"
            min={8}
            max={32}
            value={prefix}
            onChange={(e) => setPrefix(+e.target.value)}
            className="mt-4 w-full accent-[var(--brand)]"
          />
          <div className="mt-2 flex justify-between font-mono text-xs text-muted">
            <span>/8</span><span>/16</span><span>/24</span><span>/32</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white">
              <p className="text-xs font-medium text-blue-50/80">Total addresses</p>
              <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">{r.total.toLocaleString("en-US")}</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-medium text-muted">Usable hosts</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-ink tabular-nums">{r.usable.toLocaleString("en-US")}</p>
            </div>
          </div>
          {slash24s && (
            <p className="mt-4 text-sm text-muted">
              Equivalent to <strong className="text-ink">{slash24s.toLocaleString("en-US")}</strong> × /24 block{slash24s > 1 ? "s" : ""} — the smallest size routable on the public internet.
            </p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-lg font-semibold text-ink">{r.valid ? r.cidr : "—"}</p>
            <button type="button" onClick={copy} disabled={!r.valid} className="btn-ghost !px-3 !py-1.5 text-xs" aria-label="Copy CIDR">
              {copied ? <LuCheck className="h-3.5 w-3.5" /> : <LuCopy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <dl className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="font-mono font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {!compact && prefix > 24 && (
            <p className="mt-4 rounded-2xl bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
              Blocks smaller than /24 are generally not accepted in global BGP routing tables. For public announcement, plan for at least a /24.
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/buy-ipv4`} className="btn-primary flex-1">Buy this size <LuArrowRight className="h-4 w-4" /></Link>
            <Link href={`/lease-ipv4`} className="btn-ghost flex-1">Lease instead</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
