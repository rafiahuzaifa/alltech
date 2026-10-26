import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import InquiryForm from "@/components/forms/InquiryForm";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us — Talk to an IPv4 Specialist",
  description:
    "Contact All Tech Cloud Services to buy, sell or lease IPv4 addresses. Call +1 (737) 304-5613 or email sales@alltechcloudservices.com — we reply within 24 hours.",
  path: "/contact",
});

const channels = [
  { icon: LuPhone, label: "Phone", value: site.phone, href: site.phoneHref },
  { icon: LuMail, label: "Sales", value: site.emails.sales, href: `mailto:${site.emails.sales}` },
  { icon: LuMail, label: "IPv4 desk", value: site.emails.ipv4, href: `mailto:${site.emails.ipv4}` },
  { icon: FaWhatsapp, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${site.whatsapp}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Where connectivity <span className="text-gradient">meets possibility</span></>}
        description="Have a question about IPv4 addresses? Our specialists are ready to help — complete the form and we'll get back to you within 24 hours."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="container-x py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="card card-hover flex items-center gap-4 p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand"><c.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-xs text-muted">{c.label}</span>
                    <span className="font-semibold break-all text-ink">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.25} className="card overflow-hidden">
              <div className="flex items-start gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand"><LuMapPin className="h-5 w-5" /></span>
                <span>
                  <span className="block text-xs text-muted">Headquarters</span>
                  <span className="font-semibold text-ink">{fullAddress}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted"><LuClock className="h-3.5 w-3.5" /> We reply within 24 hours</span>
                </span>
              </div>
              <iframe
                src={site.mapEmbed}
                title="All Tech Cloud Services office location in Austin, Texas"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 grayscale-[30%] dark:opacity-80 dark:invert-[90%] dark:hue-rotate-180"
              />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <InquiryForm type="contact" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
