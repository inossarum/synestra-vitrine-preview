# R202.61 — Preuve analytique exécutable : saturation alpha et largeur des six flux

Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Statut : ANALYTIC_TEST_PASS / GPU_FRAGMENT_E2E_NOT_EXECUTED / ART_SIGNOFF_PENDING
Branche d'expérimentation : task/SYN_LAB_R20261_NODE_STREAM_ROOT_ALPHA_20261104
Commit du test : 4a95124d3e35ce83b0a8adbcedf471f91eaa4e72
Fichier : lab-babylon/tests/r20261-root-alpha-visibility-limit.test.mjs
Git blob exact (relu après publication) : f8f128c20706f94b981a575dd9f59e2b78e320bc
SHA256 local du test exécuté : 0f4874c6520ac5c2a50bddf38e9f3866539c03fea182fbe661b1fae51e892613

## Sources et méthode
- GitHub `inossarum/synestra-vitrine-preview` : `lab-babylon/src/core-shell-flow.mjs`, blob `5dab6252a0569469fdc485a9088613769cf93e1b`.
- Ce blob a été reproduit octet pour octet dans un environnement Node.js isolé et vérifié avec `git hash-object` (identique).
- `lab-babylon/src/plasma-ribbons.js`, blob source `55b9408363e974554cbbefd320d24a8dd29e4365`, pour la formule de fade/width et les 5 rails. Le test calcule ces expressions de manière déterministe ; il n'exécute PAS Babylon/WebGL.
- `lab-babylon/src/main.js`, blob `893de7af2beaad6871a2c317ba06e381200a90ed`, pour les 6 directions et le rayon .38 du noyau.
- Ancien checkpoint de diagnostic : `77c128056ed2658a0e5c4a2f8abef99a8a51e22c`.
- Procédure FAST : comparer les blobs, réutiliser les calculs 6x5 et ne pas rejouer le test GPU ou le rootGlow rejeté.

## Tests réellement exécutés
- Runtime : Node.js v22.16.0 en container d'analyse isolé, non sur le PC du propriétaire.
- Première itération : 4 PASS / 1 FAIL. L'assertion de départ avait incorrectement ignoré les effets minuscules sur les indices 65..71 de fin de flux ; correction du **contrat de test**, sans changer le code source du projet.
- Seconde itération : 5 PASS / 0 FAIL.
- Troisième itération renforcée (incluant les 5 rails) : 6 PASS / 0 FAIL ; durée reportée par node:test 120.138246 ms.
- Contrôle de durabilité : le blob Git `f8f128c20706f94b981a575dd9f59e2b78e320bc` correspond exactement au fichier exécuté localement ; la branche de recherche a reçu le commit `4a95124d3e35ce83b0a8adbcedf471f91eaa4e72`.
- Aucune CI GitHub, E2E GPU, inspection de buffers stencil, validation artistique ni déploiement n'est revendiquée.

## Résultats
- Six directions × cinq instants t=0,0.3,1,4,18 × 73 points/flux.
- Les échantillons 0..7 ont un fade augmenté par la variante rejetée `rootGlow=.90*(1-u)^4`. À partir de l'échantillon 8, le fade original est saturé jusqu'à l'index 64.
- Un petit effet résiduel existe aux indices 65..71, avec un maximum de différence d'opacité de fade de `0.0000804090042` (indice 65), avant multiplication des facteurs supplémentaires du shader. La valeur au dernier index 72 reste zéro.
- Le premier point de centerline hors sphère de rayon .38 est à l'index 15 pour les six flux et cinq instants.
- Borne conservative de rayon pour TOUS les sommets des cinq rails affectés aux indices 0..7 : `rayon(centerline)+largeur_max_rail <= 0.3003561124092603`.
- Rayon inscrit analytique conservateur de l'icosaèdre de rayon extérieur .38 : `0.38*sqrt((5+2sqrt(5))/15)=0.3019686994708711`. Marge minimale : ~0.001612587.
- C'est une borne de sommets, PAS une mesure de fragments rasterisés ; les triangles entre index 7 et 8 peuvent traverser la frontière du noyau, et les groupes/depth/stencil ne sont pas évalués par ce test.
- Explication causale renforcée : la variante rootGlow, pourtant capable de modifier les données de couleur, concentre presque toute son action significative là où les sommets du flux sont internes au noyau. Elle ne justifie donc pas de répéter un essai d'alpha à l'identique.
- Les seuils visuels antérieurs et le verdict REJECT demeurent inchangés ; aucun code shader/mesh/ZIP du produit n'a été modifié.

## Préflight et limites
- HPSYN mission `labo3d_sphere_r20261` : workflow instance `hpsyn-1a70dd1364ae-labo3d_sphere_r20261` ; mission_status BLOCKED, steps repo_state/skill_route/visual_probe BLOCKED avec `HPSYN_ENGINE_PRECONDITION_MISSING`; Doctor RESULT_OBSERVED mais ready=false. Aucun nouveau run Doctor déclaré.
- Le contrôle Windows groupé du tour antérieur a été refusé ; pas de reroutage de cette même opération.
- Source normative : `inossarum/studio-virtuel` HEAD `7464dbb5e7fa43842556c57c727210d7e8d5db50`, `AGENTS.md` blob `e0f6df26edc9a45b7db1a5261e92b719d2dd66ce`.
- Memory V1 manifeste : `00_DIRECTION/MEMORY_CORPUS_V1.json` blob `2b1a02230f570aa153e01b686337a432e394f7ca`, 180 entrées. Aucun enregistrement manifestement nommé R202.61 dans la recherche ciblée. Cela n'est PAS une preuve d'absence dans le corpus.
- Central Skills snapshot `a2d091230e10b2212e91d155260dd506849d3da1` : fast-path-delta-only@1.0.0#9f47cb55 ; reasoning-evidence@1.0.0#b1d95e26 ; visual-regression-testing@1.0.0#aa98fffe.
- SOURCE_GATE=LIMITED : autorité GPU réelle et octets du PNG canonique toujours manquants. HOOKS_STATUS=UNKNOWN. FREE_ONLY respecté.

NEXT : la mesure réelle des fragments visibles/rejetés sous masque exact à viewport/frame fixes, seulement si un chemin autorisé existe ; aucune promotion du rendu sur le test mathématique seul.
FUNCTION_REPORT=PARTIAL.
