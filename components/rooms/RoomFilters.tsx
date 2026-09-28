"use client";

import { FILTER_AMENITIES } from "@/lib/constants";
import { formatINR } from "@/lib/format";

export type Filters = {
  category: string;
  maxRate: number;
  view: string;
  amenities: string[];
  breakfast: boolean;
  availableOnly: boolean;
  sort: "recommended" | "price-asc" | "price-desc" | "size-desc";
};

export const RATE_CEILING = 500000;

export const DEFAULT_FILTERS: Filters = {
  category: "All",
  maxRate: RATE_CEILING,
  view: "All",
  amenities: [],
  breakfast: false,
  availableOnly: false,
  sort: "recommended",
};

export default function RoomFilters({
  filters,
  onChange,
  views,
  hasAvailability,
  onReset,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  views: string[];
  hasAvailability: boolean;
  onReset: () => void;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value });

  const toggleAmenity = (a: string) =>
    set("amenities", filters.amenities.includes(a) ? filters.amenities.filter((x) => x !== a) : [...filters.amenities, a]);

  return (
    <aside className="space-y-8 border border-ivory-400 bg-ivory-50 p-6 lg:sticky lg:top-28">
      <div className="flex items-center justify-between">
        <p className="font-serif text-2xl">Refine</p>
        <button onClick={onReset} className="text-[11px] uppercase tracking-wider2 text-gold hover:text-espresso">Clear all</button>
      </div>

      <div>
        <p className="field-label">Category</p>
        <div className="grid grid-cols-2 gap-2">
          {["All", "Rooms", "Suites", "Villas"].map((c) => (
            <button
              key={c}
              onClick={() => set("category", c)}
              className={`border px-3 py-2 text-xs uppercase tracking-wider2 transition-colors ${filters.category === c ? "border-espresso bg-espresso text-ivory" : "border-ivory-400 hover:border-gold"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <p className="field-label">Max nightly rate</p>
          <p className="text-xs text-gold">{filters.maxRate >= RATE_CEILING ? "Any" : formatINR(filters.maxRate)}</p>
        </div>
        <input
          type="range"
          min={40000}
          max={RATE_CEILING}
          step={5000}
          value={filters.maxRate}
          onChange={(e) => set("maxRate", Number(e.target.value))}
          className="w-full accent-[#A8834B]"
          aria-label="Maximum nightly rate"
        />
      </div>

      <div>
        <p className="field-label">View</p>
        <select value={filters.view} onChange={(e) => set("view", e.target.value)} className="field">
          <option value="All">All views</option>
          {views.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div>
        <p className="field-label">Amenities</p>
        <div className="space-y-2.5">
          {FILTER_AMENITIES.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={filters.amenities.includes(a)} onChange={() => toggleAmenity(a)} className="h-4 w-4 accent-[#A8834B]" />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-ivory-400 pt-6">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input type="checkbox" checked={filters.breakfast} onChange={(e) => set("breakfast", e.target.checked)} className="h-4 w-4 accent-[#A8834B]" />
          Breakfast included
        </label>
        <label className={`flex items-center gap-3 text-sm ${hasAvailability ? "cursor-pointer" : "opacity-50"}`}>
          <input type="checkbox" disabled={!hasAvailability} checked={filters.availableOnly} onChange={(e) => set("availableOnly", e.target.checked)} className="h-4 w-4 accent-[#A8834B]" />
          Available for my dates only
        </label>
        {!hasAvailability && <p className="text-xs text-espresso-50">Search dates to filter by availability.</p>}
      </div>
    </aside>
  );
}
