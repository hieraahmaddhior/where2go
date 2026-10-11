import { NextResponse } from "next/server";
import { listCafes } from "@/lib/cafes";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ cafes: await listCafes(), now: Date.now() });
}
