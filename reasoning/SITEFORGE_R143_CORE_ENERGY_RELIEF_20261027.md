# R143 — surface energy, core size, calm plasma and relief
MISSION_ID=SYN_SITEFORGE_R143_SURFACE_ENERGY_RELIEF_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R143_CORE_ENERGY_RELIEF_QA_20261027.json
TESTED_COMMIT=2f886879925455babb965f150c42498f6fb805c4
PREVIEW=ee82b2c5-54ad-416e-88f5-1a7a50ba6ae2
STATUS=DEPLOYED_WITH_58_PASS; REAL_WEBGL_PIXEL_E2E_PENDING

## Decision and reuse
Reuse the only R116-derived shader and the established R140 front-normal / no-seam solution. Do not introduce other renderers, servers or bridge dependencies. Preserve all eight original electric arcs and mobile sticky view. Owner's target remains the R142 blue/cyan cinematic reference, with 31 independent controls.

Core size (0-200%) separately controls the central source and bloom radii. At agitation 0%, retain a slowly breathing baseline domain flow and luminous filaments, rather than a motionless/dead texture. At increased agitation, add stronger warping and luminous turbulence without moving the global geometric normal.

Provide 6 energy families (plasma, electric, liquid, ionized fog, solar fusion, crystalline) with materially distinct strand density, cloud treatment and emissive color. Four surface motion types are independent of the sphere rotation. Parametric controls operate directly on packed WebGL shader uniforms (four vec4 groups). Optical relief has six modes, intensity/scale/roughness/contrast/speed, analytic bumpNormal for local highlights, and bounded silhouette displacement; this is shader relief and mild silhouette deformation, **not** polygonal 3D mesh.

## QA and rollback
First candidate build FAILED 1 of 58 mock tests due to incorrect exact Float32 tolerance. Test fixed, next Cloudflare Pages isolated preview succeeded: 58/58 PASS, static export PASS at https://ee82b2c5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Production disabled and never mutated. Real iPhone GPU shader compilation/pixels/fps and visual energy/relief fidelity NOT verified. WebGL failure retains local SVG fallback; Visual Observer is owned by a separate chat.

Rollback target: https://2af9bda5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ (R142).
Next: inspect real browser on phone, sample all six modes, 0/100/200 agitation and relief 0/100/200, confirm no split sphere or overheated mobile GPU. Only then declare full visual DONE.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
