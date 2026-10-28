# R192 — Architecture numérique / sol métallique / scroll

## Constat
Le R191 concentrait titres, CTA, cartographie produits et plasma au même endroit. L'expérience manquait d'une profondeur physique et d'une progression scénarisée à la descente.

## Décisions
1. Extraire le héros R191 dans une nouvelle prévisualisation `r192/`. En haut : seul le manifeste concis et la sphère. Déplacer les trois produits dans un chapitre autonome avec trois liens utiles. Conserver les sections métier en aval, dans un rythme plus aéré.
2. Réutiliser le **même canvas WebGL** R190 : caméra fixe au survol, perturbation locale du plasma. La surface métallique est un plan CSS en perspective avec métal brossé, ombre diffuse, lumière cyan/violet projetée et reflet dégradé de l'image WebGL existante. Il s'agit d'un **reflet visuel approximatif**, pas d'un ray tracing physiquement mesuré.
3. Réutiliser les pages R191 de Connect/Bridge/SiteForge/Offres ; centraliser le complément visuel dans `assets/r192-experience.css` et le comportement de scroll dans `assets/r192-experience.js`, sans framework ni requête distante. Ajouter une barre de progression, un repère de chapitre et l'apparition progressive des sections à l'intersection.
4. Préserver `prefers-reduced-motion` et les fallback navigateurs. L'ancienne CSP de l'accueil acceptait les CSS intégrés mais bloquait les feuilles CSS du même site ; la nouvelle version autorise explicitement **self** sans ouvrir à des origines tierces.

## Validation
- 111 tests Node PASS : 99 hérités + 5 R191 + 7 R192.
- 15/15 captures Chrome sur 5 routes, largeurs 1440/768/390 ; aucune fuite horizontale.
- Real Browser scroll Y=2400 : progression 25,29 %, indicateur de chapitre présent, 4 éléments déjà révélés.
- Réduction des animations : fond absent, contenus conservés.
- WebGL inspecté en direct : `uTilt=[0,0]` pendant le survol, impulsion maximale 0,6862, retour à 4,69e-11.
- SHA et captures dans Evidence. R191 et shaders R190 inchangés.

## Risques et reprise
- Le photoréalisme du sol reste une **approximation CSS / réflexion screen-space**. Exiger une lumière physiquement fondée nécessiterait un shader de sol et une revue GPU dédiée.
- Pas de déploiement ni de fusion. Révision utilisateur puis raccordement à la source active exacte avant publication.
- Pas de fabrication de preuves E2E Cloudflare ni de validation commerciale.

NEXT : ouvrir la prévisualisation locale /r192/, comparer le matériau sous lumière et la densité de scroll, puis ne fusionner qu'après qualification de l'intégration réelle.
