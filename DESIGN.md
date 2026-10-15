---
version: alpha
name: where2go
description: A phone-first live board of cafe seat counts. White canvas, near-black ink and actions, hairline-separated rows, Cal Sans table numerals over Inter UI, and a single dark footer. The working palette is monochrome; red appears only for errors.

colors:
  primary: "#111111"
  primary-active: "#242424"
  primary-disabled: "#e5e7eb"
  ink: "#111111"
  body: "#374151"
  muted: "#6b7280"
  hairline: "#e5e7eb"
  canvas: "#ffffff"
  surface-soft: "#f8f9fa"
  surface-card: "#f5f5f5"
  surface-dark: "#101010"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#a1a1aa"
  error: "#ef4444"
  error-text: "#b91c1c"
  scrim: "rgba(17, 17, 17, 0.5)"

typography:
  display-xl:
    fontFamily: "Cal Sans, Inter, sans-serif"
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -2px
    fontFeature: "tnum"
  display-md:
    fontFamily: "Cal Sans, Inter, sans-serif"
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -1px
    fontFeature: "tnum"
  display-sm:
    fontFamily: "Cal Sans, Inter, sans-serif"
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px
  wordmark:
    fontFamily: "Cal Sans, Inter, sans-serif"
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.5px
  title-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  md: 8px
  lg: 12px
  pill: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 56px
    padding: 0 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 0 20px
    height: 44px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 0 20px
    height: 44px
  button-secondary-active:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    height: 44px
  button-icon-circular:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: 36px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 0 14px
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  text-input-invalid:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  nav-pill-group:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 4px
    height: 44px
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 0 14px
    height: 36px
  category-tab-active:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
  board-head:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    padding: 8px 16px
  occupancy-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    padding: 8px 16px
    height: 64px
  occupancy-row-changed:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
  occupancy-row-dim:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
  seat-count:
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    width: 96px
  seat-panel:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.lg}"
    padding: 24px
  table-tile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 64px
  table-tile-taken:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  callout:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  empty-state:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    padding: 48px 16px
  notice:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  notice-error:
    textColor: "{colors.error-text}"
    typography: "{typography.body-sm}"
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark-soft}"
    typography: "{typography.body-sm}"
    padding: 32px 16px
---

# Design System: where2go

## Overview

**Creative North Star: "The Live Board"**

where2go reads like a departures board for cafe seats. Every line leads with the number of seats free, set large in Cal Sans with tabular figures, and everything else about the cafe sits beside it in quiet Inter. The canvas is white, ink and actions are near-black, rows are separated by hairlines, and nothing on a working screen is chromatic: how full a cafe is, is said with numbers and words, not colour.

The system is built for two people in a hurry: someone on the street choosing where to go, and someone behind a counter with seconds to spare. Density is compact on the board (eight rows in a 390px-wide first viewport) and generous on the merchant screen, where the two step buttons are the largest things after the count. Depth is flat. Tone changes, not shadows, separate the column header, the sort switch, the merchant panel, and a row that has just changed. The page always closes on the one dark surface, the footer.

Motion exists to explain a change, never to decorate. When a cafe's count changes, its row slides to its new rank and stays marked with its previous value, so the reader sees what moved and from where.

**Key Characteristics:**
- The free-seat numeral is the first thing read on every line; the cafe name is second.
- White canvas, near-black ink and actions, hairline rules, one dark footer.
- Cal Sans for the wordmark, seat numerals, and page h1 only; Inter everywhere else.
- No status colours: occupancy is carried by the numeral, its "/total", and words ("Penuh", "Tutup").
- Every count shows its age; an open cafe whose tables nobody confirmed in 30 minutes is left off the board.
- Interface copy is Indonesian, neutral in voice; table and seat counts never change meaning between views.
- Flat surfaces; the single shadow in the system sits under the active sort tab.
- Every control has a 44px hit area; press states only, no hover styling.

## Colors

A monochrome working palette. The only chromatic colour is red, reserved for errors.

