# R202.61 — DOCTOR/FAST/PREVISE/MAINTENANCE : no duplicate tuning, resolve routing and occlusion
Date: 2026-11-04 | Owner: Synestra | Mission: labo3d_sphere_r20261
Evidence: evidence/R20261_PER_NODE_DEPTH_GPU_DIAGNOSTIC_20261104.md and original JSON report.
Base source SHA: 39a10023d0faf6edc19e73ba3d8565528635ff8d.

## New causal facts
Six foreground node streams exist and retain stencil EQUAL=1. Five show no core difference >4 RGB with normal depth at the fixed camera yet become clearly detectable when depth is ALWAYS transiently set per node. Clone 1 contributes 894–903 pixels with normal depth already. The four-mode attribution is stable in the core and ring, but the mode2 external repeat drift of five pixels exceeds the predeclared cap of three; global run is FAILED, not PASS.
This resolves the previous ambiguity: the visibility problem is strongly caused by real geometric occlusion in the selected camera view; raising alpha in regions deeper than the surface will not make five hidden streams visible. It does not provide license to force depth ALWAYS in production.

## Root cause of repeated HPSYN blockage (partial)
Historical HPSYN `mission_id=labo3d_sphere_r20261`, plan_hash `572edc2e604b712ed0191aa98a0b7a11004c1f475cb5831f37affcee02a5ef5a` is COMPLETE/BLOCKED. Step ids and operation ids are unchanged. Direct read-only Connect calls show repository provider, skill suggestion and visual status each exist as service functions; two are in toolbox registry revision 17, but central_skill_suggest is not. Thus workflow step availability/engine preconditions are incompatible with direct-tool catalog at least for skill_route. The exact code path of Doctor and Worker dispatch is not exposed by these receipts. Do NOT infer a 3rd-party policy denial or claim the Worker was repaired. QUEUED Studio health/bootstrap operations are not DONE and must not be resent without retrieving the same IDs.

## Repair strategy, no redundant authority
1. Do not rerun root-alpha, root-surface, global hotspot, global mist width/opacity or depth bypass variants: all rejected by prior GPU gates and exact same source.
2. Route maintenance next through the *existing* Worker source and existing allowlist, pinned to a verified source revision; determine whether HPSYN `repo_state` and `visual_probe` require a different executor or engine readiness bit. Skill suggestion is context-only and lacks required toolbox visibility; do not silently declare it executable.
3. If authorized staging code exists, implement one targeted preflight/routing repair and test `freshness`, `repo_state`, `skill_route`, `visual_probe` independently. Do NOT mutate a complete historical workflow or replay uncertain operation IDs; use an isolated staging test before any workflow restart.
4. Preserve main branch, product ZIP, and owner art signoff gate. Separate runtime orchestration repair from artistic quality work.
5. For the sphere: derive a new physically plausible local attachment/edge highlight on the existing 80 facets only after a tested visibility model and independently verified reference image. All previous A/B visual edits remain REJECT.

## Decisions and limits
The new diagnostic runner was executed without altering the product; no production code proposed or committed. No screenshot orbital replay. Free-only; no new paid services or permissions.
`SOURCE_GATE=LIMITED`; `HPSYN_WORKFLOW=BLOCKED`; `GPU_DIAGNOSTIC=FAILED_WITH_CORE_OBSERVATIONS`; `ART_SIGNOFF=PENDING`; `FUNCTION_REPORT=PARTIAL`.
