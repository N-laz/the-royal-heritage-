import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingWizard from "@/components/booking/BookingWizard";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { addDaysISO, isISODate, todayISO } from "@/lib/dates";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Book Your Stay" };

type Params = Promise<{ slug: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | undefined, fallback: number, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : fallback;
};

export default async function BookPage({ params, searchParams }: { params: Params; searchParams: SP }) {
  const { slug } = await params;
  const sp = await searchParams;
  const [room, extras, user] = await Promise.all([
    prisma.room.findFirst({ where: { slug, active: true } }),
    prisma.extra.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    getCurrentUser(),
  ]);
  if (!room) notFound();

  const today = todayISO();
  const ci = str(sp.checkIn);
  const co = str(sp.checkOut);
  const valid = !!(ci && co && isISODate(ci) && isISODate(co) && ci >= today && co > ci);
  const defaultIn = addDaysISO(today, 7);
  const promoRaw = str(sp.promo)?.trim().toUpperCase();
  const promo = promoRaw && /^[A-Z0-9]{3,20}$/.test(promoRaw) ? promoRaw : null;

  const [firstName, ...rest] = (user?.name ?? "").split(" ");

  return (
    <section className="container pb-24 pt-36 lg:pt-44">
      <Link href={`/stay/${room.slug}`} className="text-[11px] uppercase tracking-luxe text-espresso-50 hover:text-gold">← Back to {room.name}</Link>
      <h1 className="mt-4 text-display-md">Reserve your stay</h1>
      <div className="mt-12">
        <BookingWizard
          room={room}
          extras={extras.map((e) => ({ id: e.id, code: e.code, name: e.name, description: e.description, price: e.price, perGuestPerNight: e.perGuestPerNight }))}
          today={today}
          initialPromo={promo}
          prefill={user ? { firstName: firstName ?? "", lastName: rest.join(" "), email: user.email, phone: user.phone ?? "" } : null}
          initialStay={{
            checkIn: valid ? ci! : defaultIn,
            checkOut: valid ? co! : addDaysISO(defaultIn, 3),
            rooms: num(str(sp.rooms), 1, 1, 5),
            adults: num(str(sp.adults), Math.min(2, room.maxAdults), 1, 12),
            children: num(str(sp.children), 0, 0, 6),
          }}
        />
      </div>
    </section>
  );
}
