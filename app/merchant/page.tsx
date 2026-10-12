import type { Metadata } from "next";
import { CodeForm } from "@/components/CodeForm";
import { SeatUpdater } from "@/components/SeatUpdater";
import { TopNav } from "@/components/TopNav";
import { sessionCafe } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staf kafe · where2go" };

export default async function MerchantPage() {
  const cafe = await sessionCafe();
  return (
    <div className="narrow">
      <TopNav link={{ href: "/", label: "Cari kafe" }} />
      <main className="page merchant">
        {cafe ? <SeatUpdater initialCafe={cafe} initialNow={Date.now()} /> : <CodeForm />}
      </main>
    </div>
  );
}
