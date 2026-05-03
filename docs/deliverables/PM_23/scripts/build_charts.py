"""Generate all charts for the Marketing Report. All inputs are verified Ads Manager + Lovable screenshots."""
import json
from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "inputs" / "charts"
OUT.mkdir(parents=True, exist_ok=True)

with open(ROOT / "inputs" / "meta_aggregates.json") as f:
    AGG = json.load(f)
T = AGG["totals"]

MANGO = "#F39A19"; MANGO_DARK = "#C7770A"; INK = "#1F1410"; PAPER = "#FAF6EE"
GREEN = "#3FA34D"; RED = "#D9462D"; GREY = "#7A726B"; PURPLE = "#5B4BCB"; TEAL = "#2BB3A8"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "axes.edgecolor": INK, "axes.labelcolor": INK,
    "xtick.color": INK, "ytick.color": INK,
    "axes.titlesize": 13, "axes.titleweight": "bold",
    "axes.spines.top": False, "axes.spines.right": False,
    "figure.facecolor": PAPER, "axes.facecolor": PAPER, "savefig.facecolor": PAPER,
    "savefig.dpi": 200,
})

# ---------- 1. Daily leads (verified from Ads Manager performance overview) ----------
days = sorted(AGG["by_day"].keys())
leads = [AGG["by_day"][d]["leads"] for d in days]
day_labels = [d[5:] for d in days]
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(day_labels, leads, color=MANGO_DARK, marker="o", linewidth=2.5, markersize=10)
for x, v in zip(day_labels, leads):
    ax.text(x, v + 0.6, f"{v}", ha="center", fontsize=11, fontweight="bold", color=INK)
ax.set_ylabel("Leads (form fills)")
ax.set_ylim(0, max(leads) + 4)
ax.set_title(f"Daily leads — ENGINE_001 in-flight ({T['day_min']} to {T['day_max']}, total {int(T['leads'])})")
plt.tight_layout()
plt.savefig(OUT / "fig_daily_spend_leads.png")
plt.close()

# ---------- 2. CPL by ad (8 verified ads) ----------
ads = sorted(AGG["by_ad"].keys(), key=lambda k: -AGG["by_ad"][k]["spend"])
labels = [a.replace("New Leads Ad", "V").replace(" - ", " ") for a in ads]
labels = [l if l.strip() != "V" else "V (control)" for l in labels]
cpls = [AGG["by_ad"][a]["cpl"] for a in ads]
spends = [AGG["by_ad"][a]["spend"] for a in ads]
fig, ax = plt.subplots(figsize=(10, 4.5))
bars = ax.bar(labels, cpls, color=[GREEN if c <= 5 else MANGO if c <= 8 else RED for c in cpls])
for b, v, s in zip(bars, cpls, spends):
    ax.text(b.get_x() + b.get_width()/2, v + 0.3, f"€{v:.2f}\n€{s:.0f} spent", ha="center", fontsize=8.5, color=INK)
ax.axhline(15, color=GREY, linestyle="--", linewidth=1)
ax.text(len(ads)-0.4, 15.4, "€15 internal target", color=GREY, ha="right", fontsize=9)
ax.set_ylabel("Cost per Lead (EUR)")
ax.set_ylim(0, max(cpls) * 1.25 + 1)
ax.set_title("Cost per Lead by ad (8 active variants, in-flight)")
plt.xticks(rotation=20, ha="right", fontsize=9)
plt.tight_layout()
plt.savefig(OUT / "fig_cpl_by_ad.png")
plt.close()

# ---------- 3. Age × gender (verified bars from Ads Manager Demographics) ----------
ages = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
men = [AGG["by_age_gender"][a]["men"] for a in ages]
women = [AGG["by_age_gender"][a]["women"] for a in ages]
fig, ax = plt.subplots(figsize=(8.5, 4.5))
x = np.arange(len(ages)); w = 0.38
b1 = ax.bar(x - w/2, men, w, color=PURPLE, label="Men (73%, 33 leads, CPL €5.48)")
b2 = ax.bar(x + w/2, women, w, color=TEAL, label="Women (24%, 11 leads, CPL €6.08)")
for bars, vals in [(b1, men), (b2, women)]:
    for b, v in zip(bars, vals):
        if v: ax.text(b.get_x() + b.get_width()/2, v + 0.15, f"{v}", ha="center", fontsize=9, color=INK)
ax.set_xticks(x); ax.set_xticklabels(ages)
ax.set_ylabel("Leads")
ax.set_title("Leads by age and gender (verified, n = 44 of 45)")
ax.legend(loc="upper right", frameon=False, fontsize=9)
plt.tight_layout()
plt.savefig(OUT / "fig_age_breakdown.png")
plt.close()

# ---------- 4. Funnel waterfall ----------
stages = ["Impressions", "Reach (unique)", "Site sessions", "Leads"]
vals = [T["impressions"], T["reach"], AGG["site_analytics_lovable_30d"]["meta_total_visits"], T["leads"]]
fig, ax = plt.subplots(figsize=(8, 4.5))
y = np.arange(len(stages))
bars = ax.barh(y, vals, color=[MANGO, MANGO_DARK, "#A05A07", INK])
ax.set_yticks(y); ax.set_yticklabels(stages); ax.invert_yaxis()
ax.set_xscale("log"); ax.set_xlabel("Count (log scale)")
ax.set_title(f"Acquisition funnel — paid sprint, {T['days_count']}-day in-flight read")
for b, v in zip(bars, vals):
    ax.text(v * 1.1, b.get_y() + b.get_height()/2, f"{int(v):,}", va="center", fontsize=10, color=INK, fontweight="bold")
