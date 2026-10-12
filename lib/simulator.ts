import { db } from "./db.ts";
import { isOpen, pickFlip } from "./occupancy.ts";

const TICK_MS = 15_000;
const MAX_CATCH_UP = 4;
const HANDS_OFF_MS = 10 * 60 * 1000;

// Demo only: makes the fictional cafes look alive by seating or clearing one table per tick.
// There is no background worker, so the finder's poll calls this and it decides whether a
// tick is due. Cafes without a heartbeat, closed cafes, and cafes a person touched in the
// last ten minutes are left alone.
export async function simulate(now = Date.now()): Promise<void> {
  const client = await db();
  const clock = await client.execute("SELECT value FROM meta WHERE key = 'last_sim_at'");
  const last = Number(clock.rows[0]?.value ?? 0);
  if (now - last < TICK_MS) return;

  // Only the poll that moves the clock forward gets to flip tables.
  const claimed = await client.execute({
    sql: "UPDATE meta SET value = ? WHERE key = 'last_sim_at' AND value = ?",
    args: [now, last],
  });
  if (claimed.rowsAffected === 0) return;

  const cafes = await client.execute({
    sql: "SELECT id, opens_min, closes_min, sim_bias FROM cafes WHERE heartbeat = 1 AND manual_at < ?",
    args: [now - HANDS_OFF_MS],
  });
  const eligible = cafes.rows.filter((row) =>
    isOpen({ opensMin: Number(row.opens_min), closesMin: Number(row.closes_min) }, now),
  );
  if (eligible.length === 0) return;

  const ticks = last === 0 ? 1 : Math.min(MAX_CATCH_UP, Math.floor((now - last) / TICK_MS));
  for (let i = 0; i < ticks; i++) {
    const cafe = eligible[Math.floor(Math.random() * eligible.length)];
    const tables = await client.execute({ sql: "SELECT id, free FROM cafe_tables WHERE cafe_id = ?", args: [cafe.id] });
    const states = tables.rows.map((t) => ({ id: Number(t.id), free: Number(t.free) === 1 }));
    // sim_bias is the share of tables this cafe tends to keep free; the further it drifts
    // from that, the harder it is pulled back, so no cafe sticks at empty or full.
    const freeShare = states.filter((t) => t.free).length / Math.max(1, states.length);
    const flip = pickFlip(states, 0.5 + (Number(cafe.sim_bias) - freeShare), Math.random);
    if (!flip) continue;
    await client.batch(
      [
        { sql: "UPDATE cafe_tables SET free = ? WHERE id = ?", args: [Number(flip.free), flip.id] },
        { sql: "UPDATE cafes SET confirmed_at = ? WHERE id = ?", args: [now, cafe.id] },
      ],
      "write",
    );
  }
}
