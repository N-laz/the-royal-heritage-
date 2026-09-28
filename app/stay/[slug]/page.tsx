import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoomGallery from "@/components/rooms/RoomGallery";
import RoomDetail from "@/components/rooms/RoomDetail";
import RoomCard from "@/components/rooms/RoomCard";
import { prisma } from "@/lib/prisma";
import { addDaysISO, isISODate, todayISO } from "@/lib/dates";
import { formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | undefined, fallback: number, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : fallback;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const room = await prisma.room.findFirst({ where: { slug, active: true }, select: { name: true, tagline: true, images: true } });
  if (!room) return { title: "Room not found" };
  return { title: room.name, description: room.tagline, openGraph: { images: room.images.slice(0, 1) } };
}

export default async function RoomPage({ params, searchParams }: { params: Params; searchParams: SP }) {
  const { slug } = await params;
  const sp = await searchParams;
  const room = await prisma.room.findFirst({ where: { slug, active: true } });
  if (!room) notFound();

  const others = await prisma.room.findMany({ where: { active: true, NOT: { id: room.id } }, orderBy: { sortOrder: "asc" }, take: 3 });

  const today = todayISO();
  const ci = str(sp.checkIn);
  const co = str(sp.checkOut);
  const valid = !!(ci && co && isISODate(ci) && isISODate(co) && ci >= today && co > ci);
  const defaultIn = addDaysISO(today, 7);
  const promoRaw = str(sp.promo)?.trim().toUpperCase();
  const promo = promoRaw && /^[A-Z0-9]{3,20}$/.test(promoRaw) ? promoRaw : null;

  return (
    <>
      <section className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden bg-espresso">
        <Image src={room.images[0]} alt={room.name} fill priority sizes="100vw" className="animate-ken-burns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-600/60 via-espresso-600/10 to-espresso-600/85" />
        <div className="container relative pb-14 text-ivory">
          <Link href="/stay" className="text-[11px] uppercase tracking-luxe text-ivory/70 hover:text-gold-light">← All accommodation</Link>
          <p className="eyebrow mt-6 text-gold-light">{room.category} · {room.view}</p>
          <h1 className="mt-3 text-display-lg">{room.name}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <p className="font-serif text-2xl">From {formatINR(room.baseRate)} <span className="text-sm text-ivory/60">/ night</span></p>
            <a href="#calendar" className="btn-light !py-3">Check availability</a>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <RoomGallery images={room.images} name={room.name} />
      </section>

      <section className="container pb-24">
        <RoomDetail
          room={room}
          today={today}
          promo={promo}
          initial={{
            checkIn: valid ? ci! : defaultIn,
            checkOut: valid ? co! : addDaysISO(defaultIn, 3),
            rooms: num(str(sp.rooms), 1, 1, 5),
            adults: num(str(sp.adults), Math.min(2, room.maxAdults), 1, 12),
            children: num(str(sp.children), 0, 0, 6),
          }}
        />
      </section>

      <section className="bg-ivory-300/60 py-24">
        <div className="container">
          <p className="eyebrow text-center">Continue exploring</p>
          <h2 className="mt-3 text-center text-display-sm">Other residences</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {others.map((r) => <RoomCard key={r.id} room={r} />)}
          </div>
        </div>
      </section>
    </>
  );
}
