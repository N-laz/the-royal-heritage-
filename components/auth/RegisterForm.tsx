"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { safeNext } from "@/components/auth/LoginForm";

export default function RegisterForm({ next }: { next?: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setErrors({});
    if (form.password !== form.confirm) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.fields ?? {});
        throw new Error(data.error ?? "Registration failed.");
      }
      router.push(safeNext(next, "/account"));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Input label="Full name" name="name" value={form.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
      <Input label="Email" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
      <Input label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
      <Input label="Password" name="password" type="password" value={form.password} onChange={set("password")} error={errors.password} required autoComplete="new-password" hint="At least 8 characters, including a letter and a number." />
      <Input label="Confirm password" name="confirm" type="password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} required autoComplete="new-password" />
      {error && <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Creating account…" : "Create Account"}</button>
      <p className="text-center text-sm text-espresso-50">
        Already have an account?{" "}
        <Link href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="text-gold hover:text-espresso">Sign in</Link>
      </p>
    </form>
  );
}
