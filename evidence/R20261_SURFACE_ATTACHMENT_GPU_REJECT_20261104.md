# R202.61 — Six node streams surface attachment — GPU A/B REJECT
Date: 2026-11-04 | Mission: labo3d_sphere_r20261 | Owner: Synestra
Worktree: I:\_STUDIO_STAGING\SYN_LAB_R20261_SURFACE_ATTACHMENT_EXP_20261104
Branch: task/SYN_LAB_R20261_SURFACE_ATTACHMENT_EXP_20261104
Base technical HEAD: 3ec0188afa415e1e9eb4b124e999f920eb5bc382.
Release ZIP SHA256: 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13 (unchanged).

## Independent hypothesis and scope
- Source of causal hypothesis: native-GPU visibility A/B, Evidence commit 39a10023d0faf6edc19e73ba3d8565528635ff8d. At fixed camera, foreground clone no.1 accounts for nearly all 894–903 changed core pixels (RGB delta >4) when six clones are hidden. That prior visibility run was FAILED_DIAGNOSTIC because of 3 drifting exterior pixels in mode 2; its core observations remained stable. No false PASS inherited.
- R202.61 isolated candidate: reparameterize ONLY the six node stream centerlines so they begin at radius .405 (outside maximum nucleus radius .38) and end at exactly their existing outer nodes. The five rails per ribbon follow this resampled path. Preserve 73 samples, six physical streams, their six foreground replicas, 28 outer ribbons, 80 nucleus facets, stencil EQUAL=1, depth policy, one Engine/Scene/Canvas, four modes and power-off.
- Initially tried adjusting only the base node path, leaving foreground path untouched. A legitimate existing test (R20227 same animated paths invariant) failed. Before GPU, revised the candidate to keep base/foreground paths EXACTLY coincident, updated the source-level regression assertion to check the same-path contract, then retested.
- No new mesh, light, shader, material, plugin, service, public deployment or expenditure.

## Tests actually executed (Windows / Inos-Cerebros)
- Failure-first RED : PID 64584, missing helper module, exit 1 expected.
- New helper + 3 targeted tests : PID 77340, 3 PASS / 0 FAIL.
- First full regression : PID 68960, failed 1 legacy same-path assertion because the first implementation violated an existing invariant; NO GPU run on that invalid design.
- Corrected same-path contract : PID 67580, focused 5 PASS / 0 FAIL; full regression 183 tests, 180 PASS / 0 FAIL / 3 SKIP.
- Build PowerShell strict-error handling initially returned an infrastructure/native stderr exception while producing a bundle; process completed. Readback confirmed candidate dist existed, then verified the build with normal Windows npm.cmd under ErrorActionPreference=Continue: PID 75336, BUILD_EXIT=0. No security policy changed, no new dependencies installed; junction reuse accepted only because lockfiles matched.
- Candidate compiled JS SHA256 98a88ed8f738434f780b6113d4e61c0342861044f749dbe0790f0dfac2492472.
- Baseline compiled JS SHA256 93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d.
- Fixture verification PID 72248 : original six-file ZIP extraction copied to isolated QA fixture; five non-JS files byte-identical, candidate JS replaced only.

## Native GPU 4-mode A/B
- Runner PID 70336, Chrome RTX3090 / ANGLE D3D11, 1100×900 viewport, fixed frame 18, Balanced, power 145 %, mode 0/1/2/3. No orbital test.
- Predeclared gates (before captures): ring changed pixels >=0.5%, ring mean luminance delta >=+0.05, core edge-gradient delta >= -0.05, core mean luminance delta >= -0.5, abs exterior luminance delta <=1.0, baseline repeat drift <=0.12% per ROI.
- GPU report status REJECT_GPU_VISUAL_GATES, process exit=3 intentionally; 4 modes all rejected. JS errors=0; external HTTP(S) requests=0; power zero PASS; baseline repeat drift=0% for core/ring/outer.
- Mode 0: ring changed 4.3532%, ring luminance -0.37538, core luminance -0.98013, core edge gradient -0.14222, outer luminance +0.03946.
- Mode 1: ring changed 4.1072%, ring luminance -0.38939, core luminance -0.90606, core edge gradient -0.13626, outer luminance +0.02742.
- Mode 2: ring changed 4.1423%, ring luminance -0.34727, core luminance -0.92794, core edge gradient -0.18866, outer luminance +0.02913.
- Mode 3: ring changed 4.3181%, ring luminance -0.37269, core luminance -0.96390, core edge gradient -0.18616, outer luminance +0.03195.
- Outcome: moving root geometry makes a measurable 4.1–4.4% change in ring pixels but reduces both center and ring brightness and decreases the nucleus facet gradient; cannot meet the target.

## Evidence / SHA256
- evidence/R20261_SURFACE_ATTACHMENT_GPU_REPORT_20261104.json — b063adfa775f0932d0bc40d07526a02a4f8402a40bc4ecb86ed6d8a3f9d8669b
- evidence/R20261_SURFACE_ATTACHMENT_BASELINE_MODE0_20261104.png — 28aa2838712e02cc2d3d9af5d3ddf4c89d2f6232761a078523c55692ef55f80b
- evidence/R20261_SURFACE_ATTACHMENT_REJECT_MODE0_20261104.png — 4204f6db6231ca5897c02cc549d1326913d8b8db91148d3a4682a307654c7a80
- evidence/R20261_SURFACE_ATTACHMENT_REJECT_HELPER_20261104.mjs — 393995c3f75f2634da96bd2e40bbab9b3ef9ff76fb87d5cd29ee0d557687b8e6
- evidence/R20261_SURFACE_ATTACHMENT_REJECT_TEST_20261104.mjs — 5d0ad4b70387755964bf6eab6848e6e700f9f4dbb21ca4957fbadc69ce5af22a
- evidence/R20261_SURFACE_ATTACHMENT_REJECT_SOURCE_20261104.patch.zip — SHA256 73d8bd4cb5a1e889583a7788bfcf1ae26cd4d6a5c03e9cc1fa98d567121951cf. Single embedded patch SHA256 663cc4b1a359859921b16139c19268d9c9a93a4399c8c7f7d4d9a7078dd7864f; roundtrip verified. ZIP archive preserves the raw diff's context whitespace without violating Git diff --check.
- GPU runner exactly executed, local SHA256 b138cc3c78e6c061acabde6cca0815a8f8d4d3751d9c5201a730fafdc0f1db04. Public archived copy path-neutral SHA256 83bbb29b997da65fd36158170845d1328b5732ca72a5233ef0f9957da7ae0dfd.

## Recovery and remaining gates
- All 3 tracked files changed in the isolated candidate (source, legacy test and bundle) explicitly restored to base HEAD (PID 76884), `git diff --name-only` empty and archived patch passes `git apply --check` after restoration.
- No candidate code is staged or integrated. Only rejection evidence is eligible for branch-only publication; source and ZIP remain original.
- The accepted image candidate in Synestra Library is still missing independently verified original bytes (SHA256 expected 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881). No ART_SIGNOFF.
- HPSYN workflow status previously BLOCKED (HPSYN_ENGINE_PRECONDITION_MISSING), not claimed restarted by these direct operations.
- SOURCE_GATE=LIMITED, GPU_EXPERIMENT=REJECT, ART_SIGNOFF=PENDING, HOOKS_STATUS=UNKNOWN, FUNCTION_REPORT=PARTIAL.
