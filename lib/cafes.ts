import type { Row } from "@libsql/client";
import { db } from "./db.ts";
import type { Cafe, CafeTable } from "./occupancy.ts";

export type MerchantCafe = Cafe & { tables: CafeTable[] };
export type CafeDetail = MerchantCafe & {
  address: string;
  landmark: string;
  priceFrom: number;
  facilities: string[];
  rules: string[];
};

// The cafe code is the merchant's credential, so it is never selected into a Cafe.
const CAFE_COLUMNS = "id, name, area, lat, lng, opens_min, closes_min, confirmed_at, heartbeat";
const DETAIL_COLUMNS = `${CAFE_COLUMNS}, address, landmark, price_from, facilities, rules`;
const TABLE_COLUMNS = "id, label, zone, size, free";

function toCafe(row: Row, tables: CafeTable[]): MerchantCafe {
  return {
    id: Number(row.id),
    name: String(row.name),
    area: String(row.area),
    lat: Number(row.lat),
    lng: Number(row.lng),
    opensMin: Number(row.opens_min),
    closesMin: Number(row.closes_min),
    confirmedAt: Number(row.confirmed_at),
    heartbeat: Number(row.heartbeat) === 1,
    totalSeats: tables.reduce((sum, t) => sum + t.size, 0),
    totalTables: tables.length,
    freeSizes: tables.filter((t) => t.free).map((t) => t.size),
    tables,
  };
}

function toTable(row: Row): CafeTable {
  return {
    id: Number(row.id),
    label: Number(row.label),
    zone: String(row.zone),
    size: Number(row.size),
    free: Number(row.free) === 1,
  };
}

export function normalizeCode(code: unknown): string {
  return typeof code === "string" ? code.trim().toUpperCase() : "";
}

export async function listCafes(): Promise<Cafe[]> {
  const client = await db();
  const [cafes, tables] = await client.batch(
    [`SELECT ${CAFE_COLUMNS} FROM cafes`, `SELECT cafe_id, ${TABLE_COLUMNS} FROM cafe_tables ORDER BY label`],
    "read",
  );
  const byCafe = new Map<number, CafeTable[]>();
  for (const row of tables.rows) {
    const list = byCafe.get(Number(row.cafe_id)) ?? [];
    list.push(toTable(row));
    byCafe.set(Number(row.cafe_id), list);
  }
  // Per-table detail is fetched per cafe; the board only needs free sizes.
  return cafes.rows.map((row) => {
    const { tables: _tables, ...cafe } = toCafe(row, byCafe.get(Number(row.id)) ?? []);
    return cafe;
  });
}

async function tablesOf(cafeId: unknown): Promise<CafeTable[]> {
  const result = await (await db()).execute({
    sql: `SELECT ${TABLE_COLUMNS} FROM cafe_tables WHERE cafe_id = ? ORDER BY label`,
    args: [Number(cafeId)],
  });
  return result.rows.map(toTable);
}

export async function getCafeDetail(id: number): Promise<CafeDetail | null> {
  if (!Number.isInteger(id)) return null;
  const result = await (await db()).execute({ sql: `SELECT ${DETAIL_COLUMNS} FROM cafes WHERE id = ?`, args: [id] });
  const row = result.rows[0];
  if (!row) return null;
  return {
    ...toCafe(row, await tablesOf(row.id)),
    address: String(row.address),
    landmark: String(row.landmark),
    priceFrom: Number(row.price_from),
    facilities: JSON.parse(String(row.facilities)),
    rules: JSON.parse(String(row.rules)),
  };
}

export async function getCafeByCode(code: string): Promise<MerchantCafe | null> {
  if (!code) return null;
  const cafe = await (await db()).execute({ sql: `SELECT ${CAFE_COLUMNS} FROM cafes WHERE code = ?`, args: [code] });
  if (!cafe.rows[0]) return null;
  return toCafe(cafe.rows[0], await tablesOf(cafe.rows[0].id));
}

export type TableChange = { tableId: number; free: boolean } | { all: boolean } | { confirm: true };

// Changes set a state instead of toggling, so two staff devices tapping the same table agree.
// Every change, including a bare confirm, counts as staff vouching for the whole layout.
export async function changeTables(code: string, change: TableChange): Promise<MerchantCafe | null> {
  const cafe = await getCafeByCode(code);
  if (!cafe) return null;
  const client = await db();
  const now = Date.now();
  const touch = { sql: "UPDATE cafes SET confirmed_at = ?, manual_at = ? WHERE id = ?", args: [now, now, cafe.id] };

  if ("tableId" in change) {
    await client.batch(
      [
        {
          sql: "UPDATE cafe_tables SET free = ? WHERE id = ? AND cafe_id = ?",
          args: [Number(change.free), change.tableId, cafe.id],
        },
        touch,
      ],
      "write",
    );
  } else if ("all" in change) {
    await client.batch(
      [{ sql: "UPDATE cafe_tables SET free = ? WHERE cafe_id = ?", args: [Number(change.all), cafe.id] }, touch],
      "write",
    );
  } else {
    await client.execute(touch);
  }
  return getCafeByCode(code);
}
