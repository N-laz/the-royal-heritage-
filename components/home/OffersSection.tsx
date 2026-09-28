import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { OFFERS } from "@/lib/constants";

export default function OffersSection() {
  return (
    <section className="bg-ivory-300/60 py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Offers" title="Privileges for direct guests" description="Book directly with us for our best rates and exclusive codes." />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o, i) => (
            <Reveal key={o.code} delay={i * 100}>
              <Link href={`/stay?promo=${o.code}`} className="group flex h-full flex-col border border-ivory-400 bg-ivory-50">
                <div className="relative">
                  <ZoomImage src={o.image} alt={o.title} className="aspect-[4/3] w-full" sizes="(max-width:768px) 100vw, 25vw" />
                  <span className="absolute right-4 top-4 bg-espresso px-3 py-2 font-serif text-xl text-gold-light">{o.pct}% off</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-espresso-50">{o.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="border border-dashed border-gold px-3 py-1.5 text-xs tracking-wider2 text-gold">{o.code}</span>
                    <span className="text-[11px] uppercase tracking-luxe text-espresso transition-colors group-hover:text-gold">Book →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
