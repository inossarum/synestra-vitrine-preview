# SYNESTRA Labo 3D — R202.58 — synchronisation de la géométrie interne et externe

Date : 2026-11-03
Dépôt : inossarum/synestra-vitrine-preview
Base immuable : PR #62 HEAD `d34fc6b9b29939b097251f2bc6a514b3cff64da8`
Branche isolée : `task/SYN_LAB_R20258_INNER_FLOW_CHATGPT_20261103`

## Problème réellement corrigé

L'interpolation R202.57 ne concernait que les 28 rubans extérieurs : les 18 trajets internes du noyau utilisaient encore directement le mode sélectionné, d'où un saut de forme au cœur lors du changement de mode.

Les **18 chemins internes existants**, notamment les 12 gaines diffuses actives en qualité équilibrée, suivent maintenant les mêmes poids de transition que l'enveloppe extérieure, sur 0,72 seconde. Les quatre géométries stables R200 restent **strictement identiques** aux précédentes (égalité point par point). Changement de mode interrompu ou animations réduites restent gérés par le contrôleur R202.57 préexistant. Aucune nouvelle scène, aucun mesh, shader, matériau, éclairage ou changement de couleur.

## Exécution et récupération

- Préflight : PR #62 HEAD vérifiée sur GitHub et sur `I:`; worktree propre au périmètre suivi, nouveau R202.58 isolé, pas de modification de main ni PR #62.
- Failure-first RED : `sampleBlendedCoreVolume` absent (erreur d'export), puis implémentation déterministe avec validation des poids et chemin rapide mono-mode.
- Premier test de régression complète : le test historique `core-redesign.test.mjs` exigeait la signature `pathCore(i,mode,t)`. Correction sûre : préserver à l'identique la fonction historique et créer `pathCoreBlended` distinct, sans désactiver le test.
- **Tests ciblés : 3 PASS** (18 trajets × 4 modes, interpolation et retargeting, entrées invalides).
- Suite complète Windows : **173 tests / 170 PASS / 0 FAIL / 3 SKIP**, code de sortie 0.
- `npm ci --offline` PASS, trois dépendances disponibles. `npm run build` PASS, bundle esbuild 7,1 Mo.
- Bundle final SHA256 : `a07353500f3730ce84eb3dab29707752cdfe9e803a77e74daf0f8d2690634c6e`.

## Vérification native RTX 3090 / Chrome D3D11

- Source QA : `r20258-native-inner-qa.cjs`, prévisualisation isolée `http://127.0.0.1:5180/`, aucune ressource payante.
- 28 rubans extérieurs et 12 gaines internes visibles dans une même scène Babylon, masque central 80 triangles, 6 nœuds, 1 canvas.
- À `labFrame=18`, mode 0→1, déplacement géométrique interne cumulé, début / milieu / fin : **0,042431 → 0,728922 → 2,262037**. Le mouvement progresse réellement sans saut initial.
- Déplacement de l'enveloppe extérieure : **0,106911 → 1,932368 → 6,271336**.
- Retargeting 1→2→3, extinction (masque et branches invisibles), animations réduites (mode immédiat), GPU matériel et fermeture propre du navigateur : **PASS**.
- L'échec du premier essai de QA provenait d'une assertion imposant des gaines visibles après extinction. Le banc a été corrigé sans changement de la sphère ; l'essai suivant s'est terminé avec **exit 0**.
- Rapport JSON local conservé : `qa-inner/R20258_INNER_ENVELOPE_GPU_REPORT.json` SHA256 `f5b5acb3ee4b5f706c4b553f25896be001a9f5c56fc78b341c494b4a262a0af0`. Capture PNG et script E2E conservés dans le dossier QA local, non publiés.

## Protections et reprise

Aucune fusion, aucun déploiement public, aucun paiement. `main`, PR #62 et les autres worktrees sont préservés. Les réglages de lumière et les shaders restent gelés comme demandé.

Retour arrière sûr : commit de base `d34fc6b9b29939b097251f2bc6a514b3cff64da8`. `ART_SIGNOFF=PENDING` (finalisation artistique non revendiquée).
`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | REGRESSION=170_PASS_3_SKIP | GPU_CORE_CONTINUITY=PASS | FUNCTION_REPORT=PARTIAL`
