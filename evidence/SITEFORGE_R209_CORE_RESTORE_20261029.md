# SiteForge R209 — Core nucleus restoration (2026-10-29)

MISSION_ID=SYN_SITEFORGE_R209_CORE_RESTORE_20261029
OWNER=Synestra Studio (isolated DC worktree)
BASE=ed18f90ff72bd5c8ae1a1715d4f62ad3cbbe653c
BRANCH=task/SYN_SITEFORGE_R209_CORE_RESTORE_20261029
TARGET=Inos-Cerebros local Chrome/Three.js; URL=http://127.0.0.1:18889/r204/
DEPLOYMENT=NOT_EXECUTED; PUBLIC_RELEASE=HOLD; OWNER_ART_ACCEPTANCE=PENDING

## Fault and corrective change
R206 real Chrome screenshot displayed external energy ribbons with no discernible solid center. R208 source held `lightCore` (a point light) and LAB shader plasma plane, but no nucleus geometry. R187 original material and R188.1 shader preserved.
R209 installs one world-space Icosahedron nucleus and restrained shader halo/two thin orbits inside the EXISTING Three.js scene. Low-end tier retains physical nucleus and omits halo/orbits. No new renderer, canvas, external textures, workers or network endpoints.
Source:
- r204-build/scene.mjs SHA256 642D5CDD498BEE9ECDD6CFEF7DBAAFB276EBF5EFAD4EB372E5EF1BD0E9E1B63B
- r204-build/core-nucleus-r209.mjs SHA256 12BD3A87A948466725BFBD2BA1F85452318FA542BE2D6F0CEF389F2D055AB5B3

## Local tests / browser evidence
- `node --check` both modified module files: PASS.
- `node --test tests/siteforge_r204_core.test.mjs tests/siteforge_r206_atmosphere.test.mjs tests/siteforge_r209_nucleus.test.mjs`: 17 PASS.
- `node --test tests/siteforge_r205_adaptive_tier.test.mjs tests/siteforge_r207_quality.test.mjs`: 15 PASS.
- `node r204-build/build.mjs`: PASS, self-hosted generated Three.js bundle (not committed).
- Chrome real CDP, loopback HTTP 200, WebGL ready and dataset `coreNucleus=geometry-r209`: PASS at 1440x900 and 390x900, one canvas throughout.
- Ultra: tier 3, 8 flows, 36 motes; Eco: tier 0, 2 flows, 6 motes, atmosphere off; nucleus visibly present in all four captures.
- Screenshot SHA256:
  - R209_core-real_1440.png 81C9AAF726C0CD5AD129B40AF116854221D88826E7864DBE8C6B2E7F34E421F4
  - R209_core-real_390.png 13E7FA56478D3E801BE91C4DA7DCD2BC09580BC791EBA9E3D6832AED483A7660
  - R209_core-eco_1440.png AE42F1A19EBE5E69D536470CE7DE7811D13B8DF32FB0E641AFE0298DED7B2BE4
  - R209_core-eco_390.png 65304C85580CA97A4C50591094CA67652C91E251DFA66897B0B519BE80461467
- Browser report: R209_core-real.json and R209_core-eco.json.
- False first browser capture opened legacy `/` instead of `/r204/`; `R209_r209core*` discarded as evidence, NOT committed.
- Chrome temporary profile cleanup returned EPERM; reported QA_PROFILE_CLEANUP_PENDING (non-fatal, no silent cleanup claim).

## Release limits and follow-up
Preview remains local; no Cloudflare Access deployment/production cutover, no physical modest-GPU E2E, no AAA/owner art acceptance.
Reproduce: checkout branch, reuse locked existing node_modules, `node r204-build/build.mjs`, serve branch root on 127.0.0.1:18889 and `node tests/r209_visual_capture.mjs core-real ultra` then `core-eco eco`.
Rollback: remove isolated branch/worktree or revert the R209 source change; R208 branch and R187 LAB worktrees remain untouched. Never clean other owners' worktrees.
