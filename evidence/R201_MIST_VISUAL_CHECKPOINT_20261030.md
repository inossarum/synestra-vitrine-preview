# Labo 3D R201 — correction volumétrique, QA native, verdict artistique
DATE=2026-10-30
OWNER=Synestra Studio / Labo Babylon
MISSION=SYN_LAB_R201_CORE_SHELL_FUSION_20261030
BRANCH=task/SYN_LAB_R201_CORE_SHELL_FUSION_20261030
SOURCE_SHA=79e13be08df97aaddd031d2bc8c28cb288f5ac7d
MAIN_UNCHANGED=YES
FREE_ONLY=YES
ARTISTIC_GATE=PARTIAL
FUNCTION_REPORT=PARTIAL

## Failure-first / root cause
Images R200 and R201 from GitHub were inspected at 1100 desktop, 390 emulated mobile, and side orbit. R201 remained almost visually identical to R200: tiny central nucleus, cable-like filaments and weak volumetric center-to-shell continuity. R201 source had 18 narrow core paths, no diffuse body attached to them, core radius .090 and halo diameter .46.

## Implemented delta
- `src/core-volume.mjs`: deterministic `coreMistWidth` and `visibleCoreMistCount`, no extra centerline generator. GPU budgets economy=0, balanced=12, ultra=18, auto=12; power=0 disables all.
- `src/main.js`: 18 optional low-alpha volumetric tube sheaths, attached to existing 18 core paths; same Engine/Scene/Canvas and Atlas CORE_SOCKET. Increased center radius .090→.125 and halo diameter .46→.68, modest halo opacity increase. One path sample reused per filament per render, no new browser backend.
- `tests/core-volume.test.mjs`: taper, tiers, negative input, power-zero, one-engine/source lifecycle guards.

## Validated execution
- V8 pure-source invariants: 88 assertions PASS on GitHub blobs `0dcd00d35138307a573c863acec1a2c4bfbe6c44` and `afb483e0ced0fecddd17b142d0b5449bbca8ad2e`.
- Inos-Cerebros actual Node 24 / esbuild: PASS; 7,407,057-byte bundle; SHA256 `fe01472c48665f7759b8fb586f067b834b197359e63d0c28014fb2c17ff5d3f3`; build executed with `write=false` and a VFS overlay, preserving R200 worktree.
- Chrome native headless CDP on Inos-Cerebros: 18/18 observations PASS over 1100 and 390 widths (4 modes, 4 qualities, power-zero per width). Browser errors and WebGL errors: zero; one canvas. Bundle served from memory over 127.0.0.1.
- PNG readback and GitHub binary blob upload completed, see two captured image SHAs and report `lab-babylon/evidence/R201_MIST_NATIVE_BROWSER.json`.

## Visual verdict and remaining gates
Direct inspection of both new PNGs: white-violet center is larger, with broader translucent core; shell still reads as isolated glowing filaments and global aesthetic remains short of the approved conceptual image. Artistic DONE is NOT proven.
No public preview URL, no main merge, no replacement of dist/babylon-lab.js, no GPU low-end/mobile qualification, no reference-image binary verification, and full repository node --test still pending.
NEXT=Qualify complete native Node suite; decide whether R201 improvements warrant a new bounded outer plasma visual pass or preserve as R201 PARTIAL and hand off next artistic checkpoint.
