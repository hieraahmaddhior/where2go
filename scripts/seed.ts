// Resets the local database to the demo cafes and writes fresh cafe codes to
// data/demo-codes.txt.
import { db, seed } from "../lib/db.ts";

async function main() {
  const client = await db();
  await seed(client);
  const count = await client.execute("SELECT COUNT(*) AS n FROM cafes");
  console.log(`Seeded ${count.rows[0].n} demo cafes. Cafe codes: data/demo-codes.txt`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
