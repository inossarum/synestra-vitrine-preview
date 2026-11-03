# Labo 3D R202.56 — quatre morphologies structurelles, sans réglage lumineux
Date 2026-11-03 | Repo inossarum/synestra-vitrine-preview
Base PR #60 commit `75b5288876a60f738c165281203b711906ed8102`.
Branche isolée `task/SYN_LAB_R20256_ENVELOPE_MODES_CHATGPT_20261103`.

## Résultat réel
Le sélecteur de forme interne existant (4 modes) agit désormais aussi sur les **28 rubans plasma extérieurs**, sans ajouter de maillage ou de shader :
- 0 Rayonnement : géométrie antérieure conservée à l'identique.
- 1 Vortex : rotation tridimensionnelle douce des courants.
- 2 Tressage : alternance des déformations entre les courants.
- 3 Pulsation : onde de pression radiale le long des trajets.

Les 28 trajectoires conservent leurs 85 points et leurs extrémités fixées, leurs 5 rails de ruban, ainsi que la cadence CPU existante. Un changement de mode actualise la géométrie même à temps figé. Les six nœuds mobiles et leurs connexions R202.55 restent en place.

## Preuves et tests
- Failure-first : module manquant `shell-mode-shapes.mjs` initialement, puis cassure du mode vortex détectée ; correction par déformation après normalisation, sans masquer la régression.
- Le test géométrique est comparatif avec la référence R202.55 : aucune aggravation non bornée de la courbure sur les 28 rubans × 4 modes ; ancrages et limites validés.
- Les quatre tests spécifiques R202.56 : **4 PASS**.
- `npm.cmd ci --offline` : code 0, trois packages ; compilation esbuild 7.1 Mo : code 0.
- Suite complète : **167 tests / 164 PASS / 0 FAIL / 3 SKIP**, code 0. Les anciens tests de compatibilité ont été conservés en restaurant l'ordre des arguments attendu ; aucun contournement.
- E2E **Chrome GPU NVIDIA RTX 3090 / D3D11**, une scène Babylon, un canvas, 28 rubans, noyau + stencil de **80 triangles**, six nœuds. **4 modes sélectionnés en direct dans la même page**, GPU sans erreur JS, navigateur fermé proprement, code 0.
- À la même image figée 18 (1100×900, qualité équilibrée, puissance 145), le taux de pixels changés par rapport au mode 0 : vortex **12,944 %**, tressage **13,291 %**, pulsation **9,376 %**. Mesure pixel à seuil RGB ≥ 18.
- Géométrie : variation cumulée des positions des courants actifs : vortex **6,271**, tressage **5,468**, pulsation **2,600** en unités locales.
- Extinction à 0 % : masque inactif, aucune fourche visible, état préservé.
- Rapport GPU local `qa-envelope/R20256_MODE_MORPH_GPU_REPORT.json` SHA256 `6fc11a696db1edf73110d0a62714f4f4acc9a2bd6bc246d056bb82c59cc207ce`; captures originales et script E2E conservés localement.
- Planche de quatre captures natives versionnée dans `evidence/R20256_4_MODES_GPU.png`, SHA256 `52535a285339a7f7fe15cdddc7b6fe015cb84a9fb789314211f6b938be00e80d`.

## Décisions, garde-fous et reprise
- Aucun changement de lumière, opacité, couleurs, matériaux ou shader. REUSE_FIRST, FREE_ONLY et branche Git dédiée respectés.
- Aucun merge vers main ni déploiement public.
- En attente : validation artistique globale et finition visuelle uniquement **après** structure acceptée. Ne pas considérer la PR DRAFT ou le prévisualiseur local comme déploiement.
- Retour arrière sûr : checkout PR #60 HEAD `75b5288` sans perte des fichiers de cette branche.
- Preview local tant que le serveur tourne : `http://127.0.0.1:5178/`.

`SKILLS_APPLIED=git-worktrees@1.0.0,reasoning-evidence@1.0.0,failure-first@1.0.0 | GPU_E2E=PASS | REGRESSION=164_PASS_3_SKIP | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
