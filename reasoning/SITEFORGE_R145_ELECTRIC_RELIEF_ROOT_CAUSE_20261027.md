# SiteForge R145 — décharges électriques distinctes et relief optiquement perceptible

MISSION_ID=SYN_SITEFORGE_R145_ELECTRIC_RELIEF_FIDELITY_20261027
DATE=2026-10-27
OWNER=Inos
EVIDENCE=evidence/SITEFORGE_R145_ELECTRIC_VS_LIQUID_RELIEF_20261027.json
TESTED_CODE_SHA=2d3ecee1935446aad47c13d68c22694652069270
DEPLOYMENT_ID=c82f4bc1-840c-42d5-9516-cf76ad28e516
STATUS=DEPLOYED_65_PASS; REAL_GPU_VISUAL_FIDELITY_UNVERIFIED

## Root cause
R144 electric mode still inherited dominant R142 smooth plasma waves, curved currents and glossy highlights. Although the dedicated electric mask used a high power, it remained a sine wave and did not resemble branching lightning on-screen. R144 relief changed height field and local bump illumination *before* additive electric plasma, bloom, scatter and eight R116 discharge arcs; most of the relief differences were overwritten and near invisible at normal settings. User observation is therefore consistent with code.

## Decision and bounded code delta
Reuse the single existing R116-derived WebGL shader and the R140 constant front geometric normal. Implement `r145ElectricBolt`: high-voltage thin polyline in rotating material coordinates, pseudo-random angular direction, node-segment interpolation, time-gated electric flash, and forked secondary branch. Three independent surface strikes feed the electric energy mask. Minimize non-electric R142 fluid waves and broad glossy speculars by dryElectric; darken electric dielectric substrate and boost eight existing R116 original arcs by ~2.9 when electrical mode is selected. Leave liquid, fog, fusion, crystal and plasma profiles unchanged.

After surface emission/scatter and before the original arcs, apply late material emboss: scalar grooves/crests and normal-dependent local shading. For cracked relief add deep groove contrast, for crystalline add plane/facet bands, for smooth relief nearly no emboss. Preserve silhouette bounds, shell alpha independent and full disappearance of matte shell when visibility=0. No new server, WebGL renderer, plugin, Bridge or Visual Observer dependency.

## Tests and acceptance
CI Cloudflare Pages staging build for commit 2d3ecee: 65 tests, 65 pass, 0 fail and static export PASS. All official Cloudflare stages success. Tests assert that the electric material uses segmented forks (not liquid sinusoidal lightning), its diffuse/wave/specular channels are suppressed, relief shading is late in the compositing order and mathematical crack vs crest contrast is distinct, and iOS picker change remains active.

No direct screenshot, GPU shader compile log, phone framerate or pixel comparison was captured. Therefore **NOT DONE visually**. Live visual check should compare Électrique vs Liquide at identical controls; Relief Lisse, Craquelé and Cristallin at intensity 150-200; 0% shell visibility must keep currents but remove substrate; no regression to R139 split hemisphere. If rendered electricity still resembles a liquid, next bounded hypothesis is additive arc geometry motion/camera position and actual shader branch execution; do not re-litigate CSS or manufacture E2E proof.

PREVIEW=https://c82f4bc1.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
ROLLBACK=https://8f50123d.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
