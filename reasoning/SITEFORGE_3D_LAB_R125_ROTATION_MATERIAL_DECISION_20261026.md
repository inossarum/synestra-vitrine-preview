# R125 — SiteForge 3D : révolutions à 360° et métaux améliorés

MISSION_ID=SYN_SITEFORGE_3D_LAB_R125_FULL_ROTATION_MATERIAL_20261026
DATE=2026-10-26
OWNER=SiteForge 3D, PR #5 DRAFT
CODE_SHA=0d766eaaefc7dde729c7e55410b3dc9be05f4bc2
DEPLOYMENT_ID=b4857d2c-0c61-4cf3-b541-9b064219827c
PREVIEW=https://b4857d2c.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/

## Cause racine réparée
R124 utilisait des axes proches de la normale des anneaux (produit scalaire ≈1), ce qui les faisait tourner autour de leur propre plan et ne produisait quasiment aucune bascule visible. R125 remplace les trois axes par des vecteurs perpendiculaires aux normales, chacun pour une période indépendante de 13, 17 et 20 secondes avec sens spécifiques. Test Node R125 : dot(axis,normal) < .025, quart de tour ≈90°, demi-tour retourne la normale (dot < -.97) et 360° la rétablit (dot > .999) pour chaque anneau. Ce contrôle valide **la cinématique source**, pas les pixels navigateur.

## Matériaux
Le rendu R124 basique (mix linéaire et deux reflets Phong) est remplacé par GGX + Smith + Fresnel Schlick, avec sources de réflexion studio procédurales bleues et ambre, brossage radial, bords/chanfreins et tonemapping filmic ACES, en WebGL1 local sans nouveaux téléchargements ou pay-per-use. La géométrie passe de 144 à 256 segments par anneau. Limite : approche procédurale destinée à améliorer la qualité, pas encore une PBR/IBL de production validée par comparaison photographique.

## Livraison et preuve
Code 0d766eaaefc7dde729c7e55410b3dc9be05f4bc2 enregistré sur PR #5 DRAFT. Cloudflare Pages Preview déploiement b4857d2c-0c61-4cf3-b541-9b064219827c : deploy/success ; 51/51 tests Node ; export PASS, 41 fichiers ; SHA exact corrélé. Page d'accueil (sphère R121) strictement inchangée, blob 43810b6eaa878c523eb06d97542d791543765d55. Aucune fusion main.
Le navigateur Chromium du runtime de test n'a pas fourni de WebGL précédemment ; aucune compilation GLSL GPU ni capture navigateur cible n'a pu être attestée dans cette session. La Preview est publiée, **VISUAL_GATE=PENDING**, et il est interdit de prétendre que l'aspect Nintendo 64 est résolu sans observation réelle.

## Prochain pas
Inspection navigateur réel, fidélité par rapport à l'image approuvée, captures d'au moins un écran mobile et un écran desktop, contrôle des trois retournements 360° et de l'absence d'artefacts/erreurs shader, puis itération VISUELLE uniquement après ce gate. Rollback en conservant la branche Preview et le SHA précédent d2578e87be3c5bf818e751d7803c92ebaf3f0a84.
