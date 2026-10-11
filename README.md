# where2go

A platform to monitor live occupancy of cafes.

Cafe-goers see a ranked list of nearby cafes by seats free. Cafe staff update their own cafe's free-seat count with a cafe code.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the finder and http://localhost:3000/merchant for the staff screen.

The SQLite database is created at `data/where2go.db` on first request and seeded with fictional demo cafes. Demo cafe codes are listed in `lib/seed.ts`.

## Demo data near you

Demo cafes are planted around a default point. To plant them around your own location:

```bash
SEED_LAT=<latitude> SEED_LNG=<longitude> npm run seed
```

`npm run seed` always resets the database to the demo cafes.

## Checks

```bash
npm test
npm run typecheck
```

## MVP limits

- Cafe codes are the only merchant credential. Code guessing is slowed by an in-memory, per-process limiter; this is not production-grade auth.
- The finder polls every 5 seconds; there is no push channel.
- All cafes are fictional demo data.
