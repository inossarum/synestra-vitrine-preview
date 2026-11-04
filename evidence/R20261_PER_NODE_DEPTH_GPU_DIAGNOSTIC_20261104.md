# R202.61 — Per-node depth GPU attribution (failed strict peripheral drift gate)

Date: 2026-11-04 | Mission: labo3d_sphere_r20261 | Owner: Synestra
Branch: task/SYN_LAB_R20261_DEPTH_STENCIL_FACTORIAL_EVIDENCE_20261104
Base technical R202.61 SHA: 39a10023d0faf6edc19e73ba3d8565528635ff8d.
Prior grouped GPU diagnostic SHA: f526d555481b2ba6cbefcfe02dad3818fb634f13.
Official ZIP SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13; unchanged.
Probe execution: Windows Inos-Cerebros, actual Chrome / ANGLE D3D11 NVIDIA RTX 3090, PID 63380.
Native source and ZIP unmodified. No new shader, mesh, lighting, service or remote deployment.

## Distinct mechanism and method
Earlier 4-mode factorial applied depth ALWAYS to all six foreground clones at once. This new test isolates **each clone independently**, with all other clone meshes hidden while preserving the original faceted stencil mask. A reference capture with all clones hidden is compared against (a) the isolated clone in its normal depth mode and (b) the same isolated clone with depth ALWAYS inside a disposable browser page. This is NOT a GPU fragment rejection counter.
- 4 nucleus modes, fixed frame 18 / 1100×900 / Balanced / power 145%; 6 clones × 2 depth states = 48 isolated probe captures, plus 8 baseline/retest captures.
- Original 80-face faceted nucleus and 80-face mask, 28 shell ribbons, six outer nodes, one engine/scene/canvas, native WebGL. Existing stencil enabled EQUAL=514 ref=1 for all clones; depthFunction=0 (default) or 519 (GL_ALWAYS) on each tested material transiently. Four materials are shared across six clones, so all five *other* clones are explicitly hidden before changing the chosen material property.
- ROI: core radius<62px, ring 62–125px, outer 125–255px. Count pixels with max-channel RGB delta>4. Reference all six clones hidden.
- Predeclared stability gates: zero >4 RGB drift core/ring; maximum three peripheral pixels >4 RGB drift; no network/page errors.

## Observed core pixel contributions
| Mode | Normal clone 0–5, pixels | ALWAYS clone 0–5, pixels | Baseline drift outer |
|---|---|---|---|
| 0 | 0, 894, 0, 0, 0, 0 | 375, 938, 388, 137, 443, 210 | 0 |
| 1 | 0, 899, 0, 0, 0, 0 | 399, 941, 392, 134, 433, 213 | 0 |
| 2 | 0, 896, 0, 0, 0, 0 | 390, 936, 383, 131, 435, 217 | 5 |
| 3 | 0, 903, 0, 0, 0, 0 | 380, 948, 390, 134, 438, 203 | 0 |

- For all 4 modes, the normal depth function renders only clone 1 with more than four RGB levels of visible difference in the core. The other five become *measurable* with depth ALWAYS. The experiment demonstrates depth-dependent **screen-space visibility**, not that all invisible vertices have failed a particular fragment test.
- Baseline core and ring zero drift in all four modes, external network 0. Mode 2 had five outer-zone pixels with >4 RGB drift, violating the frozen max of three. The runner therefore returned process exit=3, `FAILED_PER_NODE_DIAGNOSTIC`, error sentinel `DRIFT_MODE_2`. This is a protocol stability failure, NOT a JavaScript pageerror, and is not converted into PASS after the fact.
- All modes remain interpretable with their exact fail-state, but the overall probe is not a fully accepted visual gate.
- Depth ALWAYS is unacceptable as a production fix: it can paint energy strands through opaque real facets. No production stencil/depth policy was changed.

