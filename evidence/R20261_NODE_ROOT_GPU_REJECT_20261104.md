# R202.61 — Root alpha six central node plasma streams — native GPU A/B REJECT

Date: 2026-11-04. Mission: labo3d_sphere_r20261. Owner: Synestra.
Experiment worktree branch: task/SYN_LAB_R20261_NODE_STREAM_ROOT_ALPHA_20261104.
Base SHA: 3ec0188afa415e1e9eb4b124e999f920eb5bc382.
Reference R202.61 ZIP SHA256: 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13 (unchanged).
Canonical Library image raw SHA still unverified; no artist/owner signoff.

## Causal observation and scoped experiment
Existing six nucleus-to-node stream ribbons are constructed with ribbonVertexAlphas(index>=100, segments=72). The original fade=clamp(sin(pi*u)*3.2,0,1) yields vertex alpha = 0 at the core endpoint u=0, confirmed failure-first.
For only index>=100 (six node streams, including existing foreground clone vertex colors), the experiment uses fade=clamp(baseFade+0.90*(1-u)^4,0,1), retaining the far endpoint u=1 at alpha=0.
No mesh/light/uniform/material/Engine/Scene added. All 28 shell ribbons (index<100) retain exact original alphas. Original 80 nucleus facets, 28 shell ribbons, six knots and four modes preserved. No modifications to core shader or R202.61 release ZIP.

## Execution
- Separate clean worktree created from verified base. Locked package.json and package-lock.json matched, node_modules reused as junction, no installation.
- TDD RED (PID 70288): six node root alphas measured zero, test fails as expected.
- TDD GREEN (PID 73388): 3 PASS, 0 FAIL (node roots >0, far node ends zero, 28 shell roots unchanged).
- Full regression (PID 73388): 183 tests, 180 PASS, 0 FAIL, 3 SKIP; build PASS.
- Candidate bundle SHA256 9691354cbcc590a75d19fe3e2436671dd15f4a6cf497a7c9b58bfb0dfa425b7b.
- Original ZIP extraction and candidate six-file fixture have five files byte-identical; only Babylon bundle differs.
- Native RTX3090 Chrome ANGLE D3D11, 1100x900 viewport, frame 18, Balanced, power 145%, 4 nucleus modes. A/B script PID 74416, exit=3 intentionally because visual gates REJECT; page errors=0, external requests=0, power zero PASS, baseline repeat drift=0%.
- Predeclared visual gates (BEFORE captures): core changed pixels >=0.3%, core edge gradient gain >=0, core mean luminance gain >=0, abs exterior luma delta <=0.3, baseline drift <=0.12%.
- Mode 0: core mean +0.2266, edge +0.08130, changed 0.21495%, exterior mean -0.00053 => REJECT.
- Mode 1: core mean +0.2042, edge +0.07044, changed 0.14881%, exterior mean -0.00042 => REJECT.
- Mode 2: core mean +0.2129, edge +0.07796, changed 0.23148%, exterior mean -0.00034 => REJECT.
- Mode 3: core mean +0.2167, edge +0.08308, changed 0.20668%, exterior mean -0.00019 => REJECT.
The edge gradient improvement is factual and repeatable at fixed angle, but insufficient pixel visibility; no post hoc threshold lowering or art acceptance.

## Reproducible Evidence
- evidence/R20261_NODE_ROOT_GPU_REPORT_20261104.json SHA256 dba076e174602e9232a5acfd755246b3b251b283b868f51c9c167869854d13c0
- evidence/R20261_NODE_ROOT_BASELINE_MODE0_20261104.png SHA256 41d4dc96b75f3c6b8d07e9f9c34411d826d04db39c899083b3cc2261284fb693
- evidence/R20261_NODE_ROOT_REJECTED_MODE0_20261104.png SHA256 ebf87fe4410dca451b1ca8f3c1ad3313005574771d1db90b0ea63fe622af90af
- evidence/R20261_NODE_ROOT_REJECTED_TEST_20261104.mjs SHA256 3f463ad4fd2df62d788b471118b23783d6b44593bb38732fad6035c6f791a5ec
- evidence/R20261_NODE_ROOT_REJECTED_PATCH_20261104.patch SHA256 55aae90f74eec7eeb38431733dd568603c66e20ff824f4beacf4dbf349ea3813
- QA-specific runner (untracked, machine-local) SHA256 5c1fc22fea4a9f7e394c7f9965ccf7996b2d66adecdcd357ca93a2611c12c223.

## Rollback, limits, NEXT
After test, tracked source lab-babylon/src/plasma-ribbons.js and lab-babylon/dist/babylon-lab.js restored exactly to HEAD; git diff empty; original ZIP unchanged.
Likely depth-causal limitation: bridge starts at radius .085, within nucleus radius .38; existing foreground node meshes are stencil/depth-limited against the real 80-facet mask. Increasing root alpha cannot guarantee pixel contribution if root geometry is behind the nucleus. This is a hypothesis supported by source geometry/renderer, NOT yet a measured per-fragment occlusion proof.
NEXT authorized research: read-only geometry/depth visibility of existing near-node stream against actual nucleus silhouette in GPU frames, not retry raw image materialization or banned orbital test. Do not modify stencil/depth until causality and safe rollback tests are established.
ART_SIGNOFF=PENDING | NEW_VARIANT=REJECT | SOURCE_GATE=LIMITED | HOOKS_STATUS=UNKNOWN | FUNCTION_REPORT=PARTIAL.
