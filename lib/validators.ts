import { z } from "zod";
import { isISODate } from "@/lib/dates";

export const isoDate = z
  .string({ required_error: "Date is required" })
  .refine((v) => isISODate(v), "Use a valid date (YYYY-MM-DD)");

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(160);
const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Enter a valid phone number")
  .regex(/^[+\d\s()-]+$/, "Enter a valid phone number");

export const stayQuerySchema = z
  .object({
    checkIn: isoDate,
    checkOut: isoDate,
    rooms: z.coerce.number().int().min(1).max(5).default(1),
    adults: z.coerce.number().int().min(1).max(30).default(2),
    children: z.coerce.number().int().min(0).max(20).default(0),
  })
  .refine((v) => v.checkOut > v.checkIn, { message: "Check-out must be after check-in", path: ["checkOut"] });

export const quoteSchema = z
  .object({
    slug: z.string().min(1),
    checkIn: isoDate,
    checkOut: isoDate,
    rooms: z.coerce.number().int().min(1).max(5),
    adults: z.coerce.number().int().min(1).max(30),
    children: z.coerce.number().int().min(0).max(20),
    extras: z.array(z.string().max(60)).max(10).default([]),
    promoCode: z.string().trim().max(30).optional().nullable(),
  })
  .refine((v) => v.checkOut > v.checkIn, { message: "Check-out must be after check-in", path: ["checkOut"] });

export const guestSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email,
  phone,
  country: z.string().trim().min(2, "Country is required").max(60),
  arrivalTime: z.string().trim().max(30).optional().nullable(),
  requests: z.string().trim().max(1000).optional().nullable(),
});

export const paymentSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("CARD"),
    cardName: z.string().trim().min(2, "Name on card is required").max(80),
    cardNumber: z
      .string()
      .transform((v) => v.replace(/\s+/g, ""))
      .refine((v) => /^\d{13,19}$/.test(v), "Enter a valid card number"),
    expiry: z
      .string()
      .trim()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
      .refine((v) => {
        const [mm, yy] = v.split("/").map(Number);
        const end = new Date(Date.UTC(2000 + yy, mm, 1));
        return end > new Date();
      }, "Card has expired"),
    cvc: z.string().trim().regex(/^\d{3,4}$/, "Enter a valid CVC"),
  }),
  z.object({
    method: z.literal("UPI"),
    upiId: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/, "Enter a valid UPI ID (e.g. name@bank)"),
  }),
  z.object({ method: z.literal("PAY_AT_HOTEL") }),
]);

export const bookingSchema = z.object({
  stay: quoteSchema,
  guest: guestSchema,
  payment: paymentSchema,
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "Please accept the booking terms" }) }),
});

export const lookupSchema = z.object({
  ref: z.string().trim().min(4, "Enter your booking reference").max(20),
  email,
});

export const cancelSchema = z.object({
  email: z.string().trim().toLowerCase().email().optional(),
});

export const reservationKinds = ["DINING", "SPA", "EXPERIENCE", "CELEBRATION", "CONTACT"] as const;

export const reservationSchema = z
  .object({
    kind: z.enum(reservationKinds),
    item: z.string().trim().min(1, "Please choose an option").max(120),
    name: z.string().trim().min(2, "Name is required").max(100),
    email,
    phone: z.union([phone, z.literal("")]).optional().nullable(),
    date: z.union([isoDate, z.literal("")]).optional().nullable(),
    time: z.string().trim().max(20).optional().nullable(),
    guests: z.coerce.number().int().min(1).max(500).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .superRefine((v, ctx) => {
    if (v.kind !== "CONTACT" && v.kind !== "CELEBRATION") {
      if (!v.date) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please choose a date", path: ["date"] });
      if (!v.time) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please choose a time", path: ["time"] });
      if (!v.guests) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Number of guests is required", path: ["guests"] });
    }
    if (v.kind === "CONTACT" && !v.notes) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please write a message", path: ["notes"] });
    }
  });

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email,
  phone: z.union([phone, z.literal("")]).optional().nullable(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(/[A-Za-z]/, "Password must include a letter")
    .regex(/\d/, "Password must include a number"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required").max(100),
});

export const newsletterSchema = z.object({ email });

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),
  location: z
    .string()
    .trim()
    .max(80, "Location is too long")
    .optional()
    .nullable()
    .transform((v) => (v ? v : null)),
  rating: z.coerce.number().int().min(1, "Please choose a rating").max(5, "Please choose a rating"),
  title: z.string().trim().min(3, "Please add a short title").max(100, "Title is too long"),
  comment: z.string().trim().min(20, "Please write at least 20 characters").max(2000, "Review is too long (2000 characters max)"),
  bookingRef: z
    .string()
    .trim()
    .max(20)
    .optional()
    .nullable()
    .transform((v) => (v ? v.toUpperCase() : null)),
});

export const reviewStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export function zodMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid request";
}

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
