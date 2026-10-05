"""Generate PWA icons and lightweight WebP versions of heavy images for mobile."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TARGET_DIRS = [ROOT / "frontend" / "public" / "images", ROOT / "public" / "images"]
SRC = ROOT / "frontend" / "public" / "images"
INK = (16, 16, 16, 255)


def save_everywhere(img: Image.Image, name: str, **kwargs) -> None:
    for d in TARGET_DIRS:
        d.mkdir(parents=True, exist_ok=True)
        img.save(d / name, **kwargs)
    print(f"{name}: {(TARGET_DIRS[0] / name).stat().st_size // 1024} KB")


def icon_on_ink(logo: Image.Image, size: int, logo_ratio: float) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), INK)
    inner = int(size * logo_ratio)
    resized = logo.resize((inner, inner), Image.LANCZOS)
    offset = (size - inner) // 2
    canvas.alpha_composite(resized, (offset, offset))
    return canvas


def main() -> None:
    logo = Image.open(SRC / "logo-mark.png").convert("RGBA")
    save_everywhere(icon_on_ink(logo, 192, 1.0), "icon-192.png", optimize=True)
    save_everywhere(icon_on_ink(logo, 512, 1.0), "icon-512.png", optimize=True)
    save_everywhere(icon_on_ink(logo, 512, 0.78), "icon-maskable-512.png", optimize=True)
    save_everywhere(icon_on_ink(logo, 180, 0.9).convert("RGB"), "apple-touch-icon.png", optimize=True)

    heavy = {
        "hero-ceremony.jpg": 1920,
        "dish-couscous-royal.jpg": 1200,
        "dish-tajine-citron.jpg": 1200,
        "dish-tajine-pruneaux.jpg": 1200,
        "hero-chef-tagine.png": 1000,
    }
    for name, max_w in heavy.items():
        img = Image.open(SRC / name)
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        if img.width > max_w:
            img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
        save_everywhere(img, Path(name).with_suffix(".webp").name, quality=80, method=6)


if __name__ == "__main__":
    main()
