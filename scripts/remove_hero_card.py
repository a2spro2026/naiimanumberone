"""Remove baked-in promo card + CTA buttons from the hero banner."""
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

out = r"c:\Users\User\Desktop\projets bilal\naiimanumberone\public\images"
src_mock = (
    r"C:\Users\User\AppData\Roaming\Cursor\User\workspaceStorage"
    r"\5c1d80f101d02275e8e94899540be38d\images"
    r"\WhatsApp Image 2026-07-14 at 16.46.52-21c6f1ac-930e-4ad0-8472-37b0a84282e2.png"
)

base = Image.open(src_mock).convert("RGB")
mw, mh = base.size
hero = base.crop((0, int(mh * 0.048), mw, int(mh * 0.355)))
hero = hero.resize((hero.width * 2, hero.height * 2), Image.Resampling.LANCZOS)
hero = hero.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=2))
w, h = hero.size

# Cover card + both CTA buttons (under title → bottom of banner)
x0, x1 = int(w * 0.025), int(w * 0.510)
y0, y1 = int(h * 0.470), int(h * 0.980)
rw, rh = x1 - x0, y1 - y0

donor = hero.crop((int(w * 0.55), int(h * 0.35), int(w * 0.78), int(h * 0.75)))
donor = donor.resize((rw, rh), Image.Resampling.LANCZOS)
donor = ImageEnhance.Brightness(donor).enhance(0.42)
donor = donor.filter(ImageFilter.GaussianBlur(24))
donor = Image.blend(donor, Image.new("RGB", (rw, rh), (15, 8, 5)), 0.7)

mask = Image.new("L", (rw, rh), 0)
draw = ImageDraw.Draw(mask)
draw.rounded_rectangle([0, 0, rw - 1, rh - 1], radius=18, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(10))
mask = mask.point(lambda p: min(255, int(p * 1.4)))

result = hero.copy()
result.paste(Image.composite(donor, hero.crop((x0, y0, x1, y1)), mask), (x0, y0))

# Scrub leftover gold / green / warm button pixels in that zone
a = np.array(result)
r, g, b = [a[:, :, i].astype(np.int16) for i in range(3)]
# gold frame/button
gold = ((r - b) > 18) & (r > 90) & (g > 55) & (b < 175)
# green menu button
green = (g > r + 8) & (g > b + 8) & (g > 40) & (r < 90)
# bright UI chrome
bright = (r > 140) & (g > 140) & (b > 140)
band = np.zeros((h, w), dtype=bool)
band[int(h * 0.465) : int(h * 0.985), int(w * 0.020) : int(w * 0.520)] = True
# keep headline safe
band[: int(h * 0.462), :] = False
kill = (gold | green | bright) & band
print("scrub", kill.sum())
if kill.sum():
    med = np.array([15, 8, 5], dtype=np.int16)
    noise = np.random.randint(-3, 4, (kill.sum(), 3), dtype=np.int16)
    a[kill] = np.clip(med + noise, 0, 255).astype(np.uint8)
    result = Image.fromarray(a)

result.save(os.path.join(out, "hero-full.png"), "PNG")
result.save(os.path.join(out, "hero-full.jpg"), "JPEG", quality=95, subsampling=0)
result.save(os.path.join(out, "hero-full.webp"), "WEBP", quality=92, method=6)
print("saved", w, h, "zone", x0, y0, x1, y1)
