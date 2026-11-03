# R202.59 — Validation supplémentaire de la version ZIP sur vue mobile (2026-11-03)

## Provenance
- Branche du livrable final : `task/SYN_LAB_R20259_FINAL_CANDIDATE_20261103`, HEAD initial `cb53959616a0dbbe50e19fe2d3abbc24eca33261`, PR #64.
- Fichier réellement exécuté : `qa-unpacked/index.html`, extrait de `release/Synestra_Sphere_R20259_Standalone.zip`. ZIP préalablement vérifié SHA256 `33140bda8eea1645cb8ea7ea416bf4610c85e40b76c0f6bca95aa5373e324765`.
- Test matériel NVIDIA RTX 3090 / Chrome ANGLE D3D11, **simulation de fenêtre mobile 390 x 844**, `isMobile=true`, `hasTouch=true`. **Pas un test sur téléphone physique.**
- Rapport JSON local `qa-mobile-390/R20259_MOBILE390_GPU_REPORT.json` SHA256 `272c5ad2d29bd39b28efde37aa96cb5f575e9c02bfb903b2acd875eba7eeba0c`.
- Capture native archivée : `evidence/R20259_MOBILE390_GPU.png`, SHA256 `6966a51bc8e78b9202b38da5752c0c01aabaf501c6d94cb0e0dde6c51fa9e2b8`.

## Contrôles effectués — PASS
- La page répond à 390 px de largeur réelle, le document a `scrollWidth=390` (aucun débordement horizontal), le canvas est affiché en `364 x 379,8 px`, les contrôles restent présents.
- Transition des courants extérieurs (mode 0→1) : écart des positions `0,11667 → 1,93479 → 6,27135`, progression continue ; pas de saut initial.
- Noyau intérieur, deux changements rapides 1→2→3, extinction de la puissance, préférence `reduced-motion`, 28 rubans, 6 nœuds, noyau à 80 triangles et canvas unique : PASS.
- Aucune erreur JavaScript signalée ; test exit 0 ; navigateur refermé proprement. **4 scénarios** vérifiés, aucune régression nouvelle identifiée.
- Les tests complets source, l'E2E bureau GPU et l'E2E de l'archive ZIP ont été validés dans le checkpoint R202.59 précédent ; non répétés sans delta de code.

## Référence artistique — état exact
- Manifeste canonique local `reference/SPHERE_CANONICAL_20261029.md` vérifié. Le propriétaire a accepté le **concept de référence** le 29 octobre, non le rendu R202.59.
- Image canonique `sphère_d_énergie_néon_cosmique.png`, 1254 × 1254, SHA256 `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881`.
- Recherche SHA ciblée sur **369 images suivies** dans les dossiers `assets/`, `lab-babylon/` et `evidence/` du dépôt : **0 correspondance** ; recherche ChatGPT Files du nom exact : aucune image d'origine identifiée. Le manifeste confirme que son binaire n'avait pas été copié dans Git.
- Le rendu R202.59 est **TECHNICAL_RELEASE=VERIFIED**, mais `ART_SIGNOFF=PENDING` : pas de comparaison directe à l'image originale et pas d'approbation de la version finale par le propriétaire.

## Contrôle de portée
Ce commit doit ajouter **uniquement** cette pièce justificative et sa capture mobile. Aucun changement du build, de l'archive autonome, des autorisations, des coûts, du runtime, des autres PR ni de main.
`MOBILE_GPU_SIMULATION=PASS | ZIP_REUSED=SHA_VERIFIED | ART_REFERENCE_BINARY=MANQUANTE | TECHNICAL_RELEASE=VERIFIED | FUNCTION_REPORT=PARTIAL`
