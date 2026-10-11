"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  formatAge,
  formatDistance,
  level,
  LEVEL_LABEL,
  rankCafes,
  type Cafe,
  type Coords,
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

        const before = new Map(previous.current.map((c) => [c.id, c.freeSeats]));
        const fresh: Record<number, Change> = {};
        for (const cafe of data.cafes) {
          const was = before.get(cafe.id);
          if (was !== undefined && was !== cafe.freeSeats) fresh[cafe.id] = { was, at: data.now };
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

  const ranked = useMemo(() => rankCafes(cafes, { sort, origin, query, now }), [cafes, sort, origin, query, now]);
  const listRef = useRankMotion(ranked.map((c) => c.id).join(","));

  function chooseSort(next: Sort) {
    setSort(next);
    if (next === "nearest" && !origin) locate();
  }

  const nearestBlocked = sort === "nearest" && !origin;

  return (
    <main className="page">
      <div className="finder-controls">
        <h1 className="sr-only">Cafes with seats free now</h1>
        <label className="sr-only" htmlFor="cafe-search">
          Search cafe or area
        </label>
        <input
          id="cafe-search"
          className="text-input"
          type="search"
          placeholder="Search cafe or area"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          enterKeyHint="search"
        />
        <div className="finder-bar">
          <div className="nav-pill-group" role="group" aria-label="Sort cafes">
            <button className="category-tab" aria-pressed={sort === "room"} onClick={() => chooseSort("room")}>
              Most room
            </button>
            <button className="category-tab" aria-pressed={sort === "nearest"} onClick={() => chooseSort("nearest")}>
              Nearest
            </button>
          </div>
          {location === "granted" ? (
            <span className="location-label">Near you</span>
          ) : location === "asking" ? (
            <span className="location-label">Finding you…</span>
          ) : (
            <button className="button-text-link" onClick={locate}>
              Use my location
            </button>
          )}
        </div>
        <div aria-live="polite">
          {location === "denied" && (
            <p className="notice">
              Location is blocked for this site, so distances are hidden
              {nearestBlocked ? " and the list stays sorted by most room" : ""}. Allow it in your browser settings to
              sort by nearest.
            </p>
          )}
          {location === "unavailable" && (
            <p className="notice">Couldn’t get your location. Distances are hidden until it works.</p>
          )}
          {offline && (
            <p className="notice notice-error">Can’t reach where2go. Counts below may be old. Retrying…</p>
          )}
        </div>
      </div>

      {ranked.length > 0 ? (
        <>
          <div className="board-head" aria-hidden="true">
            <span>Seats free</span>
            <span>Cafe</span>
            <span />
          </div>
          <ol className="board" ref={listRef} aria-label="Cafes ranked by seats free">
            {ranked.map((cafe) => (
              <CafeRow key={cafe.id} cafe={cafe} now={now} change={changes[cafe.id]} />
            ))}
          </ol>
        </>
      ) : cafes.length === 0 ? (
        <div className="empty-state">
          <h2>No cafes listed yet</h2>
          <p>Cafes appear here once their staff start reporting free seats.</p>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No cafe matches “{query.trim()}”</h2>
          <p>Search looks at cafe names and areas. Try a shorter word, or clear it to see every cafe.</p>
          <button className="button button-secondary" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
    </main>
  );
}

function CafeRow({ cafe, now, change }: { cafe: RankedCafe; now: number; change?: Change }) {
  const state = level(cafe.freeSeats, cafe.totalSeats);
  const marked = change !== undefined && now - change.at < CHANGE_MARK_MS;
  const age = formatAge(cafe.updatedAt, now);

  return (
    <li
      className="occupancy-row"
      data-id={cafe.id}
      data-changed={marked}
      data-dim={state === "full" || cafe.stale}
    >
      <span className="seat-count">
        {cafe.freeSeats}
        <small>
          <span aria-hidden="true">/</span>
          <span className="sr-only"> of </span>
          {cafe.totalSeats}
          <span className="sr-only"> seats free</span>
        </small>
      </span>
      <div>
        <div className="cafe-name">
          <span className="status-dot" data-level={cafe.stale ? "unknown" : state} />
          <span className="sr-only">{cafe.stale ? "Not confirmed recently" : LEVEL_LABEL[state]}.</span>
          <span>{cafe.name}</span>
        </div>
        <div className="cafe-meta">
          {cafe.distance !== null ? `${formatDistance(cafe.distance)} · ` : `${cafe.area} · `}
          {marked ? (
            <strong>
              {age}, was {change.was}
            </strong>
          ) : cafe.stale ? (
            `${age} · may be old`
          ) : (
            age
          )}
        </div>
      </div>
      <a
        className="button-icon-circular"
        href={`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Directions to ${cafe.name}`}
      >
        <span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
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
