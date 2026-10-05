"""End-to-end check of admin login security and Configuration > Utilisateurs.

Requires ADMIN_LOGIN / ADMIN_PASSWORD in the environment.
"""
import os
import sys
import urllib.request
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000"
OUT = Path(__file__).resolve().parent.parent / "storage" / "admin-shots"
OUT.mkdir(parents=True, exist_ok=True)
ADMIN_LOGIN = os.environ["ADMIN_LOGIN"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
TEST_LOGIN = "test.livreur"
TEST_PASSWORD = "Livreur2026"
results = []


def check(label, ok):
    results.append((label, ok))
    print(("OK   " if ok else "FAIL ") + label)


def type_in(page, selector, value):
    page.click(selector)
    page.fill(selector, value)


def login(page, user, password):
    page.goto(BASE + "/admin/login", wait_until="networkidle")
    type_in(page, "#admin-login", user)
    type_in(page, "#admin-password", password)
    page.get_by_role("button", name="Se connecter").click()


with urllib.request.urlopen(BASE + "/admin/login") as r:
    check("Cache-Control no-store on /admin", "no-store" in (r.headers.get("Cache-Control") or ""))

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge")
    for label, opts in {
        "desktop": {"viewport": {"width": 1366, "height": 860}},
        "iphone": p.devices["iPhone 13"],
    }.items():
        ctx = browser.new_context(**opts)
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        page.goto(BASE + "/admin", wait_until="networkidle")
        check(f"[{label}] /admin redirects to login", page.url.endswith("/admin/login"))
        check(f"[{label}] panel visible directly", page.locator("#admin-login").is_visible())
        login_input = page.locator("#admin-login")
        pwd_input = page.locator("#admin-password")
        check(f"[{label}] fields empty", login_input.input_value() == "" and pwd_input.input_value() == "")
        check(f"[{label}] no name attributes", login_input.get_attribute("name") is None and pwd_input.get_attribute("name") is None)
        check(f"[{label}] readonly until focus", login_input.get_attribute("readonly") is not None)
        type_in(page, "#admin-login", ADMIN_LOGIN)
        type_in(page, "#admin-password", ADMIN_PASSWORD)
        masked = page.evaluate(
            "() => { const s = getComputedStyle(document.getElementById('admin-login')); return s.webkitTextSecurity || s.getPropertyValue('-webkit-text-security'); }"
        )
        check(f"[{label}] login masked ({masked})", masked == "disc" or login_input.get_attribute("type") == "password")
        check(f"[{label}] password masked", pwd_input.get_attribute("type") == "password")
        page.screenshot(path=str(OUT / f"{label}-login-filled.png"))
        page.get_by_role("button", name="Afficher le login").click()
        check(f"[{label}] eye reveals login", page.evaluate("getComputedStyle(document.getElementById('admin-login')).webkitTextSecurity") in ("none", ""))

        page.get_by_role("button", name="Se connecter").click()
        page.wait_for_url("**/admin", timeout=10000)
        check(f"[{label}] admin login works", True)

        page.goto(BASE + "/admin/configuration/utilisateurs", wait_until="networkidle")
        expect(page.get_by_role("heading", name="Utilisateurs")).to_be_visible()
        check(f"[{label}] admin hidden from table", ADMIN_LOGIN not in page.content())

        page.get_by_role("button", name="Ajouter", exact=True).first.click()
        page.wait_for_timeout(400)
        options = page.locator("#user-role option").all_inner_texts()
        check(f"[{label}] no admin status option {options}", not any("admin" in o.lower() for o in options))
        check(f"[{label}] status has no default", page.locator("#user-role").input_value() == "")
        page.screenshot(path=str(OUT / f"{label}-user-form.png"))

        if label == "desktop":
            page.fill("#user-name", "Test Livreur")
            page.fill("#user-contact", "0612345678")
            page.select_option("#user-role", "livreur")
            type_in(page, "#user-login", TEST_LOGIN)
            type_in(page, "#user-password", TEST_PASSWORD)
            page.locator("form").get_by_role("button", name="Ajouter").click()
            page.wait_for_timeout(1200)
            check("user created in table", TEST_LOGIN in page.content())
            page.screenshot(path=str(OUT / "desktop-users-table.png"))
        else:
            page.get_by_role("button", name="Annuler").click()
            page.wait_for_timeout(400)
            page.screenshot(path=str(OUT / "iphone-users-list.png"), full_page=True)

        if label == "iphone":
            page.get_by_role("button", name="Déconnexion").click()
        else:
            page.get_by_role("button", name="Déconnexion").first.click()
        page.wait_for_url("**/admin/login")
        page.go_back()
        page.wait_for_timeout(500)
        try:
            page.wait_for_url("**/admin/login", timeout=8000)
            back_ok = True
        except Exception:
            back_ok = False
        check(f"[{label}] back after logout returns to login", back_ok)
        check(f"[{label}] fields empty after back", page.locator("#admin-login").input_value() == "")
        check(f"[{label}] no JS errors {errors}", not errors)
        ctx.close()

    # Non-admin user: no access to Utilisateurs
    ctx = browser.new_context(viewport={"width": 1366, "height": 860})
    page = ctx.new_page()
    login(page, TEST_LOGIN, TEST_PASSWORD)
    page.wait_for_url("**/admin", timeout=10000)
    check("non-admin can log in", True)
    check("non-admin has no Utilisateurs link", page.get_by_role("link", name="Utilisateurs").count() == 0)
    status = page.evaluate(
        "async () => (await fetch('/api/admin/users', {headers: {Accept: 'application/json'}})).status"
    )
    check(f"non-admin API /users forbidden ({status})", status == 403)
    page.goto(BASE + "/admin/configuration/utilisateurs", wait_until="networkidle")
    check("non-admin redirected away from Utilisateurs", page.url.rstrip("/").endswith("/admin"))
    ctx.close()

    # Wrong password
    ctx = browser.new_context()
    page = ctx.new_page()
    login(page, ADMIN_LOGIN, "mauvais")
    try:
        page.get_by_role("alert").wait_for(timeout=10000)
        rejected = "/admin/login" in page.url
    except Exception:
        rejected = False
    check("wrong password rejected", rejected)
    page.screenshot(path=str(OUT / "wrong-password.png"))
    ctx.close()

    # Cleanup: delete test user as admin
    ctx = browser.new_context(viewport={"width": 1366, "height": 860})
    page = ctx.new_page()
    login(page, ADMIN_LOGIN, ADMIN_PASSWORD)
    page.wait_for_url("**/admin", timeout=10000)
    page.goto(BASE + "/admin/configuration/utilisateurs", wait_until="networkidle")
    page.on("dialog", lambda d: d.accept())
    page.get_by_role("button", name="Supprimer Test Livreur").click()
    page.wait_for_timeout(1000)
    check("test user deleted", TEST_LOGIN not in page.content())
    ctx.close()
    browser.close()

failed = [r for r in results if not r[1]]
print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
sys.exit(1 if failed else 0)
