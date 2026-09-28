import type { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { addDays, eachNight, toISODate } from "@/lib/dates";

type Db = PrismaClient | Prisma.TransactionClient;

/** Returns number of units booked for each night in [from, to). */
export async function getBookedByNight(roomId: string, from: Date, to: Date, db: Db = prisma): Promise<Map<string, number>> {
  const bookings = await db.booking.findMany({
    where: { roomId, status: "CONFIRMED", checkIn: { lt: to }, checkOut: { gt: from } },
    select: { checkIn: true, checkOut: true, rooms: true },
  });
  const booked = new Map<string, number>();
  for (const night of eachNight(from, to)) {
    let count = 0;
    for (const b of bookings) {
      if (b.checkIn <= night && b.checkOut > night) count += b.rooms;
    }
    booked.set(toISODate(night), count);
  }
  return booked;
}

/** Minimum number of free units across all nights of the stay. */
export async function getAvailableUnits(
  room: { id: string; inventory: number },
  checkIn: Date,
  checkOut: Date,
  db: Db = prisma,
): Promise<number> {
  const booked = await getBookedByNight(room.id, checkIn, checkOut, db);
  let min = room.inventory;
  for (const count of booked.values()) min = Math.min(min, room.inventory - count);
  return Math.max(0, min);
}

/** Checks occupancy rules; returns an error message or null. */
export function checkOccupancy(
  room: { maxAdults: number; maxGuests: number; name: string },
  rooms: number,
  adults: number,
  children: number,
): string | null {
  if (adults < rooms) return "Each room needs at least one adult.";
  if (adults > room.maxAdults * rooms) {
    return `${room.name} accommodates up to ${room.maxAdults} adults per room. Add another room or reduce guests.`;
  }
  if (adults + children > room.maxGuests * rooms) {
    return `${room.name} accommodates up to ${room.maxGuests} guests per room. Add another room or reduce guests.`;
  }
  return null;
}

export async function getCalendar(room: { id: string; inventory: number }, start: Date, days: number) {
  const end = addDays(start, days);
  const booked = await getBookedByNight(room.id, start, end);
  return eachNight(start, end).map((night) => {
    const iso = toISODate(night);
    return { date: iso, available: Math.max(0, room.inventory - (booked.get(iso) ?? 0)) };
  });
}
