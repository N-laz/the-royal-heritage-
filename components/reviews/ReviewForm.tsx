"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import StarInput from "@/components/reviews/StarInput";
import { useToast } from "@/components/ui/Toast";

type Defaults = { name?: string; email?: string; bookingRef?: string };

const EMPTY = { name: "", email: "", location: "", title: "", comment: "", bookingRef: "" };

export default function ReviewForm({ defaults = {}, dark = false }: { defaults?: Defaults; dark?: boolean }) {
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
      <div className={dark ? "border border-gold/40 bg-espresso-600/40 p-10 text-center text-ivory" : "border border-gold/40 bg-ivory-50 p-10 text-center"}>
        <p className={`eyebrow ${dark ? "text-gold-light" : ""}`}>Thank you</p>
        <p className="mt-4 font-serif text-3xl">Your review has been received</p>
        <p className={`mx-auto mt-4 max-w-md text-sm ${dark ? "text-ivory/70" : "text-espresso-50"}`}>
          {done.verified ? "It is linked to your stay and marked as a verified guest review. " : ""}
          It will appear on this page once our guest relations team has approved it. A thank-you note is on its way to your inbox.
        </p>
        <button
          type="button"
          className={`${dark ? "btn-light-dark" : "btn-outline"} mt-8`}
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
    <form onSubmit={submit} className={`space-y-6 p-6 sm:p-10 ${dark ? "card-dark" : "border border-ivory-400 bg-ivory-50"}`} noValidate>
      <StarInput value={rating} onChange={setRating} error={errors.rating} dark={dark} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input dark={dark} label="Full name" name="name" value={form.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <Input dark={dark} label="Email" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required autoComplete="email" hint="Never shown publicly." />
        <Input dark={dark} label="City / Country (optional)" name="location" value={form.location} onChange={set("location")} error={errors.location} placeholder="Mumbai, India" />
        <Input
          dark={dark}
          label="Booking reference (optional)"
          name="bookingRef"
          value={form.bookingRef}
          onChange={set("bookingRef")}
          error={errors.bookingRef}
          placeholder="RH-XXXXXX"
          hint="Add it to get a Verified Guest badge."
        />
      </div>
      <Input dark={dark} label="Title" name="title" value={form.title} onChange={set("title")} error={errors.title} required maxLength={100} placeholder="Sum up your stay in a few words" />
      <div>
        <Textarea
          dark={dark}
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
        <p className={`mt-1.5 text-right text-xs ${dark ? "text-ivory/60" : "text-espresso-50"}`}>{form.comment.length} / 2000</p>
      </div>
      {error && <p className={`border-l-2 border-red-600 px-4 py-3 text-sm ${dark ? "bg-red-950/30 text-red-200" : "bg-red-50 text-red-800"}`}>{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
