# HPSYN R202.61 — Reprise vérifiée le 2026-11-04

Mission: labo3d_sphere_r20261.
Owner: Synestra. Scope: source Babylon.js et Evidence uniquement; aucun déploiement.
Base technique conservée: dd2b0f1eecf3e2782d750df7e4dea811ed285a8d.
Checkpoint relu: 8cc709510f504f2b51edefc6971a825fa3a1b53a.
Branche: task/SYN_LAB_R20261_MIST_OPACITY_EXP_20261104.

## Nouveaux faits — machine Windows Inos-Cerebros
- Reprise Connect freshness: main Studio 7464dbb5e7fa43842556c57c727210d7e8d5db50; Central Skills snapshot a2d091230e10b2212e91d155260dd506849d3da1 (advisory only).
- Source locale: tracked git diff HEAD vide. Les dossiers qa-mist-exp/ et r20261-mist-ab-qa.cjs restent untracked, non promus.
- Branche Git distante preflight: absente avant cette reprise; push de checkpoint 8cc7095 ensuite réussi et readback remote exactement 8cc709510f504f2b51edefc6971a825fa3a1b53a.
- ZIP R202.61 SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13 conforme à la base.
- Node v24.19.0. Tests ciblés r20261-core-white-violet / r20260-auto-quality / r20259-finish-clarity: 7 PASS, 0 FAIL, exit 0 (Desktop Commander PID 32584).
- Régression complète: 180 tests, 177 PASS, 0 FAIL, 3 SKIP, exit 0 (Desktop Commander PID 1352, 8395 ms).
- Les essais opacity x0.58 et width x1.15 restent FAIL_VISUAL_GATE, refusés; source restaurée.
- Le GPU E2E antérieur du ZIP (RTX 3090 et SwiftShader) est REUSED depuis R20261_ZIP_NATIVE_GPU_E2E_REPORT.json; non rejoué dans cette reprise.

## Doctor / FAST / PREVISE
- Doctor: différentiel local centré sur mist et occlusion; aucun défaut technique nouveau trouvé. Pas d'attribution d'une validation artistique aux PASS fonctionnels.
- FAST: aucune réinstallation, aucun scan général ni répétition des deux variantes rejetées.
- PREVISE: prochain travail utile = diagnostic géométrie/profondeur ciblé en ROI, sous viewport/frame fixés, sans modifier le ZIP ni les invariants.
- Gate artistique: image canonique 1254x1254 SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881 non disponible sous forme binaire vérifiée.
- Invariants: 1 Engine, 1 Scene, 80 facettes, 28 flux, 6 nœuds, 4 modes, zéro puissance, qualité Auto.
- Security: no public deploy, no merge main, FREE_ONLY. Visual Observer model image receipt NOT_ATTESTED. Hooks execution UNKNOWN.
- SOURCE_GATE=LIMITED: état runtime Supervisor et Memory V1 ciblée non attestés. Mission status Connect POLICY_DENIED: aucun nouveau retry.

FUNCTION_REPORT=PARTIAL. TECHNICAL_GATES=PASS. ART_SIGNOFF=PENDING.