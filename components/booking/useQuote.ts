"use client";

import { useEffect, useState } from "react";
import type { QuoteResponse } from "@/types";

export type QuoteParams = {
  slug: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  extras: string[];
  promoCode: string | null;
};

type Success = Extract<QuoteResponse, { ok: true }>;

export function useQuote(params: QuoteParams) {
  const [quote, setQuote] = useState<Success | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const key = JSON.stringify(params);

  useEffect(() => {
    const p = JSON.parse(key) as QuoteParams;
    if (!p.checkIn || !p.checkOut || p.checkOut <= p.checkIn) {
      setQuote(null);
      setError("");
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/pricing/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
          signal: controller.signal,
        });
        const data = (await res.json()) as QuoteResponse;
        if (!data.ok) {
          setQuote(null);
          setError(data.error);
        } else {
          setQuote(data);
          setError("");
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("Could not calculate the price. Please try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [key]);

  return { quote, error, loading };
}
