import { NextResponse } from "next/server";
import { changeTables, type TableChange } from "@/lib/cafes";
import { sessionCafe, sessionCode } from "@/lib/session";

export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ error: "no_session" }, { status: 401 });

export async function GET() {
  const cafe = await sessionCafe();
  return cafe ? NextResponse.json({ cafe, now: Date.now() }) : unauthorized();
}

function parseChange(body: unknown): TableChange | null {
  if (!body || typeof body !== "object") return null;
  const { tableId, free, all, confirm } = body as Record<string, unknown>;
  if (Number.isInteger(tableId) && typeof free === "boolean") return { tableId: tableId as number, free };
  if (typeof all === "boolean") return { all };
  if (confirm === true) return { confirm: true };
  return null;
}

export async function PATCH(request: Request) {
  const code = await sessionCode();
  if (!code) return unauthorized();

  const change = parseChange(await request.json().catch(() => null));
  if (!change) return NextResponse.json({ error: "invalid_change" }, { status: 400 });

  const cafe = await changeTables(code, change);
  return cafe ? NextResponse.json({ cafe, now: Date.now() }) : unauthorized();
}
