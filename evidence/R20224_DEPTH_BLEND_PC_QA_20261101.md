# Labo 3D — R202.24 | transparence contrôlée du noyau facetté (PC)

Date : 2026-11-01. Statut : **candidat artistique isolé, QA PC locale PASS, ART_SIGNOFF=PENDING, PRIVATE_HOSTED_E2E=NOT_RUN**.

## Provenance et sécurité
- Dépôt : `inossarum/synestra-vitrine-preview`.
- Base immuable : **PR #27 R202.23** `3191a6ab0da3e4205b5609273e42795b8cd06f07`. PR #23 à #27 et `main` non modifiées.
- Branche : `task/SYN_LAB_R20224_CORE_DEPTH_BLEND_20261101`.
- Commit de la source raffinée et des tests : `deacd66bc8b6428fc764add92cc093993ade03bc`.
- Objet de revue GPU versionné depuis source exacte : `evidence/R20224_R2_CORE_AB_RTX3090.png` (Git blob `2dff5d18eea24b4a7b526c7cf9f4c0f8790e3f77`, fichier original SHA256 `767322f016aa2c03a449818626ee5690ac4a1e206694907539c6f2507967d85d`).
- Aucun média externe, Cloudflare, nouveau broker, troisième moteur, travail mobile ni PAYG.

## Cause et correction bornée
Le noyau central de R202.23 (80 triangles) est composé dans `renderingGroupId=1`, au premier plan des rubans et du plasma. En lumière Ultra / puissance 145 %, son alpha très élevé produit un disque blanc opaque malgré la géométrie correcte.

R202.24 conserve strictement le maillage 80 triangles / 240 sommets, le rayon 0,38, `Engine.ALPHA_COMBINE`, une seule scène/un moteur/un canvas, le raymarch externe et tous les contrôles PC. **Seul le shader de `createPlasmaHeartMaterial` change** : palette blanc-violet moins saturée, opacité de facette bornée à **0,79** au lieu de **0,94**, hotspot atténué. Les assertions historiques de constantes obsolètes sont actualisées, avec un nouveau test de seuil d'opacité et de géométrie.

La première tentative bornée (alpha 0,68) rendait le noyau trop faible. Rejetée sur vraie capture GPU. La deuxième tentative réintroduit le contraste nécessaire sans reprendre le blanc opaque de R202.23.

## Qualification réelle, poste Inos-Cerebros
- Clone isolé R202.23 depuis SHA exact `3191a6ab...` ; bundle reconstruit SHA256 **`d46f6a7445ce9dffbed72836c70195b1775fcbb62708c14afaf1662dcddce392`**, identique à la preuve PR #27.
- R202.24 candidate source `deacd66bc...`, bundle local reconstruit SHA256 **`ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da`**.
- `node --test tests/*.test.mjs` sur source R202.24 : **91 tests, 89 PASS / 2 SKIP / 0 FAIL** (dont deux tests R202.24). `npm run build` PASS (Windows / esbuild).
- Failure-first: le test borné échouait sur la base ancienne ; sa portée fut corrigée pour ne pas lire l'alpha d'une autre couche plasma ; tous les tests historiques d'invariants conservés.
- Vrai Chrome local WebGL sur **RTX 3090, ANGLE D3D11** pour base et candidat : vérifié depuis `dataset.glRenderer`, **un canvas, 80 triangles, groupe de rendu 1, Ultra, puissance 145 %, `labFrame=6`**.
- Capture A/B source contrôlée (1300 × 900 pixels visuels, Chrome headless / 1300 × 1000 window CSS requested). Comparaison via empreintes SHA256 exactes :
  - R202.23 base finale R2 : `725f3811e0259f6479b7044faba06af4dd8640d5e8ba2d6229d385cda95dbbfd` (497 144 octets).
  - R202.24 R2 : `08138110d4899810be92bdb3bf37f9496d414da0ca6bcfcad8549f5540bcce0f` (498 682 octets).
  - SHA différent / mêmes paramètres / GPU réel / mêmes 80 triangles : **PASS pour une modification visuelle effective, sans prétendre une validation esthétique**.
- Revue directe de pixels par ChatGPT : R202.23 masque plus les rubans par une masse blanche ; R202.24 R2 est moins opaque avec facettes encore lisibles. Le `renderingGroupId=1` reste un compromis de compositing, et **n'est pas une occlusion physiquement exacte**.
- Nettoyage contrôlé : **16 processus Chrome QA à profil temporaire stoppés, 0 résiduel, 0 profil temporaire résiduel, ports de test 4419/4420 libres**. Les sessions normales Chrome sont préservées.

## Limites et suites
- **GPU front seulement** dans cette qualification nouvelle. L'orbite 4 angles R202.23 existante reste le témoin précédent, pas une preuve R202.24 multi-angle.
- Pas de test de FPS prolongé R202.24, ni de E2E hébergé, ni d'approbation artistique. Les E2E souris/qualité/puissance 8/8 historiques concernent PR #27 ; aucun changement du code des contrôles PC sur R202.24.
- Bundle `dist` généré localement dans le checkout isolé (fichier suivi modifié uniquement dans ce checkout), non intégré comme binaire de distribution sur la branche ; la CI devra reconstruire le bundle du commit exact.
- Comparaison PNG maître publiée dans GitHub ; deux screenshots bruts et scripts locaux restent sur `I:\_STUDIO_STAGING\SYN_LAB_R20224_GPU_QA_R2_20261101` et l'environnement d'évaluation, sans upload du poste privé.
- **Aucun merge vers `main` ni promotion du site, pas de PAYG**.
- Décision humaine éventuelle : accepter l'esthétique du noyau translucide ou demander une nouvelle approche d'occlusion locale sans second rendu.
- `FUNCTION_REPORT=PARTIAL`, `R20224_SOURCE_QA=PASS`, `R20224_GPU_AB=PASS`, `ART_SIGNOFF=PENDING`, `HOSTED_PREVIEW_E2E=NOT_RUN`, `PRODUCT_DONE=NO`.
