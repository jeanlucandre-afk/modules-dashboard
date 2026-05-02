# PM_22 Slide Deck — Design System (LOCKED)

> Final design spec. Locked 2026-05-02 after two design-shotgun rounds. Direction picked: **F — Apartamento**. Warm hand-feel editorial in the spirit of independent print magazines (Apartamento, MacGuffin, Offscreen, The Gentlewoman). No Mango orange. No Fraunces/Inter/Geist defaults. Caprasimo as distinctive editorial display, Atkinson Hyperlegible as humane body, terracotta + cobalt + warm bone palette.

**Direction:** F — Apartamento
**Status:** Locked
**Output:** Single HTML file, ~50 landscape slides + appendix, viewable in browser, exportable to PDF
**Audience:** Swantje Quoos (PM_22 assessor) + JL using it himself

---

## 1. Vibe

Warm hand-feel independent magazine. Looks like the editor cared. Reads like a curated quarterly. Hand-drawn margin notes soften the academic register. Most of the page is breathing space. Photography-style image treatment for any pictures. Type does most of the work, colour is restrained but specific.

**Reference taste:** Apartamento for warmth + marginalia, MacGuffin for object-led editorial, Offscreen for calm grids, The Gentlewoman for severe display typography willingness.

---

## 2. Typography

### Font stack

| Role | Font | Source | Weight |
|---|---|---|---|
| Display | **Caprasimo** | Google Fonts (free) | 400 |
| Body | **Atkinson Hyperlegible** | Google Fonts (free) | 400, 700, italic |
| Mono / labels | **DM Mono** | Google Fonts (free) | 400, 500 |

Production upgrade path (optional, ~€30-80): swap Caprasimo for **PP Editorial New** (Pangram Pangram, free for personal). Body and mono stay.

CDN loading:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Cover H1 | Caprasimo | 130-156px | 400 | Tight letter-spacing -0.025em, line-height 0.88 |
| Section divider H1 | Caprasimo | 96-110px | 400 | line-height 0.92 |
| Slide title H2 | Caprasimo | 44-52px | 400 | line-height 1.0, letter-spacing -0.02em |
| Subtitle | Caprasimo | 18-22px | 400 | Used sparingly for KA tags |
| Body | Atkinson Hyperlegible | 14-16px | 400 | line-height 1.65 |
| Body emphasis | Atkinson Hyperlegible | 14-16px | 700 | Inline bold |
| Italic body | Atkinson Hyperlegible italic | 13-14px | 400 | Margin notes, pull quotes |
| Caption | Atkinson Hyperlegible | 11-12px | 400 | line-height 1.55 |
| Mono label | DM Mono | 10-11px | 400-500 | Letter-spacing 0.18-0.22em, all-caps |

### Rules

- Caprasimo never below 14pt. It's a heavy display serif and gets ugly small.
- Atkinson Hyperlegible never above 22pt. It's optimised for body, looks unrefined as display.
- Italic body for margin notes and pull quotes. Otherwise roman.
- All-caps reserved for mono labels and meta-information (page numbers, dates, KA tags).
- Tabular nums on every data point (`font-variant-numeric: tabular-nums`).

---

## 3. Colour system

OKLCH-friendly, no AI defaults. Mango orange is OUT for this deck.

### Palette

| Token | Hex | Use |
|---|---|---|
| `--bone` | `#F0E8D9` | Default page background. Warm, not cream-white. |
| `--bone-soft` | `#F5EFE3` | Surface for raised cards |
| `--ink` | `#1F1A14` | Primary text |
| `--ink-muted` | `#5C5347` | Secondary text, captions |
| `--ink-faint` | `#8C8478` | Footnotes, page numbers |
| `--terracotta` | `#B5573D` | Primary accent, KA tags, italic emphasis |
| `--terracotta-soft` | `#F4A270` | Light accent, on dark backgrounds |
| `--cobalt` | `#2D4A8A` | Deep accent, section dividers, badges, margin-note backgrounds |
| `--cobalt-soft` | `rgba(45,74,138,0.08)` | Margin-note background tint |
| `--rule` | `rgba(31,26,20,0.25)` | Hairline rules and dividers |

