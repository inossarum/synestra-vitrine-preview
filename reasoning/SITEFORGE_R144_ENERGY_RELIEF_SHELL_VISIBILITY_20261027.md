# SiteForge R144 — energy signatures, relief profiles and energy-only transparency

MISSION_ID=SYN_SITEFORGE_R144_ENERGY_RELIEF_SIGNATURES_INVISIBLE_SHELL_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R144_ENERGY_RELIEF_SHELL_VISIBILITY_20261027.json
TESTED_SOURCE_SHA=888e1df0ea632d86d831dbbda54556c9350a934a
DEPLOYMENT=8f50123d-082b-499b-afef-7b4946800b8b
STATUS=DEPLOYED_62_PASS__LIVE_PIXEL_E2E_PENDING

## First causes and decision
R143 energyMode changed mostly minor additive emission while the underlying plasma material stayed essentially identical across all six modes. Relief settings changed bump normals in a weak shading range, without strong variation in geometry texture: selections were not perceptually distinct. A second plausible bug for iOS native pickers: the form listened only for 'input', not 'change', so a mobile select could show a new value without scheduling a GPU update.

R144 retains the single R116-derived WebGL renderer, R140 normal-safe continuous front surface and original eight arcs; introduce six strongly differentiated material profiles: electric dark/high-voltage streaks, liquid glossy waves, ion fog soft violet cloud, fusion orange rolling hot cells, crystal icy angular facets, plasma blue baseline. They control background palette, shadows, scatter, microstructure, emission and specular strength, not only color. Relief now has six mode-dependent height fields (undulating, veined, fractured, turbulent, faceted, nearly smooth), stronger analytic tangent-normal lighting/shadow and height-dependent diffuse shading. Visual authenticity remains subject to real GPU E2E.

Owner's new requirement is hide shell/contour entirely while surface energy continues. New independent 0..100% shellVisibility slider: 100 restores full shell; 0 fades silhouette wall and background matte while retaining mode-specific luminous current alpha and eight discharge arcs. The opacity control still multiplies the final result. This is selective alpha masking of a procedural surface, not physically ray-traced energy only.

Add both input and change event listeners to support native select pickers on iOS. Tests now verify that every energyMode and reliefMode updates its GPU vec4 on a change event, all six profiles/relief types have structural shader consumers and shell-off retains some energy alpha while producing transparent negative space.

## Validation and rollback
Preview: https://8f50123d.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
Cloudflare deployment 8f50123d stages successful; 62 tests passed, 0 failed; static export PASS.
Unverified: real iPhone WebGL shader compile, rendered color/mode differentiation in pixels, frame rate and actual user visual approval. Do not overclaim DONE from CI/build. Main and production untouched; Visual Observer remains separate. Roll back by opening R143 preview:
https://ee82b2c5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
NEXT=Verify 0% shell transparency on a real GPU with electric vs fog vs fusion, compare relief smooth/cracked/crystalline, and confirm mobile change event works in Safari.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
