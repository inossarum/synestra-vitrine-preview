# R202.61 — Doctor / PREVISE : white-violet hotspot discrimination

Date: 2026-11-04 | Evidence: evidence/R20261_LOCAL_FOCUS_GPU_REJECT_20261104.md and reports A/B.
Base code: 3ec0188afa415e1e9eb4b124e999f920eb5bc382.

## Root cause demonstrated
The center can be made brighter at fixed camera without modifying the outer shell, but the simple angular hotspot alters pixels across many differently shaded existing faces. With high local emission, mean center luminance increases +29 but face-edge gradient declines, visually washing out the faceted crystal. Restricting emission to already illuminated faces preserves the code invariants yet yields only +0.44 luminance and still slightly reduces the face gradient. Therefore neither focal emission profile meets the dual goal of bright coherent white-violet center AND legible faceted depth.
This directly distinguishes the hypothesis from rejected uniform emission and global mist adjustments. Do not retune these two variants repeatedly without a new causal hypothesis/test.

## Rejected alternatives
A 6.3/6.1/7.0 local hotspot: REJECT (gradient negative on all 4 modes).
B 4.3/3.9/5.2 facetRelief-weighted hotspot: REJECT (too weak, gradient negative on all 4 modes).
Previous attempts: global emission/palette, opacity/width reduction, full veil removal, root-shift, all rejected under GPU gates.

## Next independent hypothesis (no code change authorized by this decision)
Separate the bright white-violet energy focus from the original crystal's shaded facets, while keeping 1 Engine, 1 Scene, 1 canvas, 80 triangles, 28 ribbons and 6 anchors. Before any implementation, audit existing 6 center-to-node ribbon/stream materials and foreground stencil behavior, and define a measurable bright energy path continuity metric plus face contrast metric, instead of pumping per-face emission. Reuse existing material/geometry when possible and avoid a second renderer, texture overlay, public asset or extra runtime authority.
The accepted concept Library image is displayed as a visual candidate, but its original byte SHA is not proven. Do not claim art signoff until byte integrity and human review.
No further shader tuning in this experimental branch (anti-loop, one bounded alternative exhausted).
SOURCE_GATE=LIMITED | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL.
