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

## Qualification publique finale

- R183 versionnée : https://inossarum.github.io/synestra-siteforge-r176-lab/r183.html, GitHub Pages HTTP 200 `built` et absence de Cloudflare Access ; commit Pages `7621ef142e66cecacdd165f676514277ea39dc0b`, blob autonome `d919163a3a9f3e1c95e6912dc8251dd2602e1ddb`.
- Chrome Windows headless WebGL sur **la page publique** : tests E2E complet et Auto indépendants, **exit 0** chacun ; six matériaux, mobile 390px, souris/tactile et 360°, JSON v1 export/import ancien, 18 réglages plasma et 10 éclats, zéro erreur GL.
- Réduction adaptative réelle dans Chrome public : sur 390px, 14 échantillons et pénalité 0 au départ, puis 12 échantillons et pénalité 1 lorsque la cadence lente reste mesurée (EMA de ~66,1 ms), et retour à 14 et pénalité zéro en mode Équilibrée. Rotation partagée conservée ; mode par défaut Équilibrée inchangé.
- 156/156 tests Node PASS et 49 fichiers export statique PASS. Tests de seuils Auto/hystérésis/pauses déterministes PASS.
- Evidence durable : `evidence/SITEFORGE_R183_FRAMEBUDGET_20261028.json` blob `cc15fd8a2acb226143ce0dd3b8c4131be45ca6c4`.
- Source commit initial R183 `6b80e861482f16ac27d10eff058aec6da6ba375f`. `main` inchangée à `df67fcd5cc6b7cc0fb42fa86c8920d28b9427494`, R182 blob Pages inchangé `55f54b38fd56310faa20cd3217bfbeff1cd9100d`.
- Limites : rAF sur SwiftShader fournit une cadence observée côté navigateur, **pas une mesure des FPS sur GPU physique mobile**. Acceptation esthétique propriétaire PENDING. R183 qualifiée comme prévisualisation publique isolée uniquement.
