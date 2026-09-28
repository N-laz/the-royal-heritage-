import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { stayQuerySchema, zodMessage } from "@/lib/validators";
import { nightsBetween, parseISODate, todayISO } from "@/lib/dates";
import { checkOccupancy, getAvailableUnits } from "@/lib/availability";
import { calculatePrice } from "@/lib/pricing";
import { jsonError } from "@/lib/http";
import { MAX_NIGHTS } from "@/lib/quote";
import type { AvailabilityResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = stayQuerySchema.safeParse(params);
  if (!parsed.success) return jsonError(zodMessage(parsed.error));

  const { checkIn: ci, checkOut: co, rooms, adults, children } = parsed.data;
  if (ci < todayISO()) return jsonError("Check-in date cannot be in the past.");
  const checkIn = parseISODate(ci);
  const checkOut = parseISODate(co);
  const nights = nightsBetween(checkIn, checkOut);
  if (nights > MAX_NIGHTS) return jsonError(`Online bookings are limited to ${MAX_NIGHTS} nights.`);

  const roomList = await prisma.room.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } });

  const results = await Promise.all(
    roomList.map(async (room) => {
      const available = await getAvailableUnits(room, checkIn, checkOut);
      const occupancyError = checkOccupancy(room, rooms, adults, children);
      const price = calculatePrice({ baseRate: room.baseRate, checkIn, checkOut, rooms, adults, children, extras: [] });
      return {
        slug: room.slug,
        available,
        canBook: available >= rooms && !occupancyError,
        occupancyError,
        stayTotal: price.roomTotal,
        avgNightly: Math.round(price.roomTotal / rooms / nights),
      };
    }),
  );

  const body: AvailabilityResponse = { checkIn: ci, checkOut: co, nights, rooms: results };
  return NextResponse.json(body);
}
