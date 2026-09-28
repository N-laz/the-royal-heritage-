import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-32 text-center text-ivory sm:py-44">
      <Image src="/img/night.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-espresso-600/70" />
      <div className="container relative max-w-3xl">
        <p className="eyebrow text-gold-light">Your Palace Awaits</p>
        <h2 className="mt-5 text-display-lg">Begin your royal escape</h2>
        <p className="mx-auto mt-6 max-w-xl text-ivory/75">Reserve directly for our best rates, complimentary sunrise yoga and a welcome ritual on arrival.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/stay" className="btn-gold">Book Your Stay</Link>
          <Link href="/contact" className="btn-light">Speak to Us</Link>
        </div>
      </div>
    </section>
  );
}
