import Link from "next/link";
import ZoomImage from "@/components/ui/ZoomImage";
import { formatINR } from "@/lib/format";
import type { AvailabilityResult, RoomSummary } from "@/types";

export default function RoomCard({
  room,
  query = "",
  availability,
  nights,
  layout = "grid",
}: {
  room: RoomSummary;
  query?: string;
  availability?: AvailabilityResult;
  nights?: number;
  layout?: "grid" | "carousel" | "list";
}) {
  const suffix = query ? `?${query}` : "";
  const soldOut = availability ? !availability.canBook : false;

  if (layout === "list") {
    return (
      <article className="group grid overflow-hidden border border-ivory-400 bg-ivory-50 transition-shadow duration-700 hover:shadow-luxe md:grid-cols-[1.1fr_1fr]">
        <Link href={`/stay/${room.slug}${suffix}`} className="relative block">
          <ZoomImage src={room.images[0]} alt={room.name} className="aspect-[4/3] h-full w-full md:aspect-auto md:min-h-[360px]" sizes="(max-width:768px) 100vw, 50vw" />
          <span className="absolute left-5 top-5 bg-ivory-50/90 px-3 py-1.5 text-[10px] uppercase tracking-luxe text-espresso">{room.category}</span>
          {room.breakfastIncluded && (
            <span className="absolute right-5 top-5 bg-gold px-3 py-1.5 text-[10px] uppercase tracking-luxe text-ivory">Breakfast included</span>
          )}
        </Link>
        <div className="flex flex-col p-7 sm:p-10">
          <p className="eyebrow">{room.view}</p>
          <h3 className="mt-3 text-3xl sm:text-4xl">
            <Link href={`/stay/${room.slug}${suffix}`} className="transition-colors hover:text-gold">{room.name}</Link>
          </h3>
          <p className="mt-3 font-serif text-lg italic text-espresso-50">{room.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider2 text-espresso-50">
            <span>{room.size.toLocaleString("en-IN")} sq ft</span>
            <span>{room.bed}</span>
            <span>Up to {room.maxGuests} guests</span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((a) => (
              <li key={a} className="border border-ivory-400 px-3 py-1 text-xs text-espresso-100">{a}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-8">
            <div>
              {availability ? (
                soldOut ? (
                  <p className="text-sm text-red-700">{availability.occupancyError ?? "Not available for your dates"}</p>
                ) : (
                  <>
                    <p className="text-[11px] uppercase tracking-wider2 text-espresso-50">
                      {nights} night{nights === 1 ? "" : "s"} · {availability.available} left
                    </p>
                    <p className="mt-1 font-serif text-3xl text-espresso">{formatINR(availability.stayTotal)}</p>
                    <p className="text-xs text-espresso-50">avg. {formatINR(availability.avgNightly)} / night + GST</p>
                  </>
                )
              ) : (
                <>
                  <p className="text-[11px] uppercase tracking-wider2 text-espresso-50">From</p>
                  <p className="mt-1 font-serif text-3xl text-espresso">{formatINR(room.baseRate)}</p>
                  <p className="text-xs text-espresso-50">per night + GST</p>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <Link href={`/stay/${room.slug}${suffix}`} className="btn-outline !px-5">Details</Link>
              {soldOut ? (
                <span className="btn-primary pointer-events-none !px-5 opacity-40">Sold Out</span>
              ) : (
                <Link href={`/book/${room.slug}${suffix}`} className="btn-primary !px-5">Book</Link>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`group flex h-full flex-col bg-ivory-50 ${layout === "carousel" ? "" : "border border-ivory-400"}`}>
      <Link href={`/stay/${room.slug}${suffix}`} className="relative block">
        <ZoomImage src={room.images?.[0] || "/img/room-ocean.webp"} alt={room.name} className="aspect-[4/5] w-full" sizes="(max-width:768px) 85vw, 33vw" />
        <span className="absolute left-5 top-5 bg-ivory-50/90 px-3 py-1.5 text-[11px] uppercase tracking-luxe text-espresso">{room.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow">{room.view} · {room.size.toLocaleString("en-IN")} sq ft</p>
        <h3 className="mt-3 text-2xl sm:text-[28px] leading-tight">
          <Link href={`/stay/${room.slug}${suffix}`} className="transition-colors hover:text-gold">{room.name}</Link>
        </h3>
        <p className="mt-2 text-sm text-espresso-50">{room.tagline}</p>
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="text-[11px] uppercase tracking-wider2 text-espresso-50">From</p>
            <p className="font-serif text-2xl">{formatINR(room.baseRate)}<span className="text-sm text-espresso-50"> / night</span></p>
          </div>
          <Link href={`/stay/${room.slug}${suffix}`} className="link-underline inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-luxe text-gold">Discover</Link>
        </div>
      </div>
    </article>
  );
}
