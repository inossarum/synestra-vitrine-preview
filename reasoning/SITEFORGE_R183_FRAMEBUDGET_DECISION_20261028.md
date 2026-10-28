# SiteForge R183 — Gestion adaptative des échantillons volumétriques

## Besoin et continuité

Poursuite directe de la R182, avec amélioration concrète du coût de rendu GPU sans changer le mouvement synchronisé du plasma et des éclats, les 18 paramètres de matière, les 10 paramètres de particules, les six matériaux, les réimports JSON, la rotation 360° et les effets visuels approuvés. Aucun merge main ni modification Cloudflare Access.

## Choix de conception

Trois nouveaux modes facultatifs en plus du mode R182 par défaut : `auto`, `performance`, `quality`; ce sont des paramètres d'affichage, exclus du schéma JSON v1 pour garantir l'identité des scènes exportées. Limites du moteur WebGL1 : 22 ray-march steps maximum. Mode équilibré = règles R181 desktop 22 / mobile 14 ou 12 sous charge. Économie GPU = desktop 16 / mobile 10 ; détaillé = desktop 22 / mobile 18. Mode Auto : moyenne EMA des intervalles des images effectivement calculées (pas mesures GPU), seuil lent >62ms, rapide <42ms, 24 échantillons minimum, 3,5s avant descente et 8,5s avant remontée, deux niveaux de pénalité maximum et bornes 8 mobile/14 desktop.

L'animation utilise le même temps écoulé, les mêmes matériaux et le même `uSpinPhase`. Le nombre de particules et les choix artistiques restent intacts. Afficher la cadence comme « img/s (Chrome) » avec avertissement « pas un benchmark GPU physique ». Le rafraîchissement texte est plafonné à une fois toutes les 650 ms.

## Preuves

- 156/156 tests Node PASS + export statique 49 fichiers PASS.
- Chrome Windows SwiftShader réel avec 6 matériaux, tactile/souris, 180/360, mobile 390px, JSON/legacy et zéro erreur GL : code 0.
- Test de charge mobile dans Chrome : mode Auto initial 14 échantillons et 14,1 images/s (EMA), puis après ralentissement constaté 12 échantillons et 13,3 images/s (EMA), `qualityPenalty=1`. Retour manuel Équilibrée : 14 échantillons, pénalité zéro. Il ne s'agit pas de mesures physiques de FPS mobile.
- Test de la logique d'hystérésis à entrées déterministes : descente et remontée stables ; rejet des pauses très longues.
- L'opt-in est volontaire : le mode Équilibrée, valeur par défaut, garantit la fidélité de rendu historique.

## Livraison et limites

Branche source `task/SYN_SITEFORGE_R183_ADAPTIVE_FRAMEBUDGET_20261028` issue de la R182 `1bce19caf7296740a0dcd796cda534721ec12c42`. Aperçu versionné `r183.html` sur Pages du laboratoire, sans toucher à index R176 ni R177–R182. La page publique et son E2E ne sont PAS attestés au premier enregistrement.

Mesure physique GPU sur téléphone : NON MESURÉE. Acceptation visuelle propriétaire : PENDING. Rollback : retirer le seul `r183.html`, retrouver R182 immédiatement.
