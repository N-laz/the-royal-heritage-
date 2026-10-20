"use client";

import { useRef } from "react";
import RoomCard from "@/components/rooms/RoomCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import type { RoomSummary } from "@/types";

export default function RoomCarousel({ rooms }: { rooms: RoomSummary[] }) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 24), behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sea-night via-espresso-600/90 to-sea-night py-20 text-ivory sm:py-28 lg:py-36">
      {/* Palatial Atmospheric Background Accents */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sandstone/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Editorial Collection Header */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-gold/20 pb-8 sm:pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-3">
              <span className="font-serif text-xs italic tracking-wider2 text-gold-light">Chapter II</span>
              <span className="h-px w-8 bg-gold-light/60" />
              <span className="text-[11px] font-medium uppercase tracking-luxe text-gold-light">
                Exclusive Collection
              </span>
            </div>
            <SectionHeading
              light
              align="left"
              eyebrow="Rooms, Suites & Villas"
              title="Sanctuaries of quiet splendour"
              description="Six distinct ways to stay — from sunlit sea-view rooms to The Crown Villa, a palace of your own."
            />
          </div>

          {/* Carousel Controls & Sanctuary Counter */}
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <span className="font-serif text-sm italic text-ivory/60 sm:hidden">
              Swipe to explore
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden font-serif text-xs uppercase tracking-wider2 text-ivory/60 sm:inline">
                {rooms.length} Sanctuaries
              </span>
              <button
                id="carousel-prev-btn"
                onClick={() => scroll(-1)}
                aria-label="Previous rooms"
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/60 text-ivory shadow-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-espresso sm:h-12 sm:w-12"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M10 3L5 8l5 5" />
                </svg>
              </button>
              <button
                id="carousel-next-btn"
                onClick={() => scroll(1)}
                aria-label="Next rooms"
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center border border-ivory/20 bg-sea-night/60 text-ivory shadow-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-espresso sm:h-12 sm:w-12"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with Snap & Shadow Framing */}
      <div
        ref={track}
        className="no-scrollbar container mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:mt-14 sm:px-6"
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            data-card
            className="w-[85vw] shrink-0 snap-start transition-transform duration-500 hover:-translate-y-1.5 sm:w-[420px]"
          >
            <div className="h-full border border-gold/20 bg-espresso-600/90 shadow-luxe backdrop-blur-sm transition-all duration-500 hover:border-gold/50">
              <RoomCard room={room} layout="carousel" dark />
            </div>
          </div>
        ))}
      </div>

      {/* Direct Booking Privilege Reassurance Strip & CTA */}
      <div className="container relative z-10 mt-12 px-4 sm:mt-16 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 border-t border-gold/20 pt-8 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="hidden h-2 w-2 rounded-full bg-gold-light sm:inline-block" />
            <p className="text-xs uppercase tracking-wider2 text-ivory/70">
              Direct reservations curated with dedicated royal concierge & arrival welcome ritual
            </p>
          </div>
          <ButtonLink id="view-all-accommodation" href="/stay" variant="light">
            View All Accommodation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
