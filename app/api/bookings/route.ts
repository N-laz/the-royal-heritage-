import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { bookingSchema, zodFieldErrors, zodMessage } from "@/lib/validators";
import { buildQuote } from "@/lib/quote";
import { parseISODate } from "@/lib/dates";
import { generateRef } from "@/lib/ref";
import { getSession } from "@/lib/auth";
import { bookingInclude, toBookingView } from "@/lib/booking-view";
import { sendEmail } from "@/lib/email/mailer";
import { bookingConfirmationEmail } from "@/lib/email/booking-confirmation";
import { jsonError, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

class BookingError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function POST(request: Request) {
  const parsed = bookingSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error), 400, zodFieldErrors(parsed.error));

  const { stay, guest, payment } = parsed.data;
  const session = await getSession();

  let paymentLast4: string | null = null;
  if (payment.method === "CARD") paymentLast4 = payment.cardNumber.slice(-4);

  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const booking = await prisma.$transaction(
        async (tx) => {
          const quote = await buildQuote(stay, tx);
          if (!quote.ok) throw new BookingError(quote.error, quote.status);
          if (quote.occupancyError) throw new BookingError(quote.occupancyError);
          if (quote.soldOut) {
            throw new BookingError(
              quote.available > 0
                ? `Only ${quote.available} ${quote.room.name} available for these dates.`
                : `${quote.room.name} is sold out for these dates. Please choose different dates.`,
              409,
            );
          }
          if (stay.promoCode && quote.promoError) throw new BookingError(quote.promoError);

          const b = quote.breakdown;
          return tx.booking.create({
            data: {
              ref: generateRef("RH"),
              userId: session?.sub ?? null,
              roomId: quote.room.id,
              checkIn: parseISODate(stay.checkIn),
              checkOut: parseISODate(stay.checkOut),
              nights: b.nights,
              rooms: stay.rooms,
              adults: stay.adults,
              children: stay.children,
              firstName: guest.firstName,
              lastName: guest.lastName,
              email: guest.email,
              phone: guest.phone,
              country: guest.country,
              arrivalTime: guest.arrivalTime || null,
              requests: guest.requests || null,
              promoCode: b.promo?.code ?? null,
              discount: b.discount,
              roomTotal: b.roomTotal,
              extrasTotal: b.extrasTotal,
              subtotal: b.subtotal,
              tax: b.tax,
              total: b.total,
              paymentMethod: payment.method,
              paymentLast4,
              extras: { create: b.extras.map((e) => ({ extraId: e.id, name: e.name, amount: e.amount })) },
            },
            include: bookingInclude,
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 10000, timeout: 20000 },
      );

      const view = toBookingView(booking);
      const email = bookingConfirmationEmail(view);
      const sent = await sendEmail({ to: view.email, bcc: "kazinomanimtiyaz7656@gmail.com", ...email });

      return NextResponse.json({ ok: true, ref: view.ref, emailSent: sent.ok }, { status: 201 });
    } catch (error) {
      if (error instanceof BookingError) return jsonError(error.message, error.status);
      const retryable =
        error instanceof Prisma.PrismaClientKnownRequestError && (error.code === "P2034" || error.code === "P2002");
      if (retryable && attempt < 3) continue;
      console.error("[bookings] create failed", error);
      return jsonError("We couldn't complete your booking. Please try again.", 500);
    }
  }
  return jsonError("We couldn't complete your booking. Please try again.", 500);
}
