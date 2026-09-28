"use client";

import { useState, type FormEvent } from "react";
import { Input, Select, Textarea } from "@/components/ui/Input";

const SUBJECTS = ["Reservations", "Weddings & Events", "Dining", "Spa & Wellness", "Press & Media", "Careers", "Other"];

export default function ContactForm() {
  const [form, setForm] = useState({ item: SUBJECTS[0], name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

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
        body: JSON.stringify({ kind: "CONTACT", ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields ?? {});
        throw new Error(data.error ?? "Please check the form.");
      }
      setRef(data.ref);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-ivory-400 bg-ivory-50 p-10 text-center">
        <p className="eyebrow">Message received</p>
        <p className="mt-4 font-serif text-3xl">Thank you, {form.name.split(" ")[0]}</p>
        <p className="mt-3 text-sm text-espresso-50">
          Our team will reply within 24 hours. Your reference is <strong className="tracking-wider2 text-gold-dark">{ref}</strong>.
        </p>
        <button
          onClick={() => {
            setForm({ item: SUBJECTS[0], name: "", email: "", phone: "", notes: "" });
            setStatus("idle");
          }}
          className="btn-outline mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 border border-ivory-400 bg-ivory-50 p-6 sm:grid-cols-2 sm:p-10">
      <Input label="Full name *" name="name" value={form.name} onChange={set("name")} error={errors.name} required />
      <Input label="Email *" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required />
      <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} />
      <Select label="Subject" name="item" value={form.item} onChange={set("item")}>
        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
      </Select>
      <Textarea className="sm:col-span-2" label="Message *" name="notes" rows={6} value={form.notes} onChange={set("notes")} error={errors.notes} required />
      {error && <p className="sm:col-span-2 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="btn-primary">{status === "loading" ? "Sending…" : "Send message"}</button>
      </div>
    </form>
  );
}
