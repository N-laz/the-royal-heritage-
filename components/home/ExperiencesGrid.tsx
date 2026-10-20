import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const TILES = [
  {
    num: "01",
    cat: "Wellness & Rituals",
    title: "The Royal Spa",
    sub: "Ayurveda & hammam rituals",
    image: "/img/spa.webp",
    href: "/wellness",
    badge: "Sanctuary",
  },
  {
    num: "02",
    cat: "Arabian Sea",
    title: "Sunset Yacht Cruise",
    sub: "Champagne on the Arabian Sea",
    image: "/img/yacht.webp",
    href: "/experiences",
    badge: "Private Charter",
  },
  {
    num: "03",
    cat: "Private Dining",
    title: "Beach Dinners",
    sub: "Lantern-lit tables on the sand",
    image: "/img/beach-dinner.webp",
    href: "/experiences",
    badge: "Romance",
  },
  {
    num: "04",
    cat: "Expeditions",
    title: "Desert Safari",
    sub: "The White Rann of Kutch",
    image: "/img/desert.webp",
    href: "/experiences",
    badge: "Wilderness",
  },
  {
    num: "05",
    cat: "Milestones",
    title: "Royal Weddings",
    sub: "Celebrations of a lifetime",
    image: "/img/wedding.webp",
    href: "/celebrations",
    badge: "Palace Lawns",
  },
];

