"""Static public-preview contract: no private WebApp execution or exposure."""
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREFIX = "/synestra-vitrine-preview/siteforge/"
PATHS = {
    "/": ROOT / "siteforge" / "index.html",
    "/projects": ROOT / "siteforge" / "projects" / "index.html",
    "/roadmap": ROOT / "siteforge" / "roadmap" / "index.html",
    "/contact": ROOT / "siteforge" / "contact" / "index.html",
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.links = []
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == "a":
            self.links.append(attrs.get("href"))
        if tag == "h1":
            self.h1_count += 1


class SiteForgePreviewTests(unittest.TestCase):
    def test_existing_public_landing_links_to_preview_without_exposing_secrets(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="./siteforge/"', html)
        self.assertIn("Démo SiteForge", html)
        self.assertIn('content="noindex,nofollow"', html)
        self.assertNotIn("cloudflareaccess.com", html.lower())

    def test_four_routes_have_safe_publishing_contract(self):
        for route, path in PATHS.items():
            with self.subTest(route=route):
                html = path.read_text(encoding="utf-8")
                parsed = PageParser()
                parsed.feed(html)
                self.assertEqual(parsed.h1_count, 1)
                self.assertIn('content="noindex,nofollow"', html)
                self.assertIn("Content-Security-Policy", html)
                self.assertNotIn("Contenu d'exemple à personnaliser", html)
                self.assertFalse({tag for tag, _ in parsed.tags} & {"script", "iframe", "form"})
                self.assertTrue(all(link.startswith(PREFIX) or link == "#main" for link in parsed.links))
                self.assertIn(PREFIX, parsed.links)
                for child in ("/projects", "/roadmap", "/contact"):
                    self.assertIn(PREFIX + child.lstrip("/") + "/", parsed.links)
                expected = ("https://inossarum.github.io" + PREFIX +
                            (route.lstrip("/") + "/" if route != "/" else ""))
                self.assertIn('rel="canonical" href="' + expected + '"', html)
                self.assertEqual(sum(
                    1 for tag, attrs in parsed.tags
                    if tag == "a" and attrs.get("aria-current") == "page"), 1)

    def test_copy_discloses_preview_and_no_automatic_permission(self):
        home = PATHS["/"].read_text(encoding="utf-8")
        contact = PATHS["/contact"].read_text(encoding="utf-8")
        self.assertIn("démonstration statique", home)
        self.assertIn("ne collecte aucune donnée personnelle", contact)
        for p in PATHS.values():
            html = p.read_text(encoding="utf-8")
            self.assertNotIn("remoteActionAuthorized", html)
            self.assertNotIn("ACCESS_JWKS", html)
            self.assertNotIn("Bearer ", html)

    def test_three_modern_styles_and_native_disclosure(self):
        base = ROOT / "siteforge"
        for style, folder in (("aurora", ""), ("atelier", "atelier"), ("mono", "mono")):
            pages_root = base / folder
            for route in ("", "projects", "roadmap", "contact"):
                file = pages_root / route / "index.html"
                with self.subTest(style=style, route=route):
                    self.assertTrue(file.is_file())
                    html = file.read_text(encoding="utf-8")
                    self.assertIn('class="sf-designed sf-' + style + '"', html)
                    self.assertIn('prefers-reduced-motion:reduce', html)
                    self.assertIn('noindex,nofollow', html)
                    self.assertIn('Styles SiteForge', html)
                    self.assertIn('href="' + PREFIX + '"', html)
                    self.assertIn('href="' + PREFIX + 'atelier/"', html)
                    self.assertIn('href="' + PREFIX + 'mono/"', html)
                    self.assertNotIn("<script", html.lower())
                    self.assertNotIn("<iframe", html.lower())
                    self.assertNotIn("<form", html.lower())
                    self.assertNotIn("Contenu d'exemple à personnaliser", html)
                    if not route:
                        self.assertIn('class="sf-reveal"', html)
                        self.assertIn('<summary>Découvrir les étapes</summary>', html)
                    expected_root = PREFIX if not folder else PREFIX + folder + "/"
                    parser = PageParser()
                    parser.feed(html)
                    self.assertEqual(parser.h1_count, 1)
                    for name in ("projects", "roadmap", "contact"):
                        self.assertIn(expected_root + name + "/", parser.links)


if __name__ == "__main__":
    unittest.main()
