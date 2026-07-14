import os

from PIL import Image, ImageFilter

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
print("size", hero.size)

hero.save(os.path.join(out, "hero-full.png"), "PNG")
hero.save(os.path.join(out, "hero-full.jpg"), "JPEG", quality=95, subsampling=0)
hero.save(os.path.join(out, "hero-full.webp"), "WEBP", quality=92, method=6)

# cleanup debug
debug = os.path.join(out, "_debug_card_zone.jpg")
if os.path.exists(debug):
    os.remove(debug)
print("restored pristine hero")
