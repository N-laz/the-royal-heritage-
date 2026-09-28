import type { Prisma, Reservation } from "@prisma/client";
import { toISODate, todayISO } from "@/lib/dates";
import type { BookingView, ReservationView } from "@/types";

export const bookingInclude = {
  room: { select: { slug: true, name: true, category: true, images: true, cancellation: true } },
  extras: { select: { name: true, amount: true } },
} satisfies Prisma.BookingInclude;

export type BookingWithRelations = Prisma.BookingGetPayload<{ include: typeof bookingInclude }>;

export function toBookingView(b: BookingWithRelations): BookingView {
  const checkIn = toISODate(b.checkIn);
  return {
    id: b.id,
    ref: b.ref,
    status: b.status,
    room: {
      slug: b.room.slug,
      name: b.room.name,
      category: b.room.category,
      image: b.room.images[0] ?? "/img/hero.webp",
      cancellation: b.room.cancellation,
    },
    checkIn,
    checkOut: toISODate(b.checkOut),
    nights: b.nights,
    rooms: b.rooms,
    adults: b.adults,
    children: b.children,
    firstName: b.firstName,
    lastName: b.lastName,
    email: b.email,
    phone: b.phone,
    country: b.country,
    arrivalTime: b.arrivalTime,
    requests: b.requests,
    promoCode: b.promoCode,
    discount: b.discount,
    roomTotal: b.roomTotal,
    extras: b.extras.map((e) => ({ name: e.name, amount: e.amount })),
    extrasTotal: b.extrasTotal,
    subtotal: b.subtotal,
    tax: b.tax,
    total: b.total,
    paymentMethod: b.paymentMethod,
    paymentLast4: b.paymentLast4,
    createdAt: b.createdAt.toISOString(),
    cancelledAt: b.cancelledAt ? b.cancelledAt.toISOString() : null,
    canCancel: b.status === "CONFIRMED" && checkIn > todayISO(),
  };
}

export function toReservationView(r: Reservation): ReservationView {
  return {
    id: r.id,
    ref: r.ref,
    kind: r.kind,
    item: r.item,
    name: r.name,
    email: r.email,
    phone: r.phone,
    date: r.date ? toISODate(r.date) : null,
    time: r.time,
    guests: r.guests,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
  };
}
