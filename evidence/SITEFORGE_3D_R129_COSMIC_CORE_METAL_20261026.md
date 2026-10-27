# Evidence — SiteForge R129
MISSION_ID=SYN_SITEFORGE_3D_LAB_R129_COSMIC_ORB_METAL_RINGS
DATE=2026-10-26
REPO=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024
PR=#5 DRAFT
CODE_SHA=d8cb907e695c8ae19a1e8684b46aaa95be205a8b
REFERENCE_IMAGE_SHA256=4f981de3a05dce7599d44a175086852a43c6bc4b5b586a44d4df26a71f0e9e2e
REFERENCE_SOURCE=Generated PNG validated by user in conversation (NOT_COMMITTED)
PREVIEW_DEPLOYMENT_ID=4e14301d-268d-4b6f-af37-b80b4453929b
PREVIEW=https://4e14301d.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
CLOUDFLARE_STATUS=SUCCESS
NODE_TESTS=59
NODE_PASS=59
NODE_FAIL=0
STATIC_EXPORT=PASS
HOME_BLOB=43810b6eaa878c523eb06d97542d791543765d55 (unchanged)

## Code
- Source R129 `assets/siteforge-3d-sphere-shaders.js`: 48x96 XYZ shell in multiple 3D-noise layers, fresnel, electric cyan and violet arcs, physically distinct compact emissive nucleus.
- Engine `assets/core-r122-gyro.js`: second true XYZ sphere draw using radius 0.14×, GGX brushed-steel grazing highlights and centre-driven intensity.
- Existing `assets/siteforge-3d-pulse-geometry.js`: branching XYZ discharges, count/shape/speed/colors adjustable and bounded; 3 distinct 360-degree metal rings unchanged.
- Static image is a *reference*, not a texture pasted on a sprite. No external network or paid assets.

## Visual test limitation
R128 had a real local Chrome screenshot; R129 has no genuine GPU frame captured. Desktop Commander commands timed out and a Bridge PC operation remained QUEUED with execution_authorized=false. Cloudflare Access protects Preview. Visual match/AAA/iPhone FPS NOT VERIFIED. This is PARTIAL until inspected, notwithstanding node build PASS.

## Safety and recovery
FREE_ONLY; main not merged or changed; fallback R121 intact; CSP, noindex, reduced-motion intact.
Rollback using immutable R128 Preview a3aa385f or revert R129 commits with verified branch HEAD. No unsafe retries.
NEXT=Auth browser GPU capture, compare to reference at fixed viewport and low-motion state, revalidate shader compilation, fps, interactive settings.
