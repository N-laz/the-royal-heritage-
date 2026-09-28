import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import StayListing from "@/components/rooms/StayListing";
import { prisma } from "@/lib/prisma";
import { addDaysISO, isISODate, todayISO } from "@/lib/dates";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Stay — Rooms, Suites & Villas" };

type SP = Promise<Record<string, string | string[] | undefined>>;

function str(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function num(v: string | undefined, fallback: number, min: number, max: number) {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : fallback;
}

export default async function StayPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const rooms = await prisma.room.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } });
  const today = todayISO();

  const ci = str(sp.checkIn);
  const co = str(sp.checkOut);
  const hasInitialDates = !!(ci && co && isISODate(ci) && isISODate(co) && ci >= today && co > ci);
  const defaultIn = addDaysISO(today, 7);
  const promoRaw = str(sp.promo)?.trim().toUpperCase();
  const promo = promoRaw && /^[A-Z0-9]{3,20}$/.test(promoRaw) ? promoRaw : null;

  return (
    <>
      <PageHero
        image="/img/suite-grand.webp"
        eyebrow="Stay"
        title="Rooms, suites & private villas"
        subtitle="Six ways to live like royalty by the sea — each with its own view, its own rhythm and its own story."
        height="short"
      />
      <StayListing
        rooms={rooms}
        today={today}
        promo={promo}
        hasInitialDates={hasInitialDates}
        initialSearch={{
          checkIn: hasInitialDates ? ci! : defaultIn,
          checkOut: hasInitialDates ? co! : addDaysISO(defaultIn, 3),
          rooms: num(str(sp.rooms), 1, 1, 5),
          adults: num(str(sp.adults), 2, 1, 12),
          children: num(str(sp.children), 0, 0, 6),
        }}
      />
    </>
  );
}
