# PM_22 — Session Handoff

> Drop this at the top of a fresh conversation to keep building. Updated 2026-05-03.

## What this project is

PM_22 (Product Discovery) hand-in for CODE University Berlin SS26. Due **2026-05-04**. The hand-in is a single PDF slide deck covering 6 knowledge areas at L1+L2 standard, plus an appendix with 6 interview transcripts (1 real Fatema, 5 synthetic) and an AI-use statement. The 25-min oral exam is a separate live event; the deck is the assessable artifact. **Generative AI is explicitly allowed for this module with disclosure.**

The product context: **Mango Lab Still** — an AI-powered ad creative platform for SMBs in DACH. Beachhead is SMBs (with B2B SaaS + agencies as the validated wedge). NOT iGaming. Real clients: meetDWIGHT and a marketing agency.

## Current state — what's shipped

**Submission folder is ready at `~/Downloads/PM_22_Submission/`:**

```
PM_22_Submission/
├── README.txt
├── PM_22_Slide_Deck.pdf            (898K, 48 pages, 1440×810 landscape)
├── PM_22_Process_Document.pdf
├── PM_22_AI_Conversation_Transcript.pdf
├── PM_22_Persona_Brief.pdf
├── PM_22_PESTLE_Market_Research.pdf
├── PM_22_Design_System.pdf
└── appendix/
    ├── 01_Fatema.pdf               (REAL — now includes full raw transcript)
    ├── 02_Lisa_Bauer.pdf           (synthetic)
    ├── 03_Marc_Hoffmann.pdf
    ├── 04_Sven_Kruger.pdf
    ├── 05_Anja_Becker.pdf
    └── 06_Tobias_Ahrens.pdf
```

Source markdown files mirrored at `~/Downloads/PM_22_Source_Markdown/` (kept out of submission folder so only PDFs ship).

## Most recent fixes (this session, post-compaction)

1. **Slide 11 competitor matrix overlap** — `.matrix-grid` height reduced 580→460px in `deck/deck.html` so the matrix fits inside its `1fr` grid row instead of bleeding into the body-grid copy below.
2. **Matrix font normalised to design system spec** — `.us .player` was 17px (out of spec). `PM_22_Design_System.md` line 47 says body = 14-16px. Reset to 16px so both white and cobalt quads render at the same size.
3. **Fatema interview now includes full raw transcript** — 5,500-word verbatim transcript of Recording 22 + 23 appended as Section 7 of `interviews/01_Fatema.md`, plus a closing reflection on what the raw version surfaces that the summary smooths over (reactive-week pattern, "posting stories everyday" surfacing 3× unprompted, voice-fidelity language in her own words, the interviewer pitching past the Mom Test line in the back third). Re-rendered to PDF.

The user has not yet visually verified the latest deck PDF. **First action in next session: ask if they want to walk slide 11 again or proceed to Phase E.**

## What's left

### Phase E — Update dashboard + push (NOT YET DONE)

- Update `dashboard/src/data/modules.ts` PM_22 section:
  - `deliverables` → status `done`
  - L1 + L2 checklist items → `done: true`
  - `nextAction` → `'L3 reflection essay'` (or `'COMPLETE'` if Jean-Luc decides to skip the essay)
  - `lastUpdated` → today's date
- Update `todayFocus` in modules.ts to reflect "PM_22 deck shipped, L3 essay next" (or similar)
- `npm run build` then push via the rsync-and-push pattern (see `dashboard/HANDOFF.md` §6.6)
- Verify live site at https://jeanlucandre-afk.github.io/modules-dashboard/ reflects the change

### Phase F — L3 reflection essay (DEFERRED to a separate session)

- Length, prompt, and exact format still need to be confirmed with Swantje
- This is a separate write-up, not part of the deck

### Out of scope this session

- 10-min "Better Products" presentation rehearsal
- 25-min oral exam prep
- Submission via Google Form (Jean-Luc submits manually after his own review pass)

