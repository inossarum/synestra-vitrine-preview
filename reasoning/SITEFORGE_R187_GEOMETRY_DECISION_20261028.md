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

## Public E2E closing evidence

- GitHub Pages isolated version: https://inossarum.github.io/synestra-siteforge-r176-lab/r187.html?demo=neon187 ; HTTP 200, no Access login, Pages commit `f14561f27e2de5efcd0eb5c0a72cbad5f611327e`, HTML blob `beabe03a32a41f5faba7872f246cb040da6e57d1`.
- Real public Chrome direct-link desktop and mobile E2E exit **0**; material 6 selected; 51,840 3D vertices, zero WebGL and draw error, shared spin equal, motes suppressed for the preview only, 18 old material inputs and 10 particle inputs unchanged.
- Previous complete local Chrome E2E for six old materials and touch/orbit/mobile also exit **0**. Node **168/168 PASS**, static 49 assets PASS, one WebGL program proved.
- Public captures archived in Git commit `5e553d622418298c1812f03bc598b12767c66392`:
  - `r187-public-demo-desktop.png` blob `ea4317758f53e8da3f043e6636e494f06f4e8019`;
  - `r187-public-demo-mobile.png` blob `deb873d39222a1d26ad3b13398e1f09da2a4863e`.
- Updated durable Evidence blob: `13af8eaec3cda625091fbaabcc69e0862bfe737d`.
- R186 remains a separate versioned page and `main` unchanged. No release to production.
- **Visual acceptance still FAIL/PENDING** against the supplied reference: sharp thin wireframe/filament lines are not shaded thick metallic interlaced ribbons. Implement this as an R188 addition to material 6 only; do not claim AAA final.
