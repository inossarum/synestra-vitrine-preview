"""R202.61 fail-closed artistic promotion contract, no GPU or external service."""
import copy
import json
from pathlib import Path
import unittest

from verify_r20261_art_gate import inspect_gate

ROOT = Path(__file__).resolve().parents[1]
GATE = ROOT / "reference/R20261_VISUAL_ART_SOURCE_GATE.json"


class ArtGateContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.canonical = json.loads(GATE.read_text(encoding="utf-8"))

    def check_rejected(self, path, value, marker):
        proposal = copy.deepcopy(self.canonical)
        target = proposal
        for key in path[:-1]:
            target = target[key]
        target[path[-1]] = value
        errors = inspect_gate(proposal, ROOT)
        self.assertTrue(errors, "Gate bypassed for " + repr(path))
        self.assertTrue(any(marker in error for error in errors), errors)

    def test_00_valid_current_hold(self):
        self.assertEqual([], inspect_gate(self.canonical, ROOT))

    def test_01_reject_unsigned_promotion(self):
        self.check_rejected(("gate", "promotable"), True, "PROMOTION")

    def test_02_reject_fake_reference_verification(self):
        self.check_rejected(("gate", "source_sha_verified"), True, "REFERENCE")

    def test_03_reject_fake_native_orbit(self):
        self.check_rejected(("gate", "orbital_gpu_e2e_verified"), True, "ORBIT")

    def test_04_reject_fake_art_signoff(self):
        self.check_rejected(("gate", "art_signoff_verified"), True, "ART_SIGNOFF")

    def test_05_reject_unverified_raw_sha(self):
        self.check_rejected(("art_reference", "actual_sha256"),
                            self.canonical["art_reference"]["expected_sha256"], "RAW_BYTES")

    def test_06_reject_mismatched_expected_sha(self):
        self.check_rejected(("art_reference", "expected_sha256"), "0" * 64, "REFERENCE")

    def test_07_reject_zip_manifest_tampering(self):
        self.check_rejected(("technical_release", "zip_sha256"), "1" * 64, "ZIP")

    def test_08_reject_missing_zip(self):
        missing = ROOT / "release/does-not-exist-r20261.zip"
        self.assertTrue(any("ZIP" in x for x in inspect_gate(self.canonical, ROOT, zip_path=missing)))

    def test_09_reject_altered_reference_bytes(self):
        self.assertTrue(any("REFERENCE" in x for x in
                            inspect_gate(self.canonical, ROOT, reference_bytes=b"not canonical")))

    def test_10_reject_promoted_orbit_state(self):
        self.check_rejected(("pending_qualification", "orbital_test_execution"),
                            "PASS", "ORBIT")

    def test_11_reject_report_sha_change(self):
        self.check_rejected(("verified_gpu_diagnostics", "report_sha256"),
                            "2" * 64, "GPU_REPORT")


if __name__ == "__main__":
    unittest.main()
