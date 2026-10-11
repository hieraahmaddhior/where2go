export type Cafe = {
  id: number;
  name: string;
  area: string;
  lat: number;
  lng: number;
  totalSeats: number;
  freeSeats: number;
  updatedAt: number;
};

export type Coords = { lat: number; lng: number };
export type Level = "roomy" | "filling" | "tight" | "full";
export type Sort = "room" | "nearest";

export const STALE_AFTER_MS = 30 * 60 * 1000;

export function level(freeSeats: number, totalSeats: number): Level {
  if (freeSeats <= 0 || totalSeats <= 0) return "full";
  const ratio = freeSeats / totalSeats;
  if (ratio >= 0.4) return "roomy";
  if (ratio >= 0.15) return "filling";
  return "tight";
}

export const LEVEL_LABEL: Record<Level, string> = {
  roomy: "Plenty of room",
  filling: "Filling up",
  tight: "Almost full",
  full: "Full",
};

export function clampSeats(value: number, totalSeats: number): number {
  return Math.max(0, Math.min(totalSeats, Math.round(value)));
}

export function isStale(updatedAt: number, now: number): boolean {
  return now - updatedAt > STALE_AFTER_MS;
}

export function distanceMeters(a: Coords, b: Coords): number {
  const R = 6371000;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.max(50, Math.round(meters / 50) * 50)} m`;
  if (meters < 10000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters / 1000)} km`;
}

export function formatAge(updatedAt: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - updatedAt) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.floor(hours / 24)} d ago`;
}

export type RankedCafe = Cafe & { distance: number | null; stale: boolean };

export function rankCafes(
  cafes: Cafe[],
  opts: { sort: Sort; origin: Coords | null; query: string; now: number },
): RankedCafe[] {
  const query = opts.query.trim().toLowerCase();
  const rows: RankedCafe[] = cafes
    .filter((c) => !query || c.name.toLowerCase().includes(query) || c.area.toLowerCase().includes(query))
    .map((c) => ({
      ...c,
      distance: opts.origin ? distanceMeters(opts.origin, c) : null,
      stale: isStale(c.updatedAt, opts.now),
    }));

  const byDistance = (a: RankedCafe, b: RankedCafe) => (a.distance ?? 0) - (b.distance ?? 0);
  const byName = (a: RankedCafe, b: RankedCafe) => a.name.localeCompare(b.name);

  if (opts.sort === "nearest" && opts.origin) {
    return rows.sort((a, b) => byDistance(a, b) || b.freeSeats - a.freeSeats || byName(a, b));
  }
  // Confirmed room first, then counts nobody has confirmed recently, then confirmed full.
  const tier = (c: RankedCafe) => (c.stale ? 1 : c.freeSeats > 0 ? 0 : 2);
  return rows.sort(
    (a, b) => tier(a) - tier(b) || b.freeSeats - a.freeSeats || byDistance(a, b) || byName(a, b),
  );
}
