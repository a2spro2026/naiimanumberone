"""End-to-end check: meal cards (Petit-déjeuner / Déjeuner / Dîner) and the restricted gérant admin.

Requires ADMIN_LOGIN / ADMIN_PASSWORD and GERANT_LOGIN / GERANT_PASSWORD (temporary gérant account)
in the environment.
"""
import json
import os
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "storage" / "meal-shots"
OUT.mkdir(parents=True, exist_ok=True)
PHOTO = ROOT / "public" / "images" / "dish-harira.webp"
results = []


def check(label, ok):
    results.append((label, ok))
    print(("OK   " if ok else "FAIL ") + label)


def login(page, login_key, password_key):
    page.goto(BASE + "/admin/login", wait_until="networkidle")
    for selector, key in (("#admin-login", login_key), ("#admin-password", password_key)):
        page.click(selector)
        page.fill(selector, os.environ[key])
    page.get_by_role("button", name="Se connecter").click()


def fill_dish(page, name_ar, desc_ar, french=None):
    page.set_input_files('[role="dialog"] input[type="file"]', str(PHOTO))
    page.wait_for_timeout(800)
    page.fill("#dish-name-ar", name_ar)
    page.fill("#dish-desc-ar", desc_ar)
    if french:
        page.fill("#dish-name", french[0])
        page.fill("#dish-desc", french[1])
    page.fill("#dish-price-small", "20")
    page.fill("#dish-price-medium", "30")
    page.fill("#dish-price-large", "40")


def tab(page, label):
    return page.get_by_role("tab", name=re.compile("^" + label))


def wait_closed(page):
    try:
        page.locator("#dish-name-ar").wait_for(state="detached", timeout=30000)
    except Exception:
        page.locator('[role="dialog"]').evaluate("el => el.scrollTo(0, 0)")
        page.screenshot(path=str(OUT / "form-stuck.png"))
        print("form messages:", page.locator('[role="dialog"] .text-red-600, [role="dialog"] [role="alert"]').all_inner_texts())
        raise


