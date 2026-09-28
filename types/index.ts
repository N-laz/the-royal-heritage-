import type { PriceBreakdown } from "@/lib/pricing";

export type RoomSummary = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  baseRate: number;
  size: number;
  view: string;
  bed: string;
  maxAdults: number;
  maxGuests: number;
  inventory: number;
  breakfastIncluded: boolean;
  images: string[];
  amenities: string[];
  inclusions: string[];
  cancellation: string;
};

export type ExtraOption = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  perGuestPerNight: boolean;
};

export type AvailabilityResult = {
  slug: string;
  available: number;
  canBook: boolean;
  occupancyError: string | null;
  stayTotal: number;
  avgNightly: number;
};

export type AvailabilityResponse = {
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: AvailabilityResult[];
};

export type CalendarDay = {
  date: string;
  rate: number;
  available: number;
  weekend: boolean;
  festive: boolean;
};

export type QuoteResponse =
  | {
      ok: true;
      breakdown: PriceBreakdown;
      available: number;
      soldOut: boolean;
      promoError: string | null;
      occupancyError: string | null;
    }
  | { ok: false; error: string };

export type BookingView = {
  id: string;
  ref: string;
  status: "CONFIRMED" | "CANCELLED";
  room: {
    slug: string;
    name: string;
    category: string;
    image: string;
    cancellation: string;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  arrivalTime: string | null;
  requests: string | null;
  promoCode: string | null;
  discount: number;
  roomTotal: number;
  extras: { name: string; amount: number }[];
  extrasTotal: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentLast4: string | null;
  createdAt: string;
  cancelledAt: string | null;
  canCancel: boolean;
};

export type ReservationView = {
  id: string;
  ref: string;
  kind: "DINING" | "SPA" | "EXPERIENCE" | "CELEBRATION" | "CONTACT";
  item: string;
  name: string;
  email: string;
  phone: string | null;
  date: string | null;
  time: string | null;
  guests: number | null;
  notes: string | null;
  createdAt: string;
};

export type SessionUser = {
  name: string;
  role: "CUSTOMER" | "ADMIN";
} | null;

export type ReviewView = {
  id: string;
  name: string;
  email: string;
  location: string | null;
  rating: number;
  title: string;
  comment: string;
  roomName: string | null;
  bookingRef: string | null;
  verified: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export type PublicReview = Omit<ReviewView, "email" | "bookingRef" | "status">;

export type ReviewStats = {
  count: number;
  average: number;
  distribution: { stars: number; count: number }[];
};
