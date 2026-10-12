# where2go

A platform to monitor live occupancy of cafes.

Cafe-goers see a ranked list of nearby cafes by seats free and can filter by party size. Cafe staff mark their own tables free or taken with a cafe code. The interface is in Indonesian.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the finder (tap a cafe for its detail page) and http://localhost:3000/merchant for the staff screen.

The SQLite database is created at `data/where2go.db` on first request and seeded with fictional demo cafes. Cafe codes are random per seed and written to `data/demo-codes.txt` (gitignored).

## Demo data near you

Demo cafes are planted around a default point. To plant them around your own location:

```bash
SEED_LAT=<latitude> SEED_LNG=<longitude> npm run seed
```

`npm run seed` always resets the database to the demo cafes and generates new codes.

## Demo behavior

- While the finder is open, a simulator seats or clears one table about every 15 seconds. It skips closed cafes and any cafe changed by hand in the last 10 minutes.
- One demo cafe is seeded closed (opens two hours after seeding). One starts hidden: open its staff screen and tap "Masih benar" to put it on the board.
- Demo cafes are open 07.00–02.00 WIB; outside those hours the board shows them as closed.

## Checks

```bash
npm test
npm run typecheck
```

## MVP limits

- Cafe codes are the only merchant credential. Code guessing is slowed by an in-memory, per-process limiter; this is not production-grade auth.
- The finder polls every 5 seconds; there is no push channel.
- Table layouts, zones, opening hours, addresses, prices, facilities, and rules are invented and seeded; there is no setup screen.
- Cafe photos and floor plans are placeholders.
- All cafes are fictional and their table activity is simulated.
