"""Clean rembg cutout — preserve dark brown jacket, no aggressive black kill."""
from pathlib import Path

from PIL import Image
from rembg import remove
import numpy as np

src = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-Desktop-projets-bilal-naiimanumberone\assets\hero-chef-tagine.png"
)
targets = [
    Path(r"c:\Users\User\Desktop\projets bilal\naiimanumberone\frontend\public\images\hero-chef-tagine.png"),
    Path(r"c:\Users\User\Desktop\projets bilal\naiimanumberone\public\images\hero-chef-tagine.png"),
    Path(r"c:\Users\User\Desktop\projets bilal\naiimanumberone\public\spa\images\hero-chef-tagine.png"),
]

original = Image.open(src).convert("RGBA")
cut = remove(original)

# Only remove fringe that is near-fully-transparent AND very dark (true leftover bg)
a = np.array(cut)
rgb = a[:, :, :3].astype(np.float32)
alpha = a[:, :, 3].astype(np.float32)
lum = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]
# Soften only highly translucent leftover studio pixels — not jacket
ghost = (alpha > 0) & (alpha < 40) & (lum < 35)
alpha[ghost] = 0
a[:, :, 3] = alpha.astype(np.uint8)
cut = Image.fromarray(a, "RGBA")

bbox = cut.getbbox()
if bbox:
    l, t, r, b = bbox
    pad = 4
    cut = cut.crop(
        (max(0, l - pad), max(0, t - pad), min(cut.width, r + pad), min(cut.height, b + pad))
    )

for p in targets:
    p.parent.mkdir(parents=True, exist_ok=True)
    cut.save(p, "PNG", optimize=True)
    print("saved", p, cut.size)

# preview
prev = np.array(cut)
h, w = prev.shape[:2]
cb = np.zeros((h, w, 3), dtype=np.uint8)
tile = 24
for y in range(0, h, tile):
    for x in range(0, w, tile):
        c = 210 if ((x // tile) + (y // tile)) % 2 == 0 else 245
        cb[y : y + tile, x : x + tile] = c
al = prev[:, :, 3:4] / 255.0
comp = prev[:, :, :3] * al + cb * (1 - al)
Image.fromarray(comp.astype(np.uint8)).save(
    r"c:\Users\User\Desktop\projets bilal\naiimanumberone\public\images\_chef_preview.jpg",
    quality=92,
)
print("ok")
