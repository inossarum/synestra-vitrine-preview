# R152 — clean rebuild of the sphere from original plasma reference and existing VFX GPU engine

MISSION_ID=SYN_SITEFORGE_R152_CLEAN_REBUILD_ORIGINAL_PLASMA_VFX_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R152_CLEAN_PLASMA_REBUILD_20261027.json
TESTED_COMMIT=de6263faef57ff21fc2f86f76a2e9d6949dfedb8
DEPLOYMENT=e43b4e42-5d39-4b80-b816-461295e8a1a6
STATUS=PREVIEW_DEPLOYED_64_PASS__REAL_CHROMIUM_PIXEL_EVIDENCE__SAFARI_VISUAL_ACCEPTANCE_PENDING

## Requirement and source authority
Owner explicitly ordered removal of the old sphere, all its prior effects AND sliders, followed by an entirely NEW energy/plasma sphere generated using the same proven GPU VFX engine and based on the original plasma image. Previous R151 retained a legacy marble quad and eight legacy arcs as underpainting/fallback; this was no longer acceptable. The source-of-design reference available in the repository is the original `<svg class="core-r108-art">` with radial gradient colors white #ffffff, icy blue #c0ffff, cyan #51dfff, royal #395bce, violet #53318d, midnight #08142e. No unverified external reference image or guessed visual asset was used.

## Reuse-first architecture, actual removal
The ACTIVE JS file at assets/siteforge-r116-sphere-only.js was completely replaced in place (not duplicated) with a NEW R152 renderer. No R116–R151 marbled sphere shader, r111Arc or r145ElectricBolt remains. The replacement uses **ONE WebGL1 shader program** shared by a full-screen plasma volume field and GPU sprite emitter passes, in one canvas/context: pass 4 screen-filling plasma material with 3D noise, swirled filaments, central emissivity and cyan/blue/violet density; pass 1 golden-angle 3D shell energy; pass 2 time-gated jagged and branching thirty-bead electrical filaments; pass 3 compact nucleus; pass 0 optional animated supplementary VFX. One additive halo and core GPU point draw per emitter pass, full-screen field draw separately, all using the same linked shaders and GPU context. Precision highp/mediump is matched on both stages to preserve the R149 iOS link fix. New static fallback SVG recreated from the reference palette; historical reference code in assets/core-r109-webgl.js remains untouched as versioned provenance, but is never loaded in the lab.

The active HTML was reduced from 38 to 16 controls. Removed every obsolete relief, agility/turbulence, coating diffusion/thickness, motion-type, surface material and shine slider. Retained user-relevant controls: VFX style and intensity, particle density/speed/size, diameter, shell visibility, opacity, nucleus size and power, electric intensity and count, four live plasma colors. The first controls are visible, advanced options folded away. No new service, storage, server, extra canvas, broker or paid external tool.

## Testing and real rendering evidence
Old R137 test suite directly depended on deleted shader controls and therefore was REPLACED with 12 R152-specific tests (legacy absent, one renderer, gradient, controls, GPU draw calls, independent modules and high power, disabled optional effects, no-GPU, failed shader/link, accessibility and mobile load limits). R132 regression updated to keep SHA-verification of historical source without executing it; R136 preserves sticky mobile stage. Cloudflare Pages preview only: final deployment e43b4e42-5d39-4b80-b816-461295e8a1a6 for SHA de6263fa, all stages successful, 64 tests/64 pass/0 fail, static export PASS.

Beyond simulated tests: in **real Chromium GPU execution**, the checked-in HTML/JS was loaded as an isolated HTML fixture via Cloudflare Browser Rendering (needed because the site itself is behind Cloudflare Access; not an authentication bypass). Matched mobile viewport 390x844; JavaScript errors zero; WebGL successfully linked and reported active. WebGL POINTS draw submissions with supplemental emitter enabled: [1480,1480,540,540,160,160,340,340]; disabling supplemental emitted [1480,1480,540,540,160,160], demonstrating persistent sphere, lightning and nucleus. To prove nonblank pixels, actual gl.readPixels INSIDE a rendered frame gave center [255,255,255,255], near-center cyan [143,231,246,255], blue depth [54,77,109,187] and two outside points [0,0,0,0] with gl.getError()=0. This supports a real white/cyan/blue volume on transparent background, not full aesthetic conformance or Safari performance.

## Remaining conditions, recovery and rollback
Qualify full artistic DONE only after a visual comparison against the owner's intended original plasma picture and mobile Safari inspection (no screenshot from authenticated iPhone was received for R152 yet). A handful of sampled GPU pixels, though real and helpful, is not a visual quality approval or proof of AAA material. Keep source-gate LIMITED for that unsatisfied acceptance; never misrepresent historical screenshots as new R152. Rollback to prior isolated R151 URL: https://e49bc63f.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Main, production, Visual Observer, ACL and authentication unchanged. Browser rendering used a separate isolated document and did not circumvent Access or mutate production.

NEXT=Review R152 appearance in the owner's Safari against original plasma target. If warranted, perform one bounded GPU emitter/material tuning delta and record before/after screenshot evidence; no resurrection of the deleted old shader or sliders.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
