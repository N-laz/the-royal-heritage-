import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const session = await getSession();
  if (session) redirect(session.role === "ADMIN" ? "/admin" : "/account");
  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to your account" subtitle="View your stays, book faster and enjoy members-only privileges." image="/img/suite-royal.webp">
      <LoginForm next={next} />
    </AuthShell>
  );
}
