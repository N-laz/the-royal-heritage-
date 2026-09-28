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
    <section className="overflow-hidden bg-ivory-300/60 py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Rooms, Suites & Villas"
            title="Sanctuaries of quiet splendour"
            description="Six distinct ways to stay — from sunlit sea-view rooms to The Crown Villa, a palace of your own."
          />
          <div className="flex gap-3">
            <button onClick={() => scroll(-1)} aria-label="Previous rooms" className="flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M10 3L5 8l5 5" /></svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Next rooms" className="flex h-12 w-12 items-center justify-center border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M6 3l5 5-5 5" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div ref={track} className="no-scrollbar container mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {rooms.map((room) => (
          <div key={room.id} data-card className="w-[82vw] shrink-0 snap-start sm:w-[420px]">
            <RoomCard room={room} layout="carousel" />
          </div>
        ))}
      </div>
      <div className="container mt-12 text-center">
        <ButtonLink href="/stay" variant="primary">View All Accommodation</ButtonLink>
      </div>
    </section>
  );
}
