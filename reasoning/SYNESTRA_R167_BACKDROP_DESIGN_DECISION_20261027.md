# R167 — Futuristic backdrop for approved Synestra Core (preview only)

MISSION_ID=SYN_VITRINE_R167_FUTURISTIC_BACKDROP_CONCEPT
BASE=abf929d1cf0de8098d27ea4f1d0add0a0c6b503c
EVIDENCE=evidence/SYNESTRA_R167_BACKDROP_PREVIEW_20261027.json
OWNER=Inos, visual arbitration

## Scope
Owner specifically requested a futuristic background for the approved homepage sphere, while saying to resume the SiteForge 3D lab task. Do not reopen or change Core radius, plasma shader, controls, links or accepted composition. Create only a visually testable alternative that is *not live*.

## Design
Apply independent decorative CSS to a generated derivative of the unchanged homepage. Faint perspective grid in violet (#53318d) and green (#69dcb4), soft luminous gradients, restrained circuit contours and fading at the edges. Keep high-contrast hero text, Core links and accepted center. No bright highlights competing with the sphere, no second renderer/canvas and no artificial shell. CSS is static even with motion enabled; prefers-reduced-motion is respected.

## Implementation and tests
assets/vitrine-r167-backdrop-proposal.css defines the candidate. r167_build_preview.py derives vitrine-r167-backdrop-preview.html from the real approved index.html; the original index source stays at Git blob SHA 1413e30138ba1657f7056401818e697ddbd32ac8. The existing WebGL runtime remains SHA dd63d75fdb966de2052595c95b7b6cb736d6c7cc. Screenshot real Chrome desktop and mobile passed, both WebGL error 0, one canvas, 18 legacy controls, scale .49; reduced-motion fallback passed on both sizes.

## Gate
Aesthetic approval required before real vitrine integration. No Cloudflare deployment, main merge, or modification of production. Source code proposed on an isolated review branch only. If rejected simply discard the CSS and derivative. Primary SiteForge R166 work is independent.
