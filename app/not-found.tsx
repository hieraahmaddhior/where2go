import Link from "next/link";
import { TopNav } from "@/components/TopNav";

export default function NotFound() {
  return (
    <>
      <TopNav link={{ href: "/", label: "Semua kafe" }} />
      <main className="page">
        <div className="empty-state">
          <h2>Halaman ini tidak ditemukan</h2>
          <p>Kafe yang dicari mungkin sudah tidak terdaftar, atau tautannya salah ketik.</p>
          <Link className="button button-secondary" href="/">
            Lihat semua kafe
          </Link>
        </div>
      </main>
    </>
  );
}
