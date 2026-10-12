import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CafeDetail } from "@/components/CafeDetail";
import { TopNav } from "@/components/TopNav";
import { getCafeDetail } from "@/lib/cafes";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cafe = await getCafeDetail(Number((await params).id));
  return { title: cafe ? `${cafe.name} · where2go` : "where2go" };
}

export default async function CafePage({ params }: Props) {
  const cafe = await getCafeDetail(Number((await params).id));
  if (!cafe) notFound();
  return (
    <>
      <TopNav link={{ href: "/", label: "Semua kafe" }} />
      <CafeDetail initialCafe={cafe} initialNow={Date.now()} />
    </>
  );
}
