"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Stars from "@/components/reviews/Stars";
import { useToast } from "@/components/ui/Toast";
import { formatDateTime } from "@/lib/format";
import type { ReviewView } from "@/types";

const STATUSES = ["ALL", "PENDING", "APPROVED", "REJECTED"] as const;

const badge: Record<ReviewView["status"], string> = {
  PENDING: "bg-amber-50 text-amber-800",
  APPROVED: "bg-emerald-50 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function ReviewsTable({ reviews }: { reviews: ReviewView[] }) {
  const router = useRouter();
  const toast = useToast();
  const [status, setStatus] = useState<(typeof STATUSES)[number]>(reviews.some((r) => r.status === "PENDING") ? "PENDING" : "ALL");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return reviews.filter((r) => {
      if (status !== "ALL" && r.status !== status) return false;
      if (!term) return true;
      return [r.name, r.email, r.title, r.comment, r.bookingRef ?? "", r.roomName ?? ""].some((v) => v.toLowerCase().includes(term));
    });
  }, [reviews, status, q]);

  async function act(id: string, action: "APPROVED" | "REJECTED" | "PENDING" | "DELETE") {
    if (action === "DELETE" && !window.confirm("Delete this review permanently?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: action === "DELETE" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: action === "DELETE" ? undefined : JSON.stringify({ status: action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Action failed.");
      toast(action === "DELETE" ? "Review deleted." : action === "APPROVED" ? "Review published." : action === "REJECTED" ? "Review rejected." : "Review moved to pending.", "success");
      router.refresh();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Action failed.", "error");
    } finally {
      setBusy(null);
    }
  }

  const count = (s: (typeof STATUSES)[number]) => (s === "ALL" ? reviews.length : reviews.filter((r) => r.status === s).length);

  return (
    <div className="border border-ivory-400 bg-ivory-50">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory-400 p-5">
        <h2 className="text-2xl">Guest reviews <span className="text-base text-espresso-50">({rows.length})</span></h2>
        <div className="flex flex-wrap gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reviews…" className="field !w-56 !py-2.5" aria-label="Search reviews" />
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="field !w-auto !py-2.5" aria-label="Filter by status">
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()} ({count(s)})
              </option>
            ))}
          </select>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="p-10 text-center text-sm text-espresso-50">No reviews found.</p>
      ) : (
        <ul className="divide-y divide-ivory-400">
          {rows.map((r) => (
            <li key={r.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Stars rating={r.rating} size={14} />
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider2 ${badge[r.status]}`}>{r.status.toLowerCase()}</span>
                  {r.verified && <span className="bg-espresso px-2 py-0.5 text-[10px] uppercase tracking-wider2 text-gold-light">Verified · {r.bookingRef}</span>}
                  <span className="text-xs text-espresso-50">{formatDateTime(r.createdAt)}</span>
                </div>
                <p className="mt-2 font-serif text-xl">{r.title}</p>
                <p className="mt-1 max-w-3xl whitespace-pre-line text-sm text-espresso-100">{r.comment}</p>
                <p className="mt-2 text-xs text-espresso-50">
                  {r.name} · {r.email}
                  {r.location ? ` · ${r.location}` : ""}
                  {r.roomName ? ` · ${r.roomName}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2 lg:flex-col lg:items-end">
                {r.status !== "APPROVED" && (
                  <button disabled={busy === r.id} onClick={() => act(r.id, "APPROVED")} className="btn-primary !px-4 !py-2 disabled:opacity-50">Approve</button>
                )}
                {r.status !== "REJECTED" && (
                  <button disabled={busy === r.id} onClick={() => act(r.id, "REJECTED")} className="btn-outline !px-4 !py-2 disabled:opacity-50">{r.status === "APPROVED" ? "Unpublish" : "Reject"}</button>
                )}
                <button disabled={busy === r.id} onClick={() => act(r.id, "DELETE")} className="px-2 py-2 text-[11px] uppercase tracking-wider2 text-red-700 hover:underline disabled:opacity-50">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
