"use client";

import { useMemo, useState } from "react";
import { formatDate, formatDateTime } from "@/lib/format";
import type { ReservationView } from "@/types";

const KINDS = ["ALL", "DINING", "SPA", "EXPERIENCE", "CELEBRATION", "CONTACT"] as const;

export default function ReservationsTable({ reservations }: { reservations: ReservationView[] }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("ALL");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return reservations.filter((r) => {
      if (kind !== "ALL" && r.kind !== kind) return false;
      if (!term) return true;
      return [r.ref, r.name, r.email, r.item].some((v) => v.toLowerCase().includes(term));
    });
  }, [reservations, kind, q]);

  return (
    <div className="border border-ivory-400 bg-ivory-50">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory-400 p-5">
        <h2 className="text-2xl">Reservations & enquiries <span className="text-base text-espresso-50">({rows.length})</span></h2>
        <div className="flex flex-wrap gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="field !w-56 !py-2.5" aria-label="Search reservations" />
          <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className="field !w-auto !py-2.5" aria-label="Filter by type">
            {KINDS.map((k) => <option key={k} value={k}>{k === "ALL" ? "All types" : k.charAt(0) + k.slice(1).toLowerCase()}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-ivory-400 bg-ivory-200/60 text-[10px] uppercase tracking-wider2 text-espresso-50">
            <tr>
              <th className="p-4">Ref</th>
              <th className="p-4">Type</th>
              <th className="p-4">Selection</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Date & time</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Notes</th>
              <th className="p-4">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-espresso-50">No reservations found.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-ivory-400 align-top last:border-0 hover:bg-ivory-200/40">
                <td className="p-4 font-medium tracking-wider2 text-gold-dark">{r.ref}</td>
                <td className="p-4"><span className="bg-ivory-300 px-2 py-1 text-[10px] uppercase tracking-wider2">{r.kind.toLowerCase()}</span></td>
                <td className="p-4">{r.item}</td>
                <td className="p-4">{r.name}<p className="text-xs text-espresso-50">{r.email}</p>{r.phone && <p className="text-xs text-espresso-50">{r.phone}</p>}</td>
                <td className="p-4 whitespace-nowrap">{r.date ? formatDate(r.date, "short") : "—"}{r.time ? ` · ${r.time}` : ""}</td>
                <td className="p-4">{r.guests ?? "—"}</td>
                <td className="max-w-[260px] p-4 text-xs text-espresso-50">{r.notes ?? "—"}</td>
                <td className="p-4 whitespace-nowrap text-xs text-espresso-50">{formatDateTime(r.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
