# Synestra R216 — Photographic PBR metal pass

**Mission**: reactor room DECOR ONLY; 3D Core / filaments remain owned by Labo 3D. R215 remains intact. Blender 5.2.2 LTS; Babylon.js 9.33.0 shared Atlas.

## Scope of change
- Genuine photographed Poly Haven `metal_plate_02` CC0 (photographic 1K baseColor + OpenGL normal, 1K; roughness/metalness optimized to 512px, 1K originals preserved).
- Correct color semantics: baseColor sRGB, roughness/metalness/normal Non-Color. GLB embeds maps, no network dependency for metal surfaces at runtime.
- Wear confined to maintenance modules; structural metals retain approved darker colors with physically meaningful micro-normal/roughness.
- **No new geometry, no sphere**. Closed room from R213, R214 details and R215 low Cycles haze retained.
- Studio Small 08 CC0 HDRI added in independent **Atlas Babylon branch**; actual Babylon screenshot is measured with self-hosted 1K HDRI and tuned PBR response. Image stays under private branch; no public deploy.

## Reproducibility
`build_reactor_r216.py` + `textures/metal_plate_02/*`, outputs under `r216-dist/`. R216 canonical manifest `synestra.atlas.babylon.decor.r216.v1`. Never substitute test-only R212 manifest alias for production contracts. Blender preview `r216-dist/reactor-r216-preview.png`.

### Tests
- Node PBR/GLB: `node qa/r216-materials.test.mjs` — 4/4 PASS.
- GLB: 7,834,972 bytes, SHA256 `EA6C77D2058C53F1225F5E2398E60D6803569B7D9F98CD66AF40356D9275853A`, 827 mesh assets; complete closed room and `CORE_SOCKET`.
- Chrome Babylon 9.33.0: 824 meshes imported, 1 Engine/Scene/Canvas, 0 Core sphere, HDRI ready, quality Ultra→Eco, mobile width 390 without overflow, external Core preserved on decor dispose. Chrome FPS ~99 measured only in eco/headless simulated viewport, NOT physical low-end benchmark.
- Screenshots from Chrome and Blender stored with SHA in Evidence.

**Judgment**: genuine photographed metal, materially more detailed. Babylon now has true IBL speculars but remains artistically below Blender Cycles and the approved reactor concept. Additional view-matched calibration and real low-end hardware required; do not claim commercial release DONE. No merge/deploy main.

**Provenance**: `textures/metal_plate_02/PROVENANCE.md`; Poly Haven CC0 `https://polyhaven.com/a/metal_plate_02`; HDRI `https://polyhaven.com/a/studio_small_08`. Source maps may be reproduced offline from repository copies.

**Rollback**: do not merge PR; R215 and R214 worktrees preserved; Atlas r216 is additive independent branch.
