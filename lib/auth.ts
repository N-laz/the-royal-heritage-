import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/jwt";

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN";
};

/** Reads the session and confirms the user still exists (and their current role) in the database. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, name: true, phone: true, role: true },
  });
  return user;
}

export async function requireAdmin(): Promise<CurrentUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function attachSession(response: NextResponse, user: { id: string; email: string; name: string; role: "CUSTOMER" | "ADMIN" }) {
  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}

export function clearSession(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
