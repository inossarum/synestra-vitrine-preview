# R193 — Plasma lumineux animé et réduction du treillis

MISSION_ID=SYN_LAB_R193_PLASMA_LIGHT_20261029
DATE=2026-10-29
OWNER=Labo 3D / Synestra Studio
REPOSITORY=inossarum/synestra-vitrine-preview
BASE_R192=0999d55c4126c0f5f61061cf477f185b5b2141ab
BRANCH=task/SYN_LAB_R193_PLASMA_LIGHT_20261029
REFERENCE=SYN_SPHERE_ART_REFERENCE_20261029
IMAGE_REFERENCE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
RENDERER=Babylon.js 9.33.0 WebGL2
SCOPE=SPHERE_ONLY LAB 3D
ATLAS=ATLAS_BABYLON_3D@0.1.0 CORE_SOCKET preserved
PREVIEW=http://127.0.0.1:19118/lab-babylon/index.html?labFrame=4.5
DEPLOYMENT=NO PUBLIC
SOURCE_GATE=LIMITED (Memory V1 / art original binary not independently mounted)
TECHNICAL_STATUS=PASS
ARTISTIC_STATUS=PARTIAL

## Delta R192 -> R193
- Rubans 3D conservés ; sommets UV 5 rails attribués explicitement, gradient transversal du cœur des rubans vers les bords transparents.
- Shader Babylon animé sur le GPU avec uniform `uTime` : crêtes et scintillements dynamiques longitudinaux, sans nouvelle scène ni second canvas.
- Largeur et volume du plasma augmentés ; les six liaisons noyau -> nœuds restent souples et modulables.
- Ossature de tubes réduite à deux filaments et un méridien visible pour casser l'effet cage.
- Budget GPU : profil Économie 8, Équilibré 26, Ultra 28 rubans, 6 liaisons selon la qualité et puissance du noyau.
- Modes noyau 0-3, palette du logo (violet, cyan, bleu foncé, vert), noyau blanc-violet, contract Atlas CORE_SOCKET conservés.

## Preuves natives et signatures
- Capture réelle `lab-babylon/evidence/r193-light-core0-1100.png` SHA256 55C8F96ABFFE2B6F66EE51E068E8FCC6B4FA1D073C3CA4FFC87FF06A1B2299FA.
- Vue latérale `lab-babylon/evidence/r193-orbit-side-1100.png` SHA256 D7F346DAC42440D330496FD9AF909B4D0FBEC5FCEF2E2F327A4EE0068388CB66.
- Code GLSL `lab-babylon/src/plasma-ribbons.js` SHA256 29E88ED91F69E98FC34FA58D15338F8CFF2D1C007BF51BF5BE208DED9AA9DC5A.
- Scène `lab-babylon/src/main.js` SHA256 69AF0D2F908F09E62580F4907B66767F7CB9F5146A2BD912C0468660F6110AF2.
- Bundle compilé `lab-babylon/dist/babylon-lab.js` SHA256 7E45EB234540F0F6F9A15E7800D98744B172846D8F944E2B9F1C42929231EB84.
- Rapport navigateur `lab-babylon/evidence/R193_PLASMA_BROWSER.json` status=PASS, 17 entrées : 8 modes/résolutions, 6 budgets, 3 orbites.
- GPU : RTX 3090 ANGLE D3D11, WebGL error=0, 1 canvas, aucune exception Chrome.
- Node : 21 tests PASS, 0 FAIL, 0 SKIP ; continuité R191/R192, contrat Atlas natif et matériau R193.
- Test différentiel pixels R192 -> R193 > 4000 pixels modifiés aux deux résolutions.
- Premier contrôle de composant : largeur dynamique, gradient UV, négatifs, qualité fixe, extinction du noyau.
- FPS affiché dans les captures est instantané, **pas** une mesure stable de performance.

## Validation visuelle et suite
- Inspection réelle R193 : aspect moins filaire, plasma plus diffus, courants organiques, mais manque encore d'interactions optiques profondes et de l'épaisseur de lumière de l'image de référence.
- L'image binaire d'origine a été approuvée dans le chat mais n'est toujours pas archivée comme fichier réutilisable dans ce dépôt : IMAGE_BINARY=MANQUANTE. Ne pas prétendre reproduction pixel-perfect ni artistiquement DONE.
- NEXT R194 : variations de densité et de luminosité des courants, souligner les six nœuds, fusion de rubans/plumes volumétriques, comparer à la référence avec plusieurs angles réels et tests matériel modeste si disponible.
- Labo R191 et R192 préservés, Atlas propriétaire non modifié, aucune modification de la vitrine, pas de déploiement, aucune dépense.
- Reprise : `npm run build`, serveur HTTP loopback 19118, `node tests/sphere-plasma-light-e2e.mjs`, `node --test tests/plasma-light.test.mjs tests/plasma-ribbons.test.mjs tests/sphere-reference.test.mjs tests/sphere-regression.test.mjs tests/atlas-interop.test.mjs`.
- Rollback sûr : branche R192@0999d55.
