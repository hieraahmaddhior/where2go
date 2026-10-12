import { NextResponse } from "next/server";
import { getCafeDetail } from "@/lib/cafes";
import { simulate } from "@/lib/simulator";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Keeps the demo moving while someone is reading a single cafe.
  await simulate();
  const cafe = await getCafeDetail(Number((await params).id));
  if (!cafe) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ cafe, now: Date.now() });
}
