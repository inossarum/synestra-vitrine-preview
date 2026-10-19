"""Synestra Signal: isolated public demo, fictional data only."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "signal"


class SignalPreviewTests(unittest.TestCase):
    def test_five_static_files_and_proofpath_contract(self):
        names = ("index.html", "signal.css", "signal.js", "experience.json", "experience-data.js")
        for name in names:
            self.assertTrue((ROOT / name).is_file(), name)
        model = json.loads((ROOT / "experience.json").read_text(encoding="utf-8"))
        self.assertTrue(model["synthetic"])
        self.assertEqual(model["schema"], "synestra.proofpath.machine.v0")
        self.assertEqual([j["intent"] for j in model["journeys"]], ["explorer", "comparer", "verifier"])
        self.assertEqual(sum(len(j["items"]) for j in model["journeys"]), 6)
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertEqual(html.count("<h1 "), 1)
        self.assertEqual(html.count('data-fact-id='), 6)
        self.assertIn(model["digest"][:12], html)

    def test_fail_closed_public_security_contract(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        js = (ROOT / "signal.js").read_text(encoding="utf-8")
        css = (ROOT / "signal.css").read_text(encoding="utf-8")
        for text in ("noindex,nofollow", "connect-src 'none'", "script-src 'self'", "prefers-reduced-motion"):
            self.assertIn(text, html + css)
        for token in ("window.location.href='https:", "fetch(", "XMLHttpRequest", "navigator.sendBeacon", "localStorage"):
            self.assertNotIn(token, js)
        for token in ("<iframe", "onclick=", "onerror=", "https://fonts.", "https://cdn."):
            self.assertNotIn(token, html)
        self.assertIn("FICTION", html)

    def test_controls_are_real_and_with_reduced_motion(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        js = (ROOT / "signal.js").read_text(encoding="utf-8")
        for token in ('id="motion-toggle"', 'data-intent="explorer"', 'data-intent="comparer"', 'data-intent="verifier"', 'aria-pressed'):
            self.assertIn(token, html)
        for token in ("requestAnimationFrame", "cancelAnimationFrame", "reduced.matches", "if(!running)render"):
            self.assertIn(token, js)


if __name__ == "__main__":
    unittest.main()
