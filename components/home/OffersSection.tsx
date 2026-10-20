import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { OFFERS } from "@/lib/constants";

export default function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sea-night via-espresso-600/90 to-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter V</span>
            <span className="h-px w-8 bg-gold-light/60" />
            <span className="text-[11px] font-medium uppercase tracking-luxe text-gold-light">
              Seasonal Privileges
            </span>
          </div>
          <SectionHeading
            light
            eyebrow="Offers"
            title="Privileges for direct guests"
            description="Book directly with us for our best rates and exclusive codes."
            className="max-w-2xl text-center"
          />
        </div>

        {/* Campaign Offer Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {OFFERS.map((o, i) => (
            <Reveal key={o.code} delay={i * 90}>
              <Link
                href={`/stay?promo=${o.code}`}
                className="group flex h-full flex-col border border-gold/20 bg-espresso-600/90 shadow-luxe backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-gold/60"
              >
                <div className="relative overflow-hidden">
                  <ZoomImage
                    src={o.image}
                    alt={o.title}
                    className="aspect-[4/3] w-full"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                  <div className="absolute right-0 top-0 border-b border-l border-gold/40 bg-sea-night/95 px-3.5 py-1.5 font-serif text-base tracking-wider2 text-gold-light backdrop-blur-sm sm:px-4 sm:py-2 sm:text-lg">
                    {o.pct}% off
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[10px] font-medium uppercase tracking-luxe text-gold-light">
                    Exclusive Privilege
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-snug text-ivory transition-colors group-hover:text-gold-light sm:text-[26px]">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ivory/70 sm:text-sm">
                    {o.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-gold/15 pt-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider2 text-ivory/60">CODE</span>
                      <span className="border border-dashed border-gold/60 bg-gold/15 px-2.5 py-1 font-mono text-xs tracking-wider2 text-gold-light">
                        {o.code}
                      </span>
                    </div>
                    <span className="inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-luxe text-gold-light transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ivory">
                      Book →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Concierge Guarantee Ribbon */}
        <div className="mt-14 border border-gold/20 bg-espresso-600/70 p-5 text-center shadow-soft backdrop-blur-sm sm:p-6">
          <p className="text-xs uppercase tracking-wider2 text-ivory/70">
            Direct Reservations · Authentic Royal Hospitality · Dedicated Concierge Assistance
          </p>
        </div>
      </div>
    </section>
  );
}
