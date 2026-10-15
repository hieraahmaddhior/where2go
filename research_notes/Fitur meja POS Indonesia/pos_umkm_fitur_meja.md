# Table-management features of SMB (UMKM) cloud POS products in Indonesia (as of 13 Oct 2026)

Reading notes for the report writer:
- All official pages were fetched on 2026-10-13. "Official docs" = vendor help center / user guide. "Official marketing" = vendor product or pricing page. "Third party" = blogs, press, competitor comparison pages (lower trust, flagged each time).
- Pages were read through an automated fetch-and-summarise tool. Several pricing tables lost their per-plan checkmarks in extraction; where that happened it is stated, and the plan tier is listed as a gap rather than guessed.
- Products with real findings: Moka, majoo, Pawoon, Qasir, Olsera, iSeller, Kasir Pintar, Loyverse, plus a little on Opaper. Youtap, iReap, Nutapos, Cashlez, BukuWarung, ESB, Runchise: nothing usable found (see Gaps).

## 1. Does each product have table management (floor plan, table status, open bill per table, move/merge/split), and on which plan tier?

### Takeaway
Every POS examined except the base tiers of Qasir and Kasir Pintar has some form of staff-side table management, and Moka, majoo, Pawoon and Olsera all document floor plan plus move/merge/split. In all of them, a table becomes "occupied" because a bill or order is attached to it, not because someone marks the seat taken independently; Loyverse is the weakest (named tickets, no floor plan).

### Cited Findings

