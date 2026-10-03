"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { addDaysISO } from "@/lib/dates";

export type SearchValues = {
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
};

export default function BookingSearchBar({
  today,
  initial,
  variant = "hero",
  onSearch,
}: {
  today: string;
  initial: SearchValues;
  variant?: "hero" | "inline";
  onSearch?: (values: SearchValues) => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState<SearchValues>(initial);
  const [error, setError] = useState("");

  function update<K extends keyof SearchValues>(key: K, value: SearchValues[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "checkIn" && next.checkOut <= next.checkIn) next.checkOut = addDaysISO(next.checkIn, 1);
      return next;
    });
    setError("");
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!values.checkIn || !values.checkOut) return setError("Please choose your dates.");
    if (values.checkIn < today) return setError("Check-in cannot be in the past.");
    if (values.checkOut <= values.checkIn) return setError("Check-out must be after check-in.");
    if (onSearch) return onSearch(values);
    const qs = new URLSearchParams({
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      rooms: String(values.rooms),
      adults: String(values.adults),
      children: String(values.children),
    });
    router.push(`/stay?${qs.toString()}#rooms`);
  }

  const hero = variant === "hero";
  const labelCls = `mb-1.5 block text-[11px] font-medium uppercase tracking-wider2 ${hero ? "text-gold-light" : "text-gold"}`;
  const inputCls = `w-full min-w-0 bg-transparent font-serif text-base sm:text-lg focus:outline-none min-h-[38px] sm:min-h-[42px] ${hero ? "text-ivory [color-scheme:dark]" : "text-espresso"}`;
  const cell = `px-3 py-3 sm:px-5 sm:py-4 ${hero ? "border-ivory/15" : "border-ivory-400"}`;

  return (
    <form
      onSubmit={submit}
      className={`w-full ${hero ? "border border-ivory/20 bg-espresso-600/55 backdrop-blur-md" : "border border-ivory-400 bg-ivory-50 shadow-soft"}`}
    >
      <div className="grid grid-cols-6 md:grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_0.8fr_auto]">
        <label className={`${cell} col-span-3 md:col-span-1 border-b border-r md:border-b-0`}>
          <span className={labelCls}>Check-in</span>
          <input id="search-check-in" type="date" min={today} value={values.checkIn} onChange={(e) => update("checkIn", e.target.value)} className={inputCls} required />
        </label>
        <label className={`${cell} col-span-3 md:col-span-1 border-b md:border-b-0 md:border-r`}>
          <span className={labelCls}>Check-out</span>
          <input id="search-check-out" type="date" min={addDaysISO(values.checkIn || today, 1)} value={values.checkOut} onChange={(e) => update("checkOut", e.target.value)} className={inputCls} required />
        </label>
        <label className={`${cell} col-span-2 md:col-span-1 border-b border-r md:border-b-0`}>
          <span className={labelCls}>Rooms</span>
          <select id="search-rooms" value={values.rooms} onChange={(e) => update("rooms", Number(e.target.value))} className={`${inputCls} cursor-pointer`}>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n} className="text-espresso">{n}</option>)}
          </select>
        </label>
        <label className={`${cell} col-span-2 md:col-span-1 border-b border-r md:border-b-0`}>
          <span className={labelCls}>Adults</span>
          <select id="search-adults" value={values.adults} onChange={(e) => update("adults", Number(e.target.value))} className={`${inputCls} cursor-pointer`}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n} className="text-espresso">{n}</option>)}
          </select>
        </label>
        <label className={`${cell} col-span-2 md:col-span-1 border-b md:border-b-0 md:border-r`}>
          <span className={labelCls}>Children</span>
          <select id="search-children" value={values.children} onChange={(e) => update("children", Number(e.target.value))} className={`${inputCls} cursor-pointer`}>
            {Array.from({ length: 7 }, (_, i) => i).map((n) => <option key={n} value={n} className="text-espresso">{n}</option>)}
          </select>
        </label>
        <button id="search-submit-btn" type="submit" className={`${hero ? "bg-gold hover:bg-gold-light hover:text-espresso" : "bg-espresso hover:bg-gold"} col-span-6 md:col-span-1 min-h-[46px] px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] font-medium uppercase tracking-luxe text-ivory transition-colors duration-500`}>
          Check Availability
        </button>
      </div>
      {error && <p className={`px-4 sm:px-5 py-2 text-xs ${hero ? "text-red-200" : "text-red-700"}`}>{error}</p>}
    </form>
  );
}
