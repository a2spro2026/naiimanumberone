"""Smoke-test the site at phone sizes: horizontal overflow, cart flow, admin flow, screenshots."""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
OUT = Path(__file__).resolve().parent.parent / "storage" / "mobile-shots"
OUT.mkdir(parents=True, exist_ok=True)

DEVICES = ["iPhone SE", "iPhone 13", "Galaxy S9+"]
OVERFLOW_JS = """() => {
  const w = document.documentElement.clientWidth;
  return [...document.querySelectorAll('body *')]
    .filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > w + 1 && getComputedStyle(el).position !== 'fixed'; })
    .filter(el => !el.closest('.swiper'))
    .slice(0, 8)
    .map(el => el.tagName + '.' + String(el.className).slice(0, 60));
}"""

problems = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    for name in DEVICES:
        ctx = browser.new_context(**p.devices[name])
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        slug = name.replace(" ", "-").replace("+", "plus")

        page.goto(BASE + "/", wait_until="networkidle")
        page.screenshot(path=str(OUT / f"{slug}-hero.png"))
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(800)
        page.evaluate("window.scrollTo(0, 0)")
        overflow = page.evaluate(OVERFLOW_JS)
        if overflow:
            problems.append(f"{name} home overflow: {overflow}")

        page.locator("#menu").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.get_by_role("button", name="Ajouter Tajine", exact=False).first.click()
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / f"{slug}-toast.png"))
        page.get_by_role("navigation", name="Actions rapides").get_by_role("button").click()
        page.wait_for_timeout(600)
        page.get_by_role("button", name="Augmenter", exact=False).first.click()
        page.screenshot(path=str(OUT / f"{slug}-cart.png"))
        page.get_by_role("button", name="Fermer le panier").last.click()
        page.wait_for_timeout(400)

        page.get_by_role("button", name="Menu", exact=True).click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / f"{slug}-menu.png"))
        page.get_by_role("button", name="Fermer", exact=True).click()

        page.locator("#evenements").scroll_into_view_if_needed()
        page.wait_for_timeout(700)
        page.screenshot(path=str(OUT / f"{slug}-events.png"))

        page.goto(BASE + "/admin/login", wait_until="networkidle")
        page.screenshot(path=str(OUT / f"{slug}-login.png"))
        for selector, key in (("#admin-login", "ADMIN_LOGIN"), ("#admin-password", "ADMIN_PASSWORD")):
            page.click(selector)
            page.fill(selector, os.environ[key])
        page.get_by_role("button", name="Se connecter").click()
        page.wait_for_url("**/admin")
        page.goto(BASE + "/admin/fournisseurs", wait_until="networkidle")
        page.screenshot(path=str(OUT / f"{slug}-admin-table.png"), full_page=True)
        overflow = page.evaluate(OVERFLOW_JS)
        if overflow:
            problems.append(f"{name} admin overflow: {overflow}")
        page.get_by_role("button", name="Menu admin").click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / f"{slug}-admin-menu.png"))
        page.get_by_role("link", name="Habillage").last.click()
        page.wait_for_timeout(600)
        page.screenshot(path=str(OUT / f"{slug}-habillage.png"))
        overflow = page.evaluate(OVERFLOW_JS)
        if overflow:
            problems.append(f"{name} habillage overflow: {overflow}")
        print(f"  {name} hover media: {page.evaluate('matchMedia(\"(hover: hover)\").matches')}")
        page.get_by_role("heading", name="Menu des plats").scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.screenshot(path=str(OUT / f"{slug}-habillage-dishes.png"))

        if errors:
            problems.append(f"{name} JS errors: {errors}")
        print(f"{name}: OK")
        ctx.close()
    browser.close()

print("\n".join(problems) if problems else "NO PROBLEMS")
print(f"Screenshots: {OUT}")
