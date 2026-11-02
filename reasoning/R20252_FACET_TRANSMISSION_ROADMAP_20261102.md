# Labo 3D — R202.52 Facet Transmission Roadmap

MISSION_ID=syn-lab-r20252-facet-transmission
OWNER=Inos
DATE=2026-11-02
STATUS=IN_PROGRESS
TARGET_REPOSITORY=inossarum/synestra-vitrine-preview
TARGET_BRANCH=task/SYN_LAB_R20252_FACET_TRANSMISSION_20261102
BASE_CHECKPOINT=8935173aeb25e2919aa39476924cdd79b9c21160
PR=NONE_FOUND_FOR_R20252
FREE_ONLY=YES
MAIN_MERGE=NOT_AUTHORIZED
DEPLOY=NOT_AUTHORIZED

## Objective
Restore legibility of the illuminated nucleus facets without removing the cold shadow-glaze or plasma volume. Preserve the 80-face nucleus, 28 ribbon streams, 6 node streams, one GlowLayer, 16-step volume raymarch and zero-power shutdown. Qualify in the real Babylon scene on RTX 3090, then complete exact-source build, full regression, artistic review and only the specifically authorized delivery scope.

## Acceptance criteria
- Focused lit-facet share above luma 150 loses no more than 2 percentage points versus R202.49 at matched frames 6 and 18, power 145%.
- UI control region remains unchanged; zero-power volume and nucleus emission remain off.
- Cold-shadow facet classification is preserved; no added light, mesh, render pass, engine, Worker or broker.
- Native Babylon scene still has 178 meshes, the central nucleus has 240 indices / 240 vertices (80 triangles), one canvas and existing GlowLayer; preserve 28 ribbons and 6 node streams.
- A real native Babylon A/B is observed at two deterministic frames; no standalone synthetic WebGL result substitutes for acceptance.
- Exact candidate source build and all relevant Babylon regression tests pass before any release claim.
- Human artistic signoff and any separate release authorization are recorded before release. No main merge or deployment is implied.

## Ordered roadmap

### S01 — Revalidate mission source, state and grant
- Target: this branch / HPSYN source PR #350.
- Dependencies: none. Authorization: read-only.
- Acceptance: exact PR #350 HEAD and HPSYN_COMMAND.md blob verified before/after; current R202.52 remote HEAD verified; owner identity, exact pinned Bridge device and exact four read capabilities checked; latest checkpoint read.
- Evidence: PR #350 HEAD 958390f06f5b88f02823bab449e60cc26c9901f3; command blob 169afc41b4da36d910a5703d39a044a6b5993f80; R202.52 remote HEAD 8935173aeb25e2919aa39476924cdd79b9c21160; Bridge identity/device/status PASS, expiry >6h, no renewal required.
- Status: DONE.
- Next: capability delta and native engine availability.

