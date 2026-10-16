"""Contract tests for the Synestra public preview -> private WebApp entry.

Source-only checks: never claim a live authenticated President session.
"""
from __future__ import annotations

import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

HTML = (Path(__file__).resolve().parents[1] / "index.html").read_text(encoding="utf-8")
APP = "https://synestra-client-portal.synestra-studio.workers.dev/"


class Anchors(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchors = []
        self._current = None

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self._current = {"attrs": dict(attrs), "text": ""}
        if tag in {"script", "form", "iframe"}:
            raise AssertionError("public vitrine must remain a static, unauthenticated entry")

    def handle_data(self, data):
        if self._current is not None:
            self._current["text"] += data

    def handle_endtag(self, tag):
        if tag == "a" and self._current is not None:
            self.anchors.append(self._current)
            self._current = None


class PublicEntryTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.page = Anchors()
        cls.page.feed(HTML)

    def test_branding_and_no_tracking_script(self):
        self.assertIn('<html lang="fr">', HTML)
        self.assertIn('content="noindex,nofollow"', HTML)
        self.assertIn("Content-Security-Policy", HTML)

    def test_public_vitrine_has_explicit_nav_login(self):
        self.assertIn('aria-label="Navigation principale"', HTML)
        self.assertTrue(
            any(a["attrs"].get("href") == APP and "Se connecter" in a["text"]
                for a in self.page.anchors),
            "Login must be visible in header navigation, not only below the fold",
        )

    def test_hero_login_uses_same_known_private_app(self):
        self.assertTrue(
            any(a["attrs"].get("href") == APP
                and "action primary" in a["attrs"].get("class", "")
                for a in self.page.anchors)
        )

    def test_all_private_links_use_https_known_host_and_no_inline_credentials(self):
        private = [a for a in self.page.anchors if a["attrs"].get("href", "").startswith("https://")]
        self.assertGreaterEqual(len(private), 2)
        for a in private:
            u = urlparse(a["attrs"]["href"])
            self.assertEqual(a["attrs"]["href"], APP)
            self.assertEqual(u.scheme, "https")
            self.assertFalse(u.username or u.password or u.query or u.fragment)
            self.assertIn("noreferrer", a["attrs"].get("rel", ""))
        self.assertNotIn("cloudflareaccess.com", HTML.lower())
        self.assertNotIn("PRESIDENT_VERIFIED_EMAIL", HTML)

    def test_no_synthetic_login_or_implied_remote_permissions(self):
        self.assertNotIn("localStorage", HTML)
        self.assertNotIn("document.cookie", HTML)
        self.assertNotIn("type=\"password\"", HTML)
        self.assertIn("phase pilote", HTML.lower())


    def test_unqualified_security_claim_is_not_published(self):
        self.assertNotIn("la connexion à l'espace privé est sécurisée", HTML.lower())
        self.assertIn("l'accès au portail et le parcours de connexion sont encore en cours de qualification", HTML.lower())

if __name__ == "__main__":
    unittest.main()
