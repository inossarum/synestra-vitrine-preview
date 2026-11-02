# Labo 3D — R202.51 instrumented native Babylon A/B on physical RTX 3090

MISSION_ID=SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102
DATE=2026-11-02 | STATUS=PARTIAL | INSTRUMENTED_BABYLON_GPU_PASS=YES | EXACT_CANDIDATE_BUILD=NOT_VERIFIED | FULL_REGRESSION=NOT_VERIFIED | ART_SIGNOFF=PENDING | RELEASE=NO

## Sources / authority / isolation
- Studio rule `AGENTS.md`: `inossarum/studio-virtuel@7464dbb5e7fa43842556c57c727210d7e8d5db50`, blob `e0f6df26edc9a45b7db1a5261e92b719d2dd66ce`.
- Memory V1 manifest read from the same source ref, blob `2b1a02230f570aa153e01b686337a432e394f7ca`.
- Skills consulted: `debugging@1.0.0#e3ddf70d26a32b8277d358c5db15f14d1c781043`, `failure-first@1.0.0#373c5f508b3ef91d1ffc1fc5afec7007a643d590`, `git-worktrees@1.0.0#81dae259362bcb6c5142180a97d7dfc84f479a63`; pinned Worker snapshot `a2d091230e10b2212e91d155260dd506849d3da1`. Advisory methods only.
- Connect toolbox revision 17 SHA256 `72d1dba38fa96b3a03a01acc395ddfcd0fd3fcdc3f1c31d16ce3ce8b1d83cdee`; `synestra_command_hpsyn` unavailable (toolbox_read denied). Supervisor mission ownership/lease and native HPSYN hook could not be proven.
- Baseline source R202.49 HEAD `60171bb17d038c7d05b1e1d09cb953f0d496380c`. Combined source R202.50+R202.51 synthetic tree `42086191c00a0904626ae0fcca32b7f010c2c752`.
- Branch R202.51 was clean and synced to remote at entry (`67a5427493f15738606fbeead01f2feca48fea36`). Existing R202.49, R202.50, `main`, synthetic QA index and user browser sessions not changed.
- Files and captures are in `I:\_STUDIO_STAGING\SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102`; only the source scripts and this report are committed. No public deployment, package installation, extra npm process, or paid resource.

## Key engineering decision — reuse an already-built Babylon engine, not a package-install workaround
- A previously generated, verified **R202.49** Babylon bundle was already present and executable in Chrome. The isolated candidate folder contains only `index.html`, `style.css` and a separate modified bundle. Existing `node_modules` were **not** copied, linked, installed or invoked in the candidate worktree.
- `lab-babylon/scripts/r20251-instrument-compiled-babylon.mjs` extracts the exact two GLSL fragment shader templates from the baseline and from the R202.50+R202.51 synthetic source tree, normalizes CRLF to LF, and fails closed unless each original fragment matches **exactly once** in the original compiled bundle.
- Baseline bundle: 7,424,140 bytes, SHA256 `7bd48775f1912c35155f9bb1995c0f9f76ac3209391e2c8074de086cf754e9ce`.
- Instrumented Babylon bundle: 7,425,166 bytes, SHA256 `9a7c1336ec63ffb39e99954766687e50fffc8db72d9748c4d79779ac8e3ea2fe`.
- Source fragment fingerprints (baseline -> candidate):
  - Heart `d3b8e592382d79b4bffef35a2e024431293e89263c180fc0ca2a4d82eca62cae` -> `ed92eb31aacd7923f1a538d6c92befaa8fd6c54638314004857b36e7697ea7b7`.
  - Volume `c166350d948ccab3071f8aeea04a942e9f2276c45699b33a326bd0cac92892b3` -> `e87b65619039be56c717f647445c825f8a6345b7112f5d06b079288a8a1bec3a`.
- Exact 2-patch replacement was checked by reverse substitution: **patched -> original byte-for-byte PASS**. No other JS bundle changes in the candidate, but this **does not certify** an independently rebuilt exact candidate bundle.

