# SS26 Hand-In Hub

Jean-Luc's modules dashboard — React + Vite + Tailwind 4, glassmorphism aesthetic.
Centralizes all 8 modules and their deliverables for the **2026-05-04** hand-in window.

**Live:** https://jeanlucandre-afk.github.io/modules-dashboard/

## What lives where

```
dashboard/
├── src/                          # React app source
│   ├── components/
│   │   ├── ui/sign-in.tsx        # The styled landing component
│   │   ├── Landing.tsx           # The "Enter the Hub" screen
│   │   ├── AmbientBackground.tsx # Floating gradient blobs
│   │   └── dashboard/
│   │       ├── Dashboard.tsx     # Main hub
│   │       ├── ModuleCard.tsx    # Click-to-open card
│   │       ├── ModuleModal.tsx   # The full-detail modal
│   │       └── ProgressRing.tsx  # The animated %-ring
│   ├── data/
│   │   └── modules.ts            # ⭐ THE FILE TO EDIT — all module data lives here
│   ├── lib/utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind 4 + animations + glass utilities
├── deliverables/                 # ⭐ ALL FILES live here, one folder per module
│   ├── PM_16/
│   │   ├── module_brief.pdf
│   │   └── PM_16_Part4_Drafts.md
│   ├── PM_18/
│   ├── PM_22/
│   ├── PM_23/
│   ├── ID_09/
│   ├── ID_30/
│   ├── SE_01/
│   ├── STS_04/
│   ├── shared/                   # Mango Lab artifacts reused across modules
│   │   ├── 01_pitch_deck.pdf
│   │   ├── 02_business_model_canvas.pdf
│   │   ├── 03_risk_ledger.pdf
│   │   ├── 04_unit_economics.xlsx
│   │   ├── 05_ltv_pricing.html
│   │   ├── 06_validation_plan_v3.pdf
│   │   ├── 07_traction_test_cards.html
│   │   ├── 08_engine001_campaign_plan.html
│   │   ├── 09_engine001_creative_brief.html
│   │   └── 10_engine001_roland_summary.html
│   └── 00_Module_Action_Plan.md
├── docs/                         # Built site (auto-generated, served by GH Pages)
├── _legacy/                      # Old vanilla-HTML Mango-themed dashboard
├── package.json
├── vite.config.ts
└── .github/workflows/deploy.yml  # Auto-builds on push, commits docs/ back to main
```

## How to update

1. **Edit module data**: open `src/data/modules.ts` — change `status`, `done`, `notes`, `nextAction`, etc.
2. **Add a deliverable file**: drop the file into `deliverables/{MODULE_ID}/` and reference it in `modules.ts`:
   ```ts
   { name: 'My new doc', status: 'inprogress', file: 'my_doc.pdf' }
   ```
   For shared files (Mango Lab artifacts) reference as `'../shared/01_pitch_deck.pdf'`.
3. **Commit + push**:
   ```bash
   git add . && git commit -m "Update PM_16 progress" && git push
   ```
4. GitHub Action rebuilds the site and commits `docs/` back to main (~1 min).

## Local dev

```bash
npm install
npm run dev          # localhost:5173
npm run build        # outputs to docs/
npm run preview      # serve the built docs/ locally
```

## GitHub Pages setup (one-time, after first push of v2)

In the repo on GitHub:
1. Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/docs`
4. Save → wait ~1 min → live URL above works

## Status legend

- `done` — finished
- `inprogress` — in progress (counts as 50% in the ring)
- `todo` — not started
- `undecided` — needs a decision before work can start (excluded from progress %)

Checklist: `true` done · `false` not done · `null` unknown.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Tailwind 4** (CSS-first, no `tailwind.config.js`)
- **lucide-react** for icons
- Pure-CSS animations (no framer-motion) — fade-slide-in, blob drift, modal pop
