import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Our Story" };

const PILLARS = [
  { title: "Heritage", text: "Built by 400 artisans from Rajasthan and Gujarat using sandstone, lime plaster and hand-carved teak, the palace revives crafts that were close to disappearing." },
  { title: "Hospitality", text: "Our butlers are trained in the traditions of the royal households — anticipating, never intruding. Nearly three hosts for every guest." },
  { title: "Harmony", text: "Solar power, rainwater harvesting, a plastic-free coast and a mangrove restoration programme protect the shore we call home." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero image="/img/night.webp" eyebrow="Our Story" title="A palace born of two shores" subtitle="Where the grandeur of Rajput courts meets the quiet light of the Mediterranean." />
      <section className="container grid items-center gap-14 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Since 1924 · Reimagined 2024</p>
          <h2 className="mt-3 text-display-md">From summer palace to sanctuary</h2>
          <span className="mt-6 block h-px w-16 bg-gold-light" />
          <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">
            The Royal Heritage began as the seaside summer palace of a Kutchi royal family, where monsoon winds cooled marble courtyards and ships from Zanzibar and Muscat anchored off the shore.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-espresso-50">
            A century later, the palace has been restored and reimagined as a resort of 34 rooms, suites and villas. Frescoes were painstakingly revived, jharokhas re-carved and gardens replanted, while every comfort of modern luxury was quietly woven in.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ZoomImage src="/img/lobby.webp" alt="The restored palace lobby" className="aspect-[4/5] w-full" />
        </Reveal>
      </section>

      <section className="bg-ivory-300/60 py-24">
        <SectionHeading eyebrow="Our Philosophy" title="Three pillars of the palace" />
        <div className="container mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="h-full border border-ivory-400 bg-ivory-50 p-8">
                <p className="font-serif text-5xl text-gold-light">0{i + 1}</p>
                <h3 className="mt-4 text-3xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-espresso-50">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-24">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1924", "Year the palace was built"],
            ["34", "Rooms, suites & villas"],
            ["2 km", "Private shoreline"],
            ["96", "Hosts in our family"],
          ].map(([n, l]) => (
            <div key={l} className="border-t border-gold-light pt-6">
              <p className="font-serif text-5xl text-espresso">{n}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wider2 text-espresso-50">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/stay" className="btn-primary">Plan Your Stay</Link>
        </div>
      </section>
    </>
  );
}
