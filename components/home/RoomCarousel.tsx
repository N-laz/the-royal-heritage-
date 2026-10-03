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
    <section className="overflow-hidden bg-ivory-300/60 py-16 sm:py-24 md:py-32">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Rooms, Suites & Villas"
            title="Sanctuaries of quiet splendour"
            description="Six distinct ways to stay — from sunlit sea-view rooms to The Crown Villa, a palace of your own."
          />
          <div className="flex self-end md:self-auto gap-3">
            <button id="carousel-prev-btn" onClick={() => scroll(-1)} aria-label="Previous rooms" className="flex h-11 w-11 min-h-[44px] min-w-[44px] sm:h-12 sm:w-12 items-center justify-center border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M10 3L5 8l5 5" /></svg>
            </button>
            <button id="carousel-next-btn" onClick={() => scroll(1)} aria-label="Next rooms" className="flex h-11 w-11 min-h-[44px] min-w-[44px] sm:h-12 sm:w-12 items-center justify-center border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M6 3l5 5-5 5" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div ref={track} className="no-scrollbar container px-4 sm:px-6 mt-10 sm:mt-14 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-4">
        {rooms.map((room) => (
          <div key={room.id} data-card className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
            <RoomCard room={room} layout="carousel" />
          </div>
        ))}
      </div>
      <div className="container px-4 sm:px-6 mt-10 sm:mt-12 text-center">
        <ButtonLink id="view-all-accommodation" href="/stay" variant="primary">View All Accommodation</ButtonLink>
      </div>
    </section>
  );
}
