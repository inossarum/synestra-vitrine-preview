# SiteForge R156 — restore JSON export of live Plasma Studio settings

MISSION_ID=SYN_SITEFORGE_R156_RESTORE_JSON_SETTINGS_EXPORT_20261027
OWNER=Inos
DATE=2026-10-27
EVIDENCE=evidence/SITEFORGE_R156_JSON_SETTINGS_EXPORT_20261027.json
TESTED_SHA=62c53d8a1a3a8a7bbd544338b3269aa0182d645e
DEPLOYMENT_ID=f0a93f28-8ead-4d07-8387-9d7057a166a6
STATUS=PREVIEW_DEPLOYED_72_PASS__CHROMIUM_JSON_VERIFIED__IOS_DOWNLOAD_E2E_PENDING

## User requirement and reuse-first choice
Owner asked: "Il faut que tu remettes la possibilité d'exporter en JSOn les paramètres choisis". They also supplied a favorable R155 screenshot ("Ça commence à être joli"), so this change must not risk graphics/regression or add legacy parameters. In R155 the 16 active controls are already in one dictionary in the renderer, but no JSON export action exists. Use those active DOM controls directly, rather than introducing a second settings store or touching GPU uniforms. No new server, plugin, GPU program, filesystem write or permission bypass.

## Minimal implementation
An accessible, visible type=button control in the existing form exports the **current**, not default, values in stable JSON schema synestra.siteforge.plasma-settings.v1 (version 1, engine siteforge-plasma-webgl1). Parameter keys exactly match the active `data-sphere-control` names: 12 numeric fields, including the selected preset, with original percentage-scale numbers preserved, plus four lower-case hex colors. Browser Blob application/json;charset=utf-8, an anchor with `download=synestra-siteforge-plasma-settings.json`, and URL.revokeObjectURL after a 1500ms grace period are used. A dedicated live status reports dispatch; this does not claim the destination file was stored. Handler is attached *before* the early returns for reduced motion, unavailable WebGL or GPU compile/link failure. Existing reset and all 16 controls continue unchanged.

## Tests and authority
The two new unit tests cover a changed preset, arc density, nuclear flux, custom color, full key set and types; also test reset, no GPU, linker failure, reduced motion, filename, Blob MIME and deferred URL cleanup. On a **real Chromium** mobile-size browser (390x844), the exact checked-in HTML/JS was rendered in a temporary isolated HTML document. An instrumented Blob and anchor demonstrated an actual JSON Blob and triggered the click handler: modified values coreLight=387, arcDensity=173, particlePreset=3, secondary=#aa55ee appeared in the 16-key JSON; the original WebGL renderer reported ready. The actual preview is Access-protected; do not evade Access. Chromium click dispatch is verified, but an iPhone Safari download to Files is NOT YET independently proven.

Cloudflare preview project policy was checked: production disabled, branch preview allowlisted. Deploy SHA 62c53d8a1a3a8a7bbd544338b3269aa0182d645e completed all stages successful; 72/72 Node tests PASS, static export PASS. New source blobs: assets/siteforge-r116-sphere-only.js@4b201e8c11809683d21d8545c85e5bae069a021d, siteforge/core-3d-lab/index.html@cc6048ace667993dda3d6048258332fbf2588c44, tests/siteforge_r137_live_controls.test.mjs@cec5bb295f101469d095d647b5ba3d2a777c7c97. No shader, visual effects, rendering configurations, Visual Observer, production or main changes.

## Rollback and acceptance
New URL: https://f0a93f28.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.
Rollback previous R155: https://95a000ac.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/.
The user can click "Exporter les paramètres (.json)" below the reset control to save a current preset. **Export only**, not automatic import, was requested and implemented. For DONE on iOS, owner or authorized Safari E2E needs to confirm that the browser actually saves the file and its JSON has the current values. Don't confuse successful Blob creation and dispatch with guaranteed disk persistence on Safari.

SOURCE_GATE=LIMITED (Safari download not independently verified)
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
