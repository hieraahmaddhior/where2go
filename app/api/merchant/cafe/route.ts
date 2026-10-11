import { NextResponse } from "next/server";
import { changeFreeSeats, type SeatChange } from "@/lib/cafes";
import { sessionCafe, sessionCode } from "@/lib/session";

export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ error: "no_session" }, { status: 401 });

export async function GET() {
  const cafe = await sessionCafe();
  return cafe ? NextResponse.json({ cafe, now: Date.now() }) : unauthorized();
}

function parseChange(body: unknown): SeatChange | null {
  if (!body || typeof body !== "object") return null;
  const { delta, freeSeats } = body as Record<string, unknown>;
  if (Number.isInteger(delta) && Math.abs(delta as number) <= 100) return { delta: delta as number };
  if (Number.isInteger(freeSeats) && (freeSeats as number) >= 0) return { freeSeats: freeSeats as number };
  return null;
}

export async function PATCH(request: Request) {
  const code = await sessionCode();
  if (!code) return unauthorized();

  const change = parseChange(await request.json().catch(() => null));
  if (!change) return NextResponse.json({ error: "invalid_change" }, { status: 400 });

  const cafe = await changeFreeSeats(code, change);
  return cafe ? NextResponse.json({ cafe, now: Date.now() }) : unauthorized();
}
