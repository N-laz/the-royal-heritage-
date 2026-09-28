import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema, zodFieldErrors, zodMessage } from "@/lib/validators";
import { hashPassword } from "@/lib/password";
import { attachSession } from "@/lib/auth";
import { sendEmail } from "@/lib/email/mailer";
import { welcomeEmail } from "@/lib/email/welcome";
import { jsonError, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error), 400, zodFieldErrors(parsed.error));
  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return jsonError("An account with this email already exists. Please sign in.", 409);

  const user = await prisma.user.create({
    data: { name, email, phone: phone || null, passwordHash: await hashPassword(password), role: "CUSTOMER" },
  });

  await prisma.booking.updateMany({ where: { email, userId: null }, data: { userId: user.id } });
  await sendEmail({ to: user.email, ...welcomeEmail(user) });

  const response = NextResponse.json({ ok: true, user: { name: user.name, role: user.role } }, { status: 201 });
  return attachSession(response, user);
}
