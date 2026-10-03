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

  return (
    <section className="relative min-h-[640px] sm:min-h-[680px] md:h-[100svh] md:min-h-[720px] overflow-hidden bg-espresso">
      {HERO_SLIDES.map((slide, i) => (
        <div key={slide.image} className={`absolute inset-0 transition-opacity duration-1500 ease-luxe ${i === index ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== index}>
          <Image src={slide.image} alt="" fill priority={i === 0} sizes="100vw" className={`object-cover ${i === index ? "animate-ken-burns" : ""}`} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-600/60 via-espresso-600/20 to-espresso-600/85" />

      <div className="container px-4 sm:px-6 relative flex h-full flex-col justify-end pb-8 sm:pb-10 md:pb-14 pt-24 sm:pt-28 md:pt-36">
        <div key={index} className="max-w-4xl text-ivory">
          <p className="eyebrow animate-fade-up text-gold-light">{HERO_SLIDES[index].eyebrow}</p>
          <h1 className="mt-4 sm:mt-5 animate-fade-up text-2xl sm:text-4xl md:text-display-xl [animation-delay:120ms]">{HERO_SLIDES[index].title}</h1>
          <p className="mt-3 sm:mt-6 max-w-xl animate-fade-up text-sm sm:text-base text-ivory/80 [animation-delay:240ms] md:text-lg">{HERO_SLIDES[index].subtitle}</p>
        </div>

        <div className="mt-5 sm:mt-8 md:mt-10 flex items-center gap-3">
          {HERO_SLIDES.map((s, i) => (
            <button key={s.image} onClick={() => setIndex(i)} aria-label={`Show slide ${i + 1}`} className="group py-3 min-h-[44px] flex items-center">
              <span className={`block h-px transition-all duration-700 ${i === index ? "w-14 bg-gold-light" : "w-7 bg-ivory/40 group-hover:bg-ivory"}`} />
            </button>
          ))}
          <span className="ml-3 font-serif text-sm text-ivory/60">
            {String(index + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {children && <div className="mt-5 sm:mt-8 animate-fade-up [animation-delay:400ms]">{children}</div>}
      </div>
    </section>
  );
}
