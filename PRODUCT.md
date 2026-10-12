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
- **Merchant bulk actions.** "Tandai penuh" and "Tandai semua kosong".
- **Search** by cafe name or area; **no map**.
- **Cafe detail page** (`/kafe/<id>`), opened by tapping a row. In order: name, open status ("Buka sampai 02.00", "Tutup 45 mnt lagi", "Tutup · buka 07.00"), distance or area, directions; free tables now, broken down by table size and by zone (floor, terrace), with when staff last confirmed; facilities; house rules (time limits, minimum order, laptops); how to find it (address and a landmark); opening hours and the price drinks start from. The breakdown switches between "by table size" and "by zone"; by zone is an accordion that shows each zone's free-table total when closed and its floor plan and sizes when open. Photos (storefront, each zone) and each zone's floor plan have reserved, labeled placeholders and no content yet.
- **Zones.** Every table belongs to a zone of its cafe ("Lantai 1", "Teras").

Demo behavior (labeled as demo in the interface):

- Table layouts, zones, hours, addresses, landmarks, prices, facilities, and rules are all invented and seeded; there is no setup screen for merchants yet. Demo cafes are open 07.00–02.00 WIB so a late session still has open cafes.
- Demo cafes carry a heartbeat so they never go stale, except one that starts hidden to demonstrate hidden → confirmed.
- A simulator seats or clears one table roughly every 15 seconds while someone is watching the board. It leaves alone closed cafes and any cafe a person touched in the last 10 minutes.
- Demo cafes are planted around Bandung (Dago, Braga, Cihampelas) by default.

Known tension, accepted: a stale cafe disappears at minute 31 while closed cafes stay listed.

Undecided or deferred:

- Hosting and hosted database (planned: Turso + Vercel).
- Setup screen for merchants (tables, zones, hours, facilities, rules, photos); odd table sizes such as bar seats.
- Real photos and a visual floor plan per zone. Hourly busy pattern, which needs history from a pilot.
- Shared seating (bar, communal tables) counted per seat, so solo guests are steered away from 4-seat tables. Discussed, not built.
- Real merchant accounts, cafe self-registration, a durable login limiter.
- Real cafe data and launch city.

## Evidence on Hand

No real cafe data, merchants, customers, or usage numbers exist. Every cafe is fictional, including its address, landmark, prices, facilities, and rules, and its table activity is simulated; the interface must keep saying so. Addresses use real street names with invented numbers; they do not point at real businesses. Do not present them as real businesses or invent testimonials, user counts, or partner claims.

## Product Principles

1. Freshness is the product: a count nobody stands behind is not shown at all.
2. One tap equals one real event. The merchant never does arithmetic.
3. Answer "where should I go now?" first; everything else about a cafe is secondary.
4. A number means one thing. The numeral is free tables; filters change which cafes appear, never what it counts.
5. Degrade honestly: without location, still rank by room and show the area instead of a distance; say when a cafe is closed or hidden rather than leaving a gap.