with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    errors = []

    # ---------- Admin: tabs per meal + add a breakfast dish ----------
    admin = browser.new_context(**p.devices["iPhone 13"])
    page = admin.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("dialog", lambda d: d.accept())
    login(page, "ADMIN_LOGIN", "ADMIN_PASSWORD")
    page.wait_for_url("**/admin", timeout=30000)
    page.goto(BASE + "/admin/configuration/habillage", wait_until="networkidle")
    tabs = page.get_by_role("tab")
    check("3 meal tabs", tabs.count() == 3)
    check("breakfast tab selected by default", tabs.nth(0).get_attribute("aria-selected") == "true")
    check("breakfast empty message", page.get_by_text("Aucun plat pour le petit-déjeuner").is_visible())
    tab(page, "Déjeuner").click()
    check("lunch tab lists 12 dishes", page.get_by_role("button", name="Modifier").count() == 12)
    tab(page, "Petit-déjeuner").click()
    page.screenshot(path=str(OUT / "admin-tabs.png"))

    page.get_by_role("button", name="Ajouter un plat (Petit-déjeuner)").click()
    page.wait_for_timeout(500)
    meal_boxes = page.locator('form input[type="checkbox"]')
    check("form: breakfast pre-checked only",
          [meal_boxes.nth(i).is_checked() for i in range(3)] == [True, False, False])
    page.get_by_text("Petit-déjeuner", exact=True).last.click()
    page.get_by_role("button", name="Ajouter le plat").click()
    page.wait_for_timeout(300)
    check("form: no meal -> error", page.get_by_text("Choisissez au moins un repas.").is_visible())
    page.get_by_text("Petit-déjeuner", exact=True).last.click()
    fill_dish(page, "مسمن تجريبي", "مسمن بالعسل.", ("Msemen Test", "Msemen au miel."))
    page.screenshot(path=str(OUT / "admin-form.png"))
    page.get_by_role("button", name="Ajouter le plat").click()
    wait_closed(page)
    card = page.locator("article", has_text="Msemen Test")
    card.wait_for(timeout=30000)
    check("breakfast tab shows new dish", card.is_visible())
    tab(page, "Déjeuner").click()
    check("new dish not in lunch tab", page.locator("article", has_text="Msemen Test").count() == 0)

    # ---------- Visitor: meal cards filter the dishes ----------
    visitor = browser.new_context(**p.devices["iPhone 13"])
    pub = visitor.new_page()
    pub.on("pageerror", lambda e: errors.append(str(e)))
    pub.goto(BASE + "/", wait_until="networkidle")
    menu = pub.locator("#menu")
    menu.scroll_into_view_if_needed()
    pub.wait_for_timeout(1200)
    meal_cards = menu.locator("button[aria-pressed]")
    check("3 meal cards", meal_cards.count() == 3)
    check("all 13 dishes shown by default", menu.locator("article").count() == 13)
    pub.screenshot(path=str(OUT / "public-cards.png"))
    meal_cards.nth(0).click()
    pub.wait_for_timeout(900)
    check("breakfast card pressed", meal_cards.nth(0).get_attribute("aria-pressed") == "true")
    check("breakfast filter shows 1 dish", menu.locator("article").count() == 1
          and "Msemen Test" in menu.locator("article").first.inner_text())
    pub.screenshot(path=str(OUT / "public-breakfast.png"))
    meal_cards.nth(2).click()
    pub.wait_for_timeout(900)
    check("dinner filter shows 12 dishes", menu.locator("article").count() == 12)
    pub.get_by_role("button", name="Tous les plats").click()
    pub.wait_for_timeout(900)
    check("'Tous les plats' shows 13 again", menu.locator("article").count() == 13)

    desk = browser.new_context(viewport={"width": 1366, "height": 900})
    dp = desk.new_page()
    dp.goto(BASE + "/", wait_until="networkidle")
    dp.locator("#menu").scroll_into_view_if_needed()
    dp.wait_for_timeout(1200)
    dp.locator("#menu button[aria-pressed]").nth(1).click()
    dp.wait_for_timeout(900)
    dp.locator("#menu").screenshot(path=str(OUT / "desktop-lunch.png"))
    desk.close()

    # ---------- Gérant: restricted menu, Arabic pages ----------
    gerant = browser.new_context(**p.devices["iPhone 13"])
    gp = gerant.new_page()
    gp.on("pageerror", lambda e: errors.append(str(e)))
    gp.on("dialog", lambda d: d.accept())
    login(gp, "GERANT_LOGIN", "GERANT_PASSWORD")
    gp.wait_for_url("**/admin/configuration/habillage", timeout=30000)
    check("gérant lands on dishes page", gp.url.endswith("/admin/configuration/habillage"))
    gp.wait_for_load_state("networkidle")
    check("page title in Arabic", gp.locator("h1").inner_text().strip() == "الأطباق")
    gp.get_by_role("button", name="القائمة").click()
    gp.wait_for_timeout(600)
    drawer = gp.locator("aside").last
    check("8 greyed sections", drawer.locator('[aria-disabled="true"]').count() == 8)
    check("'الأطباق' link active", drawer.get_by_role("link", name="الأطباق").is_visible())
    check("no Utilisateurs link", drawer.get_by_text("Utilisateurs").count() == 0)
    gp.screenshot(path=str(OUT / "gerant-menu.png"))
    gp.get_by_role("button", name="إغلاق القائمة").click()
    for path in ("/admin/stock", "/admin", "/admin/configuration/utilisateurs"):
        gp.goto(BASE + path, wait_until="networkidle")
        check(f"gérant {path} -> dishes page", gp.url.endswith("/admin/configuration/habillage"))
    status = gp.evaluate("async () => (await fetch('/api/admin/users', {headers: {Accept: 'application/json'}})).status")
    check(f"gérant users API refused ({status})", status == 403)

    tab(gp, "العشاء").click()
    gp.get_by_role("button", name="إضافة طبق إلى العشاء").click()
    gp.wait_for_timeout(500)
    check("form title Arabic", gp.locator("#dish-form-title").inner_text().strip() == "إضافة طبق")
    check("no French fields for gérant", gp.locator("#dish-name").count() == 0 and gp.locator("#dish-desc").count() == 0)
    gp.get_by_role("button", name="إضافة الطبق").click()
    gp.wait_for_timeout(300)
    check("Arabic validation messages", gp.get_by_text("اسم الطبق إجباري.").is_visible())
    fill_dish(gp, "طبق المسير", "طبق تجريبي من المسير.")
    gp.screenshot(path=str(OUT / "gerant-form.png"))
    gp.get_by_role("button", name="إضافة الطبق").click()
    wait_closed(gp)
    gcard = gp.locator("article", has_text="طبق المسير")
    gcard.wait_for(timeout=30000)
    check("gérant dish in dinner tab", gcard.is_visible())
    gp.screenshot(path=str(OUT / "gerant-list.png"))

    api = json.loads(gp.evaluate("async () => JSON.stringify(await (await fetch('/api/dishes')).json())"))
    gdish = next((d for d in api["dishes"] if d["nameAr"] == "طبق المسير"), None)
    check("gérant dish saved with empty French + dinner",
          bool(gdish) and gdish["name"] == "" and gdish["meals"] == ["dinner"])

    pub.goto(BASE + "/", wait_until="networkidle")
    menu = pub.locator("#menu")
    menu.scroll_into_view_if_needed()
    pub.wait_for_timeout(1000)
    pub_card = menu.locator("article", has_text="طبق المسير")
    check("gérant dish visible to visitors", pub_card.count() == 1)
    check("no empty French line", pub_card.locator('h3 [lang="fr"]').count() == 0)

    gcard.get_by_role("button", name="حذف طبق المسير").click()
    gp.locator("article", has_text="طبق المسير").wait_for(state="detached", timeout=30000)
    check("gérant can delete his dish", gp.locator("article", has_text="طبق المسير").count() == 0)

    tab(page, "Petit-déjeuner").click()
    page.get_by_role("button", name="Supprimer Msemen Test").click()
    page.locator("article", has_text="Msemen Test").wait_for(state="detached", timeout=30000)
    check("admin deletes test dish", page.locator("article", has_text="Msemen Test").count() == 0)

    check(f"no JS errors {errors}", not errors)
    browser.close()

failed = [r for r in results if not r[1]]
print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
sys.exit(1 if failed else 0)
