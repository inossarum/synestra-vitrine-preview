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
- Evidence: PR #350 HEAD 288850175fb1f51f9c3ba6819f42ec31f88e2029; command blob a2c48ffdcd4cf6745baa312b011f5ea0a5543352; R202.52 remote HEAD 8935173aeb25e2919aa39476924cdd79b9c21160; Bridge identity/device/status PASS, expiry >6h, no renewal required.
- Status: DONE.
- Next: capability delta and native engine availability.

### S02 — Capability delta and mandatory-engine disposition
- Target: Connect / Central Skills / PR #387, #398, #419, #420 and #439.
- Dependencies: S01. Authorization: read-only.
- Acceptance: exact PR HEADs and blobs read; targeted 3D/visual/E2E skills and dependencies read; each mandatory HPSYN engine classified with current live availability; no DRAFT source misrepresented as deployed tool.
- Evidence: PR #387 ba993d008292f56b63fdbacf1ba02c81c851e2b1; #398 2f0220b6ebbf32a90bd7173b1dc4e850487e09a0; #419 25e7c85ebc931867c4321349bb41d4b0be869499; #420 7c14963dcf8d01217c3fc17e52f9576ad0eee6ac; #439 181c32fec85c6268bf9bd30bbf5e023f1fe82488.
- Status: PARTIAL — source reads and capability inventory done; Doctor, PREVISE, Maintenance and HPSYN visual-engine native tools are not exposed in this Connect session; HPSYN mission Workflow status read returned Operation denied/unavailable. These capabilities remain UNAVAILABLE, not PASS.
- Next: publish local QA guard correction and checkpoint.

### S03 — Persist strict QA gate correction
- Target: lab-babylon/scripts/r20252-contrast-audit.mjs, lab-babylon/tests/r20252-contrast-audit-cli.test.mjs, and evidence/R20252_GATE_CLI_LOCAL_CHECKPOINT_20261102.md on this branch.
- Dependencies: S01. Authorization: update existing task branch only; no main merge or deployment.
- Acceptance: diagnostic mode preserves machine-readable VISIBILITY=FAIL; strict mode returns exit 3 on the 2pp regression; missing-fixture strict gate is tested; strict dependency-free regression remains green; GitHub readback verifies blob/commit SHAs; reconcile the local worktree only when non-destructive and authorized.
- Existing local evidence: 110 PASS / 0 FAIL / 0 SKIP with native-fixture strict mode; log SHA256 B455F06AB98C302386747453AE3EA5054050953CD3B37818E95269B4265E212C.
- Status: IN_PROGRESS_FOR_GITHUB_PUBLICATION — QA delta exists locally only.
- Next: read the two local QA files and checkpoint; publish only those exact files to this task branch using GitHub compare-and-write, then verify readback.

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
- Mission status tool read returned Operation denied or unavailable; durable Workflow execution is not yet proven.
- Memory V1 manifest at PR #350 HEAD 288850175fb1f51f9c3ba6819f42ec31f88e2029, blob bffab3f8d718e93286ee884c53fb53dd25f35cfe, contains 185 entries; targeted search returned no R20252-specific record. This is NO_MATCH_IN_MANIFEST for this search, not proof that Memory is empty.
- Exact source/runtime gates remain separate. No main merge, no deployment, no release.

## Status and next action
ACTIVE_STEP=S03
NEXT_ACTION=Read local strict QA delta and checkpoint; persist those exact QA artifacts on the existing task branch, then verify GitHub readback and commit SHA. Preserve the local dirty delta; do not synchronize/reset it until a safe non-destructive Git path is verified.