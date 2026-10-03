import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20 text-center text-ivory sm:py-32 md:py-44">
      <Image src="/img/night.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-espresso-600/70" />
      <div className="container px-4 sm:px-6 relative max-w-3xl">
        <p className="eyebrow text-gold-light">Your Palace Awaits</p>
        <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-display-lg">Begin your royal escape</h2>
        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-ivory/75">Reserve directly for our best rates, complimentary sunrise yoga and a welcome ritual on arrival.</p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link id="cta-book-stay" href="/stay" className="btn-gold min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center">Book Your Stay</Link>
          <Link id="cta-speak-to-us" href="/contact" className="btn-light min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center">Speak to Us</Link>
        </div>
      </div>
    </section>
  );
}
