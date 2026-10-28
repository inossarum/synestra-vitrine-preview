# SiteForge R190 — hover perturbs flow, not sphere

## Scope
User approved R189 composition but rejects sphere tilting on mouse passage. Requires localized flow perturbation restored without camera movement.

## Design and technical decision
- Keep `r189-hero-candidate.html` and the R116 WebGL source byte-identical. New R190 HTML references an additive, versioned shader copy.
- Hold `uTilt=(0,0)` for every frame, regardless of mouse position. Retain the existing time-driven fluid dynamics.
- Inject `uPointer=(x,y,impulse)` into **flow phases**, not the nucleus or object rotation. Compute coordinates against the transformed canvas rect; apply a localized Gaussian displacement and exponential fade when pointer stops/leaves.
- Keep touch pointer events ignored and reduced-motion static fallback. No new canvas or worker; no network or dependencies.
- Five flow families receive a localized phase deformation; R189 layout, logo and product navigation are unchanged.

## Verification
- Failure-first: missing new file detected; negative cases reject tilt and missing uniform.
- 99/99 Node PASS (R190 + R189 + SiteForge original contracts).
- Chrome CDP actual WebGL uniform intercept: `uTilt=[0,0]` throughout pointer motion, pointer peak `0.692149`, post-leave `9.0165e-11`. Chromium screenshots before and after at fixed shader time, and actual mobile 390×844 capture.
- Local HTTP 200 for page and shader. No production integration or exact R188 source claim.

## Reprise
Review real live mouse motion in the loopback preview. If accepted, locate exact R188 source before applying the behavioral delta to that branch. No automatic deployment/merge.
