# Synestra Labo 3D R192 — Rubans plasma organiques / checkpoint

MISSION_ID=SYN_LAB_R192_ORGANIC_PLASMA_20261029
OWNER=Studio / Labo 3D, branche isolée
DATE=2026-10-29
REPO=inossarum/synestra-vitrine-preview
BRANCH=task/SYN_LAB_R192_ORGANIC_PLASMA_20261029
BASE_REF=task/SYN_LAB_R191_SPHERE_REFERENCE_20261029
BASE_SHA=c1f7cc6c77a7487a3ffe6124c2fe4a76dbcf53a7
ART_REF=reference/SPHERE_CANONICAL_20261029.md@c1f7cc6
ART_REF_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ENGINE=Babylon.js@9.33.0
ATLAS_CONTRACT=ATLAS_BABYLON_3D@0.1.0 / CORE_SOCKET
PREVIEW=http://127.0.0.1:19117/lab-babylon/index.html?labFrame=4.5
DEPLOYMENT=LOCAL_ONLY
PUBLIC_SITE=UNCHANGED
ART_FIDELITY=PARTIAL

## Écarts hérités et correctif
- R191 : treillis de 40 tubes réguliers et 14 méridiens, couleurs du logo et noyau conformes mais surface filaire trop uniforme.
- R192 : 28 rubans 3D sur la sphère, avec trajectoires courbes non uniformes, largeur effilée, transparence alpha variable et gradient central ; maintient 6 tubes structuraux et 3 méridiens pour une ossature légère.
- Six flux-rubans additionnels centre->nœuds, montés sur la même hiérarchie LAB_SPHERE_ROOT, uniquement si la puissance du noyau est positive.
- Un seul Engine, Scene, Canvas, aucun réseau de textures, aucun second broker ni moteur; pas de changement d'Atlas, vitrine ou main.
- Profil Économie=8 rubans + 3 connexions, Équilibré=22 rubans + 6 connexions, Ultra=28 + 6 ; changement immédiat même à horloge fixe.
- Rubans procéduraux animés actualisés au maximum à environ 15 Hz; animation cohérente 3D de points sous caméra orbitale. Le rendu visuel est amélioré, pas encore reproduction artistique de la référence.

## Sources et signatures locales SHA256 au dernier build
- lab-babylon/src/plasma-ribbons.js : AA17EFB5F0457955398C0B49557AF181B42C9F97103FC24E2EB71877B96C9EA1
- lab-babylon/src/main.js : 458F6A718470F2A55E6069D436965DA36DB6E997FF2F21AEF70762459DEAD9C5
- lab-babylon/dist/babylon-lab.js : 8E08662409EEF460811C3ECE20BCE9F4175DBCD694FB3A44441F759B409FFD1F
- screenshot native r192-organic-core0-1100.png : E5B60A3EA4784346C336A801F41C481BE788A64248890649DF1EAE9C7143F930
- screenshot native r192-orbit-side-1100.png : 7884424C6C2712CBC13AC2582E889839049F77881B7C321F7F3070E60C4037B7

## Tests et preuves native
- Chrome réel sur Inos-Cerebros RTX3090 (ANGLE D3D11), serveur Python 127.0.0.1:19117.
- 4 modes de noyau × 2 viewports (1100px et 390px simulé)=8 captures réelles, WebGL error=0, Babylon ready=true, canvas=1, metadata 28 rubans + 6 connexions.
- Tests de 3 profils × 2 viewports = 6 contrôles GPU PASS (8/22/28 rubans), y compris changement sans avancement de l'horloge.
- Trois caméras front, latéral et dessus = 3 captures comparatives ; différence spatiale mesurée (preuve de volume, pas bitmap).
- Rapport exact lab-babylon/evidence/R192_ORGANIC_BROWSER.json : status PASS, 17 entrées (8 modes, 6 budgets, 3 orbites).
- Node test natif : 17 PASS, 0 FAIL, 0 SKIP (4 suites), dont Atlas propriétaire source consultée au SHA local, géométrie 3D, alpha, conversion puissance=0 et budget des 6 connexions.
- Contrôles de palette hérités R191 préservés et vérifiés sur pixels du rendu R191 ; couleurs R192 visuellement présentes dans les captures, qualification colorimétrique complète encore à préciser.
- Le premier test navigateur R192 a signalé une assertion historique de 10 tubes ; celle-ci a été adaptée au nouveau rendu (tubes + rubans) et le test réel a repassé.
- Git diff --check PASS (hors avertissement normal de normalisation CRLF du bundle tiers).

## Limites, risques et NEXT
- L'image artistique d'origine reste attachée à la conversation, pas de binaire canonique archivé dans Git : ART_IMAGE_BINARY=MANQUANTE.
- Le rendu R192 a encore des courbes trop lisibles individuellement par rapport à la référence très fluide : ART_FIDELITY=PARTIAL; ne pas déclarer DONE de l'image de référence.
- Performance mesurée uniquement à l'instant des captures sur RTX3090, pas benchmark GPU modeste; mobile=émulation de viewport, pas téléphone physique.
- NEXT R193 : épaisseur variable plus expressive, brins subdivisés et voile plasma volumétrique contrôlé, gradients au nœud, mesures GPU chronométrées et revue A/B contre référence sur angle similaire.
- Aucun merge, push main, déploiement, coût PAYG ou modification de la sécurité. Rollback = R191 SHA c1f7cc6.
- Reprise : vérifier branche et SHA remote puis reconstruire avec npm run build, navigateur via node tests/sphere-organic-e2e.mjs et node --test tests/plasma-ribbons.test.mjs tests/sphere-reference.test.mjs tests/sphere-regression.test.mjs tests/atlas-interop.test.mjs.
