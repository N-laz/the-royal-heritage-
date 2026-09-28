"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import StarInput from "@/components/reviews/StarInput";
import { useToast } from "@/components/ui/Toast";

type Defaults = { name?: string; email?: string; bookingRef?: string };

const EMPTY = { name: "", email: "", location: "", title: "", comment: "", bookingRef: "" };

export default function ReviewForm({ defaults = {} }: { defaults?: Defaults }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState({ ...EMPTY, name: defaults.name ?? "", email: defaults.email ?? "", bookingRef: defaults.bookingRef ?? "" });
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ verified: boolean } | null>(null);

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setErrors({});
    if (!rating) {
      setErrors({ rating: "Please choose a rating" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating, location: form.location || null, bookingRef: form.bookingRef || null }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields ?? {});
        throw new Error(data.error ?? "Could not submit your review.");
      }
      setDone({ verified: data.verified });
      toast("Thank you — your review has been received.", "success");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your review.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="border border-gold/40 bg-ivory-50 p-10 text-center">
        <p className="eyebrow">Thank you</p>
        <p className="mt-4 font-serif text-3xl">Your review has been received</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-espresso-50">
          {done.verified ? "It is linked to your stay and marked as a verified guest review. " : ""}
          It will appear on this page once our guest relations team has approved it. A thank-you note is on its way to your inbox.
        </p>
        <button
          type="button"
          className="btn-outline mt-8"
          onClick={() => {
            setDone(null);
            setRating(0);
            setForm({ ...EMPTY, name: form.name, email: form.email });
          }}
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6 border border-ivory-400 bg-ivory-50 p-6 sm:p-10" noValidate>
      <StarInput value={rating} onChange={setRating} error={errors.rating} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" name="name" value={form.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <Input label="Email" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required autoComplete="email" hint="Never shown publicly." />
        <Input label="City / Country (optional)" name="location" value={form.location} onChange={set("location")} error={errors.location} placeholder="Mumbai, India" />
        <Input
          label="Booking reference (optional)"
          name="bookingRef"
          value={form.bookingRef}
          onChange={set("bookingRef")}
          error={errors.bookingRef}
          placeholder="RH-XXXXXX"
          hint="Add it to get a Verified Guest badge."
        />
      </div>
      <Input label="Title" name="title" value={form.title} onChange={set("title")} error={errors.title} required maxLength={100} placeholder="Sum up your stay in a few words" />
      <div>
        <Textarea
          label="Your review"
          name="comment"
          rows={6}
          value={form.comment}
          onChange={set("comment")}
          error={errors.comment}
          required
          maxLength={2000}
          placeholder="Tell us about your room, the service, dining, spa — anything that made your stay special."
        />
        <p className="mt-1.5 text-right text-xs text-espresso-50">{form.comment.length} / 2000</p>
      </div>
      {error && <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