### KA section accents

In direction F, we deliberately do NOT colour-code each KA differently. The deck reads as one cohesive issue. Section dividers all use cobalt as background. KA tags use terracotta. Section number is the only differentiator.

This is a deliberate move away from BMC-style colour coding because it would clash with the editorial-magazine register.

### Colour discipline

- Body backgrounds: only `--bone` (default) or `--cobalt` (section dividers). Never both on the same slide.
- Text on `--bone`: only `--ink`, `--ink-muted`, `--ink-faint`, `--terracotta`, or `--cobalt`.
- Text on `--cobalt`: only `--bone`, `--terracotta-soft`, or rgba bone tints.
- Terracotta is for emphasis. Cobalt is for structure (section dividers, badges, margin notes). Don't swap.
- Never use both terracotta + cobalt on the same body element. Pick one.

---

## 4. Layout

### Canvas

- Slide dimensions: **1920×1080** (16:9)
- CSS: `@page { size: 1920px 1080px; }` plus `.slide { width: 1920px; height: 1080px; }`
- Outer margin: 56-64px on all sides depending on slide type
- Working area: ~1800×980

### Grid

12-column with 24px gutter, 32px row gap. Asymmetric layouts allowed and encouraged.

### Slide templates

**Cover (1 slide)** — `--bone` bg, Caprasimo H1 130-156px split between `--ink` and `--terracotta`, footer row with author/subject/date metadata in body italic, small geometric squiggle accent (cobalt + terracotta concentric circles).

**Section divider (6 slides)** — `--cobalt` bg, `--bone` text. KA tag in `--terracotta-soft`, big Caprasimo H1 88-110px, summary paragraph at bottom in body type. No icons, no decoration beyond hairline rules.

**Content slide (~30 slides)** — `--bone` bg. KA number in DM Mono 10pt cobalt at top. KA tag in Caprasimo 14pt terracotta below it. Slide title H2 in Caprasimo 44-52px. Two-column or three-column body grid below. Optional margin note in cobalt-tinted box.

**Framework slide (~12 slides)** — `--bone` bg. Framework rendered cleanly with hairline rules. Margin note as the JL-twist annotation. Source citation in DM Mono at bottom.

**Quote / pull-stat slide (~6 slides)** — `--bone` bg. Big Caprasimo italic quote at 60-80px or single big number at 180px. Minimal chrome. Citation in DM Mono.

**Appendix slide (~10-15 slides for transcripts + sources)** — `--bone` bg. Atkinson body 13-14px main text. Mono labels for question numbers. AI-use disclosure box in cobalt-tinted background on first appendix page.

---

## 5. Decoration

Three motifs only. Same restraint as before, but no sticky notes.

### Margin notes (was sticky notes)

- Background: `--cobalt-soft` (cobalt at 8% opacity) on bone, OR cream-tinted on cobalt
- Padding: 18-20px
- Border-radius: 4px (not pill)
- Slight rotation: -1deg or +1deg for organic feel
- Text: Atkinson italic 13px, `--cobalt` colour
- Optional bold lead-in in Caprasimo 14px
- Use for: JL framework twists, "what I learned" callouts, key quotes from interviews

### Geometric squiggle (cover only)

- Two concentric circles, one cobalt outer, one terracotta inner, slightly offset rotation
- Used ONLY on cover slide and possibly bonus-section intro slides
- Replaces the holographic spheres

### Hairline rules

- 1px `--rule` (rgba ink 25% opacity)
- Used for: top/bottom borders on metadata rows, separators between sections within a slide
- 2px `--ink` for the strong border under "chapter mark" lines

### Anti-patterns (forbidden)

- Side-stripe borders >1px (impeccable BAN 1)
- Gradient text (impeccable BAN 2)
- Glassmorphism beyond a single subtle backdrop-blur on the cover squiggle (no backdrop-blur on scrolling content)
- Drop shadows on regular cards (only the slight shadow on margin notes is allowed)
- Centered-everything layouts
- 3-column icon grids with circles
- Mango orange anywhere
- Cream-and-orange-and-black combo

