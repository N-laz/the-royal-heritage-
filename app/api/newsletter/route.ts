import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema, zodMessage } from "@/lib/validators";
import { jsonError, readJson } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(zodMessage(parsed.error));

  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: {},
    create: { email: parsed.data.email },
  });
  return NextResponse.json({ ok: true, message: "Thank you — you're on the list." });
}
