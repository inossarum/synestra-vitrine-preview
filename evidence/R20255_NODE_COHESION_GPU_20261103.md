# SYNESTRA LABO 3D — R202.55 — continuité dynamique des six noeuds
Date : 2026-11-03
Repo : inossarum/synestra-vitrine-preview
Base PR #59 exacte : `78145f44d639720a021a18f32cb7e5cc94a1d7e6`
Branche dédiée : `task/SYN_LAB_R20255_NODE_COHESION_CHATGPT_20261103`

## Résultat structurel
- Les six noeuds énergétiques existants se déplacent de manière cohérente et déterministe sur la surface sphérique, à rayon local conservé **1.53**.
- Les directions échantillonnées alimentent le même cycle de mise à jour de géométrie : points lumineux, six connexions noyau→coque, rubans plasma et fourches.
- En qualité équilibrée, les **8 fourches actives existantes** sont réparties sur les six noeuds (au lieu de deux noeuds sans fourche). Profils conservés : économie **4**, équilibré **8**, ultra **12**. Aucune fourche supplémentaire créée.
- 28 rubans, six noeuds, 80 triangles centraux, une scène Babylon et un seul canvas ; shaders, matériaux, couleurs et lumière **inchangés**.
- Mode `prefers-reduced-motion` : mouvements locaux des noeuds figés aux positions de base.

## Contrôles réellement exécutés
- Failure-first RED initial : module `moving-node-directions.mjs` absent (ERR_MODULE_NOT_FOUND) ; correctif ensuite appliqué.
- Test natif initial : défaut constaté sur la fourche du noeud 5 en qualité équilibrée (fourche non activée). Correction du **budget de distribution**, sans nouvelle géométrie ; test failure-first RED puis correctif.
- Tests ciblés R202.55 + fourches R195 : **8/8 PASS**.
- `npm.cmd ci --offline` : sortie 0, trois packages, zéro vulnérabilité signalée ; avertissement `allow-scripts` esbuild connu, compilation ultérieure validée.
- `npm.cmd run build` : PASS, esbuild ~7,1 Mo. Bundle SHA256 : `166da448dd2aea392bdc1bf086cda6c1537d06ae5869fd9aaf5bd988fd37f3ca`.
- Suite complète Windows : **163 tests, 160 PASS / 0 FAIL / 3 SKIP**, exit 0.
- E2E **Chrome matériel RTX 3090 Direct3D11** : cinq scénarios (frames 0,18,40 à puissance 145 %, mode réduit frame18, puissance 0 % frame18). Six points sur leur rayon, six connexions et fourches actives attachées, 28 rubans, noyau/masque à 80 triangles, une scène/canvas, aucune erreur JS, fermeture propre du navigateur, exit 0.
- Déplacements 3D mesurés entre frames 0 et 18 sur les six noeuds (unités locales) : **[0.2227, 0.1366, 0.0488, 0.2014, 0.2317, 0.1791]**. Au moins cinq noeuds se déplacent >0,10.
- E2E : mode réduit = positions de repos ; puissance 0 = points masqués et fourches éteintes.
- Rapport GPU : `qa-nodes/R20255_MOBILE_NODES_GPU_REPORT.json`, SHA256 `ae14473b577f26a74e9da344b420692823ed79798dce3987ead57fecc1eaa0c5`. Captures PNG conservées dans le dossier QA local, non publiées.

## Limites / autorisations
- Variante structurelle de labo, revue artistique globale non accordée, `ART_SIGNOFF=PENDING`.
- `FREE_ONLY`, pas de merge, pas de déploiement, pas de publication publique et aucun transfert de code refusé historiquement.
- PR #59 et `main` préservées ; worktree distinct.
- Prévisualisation **locale** uniquement : `http://127.0.0.1:5177/` tant que le serveur de test fonctionne.

`FUNCTION_REPORT=PARTIAL | GPU_NODE_COHESION=PASS | REGRESSION=160_PASS_3_SKIP_0_FAIL | STRUCTURE=VERIFIED | ART_SIGNOFF=PENDING`
