import type { Prisma, PrismaClient, Room } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { nightsBetween, parseISODate, todayISO } from "@/lib/dates";
import { calculatePrice, type PriceBreakdown, type PricingExtra } from "@/lib/pricing";
import { resolvePromo } from "@/lib/promo";
import { checkOccupancy, getAvailableUnits } from "@/lib/availability";

type Db = PrismaClient | Prisma.TransactionClient;

export const MAX_NIGHTS = 30;

export type QuoteRequest = {
  slug: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  extras: string[];
  promoCode?: string | null;
};

export type QuoteSuccess = {
  ok: true;
  room: Room;
  breakdown: PriceBreakdown;
  extras: PricingExtra[];
  available: number;
  soldOut: boolean;
  promoError: string | null;
  occupancyError: string | null;
};

export type QuoteFailure = { ok: false; status: number; error: string };

export async function buildQuote(req: QuoteRequest, db: Db = prisma): Promise<QuoteSuccess | QuoteFailure> {
  if (req.checkIn < todayISO()) return { ok: false, status: 400, error: "Check-in date cannot be in the past." };
  if (req.checkOut <= req.checkIn) return { ok: false, status: 400, error: "Check-out must be after check-in." };

  const checkIn = parseISODate(req.checkIn);
  const checkOut = parseISODate(req.checkOut);
  const nights = nightsBetween(checkIn, checkOut);
  if (nights > MAX_NIGHTS) {
    return { ok: false, status: 400, error: `Online bookings are limited to ${MAX_NIGHTS} nights. Please contact us for longer stays.` };
  }

  const room = await db.room.findFirst({ where: { slug: req.slug, active: true } });
  if (!room) return { ok: false, status: 404, error: "Room not found." };

  const codes = Array.from(new Set(req.extras)).filter((c) => !(room.breakfastIncluded && c === "breakfast"));
  const extraRows = codes.length
    ? await db.extra.findMany({ where: { code: { in: codes }, active: true }, orderBy: { sortOrder: "asc" } })
    : [];
  const extras: PricingExtra[] = extraRows.map((e) => ({
    id: e.id,
    code: e.code,
    name: e.name,
    price: e.price,
    perGuestPerNight: e.perGuestPerNight,
  }));

  const promoResult = await resolvePromo(req.promoCode, { nights, category: room.category });
  const promo = promoResult && promoResult.ok ? promoResult.promo : null;
  const promoError = promoResult && !promoResult.ok ? promoResult.error : null;

  const occupancyError = checkOccupancy(room, req.rooms, req.adults, req.children);
  const available = await getAvailableUnits(room, checkIn, checkOut, db);

  const breakdown = calculatePrice({
    baseRate: room.baseRate,
    checkIn,
    checkOut,
    rooms: req.rooms,
    adults: req.adults,
    children: req.children,
    extras,
    promo,
  });

  return {
    ok: true,
    room,
    breakdown,
    extras,
    available,
    soldOut: available < req.rooms,
    promoError,
    occupancyError,
  };
}
