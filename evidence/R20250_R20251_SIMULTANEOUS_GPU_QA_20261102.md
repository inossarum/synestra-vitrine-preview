# Labo 3D — R202.50 + R202.51, true simultaneous GPU shader composition (bounded)

STATUS=PARTIAL | DATE=2026-11-02 | TEST_RUN_ID=R20250_R20251_COMPOSITE_GPU_20261102
PACKAGE_PASS=UNKNOWN | FULL_REGRESSION=NOT_RUN | RUNTIME_E2E_PASS=NO | OWNER_ACCEPTANCE=PENDING | RELEASE_STATUS=NO | FREE_ONLY=PASS

## Source gate / scope
- Studio rules: `inossarum/studio-virtuel@7464dbb5e7fa43842556c57c727210d7e8d5db50`, `AGENTS.md` Git blob `e0f6df26edc9a45b7db1a5261e92b719d2dd66ce`.
- Baseline R202.49: `60171bb17d038c7d05b1e1d09cb953f0d496380c`; R202.50: `dce49f1e0edb3c933c2ca39a0fd425ddc8aa72cb`; R202.51 source: `0e28da5907a587f054b58fbdf178f978f771dcae`.
- Synthetic combined tree exactly `42086191c00a0904626ae0fcca32b7f010c2c752` in detached QA worktree `I:\_STUDIO_STAGING\SYN_LAB_R20250_R20251_INTEGRATION_QA_20261102`; never merged into `main` or either original branch.
- Test runner `lab-babylon/scripts/r20251-composite-gpu.mjs` SHA256 `B7BA93C8EDAE7CB6BED528B9C9E40430931BCFEA71803C1B24F82D80AE4953E7`. Source files read directly from the above local snapshot paths.
- Test method: 1 actual Chrome 156 WebGL1 canvas, 2 independently compiled/linked shader programs drawn sequentially (faceted heart first, raymarched volume second) with alpha blending, power 1.45 and power 0. The proxy is **16 triangular facets + a 40-sector near-sphere projection**. No Babylon engine, no actual 80-facet geometry, no 28 ribbons/6 streams and no native scene renderer. The compositing order and simplified geometry are diagnostic hypotheses, not proved equal to Babylon's runtime render pipeline.

## Execution proof
- `node --check`: PASS; `node <isolated-runner>`: PASS with exit zero; real browser renderer `ANGLE (NVIDIA GeForce RTX 3090 Direct3D11)`; canvas count 1 for each mode.
- Browser modes: baseline, R202.50 facets only, R202.51 volume aperture only, combined changes, power-off combined. **5/5 GPU cases PASSED**. All PNG signature/size and source marker checks passed.
- Fixed viewport 800x800, time .65, camera(0,0,4.8), full power 1.45; metrics sampled on matching 250x250 pixels (step 2) inside ROI x/y 150..650.
- Mean RGB: baseline **134.226048**, facet-only **133.362016**, aperture-only **133.38429866666667**, combined **132.503088**, off **0**.
- Affected visual hashes: baseline `136161d11269ff822023b700f99818a142c431313721539db901627b1ec3062f`, facet-only `85250785658cc937e3351f924a9d9225cac5eaeec732dd038a29872679e2cdab`, aperture-only `f9ef9de2972e1cac1584f90b3b9d5dcc5dce00b18369e7f3af8c6c5ec9a5a39b`, combined `d7e20d56978a185c73197b0e1fa6d0d2753067546b79419b7817a6c79a1e5b13`, off `d27b7d9fb7ed608b715e31cce8da6f67fed6f63f2749436e54351a9f44f9659d`.
- Full local machine QA log `I:\_STUDIO_STAGING\SYN_LAB_R20250_R20251_COMPOSITE_QA_20261102\run-1793643151080-50712\combined-gpu.json`, SHA256 `885F34D28AFB4EDFAC147BAD3A626E512916EACC1781263EACD75B0894CA1A18`.
- Local visual gallery (five PNGs): same run folder, `r20250-r20251-combined-gallery.html`.
- The QA Chrome instance was explicitly sent `Browser.close` and a follow-up process query found no related Chrome process.
- Inspection of PNGs established subtle cold facet pigmentation and peripheral plasma attenuation in the proxy; **no art-quality verdict**.

## Other evidence and gates
- Previous isolated R202.50 + R202.51 source integration: 112 dependency-free PASS / 0 FAIL, 12 Babylon-dependent test files excluded; see `evidence/R20250_R20251_COMBINED_SOURCE_QA_20261102.md` on this branch.
- Previous isolated GLSL GPU fragment tests: R202.50 cold facets and R202.51 foreground attenuation each passed in their own harness; see other Evidence files.
- Explicit installation refusal on `npm.cmd ci` remains in force: no package installation, no alternate install method, no paid resource and no deploy were attempted in this turn.
- **Open:** pinned Babylon build/runtime unavailable due to missing `@babylonjs/core` and `esbuild` in the isolated worktree; complete native engine E2E, 80 facets, ribbon/node streams, 16-step frame lifecycle, animation, low-end GPU, performance and owner signoff still NOT VERIFIED.
- NEXT: resolve the existing dependency authorization gate by an authorized route (no bypass), reproduce exact combined tree in native Babylon, compare five fixed-frame E2E captures, qualify animation/zero-power and remaining full regression before any release.

DELTA_ONLY | DIAGNOSTIC_SHADER_GPU=PASS | BABYLON_E2E=BLOCKED | DONE_GLOBAL=NO
