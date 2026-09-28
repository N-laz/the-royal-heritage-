"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";

export function safeNext(next: string | undefined | null, fallback = "/account") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export default function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sign in failed.");
      const fallback = data.user?.role === "ADMIN" ? "/admin" : "/account";
      router.push(safeNext(next, fallback));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
      {error && <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Signing in…" : "Sign In"}</button>
      <p className="text-center text-sm text-espresso-50">
        New to The Royal Heritage?{" "}
        <Link href={`/register${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="text-gold hover:text-espresso">Create an account</Link>
      </p>
    </form>
  );
}
