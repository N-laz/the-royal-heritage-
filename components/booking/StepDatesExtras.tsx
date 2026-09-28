"use client";

import { addDaysISO } from "@/lib/dates";
import { formatINR } from "@/lib/format";
import type { ExtraOption, RoomSummary } from "@/types";
import type { StayState } from "@/components/rooms/BookingPanel";

export default function StepDatesExtras({
  room,
  today,
  stay,
  setStay,
  extras,
  selected,
  toggleExtra,
  promoInput,
  setPromoInput,
  appliedPromo,
  applyPromo,
  removePromo,
  promoMessage,
}: {
  room: RoomSummary;
  today: string;
  stay: StayState;
  setStay: (s: StayState) => void;
  extras: ExtraOption[];
  selected: string[];
  toggleExtra: (code: string) => void;
  promoInput: string;
  setPromoInput: (v: string) => void;
  appliedPromo: string | null;
  applyPromo: () => void;
  removePromo: () => void;
  promoMessage: { type: "error" | "success"; text: string } | null;
}) {
  const update = <K extends keyof StayState>(key: K, value: StayState[K]) => {
    const next = { ...stay, [key]: value };
    if (key === "checkIn" && next.checkOut <= next.checkIn) next.checkOut = addDaysISO(next.checkIn, 1);
    setStay(next);
  };

  const visibleExtras = extras.filter((e) => !(room.breakfastIncluded && e.code === "breakfast"));

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl">Your stay</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="field-label">Check-in</span>
            <input type="date" min={today} value={stay.checkIn} onChange={(e) => update("checkIn", e.target.value)} className="field" />
          </label>
          <label>
            <span className="field-label">Check-out</span>
            <input type="date" min={addDaysISO(stay.checkIn || today, 1)} value={stay.checkOut} onChange={(e) => update("checkOut", e.target.value)} className="field" />
          </label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <label>
            <span className="field-label">Rooms</span>
            <select value={stay.rooms} onChange={(e) => update("rooms", Number(e.target.value))} className="field">
              {Array.from({ length: Math.min(5, room.inventory) }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Adults</span>
            <select value={stay.adults} onChange={(e) => update("adults", Number(e.target.value))} className="field">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Children</span>
            <select value={stay.children} onChange={(e) => update("children", Number(e.target.value))} className="field">
              {Array.from({ length: 7 }, (_, i) => i).map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-espresso-50">
          {room.name} accommodates up to {room.maxAdults} adults and {room.maxGuests} guests per room. Fri & Sat nights +12%, festive season (20 Dec – 5 Jan) +25%.
        </p>
      </section>

      <section>
        <h2 className="text-3xl">Enhance your stay</h2>
        {room.breakfastIncluded && <p className="mt-2 text-sm text-gold-dark">Breakfast is already included with this room.</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {visibleExtras.map((extra) => {
            const on = selected.includes(extra.code);
            return (
              <button
                type="button"
                key={extra.code}
                onClick={() => toggleExtra(extra.code)}
                className={`flex h-full flex-col border p-5 text-left transition-all duration-300 ${on ? "border-gold bg-gold-pale/30 shadow-gold" : "border-ivory-400 bg-ivory-50 hover:border-gold"}`}
                aria-pressed={on}
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <p className="font-serif text-xl">{extra.name}</p>
                  <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border text-xs ${on ? "border-gold bg-gold text-ivory" : "border-ivory-500"}`}>{on ? "✓" : ""}</span>
                </div>
                <p className="mt-2 text-sm text-espresso-50">{extra.description}</p>
                <p className="mt-auto pt-4 text-sm font-medium text-gold-dark">
                  {formatINR(extra.price)} {extra.perGuestPerNight ? "per guest / night" : "per stay"}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-3xl">Promo code</h2>
        {appliedPromo ? (
          <div className="mt-5 flex items-center justify-between border border-dashed border-gold bg-gold-pale/30 px-5 py-4">
            <p className="text-sm"><strong className="tracking-wider2 text-gold-dark">{appliedPromo}</strong> applied</p>
            <button type="button" onClick={removePromo} className="text-[11px] uppercase tracking-wider2 text-espresso-50 hover:text-red-700">Remove</button>
          </div>
        ) : (
          <div className="mt-5 flex gap-3">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyPromo();
                }
              }}
              placeholder="e.g. ROYAL10"
              className="field uppercase tracking-wider2"
              aria-label="Promo code"
            />
            <button type="button" onClick={applyPromo} className="btn-outline shrink-0">Apply</button>
          </div>
        )}
        {promoMessage && (
          <p className={`mt-3 text-sm ${promoMessage.type === "error" ? "text-red-700" : "text-gold-dark"}`}>{promoMessage.text}</p>
        )}
      </section>
    </div>
  );
}
