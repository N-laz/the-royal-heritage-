import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { bookingInclude, toBookingView, toReservationView } from "@/lib/booking-view";
import { formatDate, formatINR, plural } from "@/lib/format";
import { todayISO } from "@/lib/dates";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My Account" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const [bookings, reservations] = await Promise.all([
    prisma.booking.findMany({
      where: { OR: [{ userId: user.id }, { email: user.email }] },
      include: bookingInclude,
      orderBy: { checkIn: "desc" },
    }),
    prisma.reservation.findMany({ where: { email: user.email }, orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  const views = bookings.map(toBookingView);
  const today = todayISO();
  const upcoming = views.filter((b) => b.status === "CONFIRMED" && b.checkOut >= today);
  const past = views.filter((b) => !(b.status === "CONFIRMED" && b.checkOut >= today));
  const resViews = reservations.map(toReservationView);

  const reviewed = new Set(
    (await prisma.review.findMany({ where: { email: user.email, bookingRef: { not: null } }, select: { bookingRef: true } })).map((r) => r.bookingRef),
  );

  const section = (title: string, list: typeof views) => (
    <div>
      <h2 className="text-3xl">{title}</h2>
      {list.length === 0 ? (
        <p className="mt-4 text-sm text-espresso-50">Nothing here yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {list.map((b) => (
            <Link key={b.id} href={`/confirmation/${b.ref}`} className="group grid overflow-hidden border border-ivory-400 bg-ivory-50 transition-shadow hover:shadow-soft sm:grid-cols-[200px_1fr_auto]">
              <div className="relative aspect-[16/9] sm:aspect-auto">
                <Image src={b.room.image} alt={b.room.name} fill sizes="200px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-wider2 text-gold-dark">{b.ref}</p>
                <p className="mt-1 font-serif text-2xl">{b.room.name}</p>
                <p className="mt-1 text-sm text-espresso-50">
                  {formatDate(b.checkIn)} – {formatDate(b.checkOut)} · {plural(b.nights, "night")} · {plural(b.rooms, "room")}
                </p>
              </div>
              <div className="flex items-center justify-between gap-6 border-t border-ivory-400 p-5 sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0">
                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-luxe ${b.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-espresso text-gold-light"}`}>{b.status === "CANCELLED" ? "Cancelled" : "Confirmed"}</span>
                <span className="font-serif text-xl">{formatINR(b.total)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const reviewable = views.filter((b) => b.status === "CONFIRMED" && b.checkIn <= today && !reviewed.has(b.ref));


  return (
    <section className="container max-w-5xl pb-24 pt-36 lg:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ivory-400 pb-8">
        <div>
          <p className="eyebrow">My Account</p>
          <h1 className="mt-3 text-display-md">Welcome, {user.name.split(" ")[0]}</h1>
          <p className="mt-2 text-sm text-espresso-50">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
        </div>
        <div className="flex gap-3">
          {user.role === "ADMIN" && <Link href="/admin" className="btn-gold">Admin Dashboard</Link>}
          <Link href="/stay" className="btn-primary">Book a Stay</Link>
        </div>
      </div>

      <div className="mt-12 space-y-16">
        {section("Upcoming stays", upcoming)}
        {section("Past & cancelled stays", past)}

        <div className="border border-gold/40 bg-ivory-50 p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow">Guest Reviews</p>
              <h2 className="mt-2 text-3xl">Share your stay</h2>
              <p className="mt-2 max-w-xl text-sm text-espresso-50">
                {reviewable.length > 0
                  ? "Reviews linked to a booking carry a Verified Guest badge."
                  : "Tell future guests what made your time with us memorable."}
              </p>
            </div>
            <Link href="/reviews#write" className="btn-outline">Write a Review</Link>
          </div>
          {reviewable.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {reviewable.map((b) => (
                <Link key={b.id} href={`/reviews?ref=${b.ref}#write`} className="border border-ivory-400 px-4 py-2.5 text-xs transition-colors hover:border-gold">
                  Review <span className="font-medium">{b.room.name}</span> · {b.ref}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl">Dining, spa & experiences</h2>
          {resViews.length === 0 ? (
            <p className="mt-4 text-sm text-espresso-50">No reservations yet. <Link href="/dining" className="text-gold">Reserve a table</Link> or <Link href="/wellness" className="text-gold">book the spa</Link>.</p>
          ) : (
            <div className="mt-6 overflow-x-auto border border-ivory-400 bg-ivory-50">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-ivory-400 text-[10px] uppercase tracking-wider2 text-espresso-50">
                  <tr><th className="p-4">Ref</th><th className="p-4">Type</th><th className="p-4">Selection</th><th className="p-4">Date</th><th className="p-4">Guests</th></tr>
                </thead>
                <tbody>
                  {resViews.map((r) => (
                    <tr key={r.id} className="border-b border-ivory-400 last:border-0">
                      <td className="p-4 tracking-wider2 text-gold-dark">{r.ref}</td>
                      <td className="p-4 capitalize">{r.kind.toLowerCase()}</td>
                      <td className="p-4">{r.item}</td>
                      <td className="p-4">{r.date ? `${formatDate(r.date)}${r.time ? ` · ${r.time}` : ""}` : "—"}</td>
                      <td className="p-4">{r.guests ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
