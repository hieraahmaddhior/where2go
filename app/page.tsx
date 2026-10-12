import { Finder } from "@/components/Finder";
import { TopNav } from "@/components/TopNav";
import { listCafes } from "@/lib/cafes";

export const dynamic = "force-dynamic";

export default async function FinderPage() {
  return (
    <>
      <TopNav link={{ href: "/merchant", label: "Staf kafe" }} />
      <Finder initialCafes={await listCafes()} initialNow={Date.now()} />
    </>
  );
}
