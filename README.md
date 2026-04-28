# Modules Dashboard 🥭

Jean-Luc's SS26 module tracker — Mango Lab edition.

**Live:** https://jeanlucandre-afk.github.io/modules-dashboard/ (after Pages is enabled)
**Hand-in deadline:** 2026-05-04

## How it works

- `index.html` — the dashboard (single self-contained file with embedded CSS + JS)
- `data.js` — all module data (this is the file you edit)
- Open `index.html` in any browser to see the dashboard. Refresh after editing `data.js`.

## Editing the dashboard

1. Open `data.js` in any text editor.
2. Update `done`, `status`, `notes`, `nextAction`, etc.
3. Save the file.
4. Push to GitHub for the phone view to update:

```bash
git add .
git commit -m "Update progress"
git push
```

GitHub Pages auto-deploys; mobile refresh picks it up within ~30 seconds.

## Status legend (deliverables)

- `todo` — not started
- `inprogress` — in progress
- `done` — finished
- `undecided` — needs a decision before work can start

## Checklist values

- `false` — not done (shows empty checkbox)
- `true` — done (shows green check)
- `null` — status unknown / not yet captured (shows dashed `?` box)

## First-time setup (already done)

```bash
git init
git add .
git commit -m "Initial dashboard"
git remote add origin git@github.com:jeanlucandre-afk/modules-dashboard.git
git branch -M main
git push -u origin main
```

Then on GitHub:
1. Go to repo → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` → `/ (root)` → Save
4. Wait ~1 min, then visit https://jeanlucandre-afk.github.io/modules-dashboard/
