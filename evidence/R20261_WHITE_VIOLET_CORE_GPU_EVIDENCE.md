# R202.61 — correction blanc-violet du noyau / revue artistique GPU

Date : 2026-11-03
Dépôt : `inossarum/synestra-vitrine-preview`
Base exacte : `6b5e0f761e84b3c621d2c863fe7ba7d5e466898c` (PR #64, R202.60, CI GitHub Actions #41701136633 SUCCESS).
Branche candidate isolée : `task/SYN_LAB_R20261_WHITE_VIOLET_CORE_20261103`. **Ne pas fusionner ni substituer au livrable stable sans accord artistique.**

## Écart constaté et correction réellement appliquée

Le manifeste `reference/SPHERE_CANONICAL_20261029.md` exige un noyau **blanc-violet lumineux, halo modéré et facettes lisibles**. Sur la planche R202.59 et sur le baseline R202.60, le noyau demeure majoritairement gris-lavande. La référence image canonique SHA256 `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881` reste **MANQUANTE** ; toute affirmation de conformité exacte serait abusive.

Correction isolée dans `lab-babylon/src/plasma-field.js` :
- La palette des mêmes **80 faces** passe des valeurs R202.60 `(.63,.58,.78) -> (1.65,1.58,1.36)` à `(.78,.54,1.26) -> (1.74,1.44,2.30)` afin de différencier le bleu-violet des zones ombrées et la lumière des faces exposées.
- L'émission déjà existante des faces éclairées passe de `(1.02,1.08,1.24)` à `(1.25,1.12,2.15)`. **Pas de nouveau mesh, scène, matériau, lampe, volume, shader distinct, ni passe graphique.**
- Contrat inchangé : puissance zéro ferme l'émission ; alpha maximal `0.79`, noyau + masque à **80 triangles**, 28 courants, 6 nœuds, quatre modes et qualité Auto de R202.60.
- Les seuls tests historiques actualisés (`r20231-crystal-light.test.mjs`, `r20259-finish-clarity.test.mjs`) changent leurs **assertions de valeurs colorimétriques**, sans relâcher les contrôles de puissance, géométrie, masque ou profondeur. Nouveau test ciblé `r20261-core-white-violet.test.mjs`.

## Vérifications réalisées

- FAILURE-FIRST : premier test R202.61 **RED** attendu, couleur non encore modifiée ; puis 2/2 ciblés PASS.
- Premier A/B GPU constaté trop subtil : seulement +3,64 bleu-violet, 0 % de pixels au seuil 18 ; **refus volontaire de validation**. Réglage borné supplémentaire, sans boucle.
- Deuxième **A/B natif RTX 3090 Chrome WebGL2 D3D11 : PASS** en modes 0 et 2, caméra, frame fixe 18, puissance 145 %, qualité Balanced.
  - Mode 0 : contraste bleu-violet du noyau **+8,3487 niveaux** ; zones lumineuses au centre **+3,1498 points** ; luminosité moyenne de l'enveloppe **−0,00020** ; **0,7208 %** des pixels modifiés au seuil 18.
  - Mode 2 : **+8,4137 niveaux** ; zones lumineuses **+5,0761 points** ; enveloppe **+0,00020** ; **0,7155 %** des pixels modifiés au seuil 18.
  - 0 erreur JavaScript, 0 requête HTTP(S) externe, fermetures de Chrome propres ; mêmes invariants 1 canvas, 80 triangles noyau et masque, 28 courants, 6 nœuds.
  - Rapport brut `evidence/R20261_CORE_AB_GPU_REPORT.json` SHA256 `e8ae67e65fce864d19d9fe840848eb1cb77a0d3701a6f411943cc9c2f8949f73`.
- **Régression complète : 180 tests, 177 PASS, 0 FAIL, 3 SKIP**, exit 0. Tests historiques R202.31 et R202.59 maintenus (5/5 tests ciblés PASS après mise à jour).
- **Build offline esbuild : PASS**. Bundle candidate SHA256 `93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d`.
- **Page de revue en local**, `evidence/R20261_VISUAL_REVIEW.html` via `http://127.0.0.1:5185/evidence/R20261_VISUAL_REVIEW.html` (loopback seulement) :
  - quatre véritables captures GPU avant/après pour les modes 0 et 2 ;
  - bascule interactive entre le HTML stable R202.60 et le code candidat R202.61 ;
  - E2E Chrome RTX3090 : **4 images chargées, 2 bascules PASS**, iframe GPU réelle R202.61→R202.60→R202.61, 0 erreur JavaScript et 0 requête externe, exit 0 ;
  - `evidence/R20261_REVIEW_PAGE_GPU.png` SHA256 `def740589708660355c498caa44a60e7e91e364dbf3372472a41544e634c86c7` ;
  - `evidence/R20261_REVIEW_PAGE_E2E_REPORT.json` SHA256 `dfe2bee72e9c84eec659f95c4edc9120a0924399d4b5c342a4d9e3e258766471`.

## Durabilité et rollback

Les captures A/B, les rapports, les tests de régression et la page de revue sont versionnés **sur la branche isolée R202.61 uniquement**. Les R202.60 ZIP et OneFile versionnés restent intégralement inchangés. La PR #64 conserve son commit de succès GitHub CI `6b5e0f7`; **aucune CI R202.61 n'est revendiquée** et aucun nouveau workflow distant n'est lancé ici.

Restent à faire pour une release R202.61 si le propriétaire approuve le rendu : générer/attester les deux archives autonomes correspondant au nouveau bundle, faire l'E2E des archives, puis CI GitHub sur le commit final et revue d'acceptation. **Tant que cette chaîne n'est pas complète, R202.61 est un CANDIDAT et non un nouveau DONE logiciel.**

`SYNESTRA_TRIGGER=DETECTED | SKILLS_APPLIED=git-worktrees,reference-fidelity-verification,reasoning-evidence | VISUAL_DELTA=VERIFIED | NATIVE_GPU_AB=PASS | REGRESSION=177_PASS_0_FAIL_3_SKIP | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
