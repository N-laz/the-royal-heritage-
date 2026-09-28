import { formatINR } from "@/lib/format";
import type { AdminData } from "@/lib/admin";

export default function KpiCards({ kpis }: { kpis: AdminData["kpis"] }) {
  const cards = [
    { label: "Confirmed revenue", value: formatINR(kpis.revenue), sub: `Avg. ${formatINR(kpis.avgBookingValue)} per booking` },
    { label: "Bookings", value: kpis.totalBookings.toLocaleString("en-IN"), sub: `${kpis.confirmedBookings} confirmed · ${kpis.cancelledBookings} cancelled` },
    { label: "Room nights sold", value: kpis.roomNights.toLocaleString("en-IN"), sub: "Confirmed bookings" },
    { label: "Occupancy tonight", value: `${kpis.occupancyTonight}%`, sub: `${kpis.upcomingArrivals} arrivals in next 7 days` },
    { label: "Reservations", value: kpis.reservations.toLocaleString("en-IN"), sub: "Dining, spa, experiences & enquiries" },
    { label: "Newsletter", value: kpis.subscribers.toLocaleString("en-IN"), sub: "Subscribers" },
    { label: "Guest rating", value: kpis.approvedReviews ? `${kpis.avgRating.toFixed(1)} ★` : "—", sub: `${kpis.approvedReviews} published review${kpis.approvedReviews === 1 ? "" : "s"}` },
    { label: "Pending reviews", value: kpis.pendingReviews.toLocaleString("en-IN"), sub: kpis.pendingReviews ? "Awaiting your approval" : "All caught up" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c, i) => (
        <div key={c.label} className={`border p-6 ${i === 0 ? "border-espresso bg-espresso text-ivory" : "border-ivory-400 bg-ivory-50"}`}>
          <p className={`text-[10px] uppercase tracking-luxe ${i === 0 ? "text-gold-light" : "text-gold"}`}>{c.label}</p>
          <p className="mt-3 font-serif text-4xl">{c.value}</p>
          <p className={`mt-2 text-xs ${i === 0 ? "text-ivory/60" : "text-espresso-50"}`}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
