import { mkdirSync, writeFileSync } from "node:fs";
import { createClient, type Client } from "@libsql/client";
import { demoCafes } from "./seed.ts";

// Bump when the tables below change shape. The database only holds demo data, so a
// mismatch drops everything and reseeds instead of migrating.
const SCHEMA_VERSION = 3;
const CODES_FILE = "data/demo-codes.txt";

const SCHEMA = [
  `CREATE TABLE cafes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    address TEXT NOT NULL,
    landmark TEXT NOT NULL,
    price_from INTEGER NOT NULL,
    facilities TEXT NOT NULL,
    rules TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    opens_min INTEGER NOT NULL,
    closes_min INTEGER NOT NULL,
    confirmed_at INTEGER NOT NULL,
    manual_at INTEGER NOT NULL DEFAULT 0,
    heartbeat INTEGER NOT NULL DEFAULT 0,
    sim_bias REAL NOT NULL DEFAULT 0.5
  )`,
  `CREATE TABLE cafe_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cafe_id INTEGER NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
    label INTEGER NOT NULL,
    zone TEXT NOT NULL,
    size INTEGER NOT NULL CHECK (size > 0),
    free INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE INDEX cafe_tables_cafe ON cafe_tables(cafe_id)`,
  `CREATE TABLE meta (key TEXT PRIMARY KEY, value INTEGER NOT NULL)`,
  `INSERT INTO meta (key, value) VALUES ('last_sim_at', 0)`,
];

async function reset(client: Client) {
  await client.batch(
    [
      "DROP TABLE IF EXISTS cafe_tables",
      "DROP TABLE IF EXISTS cafes",
      "DROP TABLE IF EXISTS meta",
      ...SCHEMA,
      `PRAGMA user_version = ${SCHEMA_VERSION}`,
    ],
    "write",
  );
}

export async function seed(client: Client) {
  await reset(client);
  const cafes = demoCafes(Date.now());
  for (const c of cafes) {
    const inserted = await client.execute({
      sql: `INSERT INTO cafes (name, area, lat, lng, address, landmark, price_from, facilities, rules,
                               code, opens_min, closes_min, confirmed_at, heartbeat, sim_bias)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        c.name,
        c.area,
        c.lat,
        c.lng,
        c.address,
        c.landmark,
        c.priceFrom,
        JSON.stringify(c.facilities),
        JSON.stringify(c.rules),
        c.code,
        c.opensMin,
        c.closesMin,
        c.confirmedAt,
        Number(c.heartbeat),
        c.bias,
      ],
    });
    await client.batch(
      c.tables.map((t, index) => ({
        sql: "INSERT INTO cafe_tables (cafe_id, label, zone, size, free) VALUES (?, ?, ?, ?, ?)",
        args: [inserted.lastInsertRowid!, index + 1, t.zone, t.size, Number(t.free)],
      })),
      "write",
    );
  }
  // Codes are generated per seed and kept out of the repository.
  writeFileSync(
    CODES_FILE,
    cafes.map((c) => `${c.code}  ${c.name}${c.note ? `  (${c.note})` : ""}`).join("\n") + "\n",
  );
}

async function init(): Promise<Client> {
  mkdirSync("data", { recursive: true });
  const client = createClient({ url: process.env.DATABASE_URL ?? "file:data/where2go.db" });
  const version = await client.execute("PRAGMA user_version");
  if (Number(version.rows[0].user_version) !== SCHEMA_VERSION) await seed(client);
  return client;
}

// One connection per process; survives Next.js dev hot reloads.
const globalForDb = globalThis as { where2goDb?: Promise<Client> };

export function db(): Promise<Client> {
  return (globalForDb.where2goDb ??= init());
}
