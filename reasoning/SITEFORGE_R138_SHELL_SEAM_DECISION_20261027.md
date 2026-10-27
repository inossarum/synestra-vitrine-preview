# SiteForge R138 — shell shader/source correction and validated requirements
MISSION_ID=SYN_SITEFORGE_R138_SHELL_DIFFUSION_THICKNESS_CONTROLS_20261027
OWNER=Inos
DATE=2026-10-27
SOURCE_COMMIT=b0fe4c5c858a03b81422879351d8037d1bdab0d1
EVIDENCE=evidence/SITEFORGE_R138_SHELL_CONTROLS_QA_20261027.json
DEPLOYMENT=ebf7671c-f011-4b6a-ba27-0b23f63bcfa6
STATUS=DEPLOYED_WITH_58_PASS; LIVE_GPU_VISUAL_E2E_PENDING

## Symptoms and source-based causal diagnosis
The owner reported several sliders with little visible effect and a sphere seemingly divided into two parts. The R137 shader contained an in-sphere orbital ring (visible equator) and a hard direct-light terminator. Specular, second color and central glow amplitudes were modest. No owner screenshot/frame is accessible in this conversation; the likely cause is source-proven, but pixel diagnosis is not.

## Delta
- Remove interior ring overlay, retain the genuine external orbital ring.
- Replace hard terminator with soft wraparound lighting and raise perceptual effect of shine, details, second color and nucleus.
- Add diffusion (0..100%, default 65%) and thickness (0..100%, default 45%) as two independent uniform inputs. Thickness controls a front vs. inner sphere ray-chord optical path, diffusion controls light scatter, soft silhouette and effective alpha. Neither changes the external physical radius. This is a procedural volume approximation, not a polygonal mesh or physically measured wall.
- Schedule redraw explicitly on input; report shader compile/link/uniform errors in the visual status.
- Keep the R116 original arcs and one WebGL canvas, with mobile sticky preview.
- No Visual Observer mutation (separate owner conversation), main merge, security change, paid resource or production deployment.

## Verification and recovery
Cloudflare Pages preview R138 build and deploy SUCCESS at https://ebf7671c.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Build logs 58 tests run, 58 pass, 0 fail. Tests include all 15 UI inputs and their distinct mock WebGL uniform/CSS bindings. Real mobile browser GPU shader compilation, visual seam disappearance, pixel perceptibility and scroll behavior are NOT verified. If real visual mismatch persists, require screenshot or authorized Visual Observer frame before diagnosing a second root cause; do not invent new renderer or duplicate observer.
Rollback: earlier isolated successful preview https://0d027475.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ and source SHA ef1411c4b99ade060e1cedda96d301fb4fd9469e.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
