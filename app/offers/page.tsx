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
      <section className="surface-dark py-24">
        <div className="container space-y-10">
          {OFFERS.map((o, i) => (
          <Reveal key={o.code}>
            <article className={`grid overflow-hidden border border-ivory/20 bg-espresso-600/40 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <ZoomImage src={o.image} alt={o.title} className="aspect-[3/2] w-full md:aspect-auto md:min-h-[380px]" dark />
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="font-serif text-6xl text-gold">{o.pct}%<span className="ml-2 text-2xl text-ivory/60">off</span></p>
                <h2 className="mt-4 text-display-sm text-ivory">{o.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ivory/70">{o.description}</p>
                <p className="mt-4 text-xs text-ivory/60">{o.terms} Discount applies to the room total before taxes and cannot be combined with other codes.</p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <span className="border border-dashed border-gold/40 px-4 py-2.5 text-sm tracking-luxe text-gold-light">{o.code}</span>
                  <Link href={`/stay?promo=${o.code}`} className="btn-gold">Book this offer</Link>
                </div>
              </div>
            </article>
          </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
