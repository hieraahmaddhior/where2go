# Live updates: polling cost and the alternatives

Research note, read and written 2026-10-13. Every external number below was read from the linked official page on that date. Pricing and limits change; re-read the pages before acting on a number.

Question (from the user): "Since this is a live update, should the user have to refresh manually to save API hits?"

Legend: **[V]** verified from the linked primary source. **[I]** my inference or arithmetic from verified inputs. **[U]** could not be verified; see section 5.

## 1. Short answer

- No. Manual refresh breaks the product's promise ("within seconds", PRODUCT.md) and saves nothing that cheaper measures do not also save.
- Demo now: keep the 5 s poll as it is. A 20-phone, 30-minute demo is about 7,200 requests **[I]**, under 1% of any free quota.
- Before the hosted pilot: add a 2 s CDN cache (`s-maxage`) to the two public GET routes so database and function work stops growing with audience size, and stop polling tabs nobody is using.
- What caching does not fix: every poll still counts as one Vercel CDN Request. That quota (1,000,000/month on Hobby) is the real ceiling, at roughly 15 concurrent viewers for 3 h/day **[I]**.
- If the pilot outgrows that: lengthen or back off the interval first, then move to Server-Sent Events. WebSockets and third-party realtime are not needed at this scale.

## 2. Cost of the current design

### 2.1 What one poll consumes in this codebase

Read from the code (`components/Finder.tsx`, `components/CafeDetail.tsx`, `app/api/cafes/route.ts`, `app/api/cafes/[id]/route.ts`, `lib/cafes.ts`, `lib/simulator.ts`, `lib/seed.ts`):

