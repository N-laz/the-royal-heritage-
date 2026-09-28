"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingSearchBar, { type SearchValues } from "@/components/home/BookingSearchBar";
import RoomCard from "@/components/rooms/RoomCard";
import RoomFilters, { DEFAULT_FILTERS, RATE_CEILING, type Filters } from "@/components/rooms/RoomFilters";
import { formatDate } from "@/lib/format";
import type { AvailabilityResponse, RoomSummary } from "@/types";

export default function StayListing({
  rooms,
  today,
  initialSearch,
  hasInitialDates,
  promo,
}: {
  rooms: RoomSummary[];
  today: string;
  initialSearch: SearchValues;
  hasInitialDates: boolean;
  promo: string | null;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState<SearchValues | null>(hasInitialDates ? initialSearch : null);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const views = useMemo(() => Array.from(new Set(rooms.map((r) => r.view))), [rooms]);

  const load = useCallback(async (values: SearchValues) => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        rooms: String(values.rooms),
        adults: String(values.adults),
        children: String(values.children),
      });
      const res = await fetch(`/api/availability?${qs.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not check availability.");
      setAvailability(data as AvailabilityResponse);
    } catch (e) {
      setAvailability(null);
      setError(e instanceof Error ? e.message : "Could not check availability.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (search) void load(search);
  }, [search, load]);

  function onSearch(values: SearchValues) {
    setSearch(values);
    const qs = new URLSearchParams({
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      rooms: String(values.rooms),
      adults: String(values.adults),
      children: String(values.children),
      ...(promo ? { promo } : {}),
    });
    router.replace(`/stay?${qs.toString()}`, { scroll: false });
  }

  const query = useMemo(() => {
    const qs = new URLSearchParams();
    if (search) {
      qs.set("checkIn", search.checkIn);
      qs.set("checkOut", search.checkOut);
      qs.set("rooms", String(search.rooms));
      qs.set("adults", String(search.adults));
      qs.set("children", String(search.children));
    }
    if (promo) qs.set("promo", promo);
    return qs.toString();
  }, [search, promo]);

  const availMap = useMemo(() => new Map((availability?.rooms ?? []).map((a) => [a.slug, a])), [availability]);

  const visible = useMemo(() => {
    const list = rooms.filter((r) => {
      if (filters.category !== "All" && r.category !== filters.category) return false;
      if (filters.maxRate < RATE_CEILING && r.baseRate > filters.maxRate) return false;
      if (filters.view !== "All" && r.view !== filters.view) return false;
      if (filters.breakfast && !r.breakfastIncluded) return false;
      if (filters.amenities.length && !filters.amenities.every((a) => r.amenities.includes(a))) return false;
      if (filters.availableOnly && availability && !availMap.get(r.slug)?.canBook) return false;
      return true;
    });
    const price = (r: RoomSummary) => availMap.get(r.slug)?.stayTotal ?? r.baseRate;
    if (filters.sort === "price-asc") list.sort((a, b) => price(a) - price(b));
    if (filters.sort === "price-desc") list.sort((a, b) => price(b) - price(a));
    if (filters.sort === "size-desc") list.sort((a, b) => b.size - a.size);
    return list;
  }, [rooms, filters, availability, availMap]);

  return (
    <>
      <div className="relative z-10 -mt-12">
        <div className="container">
          <BookingSearchBar variant="inline" today={today} initial={initialSearch} onSearch={onSearch} />
        </div>
      </div>

      <section id="rooms" className="container scroll-mt-32 py-16">
        {promo && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-dashed border-gold bg-gold-pale/30 px-6 py-4 text-sm">
            <span>
              Promo code <strong className="tracking-wider2 text-gold-dark">{promo}</strong> will be applied at checkout (subject to its conditions).
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ivory-400 pb-6">
          <div>
            <p className="eyebrow">Accommodation</p>
            <h2 className="mt-2 text-display-sm">
              {visible.length} {visible.length === 1 ? "residence" : "residences"}
              {availability && (
                <span className="block text-base text-espresso-50 sm:inline sm:text-lg">
                  {" "}· {formatDate(availability.checkIn, "short")} – {formatDate(availability.checkOut, "short")}, {availability.nights} night{availability.nights === 1 ? "" : "s"}
                </span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters((v) => !v)} className="btn-outline !px-5 !py-3 lg:hidden">
              {showFilters ? "Hide filters" : "Filters"}
            </button>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value as Filters["sort"] })}
              className="field !w-auto !py-3"
              aria-label="Sort rooms"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="size-desc">Largest first</option>
            </select>
          </div>
        </div>

        {error && <p className="mt-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <RoomFilters
              filters={filters}
              onChange={setFilters}
              views={views}
              hasAvailability={!!availability}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>
          <div className={`space-y-8 transition-opacity ${loading ? "opacity-50" : ""}`}>
            {visible.length === 0 ? (
              <div className="border border-ivory-400 bg-ivory-50 p-12 text-center">
                <p className="font-serif text-3xl">No residences match these filters</p>
                <p className="mt-3 text-sm text-espresso-50">Try widening your filters or choosing different dates.</p>
                <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-primary mt-8">Clear filters</button>
              </div>
            ) : (
              visible.map((room) => (
                <RoomCard key={room.id} room={room} layout="list" query={query} availability={availMap.get(room.slug)} nights={availability?.nights} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
