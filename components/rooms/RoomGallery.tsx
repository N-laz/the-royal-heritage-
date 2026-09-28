"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function RoomGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback((dir: number) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, move]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3 sm:grid-rows-2">
        {images.slice(0, 3).map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden bg-ivory-300 ${i === 0 ? "aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-[4/3]"}`}
            aria-label={`Open image ${i + 1} of ${name}`}
          >
            <Image src={src} alt={`${name} — image ${i + 1}`} fill sizes={i === 0 ? "(max-width:640px) 100vw, 66vw" : "(max-width:640px) 100vw, 33vw"} className="object-cover transition-transform duration-1500 ease-luxe group-hover:scale-110" />
            <span className="absolute bottom-4 right-4 bg-espresso/70 px-3 py-1.5 text-[10px] uppercase tracking-luxe text-ivory opacity-0 transition-opacity group-hover:opacity-100">View</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[120] flex animate-fade-in items-center justify-center bg-espresso-600/95 p-4" role="dialog" aria-modal="true">
          <button onClick={close} className="absolute right-6 top-6 text-[11px] uppercase tracking-luxe text-ivory/80 hover:text-gold-light">Close ✕</button>
          <button onClick={() => move(-1)} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-3xl text-ivory/70 hover:text-gold-light">‹</button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image src={images[active]} alt={`${name} — image ${active + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <button onClick={() => move(1)} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-3xl text-ivory/70 hover:text-gold-light">›</button>
          <p className="absolute bottom-6 font-serif text-ivory/70">{active + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
