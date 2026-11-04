# R202.61 — Test GPU A/B « Mist Root Relief » — REJECT

Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Owner : Synestra | execution host : Inos-Cerebros (Windows, Chrome ANGLE D3D11 RTX 3090).
Base immutable HEAD : 3ec0188afa415e1e9eb4b124e999f920eb5bc382.
Isolated worktree : I:\\_STUDIO_STAGING\\SYN_LAB_R20261_MIST_ROOT_RELIEF_20261104.
Branch : task/SYN_LAB_R20261_MIST_ROOT_RELIEF_20261104.
Baseline ZIP SHA256 : 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.
Art image SHA256 (expected but raw bytes unverified) : 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881.

## Novel hypothesis
Only the ROOT segment of the existing core plasma diffusion meshes was moved outside the faceted nucleus, using a pure 3D path resampling to minimum radius .44 (nucleus radius ~.426 before quality scaling). Existing 18 mist meshes, widths, alpha, outer endpoints, 80-facet core, 28 ribbons, 6 node connections, 4 modes, 1 Engine/Scene/Canvas are preserved. This was NOT a repeat of the globally reduced alpha/width variants already rejected.

## Failure-first, tests and build
- Fresh clean worktree from exact commit; no modifications to original mission branch.
- Failure-first PID 54376: targeted test RED (missing helper module), exit 1 expected.
- Helper and integration: `core-mist-root-relief.mjs`, `main.js` candidate only.
- Targeted PID 52200: 3 PASS, 0 FAIL.
- Full Node suite PID 45252: 183 tests; 180 PASS, 0 FAIL, 3 SKIP, exit 0.
- Build PID 45252: exit 0; candidate Babylon bundle SHA256 afccbf095c7fa9ec31ef2167b6b325b85037802f15eb0771d4c14ccb48135492.
- Dependency reuse: node_modules junction points to a previously validated matching package-lock snapshot; no package installation.
- Windows PowerShell blocked npm.ps1; used normal npm.cmd CLI without changing execution policies.

## Native GPU A/B (original ZIP extracted vs candidate fixture)
- Chrome RTX3090 (not simulated), 1100x900 viewport, frame=18, Balanced, power=145%, mode 0/1/2/3, fixed camera, candidate bundle swapped in an otherwise identical six-file fixture. No orbit test.
- Native GPU run PID 47168, exit 3 because artistic metrics rejected; JS errors 0, external network requests 0, power zero PASS.
- Identity checks: actual renderer RTX3090, nucleus and stencil mask both 80 faces, ribbon count 28, node count 6, 1 canvas, WebGL context not lost, all 4 modes.
- Deterministic baseline-to-baseline retest drift: 0% in ROI. No attempt to treat this as an owner signoff.
- Predeclared thresholds: core changed >= 0.12%; core edge gradient gain >= +0.10; core mean luminance delta >= -1; abs outer mean luminance delta <= 1; drift <= 0.12%.
- Mode 0: core mean -4.3031, core edge +0.02854, core changed 16.3277%, outer mean -0.00744 => REJECT.
- Mode 1: core mean -4.9490, core edge +0.04975, core changed 20.8912%, outer mean -0.00332 => REJECT.
- Mode 2: core mean -4.7921, core edge +0.01133, core changed 13.9385%, outer mean +0.00080 => REJECT.
- Mode 3: core mean -4.4460, core edge +0.01384, core changed 19.9983%, outer mean -0.00023 => REJECT.
- This variant does not achieve a brighter/more legible white-violet core; it loses central brightness. ROI metrics from the 4-mode native report were corroborated by direct viewing of the original and variant mode-0 captures.

## Durable Evidence
- `evidence/R20261_ROOT_RELIEF_GPU_AB_REJECT_20261104.json` SHA256 302e2b65c864f945ea57eca52979576bec22933826c3876c1f5c2bf2f274dbb8.
- `evidence/R20261_ROOT_RELIEF_BASELINE_MODE0_20261104.png` SHA256 79b489a7ce04ebc482f202d62a15891e11ca9983ce76b573f64ba39ef774ecdc.
- `evidence/R20261_ROOT_RELIEF_REJECT_MODE0_20261104.png` SHA256 aab51fc1c85ad542e805fcd53c3723b3e57720c72d3be5103b571fced4b0e0f4.
- `evidence/R20261_ROOT_RELIEF_REJECTED_MAIN_20261104.patch` SHA256 d9e52d7108940f609f626e0399e26cc24b7be18100d3df42475946a7d5f85dc2.
- `evidence/R20261_ROOT_RELIEF_REJECTED_HELPER_20261104.mjs` SHA256 cf37a256284333473dba6ff39c20568f70c889412d9525a012dcd02ff415c442.
- `evidence/R20261_ROOT_RELIEF_REJECTED_TEST_20261104.mjs` SHA256 17fe09338c09bbbaa0782913ac36c83b3033ca9b2e7f708a36a039bb2788a2fe.
- Local experiment script SHA256 7051f368f71e77f2cbeb3b3eabc193b84f2a25027e56148e4e53e74fa88a0218; not committed (machine-specific paths).
- Candidate fixture and remaining captures stay in isolated QA root, not source/release.
- After recording results, tracked `lab-babylon/src/main.js` and `lab-babylon/dist/babylon-lab.js` were restored to HEAD by git restore, with tracked diff empty. Official ZIP untouched.

## Decision / limits
GPU_DIAGNOSTIC=PASS | NEW_VISUAL_VARIANT=REJECT | ART_SIGNOFF=PENDING.
No owner approval; no production or release promotion, no main push/merge/deployment.
Previous orbital test with OpenAI policy denial NOT rerun; this is a different fixed-angle A/B.
SOURCE_GATE=LIMITED (Memory V1 and reference original bytes not fully attested) ; HOOKS_STATUS=UNKNOWN ; FUNCTION_REPORT=PARTIAL.
