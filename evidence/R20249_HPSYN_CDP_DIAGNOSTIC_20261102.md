# Synestra Labo 3D — R202.49 causal composition replay (2026-11-02)

Status: **DIAGNOSTIC_TECH=PASS / RUNTIME_RENDER_SWIFTSHADER=PASS / ART_SIGNOFF=PENDING / GPU_RTX3090=NOT_TESTED / RELEASE=NO**.

## Source and isolation
- Repository: `inossarum/synestra-vitrine-preview`.
- Source branch: `task/SYN_LAB_R20249_COMPOSITION_CAUSAL_DIAGNOSTIC_20261102`.
- Exact source HEAD: `60171bb17d038c7d05b1e1d09cb953f0d496380c`.
- Separate downstream R202.50 observed at `dce49f1e0edb3c933c2ca39a0fd425ddc8aa72cb`; it was not modified.
- Qualification performed in a freshly cloned, separate Windows QA directory. No original task branch or `main` update, merge, deployment, user browser tab or remote service change.
- Global Studio rules read at `inossarum/studio-virtuel@7464dbb5e7fa43842556c57c727210d7e8d5db50`.
- Synestra Central Skills advisory snapshot `a2d091230e10b2212e91d155260dd506849d3da1`; applied debugging, visual-diff-iteration, git-worktrees and failure-first.

## Failure-first reproduction and recovery
- Original CLI gallery script: `lab-babylon/scripts/r20249-composition-gallery.mjs`, blob `394de8f551bed906298e5feedd1249432f6c9ca7`.
- Real original Chrome CLI run failed with `R20249_READINESS_reference_data-sphere-ready="true"`. The CLI invocation returned no DOM or PNG; adding an isolated profile did not change this observation.
- Bounded fallback: untracked QA-only Node 24 script with native Chrome DevTools Protocol (CDP), Chrome `156.0.8078.79`, headless SwiftShader and temporary independent browser profile. No `--no-sandbox` flag was used in CDP replay.
- CDP recovered a real scene: `sphereReady=true`, `facetDepthActive=true`, 1 canvas, WebGL renderer `ANGLE SwiftShader`.
- Controlled Chrome process was closed; no QA-profile Chrome process remained in the subsequent process query.
- This verifies a software WebGL render, not RTX 3090 performance or global Studio Supervisor E2E.

## Actual tests
- `npm.cmd ci --offline --no-audit --no-fund`: PASS, zero network installation.
- `npm.cmd run build`: PASS, Babylon bundle 7,424,140 bytes.
- `npm.cmd test`: 141 tests, **139 PASS / 2 SKIP / 0 FAIL**.
- `node --check` on original CLI gallery and CDP QA runner: PASS.
- 6 real localhost HTTP requests: PASS — HTML/CSS/JS/QA controller HTTP 200; disallowed file 404; invalid QA mode 400.
- Five real Chrome CDP screenshots created, with separate SHA256:
  - reference: `8870a554350fbd5c7734336b43f940bfd9b42fa56dddafcfa9cc71f584cf84d6`;
  - no-analytic: `132c56d20f48eff43597aae8727b4fda7e83382acfcaa5e8cb22d8ae0d5723b9`;
  - no-facets: `ee511e758ff9026e93e97fe60dafeaa5a1274f29f6625f551e9ede366569bb62`;
  - no-glow: `2077ea6dabb8edfa4fa3df548a26ef31acee7099c458b31329f316fa4baca2c2`;
  - no-volume: `4f7e0f040f85454d11ef32909dc5067a4ff7a51d3138669087c5154763048e38`.
- Offline five-panel gallery HTML SHA256: `2A4B1957350BA3857FF363B17C98F4458394D74AC6BF4FE5C609160BB71E6546`.

## Quantitative causal comparison
Fixed camera, labFrame 6, Ultra, power 145%. Sample region x=120..659, y=200..759, step 4, **18,900 samples per variant**. 'Changed' means sum of absolute R/G/B channel deltas > 30. These are exploratory screenshot statistics, not universal performance or aesthetic scores.

| Variant removed | Samples changed | Mean absolute RGB delta |
| --- | ---: | ---: |
| Raymarched volume | **47.42%** | **26.600** |
| Faceted nucleus | 4.13% | 2.027 |
| Analytic volume emission only | 1.20% | 0.847 |
| GlowLayer | 0.52% | 0.301 |

**Material causal finding:** the existing raymarched volume is the dominant source of central visual occlusion at this camera/quality/power. Removing the volume reveals the 80-facet nucleus but also removes much of the intended living plasma, so permanent removal is not the proposed fix. Instead test bounded near-core/front-facing volume attenuation or negative-space aperture that keeps plasma edges and physical topology. R202.50 facet color tuning alone cannot be assumed to solve this occlusion.

## Evidence, limits, and next
- Local replay folder: `I:\_STUDIO_STAGING\SYN_LAB_R20249_HPSYN_REPLAY_20261102`.
- Local QA: `I:\_STUDIO_STAGING\SYN_LAB_R20249_HPSYN_REPLAY_20261102_QA`.
- Files: `cdp-diagnostic.json`, `r20249-pixel-diff.json`, `http-route-report.json`, five `r20249-*-cdp.png`, and `r20249-gallery-cdp.html`. These binaries are **local only**, not replicated in this public repository.
- Current GitHub Actions workflows at source HEAD: no runs returned; **CI not proven**.
- Native Studio bootstrap request expired; **no native HPSYN mission DONE proof**.
- Screenshots are SHA-pinned local evidence and have not been independently qualified on an RTX 3090 or a low-end GPU.
- NEXT: use this evidence as input to an isolated, ownership-checked shader iteration. Test frontal volume attenuation in failure-first A/B on actual RTX GPU, confirm 80 triangles/240 vertices, 28 ribbon streams, 6 node streams, 16 raymarch steps, zero-power off, same canvas, and no extra engine/mesh/worker; then seek owner art signoff. Do not merge/deploy automatically.

Evidence written on a dedicated evidence branch, not the existing R202.49 or R202.50 branches.
