# POS APIs in Indonesia: can a third party read table status (or infer it from open bills)?

Research date: 2026-10-13. Evidence labels used throughout:

- **SPEC** = read directly from the vendor's published machine-readable API spec or Postman collection (strongest).
- **DOCS** = vendor documentation or help page.
- **MKT** = marketing page only; mentions an API without a public reference.
- **3P** = third-party or community source.
- **NOT FOUND** = searched, nothing public found (search terms listed).

Method note: several vendor doc sites are JavaScript-rendered, so the underlying spec files were downloaded and searched directly: Moka's Swagger JSON (530 KB), Loyverse's OpenAPI YAML (143 KB), Pawoon's Postman collection JSON (216 KB), and Olsera's docs app bundle (562 KB, embeds a Postman collection). The web-search quota ran out before the last two queries (iSeller detail; camera and Wi-Fi counting costs), so those are listed as gaps.

## 1. Is there a public, documented API, and is access self-serve or gated?

### Takeaway
Only five products have a public API reference that could be read end to end: Moka, Loyverse, Pawoon, Olsera, and DealPOS; Odoo has a generic external API. Majoo's API is gated behind an application and a fee; for Qasir, ESB, Runchise, Opaper, Equip, StoreHub, and Qashier no public reference was found, and Square is not sold in Indonesia.

### Cited Findings

