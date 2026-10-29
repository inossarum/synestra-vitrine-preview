# Synestra Labo 3D — R199 core redesign / checkpoint et plan
DATE=2026-10-29
MISSION_ID=SYN_LAB_R199_CORE_REDESIGN_20261029
OWNER=Synestra Studio / Labo 3D
REPO=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_LAB_R199_CORE_REDESIGN_20261029
BASE_R198=e5889bafb4f46fcb96b7adf51772b3ff70f28cbf
CANONICAL_ART_REF=reference/SPHERE_CANONICAL_20261029.md@93e6802a3c4e894235aabcd45f1e2ace1e0fba82
IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ATLAS_CONTRACT=ATLAS_BABYLON_3D@0.1.0 CORE_SOCKET unchanged
BROWSER=http://127.0.0.1:19124/lab-babylon/index.html?labFrame=4.5
RUNTIME=Babylon.js 9.33.0, Chrome on Inos-Cerebros RTX3090 D3D11
PUBLIC_DEPLOYMENT=NO
BILLING=FREE_ONLY
TECHNICAL_GATE=PASS
ARTISTIC_FIDELITY=PARTIAL — owner visual approval pending
SOURCE_GATE=LIMITED — original concept art PNG not backed in repo / Memory V1 not read this turn

## Scope and delta
- Replaces R198's circular/mechanical core loops with 18 open, 3D, radial plasma tendrils; mode 0 now reveals 16 tendrils, other modes retain distinct dynamics.
- Reduces central ico-sphere and halo diameters; white-violet focal point, four energy colors retained; longer tendrils in mode 0.
- Four core modes: emanations radiales, vortex tridimensionnel, courants tressés, ondes pulsées. Settings for radius/power/speed unchanged.
- Preserves 28 shell ribbons, 14 glow sheaths, 12 node forks, 6 travelling photons, six nodes, quality tiers and one Engine, Scene, Canvas.
- No modification of shared Atlas GLB, SiteForge, main, Supervisor, Tool Broker, account permissions, security or any other worktrees.
- Existing R198 branch and commit remain rollback.
- As requested, design favors an energetic core, but screenshot still shows a small bright central spot and filament-like rays: do not report artistic DONE.

## Seven-step execution roadmap
| ID | Deliverable | Proof | Status |
|---|---|---|---|
| 01 | Verify Synestra rules, mission R198 and source | toolbox rev16 SHA a9a1b894; GitHub HPSYN PR350 HEAD a30ed8c4; R199 base R198 verified | PASS |
| 02 | Preserve work and isolate R199 | dedicated worktree on task/SYN_LAB_R199_CORE_REDESIGN_20261029 from e5889baf; R198 untouched | PASS |
| 03 | Repair partial core implementation | updated main.js, 4 modes, open radial tendrils, small nucleus, balanced aura; index label | PASS |
| 04 | Compile and render with real native tools | npm run build (esbuild 7.1MB), Chrome HTTP200, GPU RTX3090; screenshot PNG evidence | PASS |
| 05 | Prove controls and regression | Chrome 8 nucleus screens, 6 tier checks, 3 orbit captures, 2 power-zero; Node 45/45 R199 PASS plus 4/4 R196 historical PASS | PASS |
| 06 | Compare against prior native runtime and visual reference | screenshot delta R198→R199 1.3606% 1100px and 1.5903% 390px; core modes distinct; art still PARTIAL | PASS_TECH_PARTIAL_ART |
| 07 | Durability and GitHub verification | stage, git diff --cached --check, commit and push dedicated branch, local=remote SHA readback | PENDING |

## Verified local evidence SHA256
- lab-babylon/src/main.js 6701D264F8C240FA6ACBF00D311B98A9A7819929762011E04351EBAF6D8041C2
- lab-babylon/dist/babylon-lab.js 09C02BA3D91C61D0495ECF6FD06F1336A9E83FBE2813E4D51ED8276744599386
- lab-babylon/evidence/r199-core-try-core0-1100.png 378114A41594C199F4F633F5652139CCC1BCE69E20DC62EC11B1BAD5F137ED5B
- lab-babylon/evidence/R199_CORE_TRY_BROWSER.json 4432E2D10C5E157CC230658E158BE776478E7C0B9124BD133F3C131A39F41322
- R199 browser report status PASS, 19 checks (8 mode×width images, 6 tier, 3 orbit, 2 core zero), no WebGL error.
- Historic R196 core-balance.test.mjs initially rejected R199's new version string, not a runtime failure; R196 tests run in their own pinned worktree 4/4 PASS. Current R199 regression suite 45/45 PASS. Do not change the historical assertion to falsely claim R196 from R199.

## Remaining gates
- R199 must be pushed and remote SHA re-read before step 07 DONE.
- Human aesthetic review of core and concept reference remains pending; geometric and screenshot changes are not equivalent to artistic acceptance.
- No real modest GPU, physical mobile, or stable hardware benchmark tested.
- Atlas knowledge R190-R197 published at a98e3dad; R198 registry synchronization was previously refused: not claimed updated, and this scope does not bypass that refusal.
- NEXT after verified push: R200 artistic density/brightness if necessary, human visual review, and resume authorized Atlas catalog operations separately.
- ROLLBACK=R198@e5889bafb4f46fcb96b7adf51772b3ff70f28cbf.
