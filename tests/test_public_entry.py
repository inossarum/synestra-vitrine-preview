"""Static public entry contract. No authenticated E2E claim."""
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
TARGET = "https://synestra-client-portal-staging.synestra-studio.workers.dev/studio/continuity/"
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
ENTRY = (ROOT / "connexion/index.html").read_text(encoding="utf-8")

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.buttons = [], []
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"script", "form", "input", "iframe", "object", "embed"}:
            raise AssertionError("Public entry must not handle credentials or executable content")
        if any(k.startswith("on") for k in attrs):
            raise AssertionError("Inline handler forbidden")
        if tag == "a":
            self.links.append(attrs)
        if tag == "button":
            self.buttons.append(attrs)

class PublicEntryTests(unittest.TestCase):
    def test_01_no_credential_collection(self):
        for html in (HTML, ENTRY):
            Page(html)
            for forbidden in ("localStorage", "document.cookie", "PRESIDENT_VERIFIED_EMAIL", "client_secret", 'type="password"'):
                self.assertNotIn(forbidden, html)
    def test_02_no_public_private_bypass(self):
        for link in Page(HTML).links:
            self.assertFalse(link.get("href", "").startswith("https://"))
        external = [a for a in Page(ENTRY).links if a.get("href", "").startswith("https://")]
        self.assertEqual([a["href"] for a in external], [TARGET])
        for a in external:
            u = urlparse(a["href"])
            self.assertEqual(u.scheme, "https")
            self.assertFalse(u.username or u.password or u.query or u.fragment)
            self.assertIn("noreferrer", a.get("rel", ""))
    def test_03_google_not_falsely_enabled(self):
        buttons = Page(ENTRY).buttons
        self.assertEqual(len(buttons), 1)
        self.assertIn("disabled", buttons[0])
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

if __name__ == "__main__":
    unittest.main()
