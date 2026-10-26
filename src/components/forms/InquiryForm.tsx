"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuCircleCheck, LuLoaderCircle, LuShieldCheck } from "react-icons/lu";

export type InquiryType = "buy" | "sell" | "lease" | "contact";

type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  blockSize: string;
  ipBlock: string;
  rir: string;
  leaseDuration: string;
  services: string[];
  message: string;
  website: string; // honeypot
};

const BLOCK_SIZES = ["/24 (256 IPs)", "/23 (512 IPs)", "/22 (1,024 IPs)", "/21 (2,048 IPs)", "/20 (4,096 IPs)", "/19 (8,192 IPs)", "/18 (16,384 IPs)", "/17 or larger", "Not sure yet"];
const RIRS = ["ARIN", "RIPE NCC", "APNIC", "LACNIC", "AFRINIC", "Any / not sure"];
const DURATIONS = ["1 month", "3 months", "6 months", "12 months", "24+ months"];
const SERVICES = ["Buy IPv4", "Sell IPv4", "Lease IPv4", "Transfer support", "ASN guidance"];

const COPY: Record<InquiryType, { title: string; cta: string }> = {
  buy: { title: "Request IPv4 inventory", cta: "Get matched blocks" },
  sell: { title: "Get a free valuation", cta: "Request valuation" },
  lease: { title: "Request a lease quote", cta: "Get lease quote" },
  contact: { title: "Send us a message", cta: "Send message" },
};

const CIDR = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}\/([0-9]|[12]\d|3[0-2])$/;

function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: React.ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export default function InquiryForm({ type, className = "" }: { type: InquiryType; className?: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ defaultValues: { services: [], rir: "", blockSize: "", leaseDuration: "" } });

  const onSubmit = async (values: Values) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, inquiryType: type, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
      reset();
      toast.success("Thanks! An IP specialist will reply within 24 hours.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your request. Please email us directly.");
    }
  };

  const c = COPY[type];

  return (
    <div className={`card relative overflow-hidden p-6 sm:p-8 ${className}`}>
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
              <LuCircleCheck className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-ink">Request received</h3>
            <p className="mx-auto mt-3 max-w-sm text-muted">
              Thank you — a dedicated IP specialist will review your request and get back to you within one business day.
            </p>
            <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">Send another request</button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
            <div>
              <h3 className="text-xl font-bold text-ink sm:text-2xl">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">Free, no-obligation. We reply within 24 hours.</p>
            </div>

            {/* Honeypot: hidden from humans, bots tend to fill it */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("website")} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name *" htmlFor={`${type}-name`} error={errors.name?.message}>
                <input id={`${type}-name`} autoComplete="name" className="input" placeholder="Jane Smith" aria-invalid={!!errors.name} {...register("name", { required: "Please enter your name", maxLength: 100 })} />
              </Field>
              <Field label="Work email *" htmlFor={`${type}-email`} error={errors.email?.message}>
                <input id={`${type}-email`} type="email" autoComplete="email" className="input" placeholder="jane@company.com" aria-invalid={!!errors.email}
                  {...register("email", { required: "Please enter your email", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email" } })} />
              </Field>
              <Field label={type === "contact" ? "Phone *" : "Phone"} htmlFor={`${type}-phone`} error={errors.phone?.message}>
                <input id={`${type}-phone`} type="tel" autoComplete="tel" className="input" placeholder="+1 555 000 0000"
                  {...register("phone", { required: type === "contact" ? "Please enter your phone number" : false, maxLength: 40 })} />
              </Field>
              <Field label="Company" htmlFor={`${type}-company`}>
                <input id={`${type}-company`} autoComplete="organization" className="input" placeholder="Company Inc." {...register("company", { maxLength: 120 })} />
              </Field>

              {(type === "buy" || type === "lease") && (
                <Field label="Block size *" htmlFor={`${type}-size`} error={errors.blockSize?.message}>
                  <select id={`${type}-size`} className="input" {...register("blockSize", { required: "Select a block size" })}>
                    <option value="">Select size…</option>
                    {BLOCK_SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              )}

              {type === "sell" && (
                <Field label="IP block (CIDR) *" htmlFor={`${type}-block`} error={errors.ipBlock?.message}>
                  <input id={`${type}-block`} className="input font-mono" placeholder="203.0.113.0/24"
                    {...register("ipBlock", { required: "Enter the block you want to sell", pattern: { value: CIDR, message: "Use CIDR format, e.g. 203.0.113.0/24" } })} />
                </Field>
              )}

              {type === "lease" ? (
                <Field label="Lease term *" htmlFor={`${type}-term`} error={errors.leaseDuration?.message}>
                  <select id={`${type}-term`} className="input" {...register("leaseDuration", { required: "Select a lease term" })}>
                    <option value="">Select term…</option>
                    {DURATIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              ) : type !== "contact" ? (
                <Field label="Registry (RIR)" htmlFor={`${type}-rir`}>
                  <select id={`${type}-rir`} className="input" {...register("rir")}>
                    <option value="">Select registry…</option>
                    {RIRS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
              ) : null}
            </div>

            {type === "contact" && (
              <fieldset>
                <legend className="label">Services you&apos;re interested in</legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input type="checkbox" value={s} className="peer sr-only" {...register("services")} />
                      <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-muted transition peer-checked:border-brand peer-checked:bg-brand/10 peer-checked:text-brand peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--ring)] hover:border-brand/50">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <Field label={type === "contact" ? "Message *" : "Additional details"} htmlFor={`${type}-msg`} error={errors.message?.message}>
              <textarea id={`${type}-msg`} rows={4} className="input resize-y" placeholder="Tell us about your network, timeline or any questions…"
                {...register("message", { required: type === "contact" ? "Please enter a message" : false, maxLength: { value: 5000, message: "Message is too long" } })} />
            </Field>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full !py-3.5">
              {isSubmitting ? <><LuLoaderCircle className="h-4 w-4 animate-spin" /> Sending…</> : <>{c.cta} <LuArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
              <LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Your details are kept confidential and never shared.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
