# SiteForge 3D R128 — vrai noyau 3D et restitution électrique R121

MISSION_ID=SYN_SITEFORGE_3D_LAB_R128_REAL_3D_ELECTRIC_CORE
CODE_SHA=e47e461c84911ffdef0c14e2a90a5593ba32a8a1
PR=#5 DRAFT; BRANCH=task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024
SCREENSHOT_SHA=16f4ea5ceb247973d26b5c745555880127b71440
DEPLOYMENT=a3aa385f-6f2a-45da-8eb9-9011af820abb

## Correctif causal
R127 remplaçait visuellement la sphère R121 par une couche lumineuse écran XY (shader du quad). Cela produisait un noyau plat. R128 conserve le quad uniquement comme halo optique : la matière du noyau est dessinée par une sphère géométrique de 48 × 96 cellules, 9 216 triangles (27 648 sommets), avec shader WebGL1 éclairé par normales XYZ et bruit volumétrique cohérent issu des couleurs, courants et subtilités de R121. Le rayon agit sur mesh ET masque de profondeur. Les anneaux 3D et tous leurs contrôles restent intacts.

Les huit arcs initiaux sont interprétés par une vraie géométrie XYZ. La rythmique asynchrone électrique (~1,12 s), les ramifications et micro-déviations sont conservées comme vocabulaire visuel, et la largeur du filament est réduite à .0024 × épaisseur, avec halo séparé .0115 × épaisseur. Les résolutions géométriques sont 22/40/64 segments selon les profils.

## QA visuelle et correction
Une capture réelle Chrome du commit R128 avant culling montrait un intérieur trop cyan/lumineux. Cause : l'écriture des deux faces de la sphère en alpha blending avant/après superposait front et dos. Correctif : activation temporaire de gl.CULL_FACE avec gl.BACK pendant la passe du noyau, puis restauration du mode de rendu avant les arcs et les anneaux. Nouvelle capture rend le noyau plus profond, moins opalescent et plus lisible. Capture sauvegardée dans Git au blob 16f4ea5ceb247973d26b5c745555880127b71440. Chromium desktop 1440×1050 et code e47e461c84911ffdef0c14e2a90a5593ba32a8a1 validés par capture. Aucun résultat équivalent n'est encore attesté sur Safari iPhone ou GPU mobile.

## Déploiement et tests
Cloudflare Pages Preview: https://a3aa385f.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ (Access protège la consultation).
Deployment=a3aa385f-6f2a-45da-8eb9-9011af820abb ; code=e47e461c84911ffdef0c14e2a90a5593ba32a8a1 ; 58/58 Node tests PASS, export statique PASS 43 fichiers. Page d'accueil blob=43810b6eaa878c523eb06d97542d791543765d55 inchangé, branche main non modifiée. Chrome local:file sur clone exact-head, non équivalent à une session Access authentifiée sur URL live.

## Limites, risques, choix
Rendu WebGL1 procédural réellement maillé, pas photoréalisme AAA certifié. Anneaux encore stylisés; qualité et fluidité sur appareils modestes inconnues. Capture ciblée avec contexte et animation en état stable, pas d'approbation esthétique finale implicite. Limiter la puissance CPU et le nombre de filaments pour un site web plutôt qu'un jeu. Retirer les travaux expérimentaux non vérifiés seulement après retour visuel. Fallback original R121 conservé dans l'atelier; page principale intacte.

## Reprise
Examiner Preview authentifiée sur Safari iPhone et Chrome desktop, tester changement de nature des impulsions, épaisseur, vitesse et couleur en interaction; mesurer FPS, puis réaliser uniquement les ajustements de qualité visuelle observés. Rétrogradation possible vers le code e47e461c84911ffdef0c14e2a90a5593ba32a8a1 ou R127 de référence, exclusivement sur branche Preview avec contrôle HEAD/worktree.

## Correction quantitative et capture finale
R128 comprend exactement 48 bandes polaires × 96 segments longitudinaux × 2 triangles = 9 216 triangles et 27 648 sommets non indexés. L'ancien libellé inversait triangles/sommets. La capture finale Chrome desktop 1440×1050 correspond au commit e47e461c84911ffdef0c14e2a90a5593ba32a8a1 et blob 16f4ea5ceb247973d26b5c745555880127b71440. Aucun changement de matière/rendu entre la capture R128 précédente et cette correction de documentation UI. Build Cloudflare 58/58 PASS.
