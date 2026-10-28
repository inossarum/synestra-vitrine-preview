# SiteForge R187 — Geometric ribbons, one-program invariant

## Owner requirement
The R186 screenshot shows diffuse, blurred electric loop loops, which do not visually match the owner's reference: crisp, many-layered, cyan/magenta metallic-looking cables wrapped into a sphere. A user has also expressly required "Ne modifie pas ce qui existe déjà, ajoute le". Therefore leave prior R185/R186 previews unchanged, keep flows 0–5 and their shader code and default controls unchanged, and work only on guarded material flowType=6.

## Decisions and implementation
R187 introduces 3D analytic ribbon paths. A fixed mesh of 51,840 vertices encodes each path coordinate as (t, laneSide); the GPU evaluates toroidal trajectories and their tangent, uses the original view-orbit and shared spin phase, and renders two luminous strips (soft envelope and narrow core). There are 60 strands, arranged as 12 bundles of five, with three independent 3D orientations. R186's soft volumetric base is reduced only inside its preexisting flowType=6 branch. An optional `?demo=neon187` query preselects the experimental material and disables motes, without changing the default value 0, colors, six older materials or JSON.

The first prototype used a second GPU program and caused 9 legacy assertions to fail. This was diagnosed rather than hiding or weakening tests. The second program was removed, and ribbon geometry now uses **uPass=6 in the single existing WebGL program**. After this correction the entire regression suite returned to PASS.

## Evidence
- 168/168 Node tests, including R187 invariant tests, PASS.
- Static export: 49 allowlisted assets PASS.
- Chrome Windows headless SwiftShader real local E2E exit 0: six previous flow materials unchanged, 360 orbit, mouse/touch, mobile viewport 390px, JSON v1 compatibility, 0 WebGL errors.
- R187 direct-link Chrome desktop/mobile test PASS: flowType 6, 51,840 vertices, draw error 0, spin phase equal for sphere and motes; 18 plasma + 10 particle controls preserved.
- Screenshots from the real GPU output: r187-demo-desktop.png, r187-demo-mobile.png and r187-real-neon-material.png.
- Production main unchanged SHA df67fcd5cc6b7cc0fb42fa86c8920d28b9427494, source R186 base SHA 2b9677b839ef25db3bc21ea46e0784c579868802.
- Public GitHub Pages publication/E2E pending as of initial evidence commit.

## Artistic limit and next iteration
This is a **prototype**, not an AAA match. It improves crisp lines and removes the overexposed fog, but still has spaghetti-like visible linework and lacks substantial metallic shaded cable surfaces, coherent nested wrapping and true self-occlusion. Next iteration should introduce volumetric thickness, specular highlights and organized nested rings exclusively within material 7. Do not modify flows 0–5, original art presets or main. Rollback: remove versioned r187.html only.
