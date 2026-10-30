# Labo 3D — R201 : QA native WebGL2 et revue visuelle

DATE=2026-10-30
MISSION=SYN_LAB_R201_CORE_SHELL_FUSION_20261030
REPOSITORY=inossarum/synestra-vitrine-preview
SOURCE_HEAD=7aa54f44047acdd9718a98d3d3dfe792167fa5b4
BASE_R200=d401638fa8f06964439acb72c6eec991eef969b7
BRANCH=task/SYN_LAB_R201_CORE_SHELL_FUSION_20261030
ENGINE=Babylon.js 9.33.0
BUILD_METHOD=In-memory esbuild (write=false), using existing clean R200 node_modules without worktree creation or modification
BUNDLE_SHA256=3f305842f11e9aef0f9a831d38e8c8a5eba7540f00de0237531e231415ccc2de
BUNDLE_BYTES=7406119
BUNDLE_GITHUB_PUBLICATION=R201_GZIP_ARCHIVE_ONLY (raw JS blob absent; compressed archive SHA-pinned, reconstruct with --restore)
NATIVE_BROWSER=Chrome headless new, Windows ANGLE Direct3D11, RTX 3090, WebGL2
DEVICE=Inos-Cerebros
PREVIEW=http://127.0.0.1:19126/lab-babylon/index.html?labFrame=4.5 (local-only, temporary)
E2E_REPORT=lab-babylon/evidence/R201_STYLED_NATIVE_BROWSER.json
NATIVE_E2E=PASS 21/21 observations, 0 WebGL errors, 1 Engine/Scene/Canvas, no observed browser exceptions
SRC_FIX=core-volume auto quality acceptance@3399ddc744ff734b8a5940fe4aca40fefd4ca3e8
SRC_FIX=core-shell-flow auto tier@5dab6252a0569469fdc485a9088613769cf93e1b
SRC_FIX=main bridge veil disable-before-update@46b0302e5c7da30a66ca6cffbac62f5bc7e11f4c
BROWSER_VALIDATION=4 core modes x 1100/390; 4 quality options x 1100/390; 3 orbit poses; 2 power-zero negatives
QA_STYLING=CSS 200, canvas 690x675 at 1100 and 364x405 at 390; horizontal overflow absent
CORE_SHELL_VEILS=economy 0,balanced 4,ultra 6,auto 4,power-zero 0
SCREENSHOTS=11 native PNGs in lab-babylon/evidence/r201-styled-*.png
TRUTH=390 is Chrome emulation, not a physical mobile; RTX3090 FPS samples do not establish low-end performance
VISUAL_DIFF=R200 and R201 screenshots independently inspected; central changes observable but modest; nucleus remains small, plasma still filament-like
ART_REFERENCE=reference/SPHERE_CANONICAL_20261029.md@93e6802a3c4e894235aabcd45f1e2ace1e0fba82; original reference image binary still unavailable in Git
ARTISTIC_ACCEPTANCE=PARTIAL; owner review still pending
PRODUCTION_DEPLOY=NO
MAIN_MERGE=NO
FREE_ONLY=YES

## QA harness recovery
Initial 21/21 checks on an unstyled ephemeral preview were rejected as artistic evidence because /lab-babylon/style.css returned HTTP 404. Added exact stylesheet route to the in-memory loopback preview, verified 200, then reran all 21 native checks with screenshot dimensions and viewport overflow guards. A first styled test used an invalid assumption that body backgroundColor must be opaque; removed the false assertion after verifying actual 690x675 canvas. The final 21/21 run and the accompanying PNGs are the accepted technical evidence.

## Incomplete gates
- Full repository Node suite on an actual checked-out R201 worktree: NOT_RUN due prior isolated worktree creation POLICY_DENIED, not bypassed.
- R201 dist/babylon-lab.js: built in memory, not durably published as executable bundle; R200 remains last verifiably versioned executable.
- Original artwork binary and exact visual difference to reference: MANQUANTE.
- Physical lower-tier GPU and mobile testing: NOT_RUN.
- R201 commercial and artistic DONE: NOT_CLAIMED.

## Resume
Keep R201 branch and R200 rollback intact. Verify GitHub screenshot blob SHAs/readback. Qualify a native authorized build-to-GitHub artifact path (do not retry refused Windows worktree creation). Use real screenshots to plan bounded R201 artistic changes only with actual visual proof. Persist exact artifact SHA and maintain explicit pending gates.

## Durable R201 bundle recovery (GitHub)

- Compiled gzip archive: `lab-babylon/dist/babylon-lab-r201.js.gz`, 1,645,924 bytes, SHA-256 `5d21f008c4178969caaac0549e26a38a79d65bdd226831b10d861bf620c66042`, Git blob `0334b89fe3b58b63ab539e01ce2caaa0df390f91`.
- Reconstructed JavaScript: 7,406,119 bytes, SHA-256 `3f305842f11e9aef0f9a831d38e8c8a5eba7540f00de0237531e231415ccc2de`.
- `node lab-babylon/scripts/recover-r201-bundle.mjs --verify`: read-only verification. `--restore`: explicitly overwrite only known R200 or matching R201 dist SHA in an appropriately authorized isolated checkout.
- Archive does not modify the default HTML script target until explicit restoration. Not a public deployment. Initial 7.4MB direct GitHub blob upload failed transport; expected blob was confirmed absent by GitHub 422 tree-object validation.
