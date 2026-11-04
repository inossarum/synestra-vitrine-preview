# R202.61 — GPU factorial: stencil vs depth on six existing foreground node streams
Date: 2026-11-04 | Mission: labo3d_sphere_r20261 | Owner: Synestra
Verdict: PASS_SCREENSPACE_FACTORIAL_DIAGNOSTIC (no art promotion).
Branch: task/SYN_LAB_R20261_DEPTH_STENCIL_FACTORIAL_EVIDENCE_20261104
Base/source commit: 39a10023d0faf6edc19e73ba3d8565528635ff8d
Official ZIP SHA256: 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13, not modified.

## SOURCE GATE and methods
- Synestra skill snapshot a2d091230e10b2212e91d155260dd506849d3da1; FAST 1.0.0#9f47cb55, Evidence 1.0.0#b1d95e26, Visual Regression 1.0.0#aa98fffe, Failure-first 1.0.0#373c5f50, TDD 1.0.0#accb4772, E2E 1.0.0#3fcb7196; all consulted, methods applied, not autonomous engines.
- Owner PC Inos-Cerebros, Windows Chrome / RTX3090 ANGLE D3D11. Device online. Local branch HEAD and remote were equal at 39a10023…; tracked worktree clean; no concurrently executing relevant GPU test.
- Native API preflight probe PID 65956, exit 0: exactly 6 foreground clones, 4 shared ShaderMaterials, stencil EQUAL=514 ref=1 enabled, original depthFunction=0; material supports depthFunction property and engine supports getDepthFunction and setDepthFunction. Native GL ALWAYS constant=519. 80 nucleus / 80 mask faces, 28 outside ribbons, 6 nodes, 1 engine, 1 scene and 1 canvas.
- Original reference six-file ZIP extracted in the earlier verified fixture. No source rebuild, no new mesh/shader/light/material/scene/service. All test changes are transient properties in an isolated headless Chrome page; the page closes after each mode. No orbit (separately refused historical test), no Library image materialization retry.

## Native four-mode factorial experiment
- Actual runner QA script SHA256: 7fb06d6e3a45f25be27efa224f254e564d16e2e1b85ca8d0c8f0e830f3eb9b1c. PID 64116, exit 0, duration 22.39s.
- Archive runner `evidence/R20261_DEPTH_STENCIL_FACTORIAL_RUNNER_20261104.cjs`, SHA256 5e9f01fef93d51b7672bd34f92a15f1ea4229b6f15b2c6eaa823b29869c5863d. Only local Puppeteer path sanitized to SYN_PUPPETEER_DIR; syntax PASS. For replay, copy to same root as `r20261-depth-roi-probe.cjs` (exports ROI utilities) and set an authorized local Puppeteer install path. Runner refuses existing QA output.
- Viewport 1100x900; canvas 705x675; fixed frame 18; Balanced; power 145%; all 4 modes 0/1/2/3.
- Cases per mode, same exact canvas: baseline, only foreground stencil disabled, only foreground depthFunction=ALWAYS (519), both disabled, all six foreground clones hidden, baseline retest. Mask/depth writing geometry remains untouched in all cases. Values restored before every screenshot. Screenshot comparisons use RGB max-channel >4 per pixel within core r<62px, ring 62..125px, outer 125..255px.
- Predeclared repeatability gate: baseline vs retest zero pixels >4 in core and ring, at most 3 outer (based on previously observed peripheral noise); in fact 0 changed pixels in ALL three regions for all four modes. No JS pageerrors, no HTTP(S) network requests, no WebGL context loss.

## GPU screen-space results
| Mode | Stencil-off core Δ>4 | Depth-ALWAYS core Δ>4 | Both-off core Δ>4 | All-clones-hidden core Δ>4 | Stencil-off ring Δ>4 | Stencil-off outer Δ>4 | Depth-ALWAYS ring Δ>4 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 1627 | 1627 | 894 | 3640 | 5677 | 334 |
| 1 | 0 | 1641 | 1641 | 900 | 3595 | 5675 | 331 |
| 2 | 0 | 1635 | 1635 | 896 | 3630 | 5629 | 336 |
| 3 | 0 | 1623 | 1623 | 904 | 3595 | 5660 | 333 |

- Core luma gain under Depth-ALWAYS +0.1236..+0.1685, core edge gradient +0.1911..+0.2074 (all four modes). No improvement claim against canonical art.
- Disabling stencil alone does not affect the core ROI but causes thousands of extra pixels outside the nucleus; the stencil is a vital silhouette boundary.
- Depth ALWAYS affects ~1.6k core pixels with stencil still active, and the "both" case has identical *core affected counts*; depth is the dominant causal visibility gate for the center at THIS fixed view. Do NOT conclude depth-only explains all fragments, only final rendered pixel changes.
- Hide-all control produces ~0.9k changed core pixels, consistent with prior evidence branch commit 39a10023..., whose earlier visibility experiment was tagged FAILED_DIAGNOSTIC due to 3 drifting outside pixels. This new fully stable experiment has its own PASS.
- Inspecting mode0 PNG original / depth-always / no-stencil verified visibly subtle inner strands and significant peripheral changes on stencil-off. This was a model-side image inspection, NOT an owner acceptance.
- The experiment was diagnostic only and intentionally tested unsafe stencil/depth states in a disposable page. These must NEVER be promoted to production because depth bypass draws streams through the physical faceted nucleus and stencil removal leaks into the outer image.

## Artifact provenance
- `evidence/R20261_DEPTH_STENCIL_FACTORIAL_GPU_REPORT_20261104.json` SHA256 ed40f6a90f0512b46f5999b535a54bffc7c2b97cf3273300f9407e1c6be1a079.
- `evidence/R20261_DEPTH_STENCIL_BASELINE_MODE0_20261104.png` SHA256 d3c7a53fede7543b928d41df37047d23f1d3bc2a6aad8bf4fa5cafbb200119b9.
- `evidence/R20261_DEPTH_STENCIL_NO_STENCIL_MODE0_20261104.png` SHA256 11c15aad029d1d202ab30db8e038811492b7d37f9123121175944ac29e3c9a88.
- `evidence/R20261_DEPTH_STENCIL_ALWAYS_MODE0_20261104.png` SHA256 6f95cde54ded04ae48f8ac28b738d887ba5c39be630a4e08aa6063bd7b902128.
- `evidence/R20261_DEPTH_STENCIL_NO_BOTH_MODE0_20261104.png` SHA256 8f185aa61827f4fd7e2e6e0dd7838ba3ff71e25d585478cf6ae568aaa03d7fb9.
- Files were copied byte-for-byte and SHA256 checked on the PC, then archived on a separate evidence-only branch. Actual original runner script remains in local QA root; archive only contains a path-neutral derivative.

## Limits / DONE gate
GPU_RENDER_DIAGNOSTIC=PASS, GPU_FRAGMENT_QUERY_NOT_EXECUTED, ART_SIGNOFF=PENDING.
The reference Library PNG expected SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881 remains byte-unverified; no attempt to bypass denial.
HPSYN workflow at last query mission_status=BLOCKED, Doctor RESULT_OBSERVED but ready=false, repo_state/skill_route/visual_probe preconditions missing.
No renderer modification, no candidate promotion, no merge/main push, no deployment, no PAYG. SOURCE_GATE=LIMITED, HOOKS_STATUS=UNKNOWN, FUNCTION_REPORT=PARTIAL.
