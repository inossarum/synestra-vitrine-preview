# SiteForge R151 — one existing GPU emitter generates the sphere, internal lightning and nucleus

MISSION_ID=SYN_SITEFORGE_R151_REBUILD_SPHERE_INTERNAL_ARCS_USING_VFX_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R151_UNIFIED_SPHERE_ARCS_GPU_20261027.json
DEPLOYED_SHA=ef0ec36b96364adc086b8ea12704105724c77083
DEPLOYMENT=e49bc63f-4206-4ee6-9561-ce3d0e59e753
STATUS=PREVIEW_DEPLOYED_78_PASS_REAL_CHROMIUM_GPU_SUBMISSIONS_VERIFIED__OWNER_VISUAL_ACCEPTANCE_PENDING

## User decision
Use **the exact GPU emitter that was proven to run the particle effects** to remake the sphere itself AND the lightning inside it. Previous R150 hybrid was insufficient: the old marble material remained the primary sphere renderer and thin electricity was split across old shader functions and new sprites. Do not create another engine or duplicate server, do not let a mock pass stand in for real browser execution, keep access simple.

## Implemented architecture and constraints
R151 keeps the ONE WebGL context/canvas and ONE existing `emitterProgram` with original seeded emitterBuffer. A new `uPass` selects 0 optional exterior/embedded VFX, 1 coherent sphere matter (golden-angle 3D sphere sampling, slow movement and rear-depth fading), 2 internal branching lightning bead chains (24 points per strike, irregular angle, bursts and depth fade), 3 compact nucleus. Every pass draws a diffuse halo plus luminous core through exactly the same particle vertex/fragment program and same additive blending. WebGL main quad program remains only as a subdued, stable silhouette/backdrop and as qualified fallback if emitter fails, NOT a second GPU particle renderer. Suppress ~67% of legacy marble material and ~81% of legacy embedded arcs when the unified engine works; preserve original R140 fixed normal and R146 arcs as failure fallback. Nuclear core flux is independent of radius. When optional particles are disabled, pass 1/2/3 remain active. Shell visibility zero suppresses GPU shell but leaves internal currents and nucleus.

## Failure-first, recovery and tests
First Pages deployment b14ca512 failed 4/78 tests. Three assertions still expected the old two-pass **only optional** particle model and status; R150 0-opacity test exposed a GPU uniform propagation omission in R151's zero-opacity early return. The handler now binds the actual emitter program, explicitly sets its uGlobalOpacity=0 and rebinds the sphere program. Tests updated to preserve failure-first expectations and add tests for unique emitter, shell+arcs+core passes, independent disabled preset, core flux and backend-link fallback. Rebuild for SHA ef0ec36b => 78/78 node PASS, static export PASS; queued, initialize, clone, build and deploy all SUCCESS. Preview https://e49bc63f.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/, no main/prod mutation. Rollback R150 https://b9b43885.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.

## Actual browser execution
Do not claim only tests are sufficient. Load **exact R151 GitHub source** into Cloudflare Browser Rendering's supported HTML content test page, remove CSP meta solely for inlining the existing JavaScript in this isolated fixture, no Access session or policy bypass. In real Chromium at 390x844, instrument WebGLRenderingContext.prototype.drawArrays and change native VFX select through a real change event. Observed when optional particles ON: 8 point-draw submissions, counts [640,640,312,312,112,112,360,360]. When preset=4 OFF: 6 point-draw submissions [640,640,312,312,112,112], with main DOM 'WebGL actif' and VFX status 'Particules additionnelles désactivées — sphère et éclairs GPU actifs.' This demonstrates GPU program compiled and real graphical API draw commands for whole sphere, arcs and core, in contrast to mock-only CI.

Remaining quality gate: actual rendered image/pixel comparison of R151 relative to R150 under same settings, real Safari iPhone appearance, frame rate and owner acceptance. Real Chromium GPU command execution is NOT proof of AAA aesthetics. Avoid prematurely declaring full DONE. Production website and Visual Observer unchanged.

SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
