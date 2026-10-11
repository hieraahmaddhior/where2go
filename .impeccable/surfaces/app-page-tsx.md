---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/merchant/page.tsx"]
---

# Finder and merchant update (app shell)

Scope: `/` cafe finder and `/merchant` occupancy update. Mode: Operate. Phone-first web.

- Audience and job: cafe-goer picking where to go now; cafe staff keeping the free-seat count current mid-service.
- Task: read a ranked list of nearby cafes by seats free; merchant changes the count in one or two taps.
- Content: synthetic demo cafes, labeled as demo data. No real businesses or claims.
- Constraints: Next.js + SQLite, polling for live data, cafe code instead of accounts, no map.
- Unresolved: hosted database, deploy target, real cafe data, merchant accounts.

## Direction contract

THESIS: A live board where the free-seat count is the first thing read on every line. Refuses the card grid of cafe photos and ratings that discovery apps ship.

OWN-WORLD: DESIGN.md unchanged in identity. White canvas, near-black ink and actions, hairline-separated rows, soft-gray column header and pill switch. Cal Sans for the wordmark, tabular seat numerals, and page h1 (DESIGN.md: display headlines are never Inter); Inter for everything else. Success, warning, error appear only as the occupancy dot.

STORY: The visitor sees which cafe has room, trusts it because each number shows its age, and goes. Staff open their cafe, tap minus or plus, and leave.

FIRST VIEWPORT: 390 wide. 56px header with wordmark left, "Cafe staff" link right. Search input. Pill switch Most room / Nearest with the location label opposite. Column header strip. Then eight compact rows: 36px seat numeral with "/total" in a 72px column, cafe name over distance and age, trailing directions button. Primary action on the merchant screen is the plus/minus pair under a 64px count.

FORM: Ranked board, position 1 on the ordered list, dealt as an alternate and chosen by the user. Signature interaction: when a count changes, the row slides to its new rank in place and stays marked with its previous value. Seed key a1d92203.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