### S02 — Capability delta and mandatory-engine disposition
- Target: Connect / Central Skills / PR #387, #398, #419, #420 and #439.
- Dependencies: S01. Authorization: read-only.
- Acceptance: exact PR HEADs and blobs read; targeted 3D/visual/E2E skills and dependencies read; each mandatory HPSYN engine classified with current live availability; no DRAFT source misrepresented as deployed tool.
- Evidence: PR #387 ba993d008292f56b63fdbacf1ba02c81c851e2b1; #398 2f0220b6ebbf32a90bd7173b1dc4e850487e09a0; #419 25e7c85ebc931867c4321349bb41d4b0be869499; #420 7c14963dcf8d01217c3fc17e52f9576ad0eee6ac; #439 181c32fec85c6268bf9bd30bbf5e023f1fe82488.
- Status: PARTIAL — Doctor (#387), PREVISE (#398), Maintenance (#419), Memory builder (#420) and Visual Engines (#439) sources are pinned to their current open DRAFT PR heads. Their corresponding Doctor/PREVISE/Maintenance/Creative Director/Visual Accelerator native tools are not exposed in this Connect session. `synestra_visual_connect_status` is READY_FOR_USER_BROWSER_TEST, but explicitly does not attest browser media or model image receipt and is not the Visual Accelerator. `synestra_bridge_binding_status` is PAIRED with only the four owner PC read/process capabilities; this is not Owner Maintenance engine execution. Native HPSYN Workflow binding is confirmed live by Cloudflare GET; the six-step mission is terminal BLOCKED because its two Bridge reads are not replay-safe in Workflow. These capabilities remain UNAVAILABLE, not PASS. Source-delta correction: PR #439 unchanged HEAD `181c32fec85c6268bf9bd30bbf5e023f1fe82488`, current module blob `28b2da7fe3777f4b76f22f731550299783ccdc60`; the prior `a94e.../1181...` entry was stale. HPSYN_COMMAND.md registry row was corrected on PR #350 branch `task/SYN_CONNECT_DESCRIPTION_LIMIT_20261029`, new PR #350 HEAD `958390f06f5b88f02823bab449e60cc26c9901f3`, command blob `169afc41b4da36d910a5703d39a044a6b5993f80`; row still correctly states PR #439 DRAFT / runtime deployment unverified.
- Next: publish local QA guard correction and checkpoint.

### S03 — Persist strict QA gate correction
- Target: lab-babylon/scripts/r20252-contrast-audit.mjs, lab-babylon/tests/r20252-contrast-audit-cli.test.mjs, and evidence/R20252_GATE_CLI_LOCAL_CHECKPOINT_20261102.md on this branch.
- Dependencies: S01. Authorization: update existing task branch only; no main merge or deployment.
- Acceptance: diagnostic mode preserves machine-readable VISIBILITY=FAIL; strict mode returns exit 3 on the 2pp regression; missing-fixture strict gate is tested; strict dependency-free regression remains green; GitHub readback verifies blob/commit SHAs; reconcile the local worktree only when non-destructive and authorized.
- Existing local evidence: 110 PASS / 0 FAIL / 0 SKIP with native-fixture strict mode; log SHA256 B455F06AB98C302386747453AE3EA5054050953CD3B37818E95269B4265E212C.
- Evidence: audit script blob `37383b89f38bbffeaf81081c2d486308a523bbe9`; CLI test blob `214d07f9a342bc8c1096563b7e7c3b1ede305583`; QA checkpoint blob `9c403feb883320f50e3698e89d13a64caa598f9c`; final branch HEAD `2cf0f20d05771c29aaccb8bada23cd20128fdb38` verified via GitHub readback and `git ls-remote`.
- Status: DONE — GitHub-first QA publication and readback complete.
- Evidence: roadmap `reasoning/R20252_FACET_TRANSMISSION_ROADMAP_20261102.md` is commit `90f69dd8db75d27b759135d74e3456e451758514`; audit script blob `37383b89f38bbffeaf81081c2d486308a523bbe9`; CLI test blob `214d07f9a342bc8c1096563b7e7c3b1ede305583`; QA checkpoint blob `9c403feb883320f50e3698e89d13a64caa598f9c`; publication commits `cdaad9d3f9d40e3ac010fd239dea628ea75d7555`, `22999ebda95424c99afbf13d5d00338abeaf8528`, `2cf0f20d05771c29aaccb8bada23cd20128fdb38`.
- Next: revalidate the prior source-transfer platform denial only through its original authority, if that exact route is exposed.

### S04 — Revalidate the historical source-transfer blocker
- Target: R202.50 source fragments needed by R202.52.
- Dependencies: S02. Authorization: read-only exact-scope status check only through the original authorized platform path if exposed.
- Acceptance: classify the earlier source-transfer refusal precisely; preserve PLATFORM_SAFETY_DENIAL_HISTORICAL / PLATFORM_SAFETY_REVALIDATION_UNAVAILABLE unless the original platform returns a new authoritative decision. Never re-execute the denied transfer through Git, GitHub, Bridge, shell or another transport.
- Evidence: prior exact source transfer into the R202.52 worktree was blocked; no current dedicated platform revalidation interface is exposed in this session.
- Status: BLOCKED — historical denial not revalidated; no bypass.
- Next: if no original revalidation interface exists, keep source-transfer and shader mutation stopped; continue independent QA publication.

### S05 — Bounded facet-transmission correction
- Target: isolated R202.52 candidate shader only.
- Dependencies: S03 and S04. Authorization: only after source access/mutation is allowed by the original authority.
- Acceptance: restore transmission only for key-lit facet normals while retaining cold shadow planes, opacity ceiling, plasma attenuation and all geometry/runtime invariants. Change one causal factor per A/B.
- Provisional quality gate: focused lit-facet share above luma 150 loses <=2pp at frames 6 and 18, power 145%; UI control delta=0; power-off emission=0.
- Status: BLOCKED — no authorized source-transfer path; no production shader change.
- Next: execute only after S04 grants a real permitted source route.

### S06 — Native Babylon fixed-frame A/B and visual inspection
- Target: exact candidate bundle in the real Babylon scene, RTX 3090 D3D11.
- Dependencies: S05. Authorization: existing isolated runtime/read-only browser path only.
- Acceptance: matched viewport, camera, quality, frame and power; observe reference/candidate pixels; verify nucleus topology 80 faces / 240 vertices, scene mesh count, GlowLayer, ribbons/nodes and no UI mutation; power-off lifecycle; independent pixel metrics and human-visible gallery.
- Status: NOT_STARTED — previous instrumented R202.49 bundle evidence applies only to the prior candidate, not a new R202.52 correction.
- Next: requalify every new candidate after S05.

### S07 — Exact source build and full regression
- Target: combined R202.50 + R202.51 + R202.52 source tree.
- Dependencies: S05 and S06. Authorization: only an explicitly authorized dependency/build path within existing FREE_ONLY limits.
- Acceptance: exact pinned source build; all 12 Babylon-dependent test files plus dependency-independent suite; no install-policy workaround; retain complete outputs, exit code and hashes.
- Status: BLOCKED — previous dependency installation was refused; no alternate installation method.
- Next: revalidate the original dependency/build permission route; if unavailable mark only this dependency BLOCKED.

### S08 — Artistic acceptance and release gate
- Target: existing reviewable task branch/PR; main/runtime only if separately authorized.
- Dependencies: S06 and S07. Authorization: human artistic signoff; any merge/deploy separately verified.
- Acceptance: visual gates pass; owner sees actual Babylon result; all tests and evidence are persisted and read back; rollback and exact release target are verified.
- Status: NOT_STARTED.
- Next: no release while any prior gate is unresolved.

## Current verified state
- Previous native instrumented Babylon A/B (R202.49 bundle with exact R202.50/R202.51 GLSL injection) showed focused lit-facet share drops of 7.996pp at frame 6 and 7.933pp at frame 18; provisional threshold is exceeded. This remains the underlying visual defect.
- Current strict dependency-free suite: 110 PASS / 0 FAIL / 0 SKIP; log SHA256 B455F06AB98C302386747453AE3EA5054050953CD3B37818E95269B4265E212C.
- Connect toolbox rev17 SHA256 72d1dba38fa96b3a03a01acc395ddfcd0fd3fcdc3f1c31d16ce3ce8b1d83cdee; HPSYN command is intentionally absent from toolbox. HPSYN launches from PR #350 pinned GitHub source.
- HPSYN direct Workflow launch used PR #350 HEAD `288850175fb1f51f9c3ba6819f42ec31f88e2029`, mission_id `syn-lab-r20252-facet-transmission`, workflow instance `hpsyn-1a70dd1364ae-syn-lab-r20252-facet-transmission`, plan hash `bcff0531efdfa409216f051ca9f32e5d373fbe83bd0ace2492269e4e203a6cd0`. Terminal status: workflow `COMPLETE`, mission `BLOCKED`, 6/6 steps resolved. Four native read steps PASS; two Bridge read steps BLOCKED / `HPSYN_NATIVE_STEP_NOT_REPLAY_SAFE`. No retry or resubmission. PR #350 then moved through the verified documentation-only registry correction to HEAD `958390f06f5b88f02823bab449e60cc26c9901f3`; the terminal workflow remains historical to the original plan/source and has not been rewritten.
- Memory V1 manifest at PR #350 HEAD 958390f06f5b88f02823bab449e60cc26c9901f3, blob bffab3f8d718e93286ee884c53fb53dd25f35cfe, contains 185 entries; targeted search returned no R20252-specific record. This is NO_MATCH_IN_MANIFEST for this search, not proof that Memory is empty.
- Cloudflare live runtime baseline (first current-turn attestation; prior comparable runtime frontier not available): Worker tag/script `aec82f7646cf4eb697e3b46d766118c1`; latest deployment `4fc27c4c-5a53-495f-b094-c0a08d715580` at `2026-11-02T09:53:33.231974Z`; active version `7a27f1c4-dfaa-48a4-a4c1-ca42d068c393` serving 100%; exactly 34 bindings; `HPSYN_MISSION_WORKFLOW` present with class `HPSYNMissionWorkflow`, workflow name `hpsyn-mission`. Read-only Cloudflare GET succeeded; secrets were not read. The deployment annotation states previous recovery/revert; annotation text is not an authorization or source attestation. No deploy was performed.
- Exact source/runtime gates remain separate. No main merge, no deployment, no release.

## Status and next action
ACTIVE_STEP=S04
NEXT_ACTION=Preserve `PLATFORM_SAFETY_DENIAL_HISTORICAL` / `PLATFORM_SAFETY_REVALIDATION_UNAVAILABLE`: no original-authority exact-scope read-only revalidation interface is exposed in the current tool inventory. Do not transfer R202.50 source or mutate production shader through another route. Continue only independent authorized work.