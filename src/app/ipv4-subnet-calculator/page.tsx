import PageHero from "@/components/ui/PageHero";
import SubnetCalculator from "@/components/tools/SubnetCalculator";
import CtaBand from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import JsonLd from "@/components/site/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "IPv4 Subnet & CIDR Calculator",
  description:
    "Free IPv4 subnet calculator. Enter an IP and CIDR prefix to instantly see total addresses, usable hosts, network and broadcast address, subnet mask and wildcard mask.",
  path: "/ipv4-subnet-calculator",
  keywords: ["IPv4 subnet calculator", "CIDR calculator", "subnet mask calculator", "how many IPs in /24", "IP range calculator"],
});

const table = Array.from({ length: 17 }, (_, i) => 8 + i).map((p) => ({
  prefix: p,
  total: 2 ** (32 - p),
  mask: [24, 16, 8, 0].map((s) => (((0xffffffff << (32 - p)) >>> 0) >>> s) & 255).join("."),
}));

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "IPv4 Subnet Calculator",
          url: `${SITE_URL}/ipv4-subnet-calculator`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <PageHero
        eyebrow="Free tool"
        title={<>IPv4 subnet <span className="text-gradient">calculator</span></>}
        description="Size your next IPv4 block in seconds. Enter any address and prefix to see host counts, network ranges and masks."
        crumbs={[{ name: "Subnet Calculator", path: "/ipv4-subnet-calculator" }]}
      />
      <section className="container-x py-20">
        <Reveal><SubnetCalculator /></Reveal>
      </section>

      <section className="container-x max-w-4xl pb-12">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">IPv4 CIDR reference: /8 to /24</h2>
        <p className="mt-3 text-muted">
          The most commonly traded block sizes on the IPv4 market. A /24 (256 addresses) is the smallest prefix generally accepted in the
          global BGP routing table.
        </p>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs tracking-wide text-muted uppercase">
              <tr><th className="px-5 py-3">Prefix</th><th className="px-5 py-3">Addresses</th><th className="px-5 py-3">Subnet mask</th><th className="px-5 py-3">/24 blocks</th></tr>
            </thead>
            <tbody className="divide-y divide-line font-mono">
              {table.map((r) => (
                <tr key={r.prefix} className="hover:bg-surface">
                  <td className="px-5 py-3 font-semibold text-brand">/{r.prefix}</td>
                  <td className="px-5 py-3 text-ink">{r.total.toLocaleString("en-US")}</td>
                  <td className="px-5 py-3 text-ink">{r.mask}</td>
                  <td className="px-5 py-3 text-muted">{(r.total / 256).toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <CtaBand title="Know the size you need?" description="Tell us the prefix and registry — we'll find clean IPv4 inventory to buy or lease." />
    </>
  );
}
