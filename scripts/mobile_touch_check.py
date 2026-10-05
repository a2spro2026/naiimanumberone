"""Screenshots with real touch-device media (hover: none), which Chromium's device presets don't emulate."""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
OUT = Path(__file__).resolve().parent.parent / "storage" / "mobile-shots"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    ctx = browser.new_context(**p.devices["iPhone 13"])
    page = ctx.new_page()
    cdp = ctx.new_cdp_session(page)
    cdp.send(
        "Emulation.setEmulatedMedia",
        {"features": [{"name": "hover", "value": "none"}, {"name": "pointer", "value": "coarse"}]},
    )

    page.goto(BASE + "/", wait_until="networkidle")
    print("hover:", page.evaluate('matchMedia("(hover: hover)").matches'))
    page.locator("#galerie").scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    page.screenshot(path=str(OUT / "touch-gallery.png"))
    page.get_by_role("button", name="Menu", exact=True).click()
    page.wait_for_timeout(600)
    page.screenshot(path=str(OUT / "touch-menu-scrolled.png"))

    page.goto(BASE + "/admin/login", wait_until="networkidle")
    for selector, key in (("#admin-login", "ADMIN_LOGIN"), ("#admin-password", "ADMIN_PASSWORD")):
        page.click(selector)
        page.fill(selector, os.environ[key])
    page.get_by_role("button", name="Se connecter").click()
    page.wait_for_url("**/admin")
    page.goto(BASE + "/admin/configuration/habillage", wait_until="networkidle")
    page.screenshot(path=str(OUT / "touch-habillage.png"))
    page.get_by_role("heading", name="Menu des plats").scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=str(OUT / "touch-habillage-dishes.png"))
    browser.close()
