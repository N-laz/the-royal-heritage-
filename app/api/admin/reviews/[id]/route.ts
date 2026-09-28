import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonError, readJson } from "@/lib/http";
import { reviewStatusSchema, zodMessage } from "@/lib/validators";
import { toReviewView } from "@/lib/reviews";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Admin access required.", 403);
  const { id } = await params;
  const parsed = reviewStatusSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error));

  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) return jsonError("Review not found.", 404);

  const review = await prisma.review.update({ where: { id }, data: { status: parsed.data.status } });
  return NextResponse.json({ ok: true, review: toReviewView(review) });
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Admin access required.", 403);
  const { id } = await params;
  const existing = await prisma.review.findUnique({ where: { id } });
  if (!existing) return jsonError("Review not found.", 404);
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
