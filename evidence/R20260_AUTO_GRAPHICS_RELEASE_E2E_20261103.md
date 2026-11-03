# HPSYN — R202.60 | AUTO adaptatif au moteur graphique, deux livrables E2E

Date : 2026-11-03
Repo : `inossarum/synestra-vitrine-preview`
Base : PR #64 / `00d3b48791b8c90e5a347465e8205792befa284f`
Isolation : `task/SYN_LAB_R20260_AUTO_SWIFTSHADER_20261103`, worktree propre au départ.
Aucune fusion vers main, déploiement, dépense ou altération des livrables R202.59 précédents.

## Défaut fonctionnel découvert et corrigé

Le menu proposait « Automatique » sans véritable stratégie : en source, la plupart des coûts `quality==='auto'` suivaient les paramètres **Équilibré**, et le démarrage choisissait directement « Équilibré ».

Mesure avant correction (Chrome SwiftShader forcé, 900 × 700, frame fixe 18, puissance 145, 3 fenêtres d'environ 0,9 s par qualité) :
- Économique : **41,78 FPS médians** ;
- Équilibré : **17,63 FPS médians**.
Rapport brut `evidence/R20260_BASELINE_SWIFTSHADER_FPS.json` SHA256 `008bd4014bf850b558c2c5afca401648efb07c978798e4d51398fda2fe763a84`, PID **52504**, sortie 0.

Correctif minimal, sans nouveaux meshes/shaders : `src/auto-quality-policy.mjs` détermine le profil effectif :
- `auto` + rendu WebGL `SwiftShader` → **economy** ;
- `auto` + GPU matériel connu (ou identification indisponible) → **balanced**, résultat visuel inchangé sur RTX 3090 ;
- `economy`, `balanced`, `ultra` manuels restent prioritaires ;
- le sélecteur démarre désormais sur **auto** et l'interface affiche `AUTO / ECONOMY` ou `AUTO / BALANCED` ;
- le budget GPU, les shaders et les maillages utilisent le **même** profil effectif.
L'identification native emploie `WEBGL_debug_renderer_info` lorsqu'elle existe ; sans ce support, le fallback est `balanced`. Aucun accès réseau.

## Tests effectués

1. Failure-first réel : test initial RED avec `ERR_MODULE_NOT_FOUND` pour `auto-quality-policy.mjs`, puis **2 tests ciblés PASS**.
2. Installation `npm ci --offline` : PASS, 3 paquets, 0 vulnérabilité signalée.
3. Build esbuild Babylon : PASS, nouveau bundle SHA256 `7f0fe152e7f8123cc5f0629025cdf598964bf2f41406a4db626fbd943563dbcf`.
4. Régression complète Node : **178 tests / 175 PASS / 0 FAIL / 3 SKIP**, exit 0.
5. E2E source Chrome : SwiftShader Auto **44,68 FPS** ; choix manuel Équilibré **17,82 FPS** ; retour à Auto **43,24 FPS**. RTX 3090 Auto **100,31 FPS** et profil effectif Équilibré. Source report `evidence/R20260_AUTO_SOURCE_GPU_REPORT.json` SHA256 `687d6d1498352c6d718a4cbf90c7f6d37e1cf483de690dd073afa098f9dfc1ef`, PID **31448**, exit 0.
6. **Livrables distribuables réellement testés, origine file://, navigateur Chrome** :
   - ZIP R202.60 extrait, SwiftShader Auto Économique : **45,34 FPS**, PASS.
   - HTML unique R202.60, SwiftShader Auto Économique : **42,84 FPS**, PASS.
   - ZIP extrait, RTX 3090 Auto Équilibré : **101,21 FPS**, PASS.
   - HTML unique, RTX 3090 Auto Équilibré : **101,24 FPS**, PASS.
   - Quatre scénarios, **0 requête HTTP(S), 0 erreur JS**, noyau 80 triangles, 28 rubans, 6 nœuds, sélection de forme, extinction et choix manuel confirmés. PID **58696**, exit 0.
   - Rapport brut `evidence/R20260_RELEASE_E2E_GPU_REPORT.json` SHA256 `7c78c57d994eb24d77231c9d448d481b56a8fed46aa1a921dfd9b5301f687e7e`.
   - Capture du rendu logiciel Auto `evidence/R20260_AUTO_SWIFTSHADER_GPU.png` SHA256 `7b42f6334724752ccc5789983a8a6122929668c40c18a08ce40198573f9d70ce`.

## Livrables reproductibles, rollback

- `release/Synestra_Sphere_R20260_Standalone.zip` : 1 672 193 octets ; SHA256 `05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7`. Exactement **2 ressources** remplacées dans le ZIP d'origine (`index.html` et `dist/babylon-lab.js`) ; les **4 autres fichiers** restent identiques. Archive extraite et comparée. Reconstruction indépendante par `python release/build_zip_R20260.py` : **SHA identique octet pour octet**.
- `release/Synestra_Sphere_R20260_OneFile.html` : 7 437 570 octets ; SHA256 `c6fe73ce1c5f653734a51b14d1f148c92ca5cb053f9dbda66b5bd0e084fc32ca`. HTML autonome `file://`, aucun script distant, CSS et JS autorisés par SHA dans la CSP. Reconstruction à partir du nouveau ZIP par `python release/build_onefile_R20260.py` vérifiée.
- R202.59 ZIP SHA256 `2ce059c7d047f81b56e3b733f0168d8471ae7f0ddd3448661ed410e22f7d4483` et OneFile SHA256 `e58d699cf5b1ca10747101ea5177b586b6cf559c4ed03bc3eda394250b565933` **préservés**. Aucune migration, rollback immédiat possible vers R202.59.

## Risques et limite d'approbation

Les FPS ci-dessus sont des mesures en **Chrome SwiftShader sur la machine Inos-Cerebros**, et en Chrome avec GPU RTX 3090 ; ils ne prétendent pas démontrer les performances de tous les PC peu puissants.
Un navigateur ne fournissant pas `WEBGL_debug_renderer_info` peut choisir `balanced` par précaution même en rendu logiciel ; l'utilisateur peut toujours passer manuellement à `economy`.
Le contrat artistique du 29/10 reste distinct : `ART_SIGNOFF=PENDING`, aucun avis favorable inventé.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | NATIVE_SWIFTSHADER=PASS | NATIVE_RTX3090=PASS | RELEASE_GPU_E2E=4_PASS | FULL_REGRESSION=175_PASS_0_FAIL_3_SKIP | ART_SIGNOFF=PENDING`
