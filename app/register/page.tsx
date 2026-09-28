import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Create Account" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const session = await getSession();
  if (session) redirect("/account");
  return (
    <AuthShell eyebrow="Join us" title="Create your account" subtitle="Keep all your Royal Heritage stays in one place." image="/img/villa-pool.webp">
      <RegisterForm next={next} />
    </AuthShell>
  );
}
