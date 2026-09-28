import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ReserveButton from "@/components/reservations/ReserveButton";
import { SPA_TIMES, SPA_TREATMENTS } from "@/lib/constants";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = { title: "Wellness & The Royal Spa" };

export default function WellnessPage() {
  const names = SPA_TREATMENTS.map((t) => t.name);
  return (
    <>
      <PageHero image="/img/spa.webp" eyebrow="The Royal Spa" title="Rituals of renewal" subtitle="Ancient Ayurveda, a marble hammam and sunrise yoga by the sea." />

      <section className="container grid items-center gap-14 py-24 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Wellness</p>
          <h2 className="mt-3 text-display-md">A sanctuary of stillness</h2>
          <span className="mt-6 block h-px w-16 bg-gold-light" />
          <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">
            Set around a courtyard of fountains, The Royal Spa draws on the healing traditions of Kerala and the bathing rituals of the Ottoman courts. Eight treatment suites, a heated hydrotherapy pool, a marble hammam and a resident Ayurvedic doctor guide you back to balance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReserveButton kind="SPA" options={names} times={SPA_TIMES} label="Book a Treatment" />
          </div>
          <p className="mt-6 text-xs text-espresso-50">Open daily 9:00 AM – 9:00 PM · Guests must be 16 or older</p>
        </Reveal>
        <Reveal delay={120}>
          <ZoomImage src="/img/hammam.webp" alt="The marble hammam" className="aspect-[4/5] w-full" />
        </Reveal>
      </section>

      <section className="bg-ivory-300/60 py-24">
        <div className="container">
          <SectionHeading eyebrow="Treatment Menu" title="Signature rituals" />
          <div className="mt-14 grid gap-px bg-ivory-400 md:grid-cols-2">
            {SPA_TREATMENTS.map((t) => (
              <div key={t.name} className="flex flex-col bg-ivory-50 p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{t.name}</h3>
                  <p className="shrink-0 font-serif text-xl text-gold-dark">{formatINR(t.price)}</p>
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-wider2 text-espresso-50">{t.duration}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso-50">{t.description}</p>
                <div className="mt-6">
                  <ReserveButton kind="SPA" item={t.name} times={SPA_TIMES} label="Book" variant="outline" className="!px-6 !py-2.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid items-center gap-14 py-24 lg:grid-cols-2">
        <Reveal className="lg:order-2">
          <p className="eyebrow">Mind & Movement</p>
          <h2 className="mt-3 text-display-md">Sunrise yoga on the sand</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">
            Every morning our resident yogi leads hatha and pranayama sessions on the beach as the sun rises. Complimentary for all in-house guests, with private sessions available.
          </p>
          <div className="mt-8">
            <ReserveButton kind="EXPERIENCE" item="Sunrise Yoga on the Sand" times={["06:15", "07:00"]} label="Reserve a Session" variant="outline" />
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:order-1">
          <ZoomImage src="/img/yoga.webp" alt="Sunrise yoga on the beach" className="aspect-[4/3] w-full" />
        </Reveal>
      </section>
    </>
  );
}
