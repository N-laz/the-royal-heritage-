import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      {/* Editorial Watermark & Architectural Framing */}
      <div
        className="pointer-events-none absolute -right-12 top-10 select-none font-serif text-[18vw] font-bold leading-none text-gold-light/[0.03]"
        aria-hidden
      >
        MANDVI
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top_left,rgba(201,169,137,0.08),transparent_60%)]" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Storytelling */}
          <Reveal className="lg:col-span-6 lg:pr-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter I</span>
              <span className="h-px w-8 bg-gold-light/60" />
              <p className="eyebrow normal-case tracking-luxe text-gold-light">A Palace by the Sea</p>
            </div>

            <h2 className="mt-4 font-serif text-3xl leading-[1.08] text-ivory sm:text-4xl md:text-5xl lg:text-display-md">
              Rajput grandeur, <span className="italic font-normal text-gold-light">Mediterranean calm</span>
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <span className="block h-px w-14 bg-gold-light/60" />
              <span className="block h-1 w-1 rotate-45 bg-gold" />
            </div>

            <p className="reading-measure mt-6 text-[15px] leading-relaxed text-ivory/80 sm:text-base">
              <span className="float-left mr-3 font-serif text-4xl leading-none text-gold-light sm:text-5xl">R</span>
              ising from the golden shores of Kutch, The Royal Heritage is a palace of carved sandstone, cool marble
              courtyards and jharokha balconies that open onto the Arabian Sea. Here, the craftsmanship of Udaipur and
              Jodhpur meets the slow, sun-washed rhythm of the Mediterranean coast.
            </p>

            <p className="reading-measure mt-4 text-[15px] leading-relaxed text-ivory/75 sm:text-base">
              Thirty-four rooms, suites and private pool villas. Five restaurants. A spa of ancient rituals. And a team
              devoted to anticipating every wish, as the royal households once did.
            </p>

            {/* Architectural Stats Ribbon */}
            <div className="mt-8 border-y border-gold/20 bg-espresso-600/70 px-4 py-6 shadow-soft backdrop-blur-sm sm:mt-10 sm:px-6 sm:py-7">
              <div className="grid grid-cols-3 divide-x divide-gold/15 text-center">
                {[
                  ["34", "Rooms & Villas"],
                  ["5", "Restaurants"],
                  ["2 km", "Private Beach"],
                ].map(([value, label]) => (
                  <div key={label} className="px-2">
                    <p className="font-serif text-3xl tracking-tight text-gold-light sm:text-4xl">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider2 text-ivory/60 sm:text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <ButtonLink id="welcome-our-story" href="/about" variant="light">
                Our Story
              </ButtonLink>
            </div>
          </Reveal>

          {/* Right Column: Layered Architectural Photography */}
          <Reveal delay={150} className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Architectural Double-Frame */}
              <div className="relative border border-gold/30 bg-espresso-600/80 p-2.5 shadow-luxe backdrop-blur-sm sm:p-4">
                <ZoomImage
                  src="/img/lobby.webp"
                  alt="The palace lobby"
                  className="aspect-[16/9] w-full"
                  sizes="(max-width:1024px) 100vw, 45vw"
                  objectPosition="object-center"
                />

                {/* Floating Architectural Badge */}
                <div className="absolute left-6 top-6 hidden border border-gold/30 bg-sea-night/90 px-3.5 py-1.5 shadow-soft backdrop-blur-sm sm:block">
                  <p className="text-xs uppercase tracking-wider2 text-gold-light">
                    Grand Atrium · Hand-carved Sandstone
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Framing — Safe Mobile Offset */}
              <div className="absolute -bottom-6 left-2 w-36 sm:-bottom-12 sm:-left-10 sm:w-56 lg:-left-12 lg:w-64">
                <div className="relative border-2 border-gold/30 bg-espresso-600 shadow-luxe">
                  <ZoomImage
                    src="/img/aerial.webp"
                    alt="Aerial view of the resort"
                    className="aspect-[4/5] w-full"
                    sizes="260px"
                    objectPosition="object-center"
                  />
                  <div className="bg-sea-night/95 px-3 py-1.5 text-center text-ivory">
                    <p className="text-xs uppercase tracking-luxe text-gold-light">
                      Arabian Coastline
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
