import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ReviewSummary from "@/components/reviews/ReviewSummary";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewForm from "@/components/reviews/ReviewForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { getApprovedReviews, getReviewStats } from "@/lib/reviews";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Read what our guests say about The Royal Heritage — and share your own stay.",
};

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const [reviews, stats, user] = await Promise.all([getApprovedReviews(100), getReviewStats(), getCurrentUser()]);

  return (
    <>
      <PageHero image="/img/couple-villa.webp" eyebrow="Guest Reviews" title="In our guests' words" subtitle="Honest reflections from those who have stayed with us — and a place to share your own." height="short" />

      <section className="container py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <ReviewSummary stats={stats} />
          </aside>
          <ReviewList reviews={reviews} />
        </div>
      </section>

      <section id="write" className="scroll-mt-28 bg-ivory-200 py-20 sm:py-28">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Share your stay" title="Write a review" description="Tell us what made your time with us memorable. Reviews appear once approved by our guest relations team." />
          <div className="mt-12">
            <ReviewForm defaults={{ name: user?.name, email: user?.email, bookingRef: ref }} />
          </div>
        </div>
      </section>
    </>
  );
}