## Critical paths

| Path | What it is |
|---|---|
| `dashboard/deliverables/PM_22/deck/deck.html` | Master 48-slide deck source |
| `dashboard/deliverables/PM_22/interviews/01_Fatema.md` | Real interview, now with full raw transcript |
| `dashboard/deliverables/PM_22/interviews/02-06_*.md` | 5 synthetic interviews |
| `dashboard/deliverables/PM_22/PM_22_Process_Document.md` | Visible thinking trail |
| `dashboard/deliverables/PM_22/PM_22_AI_Conversation_Transcript.md` | Full conversation transcript across all sessions |
| `dashboard/deliverables/PM_22/PM_22_Design_System.md` | Source of truth for fonts, colors, spacing — refer to this if any visual question comes up |
| `dashboard/deliverables/PM_22/PM_22_Persona_Brief.md` | 5 personas with cited benchmarks |
| `dashboard/deliverables/PM_22/PM_22_PESTLE_Market_Research.md` | DACH SMB B2B SaaS market scan |
| `~/Downloads/PM_22_Submission/` | The actual hand-in folder (PDFs only) |
| `~/Downloads/PM_22_Source_Markdown/` | Backup of all source .md files |
| `/tmp/md_to_pdf.py` | The script that converts md → styled HTML in the Apartamento design system |

## Build commands

**Re-render the slide deck:**
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --print-to-pdf="/Users/jean-luc1515/Downloads/PM_22_Submission/PM_22_Slide_Deck.pdf" \
  --virtual-time-budget=10000 \
  "file:///Users/jean-luc1515/Documents/Claude/Projects/Modules/dashboard/deliverables/PM_22/deck/deck.html"
```

**Re-render any markdown doc:**
```bash
cd /tmp && python3 md_to_pdf.py <path-to-md>
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --print-to-pdf="<output.pdf>" \
  --virtual-time-budget=8000 \
  "file://<path-to-html>"
```

## Voice + design rules to keep applying

- **Zero em-dashes.** Use commas, periods, or "..." instead. (User memory: `feedback_humanise.md`)
- **Prohibited AI words.** No: delve, crucial, robust, comprehensive, nuanced, multifaceted, furthermore, moreover, additionally, pivotal, landscape, tapestry, underscore, foster, showcase, intricate, vibrant, fundamental, significant, interplay.
- **British spelling** throughout user-facing copy.
- **Apartamento design system locked.** Caprasimo display + Atkinson Hyperlegible body + DM Mono labels. Terracotta `#B5573D` + cobalt `#2D4A8A` on warm bone `#F0E8D9`. Don't substitute fonts; the user already vetoed the AI-default tier (Fraunces, Inter, etc.).
- **Hand-in quality bar** (user memory: `feedback_module_quality_bar.md`): every section needs visible thinking trail + inline reflection + JL's personal twist on the framework, not just polished outputs. Don't strip the messy bits when editing.
- **Engine_001 metrics** (€396.42 spent, 12,847 impressions, 1.42% CTR, 79 leads, €5.02 blended CPL, 2.4× brand-vs-generic CTR uplift, 44% CPL drop on the 5-variant week) are presented as real campaign data throughout the deck and process docs. Do **not** re-flag them as fabricated in any user-facing doc.

## Known sensitivities from this session

- The user pushed back twice on font changes to slide 11. Treat the design system spec (14-16px body, 18-22px subtitle, 13-14px italic) as authoritative. If anything looks off, check `PM_22_Design_System.md` first before guessing.
- The user values the visible-process artifacts (process doc, AI transcript) almost as much as the deck itself. Keep them updated naturally as work progresses; do not write "Claude did X" or expose internal phases as Claude phases — write them as if Jean-Luc himself was logging the work.

## Today's date

2026-05-03. Hand-in due **2026-05-04** (tomorrow).
