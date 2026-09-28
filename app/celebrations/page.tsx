import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ReserveButton from "@/components/reservations/ReserveButton";
import { CELEBRATIONS } from "@/lib/constants";

export const metadata: Metadata = { title: "Weddings & Celebrations" };

export default function CelebrationsPage() {
  const options = CELEBRATIONS.map((c) => c.title);
  return (
    <>
      <PageHero image="/img/wedding.webp" eyebrow="Celebrations" title="Celebrations of a lifetime" subtitle="Royal weddings, grand galas and intimate moments — orchestrated with palace grandeur by the sea." />
      <section className="py-24">
        <SectionHeading eyebrow="Weddings & Events" title="Where every occasion becomes legend" description="Our dedicated celebrations team designs each event from the first sketch to the final firework." />
        <div className="mt-10 text-center">
          <ReserveButton kind="CELEBRATION" options={options} label="Start Planning" variant="gold" />
        </div>
      </section>
      <div className="space-y-24 pb-24">
        {CELEBRATIONS.map((c, i) => (
          <section key={c.slug} className="container">
            <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <ZoomImage src={c.image} alt={c.title} className="aspect-[4/3] w-full" />
              </Reveal>
              <Reveal delay={120}>
                <h2 className="text-display-md">{c.title}</h2>
                <span className="mt-6 block h-px w-16 bg-gold-light" />
                <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">{c.description}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-sm"><span className="h-1.5 w-1.5 rotate-45 bg-gold" />{h}</li>
                  ))}
                </ul>
                <div className="mt-10">
                  <ReserveButton kind="CELEBRATION" item={c.title} label="Enquire" variant="outline" />
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
      <section className="bg-espresso py-20 text-center text-ivory">
        <div className="container max-w-2xl">
          <p className="eyebrow text-gold-light">The Grand Ballroom</p>
          <h2 className="mt-3 text-display-md">9,000 sq ft of gilded splendour</h2>
          <p className="mt-5 text-ivory/70">Host up to 800 guests beneath crystal chandeliers, with a private terrace overlooking the Arabian Sea.</p>
          <div className="mt-8">
            <ReserveButton kind="CELEBRATION" item="The Grand Ballroom" label="Request a Proposal" variant="light" />
          </div>
        </div>
      </section>
    </>
  );
}
