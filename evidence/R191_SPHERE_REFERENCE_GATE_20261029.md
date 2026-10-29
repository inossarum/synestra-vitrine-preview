# R191 — Première traduction de la référence canonique sur la sphère Babylon

MISSION_ID=SYN_LAB_R191_SPHERE_REFERENCE_20261029
DATE=2026-10-29
BASE=R190@5dc3687a66dfc903d50fdc136c17412fda70ad40
BRANCH=task/SYN_LAB_R191_SPHERE_REFERENCE_20261029
ART_REFERENCE=SYN_SPHERE_ART_REFERENCE_20261029
ART_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ART_REFERENCE_MANIFEST=reference/SPHERE_CANONICAL_20261029.md
MAIN_JS_SHA256=9F6DE32BAC0461E2FEA4BCA24AA904B46EB0FE63295BA919E39BAD460C5C8702
PALETTE_CONTRACT_SHA256=30E79B9143E7CE19BC5950E90B8711A7E719F0CE0135BA361C4DC641AE0EC9B6
TARGET=LABO_3D_SPHERE_ONLY
PUBLIC_SITE_DEPLOYED=NO

## Modifications
- 4 teintes du logo officiel : violet, cyan, dark-blue, green, explicitement définies en valeurs emissives Babylon.
- Noyau central blanc-violet réduit, bloom réduit : lisibilité préservée au lieu d'un disque blanc écrêté.
- Six points d'intersection sur l'enveloppe, reliés au centre par des tubes/trajectoires courbes 3D animés.
- Un seul Engine, Scene et Canvas, contrat CORE_SOCKET Atlas conservé.
- Anciennes familles de noyaux et contrôles R190 préservés ; UI rebaptisée R191.

## Vérifications natives
- Chrome Windows RTX 3090, ANGLE D3D11, WebGL2, source loopback 127.0.0.1:19116.
- Quatre modes noyau x 1100 et 390 px simulés = 8 captures PNG ; navigateur exit=0, error WebGL=0, 1 canvas.
- Rapport de runtime : lab-babylon/evidence/R191_REFERENCE_BROWSER.json (status PASS).
- Test de chromaticité sur pixels réels de la zone sphère : violet, cyan, bleu foncé, vert tous présents ; centre blanc visible.
- 9 tests Node PASS, 0 FAIL, 0 SKIP : palette, 6 nœuds, 4 modes, Atlas socket et screenshot.
- Fichier témoin : lab-babylon/evidence/r191-reference-core0-1100.png SHA256 7F48FC32CEB6C282592B9C911A586393DA42666B322F3DE86E5D1EA3B30F3752.

## Acceptation et prochaines actions
- TECHNICAL_BASELINE=PASS ; ARTISTIC_REFERENCE_FIDELITY=PARTIAL.
- Écart majeur : filaments encore trop uniformes, structure de tubes/treillis plutôt que courants plasma à épaisseurs et transparences variables.
- Suite : matériaux de courants à gradients, rubans effilés et embranchements organiques animés, puis comparaison 360° avec référence.
- L'image binaire de référence est disponible dans ce chat et identifiée par SHA, mais non versionnée dans ce dépôt : MANQUANTE pour restauration distante autonome.
- Test sur vrai mobile et GPU modeste non exécuté. Aucun déploiement, changement de vitrine ni modification de l'Atlas partagé.
- Rollback : branche/commit R190 de base ; conserver les worktrees concurrents.
