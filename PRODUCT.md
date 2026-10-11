# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) with a local SQLite file for data. Chosen by the user for the functional MVP because it runs with zero external accounts or keys. Live occupancy reaches clients by polling. The database is expected to be swapped for a hosted one later.

## Users

- **Cafe-goers** — someone deciding where to go right now, usually on a phone, who wants a nearby cafe with room to sit. Job: find the nearby cafe with the best occupancy without walking there to check.
- **Merchants (cafe staff)** — someone behind the counter, mid-service, with seconds to spare. Job: keep their cafe's free-seat count current.

## Product Purpose

where2go shows live occupancy of cafes. Cafe-goers search nearby cafes and see which have the most room; merchants update their own cafe's occupancy. Success for the MVP: a merchant changes a number and a cafe-goer sees it reflected in the ranked list shortly after.

## Positioning

Occupancy is reported live by the cafe itself as a seat count, not estimated from historical foot-traffic patterns.

## Operating Context

- Cafe-goer: on the move, phone in hand, browser location permission may or may not be granted.
- Merchant: at the counter on a phone or tablet during service; updates must take one or two taps.

## Capabilities and Constraints

Confirmed for MVP:

- Occupancy model is **seats free out of total seats** per cafe (e.g. "6 of 24 seats free"). Merchants adjust free seats with +/- or set the number directly.
- Cafe-goer finder is a **ranked list**: browser geolocation plus search by name/area, sorted by best occupancy, then distance. No map.
- Merchant access is by **cafe code / PIN**: enter the code, land on that cafe's update screen. No user accounts.
- Each cafe shows when its occupancy was last updated.

Undecided:

- Hosted database and deploy target.
- Real merchant accounts, cafe self-registration, map view.
- Launch city / real cafe data.

## Evidence on Hand

No real cafe data, merchants, customers, or usage numbers exist. Seed cafes in the MVP are synthetic and must be labeled as demo data; do not present them as real businesses or invent testimonials, counts of users, or partner claims.

## Product Principles

1. Freshness is the product: an occupancy number without its age is not trustworthy, so staleness is always visible.
2. The merchant update must be faster than ignoring it — one or two taps, no navigation.
3. Answer "where should I go now?" first; everything else about a cafe is secondary.
4. Degrade honestly: without location, still rank by occupancy and say distance is unknown.
