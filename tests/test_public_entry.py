"""Static public entry contract. No authenticated E2E claim."""
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
TARGET = "https://synestra-client-portal-staging.synestra-studio.workers.dev/studio/continuity/"
OFFICIAL_SITE = "https://c8e9901c.synestra-vitrine-preview.pages.dev/"
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
ENTRY = (ROOT / "connexion/index.html").read_text(encoding="utf-8")

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.buttons, self.inputs = [], [], []
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"script", "form", "iframe", "object", "embed"}:
            raise AssertionError("Public entry must not handle credentials or executable content")
        if any(k.startswith("on") for k in attrs):
            raise AssertionError("Inline handler forbidden")
        if tag == "input":
            if "disabled" not in attrs or "name" in attrs or "value" in attrs:
                raise AssertionError("Credential fields must be disabled and unbound")
            self.inputs.append(attrs)
        if tag == "a":
            self.links.append(attrs)
        if tag == "button":
            self.buttons.append(attrs)

class PublicEntryTests(unittest.TestCase):
    def test_01_no_credential_collection(self):
        for html in (HTML, ENTRY):
            Page(html)
            for forbidden in ("localStorage", "document.cookie", "PRESIDENT_VERIFIED_EMAIL", "client_secret"):
                self.assertNotIn(forbidden, html)
    def test_02_no_public_private_bypass(self):
        for link in Page(HTML).links:
            self.assertFalse(link.get("href", "").startswith("https://"))
        external = [a for a in Page(ENTRY).links if a.get("href", "").startswith("https://")]
        self.assertEqual([a["href"] for a in external], [TARGET, OFFICIAL_SITE])
        for a in external:
            u = urlparse(a["href"])
            self.assertEqual(u.scheme, "https")
            self.assertFalse(u.username or u.password or u.query or u.fragment)
            self.assertIn("noreferrer", a.get("rel", ""))
    def test_09_official_site_destination(self):
        links = [a for a in Page(ENTRY).links if a.get("class") == "site"]
        self.assertEqual(len(links), 1)
        self.assertEqual(links[0].get("href"), OFFICIAL_SITE)
        self.assertIn("noreferrer", links[0].get("rel", ""))

    def test_03_google_not_falsely_enabled(self):
        buttons = Page(ENTRY).buttons
        self.assertEqual(len(buttons), 4)
        self.assertTrue(all("disabled" in b for b in buttons))
        self.assertEqual([b.get("aria-label") for b in buttons[1:]], ["Google — indisponible", "ChatGPT — indisponible", "GitHub — indisponible"])
        self.assertIn("indisponible", ENTRY)
    def test_04_vitrine_links_enter_public_portal(self):
        links = [a for a in Page(HTML).links if a.get("href") == "./connexion/"]
        self.assertEqual(len(links), 2)
        self.assertTrue(any("login" in a.get("class", "") for a in links))
        self.assertTrue(any("action primary" in a.get("class", "") for a in links))
    def test_05_portal_headers(self):
        h = (ROOT / "_headers").read_text(encoding="utf-8")
        for required in ("Cache-Control: no-store", "Referrer-Policy: no-referrer", "X-Frame-Options: DENY", "frame-ancestors 'none'", "form-action 'none'"):
            self.assertEqual(h.count(required), 2)
    def test_06_preserve_vitrine_brand(self):
        for html in (HTML, ENTRY):
            self.assertIn('<html lang="fr">', html)
            self.assertIn('content="noindex,nofollow"', html)
            self.assertIn("--studio-cyan:#86e0f0", html)
            self.assertIn("Content-Security-Policy", html)
    def test_07_pilot_scope_honest(self):
        self.assertIn("préversion", ENTRY.lower())
        self.assertIn("propriétaire", ENTRY.lower())
        self.assertIn("aucune mission", ENTRY.lower())

    def test_08_approved_mockup_layout_and_disabled_fields(self):
        p = Page(ENTRY)
        self.assertEqual([i.get("type") for i in p.inputs], ["email", "password"])
        self.assertIn('class="logo" src="data:image/png;base64,', ENTRY)
        self.assertIn('<h1 id="connexion">Connexion</h1>', ENTRY)
        self.assertIn("Mot de passe oublié ?", ENTRY)
        self.assertIn("Site officiel", ENTRY)
        self.assertIn("grid-template-columns:repeat(3,minmax(0,1fr))", ENTRY)
        self.assertIn("img-src data:", ENTRY)

if __name__ == "__main__":
    unittest.main()
