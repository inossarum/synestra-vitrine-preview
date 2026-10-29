# R190 — Atlas Babylon v0.1 / sphère Labo 3D : raccordement au contrat

DATE=2026-10-29
MISSION_ID=SYN_LAB_R190_BABYLON_ENGINE_20261029
OWNER=Labo 3D / worktree isolé task/SYN_LAB_R190_BABYLON_ENGINE_20261029
BASE_COMMIT=beb1a330b9b3c29fc43d1083b91c24f8f51d3627
ATLAS_ID=ATLAS_BABYLON_3D
ATLAS_VERSION=0.1.0
ATLAS_LOCAL_WORKTREE=I:\_STUDIO_STAGING\syn_atlas_babylon_20261029
ATLAS_LOCAL_HEAD_AT_INSPECTION=053b9d289378fe63d5b3d43e55e5d80d28288d0a
ATLAS_CONTRACT_SHA256=D182743DEDB9A470A9E7DA960E69023EEDAE45D6A967DE37EC74A361ED8B909C
ATLAS_SCENE_SHA256=1DE5D9CEA9E90DB2D274017C881A4B7BA4E62300F3A62012EF297F90E1125D33
ATLAS_PUBLISHED_REMOTE_BRANCH=NOT_FOUND
ATLAS_SOURCE_GIT_STATUS=UNTRACKED (the owner's worktree untouched)
ATLAS_GLB_ASSET=NOT_FOUND in Atlas package, decor import not qualified
TARGET=SPHERE_ONLY / LAB (not room/decor, not public website)
DEPLOYMENT=NOT_EXECUTED

## Discovery and contracts
Local Atlas source at 05_PROJECTS/atlas-babylon-3d, files README.md, package.json, src/contract.mjs, src/scene.mjs, test/contract.test.mjs.
Atlas owns decor and exposes CORE_SOCKET. Consumer Labo owns Babylon Engine, Scene, Camera, sphere/nucleus/filaments; no second engine/canvas/Worker. Both depend on Babylon 9.33.0.
Owner worktree contains modified Supervisor evidence and untracked Atlas files; no edits, commit, push or cleanup performed there.

## Changes in R190 only
- lab-babylon/src/atlas-interop.js : pure socket adoption, standalone fallback, required-mode failure, descendant cycle rejection, reversible unmount.
- lab-babylon/src/main.js : a single LAB_SPHERE_ROOT for existing meshes, attach to CORE_SOCKET if available.
- lab-babylon/tests/atlas-interop.test.mjs : actual local Atlas contract SHA and peer version verification, Node NullEngine lifecycle assertions, browser packet checks.
- lab-babylon/tests/sphere-atlas-e2e.mjs : isolated browser fixture CORE_SOCKET (no decor) with 4 nucleus modes x 1100 and 390 px. Fixture mode activated only by explicit query atlasSocketFixture=1.
- Babylon bundle rebuilt locally; earlier R189 unchanged and no SiteForge public modification.

## Tests and evidence
- Atlas unit contracts node --test test/contract.test.mjs : 3/3 PASS.
- Labo adapter Node + old regression : 5/5 PASS, local actual Atlas contract read via SYNESTRA_ATLAS_CONTRACT_SOURCE, no skips.
- Browser native Chrome RTX3090 ANGLE D3D11 : R190_ATLAS_SOCKET_BROWSER.json status PASS, 8 frames, atlasSocket=atlas-socket, 1 canvas, WebGL error=0, modes 0..3.
- Browser original standalone repeated: R190_BABYLON_BROWSER.json status PASS, 8 frames, no second renderer, no regression.
- Visual captures: lab-babylon/evidence/r190-atlas-socket-core{0..3}-{1100,390}.png.
- No claim of actual GLB asset import or published Atlas module consumption. Atlas source is uncommitted; current integration validates its contract at local SHA rather than packaging an unpublished dependency.

## Remaining gates
(1) Atlas owner publishes versioned commit/ref, artifact GLB, manifest and independent browser E2E.
(2) Consume real Atlas attachBabylonDecor(scene) only in scenes that need a decor. Sphere-only remains isolated.
(3) Visual fidelity: core glow saturation, cyan/violet flux balance, curved volumetric paths vs owner image; no artistic acceptance.
(4) Physical modest GPU and phone, WebGL context-loss test in Babylon; no public promotion.
NEXT=read this checkpoint, compare latest Atlas HEAD/contract SHA, verify published version; integrate only when owner version is immutable.
ROLLBACK=R190 baseline beb1a330 or R189 d6d041ea; preserve other worktrees.
