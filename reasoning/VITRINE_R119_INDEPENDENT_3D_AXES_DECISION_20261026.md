---
document_id: VITRINE_R119_INDEPENDENT_3D_AXES_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_CORE_METALLIC_GYROS_R119_20261026
owner: Inos
tested_code_sha: ca3f2401edf624a4bd284777ff20ed32b0cb1716
evidence: evidence/VITRINE_R119_INDEPENDENT_3D_AXES_20261026.json
status: PREVIEW_PUBLISHED_VISUAL_QA_PENDING
---
# R119 — anneaux métalliques plus épais, axes physiques distincts et noyau réduit

## Décision graphique et géométrique
Le retour propriétaire sur la Preview R118 demande plus de masse métallique, un noyau plus petit et des trajectoires propres à chaque anneau avec occultation visible au premier plan. R118 calculait trois normales distinctes mais toutes tournées autour du Z global : insuffisant.

R119 réutilise un unique shader WebGL1 et remplace ce mouvement par trois rotations des normales avec la formule de Rodrigues autour de trois axes fixes et différents : A=(.90,.10,.42), B=(-.45,.82,.35), C=(.60,-.75,.29). Périodes 13/17/20 secondes, B inversé. La profondeur est recalculée par pixel; les trois comparaisons trient le métal de l'arrière vers l'avant. Sur le disque du noyau (rayon .69→.53), seuls les fragments plus proches que la surface sphérique sont composités. L'alpha des fragments métalliques au premier plan n'est plus diminué par le fondu du bord du noyau. Les plages d'orientation sont bornées et testées : chaque anneau peut recouvrir la sphère, sans singularité plane.z<=.10.

Largeurs SVG 5.8/3.9/3.6→9.0/6.4/6.0 ; limites de bande GLSL .038/.036/.034→.064/.061/.059. Sphère fallback 86→66 px ; reflets replacés dans le disque. SVG : trois rotations CSS rotate3d et couches arrière peintes avant le disque, avant peintes après; il ne s'agit pas d'un rendu 3D aussi exact que WebGL. Huit arcs sont conservés, leur extrémité étant bornée à .515 pour le nouveau rayon. Les capsules Connect, Bridge et SiteForge, la limitation GPU et le reduced-motion sont inchangés.

## Exécution prouvée
Code Git `cac6506acf7d1644d32414822acd727474956840`. Preview première tentative `23c49aca-aabd-4f3e-9a01-0c79082dc3fd` échouée (49/50), unique assertion historique R114 encore fondée sur l'ancien rayon des arcs; correctif **test seul** `ca3f2401edf624a4bd284777ff20ed32b0cb1716`. Seconde Preview Cloudflare `6a64efe8-c432-43f0-bd31-5ebb08d8db3b` SUCCESS, 50/50 Node PASS, 38 fichiers statiques exportés ; SHA déployé `ca3f2401edf624a4bd284777ff20ed32b0cb1716`. Lien : https://6a64efe8.synestra-vitrine-preview.pages.dev/ .

Pas de merge main, production, modification des droits ni activation facturation. R118 reste disponible comme aperçu de récupération : https://c063382a.synestra-vitrine-preview.pages.dev/ .

## Limite et étape suivante
Un vrai navigateur n'a pas pu accéder au domaine Pages depuis les outils de cette session. Ni compilation WebGL GPU ni inspection des pixels ne sont qualifiées malgré le build Cloudflare. Le test géométrique est déterministe mais non substituable à l'E2E visuel. Le prochain contrôle requis est une capture Chrome/Safari à 390/768/1440, avec vérification des trois trajectoires, occultations avant/arrière, absence de recouvrement des capsules et performances mobile; ajouter sa preuve avant de déclarer DONE visuel. Memory V1/SAL/Runbooks non prouvés accessibles à ce tour. SOURCE_GATE=LIMITED, VISUAL_PREVIEW_BROWSER=PENDING, FUNCTION_REPORT=PARTIAL.
