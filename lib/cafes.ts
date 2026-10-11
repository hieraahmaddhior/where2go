import type { Row } from "@libsql/client";
import { db } from "./db.ts";
import type { Cafe } from "./occupancy.ts";

// The cafe code is the merchant's credential, so it is never selected into a Cafe.
const COLUMNS = "id, name, area, lat, lng, total_seats, free_seats, updated_at";

function toCafe(row: Row): Cafe {
  return {
    id: Number(row.id),
    name: String(row.name),
    area: String(row.area),
    lat: Number(row.lat),
    lng: Number(row.lng),
    totalSeats: Number(row.total_seats),
    freeSeats: Number(row.free_seats),
    updatedAt: Number(row.updated_at),
  };
}

export function normalizeCode(code: unknown): string {
  return typeof code === "string" ? code.trim().toUpperCase() : "";
}

export async function listCafes(): Promise<Cafe[]> {
  const result = await (await db()).execute(`SELECT ${COLUMNS} FROM cafes`);
  return result.rows.map(toCafe);
}

export async function getCafeByCode(code: string): Promise<Cafe | null> {
  if (!code) return null;
  const result = await (await db()).execute({
    sql: `SELECT ${COLUMNS} FROM cafes WHERE code = ?`,
    args: [code],
  });
  return result.rows[0] ? toCafe(result.rows[0]) : null;
}

export type SeatChange = { delta: number } | { freeSeats: number };

// Clamped in SQL so two staff devices tapping at once cannot push the count out of range.
export async function changeFreeSeats(code: string, change: SeatChange): Promise<Cafe | null> {
  const target = "delta" in change ? "free_seats + ?" : "?";
  const value = "delta" in change ? change.delta : change.freeSeats;
  const result = await (await db()).execute({
    sql: `UPDATE cafes
          SET free_seats = MAX(0, MIN(total_seats, ${target})), updated_at = ?
          WHERE code = ?
          RETURNING ${COLUMNS}`,
    args: [value, Date.now(), code],
  });
  return result.rows[0] ? toCafe(result.rows[0]) : null;
}
