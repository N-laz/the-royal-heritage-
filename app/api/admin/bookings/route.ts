import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAdminData } from "@/lib/admin";
import { jsonError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Admin access required.", 403);
  const data = await getAdminData();
  return NextResponse.json({ ok: true, ...data });
}
