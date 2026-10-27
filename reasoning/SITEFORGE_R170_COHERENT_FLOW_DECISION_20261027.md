# R170 — Coherent 3D plasma flow and actual zero-speed freeze
MISSION_ID=SYN_SITEFORGE_R170_COHERENT_FLOW_PAUSE_20261027
BASE=abf929d1cf0de8098d27ea4f1d0add0a0c6b503c
EVIDENCE=evidence/SITEFORGE_R170_COHERENT_FLOW_20261027.json
OWNER=Inos aesthetic authority; ChatGPT isolated laboratory delta

## Intent and architectural segregation
User explicitly requires preserving R169 for a later architectural revision and continuing SiteForge 3D development. R169 scene remains a draft review, NOT approved for live vitrine. Do not modify its SVG, CSS, or production homepage. Existing lab had R166 flow animation but excessive radial repetition. This iteration adds depth-asymmetric current intensity and non-radial 3D warp to the same volumetric shader.

## R170 decisions
Modify only the lab-specific existing `assets/siteforge-lab-r166-flow.js` (REUSE_FIRST), not the homepage engine. Three cheap bounded fields: `streamBend` (drifted XYZ wave), `depthEnvelope` (depth-specific amplitude), and `filamentContrast` (3D noise weighting). No new material, renderer, particle pass, or controls. Existing angular harmonics remain integer periodic to protect the R163 seam fix. Remove obsolete minimum `uTime * max(.04/.05, speed)` floor in fragment/vertex shader so 0% is a true static pause. UI explicitly documents pause. Keep 18 JSON fields, five material families and original material color controls.

## Tests
Failure-first test initially fails against R166. After delta 75/75 complete Node tests PASS. Headless Chrome WebGL1 ANGLE: 0 gl errors; 5/5 families compile/render; 18 controls, 1 canvas. Two frames at normal speed differ. At slider 0% the two screenshots are **identical**; after restoring 100% they differ. Mobile viewport 390 with no overflow. Desktop and mobile captures stored as evidence. Software GPU is not a physical-GPU FPS measurement. Art direction still requires owner assessment.

## Cross-project design memory
R169 provisional scene remains saved, but marked visually too crowded. GitHub PR #10 comment 6454837823 carries the owner's explicit freeze/defer decision; the linked reasoning file `reasoning/SYNESTRA_R169_DEFERRED_REVIEW_20261027.md` contains a future-recovery brief. No current architectural work.

## Release boundary and recovery
Only fast-forward commit into the existing SiteForge lab preview branch if its remote SHA still equals R166 base. No merge to main, production, Cloudflare deployment or modification of previously approved Core. Rollback to R166 commit abf929d1cf0de8098d27ea4f1d0add0a0c6b503c.