### Primary
- **Near-Black Ink** (`primary`, `ink`, #111111): Primary buttons, all headings and seat numerals, focus outlines, the text selection fill, and the focused input border. `primary-active` (#242424) is the pressed state of the primary button.

### Secondary
- **Error Red** (`error`, #ef4444): The border and 1px ring of an invalid input. Error copy uses `error-text` (#b91c1c) for contrast.
- **Error Text Red** (`error-text`, #b91c1c): Error copy only: field errors, the offline notice, a failed save. It is the darker red because `error` is too light to carry text on white.

### Neutral
- **Canvas White** (`canvas`, `on-primary`, `on-dark`, #ffffff): Page floor, row background, input and secondary-button fill, active sort tab, and text on near-black surfaces.
- **Body Slate** (`body`, #374151): Running text: page sub-lines, notices, empty-state copy, the merchant status line.
- **Muted Slate** (`muted`, #6b7280): Secondary text: column header labels, distance and age, the "/total" beside a seat numeral, placeholders, inactive sort tab, disabled button labels. A dimmed table numeral (full or closed cafe) also takes this colour.
- **Hairline** (`hairline`, `primary-disabled`, #e5e7eb): 1px rules between board rows, input and secondary-button borders, the icon-button ring, and the fill of any disabled button.
- **Soft Surface** (`surface-soft`, #f8f9fa): Column header strip, sort-switch track, pressed state of secondary and icon buttons.
- **Card Surface** (`surface-card`, #f5f5f5): The merchant seat panel, and the wash on a board row whose count just changed.
- **Footer Black** (`surface-dark`, #101010) with **Footer Gray** text (`on-dark-soft`, #a1a1aa): The footer, the only dark surface.

### Named Rules
**The No-Status-Colour Rule.** Occupancy is never colour-coded. A traffic-light dot was built and removed: it repeated what "5/8" already says, its thresholds flipped on one table, and it contradicted a board sorted by absolute count. Red is for errors only.

**The Words-and-Numbers Rule.** Every state a reader needs is written: the free-table numeral with its total, "Penuh" for a full cafe, "Tutup · buka HH.MM" for a closed one, and the level word ("Lega", "Mulai ramai", "Hampir penuh", "Penuh") on the merchant status line. Muted ink reinforces full and closed; it never carries them alone.

**The One Dark Surface Rule.** The footer is the only near-black surface. Above it, everything is white or a light gray tone. The one exception is a pressed control: the primary button and a taken table tile fill with `primary` ink.

## Typography

**Display Font:** Cal Sans (variable, weights 400 to 700, SIL Open Font License, self-hosted at `app/fonts/CalSansVF.woff2`; falls back to Inter)
**Body Font:** Inter (with -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)

**Character:** Cal Sans gives the numbers and the name of the product a confident, slightly condensed geometric voice; Inter keeps every label, control, and sentence plain and legible at small sizes. The scale is fixed in rem and does not fluidly resize.

### Hierarchy
- **Display XL** (Cal Sans 600, 4rem, line-height 1.05, -2px, tabular figures): The seat count on the merchant screen.
- **Display MD** (Cal Sans 600, 2.25rem, line-height 1, -1px, tabular figures): The seat numeral that leads every board row.
- **Display SM** (Cal Sans 600, 1.75rem, line-height 1.2, -0.5px, balanced wrap): Page h1 on merchant screens (cafe name, "Update your cafe's seats").
- **Wordmark** (Cal Sans 600, 1.375rem, line-height 1, -0.5px): "where2go" in the top nav and footer.
- **Title MD** (Inter 600, 1.125rem, line-height 1.4): Empty-state heading.
- **Title SM** (Inter 600, 1rem, line-height 1.4): Cafe name on a board row; also the size of the two step-button labels.
- **Body MD** (Inter 400, 1rem, line-height 1.5): Default text and text-input value. Inputs stay at 1rem so phones do not zoom on focus.
- **Body SM** (Inter 400, 0.875rem, line-height 1.5): Notices, field errors, merchant status and foot lines, footer copy (capped at 44ch).
- **Label** (Inter 600, 0.875rem, line-height 1.4): Form field labels.
- **Button** (Inter 600, 0.875rem, line-height 1): Button and text-link-button labels.
- **Nav Link** (Inter 500, 0.875rem, line-height 1.4): Top-nav link and sort tabs.
- **Caption** (Inter 500, 0.8125rem, line-height 1.4): Column header and the "/total" beside a numeral. Row meta (distance, age) and the location label use the same size at weight 400.

### Named Rules
**The Numeral Rule.** Cal Sans is for the wordmark, seat numerals, and page h1. Nothing else. Seat numerals always use tabular figures so a changing count does not shift the columns.

**The Weight 600 Rule.** Cal Sans is always weight 600 with negative tracking (-0.5px to -2px, growing with size). Never 700, never untracked.

## Layout

A single centred column. The finder column is capped at 720px and the merchant column at 480px; both run edge to edge on a phone with 16px side padding. The body is a full-height flex column so the footer sits at the bottom of short pages. There is one breakpoint, 768px, where the top nav grows from 56px to 64px and the finder controls gain 16px of top padding. Nothing reflows into multiple columns.

Spacing is a 4px-based scale (4, 8, 12, 16, 24, 32, 48). Controls inside a group sit 12px apart; groups on the merchant screen sit 24px apart; the footer is pushed 48px below content.

The board is a three-column grid shared by the column header and every row: a 96px table-numeral column, a flexible cafe column that truncates the name with an ellipsis, and a trailing directions button, with 12px gaps. Rows are at least 64px tall with 8px block padding, each topped by a hairline; the last row also closes with one. The column header and rows are full width of the column, not inset cards.

On the merchant screen the table tiles sit in an auto-fill grid (124px minimum per tile, 8px gap), so a phone shows two columns and wider screens three; the quick-set pair below is two equal columns.

### Named Rules
**The 44 Rule.** Every interactive control has a hit area of at least 44px. Buttons and inputs are 44px tall. Where the visible shape is smaller (36px sort tabs, the 36px directions disc), the hit area is extended to 44px around it.

## Elevation & Depth

Flat. Depth is carried by tone: `surface-soft` for the column header and sort track, `surface-card` for the merchant panel and a just-changed row, `surface-dark` for the footer, and 1px hairlines everywhere else.

### Shadow Vocabulary
- **Subtle** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)`): Under the active sort tab only, to lift the white pill off its gray track.

Focus is drawn, not lifted: a 2px ink outline offset 2px on every focusable element (white on the footer). Text inputs instead switch their border to ink and add a 1px ink ring; an invalid input does the same in `error` and keeps it while focused.

### Named Rules
**The Flat Rule.** One shadow exists in the system and it belongs to the active sort tab. Rows, panels, buttons, and inputs never cast one.

## Shapes

Soft, small radii in three steps. Buttons and inputs are gently rounded (8px). The merchant seat panel is the one rounded container (12px). Pills (9999px) are used for the sort switch and its tabs, and the directions disc. Board rows and the column header are square-edged and divided by 1px hairlines. Borders are always 1px `hairline`, except the unconfirmed dot's 2px muted ring.

Icons are inline SVG line drawings in `currentColor` with round caps: a 16px arrow at 1.5px stroke for directions, 18px plus and minus at 2px stroke on the step buttons.

## Components

Controls are plain and tactile: solid near-black or hairline-outlined white, fixed 44px height, and a visible press state.

### Top Navigation
- **Style:** 56px bar (64px from 768px) on canvas, no border or shadow, same max width as the page column. Wordmark at left links home; one Nav Link text link at right ("Cafe staff" on the finder, "Find a cafe" on merchant screens). No menu, no hamburger.

### Buttons
- **Shape:** Gently rounded (8px), 44px tall, 20px side padding, Button type, 8px gap between icon and label, never wraps.
- **Primary:** Near-black fill with white label. Pressed: `primary-active`.
- **Secondary:** Canvas fill, 1px hairline border, ink label. Pressed: `surface-soft`.
- **Disabled (any variant):** `primary-disabled` fill, no border, muted label, not-allowed cursor.
- **Text link:** No fill or border, underlined ink label (3px offset), 44px minimum height. Used for "Use my location" and "Switch cafe".
- **Icon circular:** A 36px white disc with a hairline ring and a 16px ink icon, centred in a 44px hit area. Pressed: the disc turns `surface-soft`. Used for directions on each board row; always carries an `aria-label`.
- **Hover:** None. Only pressed, disabled, and focus states are styled.

### Inputs / Fields
- **Style:** 44px tall, canvas fill, 1px hairline border, 8px radius, 14px side padding, Body MD text, muted placeholder, ink caret. A Label sits 8px above; the search field's label is screen-reader-only.
- **Focus:** Border turns ink plus a 1px ink ring; no outline.
- **Invalid:** Border and ring turn `error`, and a Body SM message in `error-text` sits 8px below, linked with `aria-describedby`.

### Sort Switch and Party Filter (nav-pill-group, category-tab)
- **Style:** A `surface-soft` pill track with 4px padding holding pill tabs, 36px tall with 14px side padding, Nav Link type, muted label. The track makes the group 44px tall and each tab's hit area reaches that edge. The same component serves the sort switch ("Paling lega", "Terdekat") and the party filter ("Semua", "1–2", "3–4", "5+"), which sits on its own row with a Body SM question ("Butuh buat berapa orang?") opposite; on a phone the question wraps above the pills.
- **Active:** Canvas fill, ink label, the Subtle shadow. State is exposed with `aria-pressed`.

### Board (board-head, occupancy-row, seat-count)
- **Column header:** A `surface-soft` strip in muted Caption type ("Meja kosong", "Kafe"), one line, with a 12px-tall table glyph before the first label so the numerals below read as tables, hidden from assistive tech; the list itself is labelled.
- **Row link:** The cafe name is a link to the cafe detail page and its hit area covers the whole row; the directions disc sits above it and keeps its own target. Pressing the row washes it to `surface-soft`.
- **Row:** Free-table numeral in Display MD with a muted Caption "/total tables" on the same baseline; then the cafe name in Title SM (truncated) over a muted meta line of three facts (distance or area, estimated free seats as "±N kursi", age of the count); then the directions disc. Each fact stays on one line and carries a trailing middle dot, so a long meta line breaks between facts, never inside one. With a party chosen, the middle fact reads "N meja cocok" (tables that party fits) in place of the seat estimate; the numeral stays free tables.
- **Dim and closed:** A full cafe's numeral drops to muted so room stands out. A closed cafe sits below every open one with an en dash for a numeral, a muted name, and "Tutup · buka HH.MM"; it never shows a count. An open cafe whose tables were not confirmed in 30 minutes is not rendered at all.
- **Changed (signature):** When a polled count differs from the last one, the row slides to its new rank (450ms, cubic-bezier(0.16, 1, 0.3, 1)), its background washes to `surface-card` (400ms, same curve), and the meta line shrinks to the place and the event in ink at weight 600: "+N meja kosong" or "N meja terisi". The mark clears after 30 seconds. Under `prefers-reduced-motion` the slide and the fade are both off; the wash and the event text still appear.

### Seat Panel (seat-panel, table-tile, callout)
- **Container:** `surface-card` fill, 12px radius, 24px padding, no border or shadow.
- **Count:** Display XL numeral of free tables with "dari N meja kosong" in body colour on its baseline; announced politely when it changes.
- **Status line:** Level word, the seat estimate ("±N kursi"), and "menyimpan…" or "diperbarui {age}" in Body SM, separated by middle dots. A failed save replaces the line with `error-text` copy and the tiles roll back.
- **Tile zones:** Tiles are grouped under the zone they are in ("Lantai 1", "Teras"), in the order staff number them. Each group has a Label-type heading with the zone name left and its state right in body colour ("2 kosong · 1 terisi", "3 kosong", "Penuh"), 24px above the previous group and 8px above its tiles.
- **Table tile:** One toggle button per table, at least 64px tall, 8px radius, 12px padding. Label type for "Meja N" with a 24px-tall table glyph opposite, over a Caption line that leads with the state word at weight 600 ("**Kosong** · 2 kursi", "**Terisi** · 4 kursi"). Free is an empty slot: no fill (the panel shows through), a 1px dashed muted outline, ink name and state word, body-colour size; it is never faded, because free tiles are the ones staff tap most. Taken (`aria-pressed`) fills with `primary` behind a solid outline, text turns `on-primary` and the size `on-dark-soft`. Pressing darkens either state one step. The glyph is a top-down table with one chair mark per seat along its long sides, drawn in `currentColor` at a 1.5px round stroke; it is decorative, the size is always written beside it.
- **Undo:** A tile tap saves at once. For 6 seconds afterwards the status line reads "Meja N ditandai terisi." with a text-link "Urungkan" opposite, then returns to the normal status. A 2px ink line under the row drains from full width to nothing over those 6 seconds (linear, restarted by a new tap) to show how long the link stays; under `prefers-reduced-motion` it stays full and disappears with the link. The status line is always 44px tall, so the tiles never shift when it appears. Only the last tap can be undone.
- **Quick set:** Two equal 44px secondary buttons, "Tandai penuh" and "Tandai semua kosong", each disabled when already true. They change every table, so they are the one place that asks first, in a confirm dialog.
- **Confirm dialog:** The only modal in the product, reserved for an action that changes every table at once. A native `dialog`: up to 360px wide with 16px side margins, canvas fill, hairline border, 12px radius, 24px padding, over a `scrim` backdrop. Title MD question naming the count ("Tandai semua 8 meja terisi?"), a Body SM line stating the consequence for customers, then "Batal" (secondary) and the action (primary) as two equal buttons. Escape, the backdrop, and "Batal" all cancel.
- **Callout:** Sits above the panel when the merchant must know something first: the cafe is hidden from customers (unconfirmed for 30 minutes) or is outside opening hours. Canvas fill, 1px ink border, 12px radius, 16px padding, Body SM text with an ink lead sentence at weight 600. The hidden variant carries a full-width primary button, "Masih benar", that confirms the layout without changing a table.

### Cafe Detail (detail-section, fact-list, plain-list, placeholder)
- **Head:** Page h1 in Display SM, a Body MD line of distance or area and open status, then one primary button, "Petunjuk arah".
- **Sections:** Stacked 32px apart, each with a Title MD heading 12px above its content. No cards; sections are separated by space only.
- **Count:** Display XL free-table numeral with "dari N meja · ±N kursi" on its baseline and a muted Body SM line "Dikonfirmasi staf {age}." below. When the cafe is closed or unconfirmed, a notice replaces the count and both fact lists.
- **Fact list:** Label left in Body SM body colour, value right-aligned in Body SM at weight 500, a hairline above every row and below the last. On the detail page one list shows at a time, chosen with the pill switch ("Per ukuran meja", "Per area") 24px above it; size is the default. Each size row leads with the table glyph for that size in a fixed 28px slot and states free and taken side by side ("2 kosong · 1 terisi", "3 kosong", "Penuh"), never "N dari N". "Per area" is an accordion, one hairline-ruled row per zone, all closed at first. Closed, a row is 52px tall with the zone name in Title SM, its free-table total ("4 meja kosong", or a muted "Penuh") right-aligned, and a chevron. Open, the total hides, the chevron turns over (200ms), and the body shows that zone's floor plan above its size list. A "Penuh" value drops to muted.
- **Plain list:** Unmarked Body MD items, 8px apart, one column on a phone and two from 768px. No bullets, icons, or chips.
- **Demo note:** A Body SM sentence in ink inside a 1px ink outline, 8px radius, 12px by 16px padding, between the head and the first section of a cafe page. It states what on the page is simulated or example data. Not dismissible.
- **Placeholder:** Reserved space for content that does not exist yet (a floor plan inside each open zone, photos). `surface-soft` fill, 1px dashed muted border, 12px radius, centred Body SM sentence that says what is missing. A free table tile also uses a dashed outline, in the same sense of "nothing here"; the two differ by fill (placeholder soft, tile none) and content (a sentence versus a full tile). Photos reserve 16:9 for the storefront and 4:3 per zone. Never filled with stock imagery.

### Empty State and Notices
- **Empty state:** 48px block padding under a hairline, left-aligned. Title MD heading in ink, Body MD sentence in body colour, and when there is a way out, a secondary button 16px below. No illustration or icon.
- **Notice:** Body SM text in body colour, 12px below the controls, in a polite live region. The error variant (offline, failed save) uses `error-text`. No box, border, or icon.

### Footer
- **Style:** `surface-dark` band, 48px below content, with 32px by 16px inner padding at the page column's width. White wordmark and a Body SM line in `on-dark-soft`, wrapping to stack on narrow screens. Focus outlines here are white.

## Do's and Don'ts

### Do:
- **Do** lead every list line with the free-seat numeral in Cal Sans 600, 2.25rem, tabular figures.
- **Do** show the age of every count next to it, and leave an open cafe off the board once its tables have gone 30 minutes unconfirmed.
- **Do** tell the merchant, above everything else on their screen, when their cafe is hidden or closed.
- **Do** state occupancy in numbers and words; reach for muted ink, not a hue, to set full and closed cafes back.
- **Do** give every control a 44px hit area, extending it invisibly when the visible shape is 36px.
- **Do** separate with 1px `hairline` rules and tone steps (`surface-soft`, `surface-card`) before reaching for a border box or shadow.
- **Do** keep muted text on `canvas` or `surface-soft`, where it clears 4.5:1; use body colour or ink on `surface-card`.
- **Do** write error copy in `error-text` and keep `error` for the invalid-input border.
- **Do** keep text inputs at 1rem and buttons at 44px tall on every screen.
- **Do** honour `prefers-reduced-motion` by removing the rank slide and the background fade while keeping the changed mark.
- **Do** end every page with the dark footer.

### Don't:
- **Don't** use Cal Sans for body copy, labels, buttons, cafe names, or empty-state headings; it is for the wordmark, seat numerals, and page h1.
- **Don't** set Cal Sans at any weight other than 600 or without negative tracking.
- **Don't** colour-code occupancy with green, amber, or red dots, fills, badges, or text; red is for errors, and error copy uses `error-text`.
- **Don't** add hover styling; controls change on press, focus, and disabled only.
- **Don't** add shadows to rows, panels, buttons, or inputs; the active sort tab owns the only one.
- **Don't** put a dark surface anywhere but the footer; a taken table tile and the primary button are pressed controls, not surfaces.
- **Don't** let the seat numeral change meaning when a filter is on; filters change which cafes show and what the meta line says.
- **Don't** turn board rows into bordered or rounded cards; the board is hairline-ruled lines.
- **Don't** animate anything that is not explaining a data change.
- **Don't** repeat an icon down the board rows; the table glyph appears once in the column header and once per merchant tile, where its shape differs per table.
