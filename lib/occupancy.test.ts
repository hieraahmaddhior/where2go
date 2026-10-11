import assert from "node:assert/strict";
import { test } from "node:test";
import {
  clampSeats,
  formatAge,
  formatDistance,
  level,
  rankCafes,
  STALE_AFTER_MS,
  type Cafe,
} from "./occupancy.ts";

const now = 1_700_000_000_000;
const cafe = (over: Partial<Cafe>): Cafe => ({
  id: 1,
  name: "A",
  area: "Dago",
  lat: 0,
  lng: 0,
  totalSeats: 20,
  freeSeats: 10,
  updatedAt: now,
  ...over,
});

test("level maps free ratio to a state", () => {
  assert.equal(level(18, 24), "roomy");
  assert.equal(level(5, 16), "filling");
  assert.equal(level(2, 28), "tight");
  assert.equal(level(0, 12), "full");
});

test("clampSeats keeps the count inside the cafe", () => {
  assert.equal(clampSeats(-3, 20), 0);
  assert.equal(clampSeats(25, 20), 20);
  assert.equal(clampSeats(7.4, 20), 7);
});

test("formatters", () => {
  assert.equal(formatDistance(340), "350 m");
  assert.equal(formatDistance(1234), "1.2 km");
  assert.equal(formatDistance(42_400), "42 km");
  assert.equal(formatAge(now - 20_000, now), "just now");
  assert.equal(formatAge(now - 9 * 60_000, now), "9 min ago");
  assert.equal(formatAge(now - 3 * 3_600_000, now), "3 h ago");
});

test("most room ranks by free seats, then distance", () => {
  const ranked = rankCafes(
    [
      cafe({ id: 1, name: "Far", freeSeats: 8, lat: 0.02 }),
      cafe({ id: 2, name: "Near", freeSeats: 8, lat: 0.001 }),
      cafe({ id: 3, name: "Most", freeSeats: 15, lat: 0.05 }),
    ],
    { sort: "room", origin: { lat: 0, lng: 0 }, query: "", now },
  );
  assert.deepEqual(ranked.map((c) => c.name), ["Most", "Near", "Far"]);
});

test("stale counts sit below fresh room and above confirmed full", () => {
  const ranked = rankCafes(
    [
      cafe({ id: 1, name: "Full", freeSeats: 0 }),
      cafe({ id: 2, name: "Stale", freeSeats: 19, updatedAt: now - STALE_AFTER_MS - 1 }),
      cafe({ id: 3, name: "Fresh", freeSeats: 3 }),
    ],
    { sort: "room", origin: null, query: "", now },
  );
  assert.deepEqual(ranked.map((c) => c.name), ["Fresh", "Stale", "Full"]);
  assert.equal(ranked[1].stale, true);
  assert.equal(ranked[0].distance, null);
});

test("nearest sorts by distance and search matches name or area", () => {
  const cafes = [
    cafe({ id: 1, name: "Loka Roasters", area: "Dago", lat: 0.02 }),
    cafe({ id: 2, name: "Halte Kopi", area: "Braga", lat: 0.001 }),
  ];
  const nearest = rankCafes(cafes, { sort: "nearest", origin: { lat: 0, lng: 0 }, query: "", now });
  assert.deepEqual(nearest.map((c) => c.id), [2, 1]);
  const found = rankCafes(cafes, { sort: "room", origin: null, query: " brag ", now });
  assert.deepEqual(found.map((c) => c.id), [2]);
});
