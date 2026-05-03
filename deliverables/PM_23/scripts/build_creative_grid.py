"""Build a 4x2 creative grid PNG from the 8 ad images for §8 of the Marketing Report."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "inputs" / "screenshots"

# Order matches the Meta Ads Manager screenshot
ads = [
    ("ad_01_meet_mango.jpg",     "V1: Meet Mango — character-led brand intro"),
    ("ad_02_thumb.jpg",          "V2: Thumb scroll-stopper (story creative)"),
    ("ad_03_green_agency.jpg",   "V3: 'Still paying an agency to post' — direct"),
    ("ad_04_creative_engine.jpg","V4: Custom creative engine (premium)"),
    ("ad_05_cmo.jpg",            "V5: 'Your new CMO doesn't sleep' (product)"),
    ("ad_06_your_ads.jpg",       "V6: 'Your ads look like everyone else's. Fix that.'"),
    ("ad_07_bleeding.jpg",       "V7: 'Your ad budget is bleeding' (industrial)"),
    ("ad_08_volume.jpg",         "V8: Volume vs perfection (before/after)"),
]

cell_w, cell_h = 800, 800
cols, rows = 4, 2
gap = 14
caption_h = 60
canvas_w = cols*cell_w + (cols+1)*gap
canvas_h = rows*(cell_h + caption_h) + (rows+1)*gap
canvas = Image.new("RGB", (canvas_w, canvas_h), (250, 246, 238))

try:
    font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 22)
except OSError:
    font = ImageFont.load_default()

draw = ImageDraw.Draw(canvas)

for i, (fn, cap) in enumerate(ads):
    r, c = divmod(i, cols)
    x = gap + c*(cell_w+gap)
    y = gap + r*(cell_h+caption_h+gap)
    img = Image.open(SHOTS / fn).convert("RGB")
    # Crop centred square then resize
    iw, ih = img.size
    s = min(iw, ih)
    img = img.crop(((iw-s)//2, (ih-s)//2, (iw-s)//2 + s, (ih-s)//2 + s)).resize((cell_w, cell_h), Image.LANCZOS)
    canvas.paste(img, (x, y))
    # Caption strip
    draw.rectangle([x, y+cell_h, x+cell_w, y+cell_h+caption_h], fill=(31, 20, 16))
    draw.text((x+12, y+cell_h+18), cap, fill=(250, 246, 238), font=font)

out = ROOT / "inputs" / "charts" / "fig_creative_grid.png"
canvas.save(out, optimize=True)
print(f"Saved: {out} ({canvas.size})")