## Files with verified SHA256
- `evidence/R20261_PER_NODE_DEPTH_GPU_REPORT_20261104.json`: e6de92888a116c358b1a481f207662b6bb683b9114067262df7c287a98f78eb7.
- `evidence/R20261_PER_NODE_HIDDEN_MODE0_20261104.png`: 5d2731fa70a7b38eb4f3f978d43d0d3baf298faa0eb43d48d662d829851f2ef7.
- `evidence/R20261_PER_NODE_NODE1_NORMAL_MODE0_20261104.png`: 9eb34528fd6329d7f8e53af22e16d2933d90558846108d26017e9ad9c23259bb.
- `evidence/R20261_PER_NODE_NODE1_ALWAYS_MODE0_20261104.png`: a2fdd3dae2b9ff7efe4c9d75af03482eef48d531f3f8f13ead91cc2ee987ab2e.
- Exact locally executed QA runner `r20261_per_node_depth_attribution_gpu_20261104.cjs` SHA256 e679bb32adffce6cd97350f29e77f4514475ac7dbeece572d5bd33d30a478a54.
- Portable archived derivative `evidence/R20261_PER_NODE_DEPTH_GPU_RUNNER_20261104.cjs` SHA256 fb7b3a285b310344d9607df7d4b65aad10602e707c443531217c71ec19bc810d, with only the owner-profile Puppeteer path replaced by `SYN_PUPPETEER_DIR`; `node --check` PASS.

## HPSYN stagnation / routing diagnostics, separately observed
- `synestra_hpsyn_mission_status(labo3d_sphere_r20261)`: historical workflow COMPLETE, mission BLOCKED, with `HPSYN_ENGINE_PRECONDITION_MISSING` for repo_state, skill_route and visual_probe; Doctor `RESULT_OBSERVED` but `ready=false` and `HPSYN_DOCTOR_PREFLIGHT_LIMITED`.
- Direct Connect tools `synestra_github_repository_status` PASS (private `inossarum/studio-virtuel` SHA 7464dbb5e7fa43842556c57c727210d7e8d5db50), `synestra_central_skill_suggest` PASS advisory (skill source SHA a2d091230e10b2212e91d155260dd506849d3da1), `synestra_visual_connect_status` READY_FOR_USER_BROWSER_TEST (not media/model receipt).
- Toolbox registry revision 17 advertises `synestra_github_repository_status` and `synestra_visual_connect_status`, but NOT `synestra_central_skill_suggest`. Therefore at least skill_route is not in the active toolbox registry, and workflow routing/preconditions differ from direct tool accessibility. The exact Worker-internal root cause of the repo_state and visual_probe precondition failures is not proven without authorized Worker source/trace.
- Studio health and bootstrap operation IDs `782b46a0-0886-48b3-8017-38181d5f1e9d` and `d9a2402c-6859-497d-99c4-ccd4beb91951` returned QUEUED upon readback; no success claimed. No resend or duplicate mission.
- Existing Cloudflare Worker is the sole authority. Do not spin up new Worker, Connector, broker, Supervisor or redo the old HPSYN Workflow plan without owner/routing preflight.

## Durability and NEXT
Research-only evidence on isolated branch; no merge to main, no ZIP change, no owner art review, no deployment, no cost.
`GPU_PER_NODE_STATUS=FAILED_PER_NODE_DIAGNOSTIC`; `CORE_ROI_OBSERVATION=REPRODUCIBLE`; `HPSYN_ROUTING=BLOCKED`; `ART_SIGNOFF=PENDING`; `SOURCE_GATE=LIMITED`; `HOOKS_STATUS=UNKNOWN`; `FUNCTION_REPORT=PARTIAL`.
NEXT: investigate Worker HPSYN executor/tool allowlist mapping from a verified source SHA and diagnose why read-only native steps fail internal preflight despite direct provider capability; test in isolated staging with exact operation IDs, avoiding a new production worker or an alternate bypass. Artistic correction should target physically plausible surface highlights, not bypass depth or stencil.
