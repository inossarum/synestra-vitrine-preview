# R202.61 — PREVISE/Doctor: central stream alpha is not sufficient

Date: 2026-11-04 | Evidence: evidence/R20261_NODE_ROOT_GPU_REJECT_20261104.md
Base: 3ec0188afa415e1e9eb4b124e999f920eb5bc382.

## Key finding
The original six central node ribbons do have zero vertex alpha exactly at their start, unlike the fixed root-glow experiment. After changing only that root falloff, the four-mode native-GPU test measured a consistent core edge-gradient increase (+0.070 to +0.083) with no shell degradation. However, changed core pixels were only 0.15-0.23%, below the predeclared 0.30% gate. The candidate is therefore REJECT, not partial PASS or accepted artwork.

## Mechanistic explanation and alternatives
Core-to-node bridge geometry originates at radius .085, deep inside the existing nucleus radius ~.38. Foreground replicas are subject to the real faceted stencil/depth rules. More alpha on fragments occluded behind the nucleus need not become visible; the exact per-fragment test has not yet been carried out.
Replaying the same rootGlow .90 with lower gate would be a false PASS. Do not tune threshold post hoc.
Earlier global emission, selective white hotspot, faceted hotspot, mist width/opacity, mist root displacement all failed visual gates.
The next distinct hypothesis is to measure depth/stencil visibility of the six near-node paths at the real faceted silhouette and design only a bounded physical endpoint continuity correction if verified, while keeping the 80 triangles and one engine/scene/canvas. First use inspection/probe, not shader change.

## Control
All candidate code changes are restored locally and not committed to the branch; only the failed experiment's patch and evidence may be retained.
Never claim art acceptance, production delivery, owner signoff, or E2E orbital approval. Image reference bytes and Memory V1 provenance remain limited.
No PAYG, no main push/merge/deployment; branch-only Evidence.
FUNCTION_REPORT=PARTIAL | ART_SIGNOFF=PENDING | SOURCE_GATE=LIMITED.
