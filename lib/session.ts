import { cookies } from "next/headers";
import { getCafeByCode, normalizeCode, type MerchantCafe } from "./cafes.ts";

export const SESSION_COOKIE = "where2go_cafe";

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 12,
};

export async function sessionCode(): Promise<string> {
  return normalizeCode((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function sessionCafe(): Promise<MerchantCafe | null> {
  return getCafeByCode(await sessionCode());
}

// In-memory and per-process: enough to slow code guessing in the MVP, not a production limiter.
const WINDOW_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

export function tooManyAttempts(key: string, now = Date.now()): boolean {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}
