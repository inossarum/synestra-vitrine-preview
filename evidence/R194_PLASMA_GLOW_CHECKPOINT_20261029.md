# R194 — Plasma diffus contrôlé / checkpoint

MISSION_ID=SYN_LAB_R194_PLASMA_GLOW_20261029
OWNER=Studio Labo 3D
DATE=2026-10-29
REPO=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_LAB_R194_PLASMA_GLOW_20261029
BASE_R193=2e6e8faffb5ab68b77ee7aa0c747e52de7b31102
REFERENCE=SYN_SPHERE_ART_REFERENCE_20261029
REFERENCE_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ENGINE=Babylon.js 9.33.0
SCOPE=LAB_SPHERE_ONLY
ATLAS_CONTRACT=ATLAS_BABYLON_3D@0.1.0 CORE_SOCKET
PUBLIC_DEPLOYMENT=NONE
LOCAL_PREVIEW=http://127.0.0.1:19119/lab-babylon/index.html?labFrame=4.5
SOURCE_GATE=LIMITED (image binaire originale / Memory V1 non vérifiés dans ce turn)
TECHNICAL_STATUS=PASS
ARTISTIC_STATUS=PARTIAL

## Delta
- Ajout de 14 gaines diffuses autour de certaines trajectoires organiques, de largeur 3.8x et alpha réduit, sans nouvelle passe/scene/canvas.
- Profils : Économie 8 rubans, 0 gaine ; Équilibré 26 rubans, 10 gaines ; Ultra 28 rubans, 14 gaines. Six liaisons énergétiques au noyau conservées.
- Shader GPU animé longitudinal R193 conservé; 4 palettes du logo et 4 formes du noyau conservées; ossature résiduelle minimale.
- Coût : @babylonjs/core 9.33.0 déjà installé sur le PC, aucun nouvel achat, dépendance ou connexion réseau.
- Le nouveau composant de gaine est réutilisable dans le même module et peut être désactivé par budget sans déclencher d'allocations hors scène.

## E2E / signatures
- Navigateur Chrome réel sur Inos-Cerebros RTX3090 ANGLE D3D11, 1 canvas, erreurs WebGL=0.
- R194_GLOW_BROWSER.json status PASS, 17 entrées : 8 captures noyaux/résolutions, 6 budgets, 3 angles.
- Tests Node ciblés : 25 PASS, 0 FAIL, 0 SKIP (R190/R191/R192/R193/R194 et contrat Atlas).
- Vérification différentielle réelle vs R193 : 6.1529 % des pixels modifiés (1100), 6.1829 % (390). La différence traduit le voile, non une équivalence artistique.
- lab-babylon/src/plasma-ribbons.js SHA256 0055BC56BEF54D46DAB41F495F2960CB79090A7C6DD67C7368E5F1093D1A07A9
- lab-babylon/src/main.js SHA256 A6EC56692AE0EC9076432816372181A98FA97843C5AAC850B3D4ACF6FE15C08C
- lab-babylon/dist/babylon-lab.js SHA256 B9EA87264E40A9CF037809337E04E903AA171B41BC18ABCF56FA26DA9964743C
- lab-babylon/evidence/r194-glow-core0-1100.png SHA256 675893375F1D0E9340BDEEDF20F1E7CA60E2BEB812A1D61E44735AB50AB96066
- lab-babylon/evidence/r194-orbit-side-1100.png SHA256 84E0CD395B409680D6C45347616537653D5758068A822194E36CD0F6DA5C1299
- fps instantanés des captures ne constituent PAS un benchmark stable.

## Reprise et limites
- Le rendu actuel est plus organique, mais n'égale pas encore la densité et la cohésion des flux de la référence artistique; validation propriétaire finale PENDING.
- PNG original approuvé dans la conversation, pas encore stocké avec fichier binaire dans Git, ART_IMAGE_BINARY=MANQUANTE.
- Pas de téléphone physique ni GPU modeste testés, mobile=viewport simulé.
- NEXT R195 : accentuer la connexion entre nœuds et flux avec vraies branches volumétriques et pulsations d'intensité, comparer 360° et noyau/volume par rapport à la référence; qualification perf hardware modeste.
- Aucun changement de vitrine publique, Atlas, supervisor, main ou worktrees des autres agents.
- Rollback R193@2e6e8faffb5ab68b77ee7aa0c747e52de7b31102.
- Rebuild `npm run build` puis navigateur `node tests/sphere-glow-e2e.mjs`; tests `node --test tests/plasma-glow.test.mjs tests/plasma-light.test.mjs tests/plasma-ribbons.test.mjs tests/sphere-reference.test.mjs tests/sphere-regression.test.mjs tests/atlas-interop.test.mjs`.
