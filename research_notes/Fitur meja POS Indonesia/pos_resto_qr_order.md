# Restaurant-grade POS and QR table-ordering products in Indonesia (as of October 2026)

Reading notes for the report writer:

- Confidence labels used below: **[official page]** = vendor's own product or pricing page, read directly; **[official help doc]** = vendor documentation; **[search snippet]** = seen only in a search-result summary, page not successfully read; **[third party]** = press, sponsored article, or a competitor's blog.
- Almost everything vendors publish about tables is marketing-page copy, not documentation. Only StoreHub has a help-center article that was read directly. Treat "feature exists" as confirmed, and "how it behaves" as mostly unconfirmed.
- Several target pages could not be read (404 or 403): Opaper feature pages, Equip, Mekari help center, Qashier help center, DealPOS restaurant page. These are listed under Gaps, not filled in from memory.
- Research was cut short by search rate limits. Not covered at all: Zeals, Qoin, Ordero, Menuku, Dishserve, Titipku, Mau Order, Eats365, Oracle Micros/Simphony, Odoo POS Restaurant. Do not read their absence as "no such feature".

## 1. Table features: floor plan, live table status, open bill, move/merge, table timer, time-limit alerts

### Takeaway
Floor plan, live status, open bill and move/merge are standard in every restaurant-grade POS found (ESB, Runchise, Opaper, HashMicro, Accurate POS, Qashier). Duration tracking exists in at least two (Runchise for reservations, Accurate POS for table use), but no vendor page read mentions a time-limit alert, and DealPOS shows no restaurant table features at all.

### Cited Findings

