# R202.61 — Décision PREVISE après diagnostic profondeur multi-modes
Date : 2026-11-04 | Base : dd2b0f1eecf3e2782d750df7e4dea811ed285a8d.
Evidence : evidence/R20261_DEPTH_ROI_GPU_DIAGNOSTIC_20261104.md ; evidence/R20261_DEPTH_ROI_GPU_REPORT_20261104.json.

## Diagnostic / alternatives
Les voiles internes occultent visuellement une partie du noyau dans les quatre modes. Le diagnostic réversible de masquage intégral démontre un changement local important (19–29 % de pixels centraux), avec effet périphérique presque nul ; il réduit néanmoins la luminance et la diffusion internes. Le gain de gradient (+0.0205 à +0.0440) n'atteint pas le seuil fixé (+0.10).
Les essais précédents de réduction uniforme alpha/largeur ont déjà échoué : REJECT, ne pas rejouer. La suppression du volume R20215 détruit une grande part de l'enveloppe extérieure ; REJECT.
La piste suivante techniquement plausible est une distribution spatiale sélective des voiles, mais un simple masquage ne prouve ni la qualité artistique ni la profondeur 3D en rotation.

## Plan de reprise sans mutation artistique
1. Conserver le ZIP 5088f871... et les quatre modes inchangés.
2. Retrouver les octets canoniques SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881 avant tout jugement de fidélité.
3. Comparer en ROI à frame/viewport/quality fixes, avec deux angles orbitaux au minimum si un nouveau shader est envisagé.
4. Toute proposition de voile sélectif exige RED visuel, seuil préfixé, validation de l'apparence des courants internes et périphériques, puis E2E Chrome RTX3090 + SwiftShader, les quatre modes, Auto, puissance zéro, performance et validation owner.
5. Ne pas promouvoir de rendu sur le seul critère des pixels changés ; accepter uniquement une amélioration de lisibilité ET préservation du volume, avec image source vérifiée.

Dernier checkpoint documentaire 5223639a avant ce diagnostic ; prochaine reprise sur le commit qui portera cette Evidence.
Aucun HUMAN_GATE inféré à partir du seul manque de binaire : les travaux diagnostiques réversibles restent permis.
ART_SIGNOFF=PENDING ; NO_ART_PROMOTION ; FREE_ONLY ; SOURCE_GATE=LIMITED.
