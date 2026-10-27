# SiteForge R150 — material-coherent VFX and original sphere visual unification

MISSION_ID=SYN_SITEFORGE_R150_SPHERE_VFX_VISUAL_INTEGRATION_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R150_SPHERE_VFX_MATERIAL_COHERENCE_20261027.json
TESTED_COMMIT=c58ba5f9fe4aea32369bca611f20e4e0f5096ecf
DEPLOYMENT=b9b43885-bc26-41e5-b44e-7a0987ce4844
STATUS=DEPLOYED_75_PASS_CHROMIUM_WEBGL_REAL__OWNER_VISUAL_ACCEPTANCE_PENDING

## Owner request and failure analysis
Owner confirms after R149 that the particle engine now works on their browser, but "le seul problème c’est que ça ne se marie plus du tout avec la sphère d’origine." R150's task is to integrate the new WebGL particle engine into the existing sphere, not invent another renderer, reset its eleven thin lightning arcs, or add control overload. Earlier R147/R148 created an independent VFX pass rendered over the original sphere with preset-specific hardcoded colors, oversized additive sprites and paths allowed to spread outside the sphere's radius, making disjointed confetti rather than one energetic material.

## Qualified correction
Reuse one WebGL canvas, original fixed front geomN and R149 vertex/fragment precision pairing, add uniform vec4 particleMaterial to existing sphere fragment. The selected VFX preset and intensity now drive corresponding local plasma highlights in the base sphere; a disabled or zero-intensity VFX means no added material flux. Synchronize GPU sprite hues dynamically to the sphere core/rim/secondary color controls, rather than forcing unrelated oranges and violets. In the VFX fragment, reconstruct the same screen-space coordinates as the sphere: projected = (gl_FragCoord.xy/uResolution-.5)*2 with x aspect corrected and y += .08. Apply soft sphereEnvelope 1-smoothstep(.62,.702,length(projected)) (main radius .69), combined with core-weighted lighting and independent sphere opacity. Slightly shrink sprite sizes while keeping two-pass halo/core rendering. Restore enabled attribute state after sprites when needed.

The particle shader remains simulated projected 3D on a front canvas, not genuine mesh particles or a volumetric ray tracer. The sphere shell visibility at 0 leaves energetic features but the main global opacity can hide both sphere and particles.

## Real-browser scope and fail-first evidence
Cloudflare Pages preview is Access-protected. Remote browser attempts to navigate the actual preview URL were redirected to Cloudflare Access login: do NOT bypass authentication. To perform **real Chromium shader compilation instead of unit mocks**, fetch the actual GitHub HTML and script and load them together in Cloudflare Browser Rendering through the documented html input. Only the CSP meta is excluded in this isolated inline test harness to permit an inlined local script; the production deployed sources are unchanged. The browser reported the main renderer as "WebGL actif" and the VFX runtime as "VFX actif · Vortex énergétique · 360 particules GPU" after an actual native change event on the particle preset select, at mobile viewport 390×844. This verifies genuine Chromium WebGL program linkage and control wiring, not an authenticated SiteForge end-to-end session, Safari-specific operation, pixel delta, screenshot review, or aesthetic success.

First Cloudflare deployment ec2a798b failed 74/75 tests due one stale R148 test asserting the old luminance coefficients. Corrected that single expectation in tests/siteforge_r137_live_controls.test.mjs, commit c58ba5f9; new VFX coupling, palette and opacity tests had all already passed. Rebuild/deploy b9b43885 for commit c58ba5f9 succeeded through queued/initialize/clone/build/deploy, Node 75/75 PASS, static export PASS. Test/source blob SHA: bfe8755b1d78331eaee9018f7a5bae9ce7ef0dc7 (renderer), 20086ad22746ad55eca636be0142f10877dc256e (HTML), 4d814baec9f26b4447befbf33b3392a544875d2e (tests).

## Limits, next and rollback
The Cloudflare Browser Rendering screenshot could not be forwarded as a valid untruncated image; no genuine pixel-difference evidence. The user alone can assess visual coherence in their authenticated browser session, or a future authorized browser test session with capture. R150 preview: https://b9b43885.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Previous R149 preview fallback: https://c26521dc.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Production deployments disabled and preview branch allowlisted; main, production and Visual Observer untouched. No alternative authentication path, no billing-driven tools and no extra renderer were created.

NEXT=Inspect/compare captured orb VFX modes in authenticated browser, especially Plasma/Vortex vs disabled at same colors, check no detached external particles and control response in Safari. If visually approved, qualify DONE; otherwise perform only a bounded shader delta for the observed mismatch.

SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
