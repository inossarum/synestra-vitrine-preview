# R201 — Three.js / Theatre.js / detect-gpu implementation

## Scope and decision
After R200 the owner requested integration of the actual technologies behind the Overworld Audio-style 3D site, rather than another CSS approximation. This local feature branch integrates only the relevant renderer/director/performance libraries. Do not migrate the entire website to Nuxt/Vue unnecessarily; preserve HTML navigation and R200 visual identity. FREE_ONLY.

## Actual architecture
- One `THREE.WebGLRenderer` on the existing canvas, one THREE.Scene with PerspectiveCamera, point lights, PBR MeshStandardMaterial surfaces, PCF shadow, depth fog, rough-metal platform. A plane shader uses the R200 SHA-pinned raymarched plasma GLSL as an emissive fragment inside the same render pass; it is not a full physically modelled particle field with GI.
- Theatre.js **Core** 0.7.2 project/sheet/object binds camera and light values; scroll changes `sheet.sequence.position` and camera coordinates. No Theatre Studio or external paid services.
- detect-gpu 5.0.70 reads 16 self-hosted benchmark JSON; CSP explicitly includes only `connect-src 'self'`. GPU tiers bound shadow, bloom and volume steps. Three's EffectComposer with UnrealBloomPass/OutputPass is on tier 3, using same renderer.
- All libraries version-pinned in npm lock, bundled with esbuild. No CDN at runtime, no global npm install. R200 unchanged.

## Tests and visual review
- 181/181 Node contracts including failure-first checks PASS after correcting UTF-8 BOM in package manifest.
- 15/15 Chrome route × viewport checks PASS, no overflow, one canvas, fallback HTML.
- Real Chrome integrated: Theatre ready true; detect-gpu tier 3, canvas 1, no JavaScript exception; camera moves from 0,1.13,6.2 to .25,1.255,5.75 at scrollY=450; reduced motion fallback PASS.
- Chrome screenshot checked visually. Scene renders but is an **unapproved artistic candidate**, not AAA++ accepted. No RTX3090 hardware FPS baseline, no Safari/Firefox audit.
- Existing CSP meta `frame-ancestors` warnings inherited and excluded from success claims; enforce via server header on any future real deployment.

## Rollback / durability
Source pinned to R200 commit 6d148e3. Keep R201 on `task/SYN_SITEFORGE_R201_THREE_THEATRE_INTEGRATION_20261029`; do not push/merge main or deploy. Revert preview by navigating `/r200/`. Stage source files, bundle, locally served benchmark JSON and tests, **exclude** `node_modules`, debug probes and unrelated untracked historical screenshots. After commit verify HEAD, SHA, node tests and clean tracked worktree.

## Context / gate
HAUTO hook route returned no events. AGENTS.md SHA 34cc2a86 is checked, scope is isolated. Memory V1 query failed because `studio_core.memory_index` unavailable in inspected interpreter, hence Memory READ=MANQUANTE. Visual signoff is a genuine owner gate before publication. NEXT: human visual acceptance and physical GPU benchmark, then permitted integration path.
