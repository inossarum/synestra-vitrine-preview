# SiteForge R162 — Plasma volumétrique organique
MISSION_ID=SYN_SITEFORGE_R162_ORGANIC_VOLUMETRIC_20261027
SOURCE_BASE=57f0245489492fbdc9e469b2641b9d990b49653e
EVIDENCE=evidence/SITEFORGE_R162_ORGANIC_VOLUMETRIC_20261027.json

## Intent and design constraint
R161 removed the artificial shell but retained a symmetrical five-blade silhouette. The user-approved inspiration shows intricate white/cyan/violet energy filaments with depth and irregular, natural propagation. Mode=ADAPT existing volumetric shader (no new sphere), not generate a flat picture.
Preserve 18 settings, JSON schema v1, five material families, shader/fallback, existing Cloudflare branch allowlist, production untouched, FREE_ONLY.

## Decisions
Modify ONLY the existing `uFlow.x<.5` pure-plasma path: depth-varying angle distortion, broad wandering, a primary vein and three scales of tributaries/fine hairlines/wisps, time-varying pulses and volumetric breakup. This removes equally spaced uniform fans without layering a second emitter. All other material branches remain unchanged.
Chrome visual QA showed first iteration was too dim: raise optical density of the new stream field only, preserving shell-free alpha and intact nucleus. Re-render desktop and mobile. Never count self-review as owner acceptance.

## Validation and limits
Failure-first: 2 new shader structure assertions failed against R161; after bounded delta all 62 node contract tests PASS. Chrome 1100x800 on SwiftShader: WebGL getError=0, single canvas, five flow family selections succeeded. Chrome mobile viewport 390x844, canvas ready and no horizontal overflow; screenshot captured. This is real WebGL compilation, but not hardware performance or user aesthetic signoff.
Rollback R161 commit 57f0245489492fbdc9e469b2641b9d990b49653e. Next: commit/push only if remote HEAD still identical and allowed preview, deploy Cloudflare Pages preview, check build/URL/commit, record remote evidence.
