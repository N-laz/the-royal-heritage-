import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeRef } from "@/lib/ref";
import { bookingInclude, toBookingView } from "@/lib/booking-view";
import { getSession } from "@/lib/auth";
import { jsonError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const booking = await prisma.booking.findUnique({ where: { ref: normalizeRef(ref) }, include: bookingInclude });
  if (!booking) return jsonError("Booking not found.", 404);

  const session = await getSession();
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  const allowed =
    session?.role === "ADMIN" ||
    (session && (booking.userId === session.sub || booking.email.toLowerCase() === session.email.toLowerCase())) ||
    (email && email === booking.email.toLowerCase());

  if (!allowed) return jsonError("Please provide the email used for this booking.", 403);
  return NextResponse.json({ ok: true, booking: toBookingView(booking) });
}
