import { mkdirSync } from "node:fs";
import { createClient, type Client } from "@libsql/client";
import { demoCafes } from "./seed.ts";

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS cafes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    total_seats INTEGER NOT NULL CHECK (total_seats > 0),
    free_seats INTEGER NOT NULL CHECK (free_seats >= 0),
    code TEXT NOT NULL UNIQUE,
    updated_at INTEGER NOT NULL
  )
`;

export async function seed(client: Client, { reset = false } = {}) {
  if (reset) await client.execute("DELETE FROM cafes");
  await client.batch(
    demoCafes(Date.now()).map((c) => ({
      sql: `INSERT INTO cafes (name, area, lat, lng, total_seats, free_seats, code, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [c.name, c.area, c.lat, c.lng, c.totalSeats, c.freeSeats, c.code, c.updatedAt],
    })),
    "write",
  );
}

async function init(): Promise<Client> {
  const url = process.env.DATABASE_URL ?? "file:data/where2go.db";
  if (url.startsWith("file:data/")) mkdirSync("data", { recursive: true });
  const client = createClient({ url });
  await client.execute(SCHEMA);
  const count = await client.execute("SELECT COUNT(*) AS n FROM cafes");
  if (Number(count.rows[0].n) === 0) await seed(client);
  return client;
}

// One connection per process; survives Next.js dev hot reloads.
const globalForDb = globalThis as { where2goDb?: Promise<Client> };

export function db(): Promise<Client> {
  return (globalForDb.where2goDb ??= init());
}
