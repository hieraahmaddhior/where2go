import assert from "node:assert/strict";
import { test } from "node:test";
import {
  fittingTables,
  formatPrice,
  groupTables,
  openStatus,
  formatAge,
  formatClock,
  formatDistance,
  freeSeats,
  isOpen,
  isStale,
  level,
  pickFlip,
  rankCafes,
  STALE_AFTER_MS,
  type Cafe,
} from "./occupancy.ts";

// 05:00 UTC is 12:00 WIB.
const noonWib = Date.UTC(2026, 0, 10, 5, 0, 0);
const cafe = (over: Partial<Cafe>): Cafe => ({
  id: 1,
  name: "A",
  area: "Dago",
  lat: 0,
  lng: 0,
  opensMin: 7 * 60,
  closesMin: 23 * 60,
  confirmedAt: noonWib,
  heartbeat: false,
  totalSeats: 20,
  totalTables: 6,
  freeSizes: [2, 4],
  ...over,
});
const rank = (cafes: Cafe[], over: Partial<Parameters<typeof rankCafes>[1]> = {}) =>
  rankCafes(cafes, { sort: "room", origin: null, query: "", party: "all", now: noonWib, ...over }).map(
    (c) => c.name,
  );

test("level maps free ratio to a state", () => {
  assert.equal(level(18, 24), "roomy");
  assert.equal(level(5, 16), "filling");
  assert.equal(level(2, 28), "tight");
  assert.equal(level(0, 12), "full");
});

test("free seats are the sum of free table sizes", () => {
  assert.equal(freeSeats({ freeSizes: [2, 2, 4, 6] }), 14);
  assert.equal(freeSeats({ freeSizes: [] }), 0);
});

test("a party fits one table, at most one size up", () => {
  const free = { freeSizes: [2, 2, 4, 6, 8] };
  assert.equal(fittingTables(free, "all"), 5);
  assert.equal(fittingTables(free, "1-2"), 3);
  assert.equal(fittingTables(free, "3-4"), 2);
  assert.equal(fittingTables(free, "5+"), 2);
  assert.equal(fittingTables({ freeSizes: [8] }, "1-2"), 0);
});

test("opening hours are read in WIB, including past midnight", () => {
  assert.equal(isOpen({ opensMin: 7 * 60, closesMin: 23 * 60 }, noonWib), true);
  assert.equal(isOpen({ opensMin: 14 * 60, closesMin: 22 * 60 }, noonWib), false);
  assert.equal(isOpen({ opensMin: 18 * 60, closesMin: 2 * 60 }, noonWib), false);
  assert.equal(isOpen({ opensMin: 18 * 60, closesMin: 2 * 60 }, noonWib + 13 * 3_600_000), true);
});

test("open status says how long a cafe stays open or when it opens", () => {
  assert.equal(openStatus({ opensMin: 7 * 60, closesMin: 23 * 60 }, noonWib), "Buka sampai 23.00");
  assert.equal(openStatus({ opensMin: 7 * 60, closesMin: 12 * 60 + 45 }, noonWib), "Tutup 45 mnt lagi");
  assert.equal(openStatus({ opensMin: 14 * 60, closesMin: 22 * 60 }, noonWib), "Tutup · buka 14.00");
});

test("prices use Indonesian thousands separators", () => {
  assert.equal(formatPrice(18000), "Rp18.000");
  assert.equal(formatPrice(1250000), "Rp1.250.000");
  assert.equal(formatPrice(900), "Rp900");
});

test("tables group by size in ascending order and by zone in staff order", () => {
  const tables = [
    { id: 1, label: 1, zone: "Lantai 1", size: 4, free: true },
    { id: 2, label: 2, zone: "Lantai 1", size: 2, free: false },
    { id: 3, label: 3, zone: "Teras", size: 2, free: true },
  ];
  assert.deepEqual(groupTables(tables, "size"), [
    { key: "2", total: 2, freeSizes: [2] },
    { key: "4", total: 1, freeSizes: [4] },
  ]);
  assert.deepEqual(groupTables(tables, "zone"), [
    { key: "Lantai 1", total: 2, freeSizes: [4] },
    { key: "Teras", total: 1, freeSizes: [2] },
  ]);
});

test("heartbeat cafes never go stale", () => {
  const old = noonWib - STALE_AFTER_MS - 1;
  assert.equal(isStale({ confirmedAt: old, heartbeat: false }, noonWib), true);
  assert.equal(isStale({ confirmedAt: old, heartbeat: true }, noonWib), false);
});

