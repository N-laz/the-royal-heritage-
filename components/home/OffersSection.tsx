import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { OFFERS } from "@/lib/constants";

export default function OffersSection() {
  return (
    <section className="bg-ivory-300/60 py-16 sm:py-24 md:py-32">
      <div className="container px-4 sm:px-6">
        <SectionHeading eyebrow="Offers" title="Privileges for direct guests" description="Book directly with us for our best rates and exclusive codes." />
        <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o, i) => (
            <Reveal key={o.code} delay={i * 100}>
              <Link href={`/stay?promo=${o.code}`} className="group flex h-full flex-col border border-ivory-400 bg-ivory-50">
                <div className="relative">
                  <ZoomImage src={o.image} alt={o.title} className="aspect-[4/3] w-full" sizes="(max-width:768px) 100vw, 25vw" />
                  <span className="absolute right-3 top-3 sm:right-4 sm:top-4 bg-espresso px-2 py-1.5 sm:px-3 sm:py-2 font-serif text-lg sm:text-xl text-gold-light">{o.pct}% off</span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl">{o.title}</h3>
                  <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-espresso-50">{o.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 sm:pt-6">
                    <span className="border border-dashed border-gold px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs tracking-wider2 text-gold">{o.code}</span>
                    <span className="inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-luxe text-espresso transition-colors group-hover:text-gold">Book →</span>
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
