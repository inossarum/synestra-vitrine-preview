# R201 — Durable exact executable and E2E proof
DATE=2026-10-30
CI_RUN=https://github.com/inossarum/synestra-vitrine-preview/actions/runs/41093420129
CI_SOURCE_SHA=eb0e5fd578af54390ccb549eef74dd50a3848a76
NODE_REGRESSION=PASS_68_OF_68_ACTIVE_TWO_SKIPPED
BINARY_SHA256=fe01472c48665f7759b8fb586f067b834b197359e63d0c28014fb2c17ff5d3f3
BINARY_BYTES=7407057
ARCHIVE_PATH=lab-babylon/dist/babylon-lab-r201-mist.js.gz
ARCHIVE_BLOB=9a7931ff29b511895defe78b58a7aaafa47cfe57
ARCHIVE_BYTES=1646071
ARCHIVE_SHA256=a97b7fed6de8aa26a3d1ae3e5ba8c8e62963287737c804376a3538a459458043
ARCHIVE_READONLY_TESTS=PASS_2_OF_2
NATIVE_BROWSER=18_OF_18_SHA_IDENTICAL_BINARY
WORKTREE_R200=UNCHANGED
MAIN=UNCHANGED
PUBLIC_DEPLOY=NO
ARTISTIC_ACCEPTANCE=PARTIAL
REFERENCE_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
REFERENCE_IMAGE_BINARY=MANQUANTE

## Verification
Native Chrome compiled bundle SHA exactly equals clean GitHub CI bundle SHA; does not claim raw local file identity. Full CI 68 active tests PASS, checksum-gated archive decompression PASS, historical bundle preserved. The repository does not silently install or overwrite the archived executable; in an authorized isolated checkout of this R201 branch, npm ci and npm run build reconstruct it from exact source.

## Remaining
Visual comparison against original accepted 1254x1254 artwork not completed because the original PNG is not available as a file. Current screenshot appears partly too filament-like; physical mobile and low-end GPU tests unproven. Atlas recipe not promoted and no public deployment.
