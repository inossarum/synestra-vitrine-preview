# R197 — Depth and floor-light repair

## Defect confirmed from supplied screenshot
R196 plasma remained pictorially flat and the wide green illuminated metal horizon looked like an unrealistic reflection. Two phenomena had separate causes: nearly uniform emissive volume radiance in the WebGL3D ray-marching shader, and inherited multiple radial-gradient CSS floor lighting layers.

## Deliberate repair
- Keep base `fe595e760e351e38482e97ff9f6e690aeaf2731d` untouched. R197 lives in its own five-page folder; rebuild script pins base home and original shader SHA256.
- Copy the existing raymarch shader into `siteforge-r197-depth.js`. Add far-depth attenuation, directional shading and contour modulation in the 3D sample loop. Preserve one WebGL context, 22 desktop/14 mobile steps, 2048 MAX seeds, emissive nucleus, and pointer impulse decay. Slowly rotate field internally based only on time; `uTilt` is still identically zero.
- Delete floor shine, bright radial plane lighting and the intervening band in generated HTML. Metallic floor is self-contained matte, low-contrast grid, and a dark contact occlusion ellipse only (not a mirror).
- Keep rear metallic arcs and add one masked 2px foreground ellipse segment physically in front of the canvas (CSS stacking layers). The very subtle backdrop is not a solid dark disc.
- No new WebGL/canvas, no CSS blur animation, no GPU readback.

## Validation
149/149 Node PASS including R197 failure-first contracts; 15/15 Chrome page/viewport PASS; interactive WebGL core ready, uTilt [0,0], peak hover 0.7266, release <1e-9. R197 1440 and 390 screenshots inspected. Reduced motion baseline PASS. Shader JS syntax verified and loaded in Chrome.

## Caution
This is an artistically shaded ray-marched volume, not calibrated PBR lighting. It can feel deeper but visual aesthetic remains subject to human review. No quantitative GPU/frame time on a reference production machine; do not claim a particular FPS. Existing R196 is the rollback candidate. No push, merge, cloud deploy or production change.

## Next
Owner visual review; if approved, controlled integration and cross-browser E2E. If depth remains insufficient, next implementation should use an actual 3D mesh/material system rather than stacking additional decorative CSS halos or reflections.
