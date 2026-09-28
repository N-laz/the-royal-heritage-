import { prisma } from "@/lib/prisma";
import { bookingInclude, toBookingView, toReservationView } from "@/lib/booking-view";
import { addDays, todayDate } from "@/lib/dates";
import { toReviewView } from "@/lib/reviews";

export async function getAdminData() {
  const today = todayDate();
  const weekAhead = addDays(today, 7);

  const [bookings, reservations, rooms, subscribers, reviews] = await Promise.all([
    prisma.booking.findMany({ include: bookingInclude, orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    prisma.room.findMany({ where: { active: true }, select: { inventory: true } }),
    prisma.newsletterSubscriber.count(),
    prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
  ]);

  const approved = reviews.filter((r) => r.status === "APPROVED");

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const totalInventory = rooms.reduce((sum, r) => sum + r.inventory, 0);
  const inHouseTonight = confirmed
    .filter((b) => b.checkIn <= today && b.checkOut > today)
    .reduce((sum, b) => sum + b.rooms, 0);

  const kpis = {
    totalBookings: bookings.length,
    confirmedBookings: confirmed.length,
    cancelledBookings: bookings.length - confirmed.length,
    revenue: confirmed.reduce((sum, b) => sum + b.total, 0),
    roomNights: confirmed.reduce((sum, b) => sum + b.nights * b.rooms, 0),
    avgBookingValue: confirmed.length ? Math.round(confirmed.reduce((s, b) => s + b.total, 0) / confirmed.length) : 0,
    upcomingArrivals: confirmed.filter((b) => b.checkIn >= today && b.checkIn < weekAhead).length,
    occupancyTonight: totalInventory ? Math.round((inHouseTonight / totalInventory) * 100) : 0,
    reservations: reservations.length,
    subscribers,
    pendingReviews: reviews.filter((r) => r.status === "PENDING").length,
    approvedReviews: approved.length,
    avgRating: approved.length ? Math.round((approved.reduce((sum, r) => sum + r.rating, 0) / approved.length) * 10) / 10 : 0,
  };

  return {
    kpis,
    bookings: bookings.map(toBookingView),
    reservations: reservations.map(toReservationView),
    reviews: reviews.map(toReviewView),
  };
}

export type AdminData = Awaited<ReturnType<typeof getAdminData>>;
