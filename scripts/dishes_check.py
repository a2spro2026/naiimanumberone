"""End-to-end check of Habillage > Menu des plats (MySQL-backed) and size selection on the public menu.

Requires ADMIN_LOGIN / ADMIN_PASSWORD in the environment.
"""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "storage" / "dish-shots"
OUT.mkdir(parents=True, exist_ok=True)
PHOTO = ROOT / "public" / "images" / "dish-harira.webp"
results = []


def check(label, ok):
    results.append((label, ok))
    print(("OK   " if ok else "FAIL ") + label)


def login(page):
    page.goto(BASE + "/admin/login", wait_until="networkidle")
    for selector, key in (("#admin-login", "ADMIN_LOGIN"), ("#admin-password", "ADMIN_PASSWORD")):
        page.click(selector)
        page.fill(selector, os.environ[key])
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/admin", timeout=15000)


with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    ctx = browser.new_context(**p.devices["iPhone 13"])
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("dialog", lambda d: d.accept())

    login(page)
    page.goto(BASE + "/admin/configuration/habillage", wait_until="networkidle")
    check("12 seeded dishes listed", page.get_by_role("button", name="Modifier").count() == 12)
    page.screenshot(path=str(OUT / "habillage-list.png"))

    page.get_by_role("button", name="Ajouter un plat").click()
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Ajouter le plat").click()
    page.wait_for_timeout(300)
    check("empty form shows errors", page.get_by_text("Importez une photo du plat.").is_visible()
          and page.get_by_text("Prix petit obligatoire.").is_visible())
    page.screenshot(path=str(OUT / "form-errors.png"))

    page.set_input_files('input[aria-label="Importer la photo du plat"]', str(PHOTO))
    page.wait_for_timeout(800)
    page.fill("#dish-name-ar", "طاجين تجريبي")
    page.fill("#dish-name", "Tajine Test")
    page.fill("#dish-desc-ar", "وصف تجريبي للطبق.")
    page.fill("#dish-desc", "Description de test du plat.")
    page.fill("#dish-price-small", "50")
    page.fill("#dish-price-medium", "80,50")
    page.fill("#dish-price-large", "120")
    check("errors cleared once fields filled", page.locator("form p.text-red-600").count() == 0)
    page.screenshot(path=str(OUT / "form-filled.png"))
    page.get_by_role("button", name="Ajouter le plat").click()
    page.locator("#dish-name").wait_for(state="detached", timeout=30000)
    new_card = page.locator("article", has_text="Tajine Test")
    new_card.wait_for(timeout=30000)
    check("new dish in Habillage list", new_card.is_visible())
    check("13 dishes now", page.get_by_role("button", name="Modifier").count() == 13)
    image_src = page.locator("article", has_text="Tajine Test").locator("img").get_attribute("src")
    check(f"photo uploaded to server ({image_src})", bool(image_src) and image_src.startswith("/uploads/dishes/"))
    uploaded = ROOT / "public" / image_src.lstrip("/") if image_src else None
    check("uploaded file exists", bool(uploaded) and uploaded.exists())

    # Public site, fresh visitor (no admin session): new dish + sizes
    visitor = browser.new_context(**p.devices["iPhone 13"])
    pub = visitor.new_page()
    pub.on("pageerror", lambda e: errors.append(str(e)))
    pub.goto(BASE + "/", wait_until="networkidle")
    card = pub.locator("article", has_text="Tajine Test")
    card.scroll_into_view_if_needed()
    pub.wait_for_timeout(1200)
    check("visitor sees new dish", card.is_visible())
    check("medium selected by default (80.50)", "80.50" in card.inner_text())
    card.get_by_role("radio", name="Grand — 120.00").click()
    pub.wait_for_timeout(300)
    check("Grand selected shows 120.00", "120.00" in card.inner_text())
    pub.screenshot(path=str(OUT / "public-card.png"))
    card.get_by_role("button", name="Ajouter Tajine Test (Grand) au panier").click()
    card.get_by_role("radio", name="Petit — 50.00").click()
    card.get_by_role("button", name="Ajouter Tajine Test (Petit) au panier").click()
    pub.wait_for_timeout(500)
    pub.get_by_role("navigation", name="Actions rapides").get_by_role("button").click()
    pub.wait_for_timeout(700)
    drawer = pub.locator("aside").last
    text = drawer.inner_text()
    check("cart has 2 lines (Grand + Petit)", "Grand" in text and "Petit" in text)
    check("cart total 170.00", "170.00" in text)
    pub.screenshot(path=str(OUT / "public-cart.png"))
    visitor.close()

    # Edit price
    page.locator("article", has_text="Tajine Test").get_by_role("button", name="Modifier").click()
    page.wait_for_timeout(500)
    check("edit form prefilled", page.input_value("#dish-name") == "Tajine Test"
          and page.input_value("#dish-price-medium") == "80.5")
    page.fill("#dish-price-medium", "85")
    page.get_by_role("button", name="Enregistrer").click()
    page.locator("#dish-name").wait_for(state="detached", timeout=30000)
    check("price updated to 85.00", "85.00" in page.locator("article", has_text="Tajine Test").inner_text())

    # Delete
    page.get_by_role("button", name="Supprimer Tajine Test").click()
    try:
        page.locator("article", has_text="Tajine Test").wait_for(state="detached", timeout=30000)
    except Exception:
        pass
    check("dish deleted", page.locator("article", has_text="Tajine Test").count() == 0)
    check("uploaded file removed", bool(uploaded) and not uploaded.exists())
    check(f"no JS errors {errors}", not errors)

    # Unauthenticated API write is refused
    anon = browser.new_context()
    ap = anon.new_page()
    ap.goto(BASE + "/", wait_until="networkidle")
    status = ap.evaluate("async () => (await fetch('/api/admin/dishes/1', {method: 'DELETE', headers: {Accept: 'application/json'}})).status")
    check(f"anonymous delete refused ({status})", status in (401, 419))
    anon.close()
    browser.close()

failed = [r for r in results if not r[1]]
print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
sys.exit(1 if failed else 0)
