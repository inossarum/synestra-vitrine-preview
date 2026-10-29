# Synestra Labo 3D — Babylon.js sphere-only R190

## Scope
**Only the sphere:** no reactor room, floor, walls, environment objects, commercial site or unrelated Atlas mutation.
Engine: Babylon.js 9.33.0 from npm lockfile, free local build. WebGL runtime on the test PC. In a separate worktree; legacy R189 remains available.

## Run
From this directory:
```powershell
& 'C:\Program Files\nodejs\npm.cmd' ci --no-audit --no-fund --ignore-scripts
& 'C:\Program Files\nodejs\npm.cmd' run build
python -m http.server 19112 --bind 127.0.0.1
node test-visual.mjs
node --test test-sphere.mjs
```
Preview: http://127.0.0.1:19112/?frame=4.5
Use pointer drag to rotate camera. `?frame=4.5` freezes simulation time for comparative screenshots. `threads=62` is the default, 12–130 allowed.

## Verified evidence
- Genuine Chrome ANGLE D3D11 RTX 3090: six screenshots, 1440×900 and 390×844, front/side/over, WebGL error 0.
- 62 curved strands, 32 traveling photons, 98 meshes, one scene/engine; 4 Node tests PASS.
- Visual shape centered and round in both viewports; no ground, reactor, or additional scene content.
- Evidence: `../evidence/R190_SPHERE_BABYLON_BROWSER.json` and `../evidence/R190-sphere-*.png`.

## Target from user's provided visual reference
Compact bright central core, dense organic cyan/violet energy filaments on an approximately spherical envelope, visible 3D depth and motion; no visible suspension spokes/strings. Current R190 is a **working prototype**, not artistic acceptance of the reference. Next visual work: reduce line uniformity, increase layered organic turbulence, add multiple configurable nucleus flows and tune glow while preserving core readability.

## Atlas 3D Babylon.js handoff (REUSE-FIRST)
No verified, published Babylon.js Atlas interface was found when inspecting GitHub and local staging on 2026-10-29. The existing Atlas R25–R35 worktrees concern a distinct Blender asset/scene workstream. Do not create a parallel Atlas service, second runtime, broker or authority.

When the forthcoming Atlas is published, its owner should provide an immutable repository ref, version/SHA and API contract. Integrate via a versioned, read-only rendering component boundary: Babylon engine/scene/parent TransformNode supplied by the caller; sphere mesh/subgraph creation, update, disposal, parameter schema, deterministic capture and quality budgets; no autonomous deployment. Do not overwrite or merge either concurrent R190 worktree.

**State:** standalone Babylon.js sphere VERIFIED, external Atlas reuse PENDING (not discovered). No site-vitrine deployment. Git branch is the evidence and rollback boundary.
