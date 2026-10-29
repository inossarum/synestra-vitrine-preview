# Synestra Labo 3D R197 — distribution sphérique de plasma

MISSION_ID=SYN_LAB_R197_SHELL_DISTRIBUTION_20261029
DATE=2026-10-29
BASE_COMMIT=2ee6097ffeebdb2699f9a9222c884f686aa862b1
BRANCH=task/SYN_LAB_R197_SHELL_COVERAGE_20261029
CANONICAL=reference/SPHERE_CANONICAL_20261029.md@93e6802a3c4e894235aabcd45f1e2ace1e0fba82
ORIGINAL_ART_IMAGE_SHA256=584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881
ENGINE=Babylon.js@9.33.0
ATLAS=ATLAS_BABYLON_3D@0.1.0; CORE_SOCKET intact
PUBLIC_SITE=UNCHANGED; MAIN=UNCHANGED; PAID_ACTIONS=NONE
PREVIEW=localhost:19122/lab-babylon/index.html?labFrame=4.5
TECHNICAL_STATUS=PASS
ARTISTIC_STATUS=PARTIAL

## Delta effectivement exécuté
- 28 rubans existants repositionnés par ancres de Fibonacci/GOLDEN_ANGLE via shell-coverage.js ; le nombre de meshes, shaders, canvas et moteurs n'augmente pas.
- Les 8 premiers flux occupent 7/8 octants, dans les deux hémisphères ; les 26/28 flux couvrent les 8 octants.
- Le reste des courbes reste organique et animé ; les quatre couleurs violet, cyan, bleu foncé et vert et les 4 modes du noyau sont conservés.
- Le noyau est explicitement différé à la revue finale : src/main.js, src/reference-contract.js et src/node-branches.js non modifiés (git diff vide).
- Correction uniquement de l'étiquette de version dans index.html de R196 en R197.

## Tests et preuve runtime
- Desktop Commander sur Inos-Cerebros, NVIDIA RTX 3090, Chrome, WebGL2 D3D11, serveur loopback : HTTP 200.
- npm run build PASS; bundle 7.1 Mo.
- Suite Node tests ciblée : 41/41 PASS, 0 FAIL, 0 SKIP ; inclut les 5 tests de couverture, le contrat Atlas local et les régressions antérieures.
- Test navigateur réel: lab-babylon/evidence/R197_SHELL_BROWSER.json status PASS.
- 8 captures PNG, 4 modes x 1100/390px ; profils quality économie/balanced/ultra x 2 ; 3 captures caméra front/side/above ; 2 négatifs extinction.
- gl.getError()=0 ; canvas=1, engine Babylon v9.33, 28 rubans, 14 gaines, 12 fourches et 6 photons conservés.
- Comparateur R196/R197: lab-babylon/evidence/R197_SHELL_METRICS.json.
  - bureau 1100 : 16.3371 % pixels changés ; mobile viewport 390 : 16.7014 %.
  - front/latéral : 19.2034 % ; front/dessus : 18.9765 %.
  - mesures de différence, non de performance ni d'équivalence esthétique.
- Captures: lab-babylon/evidence/r197-shell-core0-1100.png, r197-shell-core0-390.png, r197-orbit-side-1100.png.

## Signatures SHA256 (état local avant git commit)
- src/shell-coverage.js F9D145001A2F3930B672A0206704B758CE49A1AD4847C0FABE9B40E12903E584
- src/plasma-ribbons.js 2167446CC25FA1E12ADCEC90F9D9741D0337D515CC09E41E2D81DF135DFFD133
- dist/babylon-lab.js 1F675A383F26494E8F3A5E1E88D0CFE8F169B4C0AFFC4C99A2AAD9700296B8B6
- evidence/r197-shell-core0-1100.png 07D53F36289326FC44C2249A95FFCD652CE8F7CB42698E5F434F024DEF41AE75
- evidence/R197_SHELL_METRICS.json BEE9C6B183578D06490370C7492A9B1F6E22005C844A5D9C0EE44EF3E7AAA011

## Limites et reprise
- Fidélité artistique finale encore PARTIAL : référence montre des courants plus cohésifs et un noyau à revoir plus tard. Les octants mesurent la géométrie, pas la qualité artistique.
- R197 original reference PNG est dans un paquet local préparatoire, pas comme binaire GitHub; source canonical SHA existe.
- Pas de téléphone physique/GPU modeste testé ; affichage 390px = viewport simulé, FPS instantané non benchmark.
- Aucun changement de vitrine, du noyau, du worktree Atlas, de main, de Supervisor ou de sécurité.
- Rollback immédiat: checkout R196 2ee6097ffeebdb2699f9a9222c884f686aa862b1.
- NEXT après publication R197 : R198 optimiser la cohésion des filaments, relire le noyau en fin de chantier et évaluer performances GPU modeste.
