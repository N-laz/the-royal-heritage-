"use client";

import { Input } from "@/components/ui/Input";
import { formatINR } from "@/lib/format";

export type PaymentMethod = "CARD" | "UPI" | "PAY_AT_HOTEL";

export type PaymentState = {
  method: PaymentMethod;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  upiId: string;
};

const METHODS: { id: PaymentMethod; label: string; note: string }[] = [
  { id: "CARD", label: "Credit / Debit Card", note: "Visa, Mastercard, Amex, RuPay" },
  { id: "UPI", label: "UPI", note: "GPay, PhonePe, Paytm, BHIM" },
  { id: "PAY_AT_HOTEL", label: "Pay at Hotel", note: "Settle on departure" },
];

function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export default function StepPayment({
  payment,
  setPayment,
  errors,
  acceptTerms,
  setAcceptTerms,
  total,
  cancellation,
}: {
  payment: PaymentState;
  setPayment: (p: PaymentState) => void;
  errors: Record<string, string>;
  acceptTerms: boolean;
  setAcceptTerms: (v: boolean) => void;
  total: number | null;
  cancellation: string;
}) {
  return (
    <div>
      <h2 className="text-3xl">Payment</h2>
      <p className="mt-2 text-sm text-espresso-50">
        This is a secure demo checkout — no real payment is taken. Card details are never stored; only the last four digits are saved.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {METHODS.map((m) => (
          <button
            type="button"
            key={m.id}
            onClick={() => setPayment({ ...payment, method: m.id })}
            className={`border p-4 text-left transition-colors ${payment.method === m.id ? "border-espresso bg-espresso text-ivory" : "border-ivory-400 bg-ivory-50 hover:border-gold"}`}
            aria-pressed={payment.method === m.id}
          >
            <p className="text-sm font-medium">{m.label}</p>
            <p className={`mt-1 text-xs ${payment.method === m.id ? "text-ivory/60" : "text-espresso-50"}`}>{m.note}</p>
          </button>
        ))}
      </div>

      <div className="mt-8">
        {payment.method === "CARD" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Input className="sm:col-span-2" label="Name on card *" name="cardName" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} error={errors.cardName} autoComplete="cc-name" />
            <Input
              className="sm:col-span-2"
              label="Card number *"
              name="cardNumber"
              inputMode="numeric"
              value={payment.cardNumber}
              onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
              error={errors.cardNumber}
              placeholder="4242 4242 4242 4242"
              autoComplete="cc-number"
            />
            <Input label="Expiry *" name="expiry" inputMode="numeric" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })} error={errors.expiry} placeholder="MM/YY" autoComplete="cc-exp" />
            <Input label="CVC *" name="cvc" inputMode="numeric" type="password" value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} error={errors.cvc} placeholder="123" autoComplete="cc-csc" />
          </div>
        )}
        {payment.method === "UPI" && (
          <Input label="UPI ID *" name="upiId" value={payment.upiId} onChange={(e) => setPayment({ ...payment, upiId: e.target.value.trim() })} error={errors.upiId} placeholder="yourname@okhdfcbank" hint="You'll receive a payment request on your UPI app (simulated)." />
        )}
        {payment.method === "PAY_AT_HOTEL" && (
          <div className="border-l-2 border-gold bg-ivory-50 px-5 py-4 text-sm leading-relaxed text-espresso-50">
            Your reservation is guaranteed without prepayment. The full amount{total ? ` of ${formatINR(total)}` : ""} is payable at the resort on departure. A valid photo ID is required at check-in.
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-ivory-400 pt-6">
        <p className="text-xs leading-relaxed text-espresso-50"><strong className="text-espresso">Cancellation:</strong> {cancellation}</p>
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#A8834B]" />
          <span>I agree to the booking terms, cancellation policy and resort privacy policy.</span>
        </label>
        {errors.acceptTerms && <p className="field-error">{errors.acceptTerms}</p>}
      </div>
    </div>
  );
}
