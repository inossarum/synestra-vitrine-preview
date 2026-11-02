# R202.52 — QA strict checkpoint (GitHub)

MISSION_ID=syn-lab-r20252-facet-transmission
DATE=2026-11-02
STATUS=PARTIAL
TARGET_BRANCH=task/SYN_LAB_R20252_FACET_TRANSMISSION_20261102
ROADMAP_COMMIT=90f69dd8db75d27b759135d74e3456e451758514
QA_SCRIPT_COMMIT=cdaad9d3f9d40e3ac010fd239dea628ea75d7555
QA_TEST_COMMIT=22999ebda95424c99afbf13d5d00338abeaf8528
TRACE_PERSISTED_GITHUB=YES
RELEASE=NO

## Scope
This checkpoint records the R202.52 strict QA guard only. No production shader or Babylon bundle was modified. The previous exact R202.50 source-transfer operation remains platform-policy denied; no other transport was used to reproduce that effect.

## Published QA files
- `lab-babylon/scripts/r20252-contrast-audit.mjs`
  - Local source SHA256: `F01B3FB74EC31C8DCA424CBDF0C465A518ED98FDC968A8FE5A64025EF1999275`.
  - Remote commit: `cdaad9d3f9d40e3ac010fd239dea628ea75d7555`; blob SHA: `37383b89f38bbffeaf81081c2d486308a523bbe9`.
  - Strict `--require-visibility-pass` returns process exit code 3 when focused facet visibility is below the technical screen; JSON evidence is retained.
- `lab-babylon/tests/r20252-contrast-audit-cli.test.mjs`
  - Local source SHA256: `B09A5840A504EC6F819F99F17A57256BA345A6FC060EA4B818313C696F5AD0F1`.
  - Remote commit: `22999ebda95424c99afbf13d5d00338abeaf8528`. Blob SHA is pending GitHub readback.
  - Strict test mode requires all six native Babylon screenshot fixtures; the three strict CLI assertions cover fixture presence, diagnostic-only machine-readable FAIL, and strict exit code 3 with preserved SHA-pinned evidence.
- Baseline remote audit blob before update: `5d12ac4b6afe766f5ba10baac4e97d91e7beee78`.
- Local checkpoint from which this summary was derived: `I:\_STUDIO_STAGING\SYN_LAB_R20252_CONTRAST_EXPERIMENT_20261102\evidence\R20252_GATE_CLI_LOCAL_CHECKPOINT_20261102.md`.

## Verification inherited from local test execution
- Strict native fixture validation: `R20252_REQUIRE_NATIVE_FIXTURES=1`.
- Dependency-independent regression: **110 PASS / 0 FAIL / 0 SKIP**, exit code 0. Exactly 12 files requiring missing `@babylonjs/core` were excluded; this is not the full Babylon suite.
- Last strict regression log SHA256: `B455F06AB98C302386747453AE3EA5054050953CD3B37818E95269B4265E212C`.
- Six prior SHA-pinned Babylon A/B images were read from the local native Babylon evidence folders; fixture gate tests require all six to exist.
- The audit still reports `FACET_VISIBILITY_SCREEN=FAIL`: focused lit-pixel share falls by 7.996pp at frame 6 and 7.933pp at frame 18, against a provisional maximum loss of 2pp. This is a technical visibility criterion, not artistic signoff.

## Remaining mission gates
- R202.52 production shader change: NOT DONE.
- Source transfer / original platform revalidation: BLOCKED; no bypass.
- Exact R202.50+R202.51+R202.52 source build and 12 Babylon-dependent test files: NOT VERIFIED; previous dependency installation refusal remains respected.
- Native candidate A/B after any new shader correction: NOT RUN.
- Artistic owner signoff: PENDING.
- Main merge, deployment and release: NOT AUTHORIZED / NO.

## Next action
Read back the published audit script, CLI test and this checkpoint at the latest branch HEAD and verify their blob SHAs. Then continue with S04 only through the original platform authorization path if such a path is exposed; otherwise preserve the blocker and continue independent, authorized work. No mutation of the production shader while the source-transfer denial remains in force.
