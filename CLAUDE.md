# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

where2go — a platform to monitor live occupancy of cafes.

## Role

Act as a design engineer: own both the visual result and the implementation. Treat spacing, type, radius, color, and state fidelity as correctness, not polish — UI that works but drifts from the design system is not done. Verify UI work visually in a browser (desktop and mobile widths) before reporting it complete.

## Design system

`DESIGN.md` is the source of truth for all UI. Read it before building or changing any interface.

- Tokens live in its YAML front matter (`colors`, `typography`, `rounded`, `spacing`, `components`). Map them once into the stack's theme layer (CSS variables / Tailwind theme / equivalent) and consume them from there — never inline hex values or ad-hoc px values in components.
- Build components from the `components:` entries by key (e.g. `button-primary`, `occupancy-row`, `nav-pill-group`); state variants (`-active`, `-disabled`, `-focused`) are separate entries.
- Follow its "Do's and Don'ts", "Responsive Behavior", and "Iteration Guide" sections. Rules that are easy to violate:
  - Primary actions are near-black (`colors.primary`), never accent or badge colors.
  - Cal Sans (self-hosted, OFL, `app/fonts/`) at weight 600 with negative letter-spacing for the wordmark, seat numerals, and page h1 only. Everything else: Inter.
  - Dark surfaces are scarce: the footer only.
  - No hover styling beyond what is specified; default and active/pressed states only.
- When a needed token or component is missing, propose an addition to `DESIGN.md` using its existing naming and reuse existing tokens rather than inventing one-off values in code. Touch targets are 44px minimum; occupancy color is never the only signal.

## Commands

- `npm run dev` — Next.js dev server on http://localhost:3000 (`/` finder, `/merchant` staff screen). `.claude/launch.json` defines it as `where2go` for the preview tool.
- `npm test` — unit tests (`tsx --test`). Single test: `npx tsx --test --test-name-pattern "<name>" lib/occupancy.test.ts`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run seed` — reset the database to the demo cafes; `SEED_LAT` / `SEED_LNG` plant them around a point.
- `npm run build` — production build.

Toolchain constraints found the hard way: TypeScript must stay on 5.x (Next 15 rejects TypeScript 7), the Next config is `next.config.mjs` (not `.ts`), and SQLite goes through `@libsql/client` because `better-sqlite3` does not build on this machine.

## Architecture

Next.js App Router + a local SQLite file (`data/where2go.db`, gitignored, created and seeded on first request). `PRODUCT.md` holds product truth; read it before changing behavior.

- `lib/occupancy.ts` — all pure domain logic shared by server and client: occupancy levels, stale threshold, distance, formatting, and `rankCafes` (fresh cafes with seats, then counts not confirmed in 30 min, then confirmed full). Change ranking or thresholds here and in its test, nowhere else.
- `lib/db.ts` → `lib/cafes.ts` — one libsql client per process (cached on `globalThis`), schema + seed, then the only queries. The cafe `code` column is the merchant credential and is never selected into a `Cafe`; keep it out of any API response. Seat changes are clamped in SQL (`MAX(0, MIN(total_seats, ...))`) so concurrent staff devices cannot push a count out of range; `+/-` sends a `delta`, quick-set sends an absolute `freeSeats`.
- `lib/session.ts` — merchant session is the cafe code in an httpOnly cookie, plus an in-memory per-process login limiter. MVP-grade, not production auth.
- `app/api/cafes` (public list), `app/api/merchant/session` (enter/leave a cafe), `app/api/merchant/cafe` (read/change the session's cafe).
- `components/Finder.tsx` — server-rendered initial list, then polls `/api/cafes` every 5s while the tab is visible. Detects count changes between polls to drive the signature interaction: the row slides to its new rank (FLIP in `useRankMotion`) and stays marked with "was N" for 30s.
- `components/SeatUpdater.tsx` — optimistic updates with rollback on failure; polls every 10s to stay in sync with other devices at the same cafe.
- `app/globals.css` — DESIGN.md tokens as CSS variables and every component class. No CSS framework.

`.impeccable/` holds design-tool state: `surfaces/` (surface brief + direction contract) and `config.json` are committed; `mocks/`, `review/`, `tmp/` are gitignored.
