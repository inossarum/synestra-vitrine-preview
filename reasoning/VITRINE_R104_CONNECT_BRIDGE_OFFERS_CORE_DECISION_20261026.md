---
document_id: VITRINE_R104_CONNECT_BRIDGE_OFFERS_CORE_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_VERIFIED_VISUAL_PENDING
evidence: evidence/VITRINE_R104_PRODUCT_PAGES_ENERGY_CORE_20261026.json
verified_code_head: 4c9444574af7df2dd93651113d503a58a308c7fc
---
# R104 — Trois pages dédiées, Core animé, distribution honnête

## Demande et choix
Demande propriétaire du 26/10 : pages Connect et Bridge décrivant exactement leur rôle, orientation Bridge vers les offres et téléchargements éventuels, davantage de vie graphique, retrait du logo central du noyau au profit d'un Core réellement animé.

Réutilisation intégrale de l'identité approuvée R99 : **bannière officielle conservée**, typographie et palette sémantique reprise par `assets/product-pages.css`. Un seul ensemble de styles partagé entre `connect/index.html`, `bridge/index.html` et `offres/index.html`. Aucun serveur, outil de paiement, application ni autre système d'identité ajouté.

Le Core `syn-core-r104` remplace seulement l'image centrale dans la scène conceptuelle. Anneaux de confinement, dynamo et plasma à gradients/animations CSS, particules. La bannière dans l'en-tête reste inchangée. Aucun flux réel, télémétrie ou connexion ne peut être inféré de cette animation. Interactions de navigation natives, FAQ details, cartes, supports clavier/mobile et reduced-motion.

## Vérification d'offres
Les releases GitHub de `inossarum/studio-virtuel` ont été consultées : **liste vide** au contrôle. Aucune signature/URL de binaire public n'a été attestée. La page Bridge pointe donc vers `/offres/#bridge` et l'authentique URL du portail pilote existant, mais **aucun faux téléchargement, prix ou paiement** n'est proposé. Si un release signé est publié, rajouter uniquement URL, signature/version/SHA et E2E d'installation qualifiés. Ne pas exposer la QA MSIX non signée comme production.

## Relecture et tests observés
Les 3 pages et leurs liens, CSP self-only, aria/skip/focus et responsive passent leurs assertions de source ; R96/R98/R99 tests historiquement couplés au logo du stage ont été ajustés pour correspondre à la demande récente, sans supprimer les vérifications de provenance/logo officiel R99 de l'en-tête. La validation Cloudflare en code exact-head `4c9444574af7df2dd93651113d503a58a308c7fc` : 33/33 tests Node PASS, liste blanche de 37 fichiers, déploiement prévisualisation `6347e40b-b0c5-47bb-b60b-e4cb3e27c75c` stage success, 0 échec. Config production `false`, PR #5 DRAFT.

## Limites et NEXT
L'outil web ne pouvait pas ouvrir les URL `pages.dev`. Une capture réelle modèle-pixels, E2E HTTP indépendant, test lecteur d'écran et Lighthouse restent `PENDING`, non remplacés par les tests Node. Cloudflare Browser Rendering non appelé sous FREE_ONLY sans droit/quotas prouvés. L'environnement de production `main` n'a pas été modifié ; Cloudflare preview précédente `cfedaf15-e3ee-407c-9686-fe88c1f987e2` est conservée comme point de retour.

NEXT : vérifier la nouvelle prévisualisation sur mobile/desktop, corriger les détails d'alignement/contraste et tester clavier + flux jusqu'aux offres. Après publication d'un paquet Bridge signé, actualiser les liens de téléchargements avec preuve. Fusion/publication réelle uniquement sur validation séparée.

FUNCTION_REPORT=PARTIAL
