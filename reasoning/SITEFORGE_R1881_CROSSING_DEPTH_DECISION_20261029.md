# SiteForge R188.1 — croisements énergétiques avec relief spectral

## Faits / objectif
Reprise `HPSYN` après R188.0. Source GitHub feature branch `task/SYN_SITEFORGE_R1881_CROSSING_DEPTH_20261029` créée depuis le commit exact `d0032d2ce37fc572e805b9325abba6c87d1ce6bb`. Objectif : garder le tressage énergétique (non tuyaux) et rendre les intersections plus lisibles en profondeur.

## Décision technique
La branche de shader `uFlow.x>5.5` contient un facteur de produit de densités de lignes aCore/bCore/cCore/dCore/eCore. La lumière d'intersection de R188.0 utilisait une couleur bleu-blanc fixe, avec émission proportionnelle sans limite optique. En R188.1, l'intersection devient un terme de mélange spectral cyan/rose avec composante noyau (20 %), un soft-knee `overlap/(1+2.8*overlap)` et une modulation de profondeur `.16+.84*smoothstep(-.18,.62,q.z)`. La géométrie, les signaux des flux, la physique de la souris et le noyau restent inchangés. Aucun nouveau mode UI, aucune seconde passe, aucun deuxième shader. Effet borné et réversible (retour exact au HTML R188.0).

## Régression et preuve native
SHA candidat `22a0ab5a3f814b6c4dfc7f831319aa40f17241b475f29689bab0c774d9a4d9a8`.
- `node --test tests/siteforge_r1881_isolation.test.mjs` = **6/6 PASS** ; CSP, sept matériaux, géométrie F/G/H, télémetrie, calcul de profondeur.
- `node tests/siteforge_r1881_stress.mjs` = **PASS Chrome Windows** ; 5→8 flux : 18 558 pixels, palette : 32 019, qualité 34/26/40/34, webgl=0, canvas présent, souris on/off.
- `node tests/siteforge_r1881_stress.mjs --mobile` = **PASS Chrome mobile simulé 390×844** ; 5→8 : 9 903, palette : 17 049, qualité 34/24/40/32, webgl=0, souris on/off.
- Captures R188.1 : `evidence/r1881-stress-*.png`. Rapports : `evidence/SITEFORGE_R1881_STRESS_20261029.json` et `...-mobile_20261029.json`. Aucun FPS GPU physique mesuré ; ne pas inférer d'accélération.
- Échec de test puis récupération : le script du test lisait parfois l'ancien mode de qualité sur Chrome SwiftShader ; remplacement de l'attente fixe par une boucle de polling bornée sur l'état DOM du mode réellement appliqué. Les deux vérifications ont finalement PASS.

## Isolation / rollback
Branche propre dédiée, R188.0 intact et publié sur branche GitHub `d0032d2` ; aucune modification du main, des autres worktrees, du Bridge ou des autorisations. État `CANDIDATE_LOCAL_E2E_PASS`, revue esthétique du propriétaire PENDING, publication publique NON. Le navigateur local est sur le port 19101.

## Reprise
Comparer la même scène R188.0 / R188.1 en contrôlant animation/viewport, puis prendre un verdict graphique. Pour une vraie optimisation performance, mesurer RTX3090 via un canal navigateur matériel, non SwiftShader. Ne pas déclarer de gain FPS sans preuve.
