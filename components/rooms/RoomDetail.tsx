"use client";

import { useState } from "react";
import AvailabilityCalendar from "@/components/rooms/AvailabilityCalendar";
import BookingPanel, { type StayState } from "@/components/rooms/BookingPanel";
import Reveal from "@/components/ui/Reveal";
import type { RoomSummary } from "@/types";

export default function RoomDetail({
  room,
  today,
  initial,
  promo,
}: {
  room: RoomSummary;
  today: string;
  initial: StayState;
  promo: string | null;
}) {
  const [stay, setStay] = useState<StayState>(initial);

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_400px]">
      <div className="space-y-16">
        <Reveal>
          <p className="eyebrow">{room.category}</p>
          <h2 className="mt-3 text-display-sm">{room.tagline}</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-espresso-50">{room.description}</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ivory-400 py-8 sm:grid-cols-4">
            {[
              ["Size", `${room.size.toLocaleString("en-IN")} sq ft`],
              ["View", room.view],
              ["Bed", room.bed],
              ["Occupancy", `${room.maxAdults} adults · ${room.maxGuests} guests`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-luxe text-gold">{k}</dt>
                <dd className="mt-2 font-serif text-xl">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <h3 className="text-3xl">Amenities</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 border-b border-ivory-400 py-2.5 text-sm">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="text-3xl">Included in your stay</h3>
          <ul className="mt-6 space-y-3">
            {room.breakfastIncluded && (
              <li className="flex gap-3 text-sm"><span className="text-gold">✦</span>Daily breakfast for all guests</li>
            )}
            {room.inclusions.map((i) => (
              <li key={i} className="flex gap-3 text-sm"><span className="text-gold">✦</span>{i}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="text-3xl">Cancellation policy</h3>
          <p className="mt-4 border-l-2 border-gold bg-ivory-50 px-5 py-4 text-sm leading-relaxed text-espresso-50">{room.cancellation}</p>
          <p className="mt-3 text-xs text-espresso-50">Check-in from 3:00 PM · Check-out by 12:00 PM</p>
        </Reveal>

        <div id="calendar" className="scroll-mt-32">
          <AvailabilityCalendar
            slug={room.slug}
            unitsNeeded={stay.rooms}
            checkIn={stay.checkIn}
            checkOut={stay.checkOut}
            onChange={(r) => setStay({ ...stay, ...r })}
          />
        </div>
      </div>

      <div>
        <div className="lg:sticky lg:top-28">
          <BookingPanel room={room} today={today} stay={stay} setStay={setStay} promo={promo} />
        </div>
      </div>
    </div>
  );
}
