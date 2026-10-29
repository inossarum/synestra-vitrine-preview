# R208 — decision and recovery checkpoint
MISSION_ID=SYN_SITEFORGE_R208_VISUAL_REFINEMENT_20261029
OWNER=Inos; SOURCE_SHA=ed18f90ff72bd5c8ae1a1715d4f62ad3cbbe653c
WORKTREE=I:\_STUDIO_STAGING\syn_site_r208_visual_qa_20261029
BRANCH=task/SYN_SITEFORGE_R208_VISUAL_REFINEMENT_20261029
POLICY=FREE_ONLY; don't merge/push main, don't alter Cloudflare Access policies, avoid worktrees owned by others.

Decision: R207 screenshot Ultra was technically 3/3, 44.8 FPS but visually not representative of 3D LAB. The shader's uFlow.x=6 selected R187.5 simplified neon when >5.5, explaining smooth blurry ribbons. Reused unchanged R188.1 GLSL in volumetric mode uFlow.x=1 after comparing modes 0,4,5 and 1 with real Chrome. Chosen 1 gives detailed layered filaments; contrasted and inspected captures R208_flow*. Core and architectural refinements are separate non-authoritative modules. Runtime ONE WebGLRenderer, one scene/camera/canvas, quality selection and R205 governor unchanged. Mobile camera framing fixed.

Artifact delta: r204-build/scene.mjs, r204-build/lab-detail-r207.mjs, new r204-build/stage-atmosphere-r208.mjs, tools/build_vitrine_static.mjs, tests regression and new R208 tests, workflow, visual evidence. No changes to LAB GLSL source.

Recovery: base R207 @ed18f90; on this isolated worktree build with `node r204-build/build.mjs`, tests with `node --test tests/siteforge_r20*.test.mjs` (shell glob may need expansion), exact preview export with env CF_PAGES_BRANCH R208, browser localhost 18888 `node tests/siteforge_r208_browser_qa.mjs`. Never rely on an old CI when the SHA changed. Rollback via branch reset/revert **only this isolated branch** after checking owner; main never touched. No deployment unless verified branch preview allowlist and Access existing policies. Evidence: `evidence/SITEFORGE_R208_VISUAL_QA_20261029.md` + 3 PNG, browser JSON. Pending external GPU modest + authenticated Access + owner aesthetics.
