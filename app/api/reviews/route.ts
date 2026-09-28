import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { reviewSchema, zodFieldErrors, zodMessage } from "@/lib/validators";
import { jsonError, readJson } from "@/lib/http";
import { normalizeRef } from "@/lib/ref";
import { todayDate } from "@/lib/dates";
import { getApprovedReviews, getReviewStats } from "@/lib/reviews";
import { sendEmail } from "@/lib/email/mailer";
import { reviewReceivedEmail } from "@/lib/email/review-received";

export const dynamic = "force-dynamic";

export async function GET() {
  const [reviews, stats] = await Promise.all([getApprovedReviews(50), getReviewStats()]);
  return NextResponse.json({ ok: true, reviews, stats });
}

export async function POST(request: Request) {
  const parsed = reviewSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error), 400, zodFieldErrors(parsed.error));
  const data = parsed.data;

  const recent = await prisma.review.count({
    where: { email: data.email, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });
  if (recent >= 3) return jsonError("You have already shared a few reviews today. Please try again tomorrow.", 429);

  let verified = false;
  let roomName: string | null = null;
  let bookingRef: string | null = null;

  if (data.bookingRef) {
    bookingRef = normalizeRef(data.bookingRef);
    const booking = await prisma.booking.findFirst({
      where: { ref: bookingRef, email: { equals: data.email, mode: "insensitive" } },
      include: { room: { select: { name: true } } },
    });
    if (!booking) {
      return jsonError("That booking reference doesn't match this email.", 400, { bookingRef: "Reference and email don't match" });
    }
    if (booking.status === "CANCELLED") {
      return jsonError("Reviews can't be added for a cancelled booking.", 400, { bookingRef: "This booking was cancelled" });
    }
    if (booking.checkIn > todayDate()) {
      return jsonError("You can review this booking once your stay has begun. You're welcome to leave a review without the reference.", 400, {
        bookingRef: "Stay hasn't started yet",
      });
    }
    verified = true;
    roomName = booking.room.name;
  }

  try {
    await prisma.review.create({
      data: {
        name: data.name,
        email: data.email,
        location: data.location,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        roomName,
        bookingRef,
        verified,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return jsonError("A review has already been submitted for this booking.", 409, { bookingRef: "Already reviewed" });
    }
    throw error;
  }

  const mail = reviewReceivedEmail({ name: data.name, rating: data.rating, title: data.title });
  await sendEmail({ to: data.email, ...mail });

  return NextResponse.json({ ok: true, verified, message: "Thank you — your review will appear once approved." }, { status: 201 });
}
