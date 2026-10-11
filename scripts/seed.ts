// Resets the local database to the demo cafes. Plant them near you with
// SEED_LAT=<lat> SEED_LNG=<lng> npm run seed
import { db, seed } from "../lib/db.ts";

const client = await db();
await seed(client, { reset: true });
const count = await client.execute("SELECT COUNT(*) AS n FROM cafes");
console.log(`Seeded ${count.rows[0].n} demo cafes.`);
