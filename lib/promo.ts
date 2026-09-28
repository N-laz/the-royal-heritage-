import type { PromoCode } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { PricingPromo } from "@/lib/pricing";

export type PromoResult = { ok: true; promo: PricingPromo } | { ok: false; error: string };

export function promoCategories(promo: Pick<PromoCode, "category">): string[] | null {
  if (!promo.category) return null;
  return promo.category
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function checkPromoRules(
  promo: PromoCode,
  context: { nights: number; category: string; now?: Date },
): PromoResult {
  const now = context.now ?? new Date();
  if (!promo.active) return { ok: false, error: "This promo code is no longer active." };
  if (promo.expiresAt && promo.expiresAt < now) return { ok: false, error: "This promo code has expired." };
  if (context.nights < promo.minNights) {
    return { ok: false, error: `${promo.code} requires a minimum stay of ${promo.minNights} nights.` };
  }
  const categories = promoCategories(promo);
  if (categories && !categories.includes(context.category)) {
    return { ok: false, error: `${promo.code} is valid for ${categories.join(" & ")} only.` };
  }
  return { ok: true, promo: { code: promo.code, label: promo.label, pct: promo.pct } };
}

export async function resolvePromo(code: string | undefined | null, context: { nights: number; category: string }): Promise<PromoResult | null> {
  const normalized = code?.trim().toUpperCase();
  if (!normalized) return null;
  const promo = await prisma.promoCode.findUnique({ where: { code: normalized } });
  if (!promo) return { ok: false, error: "We couldn't find that promo code." };
  return checkPromoRules(promo, context);
}