export default function ExperiencesGrid() {
  const [spa, yacht, beachDinner, desert, wedding] = TILES;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sea-night via-espresso-600/95 to-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      {/* Editorial Watermark & Framing */}
      <div className="pointer-events-none absolute left-8 top-12 select-none font-serif text-[16vw] font-bold leading-none text-gold-light/[0.03]" aria-hidden>
        EXPERIENCES
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-gold/20 pb-8 sm:pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter IV</span>
              <span className="h-px w-8 bg-gold-light/60" />
              <span className="text-[11px] font-medium uppercase tracking-luxe text-gold-light">
                Resort Expeditions
              </span>
            </div>
            <SectionHeading
              light
              align="left"
              eyebrow="Experiences"
              title="Moments worthy of a maharaja"
              description="Unhurried rituals, adventures at sea and in the desert, and celebrations planned down to the last petal."
              className="max-w-2xl"
            />
          </div>
          <div className="hidden lg:block">
            <span className="text-xs uppercase tracking-wider2 text-ivory/60">
              Curated by the Royal Concierge
            </span>
          </div>
        </div>

        {/* Asymmetrical 5-Tile Editorial Layout */}
        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Tile 1: The Royal Spa (Dominant Feature Column) */}
          {spa && (
            <Reveal className="lg:col-span-6 lg:row-span-2">
              <Link
                href={spa.href}
                className="group relative isolate block h-full min-h-[440px] overflow-hidden border border-sandstone/40 bg-espresso-600 shadow-soft transition-all duration-700 hover:shadow-luxe sm:min-h-[500px] lg:min-h-[640px]"
              >
                <ZoomImage
                  src={spa.image}
                  alt={spa.title}
                  className="h-full w-full"
                  overlay
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/90 via-espresso-600/30 to-transparent" />

                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <span className="border border-ivory/30 bg-sea-night/70 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold-light backdrop-blur-sm">
                    {spa.badge}
                  </span>
                  <span className="text-xs font-serif text-ivory/60">No. {spa.num}</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-ivory">
                  <p className="text-xs uppercase tracking-wider2 text-gold-light">{spa.sub}</p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-gold-light sm:text-4xl lg:text-5xl">
                    {spa.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-light opacity-90 group-hover:opacity-100">
                    <span>Explore Wellness Sanctuary</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Tile 2: Sunset Yacht Cruise */}
          {yacht && (
            <Reveal delay={80} className="lg:col-span-6">
              <Link
                href={yacht.href}
                className="group relative isolate block h-full min-h-[280px] overflow-hidden border border-sandstone/40 bg-espresso-600 shadow-soft transition-all duration-700 hover:shadow-luxe sm:min-h-[300px]"
              >
                <ZoomImage
                  src={yacht.image}
                  alt={yacht.title}
                  className="h-full w-full"
                  overlay
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/85 via-espresso-600/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="border border-ivory/30 bg-sea-night/70 px-2.5 py-1 text-[9px] uppercase tracking-luxe text-gold-light backdrop-blur-sm">
                    {yacht.badge}
                  </span>
                  <span className="text-[11px] font-serif text-ivory/60">No. {yacht.num}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-ivory">
                  <p className="text-[11px] uppercase tracking-wider2 text-gold-light">{yacht.sub}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-none text-ivory transition-colors group-hover:text-gold-light sm:text-3xl">
                    {yacht.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Tile 3: Beach Dinners */}
          {beachDinner && (
            <Reveal delay={160} className="lg:col-span-6">
              <Link
                href={beachDinner.href}
                className="group relative isolate block h-full min-h-[280px] overflow-hidden border border-sandstone/40 bg-espresso-600 shadow-soft transition-all duration-700 hover:shadow-luxe sm:min-h-[300px]"
              >
                <ZoomImage
                  src={beachDinner.image}
                  alt={beachDinner.title}
                  className="h-full w-full"
                  overlay
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/85 via-espresso-600/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="border border-ivory/30 bg-sea-night/70 px-2.5 py-1 text-[9px] uppercase tracking-luxe text-gold-light backdrop-blur-sm">
                    {beachDinner.badge}
                  </span>
                  <span className="text-[11px] font-serif text-ivory/60">No. {beachDinner.num}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-ivory">
                  <p className="text-[11px] uppercase tracking-wider2 text-gold-light">{beachDinner.sub}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-none text-ivory transition-colors group-hover:text-gold-light sm:text-3xl">
                    {beachDinner.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Tile 4: Desert Safari */}
          {desert && (
            <Reveal delay={240} className="lg:col-span-6">
              <Link
                href={desert.href}
                className="group relative isolate block h-full min-h-[280px] overflow-hidden border border-sandstone/40 bg-espresso-600 shadow-soft transition-all duration-700 hover:shadow-luxe sm:min-h-[300px]"
              >
                <ZoomImage
                  src={desert.image}
                  alt={desert.title}
                  className="h-full w-full"
                  overlay
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/85 via-espresso-600/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="border border-ivory/30 bg-sea-night/70 px-2.5 py-1 text-[9px] uppercase tracking-luxe text-gold-light backdrop-blur-sm">
                    {desert.badge}
                  </span>
                  <span className="text-[11px] font-serif text-ivory/60">No. {desert.num}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-ivory">
                  <p className="text-[11px] uppercase tracking-wider2 text-gold-light">{desert.sub}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-none text-ivory transition-colors group-hover:text-gold-light sm:text-3xl">
                    {desert.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Tile 5: Royal Weddings */}
          {wedding && (
            <Reveal delay={320} className="lg:col-span-6">
              <Link
                href={wedding.href}
                className="group relative isolate block h-full min-h-[280px] overflow-hidden border border-sandstone/40 bg-espresso-600 shadow-soft transition-all duration-700 hover:shadow-luxe sm:min-h-[300px]"
              >
                <ZoomImage
                  src={wedding.image}
                  alt={wedding.title}
                  className="h-full w-full"
                  overlay
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-600/85 via-espresso-600/20 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="border border-ivory/30 bg-sea-night/70 px-2.5 py-1 text-[9px] uppercase tracking-luxe text-gold-light backdrop-blur-sm">
                    {wedding.badge}
                  </span>
                  <span className="text-[11px] font-serif text-ivory/60">No. {wedding.num}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-ivory">
                  <p className="text-[11px] uppercase tracking-wider2 text-gold-light">{wedding.sub}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-none text-ivory transition-colors group-hover:text-gold-light sm:text-3xl">
                    {wedding.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
