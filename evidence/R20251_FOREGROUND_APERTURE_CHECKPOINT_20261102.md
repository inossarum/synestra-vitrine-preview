# Labo 3D R202.51 — Front-volume aperture (isolated candidate)

STATUS=PARTIAL | ART_SIGNOFF=PENDING | NO_MERGE | NO_DEPLOY | FREE_ONLY

## Identity / provenance
- Repository: inossarum/synestra-vitrine-preview
- Dedicated task branch: task/SYN_LAB_R20251_VOLUME_APERTURE_HPSYN_20261102
- Immutable source baseline: task/SYN_LAB_R20249_COMPOSITION_CAUSAL_DIAGNOSTIC_20261102 @ 60171bb17d038c7d05b1e1d09cb953f0d496380c
- Separate competing branch R20250 NOT MODIFIED.
- Relevant prior evidence: evidence/R20249_HPSYN_CDP_DIAGNOSTIC_20261102.md @ dc3c7e22f9438f1c123af6eca13ea493aa15e82c
- Source rules: inossarum/studio-virtuel AGENTS.md @ 7464dbb5e7fa43842556c57c727210d7e8d5db50
- Skill snapshot: a2d091230e10b2212e91d155260dd506849d3da1. Applied debugging, visual-diff-iteration, git-worktrees; dependency metadata consulted.

## Hypothesis and minimal delta
At fixed frame 6, ultra, 145% power, R20249 volume removal changed 47.42% of sampled reactor pixels versus 4.13% for nucleus removal and 1.20% for analytic emission removal. The frontal raymarched volume is the dominant occluder in this view.

In the existing `lab-babylon/src/plasma-volume-r20215.js` GLSL, preserve R202.43 coreAperture and add a front-of-core sample window gated by ray/core impact. Maximum added attenuation is 68% only for center-facing front samples. Rear samples and outside-core peripheral plasma retain previous opacity. Same volume sphere, material, uniforms, render clock and max 16 raymarch steps. No changes to R20250, R20249, main or other worktrees.

## Test record
- FAILURE-FIRST: `node --test lab-babylon/tests/r20251-foreground-volume-window.test.mjs` before shader patch: 3 total / 2 PASS / 1 FAIL (expected assertion that new GLSL window did not exist).
- AFTER PATCH: same command: 3 PASS / 0 FAIL; numeric CPU window checks foreground < rear, peripheral == legacy, rear == R202.43 legacy; source shader regression and geometry/step guards.
- `node --check lab-babylon/src/plasma-volume-r20215.js`: exit 0.
- `git diff --check`: exit 0.
- Failing security precondition: `npm.cmd ci --offline --no-audit --no-fund --prefix <isolated-lab-dir>` denied by platform safety controls before package installation. DO NOT circumvent or retry via alternate tooling; build, full 141+ regression and GPU/CDP A/B of R20251 are NOT RUN and must not be represented as PASS.
- No GitHub Actions job or GPU measurement at R20251 verified.

## Acceptance / next
1. When policy-authorized dependency installation is available, install declared pinned dependencies without spending or bypassing security; verify exact worktree/branch/HEAD first.
2. Run full npm tests, bundle build and inspect WebGL shader diagnostics.
3. Capture RTX3090 D3D11 baseline versus candidate at identical view/time/power and measure central faceted nucleus clarity vs peripheral plasma retention, zero-power off, 28 ribbon streams, 6 node streams, 80 facets/240 vertices, single canvas, no new passes.
4. Refine only if visuals show measurable improvement, update evidence, and request owner artistic signoff before release.

No native Supervisor E2E proof; never advertise DONE/RELEASE from this source-only candidate.
