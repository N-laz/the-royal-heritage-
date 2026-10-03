import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESTAURANTS } from "@/lib/constants";

export default function DiningPreview() {
  const featured = RESTAURANTS.slice(0, 3);
  return (
    <section className="bg-espresso py-16 text-ivory sm:py-24 md:py-32">
      <div className="container px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Royal Gastronomy"
          title="Five restaurants, one royal table"
          description="From the silver thalis of Darbar to seafood on the sand, every meal is a celebration of the coast and the courts of Rajasthan."
        />
        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
          {featured.map((r, i) => (
            <Reveal key={r.slug} delay={i * 120}>
              <Link href={`/dining#${r.slug}`} className="group block">
                <ZoomImage src={r.image} alt={r.name} className="aspect-[3/4] w-full" overlay sizes="(max-width:768px) 100vw, 33vw" />
                <div className="mt-5 sm:mt-6">
                  <p className="eyebrow text-gold-light">{r.cuisine}</p>
                  <h3 className="mt-2 text-2xl sm:text-3xl transition-colors group-hover:text-gold-light">{r.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ivory/75">{r.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 sm:mt-14 text-center">
          <Link id="explore-dining-btn" href="/dining" className="btn-light min-h-[44px] inline-flex items-center">Explore Dining</Link>
        </div>
      </div>
    </section>
  );
}
