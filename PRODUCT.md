# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) with a local SQLite file for data, reached through `@libsql/client`. Chosen by the user because it runs with zero external accounts or keys. Live occupancy reaches clients by polling. Deployment (Turso + Vercel, same client) is planned for showing the demo on the audience's own phones, and is deliberately not built yet.

## Users

- **Cafe-goers** — someone deciding where to go right now, usually on a phone, alone or with a group, who wants a nearby cafe with a table that fits them. Job: find the nearby cafe with the most room without walking there to check.
- **Merchants (cafe staff)** — someone behind the counter, mid-service, with seconds to spare. Job: keep their cafe's tables marked free or taken.

The first audience for this build is a demo or pitch: people watching the board react while a presenter taps the merchant screen.

## Product Purpose

where2go shows live occupancy of cafes. Cafe-goers search nearby cafes and see which have the most free tables; merchants mark their own tables free or taken. Success for the demo: a merchant taps a table and a cafe-goer sees the cafe's table count change and its row move within seconds.

## Positioning

Occupancy is reported live by the cafe itself, table by table, not estimated from historical foot-traffic patterns. A count is only shown while the cafe's staff stand behind it.

## Operating Context

- Cafe-goer: on the move, phone in hand, browser location permission may or may not be granted.
- Merchant: at the counter on a phone or tablet during service; one tap per real event (a party sits down, a party leaves).
- Language: the interface is Indonesian, neutral in voice (no "kamu"/"Anda" where avoidable). Terms: "kursi kosong" for free seats, "meja" for tables. Code and project documents stay in English.
- Times are WIB.

## Capabilities and Constraints

Confirmed:

- **Tables model.** A cafe has tables of size 2, 4, 6, or 8. Each table is binary, free or taken; a partly used table is taken, because an empty chair at a stranger's table is not a place a new party can sit.
- **Tables lead, seats are an estimate.** The number shown first everywhere is free tables. Free seats are the sum of free tables' sizes, shown second and marked as approximate ("±14 kursi"); they are never edited directly. Solo guests at 2- and 4-seat tables are why seats alone mislead.
- **Ranking.** The finder ranks by most free tables, then most free seats, then distance. An alternate sort ranks by nearest.
- **Row content.** The large numeral is always free tables out of total tables. The meta line shows distance or area, the estimated free seats, and the age of the count.
- **Party filter.** Semua / 1–2 / 3–4 / 5+. A party fits a single free table at most one size up: 1–2 fits tables of 2 or 4, 3–4 fits 4 or 6, 5+ fits 6 or 8. Tables are never combined. Cafes with no fitting table are hidden; the meta line then shows how many free tables fit in place of the seat estimate.
- **Stale counts are hidden.** An open cafe whose tables nobody has changed or confirmed in 30 minutes is left off the board. Its merchant screen says so and offers "Masih benar" to confirm an unchanged layout; that or any table tap brings the cafe back.
- **Opening hours.** Each cafe has seeded opening hours. A closed cafe is shown below all open ones as "Tutup · buka HH.MM" with no count.
- **Merchant access** is a cafe code: enter it, land on that cafe's tables. No user accounts. Codes are random and generated at seed time.
- **Merchant saves are instant, with a way back.** A table tap is saved immediately, with no separate "update" button: an unsaved draft that looks saved on the staff screen is the worst failure this product can have. The last tap can be undone for a few seconds.
- **Merchant bulk actions.** "Tandai penuh" and "Tandai semua kosong" ask for confirmation first, because one tap changes every table.
- **Search** by cafe name or area; **no map**.
- **Cafe detail page** (`/kafe/<id>`), opened by tapping a row. In order: name, open status ("Buka sampai 02.00", "Tutup 45 mnt lagi", "Tutup · buka 07.00"), distance or area, directions; free tables now, broken down by table size and by zone (floor, terrace), with when staff last confirmed; facilities; house rules (time limits, minimum order, laptops); how to find it (address and a landmark); opening hours and the price drinks start from. The breakdown switches between "by table size" and "by zone"; by zone is an accordion that shows each zone's free-table total when closed and its floor plan and sizes when open. Photos (storefront, each zone) and each zone's floor plan have reserved, labeled placeholders and no content yet.
- **Zones.** Every table belongs to a zone of its cafe ("Lantai 1", "Teras").

Demo behavior (labeled as demo in the interface):

- Table layouts, zones, prices, facilities, rules, and some hours are invented and seeded on top of real cafe names, addresses, and coordinates; there is no setup screen for merchants yet.
- Demo cafes carry a heartbeat so they never go stale, except one (Kala Liyangan Coffee) that starts hidden to demonstrate hidden → confirmed. Closed cafes appear naturally from real opening hours.
- A simulator seats or clears one table roughly every 15 seconds while someone is watching the board. It leaves alone closed cafes and any cafe a person touched in the last 10 minutes.
- Demo cafes sit at their real coordinates in Gejayan / Condongcatur, Yogyakarta.

Known tension, accepted: a stale cafe disappears at minute 31 while closed cafes stay listed.

Undecided or deferred:

