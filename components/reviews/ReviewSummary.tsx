import Stars from "@/components/reviews/Stars";
import type { ReviewStats } from "@/types";

export default function ReviewSummary({ stats }: { stats: ReviewStats }) {
  const max = Math.max(1, ...stats.distribution.map((d) => d.count));
  return (
    <div className="border border-ivory-400 bg-ivory-50 p-8">
      <p className="eyebrow">Guest rating</p>
      <div className="mt-4 flex items-end gap-3">
        <span className="font-serif text-6xl leading-none">{stats.count ? stats.average.toFixed(1) : "—"}</span>
        <span className="pb-1 text-sm text-espresso-50">/ 5</span>
      </div>
      <Stars rating={stats.average} size={20} className="mt-3" />
      <p className="mt-2 text-xs text-espresso-50">Based on {stats.count} review{stats.count === 1 ? "" : "s"}</p>
      <div className="mt-6 space-y-2">
        {stats.distribution.map((d) => (
          <div key={d.stars} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-espresso-50">{d.stars} ★</span>
            <span className="h-1.5 flex-1 bg-ivory-300">
              <span className="block h-full bg-gold transition-all duration-1000" style={{ width: `${(d.count / max) * 100}%` }} />
            </span>
            <span className="w-6 text-right text-espresso-50">{d.count}</span>
          </div>
        ))}
      </div>
      <a href="#write" className="btn-primary mt-8 w-full">Write a Review</a>
    </div>
  );
}
