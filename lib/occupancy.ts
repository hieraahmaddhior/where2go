export type Cafe = {
  id: number;
  name: string;
  area: string;
  lat: number;
  lng: number;
  /** Opening hours as minutes after midnight, WIB. */
  opensMin: number;
  closesMin: number;
  /** Last time staff changed a table or confirmed the layout. */
  confirmedAt: number;
  /** Demo cafes with a heartbeat never go stale. */
  heartbeat: boolean;
  totalSeats: number;
  totalTables: number;
  /** Size of every free table. Free tables are the headline; free seats are their sum. */
  freeSizes: number[];
};

export type CafeTable = { id: number; label: number; zone: string; size: number; free: boolean };
export type Coords = { lat: number; lng: number };
export type Level = "roomy" | "filling" | "tight" | "full";
export type Sort = "room" | "nearest";
export type Party = "all" | "1-2" | "3-4" | "5+";

export const STALE_AFTER_MS = 30 * 60 * 1000;
export const TABLE_SIZES = [2, 4, 6, 8];
export const PARTIES: Party[] = ["all", "1-2", "3-4", "5+"];

// A party fits a single free table, at most one size up from what it needs.
const FITS: Record<Exclude<Party, "all">, number[]> = {
  "1-2": [2, 4],
  "3-4": [4, 6],
  "5+": [6, 8],
};

export const PARTY_LABEL: Record<Party, string> = {
  all: "Semua",
  "1-2": "1–2",
  "3-4": "3–4",
  "5+": "5+",
};

export const LEVEL_LABEL: Record<Level, string> = {
  roomy: "Lega",
  filling: "Mulai ramai",
  tight: "Hampir penuh",
  full: "Penuh",
};

export function level(free: number, total: number): Level {
  if (free <= 0 || total <= 0) return "full";
  const ratio = free / total;
  if (ratio >= 0.4) return "roomy";
  if (ratio >= 0.15) return "filling";
  return "tight";
}

export function freeSeats(cafe: Pick<Cafe, "freeSizes">): number {
  return cafe.freeSizes.reduce((sum, size) => sum + size, 0);
}

export function fittingTables(cafe: Pick<Cafe, "freeSizes">, party: Party): number {
  if (party === "all") return cafe.freeSizes.length;
  return cafe.freeSizes.filter((size) => FITS[party].includes(size)).length;
}

export function isStale(cafe: Pick<Cafe, "confirmedAt" | "heartbeat">, now: number): boolean {
  return !cafe.heartbeat && now - cafe.confirmedAt > STALE_AFTER_MS;
}

const WIB_OFFSET_MIN = 7 * 60;

export function wibMinutes(now: number): number {
  return (Math.floor(now / 60000) + WIB_OFFSET_MIN) % 1440;
}

export function isOpen(cafe: Pick<Cafe, "opensMin" | "closesMin">, now: number): boolean {
  const minute = wibMinutes(now);
  return cafe.opensMin <= cafe.closesMin
    ? minute >= cafe.opensMin && minute < cafe.closesMin
    : minute >= cafe.opensMin || minute < cafe.closesMin;
}

// The one line that says whether to go now: how long it stays open, or when it opens.
export function openStatus(cafe: Pick<Cafe, "opensMin" | "closesMin">, now: number): string {
  if (!isOpen(cafe, now)) return `Tutup · buka ${formatClock(cafe.opensMin)}`;
  const left = (cafe.closesMin - wibMinutes(now) + 1440) % 1440;
  return left <= 60 ? `Tutup ${left} mnt lagi` : `Buka sampai ${formatClock(cafe.closesMin)}`;
}

export function formatPrice(rupiah: number): string {
  return `Rp${String(Math.round(rupiah)).replace(/\B(?=(\d{3})+$)/g, ".")}`;
}

export type TableGroup = { key: string; total: number; freeSizes: number[] };

// Tables grouped for the detail page, by size ("2", "4") or by zone ("Lantai 1"),
// in first-seen order so zones keep the order staff number them in.
export function groupTables(tables: CafeTable[], by: "size" | "zone"): TableGroup[] {
  const groups = new Map<string, TableGroup>();
  const ordered = by === "size" ? [...tables].sort((a, b) => a.size - b.size) : tables;
  for (const table of ordered) {
    const key = by === "size" ? String(table.size) : table.zone;
    const group = groups.get(key) ?? { key, total: 0, freeSizes: [] };
    group.total += 1;
    if (table.free) group.freeSizes.push(table.size);
    groups.set(key, group);
  }
  return [...groups.values()];
}

export function formatClock(minutes: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(minutes / 60) % 24)}.${pad(minutes % 60)}`;
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
  if (meters < 10000) return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
  return `${Math.round(meters / 1000)} km`;
}

export function formatAge(since: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - since) / 1000));
  if (seconds < 60) return "baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mnt lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

export type RankedCafe = Cafe & {
  open: boolean;
  freeTables: number;
  /** An estimate for the reader: seats at free tables, not empty chairs at taken ones. */
  freeSeats: number;
  /** Free tables the chosen party fits; every free table when no party is chosen. */
  fits: number;
  distance: number | null;
};

// The board shows open cafes whose count staff confirmed recently, then closed cafes.
// An open cafe nobody has confirmed in 30 minutes is left out rather than shown with an old number.
export function rankCafes(
  cafes: Cafe[],
  opts: { sort: Sort; origin: Coords | null; query: string; party: Party; now: number },
): RankedCafe[] {
  const query = opts.query.trim().toLowerCase();
  const rows: RankedCafe[] = cafes
    .filter((c) => !query || c.name.toLowerCase().includes(query) || c.area.toLowerCase().includes(query))
    .map((c) => ({
      ...c,
      open: isOpen(c, opts.now),
      freeTables: c.freeSizes.length,
      freeSeats: freeSeats(c),
      fits: fittingTables(c, opts.party),
      distance: opts.origin ? distanceMeters(opts.origin, c) : null,
    }));

  const byDistance = (a: RankedCafe, b: RankedCafe) => (a.distance ?? 0) - (b.distance ?? 0);
  const byName = (a: RankedCafe, b: RankedCafe) => a.name.localeCompare(b.name);
  // A table is what a party actually gets, so tables rank first and seats break ties.
  const byRoom = (a: RankedCafe, b: RankedCafe) => b.freeTables - a.freeTables || b.freeSeats - a.freeSeats;

  const open = rows.filter(
    (c) => c.open && !isStale(c, opts.now) && (opts.party === "all" || c.fits > 0),
  );
  const closed = rows.filter((c) => !c.open);

  if (opts.sort === "nearest" && opts.origin) {
    open.sort((a, b) => byDistance(a, b) || byRoom(a, b) || byName(a, b));
  } else {
    open.sort((a, b) => byRoom(a, b) || byDistance(a, b) || byName(a, b));
  }
  closed.sort((a, b) => byDistance(a, b) || byName(a, b));
  return [...open, ...closed];
}

export type TableState = { id: number; free: boolean };

// One simulated event: a party sits down or leaves. `bias` is the chance a table frees up.
export function pickFlip(tables: TableState[], bias: number, random: () => number): TableState | null {
  if (tables.length === 0) return null;
  const wantFree = random() < bias;
  const candidates = tables.filter((t) => t.free !== wantFree);
  const pool = candidates.length > 0 ? candidates : tables;
  const chosen = pool[Math.floor(random() * pool.length)];
  return { id: chosen.id, free: !chosen.free };
}
