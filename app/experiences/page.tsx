import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ReserveButton from "@/components/reservations/ReserveButton";
import { EXPERIENCES } from "@/lib/constants";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = { title: "Experiences" };

export default function ExperiencesPage() {
  return (
    <>
      <PageHero image="/img/yacht.webp" eyebrow="Experiences" title="Moments worthy of a maharaja" subtitle="Sail at sunset, dine under the stars, cross the white desert — curated by our team of experience makers." />
      <section className="py-24">
        <SectionHeading eyebrow="Curated for you" title="Adventures by land and sea" description="Every experience can be tailored privately. Speak to our concierge for bespoke itineraries." />
        <div className="container mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 100}>
              <article className="group flex h-full flex-col border border-ivory-400 bg-ivory-50">
                <div className="relative">
                  <ZoomImage src={e.image} alt={e.name} className="aspect-[4/3] w-full" sizes="(max-width:768px) 100vw, 33vw" />
                  <span className="absolute left-4 top-4 bg-ivory-50/90 px-3 py-1.5 text-[10px] uppercase tracking-luxe">{e.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-[28px] leading-tight">{e.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-50">{e.description}</p>
                  <div className="mt-6 flex items-end justify-between border-t border-ivory-400 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider2 text-espresso-50">{e.duration}</p>
                      <p className="font-serif text-xl">{e.price ? formatINR(e.price) : "Complimentary"}</p>
                    </div>
                    <ReserveButton kind="EXPERIENCE" item={e.name} times={e.times} label="Reserve" className="!px-5 !py-3" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
