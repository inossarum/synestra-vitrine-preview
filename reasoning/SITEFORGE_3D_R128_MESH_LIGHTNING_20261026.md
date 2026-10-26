# SiteForge 3D R128 — vrai noyau 3D et restitution électrique R121

MISSION_ID=SYN_SITEFORGE_3D_LAB_R128_REAL_3D_ELECTRIC_CORE
CODE_SHA=bffe4e9e7d7c55d577065b2cc3151b116653351f
PR=#5 DRAFT; BRANCH=task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024
SCREENSHOT_SHA=1428a1c8f71677f4938145fd5772b417539d7e6c
DEPLOYMENT=c871f5b4-f7e8-499a-a33a-4bc5d38814bc

## Correctif causal
R127 remplaçait visuellement la sphère R121 par une couche lumineuse écran XY (shader du quad). Cela produisait un noyau plat. R128 conserve le quad uniquement comme halo optique : la matière du noyau est dessinée par une sphère géométrique de 48 × 96 cellules, 27 648 triangles, avec shader WebGL1 éclairé par normales XYZ et bruit volumétrique cohérent issu des couleurs, courants et subtilités de R121. Le rayon agit sur mesh ET masque de profondeur. Les anneaux 3D et tous leurs contrôles restent intacts.

Les huit arcs initiaux sont interprétés par une vraie géométrie XYZ. La rythmique asynchrone électrique (~1,12 s), les ramifications et micro-déviations sont conservées comme vocabulaire visuel, et la largeur du filament est réduite à .0024 × épaisseur, avec halo séparé .0115 × épaisseur. Les résolutions géométriques sont 22/40/64 segments selon les profils.

## QA visuelle et correction
Une capture réelle Chrome du commit R128 avant culling montrait un intérieur trop cyan/lumineux. Cause : l'écriture des deux faces de la sphère en alpha blending avant/après superposait front et dos. Correctif : activation temporaire de gl.CULL_FACE avec gl.BACK pendant la passe du noyau, puis restauration du mode de rendu avant les arcs et les anneaux. Nouvelle capture rend le noyau plus profond, moins opalescent et plus lisible. Capture sauvegardée dans Git au blob 1428a1c8f71677f4938145fd5772b417539d7e6c. Chromium desktop 1440×1050 et code bffe4e9e7d7c55d577065b2cc3151b116653351f validés par capture. Aucun résultat équivalent n'est encore attesté sur Safari iPhone ou GPU mobile.

## Déploiement et tests
Cloudflare Pages Preview: https://c871f5b4.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/ (Access protège la consultation).
Deployment=c871f5b4-f7e8-499a-a33a-4bc5d38814bc ; code=bffe4e9e7d7c55d577065b2cc3151b116653351f ; 57/57 Node tests PASS, export statique PASS 43 fichiers. Page d'accueil blob=43810b6eaa878c523eb06d97542d791543765d55 inchangé, branche main non modifiée. Chrome local:file sur clone exact-head, non équivalent à une session Access authentifiée sur URL live.

## Limites, risques, choix
Rendu WebGL1 procédural réellement maillé, pas photoréalisme AAA certifié. Anneaux encore stylisés; qualité et fluidité sur appareils modestes inconnues. Capture ciblée avec contexte et animation en état stable, pas d'approbation esthétique finale implicite. Limiter la puissance CPU et le nombre de filaments pour un site web plutôt qu'un jeu. Retirer les travaux expérimentaux non vérifiés seulement après retour visuel. Fallback original R121 conservé dans l'atelier; page principale intacte.

## Reprise
Examiner Preview authentifiée sur Safari iPhone et Chrome desktop, tester changement de nature des impulsions, épaisseur, vitesse et couleur en interaction; mesurer FPS, puis réaliser uniquement les ajustements de qualité visuelle observés. Rétrogradation possible vers le code bffe4e9e7d7c55d577065b2cc3151b116653351f ou R127 de référence, exclusivement sur branche Preview avec contrôle HEAD/worktree.
