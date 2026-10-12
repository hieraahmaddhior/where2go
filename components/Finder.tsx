"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { TableIcon } from "@/components/TableIcon";
import {
  formatAge,
  formatClock,
  formatDistance,
  PARTIES,
  PARTY_LABEL,
  rankCafes,
  type Cafe,
  type Coords,
  type Party,
  type RankedCafe,
  type Sort,
} from "@/lib/occupancy";

const POLL_MS = 5000;
const CHANGE_MARK_MS = 30000;

type LocationState = "idle" | "asking" | "granted" | "denied" | "unavailable";
type Change = { was: number; at: number };

export function Finder({ initialCafes, initialNow }: { initialCafes: Cafe[]; initialNow: number }) {
  const [cafes, setCafes] = useState(initialCafes);
  const [now, setNow] = useState(initialNow);
  const [offline, setOffline] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("room");
  const [party, setParty] = useState<Party>("all");
  const [origin, setOrigin] = useState<Coords | null>(null);
  const [location, setLocation] = useState<LocationState>("idle");
  const [changes, setChanges] = useState<Record<number, Change>>({});
  const previous = useRef(initialCafes);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/cafes", { cache: "no-store" });
        if (!response.ok) throw new Error(String(response.status));
        const data: { cafes: Cafe[]; now: number } = await response.json();
        if (cancelled) return;

        const before = new Map(previous.current.map((c) => [c.id, c.freeSizes.length]));
        const fresh: Record<number, Change> = {};
        for (const cafe of data.cafes) {
          const was = before.get(cafe.id);
          if (was !== undefined && was !== cafe.freeSizes.length) fresh[cafe.id] = { was, at: data.now };
        }
        previous.current = data.cafes;
        setCafes(data.cafes);
        setNow(data.now);
        setOffline(false);
        setChanges((current) => {
          const kept = Object.entries(current).filter(([, change]) => data.now - change.at < CHANGE_MARK_MS);
          return { ...Object.fromEntries(kept), ...fresh };
        });
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
  }, []);

  function locate() {
    if (!("geolocation" in navigator)) return setLocation("unavailable");
    setLocation("asking");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocation("granted");
      },
      (error) => setLocation(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable"),
      { maximumAge: 60000, timeout: 10000 },
    );
  }

  // Only read the position unprompted when the visitor already allowed it.
  useEffect(() => {
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((status) => status.state === "granted" && locate())
      .catch(() => {});
  }, []);

  const ranked = useMemo(
    () => rankCafes(cafes, { sort, origin, query, party, now }),
    [cafes, sort, origin, query, party, now],
  );
  const listRef = useRankMotion(ranked.map((c) => c.id).join(","));

  function chooseSort(next: Sort) {
    setSort(next);
    if (next === "nearest" && !origin) locate();
  }

  const nearestBlocked = sort === "nearest" && !origin;

  return (
    <main className="page">
      <div className="finder-controls">
        <h1 className="sr-only">Kafe dengan meja kosong sekarang</h1>
        <label className="sr-only" htmlFor="cafe-search">
          Cari kafe atau daerah
        </label>
        <input
          id="cafe-search"
          className="text-input"
          type="search"
          placeholder="Cari kafe atau daerah"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          enterKeyHint="search"
        />
        <div className="finder-bar">
          <div className="nav-pill-group" role="group" aria-label="Urutkan kafe">
            <button className="category-tab" aria-pressed={sort === "room"} onClick={() => chooseSort("room")}>
              Paling lega
            </button>
            <button className="category-tab" aria-pressed={sort === "nearest"} onClick={() => chooseSort("nearest")}>
              Terdekat
            </button>
          </div>
          {location === "granted" ? (
            <span className="location-label">Dari lokasi saat ini</span>
          ) : location === "asking" ? (
            <span className="location-label">Mencari lokasi…</span>
          ) : (
            <button className="button-text-link" onClick={locate}>
              Pakai lokasi
            </button>
          )}
        </div>
        <div className="finder-bar finder-bar-filter">
          <span className="filter-label" id="party-label">
            Butuh buat berapa orang?
          </span>
          <div className="nav-pill-group" role="group" aria-labelledby="party-label">
            {PARTIES.map((option) => (
              <button
                key={option}
                className="category-tab"
                aria-pressed={party === option}
                onClick={() => setParty(option)}
              >
                {PARTY_LABEL[option]}
              </button>
            ))}
          </div>
        </div>
        <div aria-live="polite">
          {location === "denied" && (
            <p className="notice">
              Akses lokasi diblokir untuk situs ini, jadi jarak tidak ditampilkan
              {nearestBlocked ? " dan daftar tetap diurutkan dari yang paling lega" : ""}. Izinkan lewat pengaturan
              browser untuk mengurutkan dari yang terdekat.
            </p>
          )}
          {location === "unavailable" && (
            <p className="notice">Lokasi tidak terbaca. Jarak disembunyikan sampai berhasil.</p>
          )}
          {offline && (
            <p className="notice notice-error">
              Tidak bisa terhubung ke where2go. Angka di bawah mungkin sudah lama. Mencoba lagi…
            </p>
          )}
        </div>
      </div>

      {ranked.length > 0 ? (
        <>
          <div className="board-head" aria-hidden="true">
            <span className="board-head-count">
              <TableIcon seats={4} height={12} />
              Meja kosong
            </span>
            <span>Kafe</span>
            <span />
          </div>
          <ol className="board" ref={listRef} aria-label="Kafe diurutkan dari meja kosong terbanyak">
            {ranked.map((cafe) => (
              <CafeRow key={cafe.id} cafe={cafe} now={now} party={party} change={changes[cafe.id]} />
            ))}
          </ol>
        </>
      ) : query.trim() ? (
        <div className="empty-state">
          <h2>Tidak ada kafe yang cocok dengan “{query.trim()}”</h2>
          <p>Pencarian mencakup nama kafe dan daerah. Coba kata yang lebih pendek, atau hapus pencarian.</p>
          <button className="button button-secondary" onClick={() => setQuery("")}>
            Hapus pencarian
          </button>
        </div>
      ) : party !== "all" ? (
        <div className="empty-state">
          <h2>Belum ada meja untuk {PARTY_LABEL[party]} orang</h2>
          <p>Saat ini tidak ada kafe buka dengan meja kosong seukuran itu. Daftar diperbarui otomatis.</p>
          <button className="button button-secondary" onClick={() => setParty("all")}>
            Tampilkan semua ukuran
          </button>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Belum ada kafe yang bisa ditampilkan</h2>
          <p>Kafe muncul di sini setelah stafnya mengonfirmasi meja yang kosong.</p>
        </div>
      )}
    </main>
  );
}

