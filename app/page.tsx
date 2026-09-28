import HeroSlideshow from "@/components/home/HeroSlideshow";
import BookingSearchBar from "@/components/home/BookingSearchBar";
import WelcomeSection from "@/components/home/WelcomeSection";
import RoomCarousel from "@/components/home/RoomCarousel";
import DiningPreview from "@/components/home/DiningPreview";
import ExperiencesGrid from "@/components/home/ExperiencesGrid";
import OffersSection from "@/components/home/OffersSection";
import Testimonials, { type TestimonialItem } from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";
import { prisma } from "@/lib/prisma";
import { addDaysISO, todayISO } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [rooms, topReviews] = await Promise.all([
    prisma.room.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    prisma.review.findMany({ where: { status: "APPROVED", rating: { gte: 4 } }, orderBy: { createdAt: "desc" }, take: 6 }),
  ]);
  const testimonials: TestimonialItem[] = topReviews.map((r) => ({
    quote: r.comment.length > 260 ? `${r.comment.slice(0, 257).trimEnd()}…` : r.comment,
    name: r.name,
    location: r.location ?? "",
    stay: r.roomName ?? "",
    rating: r.rating,
  }));
  const today = todayISO();
  const checkIn = addDaysISO(today, 7);

  return (
    <>
      <HeroSlideshow>
        <BookingSearchBar today={today} initial={{ checkIn, checkOut: addDaysISO(checkIn, 3), rooms: 1, adults: 2, children: 0 }} />
      </HeroSlideshow>
      <WelcomeSection />
      <RoomCarousel rooms={rooms} />
      <DiningPreview />
      <ExperiencesGrid />
      <OffersSection />
      <Testimonials items={testimonials} />
      <CtaSection />
    </>
  );
}
