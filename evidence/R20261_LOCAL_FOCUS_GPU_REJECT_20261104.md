# R202.61 — GPU A/B local-focus A+B — REJECT (2026-11-04)

Mission: labo3d_sphere_r20261. Owner: Synestra. Host: Inos-Cerebros (Windows, native Chrome ANGLE D3D11 RTX 3090).
Base HEAD (production preserved): 3ec0188afa415e1e9eb4b124e999f920eb5bc382.
Isolated branch: task/SYN_LAB_R20261_CORE_LOCAL_FOCUS_EXP_20261104.
Production ZIP SHA256: 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.
Canonical visual image: Bibliothèque Synestra preview, raw bytes SHA not verified; image art signoff PENDING.

## Scope / reproduction
A and B are bounded, distinct from rejected uniform-light and mist geometry trials.
The existing white-violet nucleus fragment shader is modified ONLY to add a view-centered 3D angular Gaussian, using existing vWorld/uCamera; no mesh, light, material, extra render pass, uniform, shader stage, or new Engine/Scene/Canvas.
A = localized focal emission vec3(6.3,6.1,7.0)*focalSpot*powerRamp.
B = face-relief-biased focal emission vec3(4.3,3.9,5.2)*focalSpot*pow(facetRelief,2.0)*powerRamp.
Original 80 faceted nucleus, 28 ribbons, 6 nodes, 4 modes, alpha ceiling .79, power-zero behavior intact.
Four fixed-mode GPU A/B comparisons: baseline original six-file ZIP extraction vs six-file candidate fixture (five files byte-identical; only JS bundle replaced), Chrome RTX3090, viewport 1100x900, frame=18, Balanced, power=145%, mode 0/1/2/3. Baseline recapture drift=0%, JS errors=0, external requests=0, power-zero PASS.
A/B gate predeclared BEFORE captures: changed core pixels >=1.5%, core edge gradient +0.03, mean core luma +2.0, abs outer luma <=1, recapture ROI drift <=0.12%.
A candidate bundle SHA256 c6389955c50196485dda596849005d2d06750a34d8a3e7d125a707e5deb4941b.
B candidate bundle SHA256 209ff47ac02f765d6adcc0cbdde9b1ef4ef0ec4aa3608ee695e47c623e8386d0.

## Tests
A: failure-first RED expected (PID 57932); focused TDD 3 PASS; full regression 183 tests, 180 PASS, 0 FAIL, 3 SKIP (PID 55236); build PASS (PID 60812).
B: failure-first RED expected after test changed (PID 60684); focused 3 PASS; full regression 183 tests, 180 PASS, 0 FAIL, 3 SKIP, build PASS (PID 55348).
Python or system policy not modified. Existing node_modules reused via lock-identical junction; no installation or paid call.
Native GPU A PID 56624: exit=3, REJECT_GPU_VISUAL_GATES, 4/4 modes rejected.
Native GPU B PID 63828: exit=3, REJECT_GPU_VISUAL_GATES, 4/4 modes rejected.

## Measured output (fixed ROI, all mode values)
A, modes 0/1/2/3:
- core mean luminance +29.2389/+29.2342/+29.2367/+29.2392.
- core edge gradient -0.08319/-0.06794/-0.07662/-0.07309 (FAIL: flattened faceting).
- fraction of core pixels changed >=18 per channel: 56.845/56.920/56.911/56.862%.
- blueVsRG -12.60 average; shifts toward white but loses local hue texture.
- outer mean delta <0.001, drift 0%, errors 0, power-zero PASS.
B, modes 0/1/2/3:
- core mean luminance +0.4439/+0.4409/+0.4397/+0.4415.
- core edge gradient -0.01640/-0.01537/-0.01515/-0.01540 (FAIL: no contrast gain).
- changed core fraction .488/.455/.446/.471% (FAIL).
- outer mean delta <0.001, drift 0%, errors 0, power-zero PASS.
- Output B visually near-identical to baseline; output A whiter but visibly obscures faceted relief.

## Evidence files with SHA256, local A/B first then copied byte-identically
- evidence/R20261_LOCAL_FOCUS_A_GPU_REPORT_20261104.json = 4775ccdb1eb9a47fc5ac19184adcc52879f78a749870dbaf6b8ae65c47b75ee8
- evidence/R20261_LOCAL_FOCUS_B_GPU_REPORT_20261104.json = d82c57a6352983b0edd2539b5cd60677434669a11e269fa809b8b58e00541c84
- evidence/R20261_LOCAL_FOCUS_BASELINE_20261104.png = 81dc90227bdf031d0523971aa64fcf2a3e3a653f8436e2707f4788a8529a1ddf
- evidence/R20261_LOCAL_FOCUS_A_MODE0_20261104.png = 3b545bb2ebda55c1322dfe07a6e5bfdf019a2f6549ce9356e0373e3d69c62f60
- evidence/R20261_LOCAL_FOCUS_B_MODE0_20261104.png = d18a10d7182e32d01ea04762af7c40d2233813e6ceaf37ebe43df6bae1357405
- evidence/R20261_LOCAL_FOCUS_A_REJECTED_SHADER_20261104.patch = f6e4e755b76f2dec432c7098d5f849a4ed2bdefe76b31d8a3bddd64c15adb7d4
- evidence/R20261_LOCAL_FOCUS_B_REJECTED_SHADER_20261104.patch = 4601c94b98d0c23e49ab010a31145520cfb3353650d355ac629b656ebf33dd76
- evidence/R20261_LOCAL_FOCUS_B_REJECTED_TEST_20261104.mjs = af02545bc946ac1a79a5f156aa2abfb889f45d243dde0ce4368508f3f1a2973f
- GPU A runner (machine-specific, untracked): sha faf5366558a7be21c5f13fa63a06e8faedf9692c999f2793c10c2d206a962a70.
- GPU B runner (machine-specific, untracked): sha 6a2e408edadc239972f5fde624c6da383e44e28e4c05ee52741b4e670f0a8bf4.

## Recovery
Both candidate edits rejected; tracked lab-babylon/src/plasma-field.js and lab-babylon/dist/babylon-lab.js restored to immutable base HEAD. Restored main shader differential is empty. Rejected patches retained as isolated Evidence only, not applied to sources.
Art image raw binary SHA still UNKNOWN, no owner art signoff, no orbital test rerun, no main integration, no public deployment, no PAYG.
FUNCTION_REPORT=PARTIAL; GPU_TECHNICAL_PASS; A_REJECTED; B_REJECTED; ART_SIGNOFF=PENDING.