- Each visible board or detail tab sends one GET every 5 s: 12/min, **720 requests per viewer-hour** **[I]**. Hidden tabs send none (`document.visibilityState` check).
- Both routes export `dynamic = "force-dynamic"`, so on Vercel each poll is one CDN Request and one Function Invocation **[I]**. Vercel: "Static assets and functions all incur CDN Requests" **[V]** ([CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage)); invocations are "Billed per incoming request" **[V]** ([Fluid compute pricing](https://vercel.com/docs/functions/usage-and-pricing)).
- The seed has 11 cafes and 73 tables. Applying Turso's counting rules ("Queries lacking index support perform a full table scan, incurring a row scan for each table row"; `select 1`-style commands "default to one row read"; "SQL updates read (and write) each row they modify") **[V]** ([Turso usage and billing](https://docs.turso.tech/help/usage-and-billing)) gives, per request **[I]**:

| Request | Queries | Rows read | Rows written |
| --- | --- | --- | --- |
| `GET /api/cafes`, no simulator tick | `meta` lookup (1) + all cafes (11) + all tables (73) | about 85 | 0 |
| `GET /api/cafes/[id]`, no tick | `meta` (1) + cafe by id (1) + its tables via index (4 to 11) | about 6 to 13 | 0 |
| Extra when a simulator tick is due (at most once per 15 s in total, not per viewer) | claim `meta` (1) + scan cafes (11) + one cafe's tables (4 to 11) + two updates (2) | about 20 | 3 |
| Server render of `/` | all cafes + all tables | 84 | 0 |

These row counts are derived from the documented rules, not measured on Turso. At "tens of cafes" (say 50 cafes, 350 tables) a board poll would read about 400 rows **[I]**.

Not measured, and not guessed here: Active CPU milliseconds per invocation, response size in bytes, and instance lifetime per request.

### 2.2 The quotas

Vercel **[V]**:

| Resource | Hobby (free) | Pro ($20/month platform fee, includes $20 usage credit) | Source |
| --- | --- | --- | --- |
| Function Invocations | first 1,000,000/month | on demand, $0.60 per 1,000,000 | [Hobby plan](https://vercel.com/docs/plans/hobby), [Fluid compute pricing](https://vercel.com/docs/functions/usage-and-pricing) |
| CDN Requests | first 1,000,000/month | Flat Rate CDN tier included: 1M requests + 1 TB; $20/mo for 10M; $100/mo for 50M; $300/mo for 150M. On demand: $2.00 to $3.20 per 1M by region ($2.60 in Singapore) | [Hobby plan](https://vercel.com/docs/plans/hobby), [Flat Rate CDN](https://vercel.com/docs/pricing/flat-rate-cdn), [Regional pricing](https://vercel.com/docs/pricing/regional-pricing), [sin1 pricing](https://vercel.com/docs/pricing/regional-pricing/sin1) |
| Active CPU | 4 CPU-hours/month | $0.128 to $0.221 per hour by region ($0.16 in Singapore) | same |
| Provisioned Memory | 360 GB-hours/month | $0.0106 to $0.0183 per GB-hour ($0.0133 in Singapore) | same |
| Fast Data Transfer | first 100 GB | covered by the Flat Rate CDN tier | [Hobby plan](https://vercel.com/docs/plans/hobby) |
| Function max duration | 300 s | 300 s default, 800 s max (1,800 s beta) | [Function duration](https://vercel.com/docs/functions/configuring-functions/duration) |
| Function memory | 2 GB / 1 vCPU, fixed | 2 GB default, 4 GB optional | [Function memory](https://vercel.com/docs/functions/configuring-functions/memory) |

- Two official pages disagree on Pro's included CDN Requests: the [Pro plan docs](https://vercel.com/docs/plans/pro-plan) and [Flat Rate CDN docs](https://vercel.com/docs/pricing/flat-rate-cdn) say 1 million; [vercel.com/pricing](https://vercel.com/pricing) showed 10M/month when read. Both are reported; the tables below use the docs figure.
- How billing works **[V]**: Active CPU is billed "only during actual code execution and not during I/O"; Provisioned Memory is "Billed for the entire instance lifetime" and "Continues billing while handling requests, even during I/O operations"; one instance can serve many concurrent requests ([Fluid compute pricing](https://vercel.com/docs/functions/usage-and-pricing), [Fluid compute](https://vercel.com/docs/fluid-compute)).
- Over the Hobby limit **[V]**: "you will have to wait until 30 days have passed before you can use the feature again" ([Hobby plan](https://vercel.com/docs/plans/hobby)). Hobby is also "restricted to non-commercial personal use only" ([Fair use guidelines](https://vercel.com/docs/limits/fair-use-guidelines)); whether a pilot with real cafes counts as commercial is the owner's call.

Turso **[V]** ([turso.tech/pricing](https://turso.tech/pricing)):

| Plan | Price | Rows read/month | Rows written/month | Storage | Syncs |
| --- | --- | --- | --- | --- | --- |
| Free | $0 | 500 million | 10 million | 5 GB | 3 GB |
| Developer | $4.99/month billed yearly ($5.99 monthly) | 2.5 billion, then $1 per billion | 25 million, then $1 per million | 9 GB | 10 GB |
| Scaler | $24.92/month billed yearly ($29 monthly) | 100 billion, then $0.80 per billion | 100 million, then $0.80 per million | 24 GB | 24 GB |

Over the Free limit **[V]**: the pricing FAQ says free-plan users must upgrade, and exceeding any single metric blocks the databases even if the others are under quota ([turso.tech/pricing](https://turso.tech/pricing), FAQ; the FAQ answers were read through the page's Markdown version and are paraphrased, not quoted). The docs page names the plans "Starter and Scaler" and says over-limit queries fail with a `BLOCKED` error ([Turso usage and billing](https://docs.turso.tech/help/usage-and-billing)); the plan names there do not match the current pricing page.

### 2.3 The arithmetic

All **[I]**. Assumptions: every viewer keeps the board visible, 3 hours a day, 30 days; 85 rows read per poll; no caching. Requests = viewers x 720 x 3 x 30.

| Concurrent viewers | Requests/month (= invocations = CDN Requests) | vs Hobby 1,000,000 | Turso rows read/month | vs Turso Free 500M | Pro on-demand, Singapore rates |
| --- | --- | --- | --- | --- | --- |
| 1 tab left visible 24/7 | 518,400 | 52% | 44 million | 9% | not applicable |
| 10 | 648,000 | 65% | 55 million | 11% | invocations $0.39 |
| 100 | 6,480,000 | 6.5x over | 551 million | 1.1x over | invocations $3.89; CDN Requests $16.85 on demand or the $20 tier |
| 1,000 | 64,800,000 | 65x over | 5.5 billion | 11x over | invocations $38.88; CDN Requests $168.48 on demand or the $300 tier |

Break-even points:

- Hobby's 1,000,000 requests = 1,389 viewer-hours a month, about 46 viewer-hours a day, about **15 viewers for 3 h/day**.
- Turso Free's 500 million rows at 85 rows/poll = 5.9 million polls = about **91 viewers for 3 h/day**. At 400 rows/poll (50 cafes) it is about 19.
- Active CPU: Hobby's 4 hours is 14,400,000 ms. Spread over 648,000 invocations (10 viewers) that is a budget of 22 ms of CPU per request; over 1,000,000 invocations, 14.4 ms. If the measured average is above that, CPU runs out before invocations do. Not measured.
- Simulator writes: at most 3 rows per 15 s tick, so at most 518,400 rows written a month even if watched around the clock; 5% of Turso Free.
- Merchants (a handful, 10 s poll, a tap every few minutes) add 360 requests per merchant-hour; small next to the viewers.

Conclusion: the design is free for a demo and for a pilot of about a dozen simultaneous viewers. The first limit hit is Vercel's request count, not the database.

## 3. Options compared

"Staleness" is the worst-case delay between a merchant's tap being saved and a visible viewer seeing it, ignoring network latency. Today it is 5 s (average 2.5 s) **[I]**.

| Option | Worst-case staleness | What it saves or costs | What must change here | Sources |
| --- | --- | --- | --- | --- |
| **Current: 5 s poll, no cache** | 5 s | 720 requests, 720 invocations, about 61,000 rows read per viewer-hour | nothing | section 2 |
| **CDN cache, `s-maxage=S`** | 5 + S s. With background revalidation a lone viewer can lag one extra poll (see notes) | Invocations and DB reads capped near 3600/S per hour per CDN region however many viewers watch (S=2: 1,800/h; S=5: 720/h). Saves nothing for one or two viewers. **CDN Requests unchanged.** | Add a `Cache-Control` header to the two public GET responses. Never on `/api/merchant/*`. Simulator: see "The simulator problem" below | [CDN cache](https://vercel.com/docs/caching/cdn-cache), [Cache-Control headers](https://vercel.com/docs/caching/cache-control-headers), [Cache status](https://vercel.com/docs/caching/cache-status), [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html), [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861.html) |
| **CDN cache + purge on merchant PATCH** | about 5 s with delete; one extra poll with invalidate | Allows a long TTL, so invocations approach "one per change" | Tag the response (`Vercel-Cache-Tag`), call `invalidateByTag` / `dangerouslyDeleteByTag` from `@vercel/functions` in the PATCH route (new dependency). The cached `now` field goes stale, so the client must stop trusting it for ages, open/closed and the 30-minute rule | [Purging CDN cache](https://vercel.com/docs/caching/cdn-cache/purge) |
| **ETag / `If-None-Match` -> 304** | none added | Saves response bytes only. The function still runs and still queries to compute the tag; still one CDN Request and one invocation | Compute an ETag in the handler and answer 304. Low value: the payload is small | [MDN 304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304), [CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage) |
| **Longer interval (10 s)** | 10 s | Halves every number in section 2 | one constant in two components | arithmetic |
| **Backoff when nothing changes, stop when idle** | the current interval (for example up to 30 s after a quiet spell); 0 on return or tap | Cuts requests from tabs that are visible but unattended, which the visibility check cannot catch | Client-only logic in `Finder.tsx` and `CafeDetail.tsx`; resume on `visibilitychange`, focus, or interaction | [MDN Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) |
| **`navigator.connection.saveData`** | whatever slower interval is chosen | Lets data-saver users poll less | Feature-detect only; MDN marks it "Limited availability ... does not work in some of the most widely-used browsers" | [MDN saveData](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData) |
| **Server-Sent Events from a Vercel Function** | the server's own DB check interval (1 to 2 s), or near 0 with pub/sub | One request per connection per 300 s on Hobby: 12 per viewer-hour instead of 720. Memory is billed while any connection is open: one 2 GB instance for 90 h/month is 180 GB-hours, half of Hobby's 360 | New streaming route; `EventSource` client with polling fallback; a shared per-instance DB check or an external pub/sub; close the stream before `maxDuration` | [Streaming](https://vercel.com/docs/functions/streaming-functions), [Function limits](https://vercel.com/docs/functions/limitations), [Realtime on Vercel](https://vercel.com/kb/guide/publish-and-subscribe-to-realtime-data-on-vercel), [WHATWG SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html), [MDN EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) |
| **WebSockets on Vercel Functions** | near 0 with pub/sub | Same duration caps and memory billing as SSE; public beta | WebSocket route, reconnect logic, external pub/sub. More than a one-way feed needs | [Vercel WebSocket guide](https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections) |
| **Third-party realtime (Pusher, Ably, ...)** | sub-second | Removes polling requests from Vercel; adds a vendor, an SDK and a publish call per merchant change | Publish from the PATCH route, subscribe in the two components, keep a poll as fallback | [Pusher pricing](https://pusher.com/channels/pricing/), [Ably pricing](https://ably.com/pricing) |
| **Turso embedded replica** | the replica's sync interval | Does nothing for Vercel requests. Reads come from a local file; syncs are metered separately | Client config (`syncUrl`, `syncInterval`). Fit with Vercel is unverified | [Turso embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction) |
| **Manual refresh / pull-to-refresh only** | unbounded: the age of the user's last tap | Requests fall to one per tap | Remove the poll; add a refresh control. The "row slides to its new rank" interaction and the "was N" mark stop happening on their own | PRODUCT.md |
| **Hybrid: slow poll (30 to 60 s) + "updated N s ago · refresh"** | 30 to 60 s automatically, 0 on tap | 60 to 120 requests per viewer-hour (6x to 12x fewer) | Interval constant, an age label and a refresh control (new UI: propose the component in DESIGN.md first) | arithmetic |

### Notes behind the table

**CDN caching.**

- Next.js 15: "Route Handlers are not cached by default"; "The default caching for `GET` handlers was changed from static to dynamic" in v15.0.0-RC; opt in with `export const dynamic = 'force-static'` or `revalidate` **[V]** ([Next.js 15 route handlers](https://nextjs.org/docs/15/app/getting-started/route-handlers-and-middleware), [route.js reference](https://nextjs.org/docs/app/api-reference/file-conventions/route), [route segment config](https://nextjs.org/docs/15/app/api-reference/file-conventions/route-segment-config)). For data that changes every few seconds the framework cache is the wrong layer; a response header read by the CDN is the right one.
- Vercel caches a function response when it carries `s-maxage=N`, optionally with `stale-while-revalidate` **[V]**. The default is "`cache-control: public, max-age=0, must-revalidate` which instructs both the CDN and the browser not to cache". Minimum `s-maxage` is 1 second. If only `Cache-Control` is set, Vercel strips `s-maxage` before the browser sees it, so the browser itself does not cache ([Cache-Control headers](https://vercel.com/docs/caching/cache-control-headers)).
- Criteria **[V]**: GET or HEAD; no `Range` or `Authorization` request header; status 200 (and a few others); no `set-cookie`; no `private`, `no-cache` or `no-store`; no `Vary: Cookie`. The cache is "segmented by region" ([CDN cache](https://vercel.com/docs/caching/cdn-cache)). A request *with a cookie* is not on the exclusion list, which is why `/api/merchant/cafe` (its body depends on the session cookie) must never get `s-maxage`.
- A `HIT` "was served directly from the cache, with no function invocation"; `STALE` serves the old copy and "regenerated it in the background by re-invoking your function" **[V]** ([Cache status](https://vercel.com/docs/caching/cache-status)). Concurrent misses for one path are collapsed into one invocation **[V]** (same page).
- Standards: `s-maxage` overrides `max-age` for shared caches (RFC 9111 section 5.2.2.10); `stale-while-revalidate` means "caches MAY serve the response in which it appears after it becomes stale, up to the indicated number of seconds" (RFC 5861 section 3, an Informational RFC) **[V]**.
- Codebase interaction **[V + I]**: both components call `fetch(..., { cache: "no-store" })`. The Fetch standard makes the browser add `Pragma: no-cache` and `Cache-Control: no-cache` to such a request ([Fetch, HTTP-network-or-cache fetch step 18](https://fetch.spec.whatwg.org/#http-network-or-cache-fetch)). Vercel documents that a request with `Pragma: no-cache` makes it "revalidate any stale resource synchronously, instead of in the background" ([Cache-Control headers](https://vercel.com/docs/caching/cache-control-headers)). Inference: with the current client code a stale entry is refreshed before the response is sent, so staleness stays at 5 + S. Whether those request headers also make Vercel skip a *fresh* entry is not documented **[U]**; check `x-vercel-cache` on a real poll.

**ETag.** A 304 "must not contain a body" and is sent for a conditional GET whose condition is false **[V]** ([MDN 304](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304)). Vercel's advice to support `ETag` is about data transfer, not invocations **[V]** ([CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage)). Next.js documents automatic ETags for pages only ([generateEtags](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/generateEtags)); for a route handler we would compute one. Whether Vercel's CDN answers `If-None-Match` itself from a cached function response is not documented **[U]**.

**Smarter polling.** `visibilitychange` and `document.visibilityState` are what the code already uses **[V]** ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)). They cannot detect a phone lying face-up with the board on screen; only an idle timeout can.

**SSE on Vercel.**

- Max duration "includes time spent processing the request and sending the response, including streamed responses"; past it "a 504 error code (`FUNCTION_INVOCATION_TIMEOUT`) is returned" **[V]** ([Function limits](https://vercel.com/docs/functions/limitations)). So a stream lives at most 300 s on Hobby and 800 s on Pro.
- `EventSource` reconnects by itself after the reconnection time, which the server can set with a `retry` field, and authors should send a comment line "every 15 seconds or so" to keep proxies from dropping the connection **[V]** ([WHATWG](https://html.spec.whatwg.org/multipage/server-sent-events.html)). Over HTTP/1.1 browsers allow 6 connections per domain; over HTTP/2 the limit is negotiated, default 100 **[V]** ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)).
- Billing **[V]**: Fluid compute "bills CPU only while your code runs, and pauses during I/O"; "Provisioned Memory still bills for the instance lifetime, so idle time costs the memory rate rather than the CPU rate". "No two instances share memory", so a tap handled by one instance does not reach streams held by another without an external store ([Realtime on Vercel](https://vercel.com/kb/guide/publish-and-subscribe-to-realtime-data-on-vercel)).
- Viable, but it is a second code path with its own failure modes. The memory figure in the table assumes all connections share one instance **[U]**; Vercel decides that, not us.

**WebSockets.** "Vercel Functions serve WebSocket connections natively"; "WebSocket support is in public beta on all plans and runs on Fluid Compute"; "A connection closes when the function reaches its maximum duration, so every client needs reconnect logic"; "an open connection keeps its instance's memory billable until the connection closes" **[V]** ([Vercel guide](https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections)). The board only needs server-to-client messages, so WebSockets add nothing over SSE here **[I]**.

**Third-party realtime.** Vercel's guide lists Ably, Convex, Firebase Realtime Database, Liveblocks, PubNub, Pusher, Sendbird, Supabase Realtime and TalkJS **[V]**. Free tiers read today: Pusher Sandbox 100 concurrent connections and 200k messages/day, first paid plan $49/month; Ably 200 concurrent connections and 6 million messages/month, first paid plan $29/month plus usage **[V]** (vendor pricing pages). PartyKit / Cloudflare Durable Objects and Supabase Realtime pricing were not researched.

**Turso embedded replicas.** "Reads are always served from the local replica"; writes go to the remote primary; `syncInterval` syncs periodically; "In certain contexts, such as serverless environments without a filesystem, you can't use embedded replicas" **[V]** ([Turso docs](https://docs.turso.tech/features/embedded-replicas/introduction)). Syncs are metered by pages transferred (3 GB/month on Free) **[V]** ([pricing](https://turso.tech/pricing)). Whether local replica reads count toward "rows read", and how a replica behaves on Vercel's short-lived instances, I could not find in a primary source **[U]**. The database is not the binding limit, so this is not worth pursuing now.

### The simulator problem (specific to this codebase)

`lib/simulator.ts` has no worker. `simulate()` runs at the top of both public GET handlers; it flips one table when 15 s have passed since `meta.last_sim_at`, claims the tick with a compare-and-set, and catches up at most 4 missed ticks.

What CDN caching does to it **[I]**:

1. The simulator only runs when the function runs, which becomes "on a cache miss or revalidation" instead of "on every poll".
2. With S well under 15 s and at least one viewer, the function still runs at least every 5 s, so ticks stay on schedule. `s-maxage=2` is safe.
3. With S of 15 s or more, ticks happen once per S and the catch-up loop applies up to 4 flips in one request. The board then jumps in batches (for S=60: four tables at once, once a minute) and the single-row slide stops reading as one event.
4. If revalidation happens in the background, the response that contains a new flip reaches viewers one poll later.
5. A GET that writes is a poor fit for any cache: the CDN is entitled to answer without calling the origin, and Vercel collapses concurrent misses into one invocation.
6. Purge-on-change (the long-TTL variant) breaks it outright: the simulator's writes do not purge the cache, so viewers would see no simulated movement until the TTL ends.

What would have to change:

- Minimum, enough for `s-maxage` of 1 to 5 s: nothing in `simulator.ts`. Add a comment to both routes that the TTL must stay below `TICK_MS`.
- For the pilot: put the simulator behind an environment flag (for example `DEMO_SIMULATOR=1`) and leave it off where real merchants report. PRODUCT.md already labels it demo behaviour. With it off, the GET routes become read-only and safe to cache or stream.
- To keep a simulated demo with a long TTL or SSE: move the tick out of the read path. Vercel Cron cannot do it on Hobby ("Hobby accounts are limited to cron jobs that run once per day"; Pro's minimum interval is once per minute, still slower than 15 s) **[V]** ([Cron usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing)). The realistic choices are a tick driven by the SSE loop, or a presenter-side script that calls a protected tick endpoint.

## 4. Recommendation

Demo, running locally or on Hobby with a room of phones: change nothing. The cost is negligible and the 5 s feel is the demo.

Before the hosted pilot, in this order:

1. **Set the regions.** Vercel functions run in `iad1` (Washington) by default **[V]** ([Function limits](https://vercel.com/docs/functions/limitations)). Put the function in `sin1` and the Turso database as near to it as Turso offers, so each poll's I/O wait, which is billed as memory time, is short. Turso's region list was not checked.
2. **Gate the simulator** behind an environment flag (see "The simulator problem").
3. **Add `Cache-Control: public, s-maxage=2` to `GET /api/cafes` and `GET /api/cafes/[id]`.** Worst-case staleness becomes 7 s. Origin work is capped near 1,800 invocations and about 153,000 rows read per watched hour per CDN region, whatever the audience **[I]**. Add `Cache-Control: private, no-store` to `/api/merchant/*` explicitly so a later edit cannot make a session-dependent response cacheable.
4. **Stop polling unattended tabs.** After a few minutes without interaction, slow down or pause, show the age of the data and a way to resume. This is new UI: propose the component in DESIGN.md before building it.
5. **Decide the plan.** Hobby covers about 15 viewers at 3 h/day and is for non-commercial use. Pro at $20/month with the $20 Flat Rate CDN tier (10M requests) covers about 150 viewers at 3 h/day **[I]**.

Measure after step 3, before doing more:

- `x-vercel-cache` on real client polls: the share of `HIT` vs `MISS` / `STALE` / `BYPASS`. This settles the two open questions about `force-dynamic` and the `no-store` request headers.
- Vercel Usage: CDN Requests, Function Invocations, Active CPU, Provisioned Memory per day, and average Active CPU per invocation against the 14 to 22 ms budget in section 2.3.
- Turso dashboard: rows read per day divided by invocations, to check the 85-rows estimate.
- Response size of `/api/cafes` (compressed), to size Fast Data Transfer.
- Real viewer-hours per day. Every table in this note scales linearly with it.

Only if CDN Requests become the cost (sustained audiences near or above 100): first lengthen the interval to 10 s or add backoff; then build SSE with the poll kept as fallback. Do not add a realtime vendor or WebSockets for a one-way feed of this size.

## 5. Open questions and things I could not verify

- **Custom `Cache-Control` with `dynamic = "force-dynamic"`.** Vercel's own example sets `s-maxage` on a Next.js App Router handler, but it does not export `force-dynamic`. I found no Next.js page saying whether `force-dynamic` overrides a handler's own header. Test on a preview deployment; if the header is dropped, remove the export (GET handlers are dynamic by default in Next 15).
- **Request `Cache-Control: no-cache` vs a fresh CDN entry.** Vercel documents `Pragma: no-cache` only for stale entries. If the current client fetch bypasses fresh entries, drop `cache: "no-store"` from the two `fetch` calls.
- **Does plain `s-maxage` serve stale while revalidating?** Vercel's `s-maxage` section says that after the fresh period the CDN "will serve the 'stale' response from the edge until the response is asynchronously revalidated", which reads as background revalidation even without `stale-while-revalidate`. The CDN cache page lists the two as separate options. Not resolved; it changes worst-case staleness by one poll for sparse audiences.
- **Purge propagation time** for `invalidateByTag` / `dangerouslyDeleteByTag`: not stated on the page read.
- **Which CDN region bills Indonesian viewers**, and therefore the exact CDN Request rate. Singapore rates were used as an assumption.
- **Vercel Pro's included CDN Requests**: 1M (docs) vs 10M (pricing page).
- **Turso**: plan names differ between docs and pricing page; FAQ answers were paraphrased by the reading tool rather than quoted; row counts per query are derived, not measured; whether `ORDER BY label` without an index adds reads; whether embedded-replica reads are billed as rows read; embedded replicas on Vercel; available regions.
- **RFC 9110** (304, `If-None-Match`, `ETag` sections): the page was too large for the reader to reach those sections. MDN was used for 304 instead. RFC 9111 section 4.3.2 was read only in summary; I did not confirm wording on a cache answering a conditional request itself.
- **`saveData` browser support table** did not load; only MDN's "Limited availability" banner was read.
- **SSE instance sharing**: how many instances hold N open streams is Vercel's decision; the memory estimate assumes one.
- **Not measured at all**: Active CPU per request, response bytes, request duration. No benchmark numbers appear in this note for that reason.
- **Not researched**: PartyKit / Cloudflare Durable Objects, Supabase Realtime pricing, Vercel Workflows or Queues as a tick source.

## 6. Sources

All read 2026-10-13.

Vercel
- https://vercel.com/docs/functions/usage-and-pricing (page dated 2026-06-16)
- https://vercel.com/docs/functions/limitations
- https://vercel.com/docs/functions/configuring-functions/duration
- https://vercel.com/docs/functions/configuring-functions/memory
- https://vercel.com/docs/functions/streaming-functions
- https://vercel.com/docs/fluid-compute
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/plans/pro-plan
- https://vercel.com/docs/limits
- https://vercel.com/docs/limits/fair-use-guidelines
- https://vercel.com/docs/pricing/regional-pricing
- https://vercel.com/docs/pricing/regional-pricing/sin1
- https://vercel.com/docs/pricing/flat-rate-cdn
- https://vercel.com/docs/manage-cdn-usage
- https://vercel.com/pricing
- https://vercel.com/docs/caching/cdn-cache (reached via /docs/cdn-cache)
- https://vercel.com/docs/caching/cache-control-headers (reached via /docs/headers/cache-control-headers)
- https://vercel.com/docs/caching/cache-status
- https://vercel.com/docs/caching/cdn-cache/purge
- https://vercel.com/docs/cron-jobs/usage-and-pricing
- https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections
- https://vercel.com/kb/guide/publish-and-subscribe-to-realtime-data-on-vercel
- https://vercel.com/kb/guide/optimize-function-invocations

Turso
- https://turso.tech/pricing and https://turso.tech/pricing.md
- https://docs.turso.tech/help/usage-and-billing
- https://docs.turso.tech/features/embedded-replicas/introduction

Next.js (version 15.5 docs unless noted)
- https://nextjs.org/docs/15/app/getting-started/route-handlers-and-middleware
- https://nextjs.org/docs/15/app/api-reference/file-conventions/route-segment-config
- https://nextjs.org/docs/15/app/api-reference/config/next-config-js/generateEtags
- https://nextjs.org/docs/15/app/api-reference/config/next-config-js/headers
- https://nextjs.org/docs/app/api-reference/file-conventions/route (version 16.4 docs; used for the version history row)

Standards and MDN
- https://www.rfc-editor.org/rfc/rfc9111.html (HTTP Caching)
- https://www.rfc-editor.org/rfc/rfc5861.html (stale-while-revalidate, stale-if-error; Informational)
- https://www.rfc-editor.org/rfc/rfc9110.html (attempted; relevant sections not reached)
- https://fetch.spec.whatwg.org/ (HTTP-network-or-cache fetch, step 18)
- https://html.spec.whatwg.org/multipage/server-sent-events.html
- https://developer.mozilla.org/en-US/docs/Web/API/EventSource
- https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData
- https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304

Realtime vendors (pricing pages, for placement only)
- https://pusher.com/channels/pricing/
- https://ably.com/pricing
