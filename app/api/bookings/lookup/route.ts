import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { lookupSchema, zodMessage } from "@/lib/validators";
import { normalizeRef } from "@/lib/ref";
import { bookingInclude, toBookingView } from "@/lib/booking-view";
import { jsonError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const parsed = lookupSchema.safeParse({
    ref: request.nextUrl.searchParams.get("ref") ?? "",
    email: request.nextUrl.searchParams.get("email") ?? "",
  });
  if (!parsed.success) return jsonError(zodMessage(parsed.error));

  const booking = await prisma.booking.findUnique({
    where: { ref: normalizeRef(parsed.data.ref) },
    include: bookingInclude,
  });
  if (!booking || booking.email.toLowerCase() !== parsed.data.email) {
    return jsonError("We couldn't find a booking with that reference and email.", 404);
  }
  return NextResponse.json({ ok: true, booking: toBookingView(booking) });
}
