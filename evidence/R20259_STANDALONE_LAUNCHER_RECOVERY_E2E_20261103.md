# Synestra Sphere R202.59 — Windows standalone launcher recovery

Date: 2026-11-03
Repository: inossarum/synestra-vitrine-preview, PR #64
Previous head: `5607ee4d67a55add7e27cd490bafeb339fae6020`
Scope: portable ZIP and its launcher only; no Babylon, shaders, lights or art changes.

## Real defect found (failure-first RED)

The original `START_SPHERE.cmd` launched the browser *before* the Python HTTP server was bound to `127.0.0.1:5182`. The browser could fail immediately, and the command did not reject an already occupied port. The source-order negative test produced `RED: BROWSER_OPENED_BEFORE_SERVER_BIND`.

## Bounded correction

- The CMD file delegates to a Python 3 standard-library launcher, `launch_sphere.py`.
- The Python HTTP server binds to **127.0.0.1:5182** before the browser is opened; no external address or service.
- If the port is occupied: exit 2, message `SPHERE_PORT_UNAVAILABLE`, no browser launch.
- If the archive lacks `index.html`, `style.css` or `dist/babylon-lab.js`: exit 3, message `SPHERE_FILES_MISSING`.
- If Python is absent, CMD prints a local-file fallback instruction and exits 3; no installation or privilege changes.
- No new network fetch, cloud service, worker, broker, dependency, subscription or payment.
- Ctrl+C stops the local server; all long-lived test processes were terminated by the test harness.

## Real Windows checks — PASS

Tests were executed on **Inos-Cerebros** with Python 3 and `cmd.exe` against an isolated package copy, then **repeated against the ZIP actually extracted**:
1. occupied port 5182 fails closed;
2. missing package assets fail closed;
3. direct Python launcher serves real sphere HTML;
4. Python launcher serves unchanged exact Babylon bundle;
5. Python server bound to 127.0.0.1;
6. direct Python server clean shutdown;
7. `START_SPHERE.cmd` serves real sphere HTML;
8. CMD launcher serves unchanged exact Babylon bundle;
9. CMD server bound to 127.0.0.1;
10. CMD server clean shutdown.

**All 10 checks PASS**, code 0, for both isolated source package and re-extracted candidate ZIP. `SYNESTRA_SPHERE_QA_NO_BROWSER=1` was used to avoid opening the user's actual browser; production browser-opening was verified by code ordering, not by a real browser spawn in this test.

- New ZIP SHA256: `2ce059c7d047f81b56e3b733f0168d8471ae7f0ddd3448661ed410e22f7d4483`.
- Old ZIP SHA256: `33140bda8eea1645cb8ea7ea416bf4610c85e40b76c0f6bca95aa5373e324765`.
- New ZIP size: **1,660,022 bytes**, **6 files** including `launch_sphere.py`.
- New ZIP extracted and tested: PASS.
- Babylon bundle SHA256 in the new archive equals the original release bundle: PASS.
- QA report `qa-launcher-r20259/R20259_LAUNCHER_E2E_REPORT.json` SHA256 `394c4b1e1b58f275ad08141b5a35d8982fd996a67de1efe417b4257acaf2552e`. QA test script `qa-launcher-r20259/test_launcher.py` stays local; not deployed.
- Existing source/GPU E2E remains valid because the Babylon bundle, HTML and CSS are unchanged; no repeated GPU test without code delta.

## Source and rollback

The exact `START_SPHERE.cmd` and `launch_sphere.py` included in the ZIP are also versioned independently under `release/` for review and future maintenance.
Rollback: restore the original release ZIP from head `5607ee4d67a55add7e27cd490bafeb339fae6020`; no runtime migration required.

## Remaining gate

`TECHNICAL_STANDALONE_LAUNCHER=VERIFIED` but `ART_SIGNOFF=PENDING`: the original artistic reference image is absent and its concept acceptance did not approve the final Babylon render.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | HPSYN_RECOVERY=NEW_FUNCTIONAL_CORRECTION | FUNCTION_REPORT=PARTIAL`
