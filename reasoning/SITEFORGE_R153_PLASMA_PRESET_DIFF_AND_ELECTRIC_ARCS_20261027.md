# R153 — energy effects repaired and visually distinguished at real GPU pixel level

MISSION_ID=SYN_SITEFORGE_R153_REWORK_PLASMA_ENERGY_EFFECTS_20261027
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R153_REAL_GPU_DIFFERENT_PLASMA_EFFECTS_20261027.json
DEPLOYED_COMMIT=a7449c89663cc6bc52499d0ea46d1db9e18aa543
PREVIEW=https://f27d23fa.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
FUNCTION_REPORT=PARTIAL__AESTHETIC_ACCEPTANCE_PENDING

## Why this delta, not another rewrite
The owner had ordered a full clean plasma rebuild in R152, then reported that its effects still needed work. Source inspection established a falsifiable failure: VFX style changed only optional sprite trajectories, not the core plasma full-screen shader because the volume branch did not read uControls.x. Moreover the 30-point electrical arcs were all radiating from a fixed center and used large discontinuous lateral jitter, causing dotted or liquid-looking streams. The volume material had broad undifferentiated illumination.

## Minimal qualified correction
Preserve the R152 single WebGL1 program, original SVG white/cyan/royal/violet reference, its 16 native controls, compact core power/size independence and bounded mobile rendering. In the existing plasma volume branch, introduce domain-warped noise flow with dark turbulent channels, narrower filaments and a concentrated central corona. Use explicit uControls.x branches to differentiate: plasma (continuous flowing filaments), electric (dark high-contrast branching channels), vortex (helical equatorial bands) and fusion (radial near-core energetic jets). Emission intensity now affects the plasma field, not only optional particles. In the existing GPU emitter branch, distribute the origin for each lightning chain over the interior radius, use bounded coherent zigzags and branched direction, increase longitudinal extent of each luminous point while narrowing transverse extent. All modes still use the same ONE shader program, no new renderer/server, no legacy R116 slider resurrection. Strict tests for style branch and distributed arcs added.

## Failure-first, proof and scope
First Cloudflare preview deployment 600485f9-cc4a-4873-bed0-3f1921df230a was marked build FAILURE because two assertion strings were obsolete; not a GPU compile error. Patched two tests only, then preview f27d23fa-1967-48d2-97f1-7721e9515228 for SHA a7449c89663cc6bc52499d0ea46d1db9e18aa543 passed 67/67 Node tests, static export, all build/deploy stages. Source readback renderer 99c202164478cc3ccaeed9d9b80059c91b5640f2, UI 212251909669a1d823fe06b8d7d09ab2bb798017, test 49d829f76daeddb90aceb3342f95a834d9d82da6.

Importantly, a real Chromium WebGL mobile-viewport (390×844) executed the **exact branch shader** loaded in an isolated HTML document via Cloudflare Browser Rendering. Switched the native VFX select through 0/1/2/3 and measured gl.readPixels on eight fixed framebuffer points immediately after each plasma quad draw. All four modes produced distinct real GPU RGBA values with gl.getError() 0. Sum of absolute RGB channel differences across eight points relative to original plasma: Electric 413, Vortex 803, Fusion 1117. This demonstrates a **real visible pixel difference in the material**, not only uniform/state or mock simulation. It does not amount to full-frame visual similarity scoring, owner aesthetic approval, actual Safari iPhone performance, authenticated preview screenshot or a measured mobile FPS. Repeated or broader image claims should not be made without pixel/frame evidence.

## Recovery and acceptance
Keep Cloudflare Pages project production_deployments_enabled=false, custom preview branch allowlist, no main/production/Visual Observer changes, and FREE_ONLY. Last R152 rollback URL https://e43b4e42.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Qualify visual DONE only after the owner can inspect default Plasma and contrasting presets on their device and approve fidelity of color, filament style and electrical density. If no approval, take concrete screenshot evidence and modify only a bounded identified defect. No further unrelated selectors or multiple renderers.

SOURCE_GATE=LIMITED (final owner visual approval and iPhone FPS unverified)
HOOKS_STATUS=UNKNOWN
