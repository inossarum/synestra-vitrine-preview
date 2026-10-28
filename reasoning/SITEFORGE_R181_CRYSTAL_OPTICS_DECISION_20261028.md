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

## Vérification publique finale

- Version R181 isolée : https://inossarum.github.io/synestra-siteforge-r176-lab/r181.html — HTTP 200 sans authentification, build GitHub Pages built.
- Test complet Chrome Windows sur l'URL réellement publiée : code sortie 0, six matériaux PASS, huit réglages mote, 18 réglages plasma, orbite tactile / souris et retour à 360° PASS, JSON v1 import-export PASS, WebGL error 0.
- R181 facettes : affichage distinct de la capture R180. Différences de capture totale de 70 203 pixels sur 307 840 ; cette comparaison inclut aussi les variations entre exécutions, ne pas la présenter comme un effet uniquement des cristaux.
- Budget mobile : mode équilibré 14 échantillons puis adaptatif 12 avec 96 éclats, retour 14. Limite : **aucune mesure physique de FPS/GPU sur appareil mobile**, uniquement la charge théorique et le comportement navigateur validés.
- Evidence correspondante : `evidence/SITEFORGE_R181_CRYSTAL_OPTICS_MOBILE_20261028.json` blob `f670685324c08013d9d5dfc5a5e98897d720bad7` ; version source SHA-pinnée de la release `584d5a0918126dcdbc41784a021f5cb5423f2f7b`.
- La branche `main` et les versions R176–R180 demeurent inchangées. Validation visuelle propriétaire PENDING.
