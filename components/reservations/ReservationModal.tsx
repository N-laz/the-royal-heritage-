"use client";

import { useEffect, useState, type FormEvent } from "react";
import Modal from "@/components/ui/Modal";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { todayISO } from "@/lib/dates";

export type ReservationKind = "DINING" | "SPA" | "EXPERIENCE" | "CELEBRATION" | "CONTACT";

const TITLES: Record<ReservationKind, { eyebrow: string; title: string; cta: string }> = {
  DINING: { eyebrow: "Dining", title: "Reserve a table", cta: "Reserve table" },
  SPA: { eyebrow: "The Royal Spa", title: "Book a treatment", cta: "Book treatment" },
  EXPERIENCE: { eyebrow: "Experiences", title: "Reserve an experience", cta: "Reserve" },
  CELEBRATION: { eyebrow: "Celebrations", title: "Plan your celebration", cta: "Send enquiry" },
  CONTACT: { eyebrow: "Contact", title: "Send us a message", cta: "Send" },
};

function to12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

export default function ReservationModal({
  open,
  onClose,
  kind,
  item,
  options,
  times,
}: {
  open: boolean;
  onClose: () => void;
  kind: ReservationKind;
  item?: string;
  options?: string[];
  times?: string[];
}) {
  const meta = TITLES[kind];
  const needsSlot = kind === "DINING" || kind === "SPA" || kind === "EXPERIENCE";
  const [form, setForm] = useState({ item: item ?? options?.[0] ?? "", name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<{ ref: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, item: item ?? options?.[0] ?? f.item }));
      setStatus("idle");
      setResult(null);
      setError("");
      setErrors({});
    }
  }, [open, item, options]);

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setErrors({});
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          item: form.item,
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time || null,
          guests: form.guests ? Number(form.guests) : null,
          notes: form.notes || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields ?? {});
        throw new Error(data.error ?? "Please check the form and try again.");
      }
      setResult({ ref: data.ref });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("idle");
    }
  }

  return (
    <Modal open={open} onClose={onClose} eyebrow={meta.eyebrow} title={status === "done" ? "Thank you" : meta.title}>
      {status === "done" && result ? (
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12.5l5 5L20 6.5" /></svg>
          </div>
          <p className="mt-6 font-serif text-2xl">{needsSlot ? "Your reservation is confirmed" : "We've received your request"}</p>
          <p className="mt-3 text-sm text-espresso-50">
            Reference <strong className="tracking-wider2 text-gold-dark">{result.ref}</strong>. A confirmation has been sent to {form.email}.
          </p>
          <button onClick={onClose} className="btn-primary mt-8">Close</button>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          {options && options.length > 0 ? (
            <Select className="sm:col-span-2" label={kind === "CONTACT" ? "Subject" : "Selection"} name="item" value={form.item} onChange={set("item")} error={errors.item}>
              {options.map((o) => <option key={o}>{o}</option>)}
            </Select>
          ) : (
            <div className="sm:col-span-2 border-l-2 border-gold bg-ivory-200/60 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider2 text-espresso-50">Selection</p>
              <p className="font-serif text-xl">{form.item}</p>
            </div>
          )}
          {kind !== "CONTACT" && (
            <>
              <Input label={needsSlot ? "Date *" : "Preferred date"} name="date" type="date" min={todayISO()} value={form.date} onChange={set("date")} error={errors.date} required={needsSlot} />
              {needsSlot && times ? (
                <Select label="Time *" name="time" value={form.time} onChange={set("time")} error={errors.time} required>
                  <option value="">Select a time</option>
                  {times.map((t) => <option key={t} value={t}>{to12h(t)}</option>)}
                </Select>
              ) : (
                <Input label="Expected guests" name="guests" type="number" min={1} max={500} value={form.guests} onChange={set("guests")} error={errors.guests} />
              )}
              {needsSlot && (
                <Input label="Guests *" name="guests" type="number" min={1} max={50} value={form.guests} onChange={set("guests")} error={errors.guests} required />
              )}
            </>
          )}
          <Input label="Full name *" name="name" value={form.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
          <Input label="Email *" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
          <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
          <Textarea
            className="sm:col-span-2"
            label={kind === "CONTACT" ? "Message *" : "Notes"}
            name="notes"
            value={form.notes}
            onChange={set("notes")}
            error={errors.notes}
            placeholder={kind === "CONTACT" ? "How can we help?" : "Dietary requirements, occasion, preferences…"}
          />
          {error && <p className="sm:col-span-2 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" disabled={status === "loading"} className="btn-primary min-w-[180px]">
              {status === "loading" ? "Sending…" : meta.cta}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