**ESB (ESB POS, POSLite)**
- ESB POS advertises "The most complete table management: link table, move table, split bill, and more" and "More organized table position, type, and information settings". The page does not use the words floor plan, table status, open bill, or timer. [official page] — [ESB POS](https://esb.id/en/solusi/produk/pos)
- ESB's own blog says the table feature helps staff arrange tables for dine-in, especially when groups want to merge tables. [search snippet, vendor blog] — [ESB blog](https://esb.id/en/inspirasi/ini-dia-fitur-fitur-terbaik-dari-software-kasir-milik-esb)
- "Table Management" is listed as a feature row on the ESB pricing page, but the page text read did not show which plan includes it. [official page] — [ESB pricing](https://www.esb.id/en/pricing)
- ESB POS runs on Windows/Linux; POSLite on Android/iOS. Other products: ESB Core (F&B ERP), ESB Order, ESB Kitchen, ESB Lounge, ESB Kiosk. [search snippet] — [ESB](https://www.esb.id/en)

**Runchise**
- Table Management module: "Floor plan, status, reservations, turnaround optimization". Full Service segment: "Visual table management with real-time status". Open bills are listed for Full Service and Fine Dining; Bar & Lounge has "Open tab / running bill management". Timers and merge/move are not mentioned on this page. [official page] — [Runchise all features](https://www.runchise.com/en/all-features)
- "Create and manage your restaurant layout visually with a flexible drag-and-drop floor plan system." "Know at a glance which tables are available and which are fully booked." "Effortlessly secure a table for late arrivals or release it when needed." [official page] — [Runchise reservation](https://www.runchise.com/en/reservation)
- "Track and manage reservation duration in real time to optimize table turnover and improve seating efficiency." This is the closest thing to a table timer found for Runchise, and it is worded around reservations, not walk-in dine time. [official page] — [Runchise reservation](https://www.runchise.com/en/reservation)
- Open bill and close bill payment methods are supported for QR dine-in. [search snippet] — [Runchise QR dine-in](https://www.runchise.com/qr-dine-in)

**Opaper**
- "Manajemen Meja" is listed under Order Management: "Kelola tata letak meja dan optimalisasi kapasitas restoran" (manage table layout and optimise restaurant capacity). No status states, merge/move, or timer described on the page read. [official page] — [Opaper](https://opaper.app/)

**DealPOS**
- The DealPOS Indonesia homepage lists only retail business types (Fashion Retail, Electronic, Minimarket, Fresh Food, Building Material, Cosmetic) and describes itself as "Aplikasi Kasir multi outlet untuk bisnis retail". No table management, floor plan, open bill, QR order, or kitchen display appears. [official page] — [DealPOS](https://www.dealpos.co.id/)

**HashMicro (Hash F&B)**
- Lists "Atur Tata Letak Meja"; FAQ says "Tata letak meja bisa disesuaikan dengan kondisi lantai restoran". Table status and timer are not mentioned on the product page (first 100,000 characters read; last ~9,000 not read). [official page] — [HashMicro Hash F&B](https://www.hashmicro.com/id/hash-fnb-software)
- A HashMicro blog post describes table status as occupied/reserved/available, plus move/split of dine-in orders and split/merge bill. [search snippet, vendor blog] — [HashMicro blog](https://www.hashmicro.com/id/blog/aplikasi-pos-restoran-terbaik/)

**Accurate POS (found incidentally; not in the original list, relevant because it is the most explicit Indonesian page on table timing)**
- Statuses: "Pantau meja yang kosong, terisi, reserved, atau selesai secara real time". Layout: "Atur nomor meja, area (indoor/outdoor), dan jumlah kursi". Merge/move: "Memindahkan pesanan antar meja", "Menggabungkan beberapa meja". [official page] — [Accurate POS table management](https://accurate.id/pos/fitur/table-management/)
- Table duration: "Pantau lama penggunaan meja agar rotasi pelanggan lebih efisien, terutama saat jam sibuk." [official page] — [Accurate POS table management](https://accurate.id/pos/fitur/table-management/)

**Qashier (international, brief)**
- Custom floor plan with tables colour-coded by status such as empty, occupied, billing. The page found is the Malaysia site; Indonesian availability of the same feature was not confirmed. [search snippet] — [Qashier](https://qashier.com/my/?p=845)

### Inferences
- A cafe that already runs a restaurant-grade POS already holds a live per-table occupied/free state internally. where2go's merchant screen duplicates that state by hand unless it can read it from the POS.
- "Needs cleaning" as a distinct status was found only in Accurate POS's "selesai" (finished) state. It is not a commonly advertised state in this market.
- Time-limit alerts (e.g. "table 7 has been seated 2 hours") were not found advertised anywhere. Duration is tracked for turnover, not surfaced as an alert, on the pages read.

### Gaps
- No vendor documentation was read that defines the exact status list or the transitions between statuses. All of the above is marketing copy.
- Equip (equip.id): `https://www.equip.id/pos` returned 404 and searches returned nothing. No findings. Equip's relationship to HashMicro was not verified.
- Mekari POS F&B: the help center returned 403. Table features not confirmed.
- ESB: whether ESB POS shows a graphical floor plan or a table list, and whether it has a dine timer, is not stated on the pages read.
- Not researched: Eats365, Oracle Micros/Simphony, Odoo POS Restaurant.

## 2. QR order at table: is the order tied to the table, does it mark the table occupied, when is the table released

### Takeaway
QR-per-table ordering is widespread and ties the order to a table number, but no source read states that a scan or order flips the table to "occupied", or what event releases it. The only documented flow (StoreHub) shows that under pay-first the system has no reliable "guest has left" signal, and under pay-later the tab closes at payment.

### Cited Findings

**ESB Order**
- Customers scan a QR code to see the menu and order from their phone; no app install. ESB claims dine-in order processing up to 40% faster than manual and AI-based upselling, and that ESB Order raises SME order counts by up to 13.5%. These are marketing claims. [search snippet / official page] — [ESB casual dine-in](https://www.esb.id/en/solusi/casual-dine-in); [ESB POSLite](https://www.esb.id/en/solusi/produk/poslite)
- ESB POS integrates "free" with GoFood, GrabFood, ShopeeFood and ESB Order. [official page] — [ESB POS](https://esb.id/en/solusi/produk/pos)

**Runchise**
- Setup step: "Prepare the table QR codes" (implies one code per table). Payment by GoPay, OVO, QRIS, debit, credit. "Customers pay when they're done — no bill waiting, no staff running back and forth." Table occupied/release behaviour is not described. [official page] — [Runchise QR dine-in](https://www.runchise.com/en/qr-dine-in)
- QR ordering is connected directly to the POS; owner can enable QR order and choose order types such as dine-in or takeaway. [search snippet] — [Runchise QR dine-in](https://www.runchise.com/qr-dine-in)

**Opaper**
- Customers scan a QR code on the table to open the menu in the phone browser, no app download, and "Pelanggan kamu bisa bayar langsung dari meja". Payments are processed through Xendit. [official page] — [Opaper](https://opaper.app/)
- App Store listing: "QR Digital Menu (Order and Pay From the Table)"; orders print directly to the kitchen. [search snippet] — [Opaper on App Store](https://apps.apple.com/app/id1593079914)

**Mekari POS F&B**
- Generates table-based QR codes with three modes: order only, order + pay (requires QRIS enabled), and read-only menu; also an "order first, pay later" mode. [search snippet of official help doc; page itself returned 403] — [Mekari help center](https://help-center.mekari.com/hc/en-us/articles/57285313370905)

**StoreHub (international; the only flow read in documentation)**
- Each dine-in order must be tied to a table. Static QR = fixed sticker per table. Dynamic QR = temporary code printed from the POS when a guest sits down, with a validity window. [official help doc] — [StoreHub QR Order & Pay flow](https://care.storehub.com/en/articles/9680165-qr-order-pay-1-what-is-the-complete-order-flow)
- Pay Now (default): paid before the order reaches the kitchen. Pay Later: order goes to the kitchen, tab stays open, customer pays at the end in-app or at the counter. "Clear idle QR carts" (10 to 60 minutes) clears only unsent items. [official help doc] — [StoreHub QR Order & Pay flow](https://care.storehub.com/en/articles/9680165-qr-order-pay-1-what-is-the-complete-order-flow)
- The article does not describe table statuses or when a table is released, and does not say whether the feature is available in Indonesia. [official help doc] — [StoreHub QR Order & Pay flow](https://care.storehub.com/en/articles/9680165-qr-order-pay-1-what-is-the-complete-order-flow)

**Other QR-menu tools named by a vendor blog**
- Klikit (itself a vendor) lists Qr.id at Rp 200.000/month, Waitr at Rp 300.000/month, Moka at Rp 450.000/month, and Klikit on request. Promotional, published 4 June 2026, and these vendors were not verified independently. [third party, competitor blog] — [Klikit](https://klikit.io/id/learn/restaurant-qr-ordering-indonesia)

### Inferences
- With pay-at-table-first flows (Opaper, ESB Order, StoreHub Pay Now, Mekari order + pay), the POS learns when a party starts ordering but has no event for when they leave. A paid bill is not a freed table in a cafe where people stay for hours. This is the structural reason QR-order data is a weak source of "free tables".
- With pay-later/open-bill flows, the close of the bill is a usable "table released" signal, but only if staff close bills promptly and guests leave after paying.
- A dynamic per-seating QR (StoreHub) is the nearest thing found to a "seated" event; it requires staff action per party, the same cost as tapping a table tile.

### Gaps
- No source confirms for any product whether a table-QR order automatically sets the table to occupied, or whether release is on payment or manual close. Needs a vendor demo or help-center access.
- Opaper's QR feature page (`/en/fitur/qr-code`) and POS page returned 404.
- Qashier's QR table-management help collection returned 403.
- Zeals and the smaller QR-menu startups (Qoin, Ordero, Menuku, Dishserve, Titipku, Mau Order) were not researched.

## 3. Reports: table turnover, average dine time, peak hours by table, lost demand

### Takeaway
No product page read advertises a table turnover report, average dine time, per-table peak hours, or lost-demand (walk-away) reporting. Turnover appears only as a goal in marketing copy.

### Cited Findings
- Runchise names "turnaround optimization" as part of Table Management and says reservation duration tracking is "to optimize table turnover", but the features page lists no table turnover or dine-time report; reporting mentioned is "real-time P&L" and "consolidated reporting". [official page] — [Runchise all features](https://www.runchise.com/en/all-features); [Runchise reservation](https://www.runchise.com/en/reservation)
- ESB POS mentions "comprehensive transaction records" and automatic "transaction recapitulation"; no table turnover or dine time. The pricing page shows report counts by plan (under 30 on Basic, 100+ on Advanced/Enterprise) without naming them. [official page] — [ESB POS](https://esb.id/en/solusi/produk/pos); [ESB pricing](https://www.esb.id/en/pricing)
- HashMicro Hash F&B lists real-time sales dashboards and sales analytics; no table turnover report. [official page] — [HashMicro Hash F&B](https://www.hashmicro.com/id/hash-fnb-software)
- Accurate POS tracks how long a table has been in use "agar rotasi pelanggan lebih efisien", presented as a live view, not as a report. [official page] — [Accurate POS table management](https://accurate.id/pos/fitur/table-management/)
- Opaper mentions order analytics for QR orders. [search snippet] — [Opaper QR](https://www.opaper.app/en/features/qr-code)

### Inferences
- ESB's 100+ reports may well include a table report; the absence on marketing pages is not proof of absence in the product.
- Lost demand (people who came, saw it full, and left) cannot be measured by a POS at all, since no transaction is created. That is a measurement only a public-facing availability product can approach (views of a full cafe, searches that ended elsewhere).

### Gaps
- No report catalogue or help-center report list was read for any vendor. Whether table turnover / average dine time reports exist in ESB, Runchise, or Opaper is unknown.

## 4. Waitlist, queue, and reservation modules

### Takeaway
Reservation is now a built-in module in the main restaurant suites (ESB Book, Runchise Reservation, Opaper Reservasi, HashMicro), usually with deposits. A digital waitlist with "table is ready" notification was found explicitly in Runchise and Accurate POS only.

### Cited Findings
- ESB Book: "a restaurant reservation management system integrated with the ESB POS and ESB Order applications"; centralized dashboard; handles down payments; social media and WhatsApp positioned as entry points. Waitlist, floor plan, and Google are not mentioned. [official page] — [ESB Book](https://www.esb.id/en/solusi/produk/book)
- Runchise: "If a table is full, customers can join a digital waiting list and be notified when a table becomes available." "Manage walk-ins and reservation queues efficiently." "Allow guests to reserve tables instantly by scanning a QR code" (guest picks party size, seating preference, time). Deposits for full service; deposit plus VIP tagging for fine dining. [official page] — [Runchise reservation](https://www.runchise.com/en/reservation)
- Opaper: "Terima reservasi meja secara online dan kelola antrian reservasi dengan mudah." [official page] — [Opaper](https://opaper.app/)
- Opaper also markets #PesanDulu, a pre-order for dine-in, pickup and delivery "without having to queue". Seen only in a search snippet; not present on the homepage read. [search snippet] — [Opaper POS page](https://opaper.app/en/produk/point-of-sale)
- HashMicro Hash F&B: "Manajemen Reservasi" and "Tampilan Antrean Pelanggan" (customer queue display). [official page] — [HashMicro Hash F&B](https://www.hashmicro.com/id/hash-fnb-software)
- Accurate POS: "Kelola pelanggan di daftar waiting list dan reservasi lebih rapi." [official page] — [Accurate POS table management](https://accurate.id/pos/fitur/table-management/)
- Grab Dine Out: reservations in the Grab app, plus reservations arriving through Chope and its affiliates "termasuk Google Maps, TripAdvisor, dan lainnya"; automatic reminders said to reduce no-shows "hingga 67%"; upfront deposits; pre-ordered and prepaid menus ("Menu yang dipesan sebelumnya dan dibayar di muka"). [official page] — [Grab Dine Out merchant page](https://www.grab.com/id/merchant/dine-out/)

### Inferences
- These modules solve "will there be a table for me at 19:00" for full-service restaurants. None address the casual walk-in question "is there a free table right now", which is the where2go case. Student-area cafes in Yogyakarta mostly do not take reservations, so reservation modules are a weak substitute there.
- Runchise's waitlist notification is the closest existing merchant feature to where2go's value, but it starts only after the guest has already arrived and found the place full.

### Gaps
- Whether the Runchise waitlist can be joined remotely (before arriving) is not stated.
- Queue-only tools and smaller startups were not researched.

## 5. Pricing in IDR, target segment, client counts and known clients

### Takeaway
Published prices exist only for ESB (from Rp0, Advanced from Rp499.000/month) and partly for Opaper (conflicting figures); Runchise, HashMicro and Grab Dine Out are quote-only. Claimed footprints are large: ESB "30,000+ restaurants", Opaper "36,000+", Grab Dine Out "30,000+ merchants".

### Cited Findings

**ESB**
- ESB POS plans: Basic "starting from Rp0*" per month (terms apply); Advanced "starting from Rp499.000" per month (recommended); Enterprise custom. Basic has under 30 reports, simple ERP, and delivery integration with Grab and GoFood only; Advanced/Enterprise have 100+ reports and full ERP. [official page] — [ESB pricing](https://www.esb.id/en/pricing)
- POSLite, including Table Management and ESB Order: POSLite Rp99.000/month on a 1-year term, Rp116.000 on 6 months, Rp125.000 monthly; POSLite + Inventory Rp149.000 / Rp181.000 / Rp200.000. Seen only in a search snippet, which itself warned the column mapping was unclear; the page as fetched showed no pricing table. Treat as unconfirmed. [search snippet] — [ESB POSLite](https://www.esb.id/en/solusi/produk/poslite)
- ESB claims to be trusted by more than 30,000 restaurants. [search snippet] — [ESB](https://www.esb.id/en)
- API/webhook: the ESB POS page does not use the word API; it describes integrations with payment, online ordering and loyalty partners. [official page] — [ESB POS](https://esb.id/en/solusi/produk/pos)

**Runchise**
- No prices published. "Priced per outlet, not per user. Add staff freely." Free implementation and training, "Zero upfront cost". Positioned for multi-outlet and franchise operators. [official page] — [Runchise all features](https://www.runchise.com/en/all-features)
- Named logos: Angke, Kafe Betawi, Domino's, EATPIZZA, Pizza Pizza Pizza, Teazzi, Macanria, TIANLALA, Esteh. No client count stated. [official page] — [Runchise all features](https://www.runchise.com/en/all-features)
- API/webhook: none mentioned; official GrabFood, ShopeeFood, GoFood aggregator integration. [official page] — [Runchise all features](https://www.runchise.com/en/all-features)

**Opaper**
- Homepage FAQ: "Subskripsi dimulai dari Rp3juta,-" (period not stated). A Marka Coffee testimonial on the same page cites "IDR500K" one-time payment with no monthly fees. The POS page, per search snippet, says "FREE monthly subscription, unlimited devices, unlimited users". These three statements conflict and the page does not reconcile them. [official page + search snippet] — [Opaper](https://opaper.app/); [Opaper POS page](https://opaper.app/en/produk/point-of-sale)
- Self-kiosk hardware: Kiosk Display 16" Rp 10.999.000, described as lifetime system with no monthly fee. [search snippet] — [Opaper POS page](https://opaper.app/en/produk/point-of-sale)
- "Dipercaya 36,000+ Restoran, Cafe, Waralaba, Food Court"; 100K+ app downloads. Named: House of Etera, Embun Senja / Cerita Asmara, Blue Turtle Chicken and Coffee, Marka Coffee, Evartra Sly Bar, HD Antapani Foodhall; logos include K3mart, Jollytime, Sura, Botolkaca, Muyen, Menantea, Ngikan, Pokigo. Segment is independent cafes, small chains, and food courts. [official page] — [Opaper](https://opaper.app/)
- API/webhook: not mentioned. [official page] — [Opaper](https://opaper.app/)

**DealPOS**
- Retail-focused. "1500+ brand di 10 negara menggunakan Aplikasi Inventory kami". No prices on the homepage. Open API at developer.dealpos.com ("Bangun integrasi menggunakan Open API kami"). [official page] — [DealPOS](https://www.dealpos.co.id/)

**HashMicro Hash F&B**
- No prices shown. Logos include McDonald's and BanBan (with an F&B case study, "BanBan Bertumbuh & Kelola Cabang Lebih Efisien dengan Hash F&B"). Enterprise/chain segment. "HashMicro dibangun dengan arsitektur open API." [official page] — [HashMicro Hash F&B](https://www.hashmicro.com/id/hash-fnb-software)

**Grab Dine Out**
- More than 30,000 merchants have joined since the 2024 launch; "Pesan Meja" reservations at more than 2,000 restaurants in Jakarta and Bali, with no additional booking fee for diners; user transactions up "hingga 20 kali lipat" by end of 2024. Published 4 July 2025 and labelled sponsored content paid by Grab. [third party, sponsored] — [Popmama](https://www.popmama.com/life/home-and-living/grab-luncurkan-fitur-pesan-meja-02-4rhw2-349cdf/amp)
- Grab acquired Chope in mid-2024. [third party, sponsored] — [Popmama](https://www.popmama.com/life/home-and-living/grab-luncurkan-fitur-pesan-meja-02-4rhw2-349cdf/amp)
- Eligibility: any business with one or more restaurants where consumers can dine in. Commission and fees are not on the merchant page. [official page] — [Grab Dine Out merchant page](https://www.grab.com/id/merchant/dine-out/)

**GoDineIn (Gojek)**
- Launched July 2024 as dine-in vouchers with up to 25% off at selected restaurants, sold only inside the GoDineIn service in the Gojek app; initially Jakarta only, with restaurants such as Cut & Grill, Common Grounds, Kintaro Sushi. [third party press, via search snippet] — [Selular.ID](https://selular.id/2024/07/gojek-luncurkan-godinein-diskon-hingga-25-persen/); [Infobank](https://infobanknews.com/gojek-luncurkan-godinein-voucher-diskon-hingga-25-persen-makan-di-resto/)
- Still running in October 2025: a RamenYa! voucher worth Rp150.000 sold at Rp135.000, dine-in only at listed outlets, one transaction per voucher. [third party press, via search snippet] — [Kontan MomsMoney](https://momsmoney.kontan.co.id/news/promo-ramenya-via-gojek-sampai-14-oktober-pakai-voucher-lebih-hemat-cek-lokasinya)
- The merchant app formerly called GoBiz was relaunched as GoFood Merchant. Source date unclear (2021 to 2024 range), flag as possibly outdated. [third party press, via search snippet] — [Kontan MomsMoney](https://momsmoney.kontan.co.id/news/dukung-pelaku-umkm-gojek-hadirkan-aplikasi-gofood-merchant)

**ShopeeFood**
- No dine-in-specific voucher product was found. The nearest is ShopeeFood Deals: vouchers bought in the Shopee app / ShopeePay and used directly at the merchant's outlet (example: HokBen voucher for Rp1, July 2025). Whether redemption covers dine-in is not stated. [third party press, via search snippet] — [Okezone](https://economy.okezone.com/read/2025/07/17/11/3156032/promo-shopeefood-deals-datang-lagi-mulai-dari-rp1-di-hokben-sampai-diskon-merchant-lainnya?page=all); [Medcom](https://www.medcom.id/ekonomi/bisnis/PNgAVj4k-hanya-satu-hari-makan-hokben-hemat-cuma-rp1-dengan-voucher-shopeefood-deals)

### Inferences
- Entry price for a POS with table management and QR order is low (ESB from Rp0; POSLite possibly around Rp99.000 to Rp125.000/month if the snippet is right). Price is not what keeps a small Yogyakarta cafe from having table status; where2go cannot position its merchant tool as the cheap alternative to a POS.
- The client-count claims (30,000+, 36,000+) are self-reported and undated, and count outlets or sign-ups in ways the vendors do not define. Usable as an order of magnitude only.
- The super-apps' dine-in products launched in Jakarta (and Bali for Grab reservations). No source read places GoDineIn or Grab Pesan Meja in Yogyakarta.

### Gaps
- Runchise, HashMicro, Equip, ESB Book and ESB Order pricing: not published or not found.
- Opaper's real price: the three figures conflict; needs a sales quote.
- Grab Dine Out commission rate and current city list: not found.
- GoDineIn coverage in 2026 and whether it reached Yogyakarta: not found.
- Funding and client-count figures from DailySocial, Tech in Asia, Katadata or Kontan were not retrieved for ESB, Runchise or Opaper.
- International POS pricing in IDR (StoreHub, Qashier, Eats365, Oracle Simphony, Odoo): not researched.

## 6. Is table availability shown to customers or the public, or strictly internal

### Takeaway
No product found publishes a live free-table count to the public. Table state is internal to staff screens; what reaches consumers is reservation slots (Grab Pesan Meja / Chope, Runchise QR booking, ESB Book, Opaper) and dine-in vouchers (GoDineIn, Grab Dine Out Deals, ShopeeFood Deals). This is an absence of evidence across the pages read, not a confirmed "nobody does it".

### Cited Findings
- Runchise's status view is described for staff ("Know at a glance which tables are available and which are fully booked"). The page does not say guests can see open tables before booking; the guest-facing flow is QR self-booking by party size, seating preference and time, and a waitlist notification "when a table becomes available". [official page] — [Runchise reservation](https://www.runchise.com/en/reservation)
- ESB Book's page contains no statement about customers viewing table availability. [official page] — [ESB Book](https://www.esb.id/en/solusi/produk/book)
- Grab's merchant page says customers can find the restaurant and reserve in the Grab app, that nearby stores are shown first, and that Grab-verified dine-out ratings and reviews are shown. It does not mention showing table availability or a table QR feature. [official page] — [Grab Dine Out merchant page](https://www.grab.com/id/merchant/dine-out/)
- The Pesan Meja flow is: open Dine Out, Pesan Meja, pick a restaurant, enter date, time and guest count, confirm, receive an email confirmation. The article does not say live table availability is shown. It describes Chope as a real-time reservation platform. [third party, sponsored, July 2025] — [Popmama](https://www.popmama.com/life/home-and-living/grab-luncurkan-fitur-pesan-meja-02-4rhw2-349cdf/amp)
- Grab's in-store merchant page covers GrabPay QR as a payment method, not table ordering; no Grab-published page on per-table QR ordering was found. [search snippet] — [Grab in-store solutions](https://www.grab.com/id/merchant/in-store-solutions-2/)
- GoDineIn is a voucher product; nothing in the coverage describes tables, reservations or availability. [third party press, via search snippet] — [Selular.ID](https://selular.id/2024/07/gojek-luncurkan-godinein-diskon-hingga-25-persen/)
- HashMicro lists a "Tampilan Antrean Pelanggan" (customer queue display), which is an on-premise display, not public availability. [official page] — [HashMicro Hash F&B](https://www.hashmicro.com/id/hash-fnb-software)

### Inferences
- The gap where2go targets is real on the evidence gathered: POS vendors hold live table state but keep it on the staff side, and the consumer apps deal in reservations and discounts, not walk-in availability.
- Reservation slot availability (Chope-style) is a neighbouring signal. If Grab extends Pesan Meja beyond Jakarta and Bali and into casual cafes, it would be the nearest competitor on the consumer side, but it answers a booking question, not "how many tables are free right now".
- The data where2go wants already exists inside these POS systems for cafes that use them. The route to accurate public counts without staff double-entry is a POS integration (DealPOS and HashMicro state an open API; ESB, Runchise and Opaper do not mention one on the pages read), with the caveat from section 2 that QR-order events do not reliably mark a table as freed.

### Gaps
- Not checked hands-on: whether the Grab or Chope consumer app shows "fully booked" slots for a given time, which would be a coarse public availability signal.
- Not checked: whether ESB Order's consumer web app or Opaper's online store page shows any "tables available" indicator.
- Any Indonesian startup doing public live seat or table availability specifically (a direct competitor to where2go) was not searched for; this task covered POS and QR-order vendors only.
- GoFood pickup and any GoFood-native dine-in ordering (as opposed to GoDineIn vouchers) were not confirmed from an official Gojek page; searches returned nothing current.
