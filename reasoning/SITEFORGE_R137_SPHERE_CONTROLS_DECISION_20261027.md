# SiteForge R137 — Interactive R116 sphere controls
MISSION_ID=SYN_SITEFORGE_R137_LIVE_SPHERE_CONTROLS_20261027
OWNER=Inos
DATE=2026-10-27
SOURCE_COMMIT=ef1411c4b99ade060e1cedda96d301fb4fd9469e
DEPLOYMENT_ID=0d027475-0a72-433b-8849-359fe4e15130
STATUS=DEPLOYED_AND_NODE_QA_PASS; BROWSER_GPU_E2E_PENDING

## Decision
Reuse the one existing R116 GLSL sphere/canvas; control it with 12 real WebGL uniforms and 1 independent CSS zoom instead of replacing the scene, introducing a new WebGL context, JavaScript graphics engine, or editing Visual Observer. Nine native range inputs plus four color pickers emit live input events, reusing the same panel and reset all 13 to their initial defaults. Preserve the eight original light filaments.

## Visual improvement
Render using the canvas' untransformed client dimensions at bounded higher effective DPR (desktop cap ~1.9 megapixels, mobile cap 950k), rather than its CSS-transformed getBoundingClientRect. Add subtle high-frequency noise to the procedural material, rotation of the pseudo-normal and additional volume/scattering shading, parameterized by user-controlled tint and lighting. This is improved procedural WebGL sphere shading, **not** a real 3D triangle-mesh renderer, and native browser GPU pixels have not been independently checked.

## UX
Grid panel on desktop; on mobile the scene stays sticky in the main scroll while the 13 controls scroll below, no duplicate scene. Status announces WebGL activity or SVG fallback; SVG accepts color/diameter/opacity as a limited reduced-motion fallback.

## Evidence
Cloudflare Pages isolated preview commit ef1411c4 at https://0d027475.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/, all deployment stages success. Official build logs report 56/56 tests PASS and static export PASS. Three R137 tests check control labels, shader declarations/pixel calculation and mocked GPU uniform changes/reset; historical R132/R136 tests included in build. Actual HTTP GET and browser WebGL pixel QA unverified (public URL inaccessible via available web fetch).

## Constraints and next
Visual Observer is owned by another chat; no Bridge dependency, Visual Observer PR/IAM/backend change, Cloudflare production change or main merge. If Chrome reports shader compile failure or mobile sticky failure, revise isolated branch failure-first and retest before calling it DONE. Prior safe stage 4b429055b736774cd6a7fb0799030d44649a514b remains a rollback reference.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