- Hosting and hosted database (planned: Turso + Vercel).
- Setup screen for merchants (tables, zones, hours, facilities, rules, photos); odd table sizes such as bar seats.
- Real photos and a visual floor plan per zone. Hourly busy pattern, which needs history from a pilot.
- Shared seating (bar, communal tables) counted per seat, so solo guests are steered away from 4-seat tables. Discussed, not built.
- Real merchant accounts, cafe self-registration, a durable login limiter.
- Real table, facility, rule, and price data from the cafes themselves, and their consent to be listed.

## Evidence on Hand

The demo cafes are real businesses around 99 Coffee Roaster on Jl. Affandi (Gejayan), Yogyakarta, chosen by the user to replace the earlier fictional set.

- **Real** (Google Maps, read 2026-10-13): each cafe's name, address, coordinates, and the opening or closing times marked "listed" in `lib/seed.ts`.
- **Invented**: table layouts and zones, facilities, house rules, prices, the hours marked "assumed", and all table activity (simulated). None of it came from the cafes, and none of the cafes has been contacted or has agreed to be listed.
- No landmark is shown: an invented landmark for a real place could misdirect someone.

Because of this the interface must keep stating, on the board's footer and on every cafe page, that table status is simulated and that facilities, rules, and prices are examples. Do not remove or soften that note, and do not add testimonials, user counts, partner claims, or anything implying a cafe takes part, until a cafe supplies its own data.

## Pending Plan

Discussed on 2026-10-13, not decided and not built. Nothing here has been validated with a cafe owner or a cafe-goer. Market research behind it: `reports/Fitur meja POS Indonesia.md` (mostly vendor marketing pages; "not found" there means not on the pages read).

**The open problem.** A consistently full cafe gains little from announcing that it is full, and its staff carry the cost of tapping. The cafes that gain are half-empty, new, or hard-to-find ones, cafes with quiet hours, and neighbours of a popular cafe.

**What the market already has.** Table management, QR order at the table, and reservations are standard in Indonesian POS products (Moka, majoo, Pawoon, Olsera, ESB, Runchise); Runchise also has a digital waitlist. All of it is staff-side. No product found shows live free tables to the public, and none sees more than its own clients.

**Direction.** The customer side is the product; the merchant screen is a data-entry tool and stays minimal. Do not compete with POS on merchant features (no QR order, no reservations, no waitlist race). The selling point to merchants is demand seen before it becomes a transaction, across cafes: a POS knows who bought, where2go knows who is looking.

**Proposed order.**

1. Log demand from now, with no identity and no interface: each search (party size, filters, hour, coarse area, whether anything matched) and each view of a cafe page while it is full. This data only exists from the day it is logged.
2. Customer features that work on day one:
   - Search by need: party size, power outlet, long stays allowed, open late, combined with free tables now.
   - Per-table attributes (power outlet, indoor or terrace, smoking), as an extension of zones.
   - Overflow: a full cafe's page points to the nearest cafe with a fitting table, both ways.
3. Fewer taps for staff: the merchant screen asks only when needed ("table 4 taken for 3 hours, still taken?").
4. "Tell me when a table frees up" for a cafe and party size. Web push on iPhone needs the site added to the home screen; WhatsApp is the paid alternative.
5. A share link for group chats that shows the live count when opened.
6. After some weeks of tap history: whether a table is likely still free on arrival (in words, never a percentage), sitting time per table size, consistent quiet hours.
7. After real user volume: one sentence a week to the merchant, not a dashboard ("Thursday 19–21: 14 people looked for a table for 4+, you were full"), covering lost demand, table-mix advice, and searches after closing time. Quiet-hour offers to people searching nearby are the closest to revenue and the heaviest to build.

**Not doing.** A recommendation chatbot, chart dashboards, percentage predictions on thin data, points or badges, colour-coded busyness.

**Automation, deferred.**

- POS integration is not a product direction. Only Moka's public API exposes open bills with a table (`sync_bills`), untested and with an undocumented quota, and it is only correct where guests pay at the end. In pay-first cafes the bill closes as the guest sits down.
- Cameras (existing CCTV, person detection on a device inside the cafe, only counts leave the building) are the one automation that works in pay-first cafes, and would add people per table, sitting time, and walk-aways at the door. Phase 2 at the earliest. It would propose a state that staff can still correct, the stale rule still applies, and no image is ever shown. Blocked on: accuracy at real camera angles, an owner willing to give camera access, and a legal check against UU PDP 27/2022 on visual data in public places.
- Table sensors (mmWave) are deferred.

**Open question.** Letting cafe-goers on site confirm or correct a count would bring in cafes whose staff do not take part, and would break the positioning above ("reported by the cafe itself") and principle 1. Undecided.

**Checks before building.**

- Ask 3–5 cafe owners near Gejayan: pay-first or table service, which POS, how they handle waiting guests, how many people leave per night.
- Ask 5–10 students what made their last search for a cafe to work in fail.
- Look at the Grab and Chope apps and the app stores for a local competitor the research missed.

## Product Principles

1. Freshness is the product: a count nobody stands behind is not shown at all.
2. One tap equals one real event. The merchant never does arithmetic.
3. Answer "where should I go now?" first; everything else about a cafe is secondary.
4. A number means one thing. The numeral is free tables; filters change which cafes appear, never what it counts.
5. Degrade honestly: without location, still rank by room and show the area instead of a distance; say when a cafe is closed or hidden rather than leaving a gap.
