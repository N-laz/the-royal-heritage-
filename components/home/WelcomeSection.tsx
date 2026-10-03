import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function WelcomeSection() {
  return (
    <section className="overflow-hidden py-16 sm:py-24 md:py-32">
      <div className="container px-4 sm:px-6 grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow">A Palace by the Sea</p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-display-md">Rajput grandeur, Mediterranean calm</h2>
          <span className="mt-5 sm:mt-6 block h-px w-16 bg-gold-light" />
          <p className="mt-6 sm:mt-8 text-[15px] leading-relaxed text-espresso-50">
            Rising from the golden shores of Kutch, The Royal Heritage is a palace of carved sandstone, cool marble courtyards and
            jharokha balconies that open onto the Arabian Sea. Here, the craftsmanship of Udaipur and Jodhpur meets the slow,
            sun-washed rhythm of the Mediterranean coast.
          </p>
          <p className="mt-4 sm:mt-5 text-[15px] leading-relaxed text-espresso-50">
            Thirty-four rooms, suites and private pool villas. Five restaurants. A spa of ancient rituals. And a team devoted to
            anticipating every wish, as the royal households once did.
          </p>
          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-y border-ivory-400 py-6 sm:py-8 text-center">
            {[
              ["34", "Rooms & Villas"],
              ["5", "Restaurants"],
              ["2 km", "Private Beach"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl sm:text-4xl text-gold">{value}</p>
                <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs uppercase tracking-wider2 text-espresso-50">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-10">
            <ButtonLink id="welcome-our-story" href="/about" variant="outline">Our Story</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative">
          <ZoomImage src="/img/lobby.webp" alt="The palace lobby" className="aspect-[4/5] w-full" sizes="(max-width:1024px) 100vw, 45vw" />
          <ZoomImage src="/img/aerial.webp" alt="Aerial view of the resort" className="absolute -bottom-10 -left-6 hidden aspect-square w-52 border-8 border-ivory sm:block lg:-left-16 lg:w-64" sizes="260px" />
        </Reveal>
      </div>
    </section>
  );
}
