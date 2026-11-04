# R202.61 — PREVISE: depth occlusion dominates center; preserve stencil and depth
Date: 2026-11-04 | Mission: labo3d_sphere_r20261
Evidence: evidence/R20261_DEPTH_STENCIL_FACTORIAL_GPU_DIAGNOSTIC_20261104.md and JSON report, archive branch only.
Base 39a10023d0faf6edc19e73ba3d8565528635ff8d, official ZIP SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.

## Decision
Do NOT disable stencil or depth in production. On the native GPU, disabling stencil alone changes NO core pixels but 3.6k ring and 5.6k outside pixels; this protection is critical to avoid exterior leak. Forcing depth ALWAYS on the six *existing* foreground clone materials changes 1623–1641 core pixels while the stencil remains active. Both-off adds no changed-core-pixel count beyond depth-only. Therefore the depth function materially occludes some of the visually relevant center streams at fixed camera.

## Why previous attempts failed and what not to repeat
- Increasing six root alphas: most additional alpha applies inside nucleus, already depth-clipped; GPU gate rejected.
- Moving six node stream roots outside nucleus: loses luminance and facet edge contrast in all 4 modes; GPU gate rejected.
- Local hotspot A/B: brightens center but flattens faceted relief; GPU gate rejected.
- Reducing/removing mist: darkens core; GPU gate rejected.
- Forcing depth ALWAYS or removing stencil as a production "fix": FORBIDDEN; causes visually implausible through-facet paint / leakage. Page-only diagnostics were allowable because no original files changed.
- Previous five-clone invisibility conclusion is view-specific. Perspective changes, the selected canonical artwork and readable 3D flow need independent verification; the historical orbit experiment remains denied and was not rerun.

## NEXT: distinct source- and risk-bounded path
The actual artist target still requires white-violet focused luminous heart while preserving exact 80-facet crystalline surface and coherent six-node energy paths. Before writing another candidate shader/mesh, establish the raw bytes and verified SHA256 of the owner-selected reference PNG through an independently authorized route (do not retry the previously denied Library access). If not available, build only non-promotable, fixed-camera measurements of **visible** streams/face contact with retained depth/stencil; reject any candidate that loses core edge gradient or leaks outside silhouette.
A product-quality change requires a different hypothesis, predeclared per-region visual gates, no additional renderer/material authority, tests RED/GREEN/full suite and native RTX3090 E2E, plus explicit owner art signoff.
No deploy or main integration. GPU_DIAGNOSTIC_PASS; ART_SIGNOFF_PENDING; FUNCTION_REPORT=PARTIAL.
