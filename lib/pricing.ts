import { eachNight, nightsBetween, toISODate } from "@/lib/dates";

export const WEEKEND_UPLIFT = 0.12;
export const FESTIVE_UPLIFT = 0.25;
export const GST_RATE = 0.18;

/** Friday and Saturday nights. */
export function isWeekendNight(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 5 || day === 6;
}

/** 20 December – 5 January (inclusive). */
export function isFestiveNight(date: Date): boolean {
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  return (month === 11 && day >= 20) || (month === 0 && day <= 5);
}

export function nightlyRate(baseRate: number, date: Date): number {
  let rate = baseRate;
  if (isWeekendNight(date)) rate *= 1 + WEEKEND_UPLIFT;
  if (isFestiveNight(date)) rate *= 1 + FESTIVE_UPLIFT;
  return Math.round(rate);
}

export type NightRate = {
  date: string;
  rate: number;
  weekend: boolean;
  festive: boolean;
};

export type PricingPromo = {
  code: string;
  label: string;
  pct: number;
};

export type PricingExtra = {
  id: string;
  code: string;
  name: string;
  price: number;
  perGuestPerNight: boolean;
};

export type PriceLine = {
  id: string;
  code: string;
  name: string;
  detail: string;
  amount: number;
};

export type PriceBreakdown = {
  nights: number;
  rooms: number;
  guests: number;
  nightly: NightRate[];
  roomTotal: number;
  promo: PricingPromo | null;
  discount: number;
  extras: PriceLine[];
  extrasTotal: number;
  subtotal: number;
  tax: number;
  total: number;
};

export type PricingInput = {
  baseRate: number;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  adults: number;
  children: number;
  extras: PricingExtra[];
  promo?: PricingPromo | null;
};

export function calculatePrice(input: PricingInput): PriceBreakdown {
  const nightsList = eachNight(input.checkIn, input.checkOut);
  const nights = nightsBetween(input.checkIn, input.checkOut);
  const guests = input.adults + input.children;

  const nightly: NightRate[] = nightsList.map((d) => ({
    date: toISODate(d),
    rate: nightlyRate(input.baseRate, d),
    weekend: isWeekendNight(d),
    festive: isFestiveNight(d),
  }));

  const perRoomTotal = nightly.reduce((sum, n) => sum + n.rate, 0);
  const roomTotal = perRoomTotal * input.rooms;

  const promo = input.promo ?? null;
  const discount = promo ? Math.round((roomTotal * promo.pct) / 100) : 0;

  const extras: PriceLine[] = input.extras.map((extra) => {
    if (extra.perGuestPerNight) {
      return {
        id: extra.id,
        code: extra.code,
        name: extra.name,
        detail: `₹${extra.price.toLocaleString("en-IN")} × ${guests} guest${guests === 1 ? "" : "s"} × ${nights} night${nights === 1 ? "" : "s"}`,
        amount: extra.price * guests * nights,
      };
    }
    return { id: extra.id, code: extra.code, name: extra.name, detail: "Per stay", amount: extra.price };
  });

  const extrasTotal = extras.reduce((sum, e) => sum + e.amount, 0);
  const subtotal = roomTotal - discount + extrasTotal;
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + tax;

  return {
    nights,
    rooms: input.rooms,
    guests,
    nightly,
    roomTotal,
    promo,
    discount,
    extras,
    extrasTotal,
    subtotal,
    tax,
    total,
  };
}
