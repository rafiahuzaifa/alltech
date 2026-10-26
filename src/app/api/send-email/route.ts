import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LABELS: Record<string, string> = {
  inquiryType: "Inquiry type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  blockSize: "Block size",
  ipBlock: "IP block",
  rir: "Registry (RIR)",
  leaseDuration: "Lease term",
  services: "Services",
  message: "Message",
  page: "Submitted from",
};

const TYPE_NAMES: Record<string, string> = { buy: "Buy IPv4", sell: "Sell IPv4", lease: "Lease IPv4", contact: "Contact" };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clean = (v: unknown, max = 5000) =>
  Array.isArray(v) ? v.map(String).join(", ").slice(0, max) : typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — pretend success so bots don't retry.
  if (clean(body.website)) return NextResponse.json({ success: true });

  const data: Record<string, string> = {
    inquiryType: TYPE_NAMES[clean(body.inquiryType)] || "Contact",
    // `firstName` kept for backwards compatibility with older clients
    name: clean(body.name || body.firstName, 100),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 120),
    blockSize: clean(body.blockSize, 40),
    ipBlock: clean(body.ipBlock, 40),
    rir: clean(body.rir, 40),
    leaseDuration: clean(body.leaseDuration, 40),
    services: clean(body.services ?? body.service, 300),
    message: clean(body.message),
    page: clean(body.page, 200),
  };

  if (!data.name || !data.email) {
    return NextResponse.json({ success: false, error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const required = ["SMTP_HOST", "SMTP_PORT", "CPANEL_EMAIL_USER", "CPANEL_EMAIL_PASS", "EMAIL_FROM"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("Email not configured, missing:", missing.join(", "));
    return NextResponse.json(
      { success: false, error: "Our form is temporarily unavailable. Please email ipv4@alltechcloudservices.com." },
      { status: 500 },
    );
  }

  const rows = Object.entries(data).filter(([, v]) => v);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e3e8f2;border-radius:12px">
      <h2 style="color:#1d4ed8;margin:0 0 16px">New ${escapeHtml(data.inquiryType)} request</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px;border-bottom:1px solid #eef2f9;font-weight:bold;width:150px;vertical-align:top">${LABELS[k] ?? k}</td>
              <td style="padding:8px;border-bottom:1px solid #eef2f9;white-space:pre-line">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:20px;font-size:12px;color:#64748b">Sent from the All Tech Cloud Services website.</p>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.CPANEL_EMAIL_USER, pass: process.env.CPANEL_EMAIL_PASS },
    });

    const info = await transporter.sendMail({
      from: `"All Tech Cloud Services" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || "ipv4@alltechcloudservices.com",
      cc: process.env.EMAIL_CC?.split(",").filter(Boolean),
      replyTo: data.email,
      subject: `[${data.inquiryType}] New request from ${data.name.replace(/[\r\n]/g, " ")}`,
      text: rows.map(([k, v]) => `${LABELS[k] ?? k}: ${v}`).join("\n"),
      html,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "We couldn't send your message right now. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
