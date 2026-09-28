import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loginSchema, zodMessage } from "@/lib/validators";
import { verifyPassword } from "@/lib/password";
import { attachSession } from "@/lib/auth";
import { jsonError, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error));
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = user ? await verifyPassword(password, user.passwordHash) : false;
  if (!user || !valid) return jsonError("Incorrect email or password.", 401);

  const response = NextResponse.json({ ok: true, user: { name: user.name, role: user.role } });
  return attachSession(response, user);
}
