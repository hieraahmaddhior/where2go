"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TableIcon } from "@/components/TableIcon";
import type { MerchantCafe } from "@/lib/cafes";
import {
  formatAge,
  formatClock,
  freeSeats,
  groupTables,
  isOpen,
  isStale,
  level,
  LEVEL_LABEL,
} from "@/lib/occupancy";

const SYNC_MS = 10000;
const UNDO_MS = 6000;

type Status = "saved" | "saving" | "failed";
type Change = { tableId: number; free: boolean } | { all: boolean } | { confirm: true };

function apply(cafe: MerchantCafe, change: Change): MerchantCafe {
  if ("confirm" in change) return cafe;
  const tables = cafe.tables.map((t) =>
    "all" in change ? { ...t, free: change.all } : t.id === change.tableId ? { ...t, free: change.free } : t,
  );
  return { ...cafe, tables, freeSizes: tables.filter((t) => t.free).map((t) => t.size) };
}

export function SeatUpdater({ initialCafe, initialNow }: { initialCafe: MerchantCafe; initialNow: number }) {
  const router = useRouter();
  const [cafe, setCafe] = useState(initialCafe);
  const [now, setNow] = useState(initialNow);
  const [status, setStatus] = useState<Status>("saved");
  const pending = useRef(0);
  // A tile tap saves at once, so a mis-tap needs a way back: the last tap can be undone for a few seconds.
  const [undo, setUndo] = useState<{ label: number; free: boolean; tableId: number; at: number } | null>(null);
  // Bulk actions change every table at once, so they alone ask before saving.
  const [confirming, setConfirming] = useState<"full" | "free" | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (confirming && !dialog.open) dialog.showModal();
    if (!confirming && dialog.open) dialog.close();
  }, [confirming]);

  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo(null), UNDO_MS);
    return () => clearTimeout(timer);
  }, [undo]);

  function tapTable(table: { id: number; label: number; free: boolean }) {
    setConfirming(null);
    setUndo({ tableId: table.id, label: table.label, free: !table.free, at: Date.now() });
    change({ tableId: table.id, free: !table.free });
  }

  function undoTap() {
    if (!undo) return;
    change({ tableId: undo.tableId, free: !undo.free });
    setUndo(null);
  }

  function confirmBulk() {
    if (!confirming) return;
    setUndo(null);
    change({ all: confirming === "free" });
    setConfirming(null);
  }

  // Another device at the same counter may be updating too.
  useEffect(() => {
    const timer = setInterval(async () => {
      if (pending.current > 0 || document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/merchant/cafe", { cache: "no-store" });
        if (response.status === 401) return router.refresh();
        if (!response.ok) return;
        const data: { cafe: MerchantCafe; now: number } = await response.json();
        if (pending.current === 0) {
          setCafe(data.cafe);
          setNow(data.now);
        }
      } catch {}
    }, SYNC_MS);
    return () => clearInterval(timer);
  }, [router]);

  async function change(next: Change) {
    const previous = cafe;
    setCafe(apply(cafe, next));
    setStatus("saving");
    pending.current += 1;
    try {
      const response = await fetch("/api/merchant/cafe", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      });
      if (response.status === 401) return router.refresh();
      if (!response.ok) throw new Error(String(response.status));
      const data: { cafe: MerchantCafe; now: number } = await response.json();
      pending.current -= 1;
      if (pending.current === 0) {
        setCafe(data.cafe);
        setNow(data.now);
        setStatus("saved");
      }
    } catch {
      pending.current -= 1;
      setCafe(previous);
      setStatus("failed");
    }
  }

  async function switchCafe() {
    await fetch("/api/merchant/session", { method: "DELETE" }).catch(() => {});
    router.refresh();
  }

  const freeTables = cafe.freeSizes.length;
  const state = level(freeTables, cafe.totalTables);
  const open = isOpen(cafe, now);
  const hidden = open && isStale(cafe, now);

  return (
    <>
      <h1>{cafe.name}</h1>
      <p className="merchant-sub">
        {cafe.area} · buka {formatClock(cafe.opensMin)}–{formatClock(cafe.closesMin)}
      </p>

      {hidden && (
        <div className="callout" role="alert">
          <p>
            <strong>Kafe ini sedang tidak tampil untuk pelanggan.</strong> Status meja belum dikonfirmasi lebih dari 30
            menit. Ubah meja yang berbeda, atau konfirmasi kalau semuanya masih sesuai.
          </p>
          <button className="button button-primary" onClick={() => change({ confirm: true })}>
            Masih benar
          </button>
        </div>
      )}
      {!open && (
        <div className="callout">
          <p>
            <strong>Di luar jam buka.</strong> Pelanggan melihat kafe ini sebagai tutup sampai{" "}
            {formatClock(cafe.opensMin)}.
          </p>
        </div>
      )}

      <section className="seat-panel" aria-label="Meja kosong">
        <div className="seat-panel-count">
          <output aria-live="polite">{freeTables}</output>
          <span>dari {cafe.totalTables} meja kosong</span>
        </div>
        <p className="seat-panel-status" role="status">
          {status === "failed" ? (
            <span className="notice-error">Perubahan itu gagal disimpan. Periksa koneksi lalu ketuk lagi.</span>
          ) : undo ? (
            <>
              <span>
                Meja {undo.label} ditandai {undo.free ? "kosong" : "terisi"}.
              </span>
              <button className="button-text-link" onClick={undoTap}>
                Urungkan
              </button>
              {/* Drains over the undo window; keyed so a new tap restarts it. */}
              <span className="undo-progress" key={undo.at} style={{ animationDuration: `${UNDO_MS}ms` }} />
            </>
          ) : (
            <>
              {LEVEL_LABEL[state]} · {freeTables > 0 && `±${freeSeats(cafe)} kursi · `}
              {status === "saving" ? "menyimpan…" : `diperbarui ${formatAge(cafe.confirmedAt, now)}`}
            </>
          )}
        </p>

        {groupTables(cafe.tables, "zone").map((zone) => (
          // Tiles sit under the floor or terrace they are on, the way staff walk the room.
          <section className="tile-zone" key={zone.key} aria-labelledby={`zone-${zone.key}`}>
            <h2 className="tile-zone-title" id={`zone-${zone.key}`}>
              {zone.key}
              <span>
                {zone.freeSizes.length === 0
                  ? "Penuh"
                  : zone.freeSizes.length === zone.total
                    ? `${zone.total} kosong`
                    : `${zone.freeSizes.length} kosong · ${zone.total - zone.freeSizes.length} terisi`}
              </span>
            </h2>
            <ul className="table-grid">
              {cafe.tables
                .filter((table) => table.zone === zone.key)
                .map((table) => (
                  <li key={table.id}>
                    <button
                      className="table-tile"
                      aria-pressed={!table.free}
                      onClick={() => tapTable(table)}
                    >
                      <span className="table-tile-name">Meja {table.label}</span>
                      <TableIcon seats={table.size} />
                      <span className="table-tile-meta">
                        <strong>{table.free ? "Kosong" : "Terisi"}</strong> · {table.size} kursi
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <div className="quick-set">
          <button
            className="button button-secondary"
            onClick={() => setConfirming("full")}
            disabled={freeTables === 0}
          >
            Tandai penuh
          </button>
          <button
            className="button button-secondary"
            onClick={() => setConfirming("free")}
            disabled={freeTables === cafe.tables.length}
          >
            Tandai semua kosong
          </button>
        </div>

        {/* Native dialog: focus is trapped, Escape and the backdrop close it, and closing cancels. */}
        <dialog
          className="confirm-dialog"
          ref={dialogRef}
          aria-labelledby="confirm-title"
          onClose={() => setConfirming(null)}
          onClick={(event) => event.target === dialogRef.current && setConfirming(null)}
        >
          <h2 id="confirm-title">
            Tandai semua {cafe.tables.length} meja {confirming === "free" ? "kosong" : "terisi"}?
          </h2>
          <p>Pelanggan langsung melihat kafe ini {confirming === "free" ? "kosong semua" : "penuh"}.</p>
          <div className="quick-set">
            <button className="button button-secondary" onClick={() => setConfirming(null)}>
              Batal
            </button>
            <button className="button button-primary" onClick={confirmBulk}>
              {confirming === "free" ? "Ya, semua kosong" : "Ya, tandai penuh"}
            </button>
          </div>
        </dialog>
      </section>

      <div className="merchant-foot">
        <span>Pelanggan melihat perubahan dalam hitungan detik.</span>
        <button className="button-text-link" onClick={switchCafe}>
          Ganti kafe
        </button>
      </div>
    </>
  );
}
