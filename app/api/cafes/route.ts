import { NextResponse } from "next/server";
import { listCafes } from "@/lib/cafes";
import { simulate } from "@/lib/simulator";

export const dynamic = "force-dynamic";

export async function GET() {
  await simulate();
  return NextResponse.json({ cafes: await listCafes(), now: Date.now() });
}
