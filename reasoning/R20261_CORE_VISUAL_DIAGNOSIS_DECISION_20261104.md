# R202.61 — Décision de diagnostic, 2026-11-04
MISSION=labo3d_sphere_r20261 | SOURCE_HEAD=dd2b0f1eecf3e2782d750df7e4dea811ed285a8d

## Décision
Conserver la livraison R202.61 actuelle comme candidat technique validé. Refuser les deux réglages visuels expérimentaux : émissions/palette d'un noyau dont les écarts restent sous le seuil visuel fixé (>=18 de différence dans un canal RGB). Ne pas réinterpréter un test visuel négatif comme PASS au motif que les tests statiques sont verts.

## Cause et prochaine hypothèse
Le probe 7 profils natif RTX 3090 révèle une contribution importante des 18 voiles 'core plasma diffusion' : masquage -> coreMeanLuma 119.7194 vers 115.3436. Le masque change aussi l'aspect de surface et les courants ; aucune solution n'est qualifiée à partir de ce seul probe.
Prochaine hypothèse testable : un traitement plus sélectif de la transparence des voiles préserverait l'énergie périphérique en rendant les 80 faces plus lisibles. Tester en branche et échouer fermé si régresse l'aspect énergétique, les quatre modes, la puissance zéro, le masque, l'alpha ou les performances.

## Alternatives rejetées et risques
A : augmenter le terme d'émission des faces éclairées : delta +0.13 luma, imperceptible à seuil 18. Rejetée.
B : éclaircir la palette haute : delta +1.27 luma mais toujours 0 pixel au seuil 18. Rejetée.
Ne pas entreprendre de troisième variation de couleurs sans nouvelle hypothèse causale.
Image référence originale indisponible : pas de signature artistique ni de publication.
Aucun deuxième moteur, aucune nouvelle lumière, aucun déploiement, aucun achat.
Repli : source/ZIP actuels dd2b0f1e SHA-preserved, aucun code expérimental fusionné.

## Liens Evidence
evidence/R20261_CORE_VISUAL_FAILURE_FIRST_20261104.md
Rapport local QA : qa-core-focus-exp/R20261_OCCLUSION_PROBE.json SHA256 a5b7f04ea9bb028a8930d6c19df1f974a97be1fdfcb42b6e5df61dd3149188f0.