**Moka POS (GoTo)**
- Official docs: floor plan is built in the back office under TABLE MANAGEMENT > Table Map > choose outlet > Add Table, with table name, seat capacity (pax) and table shape — [Moka help: Cara Menambahkan Meja](https://help.mokapos.com/cara-menambahkan-meja)
- Official docs: from TABLE MAP staff can Move Table and Merge Table; an occupied table is labelled "Taken" — [Moka help: memindahkan dan menggabungkan meja](https://help.mokapos.com/s/article/360000225914?language=in)
- Official docs: split bill and delete bill via the table are documented — [Moka help: Cara Memisahkan Bill](https://help.mokapos.com/cara-memisahkan-bill); [Moka help: menghapus bill melalui meja](https://help.mokapos.com/cara-menghapus-bill-melalui-meja-pada-aplikasi)
- Official marketing: Table Management lets staff see whether a table is occupied or available, track how long guests have been at the table, match bills to a table number or seat position, and review cancel history — [Moka Table Management page](https://www.mokapos.com/en/table-management/)
- Official marketing: an offline sync mode for Table Management lets orders be taken across devices without internet — [Moka blog: Offline Sync Table Management](https://www.mokapos.com/blog/offline-sync-table-management)
- Official pricing page lists "Manajemen Pengaturan Meja" as a row in the plan comparison, but the per-plan checkmarks did not survive extraction, so the tier is unconfirmed — [Moka pricing](https://www.mokapos.com/pricing)

**majoo**
- Official pricing page: "Order with table layout" is in all plans including Starter; "table management (gabung, pisah, pindah = merge, split, move)" and "table seating time limit" start at Advance (not in Starter); split bill is in all plans — [majoo harga](https://majoo.id/harga)
- Official docs: two layout modes, "Grid Meja" (tables in a grid) and "Denah Kustom" (custom floor plan with square, rectangular and round table elements plus decorative elements such as walls, doors, plants) — [majoo user guide: Pengaturan Denah dan Meja](https://majoo.id/panduan-pengguna/detail/378)
- Official docs: per-table options are Batas Waktu (maximum occupancy time), Pengingat Waktu (cashier notification before time runs out), Minimum Tagihan (minimum bill per table, with three enforcement options) and a free-text Label — [majoo user guide: Pengaturan Denah dan Meja](https://majoo.id/panduan-pengguna/detail/378)
- Official docs (via search summary of the Mode Table guide, not fetched in full): table mode shows a duration by default and can switch to remaining time; colours signal state, e.g. blue = guest seated but not yet ordered, yellow = time limit nearly up, red = time limit exceeded — [majoo user guide: Mode Table](https://majoo.id/panduan-pengguna/detail/55)

**Pawoon**
- Official marketing: "Modul Meja" shows which tables are in use, records transactions by table number, and supports separating, merging or moving tables; it is pitched as helping staff see empty tables to seat customers and manage the queue — [Pawoon features](https://www.pawoon.com/fitur-point-of-sales/)
- Official marketing: split bill (one table, several bills) is listed for restaurants — [Pawoon restaurant page](https://www.pawoon.com/mesin-kasir-terbaik-untuk-restoran/)
- The pricing page names Modul Meja only as a menu link; which of the two plans (Free, Pro) includes it is not stated in the extracted text — [Pawoon harga](https://www.pawoon.com/harga/)

**Qasir**
- Official pricing page: "Pengaturan meja" (table arrangement) is NOT in Qasir Pro and IS in Qasir Pro Plus — [Qasir Pro pricing](https://www.qasir.id/qasir-pro)
- The Qasir restaurant solution page does not mention table arrangement, open bill, QR order or reservation at all; it lists kitchen ticket printing, QRIS, customer data, employee features and reports — [Qasir restaurant solution](https://www.qasir.id/en/business-solution-restaurant)

**Olsera**
- Official pricing page: "Manajemen Meja" is listed under F&B features; the extraction suggests Premium and Pro include it, but the per-plan checkmarks were not clearly readable (treat tier as unconfirmed) — [Olsera pricing](https://www.olsera.com/id/pricing)
- Official docs: merchants set up a floor plan (denah meja) and download one barcode per table number — [Olsera knowledge base: Online Order Dine In](https://crm.olsera.co.id/knowledge-base/article/cara-menggunakan-online-order-dine-in)
- Official marketing/blog: orders are tagged by table number or take-away, and separate bills per customer are supported — [Olsera blog on restaurant functions](https://www.olsera.com/en/blog/fungsi-olsera-pos-jadi-solusi-jalankan-restoran-yuk-cari-tahu-fitur-dan-keunggulannya/323)

**iSeller**
- Official marketing: the F&B Premium product claims "dynamic table management" with real-time table status and fast order entry — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium)
- Official blog (2019, possibly outdated): table layout and reservations are reachable from the checkout page — [iSeller blog: Top Features in 2019 Q3](https://www.isellercommerce.com/blog/top-features-in-q3)
- Move/merge/split and floor-plan editing were not described on the pages read — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium)

**Kasir Pintar**
- Official docs: tables exist as part of the paid "Food Menu" plugin's QR Meja feature (one fixed QR code per table; table names and URLs auto-generated and editable). This is a list of tables for QR ordering, not a floor plan — [Kasir Pintar help: Pengaturan Fitur QR Meja](https://help.kasirpintar.co.id/knowledge-base/cara-mengaktifkan-dan-mengatur-fitur-qr-meja/)
- The pricing page does not name table management, open bill, reservation or queue as features — [Kasir Pintar harga](https://kasirpintar.co.id/harga)

**Loyverse**
- Official docs: "predefined tickets" are preset names such as "Table 1", "Table 2" set in the Back Office (Settings > Open tickets), one set per store; when saving an open ticket staff pick from the names not currently in use, which is the only table status; split and move are supported, and move replaces merge for predefined tickets — [Loyverse help: predefined open tickets](https://help.loyverse.com/help/how-use-predefined-open-tickets)
- No floor plan or timer is described on that page — [Loyverse help: predefined open tickets](https://help.loyverse.com/help/how-use-predefined-open-tickets)
- Official marketing: dining options (Dine in, Take out, Delivery) and one-tap assignment of tickets to tables — [Loyverse restaurant POS](https://loyverse.com/restaurants-pos)

**Opaper (additional product found)**
- Official docs: open bill is a premium-plan feature that needs merchant verification, and can be enabled for the cashier only or also for the buyer side — [Opaper help: Open Bill](https://intercom.help/pt-opaper-international-indonesia/en/articles/7145493-open-bill)

### Inferences
- Where2go's merchant feature "tap each table free/taken" duplicates, in data terms, what Moka, majoo, Pawoon and Olsera staff already do as a side effect of opening and closing bills on a table map. For cafes that use those modules, table state already exists inside the POS.
- For the cheapest tiers (Qasir Pro, Kasir Pintar without the Food Menu plugin, Loyverse free) there is either no table module or only a named-ticket list, so a small cafe on those tiers has no existing table state to reuse.
- In every product documented, "occupied" is tied to a bill/order. None of the docs read describe marking a table occupied with no order attached, except majoo's blue "seated, not yet ordered" state.

### Gaps
- Exact plan tier for table management in Moka (Basic vs Pro vs Enterprise), Pawoon (Free vs Pro) and Olsera (Basic vs Premium vs Pro): the comparison tables did not extract cleanly. Needs a manual look at the pricing pages.
- iSeller: no help-center article on table layout was read; move/merge/split unconfirmed.
- Whether Qasir Pro Plus "Pengaturan meja" includes a visual floor plan or move/merge: not documented on the pages read.

## 2. Waitlist / queue, reservation, QR order at table, pre-order, table timer, turnover reports

### Takeaway
QR ordering at the table is now common (majoo, Olsera, iSeller, Kasir Pintar, Pawoon via Digiresto, Opaper), and majoo has a documented per-table time limit with reminder. A true waitlist / virtual queue for walk-in guests was not found documented in any of these SMB products, and no table-turnover or average-dine-time report was found in any of them.

### Cited Findings

**Table timer / dine duration**
- majoo: per-table Batas Waktu (time limit, examples 30 and 60 minutes) and Pengingat Waktu (reminder, example 5 minutes before); in the plan table "table seating time limit" starts at Advance — [majoo user guide 378](https://majoo.id/panduan-pengguna/detail/378); [majoo harga](https://majoo.id/harga)
- Moka: marketing says staff can track how long guests have been eating at a table — [Moka Table Management page](https://www.mokapos.com/en/table-management/)
- Loyverse: no timer described — [Loyverse help](https://help.loyverse.com/help/how-use-predefined-open-tickets)

**Reservation**
- majoo: "Simple reservation" is in all plans including Starter — [majoo harga](https://majoo.id/harga). The documented Mode Reservasi is a time-table of bookings with date, time, customer and service provider, which reads as service-business booking more than restaurant table booking — [majoo user guide: Mode Reservasi](https://majoo.id/panduan-pengguna/detail/138)
- majoo news post (older, undated in the result) claims the custom floor plan helps avoid clashes between walk-in diners and reserved customers — [majoo news](https://majoo.id/news/more/fitur-baru-majoo-kustomisasi-denah-meja-jadi-lebih-mudah-untuk-bisnis-restoran)
- Olsera: "Reservasi" appears in the Online Order section of the pricing table with a footnote that additional fees apply (amount not shown) — [Olsera pricing](https://www.olsera.com/id/pricing)
- iSeller: reservations are listed as a benefit on the F&B Premium page without detail — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium)
- Qasir, Pawoon, Kasir Pintar, Loyverse: no reservation feature on the pages read — [Qasir Pro](https://www.qasir.id/qasir-pro); [Pawoon features](https://www.pawoon.com/fitur-point-of-sales/); [Kasir Pintar harga](https://kasirpintar.co.id/harga); [Loyverse pricing](https://loyverse.com/pricing)

**Waitlist / queue (antrean)**
- Qasir: "Nomor antrian pelanggan" (customer queue number) is in Pro Plus, not Pro. This is an order queue number, not a seating waitlist — [Qasir Pro](https://www.qasir.id/qasir-pro)
- Moka: marketing says table status helps "manage waitlists", but no waitlist tool is described — [Moka Table Management page](https://www.mokapos.com/en/table-management/)
- Pawoon: marketing says seeing empty tables makes it easier to seat customers and manage the queue; no queue tool is described — [Pawoon features](https://www.pawoon.com/fitur-point-of-sales/)
- majoo pricing page: queue/antrean not mentioned in the F&B plan table — [majoo harga](https://majoo.id/harga)

**QR order at table / self-order**
- majoo: QR order / eMenu from Advance; Self Order from Prime. The page is internally inconsistent about Starter (cashier section says online order via eMenu QR unavailable; Toko Online section says QR static and dynamic order included) — [majoo harga](https://majoo.id/harga)
- Olsera: customers scan a per-table barcode and land on an order page already bound to that table, set the number of guests, order and pay; the merchant can enable a radius check for dine-in — [Olsera KB: Online Order Dine In](https://crm.olsera.co.id/knowledge-base/article/cara-menggunakan-online-order-dine-in). Digital menu book: QR in Basic, QR and web link in Premium and Pro; Self Order in Pro — [Olsera pricing](https://www.olsera.com/id/pricing)
- Kasir Pintar: QR Order (new code per order) and QR Meja (fixed code per table) in the Food Menu plugin; orders land in Kasir Pintar Pro/POS; pay-before or pay-after flow configurable; no customer app or login needed — [Kasir Pintar help: QR Order & QR Meja](https://help.kasirpintar.co.id/knowledge-base/fitur-qr-order-kasir-pintar/). QRIS payment for QR Order/QR Meja was added in POS 3.4.0, release note dated 2026-08-24 — [Kasir Pintar POS 3.4.0](https://help.kasirpintar.co.id/2026/08/24/kasir-pintar-pos-3-4-0/)
- iSeller: QR table ordering, eMenu and a self-service kiosk — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium); [iSeller online ordering](https://www.isellercommerce.com/online-ordering)
- Pawoon: digital menu and QR/microsite ordering through the Digiresto integration, activated in the dashboard under Aplikasi > Pesanan Online — [Pawoon Digiresto](https://www.pawoon.com/digiresto/)
- Moka: QR ordering at the table is not mentioned on the Table Management page — [Moka Table Management page](https://www.mokapos.com/en/table-management/)
- Loyverse: QR ordering not mentioned on the pricing page — [Loyverse pricing](https://loyverse.com/pricing)

### Inferences
- "Dine-in duration" as a staff-side display exists at least in majoo and Moka, so the raw data for average dine time is being captured by those systems even though no turnover report was found.
- Walk-in waitlist / virtual queue looks like an unserved feature among the SMB POS products read. It is the planned where2go merchant feature least likely to collide with something cafes already pay for.
- QR-at-table ordering is the feature most widely duplicated. Because each QR is bound to a table, QR ordering systems also know which tables have an active order.

### Gaps
- Table turnover / average dine time reports: not found in any product's pages. This is absence in the pages read, not proof the reports do not exist inside back offices.
- Pre-order before seating: not found described for any product.
- Moka QR order at table (Moka Order / GoFood-style self-order): not confirmed either way; the pricing page did not list a QR-order add-on price.
- Whether majoo's "simple reservation" in F&B blocks a specific table on the floor plan: unclear from docs.

## 3. Pricing in IDR per outlet per month (prices as displayed on 2026-10-13)

### Takeaway
Paid tiers that include table features run roughly Rp100,000 to Rp500,000 per outlet per month: Qasir Pro Plus about Rp100k/month billed yearly, Olsera about Rp107k to Rp224k/month billed yearly, Pawoon Pro Rp299k, Moka Rp299k to Rp799k, majoo Advance Rp499k. Loyverse's table tickets appear to be in the free core.

### Cited Findings
- Moka: Basic Rp299.000, Pro Rp499.000, Enterprise Rp799.000 per outlet per month; extra employee slot Rp10.000 per slot beyond quota; no separate price shown for table management; page footer says copyright 2025, no effective date — [Moka pricing](https://www.mokapos.com/pricing)
- majoo: Starter Rp249.000, Advance Rp499.000, Prime Rp999.000 per outlet per month excluding PPN; Prime+ by quote. Terminal limits 2 / 3 / 5. Add-ons: extra terminal licence Rp59.000, employee licence Rp49.000, and a set of Rp499.000/month add-ons (e.g. Add-On Food Order, majoo Order+, Loyalty) — [majoo harga](https://majoo.id/harga)
- majoo hardware bundles: Deal Starter 12 (VX Neo device + 12 months) Rp3.287.000; Deal Advance 12 Rp4.487.000; Deal Advance 24 Rp7.475.000 — [majoo harga](https://majoo.id/harga)
- Pawoon: Free plan limited to 7 transactions per day and one outlet; Pawoon Pro Rp299.000 per outlet per month; no add-on prices listed — [Pawoon harga](https://www.pawoon.com/harga/)
- Qasir: Pro Rp699.000 per 12 months (struck-through Rp899.000); Pro Plus Rp1.199.000 per 12 months (struck-through Rp1.399.000); Enterprise custom; prices exclude tax; new users get a 7-day Pro trial and must then subscribe to keep the app active (no permanent free plan shown on this page) — [Qasir Pro](https://www.qasir.id/qasir-pro)
- Olsera: Basic Rp1.288.000/year (list Rp1.888.000), Premium Rp1.988.000/year (list Rp2.888.000), Pro Rp2.688.000/year (list Rp3.888.000), excluding PPN; some online-order features carry unstated extra fees — [Olsera pricing](https://www.olsera.com/id/pricing). A third-party comparison blog (HitPay, lower trust, 2025) gives monthly prices of Rp128.000 / Rp218.000 / Rp298.000 for Basic / Premium / Pro — [HitPay blog](https://hitpayapp.com/blog/sistem-aplikasi-pos-gratis-di-indonesia)
- iSeller: plan prices did not render (template placeholders only). Add-ons visible: Rp3,6 million per year per countertop POS; Rp1,2 million per year per additional kitchen display / printer / customer display — [iSeller pricing](https://www.isellercommerce.com/pricing)
- Kasir Pintar: Free plan (single user, 1,000 items); PRO and plugin monthly prices did not render. Yearly bundles shown: Kasir Pintar Pro Rp666.000/year; "Hemat Bisnis" Rp1.133.000/year; "Hemat Desktop" Rp1.133.000/year; "Heboh" Rp1.499.000/year — [Kasir Pintar harga](https://kasirpintar.co.id/harga)
- Loyverse: core POS, kitchen display, customer display and multi-store are free; paid add-ons in USD only: employee management $5/month per employee, advanced inventory $25/month per store, unlimited sales history $9/month per store — [Loyverse pricing](https://loyverse.com/pricing)
- Opaper: its product page says no monthly fee and shows a figure of IDR500K whose scope was not clear from the snippet — [Opaper products](https://www.opaper.app/en/products)

### Inferences
- Computed monthly equivalents (my arithmetic from the yearly prices above): Qasir Pro about Rp58k/month, Qasir Pro Plus about Rp100k/month; Olsera Basic about Rp107k, Premium about Rp166k, Pro about Rp224k per month.
- The cheapest confirmed route to a table module is Qasir Pro Plus (about Rp100k/month, yearly billing). The cheapest confirmed route to move/merge/split plus a seating time limit is majoo Advance at Rp499k/month.
- Loyverse predefined tickets are probably free, since they are part of the core POS and are not among the three paid add-ons, but the pricing page does not say so explicitly.

### Gaps
- iSeller plan prices in IDR: page is client-rendered; not obtained.
- Kasir Pintar PRO monthly price and Food Menu plugin price: amounts did not render.
- Whether Olsera's and Qasir's yearly prices are per outlet: not stated on the pages.
- Hardware prices for Moka, Pawoon, Olsera, Qasir: not collected.
- The Moka pricing page carries no date; whether Rp299k/499k/799k is the current 2026 list is assumed from the live page only.

## 4. Target segment and published merchant counts

### Takeaway
Qasir, Kasir Pintar and Loyverse aim at micro merchants and warung-scale shops; Pawoon and Olsera at small to mid F&B; Moka and majoo at cafes and restaurants up to multi-outlet; iSeller pitches "premium brands". Published merchant counts are sparse and mostly old.

### Cited Findings
- Moka: site states it is trusted by more than 45,000 merchants across Indonesia (live page, fetched Oct 2026) — [Moka Table Management page](https://www.mokapos.com/en/table-management/). At the 2020 Gojek acquisition it was reported as used by 40,000 businesses in 200 cities (older than 2024, possibly outdated) — [Kontan](https://industri.kontan.co.id/news/sah-gojek-resmi-akuisisi-moka?page=all)
- majoo: more than 35,000 offline merchants and about Rp1 trillion monthly sales volume (Oct 2022, possibly outdated) — [Warta Ekonomi](https://wartaekonomi.co.id/read448457/bri-kolaborasi-dengan-majoo-berikan-solusi-digital-untuk-merchant-di-indonesia); majoo's own careers page cites more than 45,000 active MSME merchants (undated) — [majoo karir](https://majoo.id/karir/63)
- Qasir: more than 700,000 micro merchants joined as of Q1 2021, of which 22,000 were paying users (older than 2024, possibly outdated) — [DailySocial](https://en.dailysocial.id/post/qasir-pos-startup-plans-to-expand-its-business-to-Southeast-Asia-this-year)
- Qasir restaurant page says "thousands of restaurant owners" with no number — [Qasir restaurant solution](https://www.qasir.id/en/business-solution-restaurant)
- Pawoon: cloud POS for F&B, retail, barbershop, salon and others, multi-outlet capable — [App Store listing](https://apps.apple.com/id/app/pawoon-pos/id1546031246)
- Olsera: described as serving micro, small and medium businesses across retail, restaurant and services (third-party database) — [CB Insights](https://www.cbinsights.com/compare/eresto-vs-olsera); Olsera has a dedicated coffee-shop POS page — [Olsera coffee shop](https://www.olsera.com/en/pos/coffee-shop)
- iSeller: customers range from small cafes and quick-service restaurants to large retail chains and food courts (third-party database) — [Dealroom](https://app.dealroom.co/companies/iseller); the F&B Premium page shows logos under "Trusted by Premium Brands" with no count — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium)
- Kasir Pintar: Free tier is single-user with 1,000 items; PRO adds up to 5 staff accounts and 10,000 items — [Kasir Pintar harga](https://kasirpintar.co.id/harga)
- Loyverse: the Android app is listed as "Loyverse POS - Kasir UMKM" and the help center has a Bahasa Indonesia option — [BlueStacks listing](https://www.bluestacks.com/campaign/com.loyverse.sale/id); [Loyverse help](https://help.loyverse.com/help/sales)
- A third-party comparison (HitPay, lower trust) names Moka, majoo, Kasir Pintar, Olsera, Pawoon, iReap and Loyverse as the popular POS apps in Indonesia in 2025 — [HitPay blog](https://hitpayapp.com/blog/sistem-aplikasi-pos-gratis-di-indonesia)

### Inferences
- Qasir's 2021 ratio (22,000 paying of 700,000 registered, about 3%) suggests the large headline user counts for free-tier POS apps overstate the number of merchants on tiers that include table features.
- Moka and majoo each claim roughly 45,000 merchants nationally across all verticals. Spread over all of Indonesia and all business types, the number of Yogyakarta cafes using either product's table module is likely small in absolute terms. This is my inference; no regional figure was found.

### Gaps
- No current (2025 to 2026) merchant counts for Pawoon, Olsera, iSeller, Kasir Pintar or Loyverse in Indonesia.
- No Yogyakarta or per-city figures for any product.
- No figure for how many merchants are on a tier that includes table management.

## 5. Is table availability or occupancy shown to the public?

### Takeaway
No product examined was found to publish table availability or occupancy to customers. Table state is a staff-side view in all of them; the only customer-facing surfaces are per-table QR menus/ordering and, in some, a reservation form.

### Cited Findings
- Moka: the Table Management page describes a merchant-side tool and does not describe any customer-facing view — [Moka Table Management page](https://www.mokapos.com/en/table-management/)
- majoo: the floor plan guide covers cashier-side settings only; nothing shown to customers is described — [majoo user guide 378](https://majoo.id/panduan-pengguna/detail/378)
- Pawoon: Modul Meja is described as letting staff see which tables are in use — [Pawoon features](https://www.pawoon.com/fitur-point-of-sales/)
- Olsera: the customer-facing piece is the per-table barcode order page and the digital menu book (QR / web link), not availability — [Olsera KB: Online Order Dine In](https://crm.olsera.co.id/knowledge-base/article/cara-menggunakan-online-order-dine-in)
- Kasir Pintar: customers reach a browser menu from a table QR without login; the docs describe ordering only — [Kasir Pintar help: QR Order & QR Meja](https://help.kasirpintar.co.id/knowledge-base/fitur-qr-order-kasir-pintar/)
- Loyverse: table status is limited to hiding in-use ticket names from the staff picker — [Loyverse help](https://help.loyverse.com/help/how-use-predefined-open-tickets)

### Inferences
- Public live free-table counts appear to be unserved by the SMB POS products read. where2go's public finder does not duplicate an existing POS feature; its merchant-side table tapping does duplicate the POS table map where a cafe uses one.
- This is a finding of absence across the pages read. It is weaker for iSeller and Qasir, whose table documentation was thin.

### Gaps
- Whether any reservation widget (Olsera Reservasi, iSeller, majoo) shows remaining capacity or slots to the customer: not confirmed.
- Dedicated reservation / queue apps outside POS were out of scope and not checked.

## 6. Evidence of how commonly cafes actually use table features, especially counter-service coffee shops

### Takeaway
I found no reliable usage data, reviews or forum posts on how many cafes use the table modules. The only evidence is one vendor blog (lower trust) stating that coffee shops and quick-service outlets normally run close-bill, pay-at-counter flows where open bill and tables are not needed.

### Cited Findings
- Third party, vendor blog (HashMicro, an ERP/POS vendor; lower trust): in QSR and coffee shops close bill is more usual because transactions need to be fast and simple; open bill suits seated service where guests add orders during the visit, and it requires consistent record discipline at busy times — [HashMicro blog](https://www.hashmicro.com/id/blog/?p=188055)
- Opaper makes open bill an opt-in, premium, verification-gated setting rather than the default — [Opaper help: Open Bill](https://intercom.help/pt-opaper-international-indonesia/en/articles/7145493-open-bill)
- Vendors gate table features to upper tiers: Qasir puts table arrangement only in Pro Plus; majoo puts move/merge/split and the time limit in Advance and above; Kasir Pintar puts tables inside a separate paid plugin — [Qasir Pro](https://www.qasir.id/qasir-pro); [majoo harga](https://majoo.id/harga); [Kasir Pintar help: QR Meja](https://help.kasirpintar.co.id/knowledge-base/cara-mengaktifkan-dan-mengatur-fitur-qr-meja/)
- Kasir Pintar's own docs warn that two phones scanning at one table produce two separate orders, and that table URLs may need refreshing when buyers keep ordering from an old link without paying — [Kasir Pintar help: QR Meja settings](https://help.kasirpintar.co.id/knowledge-base/cara-mengaktifkan-dan-mengatur-fitur-qr-meja/)
- A single Capterra review of Moka surfaced in search complains about missing sub-recipes, not about tables — [Capterra: Moka](https://www.capterra.com/p/199872/Moka/)

### Inferences
- In counter-service coffee shops (order and pay at the bar, then sit anywhere), a POS table map would not reflect who is sitting where, because no bill is attached to a table. For that segment, which is typical of student cafes, POS table state is likely either unused or meaningless as an occupancy signal. This is reasoning from how the features work plus one low-trust vendor source, not measured usage.
- Tier gating implies vendors themselves treat tables as a minority, full-service need rather than a default for small cafes.
- If where2go wants POS-derived occupancy, it would only work for table-service cafes on Moka / majoo / Pawoon / Olsera tiers with the table module in active use; counter-service cafes would still need manual tapping or another signal.

### Gaps
- No Google Play / App Store review text was retrieved for any product; store pages were not readable through the tools used. App-review evidence on table features is entirely missing.
- No forum, Reddit, Kaskus or Facebook-group posts on cafe use of table features were found.
- No survey or press data (DailySocial, Tech in Asia, Katadata) on feature adoption was found.
- Other products named in the brief: Youtap (search returned an unrelated payments company), iReap (no relevant results), Nutapos (only a sponsored 2022 detikFinance piece with kitchen/bar ticket printing and no price — [detikFinance](https://finance.detik.com/berita-ekonomi-bisnis/d-6117413/nutapos-hadirkan-aplikasi-kasir-online-yang-ramah-pengguna)), Cashlez, BukuWarung, ESB, Runchise (hardware page says contact us — [Runchise hardware](https://www.runchise.com/id/hardware)): table features and prices not researched to a usable level.

## One-line API notes (not researched in depth; another researcher covers this)
- Pawoon: "Open API" listed under Solutions on its site — [Pawoon features](https://www.pawoon.com/fitur-point-of-sales/)
- iSeller: "Open API" link in its Resources menu — [iSeller F&B Premium](https://www.isellercommerce.com/pos/fnb-premium)
- Loyverse: pricing page links to a Loyverse API product page and documentation — [Loyverse pricing](https://loyverse.com/pricing)
- Moka, majoo, Qasir, Olsera, Kasir Pintar: no API mention seen on the pages read (not checked further).
