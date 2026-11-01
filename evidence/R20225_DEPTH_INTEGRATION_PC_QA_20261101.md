# R202.25 — depth-integrated faceted nucleus / PC GPU review

Date: 2026-11-01. Status: **isolated technical candidate**, owner art signoff pending, hosted preview NOT RUN.

## Provenance / invariants
- Immutable baseline PR #28 R202.24 at `edabe06b16d1e36548b34f80a0450f8be9017a33`; R202.24 / PRs #23–#29 and main unchanged.
- Isolated branch: `task/SYN_LAB_R20225_VOLUMETRIC_OCCLUSION_20261101`.
- One engine / scene / canvas; central IcoSphere radius 0.38, subdivisions 2, **80 triangles / 240 vertices**, renderingGroupId=1 unchanged. No changed mobile, Cloudflare or Worker.
- Changed **only** `createPlasmaHeartMaterial` in `lab-babylon/src/plasma-field.js`. A camera-to-fragment ray intersects a bounding sphere (radius 1.05), estimates the foreground plasma optical path, then applies bounded Beer-Lambert transmission to the material's existing color and alpha. `ALPHA_COMBINE`, alpha cap 0.79 and depth-write-disabled remain.
- This is an **optical approximation**, not a true per-filament geometric depth/occlusion buffer. No second render pass.

## Failure-first and visual iteration
- Negative test: R202.25 transmission assertion fails on R202.24 source; corrected optical-path test and negative floating-point precision assertion.
- R1 optical coefficient 0.72 / floor 0.55 was rejected after GPU orbit review because side/top facets were overly subdued.
- R2 coefficient **0.52 / floor 0.63** retains more central facet definition. Final visual A/B uses identical **1100×900 viewport, Ultra, power 145%, frame=6, front/side/top/back camera poses**, RTX3090 / Chrome D3D11; both source builds and all 8 captures passed scene and mesh assertions.
- A/B screenshot: `evidence/R20225_R2_R20224_GPU_4ANGLES_AB.png`; image SHA256 `7cbc3dd356fe13abbb7531454e06499447456c93fd9b014487d05eb326697011`. Top row R202.24; bottom row R202.25 R2.
- Source shader SHA256 `f262a8c0e948260609a499705d6ba31bf2bdec9e54eab100066693f93604a8ac`.
- Exact Windows esbuild output SHA256 `58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2` (rebuild from source, `dist` intentionally excluded from source commit).
- `npm.cmd test`: **94 tests, 92 PASS / 2 SKIP / 0 FAIL**. `npm.cmd run build` PASS. `git diff --check` PASS.
- RTX 3090 Chrome: **4/4 R2 orbital captures PASS**, 80 facets / one canvas / no mesh suppression. Reports and screenshots stored at `I:\_STUDIO_STAGING\SYN_LAB_R20225_ORBIT_R2_QA_20261101`.
- Chrome headful UI native CDP: **8/8 PASS** incl. renderer, zero emission, reset, quality/mode, mouse orbit, wheel zoom and continuous frames. Report SHA256 `f067013a834f0ecd43325ecd7cd9e0359d36e3a967fdd240bdfd303c3b4ac788`, local `I:\_STUDIO_STAGING\SYN_LAB_R20225_UI_R2_QA_20261101\R20225_PC_HEADFUL_UI_E2E_20261101.json`.

## Release gates
- [x] Isolated source / no PR history mutation
- [x] Failure-first, source tests, Windows build, GPU 4 angles, interactive PC E2E
- [ ] GitHub CI on exact committed HEAD; updated separately once verified
- [ ] Owner art signoff
- [ ] Hosted private Access-authenticated preview and its E2E (not authorized here)
- [ ] Prolonged performance measurements and low-tier GPU tests

**FREE_ONLY; NO MERGE / NO DEPLOY / NO PRODUCTION. PRODUCT_DONE=NO.**
