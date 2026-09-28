import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ReserveButton from "@/components/reservations/ReserveButton";
import { RESTAURANTS } from "@/lib/constants";

export const metadata: Metadata = { title: "Dining", description: "Five restaurants at The Royal Heritage — royal Rajasthani, Mediterranean rooftop, coastal Indian, beach grill and the Maharaja's Lounge." };

export default function DiningPage() {
  return (
    <>
      <PageHero image="/img/dining-fine.webp" eyebrow="Dining" title="A royal table by the sea" subtitle="Five restaurants and bars, each telling its own story of the coast and the courts of Rajasthan." />

      <section className="py-24">
        <SectionHeading
          eyebrow="Culinary Heritage"
          title="Recipes from royal kitchens, catch from the Arabian Sea"
          description="Our chefs travel the spice routes of western India and the shores of the Mediterranean, bringing both to your table with produce from our own gardens and fishermen of Mandvi."
        />
      </section>

      <div className="space-y-24 pb-24 sm:space-y-32">
        {RESTAURANTS.map((r, i) => (
          <section key={r.slug} id={r.slug} className="container scroll-mt-32">
            <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <ZoomImage src={r.image} alt={r.name} className="aspect-[4/3] w-full" sizes="(max-width:1024px) 100vw, 50vw" />
              </Reveal>
              <Reveal delay={120}>
                <p className="eyebrow">{r.cuisine}</p>
                <h2 className="mt-3 text-display-md">{r.name}</h2>
                <span className="mt-6 block h-px w-16 bg-gold-light" />
                <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">{r.description}</p>
                <dl className="mt-8 grid gap-4 border-y border-ivory-400 py-6 text-sm sm:grid-cols-2">
                  <div><dt className="text-[10px] uppercase tracking-luxe text-gold">Hours</dt><dd className="mt-1">{r.hours}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-luxe text-gold">Dress code</dt><dd className="mt-1">{r.dress}</dd></div>
                </dl>
                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-luxe text-gold">Signatures</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {r.signature.map((s) => <li key={s} className="border border-ivory-400 px-3 py-1.5 text-xs">{s}</li>)}
                  </ul>
                </div>
                <div className="mt-10">
                  <ReserveButton kind="DINING" item={r.name} times={r.times} label="Reserve a Table" />
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="relative overflow-hidden bg-espresso py-24 text-ivory">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <ZoomImage src="/img/beach-dinner.webp" alt="Private beach dinner" className="aspect-[4/3] w-full" />
          <div>
            <p className="eyebrow text-gold-light">Private Dining</p>
            <h2 className="mt-3 text-display-md">A table for two on the sand</h2>
            <p className="mt-6 text-ivory/70">
              A five-course menu, lanterns, a violinist and the sound of the tide. Our private beach dinner is the most requested moment at the palace.
            </p>
            <div className="mt-8">
              <ReserveButton kind="EXPERIENCE" item="Beach Dinner Under the Stars" times={["19:00", "19:30", "20:00"]} label="Reserve Beach Dinner" variant="gold" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
