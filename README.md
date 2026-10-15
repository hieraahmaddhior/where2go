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

## Demo data

The demo uses real cafes around 99 Coffee Roaster on Jl. Affandi (Gejayan), Yogyakarta. Names, addresses, coordinates, and some opening hours are real (read from Google Maps on 2026-10-13). Table layouts, facilities, rules, prices, the remaining hours, and all table activity are invented; `lib/seed.ts` marks which is which, and the interface says so on every page.

`npm run seed` resets the database to these cafes and generates new codes.

## Demo behavior

- While the finder or a cafe page is open, a simulator seats or clears one table about every 15 seconds. It skips closed cafes and any cafe changed by hand in the last 10 minutes.
- One cafe (Kala Liyangan Coffee) starts hidden: open its staff screen and tap "Masih benar" to put it on the board.
- Each cafe follows its own opening hours in WIB; outside them the board shows it as closed.

## Checks

```bash
npm test
npm run typecheck
```

## MVP limits

- Cafe codes are the only merchant credential. Code guessing is slowed by an in-memory, per-process limiter; this is not production-grade auth.
- The finder polls every 5 seconds; there is no push channel.
- Table layouts, zones, prices, facilities, rules, and some opening hours are invented and seeded; there is no setup screen.
- Cafe photos and floor plans are placeholders.
- The cafes are real places, but nothing about their tables, facilities, rules, or prices came from them.
