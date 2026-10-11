---
version: alpha
name: where2go
description: A phone-first live board of cafe seat counts. White canvas, near-black ink and actions, hairline-separated rows, Cal Sans seat numerals over Inter UI, and a single dark footer. Colour is spent only on the occupancy signal.

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
  success: "#10b981"
  warning: "#f59e0b"
  error: "#ef4444"
  error-text: "#b91c1c"

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
    width: 76px
  status-dot-roomy:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.pill}"
    size: 10px
  status-dot-filling:
    backgroundColor: "{colors.warning}"
    rounded: "{rounded.pill}"
    size: 10px
  status-dot-tight-full:
    backgroundColor: "{colors.error}"
    rounded: "{rounded.pill}"
    size: 10px
  status-dot-unknown:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    size: 10px
  seat-panel:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.lg}"
    padding: 24px
  stepper:
    typography: "{typography.title-sm}"
    rounded: "{rounded.md}"
    padding: 0 12px
    height: 72px
  exact-set:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
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

where2go reads like a departures board for cafe seats. Every line leads with the number of seats free, set large in Cal Sans with tabular figures, and everything else about the cafe sits beside it in quiet Inter. The canvas is white, ink and actions are near-black, rows are separated by hairlines, and the only chromatic colour on a screen is the small dot that says how full a cafe is.

The system is built for two people in a hurry: someone on the street choosing where to go, and someone behind a counter with seconds to spare. Density is compact on the board (eight rows in a 390px-wide first viewport) and generous on the merchant screen, where the two step buttons are the largest things after the count. Depth is flat. Tone changes, not shadows, separate the column header, the sort switch, the merchant panel, and a row that has just changed. The page always closes on the one dark surface, the footer.

Motion exists to explain a change, never to decorate. When a cafe's count changes, its row slides to its new rank and stays marked with its previous value, so the reader sees what moved and from where.

**Key Characteristics:**
- The free-seat numeral is the first thing read on every line; the cafe name is second.
- White canvas, near-black ink and actions, hairline rules, one dark footer.
- Cal Sans for the wordmark, seat numerals, and page h1 only; Inter everywhere else.
- Status hues live in a 10px dot and are always backed by a numeral and a text label.
- Every count shows its age; an unconfirmed count goes muted with a hollow ring.
- Flat surfaces; the single shadow in the system sits under the active sort tab.
- Every control has a 44px hit area; press states only, no hover styling.

## Colors

A monochrome working palette with three status hues that are rationed to the occupancy signal.

