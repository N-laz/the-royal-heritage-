"use client";

import { useMemo, useState } from "react";
import Stars from "@/components/reviews/Stars";
import { formatDate } from "@/lib/format";
import type { PublicReview } from "@/types";

const PAGE = 6;

export default function ReviewList({ reviews }: { reviews: PublicReview[] }) {
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState<"recent" | "highest" | "lowest">("recent");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const rows = filter ? reviews.filter((r) => r.rating === filter) : [...reviews];
    if (sort === "highest") rows.sort((a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt));
    if (sort === "lowest") rows.sort((a, b) => a.rating - b.rating || b.createdAt.localeCompare(a.createdAt));
    return rows;
  }, [reviews, filter, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory-400 pb-5">
        <div className="flex flex-wrap gap-2">
          {[0, 5, 4, 3, 2, 1].map((n) => (
            <button
              key={n}
              onClick={() => {
                setFilter(n);
                setShown(PAGE);
              }}
              className={`border px-3.5 py-2 text-[11px] uppercase tracking-wider2 transition-colors ${filter === n ? "border-espresso bg-espresso text-ivory" : "border-ivory-400 hover:border-espresso"}`}
            >
              {n === 0 ? "All" : `${n} ★`}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="field !w-auto !py-2" aria-label="Sort reviews">
          <option value="recent">Most recent</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
        </select>
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-sm text-espresso-50">No reviews to show yet.</p>
      ) : (
        <div className="grid gap-6 pt-8 md:grid-cols-2">
          {list.slice(0, shown).map((r) => (
            <article key={r.id} className="flex flex-col border border-ivory-400 bg-ivory-50 p-7 transition-shadow duration-500 hover:shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={r.rating} />
                <span className="text-xs text-espresso-50">{formatDate(r.createdAt.slice(0, 10))}</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{r.title}</h3>
              <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-espresso-100">{r.comment}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ivory-400 pt-4">
                <span className="text-sm font-medium uppercase tracking-wider2">{r.name}</span>
                {r.location && <span className="text-xs text-espresso-50">{r.location}</span>}
                {r.verified && (
                  <span className="ml-auto inline-flex items-center gap-1 bg-espresso px-2 py-1 text-[10px] uppercase tracking-wider2 text-gold-light">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                    Verified guest
                  </span>
                )}
              </div>
              {r.roomName && <p className="mt-2 text-xs text-espresso-50">Stayed in {r.roomName}</p>}
            </article>
          ))}
        </div>
      )}

      {shown < list.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setShown((s) => s + PAGE)} className="btn-outline">Show more reviews</button>
        </div>
      )}
    </div>
  );
}
