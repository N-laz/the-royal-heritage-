"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Please try again.");
      setState("done");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex border-b border-ivory/30 focus-within:border-gold-light">
        <input
          id="newsletter-email-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="w-full min-w-0 bg-transparent min-h-[44px] py-3 text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
        />
        <button id="newsletter-submit-btn" type="submit" disabled={state === "loading"} className="shrink-0 min-h-[44px] px-3 text-[11px] uppercase tracking-luxe text-gold-light transition-colors hover:text-ivory disabled:opacity-50">
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {message && <p className={`mt-3 text-xs ${state === "error" ? "text-red-300" : "text-gold-light"}`}>{message}</p>}
    </form>
  );
}
