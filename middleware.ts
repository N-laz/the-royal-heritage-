import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const isApi = pathname.startsWith("/api/");
  const needsAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!session) {
    if (isApi) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (needsAdmin && session.role !== "ADMIN") {
    if (isApi) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/api/admin/:path*"],
};
