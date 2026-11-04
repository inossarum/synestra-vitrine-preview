# R202.61 — PREVISE : rejeter le déplacement des six attaches de surface
Date: 2026-11-04 | Branch: task/SYN_LAB_R20261_SURFACE_ATTACHMENT_EXP_20261104
Evidence: evidence/R20261_SURFACE_ATTACHMENT_GPU_REJECT_20261104.md, evidence/R20261_SURFACE_ATTACHMENT_GPU_REPORT_20261104.json
Base validated technical HEAD: 3ec0188afa415e1e9eb4b124e999f920eb5bc382.

## Technical decision
No source promotion. The experimentally shifted physical six node streams started at radius .405 and retained all six coincident foreground replicas, the exact 80-facet nucleus, 28 outer ribbons and existing stencil/depth test. It passed the 180-test regression and built cleanly, but its real RTX3090 four-mode A/B reduced both center and ring luminance and degraded core facet edge contrast. The visual threshold failure is consistent and deterministic; reject and retain the original presentation.

## What was learned
- Six-root centerline placement is NOT a sufficient isolated fix. Prior root alpha improvement affected mostly geometry hidden inside the nucleus; shifting both primary and foreground streams to the exterior has an adverse brightness effect.
- Legacy R20227 tests protect a real product invariant: foreground and base node stream positions must coincide. The first draft violated it, was not GPU tested, and was corrected before the 4-mode visual test. Do not weaken the invariant merely to make the test pass.
- Screen-space evidence from previous visibility probe suggests one cloned foreground stream dominates in the canonical fixed view. That measurement does NOT count rejected depth/stencil fragments.
- Do not lower the gate after observing a failure; no further root-shift tweak without a distinct, predeclared physical/art hypothesis.

## Next bounded path
A. Preserve the signed SHA of the selected canonical Library PNG if its raw bytes become available through an authorized source; previously denied materialization is not retried.
B. When GPU tests are authorized, favor *measurement* of actual depth/stencil fragment visibility or stream screen-space overlap without changing renderer authority. No bypass of the blocked orbital test.
C. If an art revision is subsequently developed, target local contrast of the existing nucleus and continuous apparent six-node energy flow, with owner-reviewed image and fixed camera/quality/power gates. Do not treat CI/build or unit test PASS as art signoff.
D. Do not mutate main or ZIP; keep rejection Evidence on a separate feature branch and verify remote readback.

Status: TECHNICAL_REGRESSION_PASS; VISUAL_REJECT; ART_SIGNOFF=PENDING; SOURCE_GATE=LIMITED; FUNCTION_REPORT=PARTIAL.
