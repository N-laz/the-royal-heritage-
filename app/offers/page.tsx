import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ZoomImage from "@/components/ui/ZoomImage";
import Reveal from "@/components/ui/Reveal";
import { OFFERS } from "@/lib/constants";

export const metadata: Metadata = { title: "Offers" };

export default function OffersPage() {
  return (
    <>
      <PageHero image="/img/couple-villa.webp" eyebrow="Offers" title="Privileges for direct guests" subtitle="Our best rates, exclusive codes and thoughtful inclusions — only when you book with us." height="short" />
      <section className="container space-y-10 py-24">
        {OFFERS.map((o, i) => (
          <Reveal key={o.code}>
            <article className={`grid overflow-hidden border border-ivory-400 bg-ivory-50 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <ZoomImage src={o.image} alt={o.title} className="aspect-[4/3] w-full md:aspect-auto md:min-h-[380px]" />
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="font-serif text-6xl text-gold">{o.pct}%<span className="ml-2 text-2xl text-espresso-50">off</span></p>
                <h2 className="mt-4 text-display-sm">{o.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-espresso-50">{o.description}</p>
                <p className="mt-4 text-xs text-espresso-50">{o.terms} Discount applies to the room total before taxes and cannot be combined with other codes.</p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <span className="border border-dashed border-gold px-4 py-2.5 text-sm tracking-luxe text-gold-dark">{o.code}</span>
                  <Link href={`/stay?promo=${o.code}`} className="btn-primary">Book this offer</Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
