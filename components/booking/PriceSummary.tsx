import { formatDate, formatINR } from "@/lib/format";
import type { PriceBreakdown } from "@/lib/pricing";

export default function PriceSummary({ breakdown, showNightly = true, compact = false }: { breakdown: PriceBreakdown; showNightly?: boolean; compact?: boolean }) {
  const b = breakdown;
  return (
    <div className="space-y-3 text-sm">
      {showNightly && !compact && (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between text-espresso-50">
            <span>Nightly rates ({b.nights} night{b.nights === 1 ? "" : "s"} × {b.rooms} room{b.rooms === 1 ? "" : "s"})</span>
            <span className="text-xs text-gold transition-transform group-open:rotate-180">▾</span>
          </summary>
          <ul className="mt-3 max-h-52 space-y-1.5 overflow-y-auto border-l border-gold-pale pl-4 text-xs">
            {b.nightly.map((n) => (
              <li key={n.date} className="flex justify-between gap-3">
                <span>
                  {formatDate(n.date)}
                  {n.weekend && <span className="ml-2 text-gold">Weekend</span>}
                  {n.festive && <span className="ml-2 text-gold-dark">Festive</span>}
                </span>
                <span>{formatINR(n.rate)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <div className="flex justify-between"><span className="text-espresso-50">Room total</span><span>{formatINR(b.roomTotal)}</span></div>
      {b.promo && (
        <div className="flex justify-between text-gold-dark">
          <span>Promo {b.promo.code} (−{b.promo.pct}%)</span>
          <span>− {formatINR(b.discount)}</span>
        </div>
      )}
      {b.extras.map((e) => (
        <div key={e.code} className="flex justify-between gap-4">
          <span className="text-espresso-50">
            {e.name}
            {!compact && e.detail !== "Per stay" && <span className="block text-[11px]">{e.detail}</span>}
          </span>
          <span>{formatINR(e.amount)}</span>
        </div>
      ))}
      <div className="flex justify-between border-t border-ivory-400 pt-3"><span className="text-espresso-50">Subtotal</span><span>{formatINR(b.subtotal)}</span></div>
      <div className="flex justify-between"><span className="text-espresso-50">GST (18%)</span><span>{formatINR(b.tax)}</span></div>
      <div className="flex items-baseline justify-between border-t border-espresso/20 pt-4">
        <span className="text-[11px] uppercase tracking-wider2">Total</span>
        <span className="font-serif text-3xl">{formatINR(b.total)}</span>
      </div>
    </div>
  );
}
