# Synestra Labo 3D — R200 volumetric core / execution checkpoint

DATE=2026-10-30
MISSION_ID=SYN_LAB_R200_CORE_VOLUME_20261030
OWNER=Synestra Studio / Labo Babylon
REPOSITORY=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_LAB_R200_CORE_VOLUME_20261030
BASE_R199=985f376e46cdc9f3cbc8e32ab052011565a0f2f2
CANONICAL=reference/SPHERE_CANONICAL_20261029.md@93e6802a3c4e894235aabcd45f1e2ace1e0fba82
ART_REFERENCE_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ENGINE=Babylon.js@9.33.0
ATLAS=ATLAS_BABYLON_3D@0.1.0 / CORE_SOCKET
RUNTIME=Inos-Cerebros, RTX3090 ANGLE D3D11, Chrome headless native WebGL2, Node v24.19
LOCAL_PREVIEW=http://127.0.0.1:19125/lab-babylon/index.html?labFrame=4.5
SOURCE_OF_TRUTH=GitHub, local worktree isolated from R199
FREE_ONLY=YES
SITEFORGE=UNCHANGED
MAIN=UNCHANGED
PUBLIC_DEPLOYMENT=NO
TECHNICAL_GATE=PASS_LOCAL
ARTISTIC_GATE=PARTIAL; owner screenshot review remains outstanding
DURABILITY_GATE=PENDING_COMMIT_PUSH_SHA_READBACK

## Source delta
- lab-babylon/src/core-volume.mjs: new deterministic, bounded open 3D core paths, four modes, per-stream alpha-compatible width values, fail-closed geometry inputs.
- lab-babylon/src/main.js: uses same Babylon Engine/Scene/Canvas, 18 internal open plasma filaments; reduced emissive focus white-violet, softer aura. The 28 exterior shell ribbons, 14 sheaths, 6 nodes, 12 forks and 6 photons are preserved.
- lab-babylon/index.html: R200 label. The real bundle dist/babylon-lab.js has now been rebuilt from the source on owner Windows.
- lab-babylon/tests/core-volume.test.mjs and core-volume-integration.test.mjs: source/geometry tests; core-volume-render.test.mjs: current GPU evidence and mode comparisons; sphere-core-volume-e2e.mjs: reproducible native Chrome capture script.

## Actual current-turn test proof (not simulated)
- Node --test 49 PASS, 0 FAIL, 0 SKIP: R200 source/invariants, legacy R198 and earlier compatible spatial regression checks; historical R196/R199 literal-version tests deliberately remain on their pinned worktrees.
- Native Chrome WebGL2 19 observations: 4 nucleus modes x 2 viewport sizes; 3 quality budgets x 2 sizes; 3 3D orbital poses; 2 core-zero tests. Status PASS, one canvas, Babylon engine, 28 shell ribbons, palette violet/cyan/dark-blue/green, WebGL errors 0.
- Additional R200 native render differential Node tests 4 PASS: exact screenshot R199/R200 at frame 4.5 differs 1.2784% of 1100px pixels, 1.2296% of 390px pixels; all four nucleus modes visually distinguishable.
- Total 53 Node tests PASS, 0 FAIL; 19 Chrome observations PASS. A 390-pixel Chrome viewport is emulation, not a physical smartphone.
- Current 7.1MB bundle built using npm run build; served at 127.0.0.1:19125/lab-babylon/index.html with HTTP 200. The localhost address is only usable on the host PC.
- R200 is visually more volumetric but center remains a bright focal point; geometry/pixel delta does NOT establish artistic acceptance.

## Native evidence paths / SHA256
- lab-babylon/src/main.js: 633630397D01E442DC8EC026FCB454E0E99B61F9398CC654118FBA116AD826B1
- lab-babylon/src/core-volume.mjs: AAB83866AE8F0292D9389CB729F1CB212F55C72724BA1FCA12B6173B1EC8F2CD
- lab-babylon/dist/babylon-lab.js: 4B6D01E094DEBC6765C7FA1075F32A9F9065E6D37A465DBB046CF12745BA0B9F
- lab-babylon/evidence/R200_VOLUME_BROWSER.json: E38AC1BC288FE87DED875CD344A307A04A8A304344A8A85C91BE5EFE3A4B804F
- lab-babylon/evidence/r200-volume-core0-1100.png: FD093035AF8371C3588AB72E2B15EA108984609A68CC66F737E883168A4DCC57

## Reuse / rollback
Rollback: R199@985f376e46cdc9f3cbc8e32ab052011565a0f2f2.
No second Atlas, Engine, Worker or broker was created. Owner's shared Atlas worktree and GLB untouched.
Atlas knowledge branch separately records verified R198/R199; do not add R200 as GPU-verified until R200 commit and screenshot readback complete.
NEXT=Git stage specific R200 files; check staged diff; Git commit on R200 branch; push; read remote SHA and evidence file; update seven-step plan and Atlas registry with R200 technique only after source verified.
