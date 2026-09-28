import type { Metadata } from "next";
import { redirect } from "next/navigation";
import KpiCards from "@/components/admin/KpiCards";
import BookingsTable from "@/components/admin/BookingsTable";
import ReservationsTable from "@/components/admin/ReservationsTable";
import ReviewsTable from "@/components/admin/ReviewsTable";
import { requireAdmin } from "@/lib/auth";
import { getAdminData } from "@/lib/admin";
import { formatDate } from "@/lib/format";
import { todayISO } from "@/lib/dates";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin Dashboard", robots: { index: false } };

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?next=/admin");
  const data = await getAdminData();

  return (
    <section className="min-h-screen bg-ivory-200 pb-20 pt-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4 py-8">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1 className="mt-2 text-display-sm">Good day, {admin.name.split(" ")[0]}</h1>
          </div>
          <p className="text-sm text-espresso-50">{formatDate(todayISO(), "long")}</p>
        </div>
        <KpiCards kpis={data.kpis} />
        <div className="mt-10 space-y-10">
          <BookingsTable bookings={data.bookings} />
          <ReviewsTable reviews={data.reviews} />
          <ReservationsTable reservations={data.reservations} />
        </div>
      </div>
    </section>
  );
}
