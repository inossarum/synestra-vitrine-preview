# R174 — Optique volumétrique, sans nouvelles surcouches

MISSION_ID=SYN_SITEFORGE_R174_VOLUMETRIC_DEPTH_20261028
BASE=e482a723ecf1a6bfed5d266f93ce4b6a096456a6
EVIDENCE=evidence/SITEFORGE_R174_VOLUMETRIC_DEPTH_20261028.json

## Décision
La phase R174 doit affiner la profondeur du plasma et du matériau liquide, et non changer le squelette des flux existants ni rajouter d'effets. Reprendre le shader unique R173.1. Modifier uniquement l'absorption et la luminance au cours de la même intégration ray marching par `frontLayer`, `filamentPeak`, `refinedDensity`, `refinedRadianceScale`. Le noyau et les six champs matière restent inchangés. Ajouter un uniforme expérimental `uDepthRefine`, non exporté, pour un comparateur Avant R173.1 / Après R174. Les 18 champs du JSON sont inchangés.

## QA et failure-first
Le test R174 a échoué contre l'ancienne version, puis 93/93 contrats Node PASS. Chrome E2E avec SwiftShader ANGLE: six matériaux, getError=0, un canvas, 18 réglages, pause réelle, souris/tactile/clavier, mobile 390px. La première méthode de validation comparait la longueur compressée des PNG et produisait un faux échec malgré un vrai changement optique. Correction: utiliser un décodeur PNG RGB/RGBA 8 bits sans dépendance (`tests/siteforge_r174_png_diff.mjs`) puis comparer pixel par pixel la même capture figée. 42 614 pixels / 307 840 changés d'au moins 18 unités sur un canal (13,84%) et 10,42% d'au moins 35 unités. Ces mesures démontrent un delta visuel, pas la supériorité artistique finale; validation propriétaire toujours PENDING.

## Sécurité
Aucun nouvel effet de coque, aucune particule ou passe, aucune modification de `main`, du site vitrine ou de son WebGL. Blobs protégés index.html 1413e30138ba1657f7056401818e697ddbd32ac8, assets/siteforge-r116-sphere-only.js dd63d75fdb966de2052595c95b7b6cb736d6c7cc. Pas de benchmark matériel physique (R175). Publication seulement sur la branche laboratoire après vérification du HEAD et des blobs SHA. Retour R173.1 sur e482a723ecf1a6bfed5d266f93ce4b6a096456a6.
