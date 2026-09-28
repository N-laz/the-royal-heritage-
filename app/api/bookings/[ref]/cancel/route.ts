import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeRef } from "@/lib/ref";
import { cancelSchema } from "@/lib/validators";
import { bookingInclude, toBookingView } from "@/lib/booking-view";
import { getSession } from "@/lib/auth";
import { jsonError, readJson } from "@/lib/http";
import { todayISO, toISODate } from "@/lib/dates";
import { sendEmail } from "@/lib/email/mailer";
import { bookingCancellationEmail } from "@/lib/email/booking-cancellation";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const parsed = cancelSchema.safeParse((await readJson(request)) ?? {});
  if (!parsed.success) return jsonError("Invalid request.");

  const booking = await prisma.booking.findUnique({ where: { ref: normalizeRef(ref) }, include: bookingInclude });
  if (!booking) return jsonError("Booking not found.", 404);

  const session = await getSession();
  const isAdmin = session?.role === "ADMIN";
  const allowed =
    isAdmin ||
    (session && (booking.userId === session.sub || booking.email.toLowerCase() === session.email.toLowerCase())) ||
    (parsed.data.email && parsed.data.email === booking.email.toLowerCase());
  if (!allowed) return jsonError("You are not allowed to cancel this booking.", 403);

  if (booking.status === "CANCELLED") return jsonError("This booking is already cancelled.", 409);
  if (!isAdmin && toISODate(booking.checkIn) <= todayISO()) {
    return jsonError("This booking can no longer be cancelled online. Please contact the resort.", 409);
  }

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: { status: "CANCELLED", cancelledAt: new Date() },
    include: bookingInclude,
  });

  const view = toBookingView(updated);
  await sendEmail({ to: view.email, ...bookingCancellationEmail(view) });
  return NextResponse.json({ ok: true, booking: view });
}
