# R148 — rendre réellement visibles les particules du laboratoire SiteForge

MISSION_ID=SYN_SITEFORGE_R148_VISIBLE_WEB_GPU_PARTICLES_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R148_VISIBLE_GPU_VFX_20261027.json
DEPLOYED_COMMIT=355f7f6c33c8acf033c015cb5ff8291747526236
DEPLOYMENT_ID=9e056a25-0f14-4920-b4df-6cf10f917c48
STATUS=R148_DEPLOYED_70_PASS; GPU_PIXEL_E2E_PENDING

## Observed user feedback and root cause
The owner confirmed that raising core flux in R147 worked, but changing new particle presets/tabs caused no noticeable visual change. This is more precise than saying the entire WebGL scene is broken: R147's source indeed renders a low number of very small and attenuated sprites (120 by default; <14px GL_PointSize). More importantly, R147 used gl.blendFunc(SRC_ALPHA, ONE) while passing energy-premultiplied RGB and energy alpha, effectively squaring emitted brightness. All presets inherited the same uParticleColor from the core, leaving only weak movement differences. A separate VFX GPU failure could be masked by the generic "WebGL actif" sphere status.

## Decision
Do not introduce another renderer, bridge, service, canvas, product or graphics dependency. Reuse the same R116-origin sphere and the R147 separate point sprite pass on its existing GL context, with additive output corrected and stronger physical-looking glows. Split the sprite into a diffuse halo pass (larger point) and focused inner core (smaller point), one GPU buffer, one VFX program, two draws. Swap to ONE/ONE additive light because fragment RGB already encodes radiance; update individually shaped spark fragments and eruption flares. Distinguish preset colors (plasma cyan, electric icy white-blue, vortex violet, eruption orange) while retaining a 14% contribution from owner's core tint. Use denser particles capped by mobile/desktop budget: mobile 360 default/max 640, desktop 620 default/max 1024. A dedicated VFX-only ARIA-live status explains disabled, active/preset/count, compilation/link/missing GPU attribute errors; never infer VFX readiness from sphere readiness.

## Verification, limits and rollback
Cloudflare preview project still production disabled and branch allowlisted; commit 355f7f6c, deployment 9e056a25-0f14-4920-b4df-6cf10f917c48. All stages success, 70/70 tests pass. Two new regression tests confirm actual mocked particle draw calls, double halo/core passes, ONE/ONE blending, distinct palettes on preset change, zero-intensity/disabled suppression, and VFX status. Source files read back at renderer ed4a5b84c9140eb77fa6d9a9dbcf05ca6cc1cae5, page 2bf3e3bba90706be266f440fb98681a4531e47e5, tests 7ce0f273ca8bff2d8a51df65809383b91587ee2e.

This validates source/wiring/preview, **NOT real GPU browser shader compile, screenshot visual delta, mobile FPS or client visual acceptance**. The generic web fetch failed to access private/preview Cloudflare URL; no billed browser tool was invoked under FREE_ONLY. In a browser, compare all four modes and disabled, check the visible VFX status, 0 intensity, 100-200% intensity, advanced density 0/250, mobile FPS and WebGL shader fallback; include pixel/capture comparison before declaring full DONE. Previous preview rollback: https://d49214a5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.
PREVIEW=https://9e056a25.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
