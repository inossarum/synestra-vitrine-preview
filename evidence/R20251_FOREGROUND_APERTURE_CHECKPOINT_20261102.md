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
- Failing security precondition: `npm.cmd ci --offline --no-audit --no-fund --prefix <isolated-lab-dir>` denied by platform safety controls before package installation. DO NOT circumvent or retry via alternate tooling; build, full 141+ regression and complete Babylon-scene GPU/CDP A/B of R20251 are NOT RUN and must not be represented as PASS.
- No GitHub Actions job or complete Babylon-scene GPU measurement at R20251 verified; independent standalone WebGL shader QA is recorded below.

## Acceptance / next
1. When policy-authorized dependency installation is available, install declared pinned dependencies without spending or bypassing security; verify exact worktree/branch/HEAD first.
2. Run full npm tests, bundle build and inspect WebGL shader diagnostics.
3. Capture RTX3090 D3D11 baseline versus candidate at identical view/time/power and measure central faceted nucleus clarity vs peripheral plasma retention, zero-power off, 28 ribbon streams, 6 node streams, 80 facets/240 vertices, single canvas, no new passes.
4. Refine only if visuals show measurable improvement, update evidence, and request owner artistic signoff before release.

## Additional native GPU shader smoke — PASS (bounded scope)
- Test target: Chrome 156, WebGL1, **ANGLE NVIDIA GeForce RTX 3090 Direct3D11**. Single canvas. Real GLSL fragment shader compiled, linked and rendered on physical GPU for both R20249 and R20251 source.
- Scope: **standalone WebGL plane with alpha blending**, not Babylon scene E2E. Does not require installing dependencies, and does not override the separate blocked `npm ci` operation.
- Exact source checked: R20249 `60171bb17d038c7d05b1e1d09cb953f0d496380c`; R20251 `c32f243889d3087386e58ea8f91cb56b6eef06db` (shader source unchanged by script/checkpoint addition).
- 8,100 center samples: mean RGB baseline **64.0541** vs candidate **47.7835**. 67,600 wide-area samples: baseline **78.6828** vs candidate **67.0664**. Center darkens more strongly than wider region, confirming a bounded visual effect of the foreground attenuation in this synthetic alpha-blended setup; no artistic signoff inferred.
- Baseline PNG SHA256 `13aa542dd1e6b4f05ea3529d5e8860687e81efaa33c9721dae04510b43752f36` (311383 bytes).
- Candidate PNG SHA256 `2a93e0126540052fcc82768bf4761f86bda806c3b26afe2db6b8808ce68e9535` (307210 bytes).
- Local JSON QA SHA256 `750C1043C379F2BD4C70A48AE665380ACE5736E0C3895DA1F6B94EC1EC6F7833`.
- Local run: `I:\_STUDIO_STAGING\SYN_LAB_R20251_WEBGL_SHADER_QA_20261102\run-1793637656994-42416`; screenshots/JSON only local, no public upload.
- Reproducible source: `lab-babylon/scripts/r20251-webgl-smoke.mjs`; Node 24 + Chrome. The script uses `SYNESTRA_STAGING_ROOT` (defaults to `I:\_STUDIO_STAGING`) and `R202_CHROME_BIN` for portable paths. Restore the R20249 and R20251 exact branches to their named separate folders before invocation. It creates a uniquely named run folder and browser profile to avoid stale CDP ports.
- Recovery incident: previous alpha-blend QA restart failed `fetch failed` because an old temporary profile retained a stale `DevToolsActivePort` file; fixed by selecting a fresh independent profile; subsequent D3D11 run PASS and no QA Chrome process remained after controlled closure.
- Explicit LIMIT: end-to-end Babylon build, bundled shader behavior in live scene, whole-scene reference comparison, animations, zero-power native runtime, low-end GPU, CI and deployment still **NOT VERIFIED**. Earlier security refusal for dependency installation remains respected. `RUNTIME_E2E_PASS=NO`, `ART_SIGNOFF=PENDING`, `RELEASE=NO`.

No native Supervisor E2E proof; never advertise DONE/RELEASE from this source-only candidate.
