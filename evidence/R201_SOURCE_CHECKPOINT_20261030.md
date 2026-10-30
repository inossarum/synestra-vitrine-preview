# R201 — Source validation checkpoint (2026-10-30)

MISSION=SYN_LAB_R201_CORE_SHELL_FUSION_20261030
REPOSITORY=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_LAB_R201_CORE_SHELL_FUSION_20261030
BASE_R200=852e1b89922f80db37a69349f1b884a49514b6e8
SOURCE_HEAD_AT_TEST=2e315c9321ace79715f6d45b95d6fa4ba8743a10
OWNER=Synestra Studio / Labo 3D Babylon
FREE_ONLY=YES
WORKTREE_MUTATION=NOT_ATTEMPTED (previous POLICY_DENIED must not be bypassed)
MAIN=UNCHANGED
PUBLIC_DEPLOY=NO

## Failure-first
Before correction, current exact source blobs rejected quality `auto` with `R201_VISIBILITY_INVALID_ARGUMENT` and `R201_VEIL_INVALID_ARGUMENT`. Inspection of the current render loop located `aura.setEnabled` inside `if(visible)`, allowing stale translucent veils after core power=0 or tier change.

## Corrective GitHub-only commits
- `fae04235d1e4c6d1301851358670f1e23e9287f6`: accept automatic tier (same veil radius/count as balanced, bounded defaults) in `lab-babylon/src/core-shell-flow.mjs`; blob `5dab6252a0569469fdc485a9088613769cf93e1b`.
- `2e315c9321ace79715f6d45b95d6fa4ba8743a10`: disable bridge aura unconditionally before any optional refresh, preserving core-zero behavior and original bridge/ribbon budgets in `lab-babylon/src/main.js`; blob `46b0302e5c7da30a66ca6cffbac62f5bc7e11f4c`.

## Actual tests performed in this session
- 48 isolated V8 source-level assertions PASS against SHA-verified GitHub blobs: six directions, sample bounds/endpoints, continuity, deterministic replay, tiers including auto, power-zero, invalid parameters, aura lifecycle source invariant, one Babylon Engine/Scene and Atlas interop.
- On owner PC Inos-Cerebros, actual Node v24.19.0 process PID 41960: `R201 NODE24 IN-MEMORY PASS checks=39 flowBlob=5dab6252a0569469fdc485a9088613769cf93e1b filesystemWrites=0`. Direct data: module import from reviewed GitHub contents; 6×5 geometry assertions plus tier, zero-power and negative cases. No local file or worktree was changed.
- Verified user interface `lab-babylon/index.html` contains quality `auto`, and pre-existing `plasma-ribbons.js` treats unrecognized non-economy, non-ultra as balanced profile.

## Explicit gates and omissions
SOURCE_VALIDATION=PASS
NATIVE_NODE_IN_MEMORY=PASS (39 checks; **not** complete repository test suite)
FULL_NODE_TEST_SUITE=NOT_RUN
BABYLON_R201_DIST_BUILD=NOT_RUN; dist still R200; source-only does not change visible pixels
REAL_CHROME_GPU_R201=NOT_RUN
PHYSICAL_MOBILE_AND_LOW_END_GPU=NOT_RUN
ARTISTIC_ACCEPTANCE=PENDING; reference source binary remains unarchived
ATLAS_R201_KNOWLEDGE=PENDING until real rendered evidence
R201_DONE=NO

## Recovery
Use only this exact R201 branch and compare its HEAD before editing. Retain the existing R200 runnable branch and its 53 Node/19 Chrome evidence. Do not attempt to recreate the previously rejected native Windows worktree by another tool. Next authorized independent action: build R201 via an approved isolated runner, verify actual Babylon UI, WebGL2 errors, four core modes, 6 nodes, six bridge veils, quality modes and power-zero, then publish captures and inspect visual reference. Never claim DONE based solely on pure source/Node in-memory checks.
