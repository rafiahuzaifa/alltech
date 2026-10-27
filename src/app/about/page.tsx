import Image from "next/image";
import { LuBadgeCheck, LuEye, LuTarget, LuUsers } from "react-icons/lu";
import PageHero from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { Stats } from "@/components/home/Sections";
import RirMarquee from "@/components/home/RirMarquee";
import CtaBand from "@/components/ui/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us — IPv4 Broker Since 2019",
  description:
    "All Tech Cloud Services is an IPv4 broker headquartered in Austin, Texas. Since 2019 we've helped businesses worldwide buy, sell and lease IPv4 space.",
  path: "/about",
});

const values = [
  { icon: LuTarget, title: "Our mission", text: "To supply businesses with the most dependable and cost-effective IPv4 address space — and make every transfer simple, secure and compliant." },
  { icon: LuEye, title: "Our approach", text: "Transparent pricing, rigorous due diligence and a dedicated specialist for every client, from a single /24 to large enterprise blocks." },
  { icon: LuUsers, title: "Our team", text: "20+ experienced IP specialists who understand registry policy, routing and the realities of running production networks." },
  { icon: LuBadgeCheck, title: "Our commitment", text: "A registered IPv4 broker with APNIC and a strong, long-standing commitment to customer satisfaction." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Empowering businesses with <span className="text-gradient">reliable IPv4 space</span></>}
        description={`Founded in ${site.foundingYear} and headquartered in Austin, Texas, we connect IPv4 buyers, sellers and lessees around the world.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="container-x py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">A trusted partner in the IPv4 market</h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              {site.legalName} (ATCS) was founded in {site.foundingYear} with the mission of supplying businesses with the most dependable and
              cost-effective IP addresses. We are a privately held company headquartered in Austin, Texas, with an office at {fullAddress}.
            </p>
            <p className="mt-5 text-lg leading-8 text-muted">
              As a registered IPv4 broker with APNIC, we assist organizations in buying, selling and leasing IPv4 blocks across every
              Regional Internet Registry. Our experience and process ensure each transaction is completed safely, legally and efficiently.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <div className="card overflow-hidden p-2"><Image src="/images/a1.jpg" alt="Cloud network infrastructure" width={500} height={400} className="h-full w-full rounded-[1.25rem] object-cover" /></div>
            <div className="card mt-10 overflow-hidden p-2"><Image src="/images/a2.jpg" alt="IP specialist working on a network transfer" width={500} height={400} className="h-full w-full rounded-[1.25rem] object-cover" /></div>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="bg-surface py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title="Built on expertise and integrity" />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="card card-hover p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white"><v.icon className="h-6 w-6" /></span>
                <h3 className="mt-6 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RirMarquee />
      <CtaBand title="Let's talk about your IPv4 needs" />
    </>
  );
}
