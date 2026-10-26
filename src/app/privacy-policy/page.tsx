import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How All Tech Cloud Services collects, uses, shares and protects your personal information.",
  path: "/privacy-policy",
});

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Information we collect",
    body: [
      "At All Tech Cloud Services, we prioritize the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose and protect your data when you visit our website, engage with our services or interact with us.",
      "Personal information: details that can identify you, such as your name, email address, phone number, company name and billing information.",
      "IP addresses & technical data: IP addresses, browser type, operating system details and other technical data used to enhance security, monitor website performance and improve our services.",
      "Usage information: how you interact with our website and services, including log files, device information, browsing behaviour and preferences.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "Service delivery: to facilitate the buying, selling and leasing of IPv4 addresses and ensure seamless transactions.",
      "Customer communication: to send service-related updates, respond to inquiries and provide support.",
      "Security & compliance: to protect the platform, prevent fraud and comply with applicable legal and registry requirements.",
      "Service improvement & analytics: to analyse trends, optimize user experience and enhance our website and services.",
    ],
  },
  {
    title: "3. Sharing your information",
    body: [
      "Trusted service providers: we may share necessary data with third parties who help us deliver our services, under strict confidentiality agreements.",
      "Regional Internet Registries: completing an IPv4 transfer requires sharing certain organization details with the relevant RIR.",
      "Legal requirements: we may disclose your information where required by law, regulatory authorities or legal proceedings.",
    ],
  },
  {
    title: "4. Cookies & analytics",
    body: [
      "We use privacy-friendly analytics and essential browser storage (for example, to remember your light or dark theme preference). You can adjust your browser settings to manage cookies and site data.",
    ],
  },
  {
    title: "5. Your rights & choices",
    body: [
      "Opt-out: you can opt out of promotional emails or marketing communications at any time.",
      "Access & updates: you may request access to, correction of, or deletion of your personal information.",
    ],
  },
  {
    title: "6. Data security",
    body: [
      "We implement industry-standard security measures to protect your data from unauthorized access, misuse or breaches. No online platform is entirely risk-free, so we recommend safeguarding your credentials.",
    ],
  },
  {
    title: "7. Children's privacy",
    body: ["Our services are intended for businesses and individuals over the age of 18. We do not knowingly collect data from minors."],
  },
  {
    title: "8. Changes to this policy",
    body: ["We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Please review this page regularly."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Privacy Policy for All Tech Cloud Services — IPv4 brokerage company."
        crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <article className="container-x max-w-3xl py-20">
        <div className="prose-article">
          {sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </section>
          ))}
          <section>
            <h2>9. Contact us</h2>
            <p>
              For any questions or concerns regarding this Privacy Policy, contact us at{" "}
              <a href={`mailto:${site.emails.info}`}>{site.emails.info}</a>.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
