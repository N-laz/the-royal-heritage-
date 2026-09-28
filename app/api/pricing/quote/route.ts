import { NextResponse } from "next/server";
import { quoteSchema, zodMessage } from "@/lib/validators";
import { buildQuote } from "@/lib/quote";
import { jsonError, readJson } from "@/lib/http";
import type { QuoteResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error));

  const quote = await buildQuote(parsed.data);
  if (!quote.ok) return jsonError(quote.error, quote.status);

  const body: QuoteResponse = {
    ok: true,
    breakdown: quote.breakdown,
    available: quote.available,
    soldOut: quote.soldOut,
    promoError: quote.promoError,
    occupancyError: quote.occupancyError,
  };
  return NextResponse.json(body);
}
