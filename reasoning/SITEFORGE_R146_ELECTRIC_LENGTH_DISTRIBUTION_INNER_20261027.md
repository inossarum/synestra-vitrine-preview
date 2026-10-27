# SiteForge R146 — longs filaments électriques distribués et profondeur intérieure

MISSION_ID=SYN_SITEFORGE_R146_LONG_THIN_DISTRIBUTED_INNER_LIGHTNING_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R146_LONG_THIN_DISTRIBUTED_INNER_20261027.json
DEPLOYED_SOURCE_COMMIT=6abcd5122a3df20fa314df8acf6bd40bd1756b2f
DEPLOYMENT_ID=21afaed2-be41-4d67-9673-0ffb2fc5699d
STATUS=PREVIEW_DEPLOYED_65_PASS; REAL_VISUAL_E2E_PENDING

## Requirement
R145 electricity now looks better but there are too few, too short bolts. User corrects the earlier assumption that lightning should be thicker: **more numerous and longer, same fine width**, appearing throughout the sphere with an impression of current behind/inside the shell.

## Root cause and minimal delta
R145 had three surface arc generators, all with their origin in the same material-coordinate center and an end distance .43 to .71. Keep the proven angular thin-stroke helper `r145ElectricBolt`, including exact width constants for stroke core exp(-path*170.), halo exp(-path*34.) and fork exp(-forkPath*155.). Lengthen the bolt valid path to start=.005+seed*.055 and end=.87+.22*hash3(...), about 1.95× typical R145 active length. Preserve 3 real original front strikes and add 5 offset starts across the globe. Add 3 independently time-offset simulated back-surface strikes using a rotated backNormal with negative geomN.z. Keep the back strikes subtler and add a separate light and alpha term so they remain visible when shell visibility is 0. No camera change, no global geomN rotation, no duplicate renderer; keep original eight radial electrical arc primitives and 32 existing controls.

## Scope and policy
Used SHA-pinned Synestra Connect Skill profiles failure-first, debugging and visual-regression-testing; Studio Memory branch HEAD confirmed through Connect. GitHub source file changed on the existing isolated preview branch. Previous GitHub tests/page writes were explicitly denied; **no repeat and no alternative bypass**. Therefore the HTML badge remains "R145 · CANDIDATE" even though the deployed JS shader is R146. The 65 passing existing tests are broad regression/build checks, **not** new persisted R146-specific tests; R146-targeted static assertions (number, distribution, lengths, source widths, transparency and fixed normals) were executed read-only, all PASS.

## Deployment and remaining acceptance
Cloudflare Pages project synestra-vitrine-preview is restricted to an allowlisted preview branch, with production_deployments_enabled=false. Verified Pages deploy 21afaed2-be41-4d67-9673-0ffb2fc5699d for commit 6abcd512: queued/initialize/clone/build/deploy SUCCESS, node tests 65/65 PASS, SYNESTRA_STATIC_EXPORT=PASS. Preview URL: https://21afaed2.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/. Production/main/Visual Observer unchanged.

Not verified: actual GPU shader compile, real screenshot/foreground and back current appearance, iPhone FPS and visual quality acceptance. NEXT: inspect Electric at shell=100 and 0, with same fixed viewport and paused animation for deterministic screenshot; verify long thin front strikes and weaker rear-plane strikes, compare old R145, monitor mobile FPS, and resolve outdated UI badge/test write restriction through authorized permission update only. Rollback R145: https://c82f4bc1.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.

SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
