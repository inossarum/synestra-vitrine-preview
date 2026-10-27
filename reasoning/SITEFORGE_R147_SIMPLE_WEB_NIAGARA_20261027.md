# SiteForge R147 — Web-Niagara light with one-click VFX controls

MISSION_ID=SYN_SITEFORGE_R147_WEB_VFX_SIMPLIFIED_PARTICLES_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R147_WEB_VFX_SIMPLE_PARTICLES_20261027.json
STATUS=SOURCE_IMPLEMENTED_TEST_GATE_BLOCKED_NO_DEPLOYMENT

## Requirement and decision
The owner expects real particle behavior, rather than a more luminous surface shader, and asks for the accessible/usability equivalent of "a Niagara for the Web" with considerably simpler discovery and operation. Reuse the SiteForge WebGL1 sphere and do not invent another server, Web App, second renderer, Visual Observer connection or expensive GPU pipeline.

Implement a pragmatic VFX V1: a default-visible native preset select ("Plasma vivant", "Étincelles électriques", "Vortex énergétique", "Éruption du noyau", "Désactivé") plus a single user-facing intensity slider. Additional density, particle speed, sprite size and spread controls live in a native expandable details block. The existing coreLight slider now exposes 0..500%, with radiance rising nonlinearly at a fixed size; the existing coreSize remains independent.

## Implementation
Use one optional point-sprite WebGL program drawn into the SAME canvas and GL context after the sphere shader. A static bounded 240-seed buffer feeds particle positions, independent birth phases and lifetimes, randomized orbit/ballistic/vortex/eruption trajectories, projected back/front depth attenuation, per-sprite radial luminosity, size and life fade. Four VFX motion presets and disabled option. Density defaults to 120 points at 100%, capped at 240; zero particle intensity or disabled preset draws no points. Graceful fallback to existing sphere if optional VFX compilation fails. 32 original sphere controls + 6 particle controls => 38 inputs; advanced UI collapsed by default. Avoid marketing this as a complete Niagara/physics editor; no node graph, collision solver, GPU compute or physically volumetric simulation.

## Proof, refused writes, risk
Relevant SHA-pinned Studio AGENTS/Constitution/Registers, Memory V1 decision, prior R146 reasoning/evidence and Synestra Connect failure-first/debugging/visual-regression skills consulted. GitHub source edits verified:
- Shader assets/siteforge-r116-sphere-only.js blob 7a04b55ab8013d4c99e8d5b904cceb8ae6923357
- HTML siteforge/core-3d-lab/index.html blob 71e52784dc0f111309fa3e922ac63aadf0f87a62
- Primary tests tests/siteforge_r137_live_controls.test.mjs blob 04aa4fbb49c6f7e44d7d5b2cc8364a52a572bde7

Attempted update to tests/siteforge_r132_r116_clean_lab.test.mjs was explicitly POLICY_DENIED. No alternate pathway / retry. It and tests/siteforge_r136_mobile_sticky_preview.test.mjs still assert 32 controls, while current page has 38. Known test failure means **DO NOT DEPLOY** this candidate. Do not claim deployed or CI PASS. No real browser/GPU or mobile FPS visual QA. Existing R146 preview remains last verified deployed release at https://21afaed2.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ (the page still visually labels R145).

## NEXT and recovery
Respect denied write; require explicitly authorized update of the two legacy test expectations to 38, then test failure-first (zero intensity, disabled preset, max density, no GPU), nominal particle engine and core flux, real WebGL shader compilation, mobile framerate and screenshot evaluation. Preview only if test suite green and Cloudflare project preview allowlist revalidated. If the denied file write is not authorized, stop at SOURCE_IMPLEMENTED_UNDEPLOYED with evidence (no alternate file edit or bypass).

SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=BLOCKED
