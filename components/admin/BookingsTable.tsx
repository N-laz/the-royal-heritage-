"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatDateTime, formatINR, paymentLabel } from "@/lib/format";
import type { BookingView } from "@/types";

export default function BookingsTable({ bookings }: { bookings: BookingView[] }) {
  const router = useRouter();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"ALL" | "CONFIRMED" | "CANCELLED">("ALL");
  const [busy, setBusy] = useState<string | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "ALL" && b.status !== status) return false;
      if (!term) return true;
      return [b.ref, b.firstName, b.lastName, b.email, b.room.name, b.phone].some((v) => v.toLowerCase().includes(term));
    });
  }, [bookings, q, status]);

  async function cancel(ref: string) {
    if (!window.confirm(`Cancel booking ${ref}? The guest will be emailed.`)) return;
    setBusy(ref);
    try {
      const res = await fetch(`/api/bookings/${ref}/cancel`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not cancel.");
      toast(`Booking ${ref} cancelled.`, "success");
      router.refresh();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Could not cancel.", "error");
    } finally {
      setBusy(null);
    }
  }

  function exportCsv() {
    const header = ["Ref", "Status", "Room", "Check-in", "Check-out", "Nights", "Rooms", "Adults", "Children", "Guest", "Email", "Phone", "Country", "Promo", "Total", "Payment", "Created"];
    const lines = rows.map((b) =>
      [b.ref, b.status, b.room.name, b.checkIn, b.checkOut, b.nights, b.rooms, b.adults, b.children, `${b.firstName} ${b.lastName}`, b.email, b.phone, b.country, b.promoCode ?? "", b.total, b.paymentMethod, b.createdAt]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `royal-heritage-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border border-ivory-400 bg-ivory-50">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory-400 p-5">
        <h2 className="text-2xl">Bookings <span className="text-base text-espresso-50">({rows.length})</span></h2>
        <div className="flex flex-wrap gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ref, guest, email, room…" className="field !w-64 !py-2.5" aria-label="Search bookings" />
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="field !w-auto !py-2.5" aria-label="Filter by status">
            <option value="ALL">All statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button onClick={exportCsv} className="btn-outline !px-4 !py-2.5">Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="border-b border-ivory-400 bg-ivory-200/60 text-[10px] uppercase tracking-wider2 text-espresso-50">
            <tr>
              <th className="p-4">Ref</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Booked</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={10} className="p-10 text-center text-espresso-50">No bookings found.</td></tr>
            )}
            {rows.map((b) => (
              <tr key={b.id} className="border-b border-ivory-400 align-top last:border-0 hover:bg-ivory-200/40">
                <td className="p-4"><Link href={`/confirmation/${b.ref}`} className="font-medium tracking-wider2 text-gold-dark hover:underline">{b.ref}</Link></td>
                <td className="p-4">
                  <p>{b.firstName} {b.lastName}</p>
                  <p className="text-xs text-espresso-50">{b.email}</p>
                  <p className="text-xs text-espresso-50">{b.phone}</p>
                </td>
                <td className="p-4">{b.room.name}<p className="text-xs text-espresso-50">{b.rooms} room{b.rooms > 1 ? "s" : ""}</p></td>
                <td className="p-4 whitespace-nowrap">{formatDate(b.checkIn, "short")} – {formatDate(b.checkOut, "short")}<p className="text-xs text-espresso-50">{b.nights} night{b.nights > 1 ? "s" : ""}</p></td>
                <td className="p-4">{b.adults}A{b.children ? ` · ${b.children}C` : ""}</td>
                <td className="p-4 whitespace-nowrap font-medium">{formatINR(b.total)}{b.promoCode && <p className="text-xs text-gold-dark">{b.promoCode}</p>}</td>
                <td className="p-4 text-xs">{paymentLabel(b.paymentMethod, b.paymentLast4)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider2 ${b.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>{b.status.toLowerCase()}</span>
                </td>
                <td className="p-4 whitespace-nowrap text-xs text-espresso-50">{formatDateTime(b.createdAt)}</td>
                <td className="p-4">
                  {b.status === "CONFIRMED" && (
                    <button onClick={() => cancel(b.ref)} disabled={busy === b.ref} className="text-[11px] uppercase tracking-wider2 text-red-700 hover:underline disabled:opacity-50">
                      {busy === b.ref ? "…" : "Cancel"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
