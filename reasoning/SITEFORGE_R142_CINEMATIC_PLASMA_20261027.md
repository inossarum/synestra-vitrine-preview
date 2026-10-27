# SiteForge R142 — référence visuelle plasma bleu/cyan

MISSION_ID=SYN_SITEFORGE_R142_PLASMA_SURFACE_REFERENCE_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R142_PLASMA_SURFACE_REFERENCE_20261027.json
COMMIT_TESTED=2998f191b1aebac8f4370dce94a4d9d18c1bdf4e
PREVIEW_DEPLOYMENT=2af9bda5-ea66-4e2e-a096-3d9b54a8c1cc
STATUS=STAGING_DEPLOYED_66_TESTS_PASS; REAL_GPU_VISUAL_NOT_VERIFIED

## Owner-approved target
The first visual image shown in the preceding SiteForge material reference collection: dark, swirling plasma gas in blue/cyan, with luminous fine filaments, bright current streams, purple/deep-blue shadows, layered volumetric depth and crisp high-resolution highlights. The reference is a static illustrative look, not automatically an actual rendered result. Do NOT declare image-perfect AAA equivalence from shader source and build tests alone.

## Minimal existing-renderer enhancement
Keep the one R116-derived WebGL shader, R140 geometrical normal fix, original eight arc discharges, R141 agitation, live 16 controls and mobile sticky display. Add nested gas cloud density from already sampled 3D noises (v/v2/eddyA), dark negative spaces, color-dependent illuminated pockets, sharp flow-line and microfilament emission with subtle nonstrobing shimmer. Material atmosphere can change without moving geomN; shell thickness/opacity/luminance remain independent, orbit stays exterior-only. No duplicated pipeline or speculative new 3D server.

## Evidence, review and limits
Official isolated Cloudflare Pages preview https://2af9bda5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ has all stages success for commit 2998f191. Build logs report 66 tests passed, 0 failed, static export PASS. Two new tests check nested shading and emission values with fixed geometry and original arc count.
Not proved: independent HTTP status, actual mobile WebGL shader compilation, GPU frame timing, pixels versus the image reference, and true volumetric 3D raymarching. Visual Observer is owned by another conversation. Need real screenshot comparison with source SHA at fixed viewport and filmic quality acceptance by the owner. If unsatisfactory, change one bounded parameter set with checked rollback rather than repeatedly claiming AAA.

SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
