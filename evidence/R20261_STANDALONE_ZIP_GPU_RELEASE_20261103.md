# HPSYN — R202.61 autonome : ZIP final vérifié sur deux moteurs graphiques

Date : 2026-11-03
Dépôt : `inossarum/synestra-vitrine-preview`
Branche : `task/SYN_LAB_R20261_WHITE_VIOLET_CORE_20261103`
Base vérifiée avant mutation : `ee86daa5493a9afcf364a0af0d8fd6beb74bfa05`.
R202.60 stable : PR #64, `6b5e0f761e84b3c621d2c863fe7ba7d5e466898c` et CI réussie `41701136633`. Aucun changement sur cette branche.

## Livrable nouveau

- `release/Synestra_Sphere_R20261_Standalone.zip` : **1 672 195 octets**, SHA256 **`e29dc189e1fb526e8001a5863682915df2a93c04bed31133bb27b5c26ed96b6f`**.
- Recréation déterministe avec `python release/build_zip_R20261.py [output.zip]`, bibliothèque standard uniquement, SHA256 précédent et actuel épinglés. **Deux créations indépendantes de l'archive ont produit exactement le même SHA256**, fichiers octet pour octet identiques.
- Base `release/Synestra_Sphere_R20260_Standalone.zip` au SHA256 **`05abdc8bb1e54a33024ca5bafa5c9a080c1811f0334255aa2c05ccbab21e2ba7`**, inchangée.
- Six ressources : seul `dist/babylon-lab.js` et la mention R202.59 devenue R202.61 dans `README.txt` diffèrent ; **quatre autres ressources identiques**.
- Bundle Babylon R202.61 SHA256 **`93301d7b225bc52e1a46b00937269941a17b050d58dd7fc20813eaff36779f5d`**, vérifié dans le ZIP extrait et contre le bundle du commit R202.61.
- README corrigé avant publication : `SYNESTRA - SPHERE ENERGETIQUE 3D - R202.61`.
- Démarrage normal `index.html` en double-clic Chrome/Edge ; `START_SPHERE.cmd` est une option locale exigeant Python 3 si les scripts `file://` sont bloqués.

## Tests réels sur le ZIP définitif, non sur les seules sources

- Archive finale extraite dans un dossier isolé après vérification SHA. Les six fichiers sont présents.
- Chrome RTX 3090 / ANGLE D3D11 : **PASS**, Auto → Balanced.
- Chrome SwiftShader / Vulkan CPU : **PASS**, Auto → Economy.
- Dans **chaque** profil : les quatre formes 1→2→3→0, fin des transitions, 80 triangles du noyau, 80 du masque, 28 courants, six nœuds, un canvas, extinction de la profondeur du noyau à puissance zéro : **PASS**.
- **0 erreur JavaScript, 0 requête HTTP(S)**, deux fermetures du navigateur propres, processus Windows **77896**, sortie **0**.
- Rapport brut `evidence/R20261_ZIP_NATIVE_GPU_E2E_REPORT.json`, SHA256 `f968f1d531a88901506d2d071b8d7ee7e96f966c11f90f2b142e7e9b98b72c83`.
- Captures GPU du ZIP final :
  - `evidence/R20261_ZIP_GPU_swiftshader.png`, SHA256 `ac6a1c9e461fe4d0410d7085138ce484b53f53a8c4765e31bf9ee948d1de0604`.
  - `evidence/R20261_ZIP_GPU_rtx3090.png`, SHA256 `a8ca1375d9fc0a339c8f24480d3ff487983d9add32631361fc7e2f2ce7cb01b1`.
- R202.61 avait déjà passé **180 tests (177 PASS, 0 FAIL, 3 SKIP)** et le A/B GPU artistique avant ce packaging ; aucun source/shader n'a été modifié ici.

## Limites et intégrité des statuts

- **HTML unique R202.61 : NON EXÉCUTÉ / BLOQUÉ**. La copie du constructeur `build_onefile_R20261.py` a été créée en local mais sa commande d'exécution a reçu un **refus par les contrôles de sécurité du connecteur**. Ce refus n'a pas été contourné. **Ne pas considérer la présence du constructeur comme preuve de livraison HTML**. Il n'est pas inclus dans ce commit de release ZIP.
- **CI distante R202.61 : NON EXÉCUTÉE** à ce checkpoint. La CI verte GitHub concerne uniquement R202.60.
- **ART_SIGNOFF=PENDING** : acceptation esthétique du propriétaire toujours requise, image originale manquante. Les mesures A/B améliorées ne remplacent pas son approbation.
- Aucune fusion, déploiement public, dépense, modification de l'application stable ou de la PR #64.
- Retour arrière : conserver R202.60 ZIP et HTML préexistants, SHA attestés. Le précédent ZIP généré R202.61 (avant correction du README) a été conservé uniquement dans la QA locale pour investigation.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | ZIP_R20261=VERIFIED | ZIP_GPU=RTX3090_PASS_SWIFTSHADER_PASS | ZIP_REPRODUCIBLE=PASS | ONEFILE_R20261=BLOCKED | CI_R20261=NOT_RUN | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
