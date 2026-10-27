# SiteForge R166 — Dynamics Lab, independent of approved vitrine Core

MISSION_ID=SYN_SITEFORGE_R166_LAB_FLOW_DYNAMICS_20261027
OWNER=ChatGPT (isolated code), Inos (visual authority)
SOURCE_BASE=3033a102ab32370c77d2dae6713db147410fcc2e
EVIDENCE=evidence/SITEFORGE_R166_LAB_DYNAMICS_20261027.json

## Owner constraints
The screenshot of the existing violet/green Core on the Synestra homepage has been explicitly accepted and must remain unchanged. Continue improving the 3D laboratory only; validate before moving anything to the vitrine. The owner also requested a coordinated futuristic vitrine **background** as a later separate design task, not authorization to replace the approved Core.

## Technical decision
The homepage and lab previously shared assets/siteforge-r116-sphere-only.js. R166 creates assets/siteforge-lab-r166-flow.js for the laboratory exclusively; the homepage HTML and shared JS are verified immutable as Git blobs 1413e30138ba1657f7056401818e697ddbd32ac8 and dd63d75fdb966de2052595c95b7b6cb736d6c7cc. No second render pass within the lab. Existing shader field gains slow 3D advection and shearing with non-synchronized periodic pulses. The previously established integer angular harmonics (2,3,6,9,19) remain unmodified to avoid R162's branch-cut seam.

## Tests and visual review
Failure-first caught missing R166 isolation/dynamics. Complete Node site_contract suite: 71/71 PASS. Real headless Chrome with SwiftShader: WebGL compile and rendering PASS, 5/5 flow materials, 18 control values, 1 canvas, mobile width 390 with zero overflow. Two distinct screenshots 1.3s apart (388396 vs 389852 encoded bytes) confirm motion; neither this comparison nor the screenshot is evidence of high hardware FPS. Screenshots retained. Human aesthetic acceptance remains PENDING.

## Separate future vitrine backdrop — DESIGN BRIEF ONLY
A quiet violet (#53318d) + green (#69dcb4) technological ambient backdrop behind the accepted Core panel: faint perspective grid, low-contrast circuit trajectories, mild depth falloff, distant diffuse luminosity, **no** globe overlay, no fake sphere, no extra particle clouds, no competing bright focal point. CSS/lightweight static fallback; decorative and accessible, zero pointer interactions, reduce-motion compatible. Preserve the old Core diameter (.49), homepage navigation, and existing WebGL material. Explore a separate preview with a screenshot comparison before integration; do not change production or the approved vitrine now.

## Gate and recovery
FREE_ONLY; protected main/production untouched; owner/lease/Studio runtime source gate LIMITED, no Supervisor E2E claim. Push only if preview branch still at R165 SHA 3033a102ab32370c77d2dae6713db147410fcc2e, and only the lab paths/test/evidence/captures. If Cloudflare access explicitly denied, don't retry/bypass. Publish a preview only with authorized provider success and check commit/deployment status.
