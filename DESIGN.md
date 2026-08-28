# Design contract: The Working Room

## Core idea

The portfolio is both an index and a place. Visitors can go straight to the
work or enter a stylized working room whose objects lead to the same semantic
routes. Atmosphere should improve memory, never obscure evidence.

The room is original. It combines industrial utility, warm/cool studio light,
visible routing, personal notes, and a calm editorial shell. It does not copy
DORF's desk or Deaton Chris Anthony's room.

## Visual roles

The canonical tokens live at the top of `src/styles/global.css`.

- `paper` — warm editorial ground
- `ink` — equipment, type, and hard contrast
- `birch` — working surfaces and structure
- `amber` — active task light and emphasis
- `window-blue` — distance and cool ambient light
- `signal` — live status, cable, and focus detail
- `route-red` — rare narrative emphasis
- `electric` — keyboard focus and digital action

Amber and blue behave like light rather than broad brand fills. Signal colors
carry meaning and must preserve accessible contrast.

## Type

Use the system sans stack for primary reading and the system monospace stack
for status, coordinates, evidence, labels, and controls. Avoid a full terminal
aesthetic; the monospace is an instrument panel, not the entire identity.

## Layout

- Shell: up to 1440px, 92vw desktop, 90vw mobile
- Editorial pages use asymmetrical two-column structures above 1050px
- Dense cards meet on 1px seams; large type and negative space provide rhythm
- Mobile is a composed single-column experience, not a scaled desktop canvas

## Key components

### Home hero

Name, positioning, and `View selected work` appear before any optional
interaction. The status console communicates the working-system idea without
claiming live telemetry.

### Studio room

CSS and semantic HTML create the spatial scene. Four hotspots route to Work,
About, Notes, and Contact, and an always-visible direct-link bar duplicates
those paths. `Enter studio` heightens the scene but is never required.

### Project visuals

Every project gets an original, abstract diagram generated with HTML/CSS:

- AidSight: evidence ledger and reachability grades
- Naked Health: orbit and care signal
- FashionAI: score card and color signals

Do not replace these with third-party screenshots unless the asset is approved,
credited, optimized, and accompanied by useful alt text.

### Proof blocks

Metrics are evidence labels, not decorative counters. Each case study includes
an outcome paragraph and a separate `What this does not prove` block.

## Motion

- Short, interruptible transforms only
- No scroll hijacking or autoplay audio
- Reduced-motion disables scene travel, marquee movement, cable routing, and
  cursor blinking
- Theme choice is optional and stored locally in the browser

## Responsive contract

- Above 1050px: editorial split layouts and three-column work grid
- 721–1050px: stacked sections, horizontal project cards
- 720px and below: single-column cards and a recomposed 2D studio
- At every size, direct links and case-study text remain first-class

## Accessibility contract

- One `h1` per page and logical landmark structure
- Skip link, visible focus, meaningful link names, and real navigation anchors
- Decorative room pieces are hidden from assistive technology
- No meaning depends on hover, color, sound, or animation alone
- Day and night themes must both retain WCAG AA text contrast

## Reference boundary

Reference analysis lives in `docs/RESEARCH.md`. Reference screenshots, raw
scrapes, social images, logos, and article assets are excluded from Git and
must not be shipped.
