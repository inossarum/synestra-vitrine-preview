# R202.59 — Interaction tactile réellement vérifiée sur le ZIP autonome

Date : 2026-11-03
Branche : `task/SYN_LAB_R20259_FINAL_CANDIDATE_20261103`, PR #64
Source : `release/Synestra_Sphere_R20259_Standalone.zip` SHA256 `33140bda8eea1645cb8ea7ea416bf4610c85e40b76c0f6bca95aa5373e324765`.

## Nouvelle vérification — PASS
- Exécution du **ZIP déjà extrait** en origine `file://` sur PC Inos-Cerebros, sans serveur web ni réseau.
- Chrome émulant un écran tactile **390 × 844**, `hasTouch=true`, `isMobile=true`, rendu matériel RTX 3090 / D3D11, WebGL2.
- Véritable séquence `Input.dispatchTouchEvent` : `touchStart`, douze `touchMove`, `touchEnd` à l'intérieur du canvas. Ce n'est **pas** un test sur un téléphone physique.
- Caméra Babylon avant glissement : `alpha=-0.38`, `beta=1.2`, `radius=4.8`.
- Après glissement : `alpha=-1.999197`, `beta=1.875787`, `radius=4.8`.
- **Déplacement mesuré : alpha −1.619197 rad, beta +0.675787 rad**. La commande tactile fait effectivement orbiter la caméra et conserve le rayon.
- Canvas 364 px dans viewport 390 px, noyau 80 triangles avant et après, contexte WebGL non perdu, **0 erreur JavaScript**, navigateur fermé proprement, code de sortie 0.
- Capture réalisée après la rotation : `evidence/R20259_TOUCH_ORBIT_MOBILE390_GPU.png`, SHA256 `44e6b9058bb852f0f257a544aada87912a3c0ec3036a52735a3b91f3f7cb1a6d`.
- Rapport JSON local `qa-touch-390/R20259_TOUCH_INPUT_GPU_REPORT.json`, SHA256 `064a40aa61d4048b5e2c9bf196e6074fbccb1012e0f5e7526f32d446427349c8`. Script de test local `r20259-touch-e2e.cjs`.

## Portée et limitation
Vérification additionnelle indépendante des tests précédemment PASS : pas de réinstallation, pas de nouveau déploiement, pas de modification du ZIP ou des shaders. Ce commit ne doit contenir que ce document et la capture.
`TECHNICAL_TOUCH_INPUT=VERIFIED | HARDWARE_GPU=PASS | MOBILE_DEVICE_PHYSICAL=NOT_TESTED | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
