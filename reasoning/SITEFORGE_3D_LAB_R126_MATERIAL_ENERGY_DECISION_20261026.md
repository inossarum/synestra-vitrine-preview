# SiteForge 3D R126 — Metal / central emitter / energy system (26-10-2026)

MISSION_ID=SYN_SITEFORGE_3D_LAB_R126_AAA_METAL_ENERGY_SYSTEM
OWNER=SiteForge 3D — PR #5 DRAFT
CODE_HEAD=4544a3a3e59de0c5aea5e651e4584fa0366317a8
PREVIEW_DEPLOYMENT=578b4cce-4900-48fe-b81f-667122e260da
PREVIEW_URL=https://578b4cce.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/

## Decision
Keep the homepage R121 100% intact. Change only the isolated SiteForge laboratory: the R125 256-sector beveled triangle mesh is retained and the existing ring 360° kinematics remain. Use WebGL1 and procedural materials rather than dependencies on licensed textures, external HDRI or commercial rendering services. The source includes new anisotropic GGX highlights, scratches, micro-roughness, defects and bevel relief. The energy overlay renders in the same WebGL context before writing invisible-sphere depth, then the metallic rings receive point light computed from the core at world origin. The central source is therefore an actual light driver of metal shading, not a decorative CSS effect.

## Config contract
Keep schema synestra.siteforge.3d-preset.v1 for compatible R123 imports. Safe numeric clamps, allowlisted enums and six-digit hex validation; JSON export includes old and new keys. Energy: 8 types (plasma, electric, arc, vortex, nebula, flame, crystalline, quantum), 6 pulse types, 4 colors, bounded pulse count 1-16, separate energy speed, amplitude, thickness, turbulence, chaos, glow, density, central intensity. The shader has a fixed 16-pulse GPU loop and inherits 32ms frame guard / existing resolution cap. Motion-reduced and WebGL-unavailable fallbacks retain editable presets.

## Acceptance evidence
Cloudflare Preview Git branch deployment 578b4cce-4900-48fe-b81f-667122e260da committed 4544a3a3e59de0c5aea5e651e4584fa0366317a8 and successfully deployed. Build logs: 53 tests PASS, 0 FAIL, static asset deployment SUCCESS. Original homepage blob 43810b6eaa878c523eb06d97542d791543765d55, same as R125. Connection from the paired owner Bridge via curl saw 302 Cloudflare Access challenge; the subsequent 200 was Access login HTML, not a verified 200 response from the actual laboratory document. Never interpret Access login as HTTP E2E PASS.

## Limits and risk gates
Source/Node tests are NOT WebGL shader compile, real GPU frame output, photorealistic metal benchmark, iPhone frame-rate profiling or aesthetic AAA acceptance. GGX is anisotropic procedural approximation; source of reflection is analytic studio lighting rather than physically captured IBL. Glow is an analytic shader halo, not HDR FBO multi-pass bloom. Until real Chrome/iPhone review, VISUAL_GATE=PENDING and QUALITY_AAA=UNVERIFIED. These claims are intentionally narrower than the requested visual target.

## Preflight and recovery
R125 evidence 4d3af554e6832d4a33ca8ebbe5136dc91c5e7ba3 and R125 reasoning b79f6deee51065fd989ae450ea0d63be099808e1 consulted. Central skill generative-3d-texture-pbr@1.0.0 blob 44f288ec3e8e3020d0c7e675cebbda4700579b4c consulted/applied as PBR-channel and material-fidelity checklist; no Supervisor skill execution. AGENTS.md absent in preview repository, source gate LIMITED. Do not merge main; the owner must inspect live WebGL from an Access-authenticated browser. Rollback = revert R126 delta after a branch-head lease check or use immutable R125 preview b4857d2c as reference.

NEXT=Authenticated browser visual E2E, GPU shader errors, stable 30fps under load, mobile reduced motion and critical material comparisons; iterate only based on observed pixels.
