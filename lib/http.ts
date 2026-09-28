import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, error: message, ...(fields ? { fields } : {}) }, { status });
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
