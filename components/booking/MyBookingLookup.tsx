"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import BookingDetails from "@/components/booking/BookingDetails";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import type { BookingView } from "@/types";

export default function MyBookingLookup({ initialRef = "", initialEmail = "" }: { initialRef?: string; initialEmail?: string }) {
  const toast = useToast();
  const [ref, setRef] = useState(initialRef);
  const [email, setEmail] = useState(initialEmail);
  const [booking, setBooking] = useState<BookingView | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  async function lookup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBooking(null);
    try {
      const qs = new URLSearchParams({ ref: ref.trim(), email: email.trim() });
      const res = await fetch(`/api/bookings/lookup?${qs.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking not found.");
      setBooking(data.booking);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking not found.");
    } finally {
      setLoading(false);
    }
  }

  async function cancel() {
    if (!booking) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${booking.ref}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not cancel this booking.");
      setBooking(data.booking);
      setConfirming(false);
      toast("Your booking has been cancelled. A confirmation email is on its way.", "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Could not cancel this booking.", "error");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div>
      <form onSubmit={lookup} className="mx-auto grid max-w-3xl gap-4 border border-ivory-400 bg-ivory-50 p-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end sm:p-8">
        <Input label="Booking reference" name="ref" value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} placeholder="RH-XXXXXX" required />
        <Input label="Email address" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <button type="submit" disabled={loading} className="btn-primary h-[46px]">{loading ? "Searching…" : "Find booking"}</button>
      </form>
      {error && <p className="mx-auto mt-6 max-w-3xl border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      {booking && (
        <div className="mt-14 animate-fade-up">
          <BookingDetails booking={booking} />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/confirmation/${booking.ref}`} className="btn-outline">Open confirmation</Link>
            {booking.canCancel && (
              <button onClick={() => setConfirming(true)} className="btn border border-red-300 text-red-800 hover:bg-red-700 hover:text-ivory">Cancel booking</button>
            )}
          </div>
          {!booking.canCancel && booking.status === "CONFIRMED" && (
            <p className="mt-4 text-center text-xs text-espresso-50">This booking can no longer be cancelled online. Please contact our reservations team.</p>
          )}
        </div>
      )}

      <Modal open={confirming} onClose={() => setConfirming(false)} eyebrow="Cancel booking" title="Are you sure?" size="sm">
        <p className="text-sm leading-relaxed text-espresso-50">
          You are about to cancel booking <strong className="text-espresso">{booking?.ref}</strong>. This can&apos;t be undone. Charges may apply under the cancellation policy:
        </p>
        <p className="mt-4 border-l-2 border-gold pl-4 text-xs leading-relaxed text-espresso-50">{booking?.room.cancellation}</p>
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setConfirming(false)} className="btn-outline">Keep booking</button>
          <button onClick={cancel} disabled={cancelling} className="btn bg-red-700 text-ivory hover:bg-red-800">{cancelling ? "Cancelling…" : "Yes, cancel"}</button>
        </div>
      </Modal>
    </div>
  );
}
