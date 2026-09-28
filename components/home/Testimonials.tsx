"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Stars from "@/components/reviews/Stars";

export type TestimonialItem = { quote: string; name: string; location: string; stay: string; rating?: number };

export default function Testimonials({ items }: { items?: TestimonialItem[] }) {
  const TESTIMONIALS_LIST: TestimonialItem[] = items ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (TESTIMONIALS_LIST.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS_LIST.length), 8000);
    return () => clearInterval(id);
  }, [index, TESTIMONIALS_LIST.length]);

  if (TESTIMONIALS_LIST.length === 0) return null;

  const t = TESTIMONIALS_LIST[Math.min(index, TESTIMONIALS_LIST.length - 1)];

  return (
    <section className="py-24 sm:py-32">
      <div className="container max-w-4xl text-center">
        <p className="eyebrow">Guest Voices</p>
        <svg width="44" height="34" viewBox="0 0 44 34" className="mx-auto mt-8 text-gold-light" fill="currentColor" aria-hidden>
          <path d="M0 34V20.4C0 8.9 6.1 2.1 18.3 0l1.9 3.7C13.3 5.6 9.9 9.4 9.6 15.3H18V34H0zm25.8 0V20.4C25.8 8.9 31.9 2.1 44 0l1.9 3.7c-6.9 1.9-10.3 5.7-10.6 11.6h8.4V34H25.8z" />
        </svg>
        <blockquote key={index} className="mt-8 min-h-[190px] animate-fade-up sm:min-h-[160px]">
          <p className="font-serif text-2xl leading-snug text-espresso sm:text-[34px]">{t.quote}</p>
          <footer className="mt-8">
            <p className="text-sm font-medium uppercase tracking-wider2">{t.name}</p>
            <p className="mt-1 text-xs text-espresso-50">{[t.location, t.stay ? `Stayed in ${t.stay}` : ""].filter(Boolean).join(" · ")}</p>
            {t.rating ? <Stars rating={t.rating} className="mt-3" /> : null}
          </footer>
        </blockquote>
        <div className="mt-10 flex justify-center gap-3">
          {TESTIMONIALS_LIST.map((item, i) => (
            <button key={`${item.name}-${i}`} onClick={() => setIndex(i)} aria-label={`Show testimonial ${i + 1}`} className="py-2">
              <span className={`block h-1.5 w-1.5 rounded-full transition-all duration-500 ${i === index ? "scale-150 bg-gold" : "bg-espresso/25"}`} />
            </button>
          ))}
        </div>
        <Link href="/reviews" className="link-underline mt-8 inline-block text-[11px] uppercase tracking-luxe text-gold-dark">Read all reviews · Write yours</Link>
      </div>
    </section>
  );
}
