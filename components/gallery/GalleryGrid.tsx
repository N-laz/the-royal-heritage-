"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { GALLERY_IMAGES } from "@/lib/constants";

const CATEGORIES = ["All", "Resort", "Rooms", "Dining", "Wellness", "Experiences"] as const;

export default function GalleryGrid() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const images = useMemo(() => (category === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((g) => g.category === category)), [category]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2.5 text-[11px] uppercase tracking-wider2 transition-colors ${category === c ? "bg-espresso text-ivory" : "border border-ivory-400 hover:border-gold"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            className={`group relative mb-4 block w-full overflow-hidden bg-ivory-300 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-1500 ease-luxe group-hover:scale-110" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-600/80 to-transparent p-4 text-left text-sm text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">{img.alt}</span>
          </button>
        ))}
      </div>

      {active !== null && images[active] && (
        <div className="fixed inset-0 z-[120] flex animate-fade-in items-center justify-center bg-espresso-600/95 p-4" role="dialog" aria-modal="true">
          <button onClick={() => setActive(null)} className="absolute right-6 top-6 text-[11px] uppercase tracking-luxe text-ivory/80 hover:text-gold-light">Close ✕</button>
          <button onClick={() => setActive((active - 1 + images.length) % images.length)} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-3xl text-ivory/70 hover:text-gold-light">‹</button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button onClick={() => setActive((active + 1) % images.length)} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-3xl text-ivory/70 hover:text-gold-light">›</button>
          <p className="absolute bottom-6 text-sm text-ivory/70">{images[active].alt}</p>
        </div>
      )}
    </>
  );
}
