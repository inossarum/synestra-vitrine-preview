# Synestra R198 — Realistic environmental depth and bounce

## User decision
- Restore the initial/original sphere orientation: no autonomous field rotation; pointer still disturbs flow locally, not the camera.
- Put 3D details around the sphere, not additional effects inside it.
- Ambient sphere lighting on materials, without mirror reflection.

## Delta against R197
- SHA-pinned HTML and shader, independent branch and R198 copy. `assets/siteforge-r198-fixed-orientation.js` restores GLSL `rotY=uTilt.x*1.5,rotX=uTilt.y*1.5`; JS still supplies zero tilt. R197 volume depth shading otherwise preserved.
- `assets/r198-chamber.css` gives scene spatial context: two perspective annuli with interior lips, framed foreground rim, metallic side pillars and directional left-violet/right-green illumination. Faint reflected *light on material* is deliberately distinguished from mirrored *image of the sphere*. Floor pool low-opacity and narrow; no wide white/gold horizontal band.
- Visual review of first Chrome screenshot found ring too massive; reduced dimensions/thickness and enhanced metallic grazing illumination, then recaptured desktop/mobile.
- R197 retained unmodified; R198 contains 5 navigable routes, changes only Studio first viewport.

## Test Evidence
- 156/156 Node contracts (including failure-first) PASS.
- Chrome 15/15 viewport and route validations (1440/768/390) PASS, no overflow, hero full-screen, 1 canvas.
- CDP pointer E2E PASS: `uTilt=[0,0]` sampled 10x, max hover strength 0.72659, rest 8.86e-11.
- Reduced motion fallback PASS. Captures `r198-studio-1440.png`, `r198-studio-390.png` inspected locally.
- No quantitative production GPU FPS and no Safari/Firefox testing. Ambient light is a CSS approximation, not a real shader-to-surface illumination solution.

## Safety / NEXT
FREE_ONLY. No main push or release. Visual owner approval necessary before public deployment. If truly physically-based lighting is required, architect a shared 3D scene with sphere light shading adjacent meshes, instead of additional CSS fake reflections; avoid second renderer and validate fps first.
