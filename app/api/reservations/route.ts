import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { reservationSchema, zodFieldErrors, zodMessage } from "@/lib/validators";
import { generateRef } from "@/lib/ref";
import { parseISODate, todayISO } from "@/lib/dates";
import { toReservationView } from "@/lib/booking-view";
import { sendEmail } from "@/lib/email/mailer";
import { reservationConfirmationEmail } from "@/lib/email/reservation-confirmation";
import { jsonError, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = reservationSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error), 400, zodFieldErrors(parsed.error));
  const data = parsed.data;

  if (data.date && data.date < todayISO()) return jsonError("Please choose a date from today onwards.");

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const reservation = await prisma.reservation.create({
        data: {
          ref: generateRef("RS"),
          kind: data.kind,
          item: data.item,
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          date: data.date ? parseISODate(data.date) : null,
          time: data.time || null,
          guests: data.guests ?? null,
          notes: data.notes || null,
        },
      });
      const view = toReservationView(reservation);
      const sent = await sendEmail({ to: view.email, bcc: "kazinomanimtiyaz7656@gmail.com", ...reservationConfirmationEmail(view) });
      return NextResponse.json({ ok: true, ref: view.ref, emailSent: sent.ok }, { status: 201 });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002" && attempt < 2) continue;
      console.error("[reservations] create failed", error);
      return jsonError("We couldn't save your request. Please try again.", 500);
    }
  }
  return jsonError("We couldn't save your request. Please try again.", 500);
}