**Moka POS (GoTo)**
- SPEC: A public API reference exists at api.mokapos.com/docs. It is a ReDoc page that loads a Swagger 2.0 file titled "MOKA API", version "0.2", host `api.mokapos.com`. — [Moka API docs](https://api.mokapos.com/docs); [Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- DOCS: The "Moka Developer Platform" landing page is labelled beta and offers an Apps Dashboard (`/oauth/applications`), sign-up with a Moka backoffice account, and Developer Terms of Service. — [Moka Developer Platform](https://api.mokapos.com/)
- SPEC: Two app types exist. Public apps are visible in the App Marketplace with status "Published". Private apps are for one merchant or personal use, are not visible in the marketplace, and stay in status "In Review"; the spec says "The status In Review still allow developers to use the application and it will still functionally working as expected". Marketplace listing requires emailing support@mokapos.com. — [Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- SPEC: The newest changelog entry in the spec is dated 22-06-2023; earlier entries run back to 24-06-2020. Freshness flag: no documented change after mid-2023. — [Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- DOCS: Moka Connect is described as an open, API-based platform with two services: App Marketplace (partner apps connected from the Back Office) and Private Solution (merchants integrating their own systems). — [Tentang Moka Connect](https://help.mokapos.com/tentang-moka-connect)
- DOCS: A second, separate route exists through GoTo's GoBiz Developer Portal: a "MokaPos Integration" section with 13 read-only reporting endpoints (outlets, sales summary, paid transactions, invoices, items, categories, taxes, customers). — [GoBiz MokaPos Integration](https://developer.gobiz.com/docs/category/mokapos-integration/index.html)

**Loyverse**
- SPEC: Public API reference at developer.loyverse.com/docs (OpenAPI YAML `API-Reference__v1.0.yaml`). Access is self-serve two ways: a personal access token created in the Back Office, or an OAuth 2.0 app. — [Loyverse API reference](https://developer.loyverse.com/docs/); [OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- DOCS: Tokens are created in the Back Office "Access Tokens" section and can be deleted to revoke access. — [How to Create Tokens for API](https://help.loyverse.com/help/loyverse-api)

**Pawoon**
- SPEC: "Pawoon OpenAPI" is published as a public Postman documentation page. Access looks self-serve for a merchant: log in to dashboard.pawoon.com, go to Application, click "Create new App", and copy the application ID and secret key. — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- SPEC: The changelog runs from 1.0.0 (2020-04-01) to 1.1.1 (2022-11-18). Freshness flag: no documented change since November 2022. — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)

**Olsera**
- SPEC: "Olsera Open API" docs site exists, with a developer console (register, create app, app list, API test tool, webhook tool). The intro states the client registers their Olsera account and "the system will generate app_id and secret_key". API host is `https://api-open.olsera.co.id/`. A captured example response in the docs is dated 9 Oct 2024, so the docs were maintained at least until late 2024. — [Olsera Open API docs](https://docs-api-open.olsera.co.id/)

**DealPOS**
- DOCS: Public reference "DealPOS API (3.1.0)" at developer.dealpos.com with a downloadable OpenAPI description, per-merchant host under `/api/v3/`, and a separate Webhook Reference. — [DealPOS API](https://developer.dealpos.com/openapi/openapi/invoice); [DealPOS webhooks](https://developer.dealpos.com/webhook)

**Majoo**
- MKT: Majoo sells three API products (Open API, Consumer App API, Enterprise API). Access is gated: active majoo Prime subscription, at least one outlet, an application form, and an integration fee of Rp25,000,000 for the first year plus Rp12,000,000 per year maintenance. The technical document is sent only after the application is approved and a token is created; integration is said to take 1–2 months. — [majoo API](https://majoo.id/majoo-api)

**Odoo POS Restaurant**
- DOCS: Odoo's external API (XML-RPC, API keys since v14) is documented, but "Access to data via the external API is only available on Custom Odoo pricing plans" and is not available on One App Free or Standard plans. — [Odoo 18 External API](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html)

**Qashier, StoreHub, Square (regional/global products)**
- MKT: Qashier advertises "open APIs" for three paths (POS to QashierPay, payment terminal to Qashier POS, Treats loyalty). No public docs URL; access is via a contact form. Its country list is Singapore, Malaysia, Thailand, Philippines; Indonesia is not mentioned. — [Qashier API integration](https://qashier.com/my/api-integration/)
- 3P: A third-party API directory describes StoreHub's API as private and partner-gated, with credentials issued by Customer Care and no public OpenAPI spec. Not verified against StoreHub's own site. — [API Evangelist: StoreHub](https://providers.apievangelist.com/providers/storehub/)
- DOCS: Square's international availability page lists the United States, Canada, Australia, Japan, the United Kingdom, Ireland, France, and Spain; Indonesia is not listed. — [Square International Availability](https://square.com/help/us/en/article/4956)

**iSeller**
- 3P/MKT: A public Postman workspace named "iSeller API" exists, and iSeller's privacy policy refers to partners who build apps using the iSeller API for merchants. No endpoint list could be read. — [Postman: iSeller API](https://www.postman.com/winter-star-41278/iseller-api/overview); [iSeller privacy policy](https://www.isellercommerce.com/legal/privacy)

**Qasir, ESB, Runchise, Opaper, Equip**
- NOT FOUND (Qasir): no developer portal or public API docs. An Odoo customer story says Qasir uses its internal API integrated with Odoo, which is an internal integration, not a public API. — [Odoo customer story: Solusi Teknologi Niaga](https://www.odoo.com/pt_BR/customers/solusi-teknologi-niaga-15142406)
- NOT FOUND (ESB): ESB's POS page lists "ESB Product Integration" entries (ESB Order QR order, ESB Core) and GoFood/GrabFood/ShopeeFood, all first-party or delivery integrations; no developer portal found. — [ESB POS](https://www.esb.id/en/solusi/produk/pos)
- NOT FOUND (Runchise): product pages describe integrations with online food delivery, EDC, and reservations; no developer documentation. — [Runchise POS](https://www.runchise.com/point-of-sale)
- NOT FOUND (Opaper): site says it is "designed to be easily integrated" with POS, delivery apps, and accounting software; no API reference. — [Opaper](https://www.opaper.app/en)
- NOT FOUND (Equip): positioned as POS inside its own ERP; no public API found. — [Equip blog](https://www.equiperp.com/blog/aplikasi-pos-restoran/)

### Inferences
- For a single-cafe pilot, Moka (private app), Loyverse (personal token), Pawoon (app in dashboard), and Olsera (app_id/secret) look reachable without a partner contract. Majoo is effectively closed to a small third party because of the fee and the 1–2 month process.
- Moka's and Pawoon's docs have not visibly changed since 2023 and 2022. They may still work, but endpoint behaviour should be tested on a live merchant account before any commitment.

### Gaps
- iSeller: the Postman workspace could not be read (JS-rendered and search quota exhausted). Whether it documents orders, registers, or tables is unknown.
- Searches run with no public API reference found: "Qasir API integrasi developer", "ESB POS open API integration developer docs", "ESB esb.id integrasi API integration partner", "Runchise POS API integration open API", "Opaper POS integrasi API", "Equip POS API Indonesia", "StoreHub API documentation transactions developer".
- Whether Moka still approves or supports new private apps in 2026 (the platform is labelled beta and the changelog stops in 2023) was not confirmed.

## 2. Which resources are exposed: receipts, open (unpaid) bills, tables, table status?

### Takeaway
Moka is the only product whose public spec exposes open bills with a table attached: `GET /v1/outlets/{outlet_id}/sync_bills/` returns bills with `status` PENDING/COMPLETE/CANCELLED plus `tableId` and `tableName`. Olsera exposes open orders but with no table field found; Loyverse, Pawoon, and the GoBiz Moka route expose only completed transactions; no product exposes a "table status" or floor-plan resource as such.

### Cited Findings

**Moka (SPEC)** — all from the [Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- `GET /v1/outlets/{outlet_id}/sync_bills/` (operationId `listBillsV1`, tag "Sync Bills"): "Returns all open bill list of an outlet." Required scope: `transaction`.
- `GET /v1/outlets/{outlet_id}/sync_bills/{bill_id}`: "Returns the detail of a bill given a bill ID."
- Query parameters on the list: `page`, `per_page`, `sort` (e.g. `updated_at,DESC`), `start`, `end` (DD/MM/YYYY), `last_pull` ("Returns only the bills that were synced at given timestamp"), `statuses` (valid values PENDING, COMPLETE, CANCELLED), `dine_in_only` ("Returns only bills that are assigned with a table"), `deep` (include item detail).
- Bill fields: `id`, `guid` (device that created the bill), `name` (bill name), `createdAt`, `updatedAt`, `synchronizedAt`, `status`, `outletId`, `tableId` ("Table ID for the bill. TableID is 0 if it is not a dine in order"), `pax`, `serveBy`, `receiptNo` ("Receipt number of the bill after checkout"), `cancelledAt`, `cancelledBy`, `cancelledReason`, plus `tableGroupId`, `tableName`, `tableGroupName`, and a `tables` array.
- The spec's example shows a bill named "1F" with `"tables": [{"tableId": 2120, "tableGroupId": 601, "tableName": "1F", "tableGroupName": "Lantai 1A"}]`, status COMPLETE and a `receiptNo`.
- Completed sales: `GET /v4/outlets/{outlet_id}/reports/get_latest_transactions` (also v1–v3), with `since`/`until` (epoch) and `time_filter` of `created_at`, `updated_at`, or `synchronized_at`. The payment object includes a `table_name` field.
- Other resources: businesses, outlets, items, categories, modifiers, discounts, taxes, gratuities, customers, sales types, loyalty, promos, purchase orders, item summaries, `POST /v1/outlets/{outlet_id}/checkouts` (push a transaction in), and "Advanced Orderings" (push an order into the Moka app).
- No endpoint lists tables or floor layout on their own; table data appears only inside bills and payments.

**Moka via GoBiz (DOCS)**
- `GET /integrations/mokapos/outlets/{outlet_id}/v1/reporting/transactions` returns "the list of paid transactions"; scope `mokapos:reporting:read`. Documented fields include `payment_no`, `payment_type`, `transaction_date`, `invoice_no`, and `items[]`; no table, sales-type, or customer field is documented. — [GoBiz: Get Paid Transactions List](https://developer.gobiz.com/docs/api/mokapos-integration/get-paid-transactions-list)

**Loyverse (SPEC)** — from the [OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Resource tags: Categories, Customers, Discounts, Employees, Inventory, Items, Merchant, Modifiers, Payment types, POS devices, Receipts, Shifts, Stores, Suppliers, Taxes, Webhooks. There is no ticket, table, or dining-option resource; the word "ticket" does not occur anywhere in the spec.
- Receipts (`/receipts`, `/receipts/{receipt_number}`) carry `dining_option` (string, "The dining option selected for the receipt", examples "Dine in", "To go") and `order` ("The order name or number associated with this receipt"). `receipt_type` is SALE or REFUND.

**Pawoon (SPEC)** — from the [Postman collection](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Endpoints include `GET /transactions`, `GET /transactions/{transaction-id}/items`, `GET /transactions/{transaction-id}/payments`, `GET /transactions/transaction-payments`, `GET /company-sales-types`, `GET /outlets`, reports, products, inventory, `POST /orders` (submit an order into Pawoon), and `PUT /orders/status`.
- The transaction example has no table field. Its keys include `receipt_code`, `outlet_id`, `device_id`, `sales_type_id`, `sales_type_name`, `note`, `online_order_status`, `device_timestamp`, `sync_status`, `created_at`, `updated_at`.
- The only occurrence of "table" as data is `"add_on": ["table"]` on outlet objects, which indicates the outlet has the table add-on enabled; it is not table state.
- No endpoint for open bills, saved orders, or tables exists in the collection.

**Olsera (SPEC)** — from the [Olsera Open API docs](https://docs-api-open.olsera.co.id/)
- Order endpoints: `GET /api/open-api/v1/en/order/openorder`, `GET .../order/openorder/detail`, `POST .../order/openorder/updatestatus`, `POST .../order/openorder/updatepaymentstatus`, `GET .../order/closeorder`, `GET .../order/closeorder/detail`, `GET .../order/cancelledorder`, plus `GET .../cart/list` and `GET .../cart/detail`.
- Query parameters on the open-order list: `start_date`, `end_date`, `per_page`, `page`, `sort_column`, `sort_type`, `search`, `id`, `order_date`, `currency_id`.
- A text search of the whole docs bundle for field names containing "table" or "meja" found none (only "sortable" and "acceptable").

**DealPOS (DOCS)**
- API groups include Sales Order, Invoice, Invoice Payment, Shift, Outlet, and "Park Order Display"; Sales Order has a "GetParked" operation. There is no Table, Restaurant, or Dine-in group. — [DealPOS API](https://developer.dealpos.com/openapi/openapi/invoice)

**Odoo (3P + DOCS)**
- 3P: A community guide lists the models `restaurant.floor`, `restaurant.table`, and `pos.order`, with `table_id` on restaurant orders. — [Community Odoo restaurant skill guide](https://skills.lc/DevAgarwal2/sarvam-agent/devagarwal2-sarvam-agent-skills-business-odoo-skills-odoo-restaurant-skill-md)
- DOCS (source repo): An Odoo pull request describes self-order code searching orders with a domain of `table_id` and `state = 'draft'`, confirming that unpaid table orders are draft `pos.order` records linked to a table. — [odoo/odoo PR #293525](https://github.com/odoo/odoo/pull/293525)

**Majoo (MKT)**
- The Open API is said to expose merchant and outlet identity, order list, products, transaction history, payment and delivery data, sales, and warehouse stock. Tables are not mentioned. — [majoo API](https://majoo.id/majoo-api)

### Inferences
- Moka `sync_bills` with `statuses=PENDING&dine_in_only=true` maps almost exactly onto "open bill on table 5 = table 5 taken"; a bill moving to COMPLETE or CANCELLED maps onto "free". This is the single strongest fit found.
- Because Moka has no standalone tables endpoint, where2go would have to learn the table list either from bills seen over time or from manual setup, and map Moka `tableId`/`tableName` to its own `cafe_tables` rows by hand.
- Olsera's open orders may still reveal table occupancy if the cafe puts the table in a notes or order-name field, but the docs do not show a structured table field.
- DealPOS "parked" sales orders are the retail equivalent of an open bill; with no table concept in the API, they would only give a count of open orders, not which table.

### Gaps
- Moka `sync_bills` examples in the spec date from 2019 and the endpoint is absent from the changelog. Whether it still returns live data in 2026, and whether a bill appears as soon as it is saved on the tablet or only after the device syncs, must be tested.
- Olsera open-order response fields could not be extracted from the bundle, so the absence of a table field rests on a text search, not on reading a full response schema.
- DealPOS Sales Order and Park Order Display schemas were not read in detail.
- Odoo field names vary by version; `table_id` on `pos.order` was not verified against official model documentation for v17–v19.

## 3. Webhooks or polling? Events, latency, rate limits

### Takeaway
None of the readable APIs offers a webhook for "bill opened on a table". Loyverse, Olsera, and DealPOS have webhooks, but for finished receipts or order-status changes; Moka's open bills and Pawoon's transactions are polling only, and Moka applies a per-resource quota to `sync_bill` whose size is not documented.

### Cited Findings
- Loyverse SPEC: webhook events are `inventory_levels.update`, `items.update`, `customers.update`, `receipts.update` ("fired when a receipt is created or updated"), and `shifts.create`. One event per webhook; HTTPS required; webhooks created by OAuth apps are signed with `X-Loyverse-Signature`, those created with a personal token are not. — [Loyverse OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Loyverse SPEC: "The current limit is 300 requests per 300 sec per account"; excess requests get HTTP 429. — [Loyverse OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Moka SPEC: no webhook or subscription path exists in the current spec's path list. The changelog says a Subscription API (`getEventsV1`, `createSubscriptionV1`, and related) was introduced on 24-06-2020, and a 22-06-2023 entry reads "Remove usage of below fields for following API" listing those same operations. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Moka SPEC: `GET /v1/quotas` "Returns remaining quota of an outlet when calling certain API", with the example `{"application_id": "126", "resource": "sync_bill", "quota": 3, "refresh_at": {}}`. `sync_bills` also lists a 429 "Too many request" response. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Moka SPEC: bills carry `synchronizedAt`, described as "the latest timestamp when the device fetched data from Moka for the given bill", and the list accepts `last_pull` for incremental polling. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Pawoon SPEC: the collection contains no webhook and no rate-limit text (zero matches for "webhook", "rate limit", "throttle"). — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Olsera SPEC: four webhooks are documented: "Open Order Update Status", "Sales Return Update Status", "Open Purchase Update Status", "Purchase Return Update Status". The console has a webhook setting with callback URL, custom headers, and a request log. No rate-limit text was found in the docs bundle. — [Olsera Open API docs](https://docs-api-open.olsera.co.id/)
- DealPOS DOCS: webhooks are HTTP POSTs triggered by actions in the account, with event reference pages for Invoice, Invoice Payment, Sales Order, Shift, Outlet, and others; the receiving endpoint can use no auth or OAuth 2.0. A "Rate Limit" group exists in the API reference. — [DealPOS webhooks](https://developer.dealpos.com/webhook); [DealPOS API](https://developer.dealpos.com/openapi/openapi/invoice)
- GoBiz Moka route DOCS: `per_page` max 1000, `page`, `order`; no rate limit documented on the page. — [GoBiz: Get Paid Transactions List](https://developer.gobiz.com/docs/api/mokapos-integration/get-paid-transactions-list)

### Inferences
- The Moka quota example ("quota": 3 for `sync_bill`) suggests open-bill polling is deliberately throttled per app and outlet. If the window is long (per minute or per hour), near-real-time table status would not be achievable; where2go currently refreshes every 5 seconds on the customer side, so a quota of this kind is the main technical risk for a Moka integration.
- Loyverse's limit works out to one request per second per merchant account, which is ample for polling, but there is nothing useful to poll before payment (see question 4).
- Latency for any tablet POS also depends on the device syncing to the cloud; an offline or slow tablet would delay or hide open bills regardless of API limits.

### Gaps
- Moka: the quota window (`refresh_at`) and real quota values are not documented; the state of the Subscription (webhook) API after the 2023 change is unclear from the wording.
- Olsera: the payload of "Open Order Update Status" was only partly visible (it includes `store_id` and `status`); which status transitions fire it was not confirmed.
- DealPOS: trigger conditions per event, retry policy, and rate-limit numbers were not read.
- No measured end-to-end latency figures (POS action to API visibility) were found for any product.

## 4. Is the table identifier on an open order or receipt, and is an unpaid bill visible before payment?

### Takeaway
Moka: yes to both in the spec (PENDING bills with `tableId`/`tableName`, before checkout). Loyverse: no, open tickets are not reachable through the API, and the table name survives only if staff name the ticket after the table, visible after payment in the receipt's `order` field. Pawoon: completed transactions only, no table field. Olsera: unpaid open orders are visible, but no table field was found.

### Cited Findings
- Moka SPEC: open bill objects include `tableId`, `tableName`, `tableGroupName`, `pax`, and `status` PENDING before checkout; `receiptNo` is filled "after checkout". Completed payments also include `table_name`. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Loyverse 3P (official community forum): a moderator replied on 6 May 2022, "it is not possible to access open tickets from API right now". A user reported in September 2024 that it still did not seem possible, and the thread's last post is from January 2025 with no confirmed method. — [Loyverse Town thread](https://loyverse.town/topic/5133-how-to-access-open-tickets-on-loyverse-pos-app-via-api/)
- Loyverse DOCS: "predefined tickets" can be switched on in the Back Office so staff pick ticket names such as table numbers; names already in use are hidden from the pick list in the POS app. — [Loyverse: predefined open tickets](https://help.loyverse.com/help/how-use-predefined-open-tickets)
- Loyverse SPEC: receipts have `order` (order name or number) and `dining_option`; the `receipts.update` webhook fires when a receipt is created or updated. — [Loyverse OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Pawoon SPEC: `GET /transactions` examples show finished sales with `receipt_code` and payment totals; there is no saved-order or open-bill endpoint, and no table key. Sales types are exposed by name, e.g. "Dine In". — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Olsera SPEC: open orders are listable (`/order/openorder`) and have separate payment-status and status update endpoints, so unpaid orders are visible. No table field name was found. — [Olsera Open API docs](https://docs-api-open.olsera.co.id/)
- Square 3P (for comparison only; not sold in Indonesia): a Square developer forum reply states open tickets on the POS are not accessible via API or webhooks. — [Square developer forum](https://developer.squareup.com/forums/t/api-access-for-tickets/297/14)
- GoBiz Moka route DOCS: paid transactions only, no table field. — [GoBiz: Get Paid Transactions List](https://developer.gobiz.com/docs/api/mokapos-integration/get-paid-transactions-list)

### Inferences
- With Loyverse, the best achievable signal is "a dine-in receipt for ticket 'Meja 5' was just paid", which marks a table becoming free (in pay-at-the-end service) but never marks it becoming occupied. That is half the signal and arrives only at the end of the visit.
- With Pawoon, a paid "Dine In" transaction says a party exists somewhere in the cafe but not at which table, and not when they leave.
- Open-bill access is a recurring gap across POS APIs (Loyverse and Square both withhold it), which makes Moka's `sync_bills` unusual and worth verifying before relying on it.

### Gaps
- Whether Loyverse's `order` field on a receipt is populated with the predefined ticket name was not confirmed from docs; the spec only describes it as "order name or number".
- Whether Moka's direct API (as opposed to the GoBiz route) is still granted to new apps with the `transaction` scope in 2026 is unverified.

## 5. Per-merchant authorization flow

### Takeaway
Moka and Loyverse support a proper OAuth consent flow where the cafe owner clicks "allow" for a third-party app. Pawoon and Olsera rely on the merchant creating an app in their own dashboard and handing over the credentials. Majoo requires a commercial application per merchant.

### Cited Findings
- Moka SPEC: the documented flow is: the business owner opens the App Market in the backoffice, clicks "get started" on an app, is sent to an authorization page, clicks allow, and is redirected to the third-party app with a temporary `code`; the app exchanges it at `POST /oauth/token` for an access token and refresh token. Scopes: `customer`, `library`, `profile`, `report`, `transaction`, `checkout`, `checkout_api`, `sales_type`. The token example shows `expires_in: 15552000` and scope "profile report customer library transaction". Scopes are configured when the app is created in the developer platform. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Moka via GoBiz DOCS: uses client-credentials with scope `mokapos:reporting:read`. — [GoBiz: Get Paid Transactions List](https://developer.gobiz.com/docs/api/mokapos-integration/get-paid-transactions-list)
- Loyverse SPEC: OAuth authorization URL `https://api.loyverse.com/oauth/authorize?client_id=...&scope=...&response_type=code&redirect_uri=...&state=...`; supported scopes include `receipts_read`, `stores_read`, `pos_devices_read`, `items_read`, `merchant_read`. Alternatively a personal access token, which the spec warns "gives unlimited access" to the account. — [Loyverse OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Pawoon SPEC: `POST /oauth/token` with `grant_type: client_credentials`, `client_id` (application ID), and `client_secret` (secret key) from an app created in the merchant's dashboard; the example token has `expires_in: 31536000` (one year) and an empty scopes list. — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Olsera SPEC: `POST /api/open-api/v1/id/token` with `app_id`, a signature computed as `hash_hmac('sha256', app_id:timestamp, secret_key)`, and `grant_type: secret_key`; returns an access token and refresh token. The app is created from the merchant's own Olsera account in the docs console. — [Olsera Open API docs](https://docs-api-open.olsera.co.id/)
- DealPOS DOCS: `POST /api/v3/Token/OAuth2` with OAuth2 client credentials on a per-merchant host; a "Client Secret" group exists. — [DealPOS API](https://developer.dealpos.com/openapi/openapi/invoice)
- Odoo DOCS: authenticate with database, login, and an API key in place of the password; on Odoo Online a user password or key must first be set. — [Odoo 18 External API](https://www.odoo.com/documentation/18.0/developer/reference/external_api.html)
- Majoo MKT: each merchant applies through a form; a majoo consultant follows up; the merchant's own IT team does the integration with majoo as facilitator. — [majoo API](https://majoo.id/majoo-api)

### Inferences
- Pawoon's and Olsera's credential models give the third party everything the merchant's app can do, with no read-only scope visible in the docs; a cafe owner would be handing where2go broad access, including write endpoints. Loyverse OAuth (`receipts_read` only) and Moka OAuth (`transaction` scope) are narrower.
- For where2go's onboarding, every route requires the cafe owner (not floor staff) to act once in the POS back office.

### Gaps
- Whether a Moka private app ("In Review") can be authorized by a merchant other than the developer's own account was not confirmed.
- GoBiz onboarding requirements for the MokaPos integration (partner approval, business linking) were not found on the pages read.

## 6. Existing third-party integrations that read table or order state

### Takeaway
Proof exists that order-level data flows to outside apps (QR-order, accounting, ERP sync), but no documented third-party product was found that reads live table occupancy from any of these POS systems.

### Cited Findings
- Moka DOCS: App Marketplace partners named in the help centre are Circle Media, Digiresto, Jurnal, and Storelogy. — [Tentang Moka Connect](https://help.mokapos.com/tentang-moka-connect)
- Moka SPEC: the "Advanced Orderings" API lets an outside app push orders into the Moka app and read their status (`GET /v1/outlets/{outlet_id}/advanced_orderings/orders/{application_order_id}/status`). — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Moka 3P: an Odoo Apps module "Moka Pos Odoo Integration" (v17) exists, and a Medium post describes integrating Moka with Jurnal.id through the open API (about seven years old). — [Odoo Apps: pos_moka](https://apps.odoo.com/apps/modules/17.0/pos_moka); [Medium: Integrasi MOKA Pos dengan Jurnal.Id](https://alfian-rahman.medium.com/integrasi-moka-pos-dengan-jurnal-id-6ed06ee042b6)
- Pawoon SPEC: the sales-type list in the docs example includes entries with `mode` values `pawoon-live`, `digiresto`, and `pawoon-order` ("Digiresto - Dine In", "Pawoon Order - Dine In"), showing that QR/online-order apps inject dine-in orders into the POS. — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Loyverse 3P: connector pages on Make and Pipedream expose Loyverse receipts and webhooks to no-code automations. — [Make: Loyverse](https://www.make.com/en/help/app/loyverse); [Pipedream: Loyverse](https://pipedream.com/apps/loyverse/integrations/http)
- Loyverse 3P: forum users state that no marketplace app can read open tickets because the API cannot; one demo app that added items to a ticket was judged to work locally on the device, not through the API. — [Loyverse Town thread](https://loyverse.town/topic/5133-how-to-access-open-tickets-on-loyverse-pos-app-via-api/)
- ESB MKT: QR ordering (ESB Order) and kitchen display are first-party modules inside ESB's own suite. — [ESB POS](https://www.esb.id/en/solusi/produk/pos)

### Inferences
- The integrations that exist push orders into the POS or pull finished sales out. The QR-order apps (Digiresto, Pawoon Order, ESB Order) know the table because the guest scanned a table QR, not because they read table status from the POS. That points to the table QR as the place where table identity is cheapest to capture.

### Gaps
- No public technical description was found of what Digiresto, Storelogy, or Circle Media read from Moka.
- Kitchen display systems for these POS products appear to be first-party; no third-party KDS reading open bills by API was found.

## 7. Counter-service cafes (pay first, no bill tied to a table)

### Takeaway
In a pay-first coffee shop the POS records a paid sale at the counter with no table, so POS data says little or nothing about which tables are occupied or when they free up. Even Moka's open-bill data only helps where staff actually open a bill against a table.

### Cited Findings
- Moka SPEC: "TableID is 0 if it is not a dine in order", and `dine_in_only` exists precisely because bills are returned "assigned with and without a table" by default. — [Moka Swagger JSON](https://al-ms-id-p-file-public.oss-ap-southeast-5.aliyuncs.com/static/open-platform/api-docs/swagger/api-docs-prod.json)
- Loyverse SPEC: a receipt carries only `dining_option` (e.g. "Dine in", "To go") and an optional `order` name; no table object. — [Loyverse OpenAPI YAML](https://developer.loyverse.com/docs/API-Reference__v1.0.yaml)
- Pawoon SPEC: a transaction carries `sales_type_name` (e.g. "Dine In") and no table. — [Pawoon OpenAPI (Postman)](https://documenter.getpostman.com/view/2468476/UVRGF4ms)
- Loyverse DOCS: table-named tickets depend on the merchant enabling predefined tickets and staff saving a ticket; a direct sale does not need one. — [Loyverse: predefined open tickets](https://help.loyverse.com/help/how-use-predefined-open-tickets)

### Inferences
- In pay-first service the bill closes at the start of the visit. Under the proposed rule ("bill paid = table free") a table would be marked free at the moment the guest sits down, which is the opposite of the truth. The rule only holds for pay-at-the-end table service.
- The only POS-derived signal available in pay-first cafes is a count of recent dine-in sales, which could feed a rough "busy / quiet" estimate but not per-table status. Dwell time in Yogyakarta student cafes (long laptop sessions on one drink) would make even that estimate weak.
- where2go's target cafes near Gejayan are likely to include many pay-first coffee shops, so the share of partner cafes where POS integration could replace the manual tap may be small. This needs checking with the actual cafes.

### Gaps
- No data was found on what share of Yogyakarta cafes use pay-first versus table service, or which POS they run.
- No source measured how reliably staff close or cancel open bills when guests leave (a forgotten open bill would show a free table as taken).

## 8. Non-POS automation alternatives and their cost in Indonesia

### Takeaway
Component prices on Tokopedia are low: NFC stickers about Rp2,000–6,000 each, PIR modules about Rp9,000–21,000, and 24 GHz mmWave presence modules about Rp95,000–132,000, before microcontroller, power, casing, and installation. Costs for camera people-counting and Wi-Fi device counting could not be sourced in this session.

### Cited Findings
- mmWave presence sensor (HLK-LD2410 / LD2410C): Tokopedia listings at about Rp95,000, Rp98,100, about Rp120,000 with test board, Rp122,600, and Rp132,200; a 5-piece pack at about Rp228,000. — [Tokopedia: ld2410](https://www.tokopedia.com/find/ld2410); [Tokopedia: HLK LD2410 listing](https://www.tokopedia.com/solarperfect/hlk-ld2410-mmwave-24ghz-human-presence-sensor-kehadiran-manusia)
- LD2410 specification: 24 GHz human presence radar, GPIO and UART output; detection range to about 6 m per listing and maker page. — [Hi-Link HLK-LD2410](https://www.hlktech.net/index.php?id=988)
- PIR motion sensor (HC-SR501): Tokopedia listings from about Rp9,000 to Rp11,500; a B2B marketplace lists Rp21,090 including VAT. Range 3–7 m adjustable, 4.5–20 V DC. — [Tokopedia: sensor pir hc sr501](https://www.tokopedia.com/find/sensor-pir-hc-sr501); [Mbizmarket: HC-SR501](https://www.mbizmarket.co.id/catalog/detail/sensor-gerak-hc-sr501-pir-4111440-7258512.html)
- NFC sticker (NTAG213): Tokopedia listings at Rp2,350 (25 mm), Rp3,499, Rp5,227, and Rp5,800 (30 mm); 100 pieces for Rp390,000. — [Tokopedia: nfc tag ntag213](https://www.tokopedia.com/find/nfc-tag-ntag213); [Tokopedia: NTag213 sticker listing](https://www.tokopedia.com/electron/ntag213-sticker-nfc-logo-rfid-13-56mhz-tag-label-iso14443a-stiker)

### Inferences
- QR code on the table scanned by the guest: near-zero hardware cost (a printed sticker), and it is the mechanism existing QR-order apps already use to learn the table. Weakness: it captures arrival only if guests scan, and there is no natural "leaving" event, so tables would need a timeout or staff confirmation to free up.
- NFC tags: same logic and same weakness as QR at a few thousand rupiah per table; adds a tap option but many guests would still need the QR fallback.
- PIR sensors detect motion, not presence, so a guest sitting still with a laptop would read as absent; mmWave modules are designed for stationary presence and are the more suitable sensor type for seated guests. A per-table mmWave node would cost roughly Rp95,000–132,000 for the sensor plus a microcontroller, power supply, and casing (not priced here), and needs Wi-Fi and mains or battery power at every table.
- Sensor hardware creates an install and maintenance burden for a platform whose current cost per cafe is zero hardware; a 15-table cafe would need on the order of Rp1.5–2 million in sensor modules alone, before the other parts and labour.
- where2go's existing rule that occupancy is confirmed by staff and goes stale without a heartbeat already handles the "no leaving event" weakness of QR/NFC approaches better than a pure guest-scan design would.

### Gaps
- Overhead camera people-counting: no Indonesian price or accuracy source was retrieved (search quota exhausted). Privacy implications under Indonesia's personal data protection law were not researched.
- Wi-Fi device counting: no source retrieved on cost or on accuracy given phone MAC address randomization.
- Seat or table pressure sensors: no Tokopedia price found for a seat-occupancy pressure mat.
- ESP32 or similar controller prices, enclosure costs, and installation labour in Yogyakarta were not sourced.
- No field accuracy data for LD2410 at cafe-table spacing (adjacent tables within the radar's range could cause false positives).
