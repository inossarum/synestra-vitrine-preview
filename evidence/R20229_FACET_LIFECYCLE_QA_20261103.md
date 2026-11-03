# Labo 3D R202.29 — cycle de vie du masque profondeur/stencil (03/11/2026)

## Périmètre, cause et correctif

- Base immuable : R202.28 au commit `802e0027f8cd2fd9ffb24b7ea1104597930d11df`, PR #36. La variante R202.29 est développée dans son propre worktree et sa propre branche.
- Défaut de R202.28 : le masque de profondeur des 80 facettes restait activé lorsque la puissance du cœur était nulle, même si le shader visible avait une transparence nulle. Les copies des six flux avant étaient déjà conditionnées par la puissance dans `plasma.update`, mais ce code est appelé à cadence réduite ; il ne couvrait pas les bascules manuelles de visibilité du cœur entre deux mises à jour.
- Correctif : `synchronizeFacetLifecycle` exécuté **à chaque frame avant `scene.render()`**, indépendamment de `geometryUpdateDecision`. Il désactive le masque et les six flux avant si le cœur est sans puissance, sans rayon, désactivé, masqué par `isVisible=false` ou d'opacité nulle. Il réactive uniquement les flux dont l'original source est actif et visible. Une valeur numérique invalide (NaN/Infinity) déclenche un **fail-closed**, puis une erreur explicite.
- Les 80 triangles / 240 sommets, les matériaux, le masque clone et son parentage, le groupe 2, le groupe 3 et les shaders sont **inchangés**. Rotation et zoom restent transmis par la matrice monde du parent. Aucun moteur, scène, canvas, shader, géométrie ou processus Chrome utilisateur supplémentaire.

## Tests réels

**Unitaires/contrats sur Windows** : `node --test tests/r20229-facet-lifecycle.test.mjs tests/r20228-facet-stencil.test.mjs` : 9/9 PASS. Suite complète `npm test` : **107 tests, 105 PASS, 2 SKIP, 0 FAIL**. Compilation `npm.cmd run build` : PASS. SHA-256 exact du bundle : `dd2c129014eafa03f1d70ac266bad7bfc984a3604fec3ac4fe594f445b4c990c`.

**GPU réel RTX 3090 / ANGLE D3D11** via Chrome headless avec profil temporaire isolé et serveur local éphémère : **9/9 scénarios E2E PASS** :
1. Noyau initial, stencil et masque actifs, 80 facettes, six flux avant, une seule scène WebGL et un seul canvas.
2. Puissance 145 → 0 : le masque et tous les flux avant sont coupés.
3. Puissance 0 → 145 : le masque et les six flux avant sont restaurés.
4. Rayon à 180 % : le masque suit la même matrice monde que le noyau.
5. Rotation du `LAB_SPHERE_ROOT` à 1,15 rad : matrices monde identiques.
6. `core.isVisible=false` : masque et flux avant coupés.
7. `core.visibility=0` : masque et flux avant coupés.
8. `core.setEnabled(false)` : masque et flux avant coupés.
9. Rétablissement de `core.setEnabled(true)` : restauration complète.

Rapport d'exécution `evidence/R20229_LIFECYCLE_GPU_E2E.json`, SHA-256 `913125dd9b14e001015dec9b17769daf8b2deb09df9792625ee119ae1d0e86ed`. Capture après restauration `evidence/R20229_LIFECYCLE_RESTORED_GPU.png`, SHA-256 `b871ae4f51ed16e7fd86ea77e3a48ed2ab320735e6cb67df47dad4072bcb6173`. Profil temporaire nettoyé, code de sortie 0, une seule fenêtre Chrome utilisateur visible.

**Performance courte AB en conditions identiques** : R202.28 **100,091 FPS**, R202.29 **99,770 FPS**, différence **−0,321 %**. Mesure ~6 secondes par variante : non concluante sur performances soutenues ou matériels moins puissants. Rapport `evidence/R20229_R20228_GPU_AB_PERF_20261103.json`, SHA-256 `dfe21c274cf82e8df9ebdc8856c29e0f16550a171c69f13e6973be7bd08ee3b6`. Sur 26 720 échantillons RGB d'une zone de scène, différence moyenne **0,0005 / 255**, **0 %** dépassent deux niveaux : rendu nominal visuellement inchangé dans ce test.

## Sécurité, limites et remise en route

- **FREE_ONLY / NO MERGE / NO DEPLOY**. Préserver `main`, PR #23–#36 et worktrees existants. Refaire une vérification de HEAD et du statut avant toute mutation.
- La suite Windows et l'E2E GPU natif sont QUALIFIÉS ; l'E2E CI Linux du nouveau HEAD et l'artefact GitHub nécessitent une vérification distincte après push.
- L'approbation artistique du propriétaire reste **PENDING**. Test GPU physique faible gamme, charge thermique longue et E2E sous Cloudflare Access : **NOT_RUN**.
- Reconstruction : `npm ci --no-audit --no-fund`, `npm test`, `npm run build`; comparer l'empreinte du bundle avant d'approuver une variante. Aucun test ne doit être déclaré réussi sur la seule base du commit ou de la CI publiée.
