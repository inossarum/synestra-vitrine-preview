# HPSYN — R202.62 | Zoom tactile et commandes mobiles accessibles

Date : 2026-11-03
Source : `inossarum/synestra-vitrine-preview` @ `dd2b0f1eecf3e2782d750df7e4dea811ed285a8d`.
Isolation : worktree `I:\\_STUDIO_STAGING\\SYN_LAB_R20262_MOBILE_TOUCH_QA_20261103`, branche `task/SYN_LAB_R20262_MOBILE_TOUCH_QA_20261103`.
R202.61 stable inchangée : `release/Synestra_Sphere_R20261_Standalone.zip`, SHA256 `5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13`, CI GitHub Actions #41719154760 SUCCESS.

## Défauts reproductibles, avant correction

1. `qa-offline-linkfix/r20261-mobile-ui-native-qa.cjs`, PID 71860 : navigateurs sur écrans tactiles 320, 375 et 768 px, 28 rubans, six nœuds, zéro débordement ou erreur JS, mais texte uniquement `Glisser : orbite · Molette : zoom` : **FAIL_TOUCH_GUIDANCE**.
2. Épreuve multi-touch native Chromium CDP (PID 55264 et 95532) : 3 `pointerdown`, `touchstart`, `pointermove`, `touchmove` réellement reçus, glissement un doigt changeant l'alpha de la caméra, rayon restant 4,8 au geste pincé simulé. Ce résultat ne démontre **pas** un défaut du pincement sur tous les téléphones : l'émulation et les seuils Babylon peuvent différer d'un matériel réel.
3. Contrat failure-first `r20262-mobile-camera-distance.test.mjs` : deux tests **RED** avant ajout du curseur.
4. Premier ZIP R202.62, test Chrome GPU à 320×568 PID 111448 : le nouveau curseur situé à `y=283,5` était **masqué par `#renderCanvas`** dans la vue sticky (élément détecté sous le doigt). **Échec explicite `TOUCH_ZOOM_OCCLUDED`**, corrigé avant promotion.

## Correction sûre et fonctionnelle

- `lab-babylon/index.html` : ajoute le curseur accessible **Distance caméra**, plage 2,8–7,0 (valeurs 280–700, valeur initiale 4,8) ; aide visible `Glisser : orbite · Zoom : curseur`, libellé ARIA inclus.
- `lab-babylon/src/main.js` : le curseur modifie **uniquement `scene.activeCamera.radius`** de l'ArcRotateCamera existante et actualise la valeur affichée ; Réinitialiser restaure précisément **4,8**. Aucun autre moteur, scène, canvas, shader, mesh ou lumière.
- `lab-babylon/style.css` : en largeur <= 850 px, `.viewport` devient `position:relative` au lieu de `sticky` pour ne plus recouvrir les réglages sur petits écrans.
- `release/build_zip_R20262.py` : constructeur SHA-pinné à partir du ZIP R202.61, sans Internet, sans écrasement, vérification EOL sur HTML/CSS, comparaison des six ressources.

## Tests et preuves

- Tests ciblés : 3/3 PASS (curseur, réinitialisation, non-superposition mobile).
- Build Babylon offline esbuild : **PASS**, bundle SHA256 `05f453c255e986d0c03443ecbefcdc7957147328a4140bb57b4284d4e358db27`.
- Suite complète après correction CSS : **183 total / 180 PASS / 0 FAIL / 3 SKIP**, sortie 0, PID **111028**.
- ZIP autonome **1 672 532 octets**, SHA256 `03ab7552a8ffd6413206f18c3c0f02e44fe593c7869f6a514aa0005e89ca5a37`. Quatre ressources modifiées (`index.html`, `style.css`, `dist/babylon-lab.js`, `README.txt`) ; deux inchangées. SHA ancien ZIP préservé. Le second build ZIP a reproduit le même SHA256 **octet pour octet**. `verify_r20261_offline_links.py` sur le nouveau ZIP : **PASS**.
- E2E navigateur **depuis le ZIP final fraîchement extrait**, code 0, PID **97108**, 4 profils :
  - Chrome RTX 3090 : **320×568, 375×812, 768×1024** — PASS.
  - Chrome SwiftShader : **375×812** — PASS.
  - Dans les quatre cas : curseur manipulé par de **vrais événements tactiles émulés**, rayon rapproché environ **3,1 à 3,2**, éloigné **6,6 à 6,7**, Réinitialiser **4,8** ; aucun débordement horizontal, **0 erreur JS, 0 requête externe**, 28 courants, 6 nœuds.
  - Rapport `evidence/R20262_MOBILE_TOUCH_GPU_REPORT.json`, SHA256 `68d67141560abbc1a62c69358b1545aa3c0199f49e054caa27d6569f11cd4e0d`.
  - Capture 320 px RTX : `evidence/R20262_MOBILE_RTX3090_320.png`, SHA256 `dab7e8112d32d4c6e4edba6d4e42bb1f44b8fbee0942ced528dde3a2e6296cd8`.
  - Capture 375 px SwiftShader : `evidence/R20262_MOBILE_SWIFTSHADER_375.png`, SHA256 `21a17308f007cc85a558b7d255fa87cf27c3237ec7d0d596af0f7378abee5a6b`.
  - QA script natif exécuté localement : `r20262-mobile-touch-e2e.cjs` ; exécution attestée uniquement sur le PC, non en CI Linux.

## Sécurité, durabilité et limites

- La CI `r20262-mobile-standalone-integrity.yml` contrôle les tests, le build, les SHA, l'archive reproductible, les liens offline et la preuve native existante sur runner standard de dépôt public ; elle **n'exécute pas de GPU RTX en CI**.
- Worktree/branche R202.62 séparés ; **aucun merge vers main**, déploiement public, coût, migration ou modification du stable R202.61/PR #64.
- Le fichier d'image artistique du 2026-10-29 reste indisponible au SHA canonique `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881` ; `ART_SIGNOFF=PENDING`. Les tests tactiles ne le remplacent pas.
- Le HTML unique R202.61 non livré n'est pas prétendu livré ici ; **le ZIP R202.62 est l'unique nouveau livrable**.
- Un test Chromium mobile simulé n'est pas une certification sur téléphone physique ni un audit WCAG exhaustif.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | MOBILE_ZOOM=PASS | MOBILE_OCCLUSION=FIXED | RTX3090=PASS | SWIFTSHADER=PASS | ZIP_SHA=VERIFIED | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
