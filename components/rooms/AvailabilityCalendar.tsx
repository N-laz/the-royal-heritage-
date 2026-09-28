"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalendarDay } from "@/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function shortRate(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n >= 1000000 ? 0 : 1)}L`;
  return `₹${Math.round(n / 1000)}k`;
}

export default function AvailabilityCalendar({
  slug,
  unitsNeeded,
  checkIn,
  checkOut,
  onChange,
}: {
  slug: string;
  unitsNeeded: number;
  checkIn: string;
  checkOut: string;
  onChange: (range: { checkIn: string; checkOut: string }) => void;
}) {
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/rooms/${slug}/calendar?days=35`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setDays(data.days ?? []);
      })
      .catch(() => !cancelled && setMessage("Could not load availability."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const leading = useMemo(() => (days[0] ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0), [days]);
  const byDate = useMemo(() => new Map(days.map((d) => [d.date, d])), [days]);

  function isSoldOut(day: CalendarDay) {
    return day.available < unitsNeeded;
  }

  function select(day: CalendarDay) {
    setMessage("");
    if (!checkIn || (checkIn && checkOut)) {
      if (isSoldOut(day)) return setMessage("That night is sold out. Please choose another check-in date.");
      return onChange({ checkIn: day.date, checkOut: "" });
    }
    if (day.date <= checkIn) {
      if (isSoldOut(day)) return setMessage("That night is sold out.");
      return onChange({ checkIn: day.date, checkOut: "" });
    }
    const blocked = days.some((d) => d.date >= checkIn && d.date < day.date && isSoldOut(d));
    if (blocked) return setMessage("Some nights in that range are sold out. Please choose a shorter stay or other dates.");
    onChange({ checkIn, checkOut: day.date });
  }

  function monthLabel(iso: string) {
    return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
  }

  const first = days[0]?.date;
  const last = days[days.length - 1]?.date;

  return (
    <div className="border border-ivory-400 bg-ivory-50 p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Availability · Next 35 nights</p>
          <p className="mt-1 font-serif text-2xl">
            {first && last ? (monthLabel(first) === monthLabel(last) ? monthLabel(first) : `${monthLabel(first)} – ${monthLabel(last)}`) : "Loading…"}
          </p>
        </div>
        <p className="text-xs text-espresso-50">
          {!checkIn || checkOut ? "Select your check-in date" : "Now select your check-out date"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider2 text-espresso-50">
        {WEEKDAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
      </div>

      <div className={`grid grid-cols-7 gap-1 ${loading ? "animate-pulse" : ""}`}>
        {loading
          ? Array.from({ length: 35 }).map((_, i) => <div key={i} className="aspect-square bg-ivory-300/60" />)
          : (
            <>
              {Array.from({ length: leading }).map((_, i) => <div key={`blank-${i}`} />)}
              {days.map((day) => {
                const soldOut = isSoldOut(day);
                const isStart = day.date === checkIn;
                const isEnd = day.date === checkOut;
                const inRange = checkIn && checkOut && day.date > checkIn && day.date < checkOut;
                const dateNum = Number(day.date.slice(8));
                return (
                  <button
                    key={day.date}
                    onClick={() => select(day)}
                    title={soldOut ? "Sold out" : `${day.available} available`}
                    className={`relative flex aspect-square flex-col items-center justify-center border text-center transition-colors ${
                      isStart || isEnd
                        ? "border-espresso bg-espresso text-ivory"
                        : inRange
                          ? "border-gold-pale bg-gold-pale/50"
                          : soldOut
                            ? "cursor-not-allowed border-transparent bg-ivory-300/40 text-espresso-50/50 line-through"
                            : "border-ivory-400 hover:border-gold"
                    }`}
                  >
                    <span className="font-serif text-base leading-none sm:text-lg">{dateNum}</span>
                    <span className={`mt-1 hidden text-[9px] sm:block ${isStart || isEnd ? "text-gold-light" : day.festive ? "text-gold-dark" : "text-espresso-50"}`}>
                      {soldOut ? "Full" : shortRate(day.rate)}
                    </span>
                    {day.festive && !soldOut && <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-gold" />}
                  </button>
                );
              })}
              {!byDate.size && <p className="col-span-7 py-6 text-sm text-espresso-50">No calendar data.</p>}
            </>
          )}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-espresso-50">
        <span className="flex items-center gap-2"><span className="h-3 w-3 border border-ivory-400" /> Available</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 bg-espresso" /> Selected</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 bg-ivory-300" /> Sold out</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> Festive season (+25%)</span>
        <span>Fri & Sat nights +12%</span>
      </div>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
    </div>
  );
}