### Primary
- **Near-Black Ink** (`primary`, `ink`, #111111): Primary buttons, all headings and seat numerals, focus outlines, the text selection fill, and the focused input border. `primary-active` (#242424) is the pressed state of the primary button.

### Secondary
- **Room Green** (`success`, #10b981): Occupancy dot when 40% or more of seats are free ("Plenty of room").
- **Filling Amber** (`warning`, #f59e0b): Occupancy dot when 15% to under 40% of seats are free ("Filling up").
- **Full Red** (`error`, #ef4444): Occupancy dot when under 15% of seats are free or none are ("Almost full", "Full"). Also the border and 1px ring of an invalid input.
- **Error Text Red** (`error-text`, #b91c1c): Error copy only: field errors, the offline notice, a failed save. It is the darker red because `error` is too light to carry text on white.

### Neutral
- **Canvas White** (`canvas`, `on-primary`, `on-dark`, #ffffff): Page floor, row background, input and secondary-button fill, active sort tab, and text on near-black surfaces.
- **Body Slate** (`body`, #374151): Running text: page sub-lines, notices, empty-state copy, the merchant status line.
- **Muted Slate** (`muted`, #6b7280): Secondary text: column header labels, distance and age, the "/total" beside a seat numeral, placeholders, inactive sort tab, disabled button labels, and the hollow ring of an unconfirmed dot. A dimmed seat numeral also takes this colour.
- **Hairline** (`hairline`, `primary-disabled`, #e5e7eb): 1px rules between board rows, input and secondary-button borders, the icon-button ring, and the fill of any disabled button.
- **Soft Surface** (`surface-soft`, #f8f9fa): Column header strip, sort-switch track, pressed state of secondary and icon buttons.
- **Card Surface** (`surface-card`, #f5f5f5): The merchant seat panel, and the wash on a board row whose count just changed.
- **Footer Black** (`surface-dark`, #101010) with **Footer Gray** text (`on-dark-soft`, #a1a1aa): The footer, the only dark surface.

### Named Rules
**The Occupancy-Only Rule.** Green, amber, and red mean how full a cafe is and nothing else. They appear as the 10px status dot; red additionally marks an invalid input. They are never button fills, backgrounds, badges, or decoration.

**The Never-Colour-Alone Rule.** A status dot is always accompanied by the seat numeral and a text label ("Plenty of room", "Filling up", "Almost full", "Full", "Not confirmed recently"), visible on the merchant screen and screen-reader-only on the board. An unconfirmed count changes shape, not hue: a hollow 2px muted ring.

**The One Dark Surface Rule.** The footer is the only near-black surface. Above it, everything is white or a light gray tone.

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

The board is a three-column grid shared by the column header and every row: a 76px seat-numeral column, a flexible cafe column that truncates the name with an ellipsis, and a trailing directions button, with 12px gaps. Rows are at least 64px tall with 8px block padding, each topped by a hairline; the last row also closes with one. The column header and rows are full width of the column, not inset cards.

On the merchant screen the step pair and the quick-set pair are two equal columns with a 12px gap; the exact-count row is a flexible input with an auto-width button.

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

Soft, small radii in three steps. Buttons and inputs are gently rounded (8px). The merchant seat panel is the one rounded container (12px). Pills (9999px) are used for the sort switch and its tabs, the directions disc, and status dots. Board rows and the column header are square-edged and divided by 1px hairlines. Borders are always 1px `hairline`, except the unconfirmed dot's 2px muted ring.

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

### Sort Switch (nav-pill-group, category-tab)
- **Style:** A `surface-soft` pill track with 4px padding holding two pill tabs, 36px tall with 14px side padding, Nav Link type, muted label. The track makes the group 44px tall and each tab's hit area reaches that edge.
- **Active:** Canvas fill, ink label, the Subtle shadow. State is exposed with `aria-pressed`.

### Board (board-head, occupancy-row, seat-count, status-dot)
- **Column header:** A `surface-soft` strip in muted Caption type ("Seats free", "Cafe"), hidden from assistive tech; the list itself is labelled.
- **Row:** Seat numeral in Display MD with a muted Caption "/total" on the same baseline; then a status dot, the cafe name in Title SM (truncated), and a muted meta line of distance or area, a middle dot, and the count's age; then the directions disc.
- **Status dot:** 10px circle. Green at 40% or more free, amber at 15% or more, red below that or at zero. Hollow 2px muted ring when the count has not been confirmed in 30 minutes; the meta line then adds "may be old".
- **Dim:** When a cafe is full or its count is unconfirmed, the seat numeral drops to muted so confirmed room stands out.
- **Changed (signature):** When a polled count differs from the last one, the row slides to its new rank (450ms, cubic-bezier(0.16, 1, 0.3, 1)), its background washes to `surface-card` (400ms, same curve), and the age reads "{age}, was N" in ink at weight 600. The mark clears after 30 seconds. Under `prefers-reduced-motion` the slide and the fade are both off; the wash and "was N" still appear.

### Seat Panel (seat-panel, stepper, exact-set)
- **Container:** `surface-card` fill, 12px radius, 24px padding, no border or shadow.
- **Count:** Display XL numeral with "of N seats free" in body colour on its baseline; announced politely when it changes.
- **Status line:** Status dot, level label, a middle dot, and "saving…" or "updated {age}" in Body SM. A failed save replaces the line with `error-text` copy and the count rolls back.
- **Stepper:** Two equal 72px-tall buttons with 1rem labels and an 18px icon: secondary "Seat taken" (minus) at left, primary "Seat freed" (plus) at right. Each disables at its bound.
- **Quick set:** Two equal 44px secondary buttons, "Mark full" and "Mark all free".
- **Exact set:** Label, a numeric text input, and a secondary "Set" button that is disabled while the input is empty.

### Empty State and Notices
- **Empty state:** 48px block padding under a hairline, left-aligned. Title MD heading in ink, Body MD sentence in body colour, and when there is a way out, a secondary button 16px below. No illustration or icon.
- **Notice:** Body SM text in body colour, 12px below the controls, in a polite live region. The error variant (offline, failed save) uses `error-text`. No box, border, or icon.

### Footer
- **Style:** `surface-dark` band, 48px below content, with 32px by 16px inner padding at the page column's width. White wordmark and a Body SM line in `on-dark-soft`, wrapping to stack on narrow screens. Focus outlines here are white.

## Do's and Don'ts

### Do:
- **Do** lead every list line with the free-seat numeral in Cal Sans 600, 2.25rem, tabular figures.
- **Do** show the age of every count next to it, and switch to the hollow muted ring and a muted numeral once it is older than 30 minutes.
- **Do** pair every status dot with a numeral and a text label, visible or screen-reader-only.
- **Do** give every control a 44px hit area, extending it invisibly when the visible shape is 36px.
- **Do** separate with 1px `hairline` rules and tone steps (`surface-soft`, `surface-card`) before reaching for a border box or shadow.
- **Do** keep muted text on `canvas` or `surface-soft`, where it clears 4.5:1; use body colour or ink on `surface-card`.
- **Do** write error copy in `error-text` and keep `error` for the dot and the invalid-input border.
- **Do** keep text inputs at 1rem and buttons at 44px tall on every screen.
- **Do** honour `prefers-reduced-motion` by removing the rank slide and the background fade while keeping the changed mark.
- **Do** end every page with the dark footer.

### Don't:
- **Don't** use Cal Sans for body copy, labels, buttons, cafe names, or empty-state headings; it is for the wordmark, seat numerals, and page h1.
- **Don't** set Cal Sans at any weight other than 600 or without negative tracking.
- **Don't** use green, amber, or red as a button fill, background, badge, or text colour; error copy uses `error-text`.
- **Don't** let colour be the only carrier of occupancy.
- **Don't** add hover styling; controls change on press, focus, and disabled only.
- **Don't** add shadows to rows, panels, buttons, or inputs; the active sort tab owns the only one.
- **Don't** put a dark surface anywhere but the footer.
- **Don't** turn board rows into bordered or rounded cards; the board is hairline-ruled lines.
- **Don't** animate anything that is not explaining a data change.
