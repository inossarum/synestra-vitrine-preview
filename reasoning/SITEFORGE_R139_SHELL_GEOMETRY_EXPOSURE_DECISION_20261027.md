# R139 — luminance générale et véritable contour intérieur variable
DATE=2026-10-27
MISSION_ID=SYN_SITEFORGE_R139_EXPOSURE_VISIBLE_SHELL_GEOMETRY_20261027
OWNER=Inos
EVIDENCE=evidence/SITEFORGE_R139_EXPOSURE_SHELL_GEOMETRY_20261027.json
TESTED_COMMIT=3a02def61c3ca3efc082a3f1bee56a57d8c4ab14
SOURCE_BRANCH=task/SYN_SITEFORGE_R116_CLEAN_LAB_20261027
CLOUDFLARE_DEPLOYMENT=f8efed02-0210-4d7e-a16d-f94d3a816a75
STATUS=BUILD_DEPLOY_60_PASS; BROWSER_GPU_PIXELS_NOT_VERIFIED

## Décision technique et cause

Le propriétaire constate que « luminance » n'a pas d'effet et que l'épaisseur R138 ne fait qu'opacifier. R138 ne contenait pas de curseur de luminance générale, seulement un réglage de lumière nucléaire et du liseré. Le mode d'épaisseur passait par l'absorption / la profondeur optique, y compris un facteur de transparence. Les tests précédents validaient les uniforms sans prouver un déplacement visible de bord.

Ajouter le paramètre `luminanceRatio` 0-2.5, par défaut 1.0, appliqué à toutes les radiances de la sphère *après* les arcs et *avant* tonemapping exponentiel. Garder `coreRatio` distinct, avec halo central renforcé.

La coque R139 est une surface annulaire projetée : `shellDepth=mix(.012,.31,shellThicknessRatio)`, `innerRadius=radius-shellDepth`, `wallMask=smoothstep(innerRadius-innerFeather,innerRadius+innerFeather,d)`. Elle révèle un bord interne mobile et ombré (`innerEdge`, `innerShadow`) pour une variation d'épaisseur visible, pas un simple changement de densité. Alpha devient `sphereAlpha*shellFade` : l'épaisseur n'intervient plus dans l'opacité. Il s'agit d'un rendu 2.5D procédural du volume, **pas** d'un maillage 3D/solidité physique réelle.

## Qualité et preuve

Branch isolated preview: https://f8efed02.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
Cloudflare API: deployment stages all SUCCESS, 60/60 Node tests PASS, 0 fail, static asset export PASS. Des tests vérifient le contour intérieur, l'absence de couplage alpha/épaisseur et les commandes individuelles simulées. La capture WebGL réelle sur téléphone et la validation visuelle propriétaire restent PENDING. L'outil Web public ne peut pas ouvrir le domaine Pages privé/isolé.

Visual Observer est géré dans un AUTRE CHAT : aucune mutation de son backend/PR ni contournement ACL. La production et main sont inchangées.
NEXT=Demander une validation visuelle du bord intérieur 0 vs 100% et luminance 0 vs 250%; si la paroi doit avoir une véritable géométrie 3D vue de côté, concevoir la prochaine évolution séparée.
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