function CafeRow({
  cafe,
  now,
  party,
  change,
}: {
  cafe: RankedCafe;
  now: number;
  party: Party;
  change?: Change;
}) {
  const place = cafe.distance !== null ? formatDistance(cafe.distance) : cafe.area;
  const directions = (
    <a
      className="button-icon-circular"
      href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Petunjuk arah ke ${cafe.name}`}
    >
      <span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );

  if (!cafe.open) {
    return (
      <li className="occupancy-row" data-id={cafe.id} data-closed="true">
        <span className="seat-count" aria-hidden="true">
          –
        </span>
        <div>
          <div className="cafe-name">
            <Link href={`/kafe/${cafe.id}`} className="cafe-link">
            {cafe.name}
          </Link>
          </div>
          <div className="cafe-meta">
            <span>{place}</span>
            <span>Tutup</span>
            <span>buka {formatClock(cafe.opensMin)}</span>
          </div>
        </div>
        {directions}
      </li>
    );
  }

  // A change is told as the event that happened ("+1 meja kosong", "1 meja terisi"), so the reader
  // never has to subtract an old count from the new one.
  const delta = change ? cafe.freeTables - change.was : 0;
  const marked = change !== undefined && delta !== 0 && now - change.at < CHANGE_MARK_MS;
  const age = formatAge(cafe.confirmedAt, now);

  return (
    <li className="occupancy-row" data-id={cafe.id} data-changed={marked} data-dim={cafe.freeTables === 0}>
      <span className="seat-count">
        {cafe.freeTables}
        <small>
          <span aria-hidden="true">/</span>
          <span className="sr-only"> dari </span>
          {cafe.totalTables}
          <span className="sr-only"> meja kosong</span>
        </small>
      </span>
      <div>
        <div className="cafe-name">
          <Link href={`/kafe/${cafe.id}`} className="cafe-link">
            {cafe.name}
          </Link>
        </div>
        <div className="cafe-meta">
          <span>{place}</span>
          {marked ? (
            // For the 30 seconds a change is marked, the event stands alone beside the place.
            <strong>
              {delta > 0 ? `+${delta} meja kosong` : `${-delta} meja terisi`}
            </strong>
          ) : (
            <>
              {cafe.freeTables === 0 ? (
                <span>Penuh</span>
              ) : party === "all" ? (
                <span>
                  <span aria-hidden="true">±</span>
                  <span className="sr-only">kira-kira </span>
                  {cafe.freeSeats} kursi
                </span>
              ) : (
                <span>{cafe.fits} meja cocok</span>
              )}
              <span>{age}</span>
            </>
          )}
        </div>
      </div>
      {directions}
    </li>
  );
}

// When the ranking changes, each row slides from where it was to where it now belongs,
// so a cafe that just freed seats is seen moving instead of jumping.
function useRankMotion(order: string) {
  const listRef = useRef<HTMLOListElement>(null);
  const tops = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = new Map<string, number>();
    for (const row of Array.from(list.children) as HTMLElement[]) {
      const id = row.dataset.id!;
      const top = row.offsetTop;
      next.set(id, top);
      const before = tops.current.get(id);
      if (!reduce && before !== undefined && before !== top) {
        row.animate([{ transform: `translateY(${before - top}px)` }, { transform: "none" }], {
          duration: 450,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        });
      }
    }
    tops.current = next;
  }, [order]);

  return listRef;
}
