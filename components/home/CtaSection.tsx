import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-[600px] sm:min-h-[720px] py-28 text-center text-ivory sm:py-36 lg:py-48">
      {/* Night Panorama with Ken Burns subtle atmosphere */}
      <Image
        src="/img/night.webp"
        alt="The Royal Heritage palace at night"
        fill
        sizes="100vw"
        className="object-cover object-center scale-105"
      />

      {/* Atmospheric Multi-stop Gradient & Lantern Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-sea-night via-sea-night/75 to-espresso-600/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,97,0.18)_0%,transparent_70%)]" />

      {/* Fine Palatial Architectural Border Accents */}
      <div className="pointer-events-none absolute inset-x-8 top-10 hidden h-px bg-gold-light/20 lg:block xl:inset-x-24" />
      <div className="pointer-events-none absolute inset-x-8 bottom-10 hidden h-px bg-gold-light/20 lg:block xl:inset-x-24" />

      <div className="container relative z-10 max-w-4xl px-4 sm:px-6">
        {/* Royal Crest / Palace Monogram Motif */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-sea-night/60 backdrop-blur-sm sm:mb-8">
          <span className="font-serif text-lg font-bold tracking-widest text-gold-light">RH</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold-light/70 sm:w-12" />
          <p className="eyebrow tracking-luxe text-gold-light">Your Palace Awaits</p>
          <span className="h-px w-8 bg-gold-light/70 sm:w-12" />
        </div>

        <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-ivory sm:mt-6 sm:text-5xl md:text-6xl lg:text-display-lg">
          Begin your royal escape
        </h2>

        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm font-light leading-relaxed text-ivory/85 sm:mt-7 sm:text-base md:text-lg">
          Reserve directly with our reservations team for personalized stay curation and a traditional welcome ritual on arrival.
        </p>

        {/* CTA Buttons Hierarchy */}
        <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-5">
          <Link
            id="cta-book-stay"
            href="/stay"
            className="btn-gold min-h-[48px] w-full items-center justify-center !px-9 !py-4 shadow-luxe transition-all duration-300 hover:scale-[1.02] sm:w-auto"
          >
            <span>Book Your Stay</span>
            <span className="ml-2">→</span>
          </Link>
          <Link
            id="cta-speak-to-us"
            href="/contact"
            className="btn-light min-h-[48px] w-full items-center justify-center !px-9 !py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] sm:w-auto"
          >
            Speak to Us
          </Link>
        </div>

        {/* Direct Concierge Reassurance Footer */}
        <div className="mt-12 border-t border-ivory/15 pt-6 sm:mt-16 sm:pt-8">
          <p className="text-xs uppercase tracking-wider2 text-ivory/60">
            Direct Reservations: <span className="text-gold-light">+91 90812 20186</span> · Concierge Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
}
