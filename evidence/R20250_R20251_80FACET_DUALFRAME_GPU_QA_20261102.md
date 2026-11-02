# R202.50 + R202.51 — dual-frame physical GPU qualification, 80 flat faces

TEST_RUN_ID=R20251_80FACE_DUALFRAME_20261102
DATE=2026-11-02 | STATUS=PARTIAL | PACKAGE_PASS=UNKNOWN | GPU_SHADER_PASS=YES | BABYLON_RUNTIME_E2E_PASS=NO | OWNER_ACCEPTANCE=PENDING | RELEASE_STATUS=NO | FREE_ONLY=PASS

## Sources and permissions
- Rules: `inossarum/studio-virtuel@7464dbb5e7fa43842556c57c727210d7e8d5db50:AGENTS.md`, blob `e0f6df26edc9a45b7db1a5261e92b719d2dd66ce`.
- Skills: `visual-diff-iteration@1.0.0#c6d5fd0845d57f6d5ea7c3a632609689f29840d4`, `failure-first@1.0.0#373c5f508b3ef91d1ffc1fc5afec7007a643d590`, `git-worktrees@1.0.0#81dae259362bcb6c5142180a97d7dfc84f479a63`; Worker snapshot `a2d091230e10b2212e91d155260dd506849d3da1`. These are consulted advisory methods, not Supervisor execution.
- HPSYN toolbox rev17 SHA256 `72d1dba38fa96b3a03a01acc395ddfcd0fd3fcdc3f1c31d16ce3ce8b1d83cdee`: exact `synestra_command_hpsyn` missing, `toolbox_read` returned denied; no native hook/handler execution claimed.
- R202.49 baseline exact HEAD `60171bb17d038c7d05b1e1d09cb953f0d496380c`.
- Combined R202.50 + R202.51 isolated synthetic Git tree `42086191c00a0904626ae0fcca32b7f010c2c752` reproduced by `git write-tree` in detached QA worktree; original R202.50, R202.51 and main preserved.
- Reusable test runner: `lab-babylon/scripts/r20251-80-facet-frames-gpu.mjs`, SHA256 `6469347F55F74FC7854071AB10E50773216F8825CADA0D62E3A2A638C5BC3A83`.

## Method — bounded, read-only WebGL shader probe
- Chrome 156 headless CDP, native **NVIDIA GeForce RTX 3090 ANGLE / Direct3D 11**, one WebGL1 canvas.
- Actual candidate and baseline GLSL vertex+fragment source extracted from `plasma-field.js` and `plasma-volume-r20215.js`; independently compiled/linked and composited sequentially on GPU.
- New diagnostic geometry: icosahedron 20 faces, each subdivided into four = **80 individually flat-normal triangles / 240 vertices**, verified by a runtime invariant on `heart.length`, and by browser response for every capture. Nominal proxy radius `.72`, **not the Babylon original radius `.38`**; volume remains simplified 40-sector proxy; no engine/scene, ribbons, nodes, production depth mode or Babylon geometry API.
- Two deterministic shader times `uTime=.65` and `uTime=2.65` at power 1.45 and a fifth power-off case. No claim of continuous animation or 60fps temporal stability.
- Real screenshots captured via CDP and checked as PNG (5 distinct per-mode values), with shader checks, single-canvas check, native renderer check and negative power-zero pixel check.
- Separate browser profile automatically terminated; follow-up process query found no remaining related Chrome process. No package installation, no bypass of earlier installation refusal, no branch merge, no deployment.

## Actual results
| Mode | Frame | Mean RGB | Center ROI RGB | Outer ROI RGB | SHA256 PNG |
|---|---:|---:|---:|---:|---|
| R202.49 baseline | 0.65 | 129.336101 | 144.047749 | 116.887342 | `adf67dd8b006653ce5d86f6657fbe7bdac765a81ec5729a3203ba5f097dc76d3` |
| R202.50 + R202.51 | 0.65 | 125.863989 | 142.347487 | 113.753998 | `d8b0ecc87f6a45cef5dcd7c5ac0ec2e867eec06ad59c7b1abd7971cf8a3a527e` |
| R202.49 baseline | 2.65 | 129.472112 | 133.006837 | 115.349326 | `6c0760fbdfc3b067503aebb94aac74bcc117d21463262b33d50ad96c9d0d5d5b` |
| R202.50 + R202.51 | 2.65 | 126.054320 | 131.319393 | 112.429895 | `ef4774c9fc7ab83223261851de92c80c4e3defe1cd409dd71e1939fe7cef5283` |
| Power-off combined | 0.65 | 0 | 0 | 0 | `d27b7d9fb7ed608b715e31cce8da6f67fed6f63f2749436e54351a9f44f9659d` |

- `node --check`: PASS. Runner exit code zero and local JSON status PASS. Every mode: `flat_triangles=80, flat_vertices=240, canvas_count=1`, GPU RTX 3090.
- Frame-to-frame different PNG hashes for baseline and combined, demonstrating time-sensitive shader output in this controlled proxy.
- `combined-gpu.json` evidence SHA256 `5C1E98D0229084F60068FFC45A0232DD44ABDAD22299528E9D5D74C2D14FBBBD`.
- Local run folder: `I:\_STUDIO_STAGING\SYN_LAB_R20250_R20251_COMPOSITE_QA_20261102\run-1793643660943-18840`, files: `baseline_t0.png`, `combined_t0.png`, `baseline_t1.png`, `combined_t1.png`, `off.png`, `combined-gpu.json`, `r20251-80faces-doubleframe.html`.
- PNGs were visually inspected: the reactor's central form remains noticeably grey/hazy in this artificial geometry and compositing setup; combined shader edits modestly reduce mean brightness and adjust pigmentation, but **artistic acceptance is not demonstrated**.
- E2E gap: test uses a proxy mesh and manual render order, does not prove behavior of Babylon `CreateIcoSphere(radius:.38,subdivisions:2)`, existing 28 ribbon streams, 6 node streams, animation loop, full tests or release performance.

## Recovery and next
- Previous exact-source, simultaneous shader GPU qualification had 5/5 PASS but only 16-sector faceting; this delta adds 80 faces and two frame values, no production shader changes.
- The installation of pinned Babylon dependencies was explicitly refused earlier, and remains unattempted in this turn. No second package fetch path used.
- Next: authorize a genuine package/runtime route to build and test exact synthetic tree in Babylon; run all regression tests, capture native engine scene across time and power, verify 80 faces/240 vertices, 28/6 streams, GPU on/off, and owner art acceptance.
- Evidence/Reasoning: numeric proof above; decisive limitation is proxy compositing vs the true Babylon runtime. No claim of Supervisor DONE.

FUNCTION_REPORT=PARTIAL | RUNTIME_E2E_PASS=NO | RELEASE_STATUS=NO
