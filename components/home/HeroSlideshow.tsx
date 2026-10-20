"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { HERO_SLIDES } from "@/lib/constants";

export default function HeroSlideshow({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [index]);

  const activeSlide = HERO_SLIDES[index];

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-sea-night sm:min-h-[780px] lg:h-[100svh] lg:min-h-[820px]">
      {/* Background Slides with Cinematic Crossfade & Ken Burns */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1500 ease-luxe ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-center transition-transform duration-1500 ${
              i === index ? "scale-105 animate-ken-burns" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Atmospheric Multi-stop Gradient & Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-sea-night via-espresso-600/50 to-sea-night/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,37,42,0.6)_100%)]" />

      {/* Architectural Fine Hairlines for Palatial Framing */}
      <div className="pointer-events-none absolute inset-x-6 top-24 hidden h-px bg-ivory/10 lg:block xl:inset-x-12" />
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-ivory/10 lg:block xl:left-12" />
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-ivory/10 lg:block xl:right-12" />

      {/* Main Content Container */}
      <div className="container relative z-10 flex h-full flex-col justify-between px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:pb-12 lg:pt-36">
        {/* Top Editorial Metadata Banner */}
        <div className="flex items-center justify-between text-xs uppercase tracking-luxe text-ivory/70">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_rgba(201,169,97,0.8)]" />
            <span className="font-sans font-medium text-ivory/80">Heritage Coastal Sanctuary</span>
            <span className="hidden text-ivory/40 sm:inline">|</span>
            <span className="hidden font-serif tracking-wide text-gold-light sm:inline">22.83° N, 69.35° E · Mandvi, Kutch</span>
          </div>
          <div className="font-serif text-sm tracking-wider2 text-gold-light/90">
            <span className="text-ivory">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-ivory/40">/</span>
            <span>{String(HERO_SLIDES.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Central / Lower Editorial Headline Composition */}
        <div className="my-auto py-8 lg:py-10">
          <div key={index} className="max-w-4xl">
            <div className="flex items-center gap-3 animate-fade-up">
              <span className="h-px w-8 bg-gold-light/80 sm:w-12" />
              <p className="eyebrow text-gold-light tracking-luxe">{activeSlide.eyebrow}</p>
            </div>

            <h1 className="mt-4 font-serif text-3xl leading-[1.08] tracking-tight text-ivory animate-fade-up [animation-delay:100ms] sm:text-5xl md:text-6xl lg:text-display-xl">
              {activeSlide.title}
            </h1>

            <p className="mt-4 max-w-2xl font-sans text-sm font-light leading-relaxed text-ivory/85 animate-fade-up [animation-delay:200ms] sm:mt-6 sm:text-base md:text-lg">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* Luxury Interactive Slide Progress Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                aria-label="Previous slide"
                className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/40 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-espresso"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M10 3L5 8l5 5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
                aria-label="Next slide"
                className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/40 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-espresso"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center gap-2.5 sm:max-w-md">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.image}
                  onClick={() => setIndex(i)}
                  aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                  className="group relative flex h-9 min-h-[44px] flex-1 items-center"
                >
                  <span className="relative h-1 w-full overflow-hidden bg-ivory/20 transition-colors group-hover:bg-ivory/40">
                    {i === index && (
                      <span
                        key={`bar-${index}`}
                        className="absolute inset-y-0 left-0 bg-gold-light animate-progress"
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Integrated Luxury Booking Pedestal */}
        {children && (
          <div className="relative mt-4 animate-fade-up [animation-delay:350ms]">
            <div className="relative border border-gold/30 bg-espresso-600/80 p-1 shadow-luxe backdrop-blur-md">
              {/* Subtle palatial corner accents */}
              <div className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-gold-light" />
              <div className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-gold-light" />
              <div className="pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold-light" />
              <div className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold-light" />
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
