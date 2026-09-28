import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCalendar } from "@/lib/availability";
import { isISODate, parseISODate, todayISO } from "@/lib/dates";
import { isFestiveNight, isWeekendNight, nightlyRate } from "@/lib/pricing";
import { jsonError } from "@/lib/http";
import type { CalendarDay } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await prisma.room.findFirst({ where: { slug, active: true } });
  if (!room) return jsonError("Room not found.", 404);

  const today = todayISO();
  const startParam = request.nextUrl.searchParams.get("start");
  const start = startParam && isISODate(startParam) && startParam >= today ? startParam : today;
  const daysParam = Number(request.nextUrl.searchParams.get("days") ?? 35);
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(Math.round(daysParam), 7), 90) : 35;

  const calendar = await getCalendar(room, parseISODate(start), days);
  const result: CalendarDay[] = calendar.map((day) => {
    const d = parseISODate(day.date);
    return {
      date: day.date,
      available: day.available,
      rate: nightlyRate(room.baseRate, d),
      weekend: isWeekendNight(d),
      festive: isFestiveNight(d),
    };
  });

  return NextResponse.json({ slug: room.slug, inventory: room.inventory, start, days: result });
}
