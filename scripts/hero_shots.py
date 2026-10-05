"""Screenshots of each public section on phone and desktop."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
OUT = Path(__file__).resolve().parent.parent / "storage" / "hero-shots"
OUT.mkdir(parents=True, exist_ok=True)
SECTIONS = ["menu", "evenements", "pourquoi", "temoignages", "processus", "contact"]

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    for label, opts in {
        "iphone-13": p.devices["iPhone 13"],
        "desktop": {"viewport": {"width": 1440, "height": 900}},
    }.items():
        ctx = browser.new_context(**opts)
        page = ctx.new_page()
        page.goto(BASE + "/", wait_until="networkidle")
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / f"{label}-hero.png"))
        for section in SECTIONS:
            page.locator(f"#{section}").scroll_into_view_if_needed()
            page.evaluate(f"document.getElementById('{section}').scrollIntoView()")
            page.wait_for_timeout(900)
            page.evaluate("window.scrollBy(0, 220)")
            page.wait_for_timeout(700)
            page.screenshot(path=str(OUT / f"{label}-{section}.png"))
        if label == "iphone-13":
            page.get_by_role("button", name="Menu", exact=True).click()
            page.wait_for_timeout(600)
            page.screenshot(path=str(OUT / f"{label}-navmenu.png"))
        ctx.close()
    browser.close()
print(OUT)
