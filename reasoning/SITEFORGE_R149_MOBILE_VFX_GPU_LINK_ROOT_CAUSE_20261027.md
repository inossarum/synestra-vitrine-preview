# SiteForge R149 — iPhone GPU particle linker mismatch

MISSION_ID=SYN_SITEFORGE_R149_MOBILE_VFX_LINK_FAIL_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R149_MOBILE_PARTICLE_GPU_LINK_20261027.json
TESTED_SHA=5589551afd7732a1f587739968928f7ba668085e
DEPLOYMENT_ID=c26521dc-ae99-466a-bb87-552a6d94c1f0
STATUS=R149_DEPLOYED_72_PASS__MOBILE_GPU_PENDING

## Concrete user repro and root cause
Owner's actual mobile browser screenshot shows the bright rippling sphere and the VFX pane at Plasma vivant 100%, together with the definitive runtime status: "VFX indisponible : liaison GPU échouée." This establishes that the **main sphere WebGL program works** while the R148 particle program **fails at GL LINK_STATUS**. Consequently all new VFX particle presets/settings are inert; increasing core power remained effective because it belongs to the independent sphere program. The old hypothesis of particles merely being too dim was insufficient.

Source check reveals the R148 particle vertex shader uses an optional highp float default when GL_FRAGMENT_PRECISION_HIGH is present, but the particle fragment shader hardcodes precision mediump float. Shared varyings vFade, vHot and vAxis can therefore have mismatched precision at the GPU program link on highp devices. This is a *likely* link-failure mechanism, not conclusive browser log proof; the R148 VFX status hid its actual GL program linker info. Existing simulated tests always returned getProgramParameter=true for each mock program, which explained the 70/70 false sense of visual readiness.

## Minimal fix, negative test and safe recovery
R149 uses identical #ifdef GL_FRAGMENT_PRECISION_HIGH branches in vertex and fragment, highp when supported and mediump otherwise. The failed-link path now reads gl.getProgramInfoLog safely, collapses whitespace and displays up to 180 chars within textContent, allowing exact cause identification on a real browser. No extra canvas/server/WebGL renderer, security changes, billing or duplication. R146 fine electrical arcs, R147 independent core 500% and R148 two-pass particle luminous sprites remain untouched.

Added two tests: (1) parse both shader precision declarations and check highp and mediump branches match, including reproducing the prior mismatch as a negative control; (2) inject explicit VFX-only GPU link failure in the WebGL mock, verify the sphere still draws, 0 particle draws and the visible diagnostic includes the mocked info log. Node suite PASS 72/72. Cloudflare Pages isolated preview deployed with all queued/initialize/clone/build/deploy stages SUCCESS for SHA 5589551; public preview https://c26521dc.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.

## Limits and NEXT
Do not confuse 72 mocks + static export with a real iPhone WebGL link PASS. The owner screenshot is the **failure** proof, but no post-fix iPhone visual confirmation exists yet. A standalone local Chromium GPU probe was attempted but TIMED OUT; no browser pixel/E2E evidence or mobile FPS. User can open the unique R149 preview and verify the new VFX status says "VFX actif" and selecting Vortex/Étincelles changes visible particles. If an error persists, copy the newly displayed bounded link info and fix precisely. Do not assume this patch solved other unrelated GL compiler/linker errors without post-fix evidence.

ROLLBACK=https://9e056a25.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
