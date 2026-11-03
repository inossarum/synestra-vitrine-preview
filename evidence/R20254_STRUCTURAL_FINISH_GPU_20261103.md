# Synestra Labo 3D — R202.54 — structure et mouvement de la sphère
Date : 2026-11-03
Base immuable : inossarum/synestra-vitrine-preview PR #58 HEAD `290879c45cf7f2186e823aa02125297b3617dbf8`
Branche dédiée : `task/SYN_LAB_R20254_STRUCTURE_CHATGPT_20261103`

## Changement
- Le noeud `LAB_SPHERE_ROOT` anime la sphère entière sur les trois axes avec une variation bornée de volume.
- Le noyau, le masque invisible de ses 80 triangles, les 28 courants, les 6 points énergétiques, le plasma et les branches restent attachés à la même hiérarchie.
- Les rotations/échelles locales du masque suivent exactement celles du noyau ; la silhouette stencil n'est pas découplée.
- Mouvement déterministe en mode capture et figé avec `prefers-reduced-motion`.
- Aucun changement des shaders, de la lumière, des couleurs, des 28 rails ou du nombre de scènes/canvas ; aucune fusion ni aucun déploiement.

## Vérifications réellement exécutées sur Inos-Cerebros
- Test initial RED : module de mouvement absent, `ERR_MODULE_NOT_FOUND`.
- Correction de l'amplitude latérale après failure-first ; tests ciblés du mouvement/stencil/courants : **10 PASS**.
- `npm.cmd ci --offline` : code 0, 3 paquets, 0 vulnérabilité reportée (avertissement esbuild `allow-scripts`).
- `npm.cmd run build` : code 0, esbuild 7.1 Mo. SHA256 bundle `23b0db7ad5590155bc40ef91e883a4e5c78019057d5261e320371cd7c3e9bb4c`.
- `npm.cmd test` : **158 tests / 155 PASS / 0 FAIL / 3 SKIP**, code 0.
- Chrome matériel D3D11 : `NVIDIA GeForce RTX 3090`, WebGL2, 80 triangles du noyau, 80 triangles du masque, 1 canvas, 28 courants, 0 erreur page, captures natives frames 0/18/40, vérification d'animation effective et arrêt propre du navigateur, code 0.
- Déplacement yaw enregistré : 0 → 1.26 → 2.8 rad sur les trois frames figées.
- Rapport GPU local : `qa-structure/R20254_STRUCTURE_NATIVE_GPU_REPORT.json` SHA256 `8761376ea166e8793ec5ab520a2bae06e95b253f1e7ace8726acdcf30614340f`.
- Captures PNG correspondantes conservées localement dans `qa-structure/`, non poussées.

## Limites
- Revue artistique du rendu final en attente ; ne pas déclarer ART_SIGNOFF ou déploiement PASS.
- La prévisualisation et l'épreuve GPU sont locales au PC propriétaire, non publiques.
- Aucun contournement du refus historique lié au transfert R202.50 → R202.52.

`SKILLS_APPLIED=git-worktrees,reasoning-evidence,failure-first | SOURCE_AND_GPU_QA=PASS | FREE_ONLY | NO_MAIN_CHANGE | ART_SIGNOFF=PENDING`
