import Image from "next/image";
import { formatDate, formatDateTime, formatINR, paymentLabel, plural } from "@/lib/format";
import type { BookingView } from "@/types";

export default function BookingDetails({ booking }: { booking: BookingView }) {
  const b = booking;
  const cancelled = b.status === "CANCELLED";
  return (
    <div className="border border-ivory-400 bg-ivory-50">
      <div className="grid md:grid-cols-[280px_1fr]">
        <div className="relative aspect-[16/10] md:aspect-auto">
          <Image src={b.room.image} alt={b.room.name} fill sizes="(max-width:768px) 100vw, 280px" className="object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{b.room.category}</p>
              <h2 className="mt-2 text-3xl">{b.room.name}</h2>
            </div>
            <span className={`px-3 py-1.5 text-[10px] font-medium uppercase tracking-luxe ${cancelled ? "bg-red-100 text-red-800" : "bg-espresso text-gold-light"}`}>
              {cancelled ? "Cancelled" : "Confirmed"}
            </span>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-5 text-sm sm:grid-cols-4">
            <div><dt className="text-[10px] uppercase tracking-wider2 text-espresso-50">Reference</dt><dd className="mt-1 font-medium tracking-wider2 text-gold-dark">{b.ref}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider2 text-espresso-50">Check-in</dt><dd className="mt-1">{formatDate(b.checkIn)}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider2 text-espresso-50">Check-out</dt><dd className="mt-1">{formatDate(b.checkOut)}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-wider2 text-espresso-50">Stay</dt><dd className="mt-1">{plural(b.nights, "night")} · {plural(b.rooms, "room")}</dd></div>
          </dl>
        </div>
      </div>

      <div className="grid gap-10 border-t border-ivory-400 p-6 sm:p-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl">Guest</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Name</dt><dd>{b.firstName} {b.lastName}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Email</dt><dd className="break-all text-right">{b.email}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Phone</dt><dd>{b.phone}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Country</dt><dd>{b.country}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Guests</dt><dd>{plural(b.adults, "adult")}{b.children ? `, ${plural(b.children, "child", "children")}` : ""}</dd></div>
            {b.arrivalTime && <div className="flex justify-between gap-4"><dt className="text-espresso-50">Arrival</dt><dd>{b.arrivalTime}</dd></div>}
            <div className="flex justify-between gap-4"><dt className="text-espresso-50">Booked on</dt><dd>{formatDateTime(b.createdAt)}</dd></div>
            {b.cancelledAt && <div className="flex justify-between gap-4"><dt className="text-espresso-50">Cancelled on</dt><dd>{formatDateTime(b.cancelledAt)}</dd></div>}
          </dl>
          {b.requests && (
            <p className="mt-5 border-l-2 border-gold-pale pl-4 text-sm text-espresso-50"><span className="text-espresso">Requests:</span> {b.requests}</p>
          )}
        </div>
        <div>
          <h3 className="text-xl">Payment summary</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-espresso-50">Room total</dt><dd>{formatINR(b.roomTotal)}</dd></div>
            {b.discount > 0 && <div className="flex justify-between text-gold-dark"><dt>Promo {b.promoCode}</dt><dd>− {formatINR(b.discount)}</dd></div>}
            {b.extras.map((e) => (
              <div key={e.name} className="flex justify-between"><dt className="text-espresso-50">{e.name}</dt><dd>{formatINR(e.amount)}</dd></div>
            ))}
            <div className="flex justify-between border-t border-ivory-400 pt-2"><dt className="text-espresso-50">Subtotal</dt><dd>{formatINR(b.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-espresso-50">GST (18%)</dt><dd>{formatINR(b.tax)}</dd></div>
            <div className="flex items-baseline justify-between border-t border-espresso/20 pt-3"><dt className="text-[11px] uppercase tracking-wider2">Total</dt><dd className="font-serif text-3xl">{formatINR(b.total)}</dd></div>
            <div className="flex justify-between pt-1"><dt className="text-espresso-50">Payment</dt><dd>{paymentLabel(b.paymentMethod, b.paymentLast4)}</dd></div>
          </dl>
        </div>
      </div>

      <div className="border-t border-ivory-400 bg-ivory-200/60 px-6 py-5 text-xs leading-relaxed text-espresso-50 sm:px-8">
        <strong className="text-espresso">Cancellation policy:</strong> {b.room.cancellation} Check-in from 3:00 PM · Check-out by 12:00 PM.
      </div>
    </div>
  );
}