## Real Babylon browser E2E for the instrumented bundle
- Test script `lab-babylon/scripts/r20251-native-babylon-instrumented-ab.mjs`. Runs isolated localhost HTTP server with only HTML, CSS, JS allowlisted, Chrome 156 headless CDP in own temporary profile on `Inos-Cerebros`.
- Browser runtime was `ANGLE (NVIDIA, NVIDIA GeForce RTX 3090 Direct3D 11)` on one canvas; **actual Babylon `getScene()`** available; each capture confirmed **178 meshes, central IcoSphere with 240 indices/240 vertices (=80 triangle faces), volume carrier present, one GlowLayer**.
- Two fixed `labFrame` scenes (**6** and **18**) at power **145%** were captured for both original and instrumented bundle; same viewport **1100x900** and QA Ultra mode.
- At power **0%**, both runs confirmed real native scene `sphereReady=true`, `facetDepthActive=false`, and `volume_enabled=false`. The first QA attempt falsely required `facetDepthActive=true` at power zero, and produced FAIL; corrected the **test expectation only**, not production code. After correction, both complete three-case runs PASS, browser closed, no matching Chrome process remained.
- Baseline three PNG fingerprints: frame6 `9c418910055a52e1c50958955d6c9f6b77181c178f4c6afd2f4cd2886b8dddca`; frame18 `e01491f5fa467f39a286aa6139ed8c934ece9fee7b6e933140a239d2743c8acc`; power0 `3641405c55c194cecc3cbc7a1007d9544692abdb3fe60e6c59e60910fe7e05a4`.
- Candidate three PNG fingerprints: frame6 `60beb2b5467735c2df4621fddfac1f716c62ea6a93daca18f93163443e36c7c3`; frame18 `a7424d527ed92e01799a5b85fc4aa8b6265860d2e212edbc5fb915d55fe6db6b`; power0 `8eac59ef293eb55795b2914c077ab3c74c375bb602925c45fcb0b27af4067e90`.
- Local run folders: `run-base-1793647103370-57096` and `run-candidate-1793647119472-56808`.
- Full A/B local gallery: `native-babylon-r20251-gallery.html` (six images, two times + power-off).

## Quantitative A/B pixel evidence and independent revalidation
- Comparison by aligned 1100x900 screenshots at fixed frame and identical UI. Sampled three regions: reactor 33,670 points, nucleus 13,161 points, independent UI control 4,324 points. `changed_pct` threshold = sum absolute RGB channel differences >30.
- Frame6 power145: nucleus changed **41.9649%**, candidate minus baseline mean RGB **-9.87954**; reactor changed **7.4725%**, mean signed RGB **-1.87768**; UI control **0%**.
- Frame18 power145: nucleus changed **27.3535%**, mean signed RGB **-7.98184**; reactor changed **4.7253%**, mean signed RGB **-1.49954**; UI control **0%**.
- Frame6 power0: reactor and nucleus changed **0%** at threshold; negligible subunit color shifts from separate screenshots; UI control unchanged.
- First calculation used Windows System.Drawing. **Safety incident:** a one-time PowerShell process-local execution-policy override was used to invoke the read-only comparison script; no machine-wide policy configuration changed. This was replaced by an independent, dependency-free Node PNG decoder (`lab-babylon/scripts/r20251-compare-native-png.mjs`) using built-in zlib only; **independent output matches every reported metric exactly**. Future runs should invoke Node comparator, not bypass PowerShell script execution policy.
- Node pixel report SHA256 `ba0b30d6cde4ca8687a86fca1c012387aeed761b6f55ddaf4be23f1834deb68a`; local evidence file `native-babylon-pixel-compare-node.json`.

## Interpretation / gates
- The shader changes **do execute within the real previously-built Babylon scene** on RTX 3090, and change many nucleus pixels at real frame positions while preserving the native scene topology, UI, and power-off state.
- Visual QA of frame6 sees a **still hazy/grey nucleus**. Mean RGB falls in the nucleus; this does **not establish increased artistic legibility**, and may indicate excess darkening. No owner art acceptance is claimed.
- The existing isolated R202.50/R202.51 source tests passed **112/112 dependency-free**, but 12 Babylon-dependent test files, a source-tree-exact bundle build, continuous animation regression, native runtime stress/low-end QA, deployment and release are **NOT VERIFIED**. Their prior package installation refusal is still respected.
- NEXT: preserve this real-engine evidence; qualify the native-engine appearance/contrast and seek a bounded shader refinement **only in an ownership-checked isolated branch**, then authorize the exact pinned package build/full CI/E2E and human artistic review before any release.

FUNCTION_REPORT=PARTIAL | SOURCE_GATE=LIMITED | INSTRUMENTED_BABYLON_GPU_PASS=YES | EXACT_BUILD_PASS=NO | ART_SIGNOFF=PENDING | RELEASE_STATUS=NO