maxv = max(vals)
for i in range(1, len(vals)):
    if vals[i-1]: ax.text(maxv * 2, i + 0.5, f"→ {vals[i]/vals[i-1]*100:.2f}%", fontsize=9, color=GREY, va="center")
plt.tight_layout()
plt.savefig(OUT / "fig_funnel.png")
plt.close()

# ---------- 5. Organic views ----------
organic_views = [2442, 2656, 1499, 1645, 3662, 3329, 4360, 3223, 4402]
labels_o = [f"V{i+1}" for i in range(9)]
fig, ax = plt.subplots(figsize=(8, 4))
bars = ax.bar(labels_o, organic_views, color=MANGO)
for b, v in zip(bars, organic_views):
    ax.text(b.get_x() + b.get_width()/2, v + 60, f"{v:,}", ha="center", fontsize=9, color=INK)
mean_v = sum(organic_views)/len(organic_views)
ax.axhline(mean_v, color=INK, linestyle="--", linewidth=1)
ax.text(8.5, mean_v + 60, f"mean ≈ {mean_v:,.0f}", color=INK, fontsize=9, ha="right")
ax.set_ylabel("Views")
ax.set_title(f"Organic short-form video performance (cold account, 9 posts, {sum(organic_views):,} total views)")
plt.tight_layout()
plt.savefig(OUT / "fig_organic_views.png")
plt.close()

# ---------- 6. Paid vs Organic reach ----------
fig, ax = plt.subplots(figsize=(7, 4))
channels = ["Paid (Meta Ads)", "Organic (short-form)"]
reach = [T["impressions"], sum(organic_views)]
costs = [T["spend"], 0]
bars = ax.bar(channels, reach, color=[MANGO, INK])
for b, v, c in zip(bars, reach, costs):
    cpm = c/v*1000 if c else 0
    label = f"{int(v):,}\n€{c:.0f} spend\nCPM €{cpm:.2f}"
    ax.text(b.get_x() + b.get_width()/2, v/2, label, ha="center", va="center",
            fontsize=10, color="white" if v > 20000 else INK, fontweight="bold")
ax.set_ylabel("Impressions / Views")
ax.set_title(f"Reach by channel — {T['days_count']} days paid (in-flight) vs ~3 weeks organic")
plt.tight_layout()
plt.savefig(OUT / "fig_paid_vs_organic.png")
plt.close()

# ---------- 7. Benchmarks ----------
fig, axes = plt.subplots(1, 3, figsize=(11, 4))
metrics = [
    ("CTR (link)", T["link_clicks"]/T["impressions"]*100, 0.90, lambda v: f"{v:.2f}%"),
    ("CPC", T["spend"]/T["link_clicks"], 1.55, lambda v: f"€{v:.2f}"),
    ("CPL", T["cpl"], 29.0, lambda v: f"€{v:.2f}"),
]
for ax, (name, ours, bench, fmt) in zip(axes, metrics):
    good = (name == "CTR (link)" and ours > bench) or (name != "CTR (link)" and ours < bench)
    bars = ax.bar(["ENGINE_001", "DACH B2B avg"], [ours, bench], color=[GREEN if good else RED, GREY])
    for b, v in zip(bars, [ours, bench]):
        ax.text(b.get_x() + b.get_width()/2, v * 1.02, fmt(v), ha="center", fontsize=10, fontweight="bold", color=INK)
    ax.set_title(name)
    ax.set_ylim(0, max(ours, bench) * 1.25)
plt.suptitle("ENGINE_001 vs published DACH B2B Meta benchmarks", fontsize=12, fontweight="bold")
plt.tight_layout()
plt.savefig(OUT / "fig_benchmarks.png")
plt.close()

# ---------- 8. Site traffic sources (Lovable analytics) ----------
sa = AGG["site_analytics_lovable_30d"]
src = sa["sources"]
labels_s = list(src.keys())
vals_s = list(src.values())
colors_s = [GREY, MANGO, MANGO_DARK, "#A05A07", "#D9842B", PURPLE]
fig, ax = plt.subplots(figsize=(8.5, 4))
bars = ax.bar(labels_s, vals_s, color=colors_s)
for b, v in zip(bars, vals_s):
    ax.text(b.get_x() + b.get_width()/2, v + 2, f"{v}", ha="center", fontsize=10, fontweight="bold", color=INK)
ax.set_ylabel("Visits (30-day)")
ax.set_title(f"mango-lab.de traffic sources (Lovable, {sa['_window']}, {sa['unique_visitors']} unique visitors)")
plt.xticks(rotation=15, ha="right")
plt.tight_layout()
plt.savefig(OUT / "fig_site_sources.png")
plt.close()

print("Charts generated:")
for p in sorted(OUT.glob("*.png")):
    print(f"  {p.name}")
