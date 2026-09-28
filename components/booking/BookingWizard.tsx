"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepDatesExtras from "@/components/booking/StepDatesExtras";
import StepGuestDetails, { type GuestState } from "@/components/booking/StepGuestDetails";
import StepPayment, { type PaymentState } from "@/components/booking/StepPayment";
import PriceSummary from "@/components/booking/PriceSummary";
import { useQuote } from "@/components/booking/useQuote";
import type { StayState } from "@/components/rooms/BookingPanel";
import { formatDate, formatINR, plural } from "@/lib/format";
import type { ExtraOption, RoomSummary } from "@/types";

const STEPS = ["Dates & Extras", "Guest Details", "Payment"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d\s()-]{7,20}$/;

export default function BookingWizard({
  room,
  extras,
  today,
  initialStay,
  initialPromo,
  prefill,
}: {
  room: RoomSummary;
  extras: ExtraOption[];
  today: string;
  initialStay: StayState;
  initialPromo: string | null;
  prefill: { firstName: string; lastName: string; email: string; phone: string } | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stay, setStay] = useState<StayState>(initialStay);
  const [selected, setSelected] = useState<string[]>([]);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(initialPromo);
  const [promoMessage, setPromoMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [guest, setGuest] = useState<GuestState>({
    firstName: prefill?.firstName ?? "",
    lastName: prefill?.lastName ?? "",
    email: prefill?.email ?? "",
    phone: prefill?.phone ?? "",
    country: "India",
    arrivalTime: "",
    requests: "",
  });
  const [payment, setPayment] = useState<PaymentState>({ method: "CARD", cardName: "", cardNumber: "", expiry: "", cvc: "", upiId: "" });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { quote, error: quoteError, loading } = useQuote({ slug: room.slug, ...stay, extras: selected, promoCode: appliedPromo });

  useEffect(() => {
    if (!quote || !appliedPromo) return;
    if (quote.promoError) {
      setPromoMessage({ type: "error", text: quote.promoError });
      setAppliedPromo(null);
    } else if (quote.breakdown.promo) {
      setPromoMessage({ type: "success", text: `${quote.breakdown.promo.label} — you save ${formatINR(quote.breakdown.discount)}.` });
    }
  }, [quote, appliedPromo]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function toggleExtra(code: string) {
    setSelected((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return setPromoMessage({ type: "error", text: "Enter a promo code." });
    setPromoMessage(null);
    setAppliedPromo(code);
    setPromoInput("");
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoMessage(null);
  }

  const stayError = quoteError || (quote?.occupancyError ?? "") || (quote?.soldOut ? (quote.available > 0 ? `Only ${quote.available} available for these dates.` : "Sold out for these dates. Please choose other dates.") : "");

  function validateGuest(): boolean {
    const e: Record<string, string> = {};
    if (!guest.firstName.trim()) e.firstName = "First name is required";
    if (!guest.lastName.trim()) e.lastName = "Last name is required";
    if (!EMAIL_RE.test(guest.email.trim())) e.email = "Enter a valid email address";
    if (!PHONE_RE.test(guest.phone.trim())) e.phone = "Enter a valid phone number";
    if (!guest.country) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment(): boolean {
    const e: Record<string, string> = {};
    if (payment.method === "CARD") {
      if (payment.cardName.trim().length < 2) e.cardName = "Name on card is required";
      if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ""))) e.cardNumber = "Enter a valid card number";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) e.expiry = "Use MM/YY";
      if (!/^\d{3,4}$/.test(payment.cvc)) e.cvc = "Enter a valid CVC";
    }
    if (payment.method === "UPI" && !/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(payment.upiId)) e.upiId = "Enter a valid UPI ID (e.g. name@bank)";
    if (!acceptTerms) e.acceptTerms = "Please accept the booking terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    setSubmitError("");
    if (step === 0) {
      if (!quote || stayError) return setSubmitError(stayError || "Please choose valid dates.");
      setStep(1);
    } else if (step === 1) {
      if (validateGuest()) setStep(2);
    }
  }

  async function submit() {
    setSubmitError("");
    if (!validatePayment()) return;
    setSubmitting(true);
    try {
      const paymentBody =
        payment.method === "CARD"
          ? { method: "CARD", cardName: payment.cardName, cardNumber: payment.cardNumber, expiry: payment.expiry, cvc: payment.cvc }
          : payment.method === "UPI"
            ? { method: "UPI", upiId: payment.upiId }
            : { method: "PAY_AT_HOTEL" };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stay: { slug: room.slug, ...stay, extras: selected, promoCode: appliedPromo },
          guest: { ...guest, arrivalTime: guest.arrivalTime || null, requests: guest.requests || null },
          payment: paymentBody,
          acceptTerms,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const fields: Record<string, string> = data.fields ?? {};
        const guestErrors: Record<string, string> = {};
        const paymentErrors: Record<string, string> = {};
        for (const [k, v] of Object.entries(fields)) {
          if (k.startsWith("guest.")) guestErrors[k.slice(6)] = v;
          if (k.startsWith("payment.")) paymentErrors[k.slice(8)] = v;
        }
        if (Object.keys(guestErrors).length) {
          setErrors(guestErrors);
          setStep(1);
        } else if (Object.keys(paymentErrors).length) {
          setErrors(paymentErrors);
        }
        if (res.status === 409 || Object.keys(fields).some((k) => k.startsWith("stay."))) setStep(0);
        throw new Error(data.error ?? "Booking failed. Please try again.");
      }
      router.push(`/confirmation/${data.ref}`);
      router.refresh();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Booking failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
      <div>
        <ol className="mb-12 grid grid-cols-3 border-b border-ivory-400">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => i < step && setStep(i)}
                className={`w-full border-b-2 pb-4 text-left transition-colors ${i === step ? "border-gold" : i < step ? "border-espresso/40" : "border-transparent"} disabled:cursor-default`}
              >
                <span className={`font-serif text-2xl ${i <= step ? "text-gold" : "text-espresso-50/50"}`}>0{i + 1}</span>
                <span className={`mt-1 block text-[10px] uppercase tracking-wider2 sm:text-[11px] ${i <= step ? "text-espresso" : "text-espresso-50/60"}`}>{label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div key={step} className="animate-fade-up">
          {step === 0 && (
            <StepDatesExtras
              room={room}
              today={today}
              stay={stay}
              setStay={setStay}
              extras={extras}
              selected={selected}
              toggleExtra={toggleExtra}
              promoInput={promoInput}
              setPromoInput={setPromoInput}
              appliedPromo={appliedPromo}
              applyPromo={applyPromo}
              removePromo={removePromo}
              promoMessage={promoMessage}
            />
          )}
          {step === 1 && <StepGuestDetails guest={guest} setGuest={setGuest} errors={errors} signedIn={!!prefill} />}
          {step === 2 && (
            <StepPayment
              payment={payment}
              setPayment={setPayment}
              errors={errors}
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
              total={quote?.breakdown.total ?? null}
              cancellation={room.cancellation}
            />
          )}
        </div>

        {(submitError || (step === 0 && stayError)) && (
          <p className="mt-8 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{submitError || stayError}</p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-ivory-400 pt-8">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="btn-outline">← Back</button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <button type="button" onClick={next} disabled={loading || !quote} className="btn-primary">Continue →</button>
          ) : (
            <button type="button" onClick={submit} disabled={submitting || !quote} className="btn-gold min-w-[220px]">
              {submitting && <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />}
              {payment.method === "PAY_AT_HOTEL" ? "Confirm Reservation" : `Pay ${quote ? formatINR(quote.breakdown.total) : ""}`}
            </button>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-ivory-400 bg-ivory-50 shadow-soft">
          <div className="relative aspect-[16/9]">
            <Image src={room.images[0]} alt={room.name} fill sizes="400px" className="object-cover" />
          </div>
          <div className="p-6">
            <p className="eyebrow">{room.category}</p>
            <h3 className="mt-2 text-2xl">{room.name}</h3>
            <div className="mt-4 space-y-1 text-sm text-espresso-50">
              <p>{stay.checkIn && formatDate(stay.checkIn)} → {stay.checkOut && formatDate(stay.checkOut)}</p>
              <p>{plural(stay.rooms, "room")} · {plural(stay.adults, "adult")}{stay.children ? ` · ${plural(stay.children, "child", "children")}` : ""}</p>
            </div>
            <div className={`mt-6 border-t border-ivory-400 pt-6 transition-opacity ${loading ? "opacity-50" : ""}`}>
              {quote ? <PriceSummary breakdown={quote.breakdown} /> : <p className="text-sm text-espresso-50">{quoteError || "Calculating…"}</p>}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
