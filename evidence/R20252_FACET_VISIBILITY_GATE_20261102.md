# Synestra Labo 3D — R202.52 contrast visibility acceptance audit

MISSION_ID=SYN_LAB_R20252_CONTRAST_EXPERIMENT_20261102
DATE=2026-11-02 | STATUS=PARTIAL | READ_ONLY_DIAG=PASS | FACET_VISIBILITY_SCREEN=FAIL | SHADER_R20252_NOT_MODIFIED | ART_SIGNOFF=PENDING | RELEASE=NO | FREE_ONLY=PASS

## Authority and immutable checkpoints
- Repository: `inossarum/synestra-vitrine-preview`. Original R202.51 task commit `b2303d14d0134f2a30435b9749ca9d0065717240` (local = remote at entry); branch `task/SYN_LAB_R20251_VOLUME_APERTURE_HPSYN_20261102` clean.
- Studio `AGENTS.md` @ `7464dbb5e7fa43842556c57c727210d7e8d5db50` Git blob `e0f6df26edc9a45b7db1a5261e92b719d2dd66ce`; Memory V1 manifest blob `2b1a02230f570aa153e01b686337a432e394f7ca`.
- Central Skills snapshot `a2d091230e10b2212e91d155260dd506849d3da1`; consulted `visual-diff-iteration@1.0.0#c6d5fd0845d57f6d5ea7c3a632609689f29840d4`, `failure-first@1.0.0#373c5f508b3ef91d1ffc1fc5afec7007a643d590`, `git-worktrees@1.0.0#81dae259362bcb6c5142180a97d7dfc84f479a63`. These are advisory context, not executable Supervisor skills; skill execution_authorized=false.
- Connect toolbox rev17 SHA256 `72d1dba38fa96b3a03a01acc395ddfcd0fd3fcdc3f1c31d16ce3ce8b1d83cdee`; `synestra_command_hpsyn` absent and exact toolbox read refused. Studio canvas/owner lease, Supervisor activation and hooks not verified. `STUDIO_TURN_PREFLIGHT=LIMITED`.
- New isolated worktree: `I:\_STUDIO_STAGING\SYN_LAB_R20252_CONTRAST_EXPERIMENT_20261102`, dedicated branch `task/SYN_LAB_R20252_FACET_TRANSMISSION_20261102`, based on R202.51 commit `b2303d1`, unique branch/worktree and no concurrent owner claimed.
- No shader or other runtime source changes in this R202.52 diagnostic. No install, main mutation, merge, deployment or paid service.

## Security-gated change / safe continuation
- After branch isolation and validation, direct Git restore of R202.50 `plasma-field.js` and two tests from `dce49f1e0edb3c933c2ca39a0fd425ddc8aa72cb` into this R202.52 worktree was refused by execution safety controls. **POLICY_DENIED** is treated as authoritative: no different copy/restore/patch method used to reproduce that denied source transfer.
- Safe independent continuation: analyze existing SHA-pinned A/B screenshots, without writing production shader code or even restarting a browser.

## Deterministic dataset and method
- Prior real Babylon A/B images from R202.49 compiled bundle versus R202.50+R202.51 exactly instrumented bundle (not a native candidate rebuild) on RTX 3090 D3D11, 178 meshes, 80 triangle IcoSphere, one canvas.
- Source evidence `evidence/R20251_INSTRUMENTED_BABYLON_NATIVE_GPU_AB_20261102.md` @ commit `b2303d14d0134f2a30435b9749ca9d0065717240`.
- Tool `lab-babylon/scripts/r20252-contrast-audit.mjs` uses Node built-ins `zlib` + `crypto`, verifies each of six source PNGs against their exact persisted SHA256 before decoding. It then measures luma using Rec.709 coefficients and extracts pixel distribution, mean, standard deviation, 10th/90th percentile, local neighboring gradient and share above threshold 150/255.
- Source image dimensions fixed at 1100x900; frame6 and frame18 at power 145%, frame6 at power 0%, matched camera/QA settings.
- Regions sampled: focus x320..451, y395..539; nucleus context x262..474, y340..584; plasma periphery x125..609,y250..709; untouched right-side UI control x750..1029,y175..724.
- This is a **read-only diagnostic**. Changes in pixel distribution do not establish improved artistic appearance by themselves.

## Verified finding — R202.50+R202.51 candidate darkens lit facets
| Field (candidate minus R202.49 baseline) | Frame 6, 145% | Frame 18, 145% |
| --- | ---: | ---: |
| Focused facet mean luma (0..255) | -13.3221 | -12.6380 |
| Focused facet share of pixels above luma 150 | -7.996 pp | -7.933 pp |
| Focused facet neighboring gradient | -0.0040 | +0.0554 |
| Surrounding nucleus mean luma | -8.9619 | -7.2722 |
| Peripheral plasma mean luma | -2.2591 | -1.8126 |
| UI control mean luma | 0 | 0 |

- At power 0%, focused facet luma changes +0.0002 only; control region unchanged. These are separate captures, not byte-identical screenshot images.
- Provisional technical visibility screen: focused nucleus share above luma 150 must decline by **no more than 2 percentage points** relative to R202.49 at both high-power frames; keep UI and power-off unchanged. Measured deficits ~8 points cause **FACET_VISIBILITY_SCREEN=FAIL**, while audit integrity and negative controls PASS.
- This screen is an *engineering regression criterion*, not a final human aesthetic judgment. Current output still looks grey/veiled in native screenshots; no R202.52 artistic fix has been approved or applied.

## Commands and evidence
- `node --check lab-babylon/scripts/r20252-contrast-audit.mjs`: exit 0.
- `node lab-babylon/scripts/r20252-contrast-audit.mjs`: exit 0, six SHA-verified PNG reads, three A/B comparisons, control invariants PASS.
- Local metrics: `I:\_STUDIO_STAGING\SYN_LAB_R20252_CONTRAST_QA_20261102\r20252-contrast-audit.json`, SHA256 `089767c334149c08dfe97df10ab87b1344583b337fa1a0afa3de405f9561b5c0`.
- Original R202.51 instrumented A/B evidence JSON and gallery remain preserved, no process started for this audit.

## NEXT / unfinished business
- Source-transfer authorization/gate must be legitimately resolved before attempting the R202.50+R202.51 combined source modification in R202.52. No retry through a second copy tool.
- Then test a **bounded transmission restoration on key-lit facet normals only** while preserving shadowed cold planes, original alpha ceilings, 80 facets, one GlowLayer and the native volume; define one-variable A/B with exact source pin and the visibility threshold above.
- Rebuild exact candidate source through an authorized pinned dependency path, run all Babylon-dependent regression tests plus native GPU fixed frames/animation and human art approval.
- Neither source-branch modification nor full release can be declared DONE from this diagnostic.

FUNCTION_REPORT=PARTIAL | SOURCE_GATE=LIMITED | CORPUS_FRESHNESS=CACHED_SHA_VERIFIED_SKILLS | RELAY/HOOKS=NOT_EXECUTED | RELEASE=NO
