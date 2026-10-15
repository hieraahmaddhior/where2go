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
- When a needed token or component is missing, propose an addition to `DESIGN.md` using its existing naming and reuse existing tokens rather than inventing one-off values in code. Touch targets are 44px minimum; occupancy is never colour-coded (numbers and words only).

## Commands

- `npm run dev` — Next.js dev server on http://localhost:3000 (`/` finder, `/kafe/<id>` cafe detail, `/merchant` staff screen). `.claude/launch.json` defines it as `where2go` for the preview tool.
- `npm test` — unit tests (`tsx --test`). Single test: `npx tsx --test --test-name-pattern "<name>" lib/occupancy.test.ts`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run seed` — reset the database to the demo cafes and write fresh cafe codes to `data/demo-codes.txt` (gitignored).
- `npm run build` — production build.

Toolchain constraints found the hard way: TypeScript must stay on 5.x (Next 15 rejects TypeScript 7), the Next config is `next.config.mjs` (not `.ts`), and SQLite goes through `@libsql/client` because `better-sqlite3` does not build on this machine.

## Architecture

Next.js App Router + a local SQLite file (`data/where2go.db`, gitignored, created and seeded on first request). `PRODUCT.md` holds product truth; read it before changing behavior.

- `lib/occupancy.ts` — all pure domain logic shared by server and client: free tables as the headline number with free seats as an estimate derived from free table sizes, party fit rule, opening hours (WIB), stale threshold, occupancy levels, formatting (Indonesian), and `rankCafes` (open and confirmed cafes by free tables then free seats, stale ones hidden, closed ones last). Change ranking, fit, or thresholds here and in its test, nowhere else.
- `lib/db.ts` → `lib/cafes.ts` — one libsql client per process (cached on `globalThis`), schema + seed, then the only queries. Tables are `cafes`, `cafe_tables` (one row per table: zone, size, free), and `meta`. After bumping `SCHEMA_VERSION` while the dev server runs, run `npm run seed` so the running process sees the new schema. `SCHEMA_VERSION` in `lib/db.ts` is checked against `PRAGMA user_version`; a mismatch drops and reseeds (demo data only, no migrations). The cafe `code` column is the merchant credential and is never selected into a `Cafe`; keep it out of any API response. Table changes set a state rather than toggling, so two staff devices agree; every change or bare confirm stamps `confirmed_at` (freshness) and `manual_at` (keeps the simulator away).
- `lib/simulator.ts` — demo only. No background worker: the finder's poll (`GET /api/cafes`) calls `simulate()`, which claims a tick at most every 15s and flips one table on a random heartbeat cafe that is open and untouched by hand for 10 minutes. `sim_bias` is the share of tables a cafe tends to keep free.
- `lib/seed.ts` — the demo cafes: real cafes near Gejayan, Yogyakarta (real name, address, coordinates, some hours) with invented tables, zones, facilities, rules, and prices; its header comment and per-line "listed"/"assumed" marks say which is which. One cafe has no heartbeat (hidden until its staff confirm). The footer and the note on each cafe page state what is simulated; keep them (see PRODUCT.md, Evidence on Hand).
- `lib/session.ts` — merchant session is the cafe code in an httpOnly cookie, plus an in-memory per-process login limiter. MVP-grade, not production auth.
- `app/api/cafes` (public list), `app/api/cafes/[id]` (public detail: per-table state, address, facilities, rules), `app/api/merchant/session` (enter/leave a cafe), `app/api/merchant/cafe` (read/change the session's cafe).
- `components/CafeDetail.tsx` (`app/kafe/[id]`) — the customer's detail page; polls its cafe every 5s. Photo and floor-plan areas are labeled placeholders by decision, not unfinished work.
- `components/Finder.tsx` — server-rendered initial list, then polls `/api/cafes` every 5s while the tab is visible. Detects count changes between polls to drive the signature interaction: the row slides to its new rank (FLIP in `useRankMotion`) and stays marked for 30s with the event in words ("+1 meja kosong", "1 meja terisi").
- `components/SeatUpdater.tsx` — the merchant's table tiles; optimistic updates with rollback on failure; polls every 10s to stay in sync with other devices at the same cafe.
- UI strings are Indonesian and live inline in the components and `lib/occupancy.ts` formatters; code, comments, and docs are English.
- `app/globals.css` — DESIGN.md tokens as CSS variables and every component class. No CSS framework.

`.impeccable/` holds design-tool state: `surfaces/` (surface brief + direction contract) and `config.json` are committed; `mocks/`, `review/`, `tmp/` are gitignored.
