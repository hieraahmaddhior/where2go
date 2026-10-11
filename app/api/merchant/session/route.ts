import { NextResponse } from "next/server";
import { getCafeByCode, normalizeCode } from "@/lib/cafes";
import { SESSION_COOKIE, sessionCookieOptions, tooManyAttempts } from "@/lib/session";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const code = normalizeCode(body?.code);
  const cafe = await getCafeByCode(code);
  if (!cafe) return NextResponse.json({ error: "unknown_code" }, { status: 401 });

  const response = NextResponse.json({ cafe });
  response.cookies.set(SESSION_COOKIE, code, sessionCookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
