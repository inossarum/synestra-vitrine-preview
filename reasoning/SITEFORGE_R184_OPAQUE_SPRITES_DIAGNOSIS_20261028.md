# SiteForge R184 — Correction des carrés opaques des éclats 3D

## Problème utilisateur et critère d'acceptation
L'image fournie par l'utilisateur montre un grand nombre de blocs cyan/violet carrés (croix et diagonales internes) autour du plasma. Ce rendu masque la sphère énergétique et ne correspond pas à des particules crédibles. Critère : plus de silhouette de carte carrée aux contours, fragments polygonaux/étincelles lumineuses mais discrets, effets existants et personnalisation maintenus.

## Cause identifiée par inspection du shader
Le shader R183 calcule `silhouette` et `alpha` mais retourne `vec4(lightCol,alpha)` alors que le programme de composition réalise `gl.blendFunc(gl.ONE,gl.ONE)`. Le facteur alpha n'entre donc **pas** dans l'intensité RGB effectivement ajoutée à la scène. Les pixels où la silhouette est transparente continuent d'éclairer les coins du `gl_PointCoord` carré. La géométrie du polygone historique touche aussi les limites du sprite horizontal, amplifiant le défaut. Les valeurs initiales de 46 éclats, 100 % taille et 100 % luminosité renforcent la confusion.

## Correctif technique
- `if(alpha<.012)discard` puis `gl_FragColor=vec4(lightCol*alpha,alpha)` : émission prémultipliée pour mélange additif `ONE/ONE`, correction de la cause racine.
- Contour poli dans le carré raster : `max(lateral*1.13+axial*.48,axial*.98)` et `smoothstep(.67,.85,...)` pour ne plus afficher de bordures carrées même en cristaux grands.
- Ajustement du `gl_PointSize` et des valeurs initiales : 30 éclats, taille 60 %, luminosité 65 %. Restauration et import legacy utilisent les nouvelles valeurs par défaut uniquement en l'absence d'options explicites. Les anciens exports R179–R183 avec options conservent leurs valeurs.
- Aucune suppression de technologie. Dix contrôles d'éclats, 18 contrôles plasma, six matériaux, trois styles, phase de rotation commune, Auto performance et JSON v1 inchangés.

## Qualité
160/160 tests Node et 49 fichiers du build statique PASS. Tests ciblés du shader et de la préservation du contrat 4/4 PASS. Capture Chrome locale R184 comparée qualitativement à l'image utilisateur : petites lueurs sans carrés. Captures de cristaux à taille élevée : polygones découpés et reflets, pas de rectangle plein. E2E Chrome complet et public PENDING au premier checkpoint.

## Publication et rollback
Branche source `task/SYN_SITEFORGE_R184_SPRITE_ALPHA_FIX_20261028`, base R183 `f64b3786ac629e2a035a234606cb189f5ea95250`. Dépôt de preview isolé `inossarum/synestra-siteforge-r176-lab` avec nouveau `r184.html`, sans toucher à R183 ni à `main`. Rollback : retrait de `r184.html`, retour immédiat R183.

## Points ouverts
Validation esthétique propriétaire encore ouverte. Tests Chrome URL publique et mesures physiques mobile non attestés tant qu'ils ne sont pas réellement exécutés.

## Qualification Chrome publique

- Page versionnée R184 : https://inossarum.github.io/synestra-siteforge-r176-lab/r184.html ; GitHub Pages commit `66a76628ed1aee372272730822a72dddf776492a`, HTTP 200 `built`, sans Cloudflare Access.
- Chrome réel sur **l'URL publique** : E2E exit 0, 6/6 matériaux, mobile 390px, orbite souris/tactile complète, rotation partagée, export/import JSON v1, 18 contrôles plasma et 10 motes, WebGL error 0.
- Correction de la carte carrée : avant, `vec4(lightCol,alpha)` sous `blendFunc(ONE,ONE)` ajoutait de la lumière aux pixels transparent du point sprite. Après, `discard` et `vec4(lightCol*alpha,alpha)` éliminent l'émission hors masque, les cristaux ont une enveloppe délimitée, et les valeurs initiales ont été adoucies. Capture Chrome comparée visuellement à la capture utilisateur.
- Capture par défaut : 30 éclats, taille 60 %, luminosité 65 %, les éclats restent détectables, 2 647 pixels de différence dans la fenêtre de test de 880 000 pixels lors de leur activation.
- Captures de QA R184 versionnées, sans modifier la capture historique R182. 160/160 tests Node PASS, export statique 49 fichiers PASS.
- Evidence finale `evidence/SITEFORGE_R184_SPRITE_ALPHA_FIX_20261028.json` blob `ed78d32ba18df3dd668d6046dbcd0d1f36a9f4ac`.
- Aucun merge `main`, aucun changement Access, R183 et ses captures maintenus. Acceptation esthétique propriétaire toujours PENDING.
