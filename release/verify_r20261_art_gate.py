"""R202.61 artistic-source gate — stdlib, fail-closed, read-only.

A technical release PASS never implies artistic sign-off.
This version validates the recorded HOLD state, and MUST NOT approve promotion.
A later art approval requires a separately reviewed gate version and new evidence.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "schema": "synestra.labo3d.r20261.art_source_gate.v1",
    "mission": "labo3d_sphere_r20261",
    "checkpoint": "0176126fd366f647f437c22af1c624cd0a5c5c4b",
    "base": "dd2b0f1eecf3e2782d750df7e4dea811ed285a8d",
    "zip": "5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13",
    "reference_sha": "584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881",
    "reference_blob": "93e6802a3c4e894235aabcd45f1e2ace1e0fba82",
    "gpu_report": "df3d8bf3ddbfa92214012ccfe24f1a211626662876d7c1bb0fb7421910a9728d",
}
INVARIANTS = {
    "engine_count": 1, "scene_count": 1, "canvas_count": 1,
    "core_faces": 80, "ribbons": 28, "nodes": 6, "core_modes": 4,
    "power_zero_required": True,
}


def _digest(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def _git_text_blob(raw: bytes) -> str:
    # Git checkout may normalize the text EOL; the committed blob has LF.
    raw = raw.replace(b"\r\n", b"\n")
    return hashlib.sha1(b"blob " + str(len(raw)).encode("ascii") + b"\x00" + raw).hexdigest()


def inspect_gate(manifest: dict, root: Path, *,
                 zip_path: Path | None = None,
                 reference_bytes: bytes | None = None) -> list[str]:
    """Return errors: [] means only that the current HOLD is valid, NEVER art approval."""
    errors: list[str] = []
    if not isinstance(manifest, dict):
        return ["MANIFEST_NOT_OBJECT"]

    def check(value, expected, code):
        if type(value) is not type(expected) or value != expected:
            errors.append(code)

    check(manifest.get("schema"), EXPECTED["schema"], "SCHEMA")
    check(manifest.get("mission_id"), EXPECTED["mission"], "MISSION")
    check(manifest.get("checkpoint_sha"), EXPECTED["checkpoint"], "CHECKPOINT")
    check(manifest.get("technical_base_sha"), EXPECTED["base"], "BASE_SHA")
    inv = manifest.get("invariants")
    if not isinstance(inv, dict) or inv != INVARIANTS:
        errors.append("INVARIANTS")

    release = manifest.get("technical_release")
    if not isinstance(release, dict):
        errors.append("ZIP_METADATA_MISSING")
    else:
        check(release.get("zip_sha256"), EXPECTED["zip"], "ZIP_MANIFEST_SHA")
        check(release.get("code_changed"), False, "CODE_CHANGE")
        check(release.get("sha_verified_on_pc"), True, "ZIP_PROVENANCE")

    archive = Path(zip_path) if zip_path is not None else root / "release/Synestra_Sphere_R20261_Standalone.zip"
    try:
        if _digest(archive.read_bytes()) != EXPECTED["zip"]:
            errors.append("ZIP_BINARY_SHA")
    except (OSError, ValueError):
        errors.append("ZIP_BINARY_MISSING")

    reference = manifest.get("art_reference")
    if not isinstance(reference, dict):
        errors.append("REFERENCE_METADATA_MISSING")
    else:
        check(reference.get("source_document"), "reference/SPHERE_CANONICAL_20261029.md", "REFERENCE_PATH")
        check(reference.get("source_document_blob_sha"), EXPECTED["reference_blob"], "REFERENCE_DOCUMENT_BLOB")
        check(reference.get("expected_sha256"), EXPECTED["reference_sha"], "REFERENCE_EXPECTED_SHA")
        check(reference.get("dimensions_px"), [1254, 1254], "REFERENCE_DIMENSIONS")
        check(reference.get("owner_accepted_historically"), True, "REFERENCE_HISTORICAL_APPROVAL")
        check(reference.get("visual_preview_available"), True, "REFERENCE_VISUAL_PREVIEW")
        # This version is intentionally HOLD-ONLY. Do not accept a SHA string as
        # evidence of access to the actual Library image.
        if reference.get("actual_sha256") is not None:
            errors.append("RAW_BYTES_UNATTESTED")
        check(reference.get("byte_integrity"), "UNVERIFIED", "RAW_BYTES_INTEGRITY")
        check(reference.get("raw_file_access"), "DENIED", "RAW_BYTES_ACCESS")

    ref_bytes = reference_bytes
    if ref_bytes is None:
        try:
            ref_bytes = (root / "reference/SPHERE_CANONICAL_20261029.md").read_bytes()
        except OSError:
            errors.append("REFERENCE_DOCUMENT_MISSING")
            ref_bytes = b""
    if _git_text_blob(ref_bytes) != EXPECTED["reference_blob"]:
        errors.append("REFERENCE_BLOB_SHA")
    try:
        doc = ref_bytes.decode("utf-8").replace("\r\n", "\n")
    except UnicodeDecodeError:
        doc = ""
    if f"IMAGE_SHA256={EXPECTED['reference_sha']}" not in doc or "IMAGE_DIMENSIONS=1254x1254" not in doc:
        errors.append("REFERENCE_DOCUMENT_CONTRACT")

    gpu = manifest.get("verified_gpu_diagnostics")
    if not isinstance(gpu, dict):
        errors.append("GPU_REPORT_METADATA")
    else:
        check(gpu.get("evidence"), "evidence/R20261_DEPTH_ROI_GPU_DIAGNOSTIC_20261104.md", "GPU_REPORT_PATH")
        check(gpu.get("report_sha256"), EXPECTED["gpu_report"], "GPU_REPORT_MANIFEST_SHA")
        check(gpu.get("modes_verified"), 4, "GPU_MODES")
        check(gpu.get("visual_acceptance_proven"), False, "GPU_NOT_ART_ACCEPTANCE")
    try:
        if _digest((root / "evidence/R20261_DEPTH_ROI_GPU_REPORT_20261104.json").read_bytes()) != EXPECTED["gpu_report"]:
            errors.append("GPU_REPORT_BINARY_SHA")
    except OSError:
        errors.append("GPU_REPORT_MISSING")

    pending = manifest.get("pending_qualification")
    if not isinstance(pending, dict):
        errors.append("ORBIT_STATE_MISSING")
    else:
        check(pending.get("orbital_test_execution"), "NOT_EXECUTED_PRIOR_CALL_DENIED", "ORBIT_STATUS")
        check(pending.get("rtx3090_orbit_e2e"), "NOT_EXECUTED", "ORBIT_RTX")
        check(pending.get("swiftshader_orbit_e2e"), "NOT_EXECUTED", "ORBIT_SW")
        check(pending.get("matched_reference_pixels"), "NOT_COMPUTABLE", "REFERENCE_PIXEL_GATE")
        check(pending.get("owner_art_signoff"), "PENDING", "ART_SIGNOFF_STATUS")

    gate = manifest.get("gate")
    if not isinstance(gate, dict):
        errors.append("PROMOTION_GATE_MISSING")
    else:
        check(gate.get("source_sha_verified"), False, "REFERENCE_FLAG_UNVERIFIED")
        check(gate.get("orbital_gpu_e2e_verified"), False, "ORBIT_FLAG_UNVERIFIED")
        check(gate.get("art_signoff_verified"), False, "ART_SIGNOFF_FLAG_UNVERIFIED")
        check(gate.get("promotable"), False, "PROMOTION_REJECTED")
        check(gate.get("decision"), "HOLD_ARTISTIC_PROMOTION", "PROMOTION_DECISION")

    expected_forbidden = {
        "UNVERIFIED_LIBRARY_IMAGE_AS_SHA_MATCH",
        "NATIVE_GPU_DIAGNOSTIC_AS_ART_SIGNOFF",
        "SOURCE_ONLY_ORBIT_TEST_AS_E2E",
        "REJECTED_MIST_ALPHA_OR_WIDTH_VARIANT",
    }
    if set(manifest.get("forbidden_promotions") or []) != expected_forbidden:
        errors.append("FORBIDDEN_PROMOTIONS_CONTRACT")
    return errors


def main() -> int:
    try:
        data = json.loads((ROOT / "reference/R20261_VISUAL_ART_SOURCE_GATE.json").read_text(encoding="utf-8"))
    except (OSError, ValueError) as ex:
        print("R20261_ART_GATE_FAIL " + json.dumps({"error": "MANIFEST_INVALID", "type": type(ex).__name__}))
        return 2
    errors = inspect_gate(data, ROOT)
    if errors:
        print("R20261_ART_GATE_FAIL " + json.dumps({"errors": errors}))
        return 2
    print("R20261_ART_GATE_PASS_HOLD " + json.dumps({
        "technical_zip_sha256": EXPECTED["zip"],
        "reference_sha_verified": False,
        "native_orbit_e2e_verified": False,
        "art_signoff": "PENDING",
        "promotable": False,
    }))
    return 0


if __name__ == "__main__":
    sys.exit(main())
