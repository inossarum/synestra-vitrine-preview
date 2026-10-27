# SiteForge R140 — corriger la coupure de la face de la sphère
MISSION_ID=SYN_SITEFORGE_R140_SURFACE_CONTINUITY_FIX_20261027
OWNER=Inos
DATE=2026-10-27
SOURCE_COMMIT=f79b5c39518bc4549e5712cbe2a1012e8aab598a
EVIDENCE=evidence/SITEFORGE_R140_SURFACE_CONTINUITY_20261027.json
STATUS=SOURCE_FIX_AND_61_TESTS_PASS; PAGES_DEPLOY_FINAL_STATUS_UNKNOWN; BROWSER_VISUAL_E2E_PENDING

## Observation et correction causale
Le propriétaire a fourni une capture montrant une séparation apparente de la sphère sur sa propre surface et **non** au niveau de son anneau orbital. Capture SHA256 a97144296b9d88945ea1849369013b164df8880fc907c8ec0cf21132871050bc (pas de réexport des pixels privés).

Deux éléments de R139 contribuaient à l'effet :
- Normale visuelle `n` issue de `turn3(...)` utilisée également pour l'éclairage directionnel, les reflets et le rim : la rotation du matériau réorientait l'éclairage et pouvait dessiner une séparation de luminosité sur la face.
- Faux disque intérieur projeté via `wallMask`, `innerRadius`, `innerEdge` et `innerShadow`, recouvrant la surface de face.

R140 conserve la normale frontale `geomN` stable pour toutes les lois de lumière et de vue. La rotation ne change que les coordonnées de texture procédurale `n`. L'épaisseur ne trace plus un disque : `grazing=1.-geomN.z`, `shellStart=mix(.98,.32,thickness)`, `shellRim=smoothstep(...,grazing)`, dégradé limité au pourtour. Pour épaisseur à 0/45/100 %, aucun masque sur le centre ou sur la majeure partie frontale, mais une bande plus large sur le bord lorsque le réglage augmente. Diffusion, opacité, luminance, huit éclairs et réglages couleur restent distincts.

Correctif de runtime connexe : `ResizeObserver(()=>request())` appelait un nom inexistant depuis R138; devient `ResizeObserver(()=>scheduleDraw())`.

## Vérification
- Premier Cloudflare build à commit 4a6d433d : 60 tests PASS, 1 FAIL dû à assertion historique d'éclairage obsolète. Cause identifiée, assertion mise à jour.
- Deuxième build Cloudflare `00fc92df-12d9-43de-8991-c995c237d617` commit `f79b5c39518bc4549e5712cbe2a1012e8aab598a` : 61 tests PASS, 0 FAIL, export statique PASS. Tests R140 incluent absence de bande dans la face, indépendance de l'éclairage et déplacement graduel au seul pourtour.
- **Pas encore de certification HTTP 200 ni d'E2E WebGL image GPU**, et la dernière lecture de statut final du déploiement a été bloquée par les contrôles de sécurité de l'outil. Ne pas contourner. URL attendue : https://00fc92df.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
- Pour DONE final : lecture autorisée du statut déploiement, HTTP 200 + JS 200, image réelle Chrome téléphone, confirmation absence de « deux hémisphères » par propriétaire / Visual Observer (autre chat).

## Frontières et récupération
Git branche isolée, production/main inchangées. Visual Observer maintenu dans un chantier séparé sans dépendance Bridge, pas d'appel payant. Retour à R139 via précédent déploiement `f8efed02-0210-4d7e-a16d-f94d3a816a75` si régression. 
SOURCE_GATE=LIMITED
HOOKS_STATUS=UNKNOWN
FUNCTION_REPORT=PARTIAL
