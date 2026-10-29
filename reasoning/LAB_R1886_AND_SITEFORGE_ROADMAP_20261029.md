# R188.6 — Labo 3D : noyau énergétique et réorganisation

Mission SYN_LAB_R1886_NUCLEUS_FORMS_CLEANUP_20261029.
Parent R188.5 : 78b0ea3484920dd0281b8d333331e5cc60348c82.
Périmètre : Labo autonome, pas le site vitrine ni SiteForge en production.

## Livrables
- Noyau original conservé ; modes vortex, filaments tressés, ondes pulsées.
- Mode et vitesse indépendants ; taille et puissance historiques préservées.
- Même shader WebGL1, un canvas, aucun moteur ou service supplémentaire.
- Export JSON v1 préservé, extension nucleusDynamics optionnelle et validée.
- Six sections ordonnées ; noyau visible, flux et options avancées repliables.

## Suites du Labo 3D
1. R188.7 : faire évoluer les motifs internes vers de vrais courants spatiaux XYZ, cohérents sous rotation 360 degrés. Conserver la forme originale.
2. R188.8 : presets versionnés, seed fixe et comparateur avant/après reproductible.
3. R188.9 : GPU timer matériel, matrice neuf matériaux/quatre noyaux, tests sur machine modeste physique.
4. R189 : qualification Chrome/Firefox/Edge et téléphone réel ; clavier, reduced motion, restauration contexte WebGL et validation visuelle finale.

## Suites de SiteForge
1. S1 : contrat de module importable Labo vers SiteForge ; manifeste typé, compatibilité des presets et rollback.
2. S2 : insertion dans le builder avec renderer unique, budget GPU adaptatif et fallback statique.
3. S3 : bibliothèque visuelle de matériaux/noyaux, édition, comparaison A/B, presets et sauvegarde.
4. S4 : E2E navigateur et mobile physique ; contrôle des pages non WebGL, sécurité, permissions et performances.
5. S5 : preview privée sous Access et validation artistique distincte avant décision de publication.

Séparation stricte : laboratoire expérimental et produit SiteForge ne partagent pas une autorité de déploiement. Aucun changement sur main, aucun déploiement public, FREE_ONLY. Rollback R188.5@78b0ea3. Les modes actuels sont procéduraux dans le shader, pas encore un champ physique XYZ complet.
