# R181 — Facettes optiques et budget mobile

## Besoin

Améliorer la qualité visuelle des fragments cristallins SiteForge R180 et maîtriser la charge GPU des configurations mobiles denses, tout en conservant les orbites 3D, les vitesses synchronisées et les contrôles historiques.

## Choix

Un seul shader WebGL1 : forme de cristal oblique à facettes, trois normales de surface, lumière orientée depuis le noyau volumétrique, spéculaire, arêtes/biseaux et réflexion centrale. Branches stylistiques distinctes ; étincelles et orbes restent les références R180. Aucune texture externe, aucun second moteur, aucune modification de `main` ou d'Access.

Budget mobile déterministe : 14 échantillons par rayon dans le cas habituel ; 12 sous charge de pixels élevée (>240000 pixels) ou au-delà de 75 éclats. Desktop reste à 22. Aucun GPU timing fiable disponible dans SwiftShader : ne pas prétendre avoir prouvé un gain FPS physique. Exposer la modalité effective via `data-volume-steps` et `data-mobile-quality` pour la QA.

## Validation

146/146 tests Node PASS et export statique 49 fichiers PASS. Chrome local en cours lors de la première rédaction ; comparer capture R180 et facettes R181, six matériaux, orbite/tactile/JSON, puis vérifier la transition mobile 14→12→14 sous effectif 160→46. E2E public obligatoire avant DONE.

## Rollback

Publier uniquement `r181.html` sur GitHub Pages isolé, conserver les fichiers R176-R180 et la production. En cas d'échec retirer la page R181, revenir à R180. Branche source `task/SYN_SITEFORGE_R181_CRYSTAL_OPTICS_MOBILE_20261028` depuis `11bf5e13ac281aec49526a40d87b764bc444fe9a`.
