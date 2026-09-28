import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingDetails from "@/components/booking/BookingDetails";
import ConfirmationActions from "@/components/booking/ConfirmationActions";
import { prisma } from "@/lib/prisma";
import { normalizeRef } from "@/lib/ref";
import { bookingInclude, toBookingView } from "@/lib/booking-view";
import { bookingConfirmationEmail } from "@/lib/email/booking-confirmation";
import { bookingCancellationEmail } from "@/lib/email/booking-cancellation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Booking Confirmation", robots: { index: false } };

export default async function ConfirmationPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const booking = await prisma.booking.findUnique({ where: { ref: normalizeRef(ref) }, include: bookingInclude });
  if (!booking) notFound();

  const view = toBookingView(booking);
  const cancelled = view.status === "CANCELLED";
  const email = cancelled ? bookingCancellationEmail(view) : bookingConfirmationEmail(view);

  return (
    <section className="print-area container max-w-5xl pb-24 pt-36 lg:pt-44">
      <div className="text-center">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${cancelled ? "border-red-300 text-red-700" : "border-gold text-gold"}`}>
          {cancelled ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5l12 12M17 5L5 17" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12.5l5 5L20 6.5" /></svg>
          )}
        </div>
        <p className="eyebrow mt-6">{cancelled ? "Booking cancelled" : "Reservation confirmed"}</p>
        <h1 className="mt-3 text-display-md">
          {cancelled ? "This booking has been cancelled" : `Thank you, ${view.firstName}`}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-espresso-50">
          {cancelled
            ? "We hope to welcome you to the palace another time."
            : <>Your stay is confirmed. A confirmation has been sent to <strong className="text-espresso">{view.email}</strong>. Please keep your reference <strong className="tracking-wider2 text-gold-dark">{view.ref}</strong> handy.</>}
        </p>
        <div className="mt-8">
          <ConfirmationActions emailHtml={email.html} emailSubject={email.subject} email={view.email} />
        </div>
      </div>

      <div className="mt-14">
        <BookingDetails booking={view} />
      </div>

      <div className="no-print mt-12 grid gap-4 text-center sm:grid-cols-3">
        {[
          { href: "/dining", title: "Reserve a table", text: "Five restaurants await" },
          { href: "/wellness", title: "Book the spa", text: "Rituals of renewal" },
          { href: "/experiences", title: "Plan experiences", text: "Yachts, dunes & more" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="border border-ivory-400 bg-ivory-50 p-6 transition-colors hover:border-gold">
            <p className="font-serif text-2xl">{c.title}</p>
            <p className="mt-1 text-xs uppercase tracking-wider2 text-espresso-50">{c.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