test("formatters", () => {
  assert.equal(formatDistance(340), "350 m");
  assert.equal(formatDistance(1234), "1,2 km");
  assert.equal(formatDistance(42_400), "42 km");
  assert.equal(formatAge(noonWib - 20_000, noonWib), "baru saja");
  assert.equal(formatAge(noonWib - 9 * 60_000, noonWib), "9 mnt lalu");
  assert.equal(formatAge(noonWib - 3 * 3_600_000, noonWib), "3 jam lalu");
  assert.equal(formatClock(8 * 60), "08.00");
  assert.equal(formatClock(23 * 60 + 30), "23.30");
});

test("most room ranks by free tables, then free seats, then distance", () => {
  const names = rank(
    [
      cafe({ id: 1, name: "Far", freeSizes: [4, 4], lat: 0.02 }),
      cafe({ id: 2, name: "Near", freeSizes: [2, 6], lat: 0.001 }),
      cafe({ id: 3, name: "OneBig", freeSizes: [8], lat: 0.001 }),
      cafe({ id: 4, name: "Pairs", freeSizes: [2, 2, 2], lat: 0.05 }),
      cafe({ id: 5, name: "Roomier", freeSizes: [4, 6], lat: 0.05 }),
    ],
    { origin: { lat: 0, lng: 0 } },
  );
  assert.deepEqual(names, ["Pairs", "Roomier", "Near", "Far", "OneBig"]);
});

test("stale open cafes are hidden; closed cafes sit at the bottom", () => {
  const names = rank([
    cafe({ id: 1, name: "Closed", opensMin: 14 * 60, closesMin: 22 * 60, freeSizes: [8, 8] }),
    cafe({ id: 2, name: "Stale", freeSizes: [8, 8], confirmedAt: noonWib - STALE_AFTER_MS - 1 }),
    cafe({ id: 3, name: "Full", freeSizes: [] }),
    cafe({ id: 4, name: "Fresh", freeSizes: [2] }),
    cafe({ id: 5, name: "Demo", freeSizes: [4], heartbeat: true, confirmedAt: 0 }),
  ]);
  assert.deepEqual(names, ["Demo", "Fresh", "Full", "Closed"]);
});

test("party filter hides cafes with no fitting table but keeps closed ones", () => {
  const cafes = [
    cafe({ id: 1, name: "Pairs", freeSizes: [2, 2, 2] }),
    cafe({ id: 2, name: "Big", freeSizes: [6] }),
    cafe({ id: 3, name: "Closed", opensMin: 14 * 60, closesMin: 22 * 60 }),
  ];
  assert.deepEqual(rank(cafes, { party: "5+" }), ["Big", "Closed"]);
  assert.deepEqual(rank(cafes, { party: "1-2" }), ["Pairs", "Closed"]);
  const ranked = rankCafes(cafes, { sort: "room", origin: null, query: "", party: "1-2", now: noonWib });
  assert.equal(ranked[0].fits, 3);
  assert.equal(ranked[0].freeTables, 3);
  assert.equal(ranked[0].freeSeats, 6);
});

test("nearest sorts by distance and search matches name or area", () => {
  const cafes = [
    cafe({ id: 1, name: "Loka Roasters", area: "Dago", lat: 0.02 }),
    cafe({ id: 2, name: "Halte Kopi", area: "Braga", lat: 0.001 }),
  ];
  assert.deepEqual(rank(cafes, { sort: "nearest", origin: { lat: 0, lng: 0 } }), ["Halte Kopi", "Loka Roasters"]);
  assert.deepEqual(rank(cafes, { query: " brag " }), ["Halte Kopi"]);
});

test("simulated flips follow the bias and fall back when one side is exhausted", () => {
  const tables = [
    { id: 1, free: true },
    { id: 2, free: false },
  ];
  const fixed = (...values: number[]) => () => values.shift() ?? 0;
  assert.deepEqual(pickFlip(tables, 0.5, fixed(0.1, 0)), { id: 2, free: true });
  assert.deepEqual(pickFlip(tables, 0.5, fixed(0.9, 0)), { id: 1, free: false });
  assert.deepEqual(pickFlip([{ id: 3, free: true }], 0.5, fixed(0.1, 0)), { id: 3, free: false });
  assert.equal(pickFlip([], 0.5, fixed(0.1)), null);
});
