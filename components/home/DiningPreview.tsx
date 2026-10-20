import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESTAURANTS } from "@/lib/constants";

export default function DiningPreview() {
  const featured = RESTAURANTS.slice(0, 3);
  const [darbar, azure, spiceRoute] = featured;

  return (
    <section className="relative overflow-hidden bg-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      {/* Candlelight / Amber Ambient Lighting Effects */}
      <div className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-espresso-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/25 to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter III</span>
              <span className="h-px w-8 bg-gold-light/60" />
              <span className="text-[11px] font-medium uppercase tracking-luxe text-gold-light">
                Culinary Salon
              </span>
            </div>
            <SectionHeading
              light
              align="left"
              eyebrow="Royal Gastronomy"
              title="Five restaurants, one royal table"
              description="From the silver thalis of Darbar to seafood on the sand, every meal is a celebration of the coast and the courts of Rajasthan."
              className="max-w-2xl"
            />
          </div>

          <div className="hidden text-right lg:block">
            <p className="font-serif text-xs tracking-wider2 text-gold-light">
              Royal Heritage Culinary Salon
            </p>
            <p className="text-[11px] uppercase tracking-luxe text-ivory/50">
              Coastal & Heritage Recipes
            </p>
          </div>
        </div>

        {/* Asymmetrical Culinary Grid */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Flagship Jewel: Darbar (Large Feature on Left) */}
          {darbar && (
            <Reveal className="lg:col-span-7">
              <Link
                href={`/dining#${darbar.slug}`}
                className="group relative flex h-full flex-col justify-between border border-ivory/15 bg-espresso-600/70 p-6 shadow-luxe transition-all duration-700 hover:border-gold/50 sm:p-8"
              >
                <div className="relative overflow-hidden">
                  <ZoomImage
                    src={darbar.image}
                    alt={darbar.name}
                    className="aspect-[3/2] w-full"
                    overlay
                    sizes="(max-width:1024px) 100vw, 60vw"
                  />
                  <div className="absolute left-4 top-4 border border-ivory/30 bg-sea-night/85 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold-light backdrop-blur-sm sm:left-6 sm:top-6 sm:px-3.5 sm:py-1.5 sm:text-xs">
                    Flagship Dining
                  </div>
                  <div className="absolute bottom-4 right-4 font-serif text-3xl font-light text-ivory/30 sm:bottom-6 sm:right-6 sm:text-4xl">
                    01
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory/15 pb-4">
                    <div>
                      <p className="eyebrow text-gold-light">{darbar.cuisine}</p>
                      <h3 className="mt-1 font-serif text-3xl text-ivory transition-colors group-hover:text-gold-light sm:text-4xl">
                        {darbar.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center text-[11px] uppercase tracking-luxe text-gold-light group-hover:underline">
                      Reserve Table →
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/80 sm:text-base">
                    {darbar.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Secondary Duo: Azure & The Spice Route (Right Column Stack) */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {azure && (
              <Reveal delay={120}>
                <Link
                  href={`/dining#${azure.slug}`}
                  className="group relative block border border-ivory/15 bg-espresso-600/70 p-6 shadow-soft transition-all duration-700 hover:border-gold/50 sm:p-7"
                >
                  <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
                    <div className="sm:col-span-5">
                      <ZoomImage
                        src={azure.image}
                        alt={azure.name}
                        className="aspect-[3/2] w-full"
                        overlay
                        sizes="(max-width:768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="sm:col-span-7">
                      <div className="flex items-center justify-between">
                        <p className="eyebrow text-gold-light">{azure.cuisine}</p>
                        <span className="font-serif text-xl text-ivory/30">02</span>
                      </div>
                      <h3 className="mt-1.5 font-serif text-2xl text-ivory transition-colors group-hover:text-gold-light sm:text-[26px]">
                        {azure.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ivory/75 sm:text-sm">
                        {azure.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-xs uppercase tracking-luxe text-gold-light group-hover:underline">
                        Discover Azure →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {spiceRoute && (
              <Reveal delay={240}>
                <Link
                  href={`/dining#${spiceRoute.slug}`}
                  className="group relative block border border-ivory/15 bg-espresso-600/70 p-6 shadow-soft transition-all duration-700 hover:border-gold/50 sm:p-7"
                >
                  <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
                    <div className="sm:col-span-5">
                      <ZoomImage
                        src={spiceRoute.image}
                        alt={spiceRoute.name}
                        className="aspect-square w-full"
                        overlay
                        sizes="(max-width:768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="sm:col-span-7">
                      <div className="flex items-center justify-between">
                        <p className="eyebrow text-gold-light">{spiceRoute.cuisine}</p>
                        <span className="font-serif text-xl text-ivory/30">03</span>
                      </div>
                      <h3 className="mt-1.5 font-serif text-2xl text-ivory transition-colors group-hover:text-gold-light sm:text-[26px]">
                        {spiceRoute.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ivory/75 sm:text-sm">
                        {spiceRoute.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-xs uppercase tracking-luxe text-gold-light group-hover:underline">
                        Discover Spice Route →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}
          </div>
        </div>

        {/* Bottom CTA with Concierge Reassurance */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-16">
          <p className="text-xs uppercase tracking-wider2 text-ivory/60">
            Table reservations & bespoke coastal menus arranged via Concierge
          </p>
          <Link
            id="explore-dining-btn"
            href="/dining"
            className="btn-light min-h-[44px] inline-flex items-center"
          >
            Explore Dining
          </Link>
        </div>
      </div>
    </section>
  );
}
