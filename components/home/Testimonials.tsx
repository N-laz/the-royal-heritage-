"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Stars from "@/components/reviews/Stars";
import { TESTIMONIALS } from "@/lib/constants";

export type TestimonialItem = {
  quote: string;
  name: string;
  location: string;
  stay: string;
  rating?: number;
};

export default function Testimonials({ items }: { items?: TestimonialItem[] }) {
  const TESTIMONIALS_LIST: TestimonialItem[] = items && items.length > 0 ? items : TESTIMONIALS;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (TESTIMONIALS_LIST.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS_LIST.length), 8000);
    return () => clearInterval(id);
  }, [index, TESTIMONIALS_LIST.length]);

  if (TESTIMONIALS_LIST.length === 0) return null;

  const t = TESTIMONIALS_LIST[Math.min(index, TESTIMONIALS_LIST.length - 1)];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sea-night via-espresso-600/95 to-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      {/* Subtle Architectural Frame & Watermark */}
      <div className="pointer-events-none absolute inset-x-8 top-12 hidden h-px bg-gold/15 lg:block xl:inset-x-20" />
      <div className="pointer-events-none absolute inset-x-8 bottom-12 hidden h-px bg-gold/15 lg:block xl:inset-x-20" />

      <div className="container relative z-10 max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-2 flex items-center justify-center gap-3">
          <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter VI</span>
          <span className="h-px w-8 bg-gold-light/60" />
          <p className="eyebrow tracking-luxe text-gold-light">Guest Voices</p>
        </div>

        {/* Elegant Royal Quote Icon */}
        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-espresso-600/80 shadow-soft sm:mt-8">
          <svg
            width="28"
            height="22"
            viewBox="0 0 44 34"
            className="text-gold-light"
            fill="currentColor"
            aria-hidden
          >
            <path d="M0 34V20.4C0 8.9 6.1 2.1 18.3 0l1.9 3.7C13.3 5.6 9.9 9.4 9.6 15.3H18V34H0zm25.8 0V20.4C25.8 8.9 31.9 2.1 44 0l1.9 3.7c-6.9 1.9-10.3 5.7-10.6 11.6h8.4V34H25.8z" />
          </svg>
        </div>

        {/* Editorial Pull-Quote */}
        <blockquote key={index} className="mt-8 min-h-[190px] animate-fade-up sm:mt-10 sm:min-h-[170px]">
          <p className="mx-auto max-w-3xl font-serif text-2xl font-light italic leading-[1.3] text-ivory sm:text-3xl md:text-[36px]">
            &ldquo;{t.quote}&rdquo;
          </p>

          <footer className="mt-8 sm:mt-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-wider2 text-ivory sm:text-sm">
              {t.name}
            </p>
            <p className="mt-1 text-xs text-ivory/60">
              {[t.location, t.stay ? `Stayed in ${t.stay}` : ""].filter(Boolean).join(" · ")}
            </p>
            {t.rating ? (
              <div className="mt-3 flex justify-center">
                <Stars rating={t.rating} />
              </div>
            ) : null}
          </footer>
        </blockquote>

        {/* Restrained Navigation Station */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length)}
            aria-label="Previous review"
            className="flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/70 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {TESTIMONIALS_LIST.map((item, i) => (
              <button
                key={`${item.name}-${i}`}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="flex h-11 w-8 min-h-[44px] items-center justify-center p-1"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-700 ${
                    i === index ? "w-6 bg-gold-light" : "w-1.5 bg-ivory/20 hover:bg-ivory/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS_LIST.length)}
            aria-label="Next review"
            className="flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/70 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        <div className="mt-8 sm:mt-10">
          <Link
            id="reviews-all-link"
            href="/reviews"
            className="link-underline inline-flex min-h-[44px] items-center text-xs normal-case tracking-luxe text-gold-light hover:text-ivory"
          >
            Read all reviews · Write yours
          </Link>
        </div>
      </div>
    </section>
  );
}
