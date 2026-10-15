"use client";

import { useEffect, useState } from "react";
import { TableIcon } from "@/components/TableIcon";
import type { CafeDetail as Detail } from "@/lib/cafes";
import {
  distanceMeters,
  formatAge,
  formatClock,
  formatDistance,
  formatPrice,
  freeSeats,
  groupTables,
  isOpen,
  isStale,
  openStatus,
  type CafeTable,
  type Coords,
} from "@/lib/occupancy";

const POLL_MS = 5000;

// Free and taken are stated side by side, so nobody has to read "3 dari 3" as a fraction.
function sizeText(free: number, total: number): string {
  if (free === 0) return "Penuh";
  if (free === total) return `${free} kosong`;
  return `${free} kosong · ${total - free} terisi`;
}

// One row per table size: used for the whole cafe and again inside each zone.
function SizeList({ tables }: { tables: CafeTable[] }) {
  return (
    <dl className="fact-list">
      {groupTables(tables, "size").map((group) => (
        <div key={group.key}>
          <dt className="fact-with-icon">
            <TableIcon seats={Number(group.key)} height={20} />
            Meja {group.key} kursi
          </dt>
          <dd data-dim={group.freeSizes.length === 0}>{sizeText(group.freeSizes.length, group.total)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CafeDetail({ initialCafe, initialNow }: { initialCafe: Detail; initialNow: number }) {
  const [cafe, setCafe] = useState(initialCafe);
  const [now, setNow] = useState(initialNow);
  const [offline, setOffline] = useState(false);
  const [origin, setOrigin] = useState<Coords | null>(null);
  const [breakdown, setBreakdown] = useState<"size" | "zone">("size");

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch(`/api/cafes/${initialCafe.id}`, { cache: "no-store" });
        if (!response.ok) throw new Error(String(response.status));
        const data: { cafe: Detail; now: number } = await response.json();
        if (cancelled) return;
        setCafe(data.cafe);
        setNow(data.now);
        setOffline(false);
      } catch {
        if (!cancelled) setOffline(true);
      }
    }
    const timer = setInterval(poll, POLL_MS);
    document.addEventListener("visibilitychange", poll);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", poll);
    };
  }, [initialCafe.id]);

  // Distance is shown only when the visitor already allowed location on the board.
  useEffect(() => {
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((status) => {
        if (status.state !== "granted") return;
        navigator.geolocation.getCurrentPosition(
          (position) => setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude }),
          () => {},
          { maximumAge: 60000, timeout: 10000 },
        );
      })
      .catch(() => {});
  }, []);

  const open = isOpen(cafe, now);
  const unconfirmed = open && isStale(cafe, now);
  const live = open && !unconfirmed;
  const zones = groupTables(cafe.tables, "zone");
  const place = origin ? formatDistance(distanceMeters(origin, cafe)) : cafe.area;

  return (
    <main className="page detail">
      <h1>{cafe.name}</h1>
      <p className="detail-sub">
        {place} · {openStatus(cafe, now)}
      </p>
      <div className="detail-actions">
        <a
          className="button button-primary"
          href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Petunjuk arah
        </a>
      </div>

      <p className="demo-note">
        Demo: status meja di halaman ini disimulasikan, dan fasilitas, aturan, serta harga adalah contoh, bukan data
        dari kafe ini.
      </p>

      <section className="detail-section" aria-labelledby="tables-title">
        <h2 id="tables-title">Meja kosong sekarang</h2>
        {live ? (
          <>
            <p className="detail-count" aria-live="polite">
              <strong>{cafe.freeSizes.length}</strong>
              <span>
                dari {cafe.totalTables} meja
                {cafe.freeSizes.length > 0 && ` · ±${freeSeats(cafe)} kursi`}
              </span>
            </p>
            <p className="detail-note">Dikonfirmasi staf {formatAge(cafe.confirmedAt, now)}.</p>
            {offline && (
              <p className="notice notice-error">
                Tidak bisa terhubung ke where2go. Angka ini mungkin sudah lama. Mencoba lagi…
              </p>
            )}

            <div className="breakdown-switch">
              <div className="nav-pill-group" role="group" aria-label="Rincian meja kosong">
                <button className="category-tab" aria-pressed={breakdown === "size"} onClick={() => setBreakdown("size")}>
                  Per ukuran meja
                </button>
                <button className="category-tab" aria-pressed={breakdown === "zone"} onClick={() => setBreakdown("zone")}>
                  Per area
                </button>
              </div>
            </div>
            {breakdown === "size" ? (
              <SizeList tables={cafe.tables} />
            ) : (
              <div className="zone-list">
                {zones.map((zone) => (
                  // Closed, a zone is one line with its total; open, the total gives way to the plan and sizes.
                  <details className="zone" key={zone.key}>
                    <summary>
                      <span className="zone-name">{zone.key}</span>
                      <span className="zone-count" data-dim={zone.freeSizes.length === 0}>
                        {zone.freeSizes.length === 0 ? "Penuh" : `${zone.freeSizes.length} meja kosong`}
                      </span>
                      <svg className="zone-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="zone-body">
                      <div className="placeholder placeholder-plan">
                        <p>Denah meja {zone.key} belum tersedia.</p>
                      </div>
                      <SizeList tables={cafe.tables.filter((table) => table.zone === zone.key)} />
                    </div>
                  </details>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="notice">
            {open
              ? "Staf kafe ini belum mengonfirmasi mejanya lebih dari 30 menit, jadi jumlah meja kosong tidak ditampilkan."
              : `Kafe ini sedang tutup dan buka lagi pukul ${formatClock(cafe.opensMin)}. Jumlah meja kosong tampil saat kafe buka.`}
          </p>
        )}
      </section>

      <section className="detail-section" aria-labelledby="facilities-title">
        <h2 id="facilities-title">Fasilitas</h2>
        <ul className="plain-list">
          {cafe.facilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section" aria-labelledby="rules-title">
        <h2 id="rules-title">Aturan</h2>
        <ul className="plain-list">
          {cafe.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section" aria-labelledby="find-title">
        <h2 id="find-title">Cara menemukan</h2>
        <div className="placeholder photo-front">
          <p>Foto tampak depan belum tersedia.</p>
        </div>
        <p>{cafe.address}</p>
        {cafe.landmark && <p className="detail-note">{cafe.landmark}.</p>}
      </section>

      <section className="detail-section" aria-labelledby="inside-title">
        <h2 id="inside-title">Suasana di dalam</h2>
        <div className="photo-grid">
          {zones.map((group) => (
            <div className="placeholder" key={group.key}>
              <p>Foto {group.key} belum tersedia.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section" aria-labelledby="info-title">
        <h2 id="info-title">Jam buka dan harga</h2>
        <dl className="fact-list">
          <div>
            <dt>Jam buka</dt>
            <dd>
              Setiap hari, {formatClock(cafe.opensMin)}–{formatClock(cafe.closesMin)} WIB
            </dd>
          </div>
          <div>
            <dt>Harga minuman</dt>
            <dd>Mulai {formatPrice(cafe.priceFrom)}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
