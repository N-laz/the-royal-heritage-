"use client";

import Link from "next/link";
import PriceSummary from "@/components/booking/PriceSummary";
import { useQuote } from "@/components/booking/useQuote";
import { addDaysISO } from "@/lib/dates";
import { formatINR } from "@/lib/format";
import type { RoomSummary } from "@/types";

export type StayState = { checkIn: string; checkOut: string; rooms: number; adults: number; children: number };

export default function BookingPanel({
  room,
  today,
  stay,
  setStay,
  promo,
}: {
  room: RoomSummary;
  today: string;
  stay: StayState;
  setStay: (s: StayState) => void;
  promo: string | null;
}) {
  const { quote, error, loading } = useQuote({ slug: room.slug, ...stay, extras: [], promoCode: promo });

  const update = <K extends keyof StayState>(key: K, value: StayState[K]) => {
    const next = { ...stay, [key]: value };
    if (key === "checkIn" && next.checkOut && next.checkOut <= next.checkIn) next.checkOut = addDaysISO(next.checkIn, 1);
    setStay(next);
  };

  const qs = new URLSearchParams({
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    rooms: String(stay.rooms),
    adults: String(stay.adults),
    children: String(stay.children),
    ...(promo ? { promo } : {}),
  }).toString();

  const blocked = !quote || quote.soldOut || !!quote.occupancyError;

  return (
    <div className="border border-ivory-400 bg-ivory-50 shadow-soft">
      <div className="border-b border-ivory-400 bg-espresso px-6 py-5 text-ivory">
        <p className="text-[10px] uppercase tracking-luxe text-gold-light">From</p>
        <p className="font-serif text-3xl">{formatINR(room.baseRate)} <span className="text-sm text-ivory/60">/ night + GST</span></p>
      </div>
      <div className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="field-label">Check-in</span>
            <input type="date" min={today} value={stay.checkIn} onChange={(e) => update("checkIn", e.target.value)} className="field !px-3" />
          </label>
          <label>
            <span className="field-label">Check-out</span>
            <input type="date" min={addDaysISO(stay.checkIn || today, 1)} value={stay.checkOut} onChange={(e) => update("checkOut", e.target.value)} className="field !px-3" />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label>
            <span className="field-label">Rooms</span>
            <select value={stay.rooms} onChange={(e) => update("rooms", Number(e.target.value))} className="field !px-3">
              {Array.from({ length: Math.min(5, room.inventory) }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Adults</span>
            <select value={stay.adults} onChange={(e) => update("adults", Number(e.target.value))} className="field !px-3">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Children</span>
            <select value={stay.children} onChange={(e) => update("children", Number(e.target.value))} className="field !px-3">
              {Array.from({ length: 7 }, (_, i) => i).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <p className="text-xs text-espresso-50">Up to {room.maxAdults} adults and {room.maxGuests} guests per room.</p>

        <div className={`min-h-[120px] border-t border-ivory-400 pt-5 transition-opacity ${loading ? "opacity-50" : ""}`}>
          {!stay.checkOut ? (
            <p className="text-sm text-espresso-50">Select your check-out date to see the price.</p>
          ) : error ? (
            <p className="text-sm text-red-700">{error}</p>
          ) : quote ? (
            <>
              {quote.occupancyError && <p className="mb-4 text-sm text-red-700">{quote.occupancyError}</p>}
              {quote.soldOut && (
                <p className="mb-4 text-sm text-red-700">
                  {quote.available > 0 ? `Only ${quote.available} available for these dates.` : "Sold out for these dates."}
                </p>
              )}
              {quote.promoError && <p className="mb-4 text-xs text-espresso-50">{quote.promoError}</p>}
              {!quote.soldOut && !quote.occupancyError && (
                <p className="mb-4 text-xs uppercase tracking-wider2 text-gold">✓ Available · {quote.available} left</p>
              )}
              <PriceSummary breakdown={quote.breakdown} />
            </>
          ) : (
            <p className="text-sm text-espresso-50">Calculating…</p>
          )}
        </div>

        {blocked ? (
          <span className="btn-primary pointer-events-none w-full opacity-40">Reserve</span>
        ) : (
          <Link href={`/book/${room.slug}?${qs}`} className="btn-primary w-full">Reserve</Link>
        )}
        <p className="text-center text-[11px] text-espresso-50">You won&apos;t be charged yet</p>
      </div>
    </div>
  );
}
