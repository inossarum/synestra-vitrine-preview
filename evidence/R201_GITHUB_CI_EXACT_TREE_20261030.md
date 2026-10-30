# Labo 3D R201 — CI exacte GitHub, tests et preuve binaire
DATE=2026-10-30
MISSION=SYN_LAB_R201_CORE_SHELL_FUSION_20261030
REPOSITORY=inossarum/synestra-vitrine-preview
CI_SOURCE_COMMIT=9a5ccd4726f61bbeb9c0b6d42eda937fa00b7989
WORKFLOW=.github/workflows/r201-exact-source.yml
WORKFLOW_BLOB_AT_SOURCE=30043a5c7396ce381a5a78d0353534d015df71c9
RUN_PASS=41091917505
JOB_PASS=124187709597
CI_RUN_URL=https://github.com/inossarum/synestra-vitrine-preview/actions/runs/41091917505
RUN_INITIAL_FAIL=41091538214
INITIAL_FAILURE=4 stale source-exact tests R196/R199/R200, repaired without changing rendering code
FREE_ONLY=YES; PUBLIC_REPOSITORY=YES; STANDARD_RUNNER=ubuntu-24.04
MAIN_UNCHANGED=YES; R200_UNCHANGED=YES; DEPLOYED=NO

## Independent execution evidence
- Actions checkout@v4 checked out exact commit 9a5ccd4726f61bbeb9c0b6d42eda937fa00b7989.
- Node 22, npm ci --no-audit --no-fund: PASS.
- Node complete suite: 68 tests; 66 PASS, 2 SKIPPED, 0 FAIL.
- npm run build: PASS; exact esbuild output 7,407,057 bytes.
- SHA256 dist/babylon-lab.js = fe01472c48665f7759b8fb586f067b834b197359e63d0c28014fb2c17ff5d3f3.
- git diff --exit-code -- src tests = PASS; no tracked source or test changes by runner.
- R201_EXACT_GITHUB_SOURCE_BUILD_PASS emitted by CI.
- The previous native Chrome test ran 18/18 technical observations on a 7,407,057-byte binary with IDENTICAL SHA-256, fe01472c48665f7759b8fb586f067b834b197359e63d0c28014fb2c17ff5d3f3.
- Local plasma source Git blob differs: 8ed983d4af76e4f0ac4008574fa18c62a1b62d39 vs GitHub a538a1e9e3b3ade654d8afa34b5a38af834f756a. Raw source trees are not identical, but compiled executable bytes match SHA-256 exactly.

## Status boundaries
EXACT_SOURCE_COMPILATION=PASS
NODE_REGRESSION=PASS_66_OF_66_ACTIVE
BINARY_ARTIFACT_EQUIVALENCE=PASS_SHA256
BROWSER_TECHNICAL_E2E=PASS_18_OBSERVATIONS_ON_IDENTICAL_BINARY
ARTISTIC_ACCEPTANCE=PARTIAL; outer plasma remains filament-like
PUBLIC_DEPLOY=NO
PERSISTED_GITHUB_EXECUTABLE_DIST=NO; exact current build only exists in CI/previous ephemeral browser test
PHYSICAL_MOBILE_OR_LOW_END_GPU=NOT_TESTED
ORIGINAL_REFERENCE_IMAGE=UNAVAILABLE
R201_GLOBAL_DONE=NO

## Follow-up
Publish current binary as SHA-verified archive in GitHub without overwriting historical checkpoints or R200. Validate exact reconstitution, then continue bounded visual correction with new pixel captures.