---

## 6. Motion

For HTML deck (not PDF):

- Transition timing: `cubic-bezier(0.23, 1, 0.32, 1)` (custom strong ease-out, per Emil)
- Durations: 200-280ms for nav transitions, 400ms for slide transitions
- Slide entrance: `@starting-style` with translateY(16px) + opacity 0 → translateY(0) + opacity 1, blur(4px) → blur(0)
- Stagger inside a slide: 50ms between elements
- Asymmetric: enter ~400ms, exit ~200ms ease-in
- Only animate `transform` and `opacity`. Never animate layout.
- `prefers-reduced-motion`: drop blur and translate, keep opacity only

---

## 7. CSS variables (use these tokens)

```css
:root {
  /* paper */
  --bone: #F0E8D9;
  --bone-soft: #F5EFE3;
  --ink: #1F1A14;
  --ink-muted: #5C5347;
  --ink-faint: #8C8478;

  /* accents */
  --terracotta: #B5573D;
  --terracotta-soft: #F4A270;
  --cobalt: #2D4A8A;
  --cobalt-soft: rgba(45,74,138,0.08);

  /* lines */
  --rule: rgba(31,26,20,0.25);
  --rule-strong: #1F1A14;

  /* type */
  --display: 'Caprasimo', Georgia, serif;
  --body: 'Atkinson Hyperlegible', system-ui, sans-serif;
  --mono: 'DM Mono', 'SF Mono', Consolas, monospace;

  /* spacing */
  --gap-xs: 8px;
  --gap-sm: 16px;
  --gap-md: 24px;
  --gap-lg: 32px;
  --gap-xl: 48px;
  --gap-2xl: 64px;
  --gap-3xl: 96px;

  /* motion */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root { --motion-disabled: 1; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Print styles

```css
@page { size: 1920px 1080px; margin: 0; }
.slide { width: 1920px; height: 1080px; page-break-after: always; page-break-inside: avoid; }
@media print { body { background: white; } }
```

---

## 8. Production file structure

```
dashboard/deliverables/PM_22/deck/
├── deck.html              (master file, all slides in order)
├── styles.css             (the design system as CSS)
├── fonts.css              (CDN imports)
├── components/            (optional reusable HTML partials)
│   ├── _margin_note.html
│   ├── _section_divider.html
│   └── _framework_card.html
└── assets/
    └── (any images if needed)
```

For simplicity and single-file portability, the first build will be a single deck.html with inline CSS. We can refactor to multi-file later if needed.

---

## 9. Risk choices behind the system

1. **Caprasimo over Fraunces / PP Editorial New free trial.** Risk: heavy display serif, less elegant than premium. Worth it because it's genuinely uncommon and the free tier covers all use.
2. **Atkinson Hyperlegible over Inter/Geist.** Risk: humane sans is less "default modern." Worth it because it has personality, is genuinely accessible, and signals taste.
3. **Terracotta + cobalt instead of Mango orange.** Risk: visually disconnects this deck from the live Mango Lab brand. Worth it because the deck is a hand-in artefact, not customer-facing material, and the assessor cares about the work, not brand consistency.
4. **No KA-specific colour coding.** Risk: less wayfinding. Worth it because colour-coded sections clash with the editorial-magazine register and look like a corporate dashboard.
5. **Margin notes instead of sticky notes.** Risk: less direct connection to class teaching language (Hypothesis Board). Worth it because sticky notes read as cliché in a magazine system.

---

## 10. What this design does NOT do

- Does not match the live Mango Lab pitch deck visually. This is a hand-in artefact, separate visual register.
- Does not animate aggressively. Static-readable PDF is the primary output.
- Does not use icons. Type and layout do all wayfinding.
- Does not use stock photography. If we need imagery, it's typographic or geometric.

This deck reads as: a single thoughtful issue of an independent magazine on the topic of building Mango Lab Still. End of story.
