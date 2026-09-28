import type { Review } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { PublicReview, ReviewStats, ReviewView } from "@/types";

export function toReviewView(r: Review): ReviewView {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    location: r.location,
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    roomName: r.roomName,
    bookingRef: r.bookingRef,
    verified: r.verified,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  };
}

export function toPublicReview(r: Review): PublicReview {
  return {
    id: r.id,
    name: r.name,
    location: r.location,
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    roomName: r.roomName,
    verified: r.verified,
    createdAt: r.createdAt.toISOString(),
  };
}

export async function getReviewStats(): Promise<ReviewStats> {
  const groups = await prisma.review.groupBy({
    by: ["rating"],
    where: { status: "APPROVED" },
    _count: { _all: true },
  });
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: groups.find((g) => g.rating === stars)?._count._all ?? 0,
  }));
  const count = distribution.reduce((s, d) => s + d.count, 0);
  const sum = distribution.reduce((s, d) => s + d.stars * d.count, 0);
  return { count, average: count ? Math.round((sum / count) * 10) / 10 : 0, distribution };
}

export async function getApprovedReviews(take = 50): Promise<PublicReview[]> {
  const rows = await prisma.review.findMany({
    where: { status: "APPROVED" },
    orderBy: [{ createdAt: "desc" }],
    take,
  });
  return rows.map(toPublicReview);
}
