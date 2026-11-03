# R202.61 — Doctor/FAST : deux hypothèses de transparence interne rejetées
Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Références : commit historique 77b83b753f19b75026f8ef6cded1735b84016f2b ; source technique immuable dd2b0f1eecf3e2782d750df7e4dea811ed285a8d.
Branche locale isolée : task/SYN_LAB_R20261_MIST_OPACITY_EXP_20261104 ; worktree I:\_STUDIO_STAGING\SYN_LAB_R20261_MIST_OPACITY_EXP_20261104.
Baseline GPU : ZIP R202.61 SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.
La base technique R202.61 a déjà CI succès run 41719154760 + E2E GPU Windows 2 profils (checkpoint antérieur), réutilisés sans réexécution redondante.

## A — Opacité des 12 voiles visibles à qualité Balanced
Source main.js : mist.material.alpha=Math.min(.135,.050+.065*power)*.58, sans nouvelle géométrie.
FAILURE-FIRST : PID 152816, un échec attendu puis correctif ; tests ciblés 10/10 PASS PID 152828.
Suite Windows variante A : 182 tests / 179 PASS / 0 FAIL / 3 SKIP, build PASS, PID 147112.
A/B GPU Chrome RTX 3090 PID 152620, frame=18, power=145 %, viewport 1100x900, modes 0/2 :
Mode 0 : luma centrale -1.471478 ; gradient de contour +0.007789 ; contraste bleu-violet -2.174429 ; enveloppe -0.021881 ; changedPercent (seuil différence RGB >=18) 0.010297 %.
Mode 2 : luma centrale -1.879823 ; gradient -0.000982 ; contraste bleu-violet -2.473919.
Critère préfixé : variation visuelle >=0.12 % et gain gradient >=0.10 ; FAIL, pas de promotion.

## B — Largeur plutôt qu'opacité (seule alternative bornée)
Opacité restaurée à son expression d'origine ; largeur de voile coreMistWidth*1.65 -> *1.15.
FAILURE-FIRST : PID 144776, un échec attendu avant changement ; tests source/historiques actualisés en préservant tous leurs autres invariants.
Suite Windows variante B : 182 tests / 179 PASS / 0 FAIL / 3 SKIP, build PASS, PID 136852.
A/B GPU Chrome RTX 3090 PID 151448, deux modes :
Mode 0 : luma centrale -1.165592 ; gradient +0.092702 ; bleu-violet -1.647132 ; enveloppe -0.022199 ; changedPercent 0.418807 %.
Mode 2 : luma centrale -1.414600 ; gradient +0.063158 ; bleu-violet -1.837236 ; enveloppe -0.001709 ; changedPercent 0.339375 %.
Le critère gradient >=0.10 pour les deux modes échoue. Gain trop faible pour un écart de couleur et perte de diffusion perceptible ; FAIL, pas de promotion.
Évaluation visuelle : captures réellement ouvertes et examinées ; pas de référence artistique canonique binaire, donc aucune attestation de fidélité exacte.

## Preuves machine
Rapport structuré dans evidence/R20261_MIST_AB_FAILED_GATES_20261104.json.
Contrôle indépendant des PNG stockés dans le dossier local qa-mist-exp : PID 153948 ; 475875 pixels par image.
SHA PNG mode0 baseline=8c535556c58915e94f068237d288213245b1a36b7e02c27b46f0d6596cc34804 ; variante=31708b941c5f61e1350468f35ac21312f4c80fa7657f577900e28469f9b536c1.
SHA PNG mode2 baseline=39c1d65a24ab63f7c25719872dd6ae0418475345e4524870f4137907d2c2706c ; variante=1dc88ed83857d58b75c8d86342331bb6234de09d24a1df9b6fec521571dcd22f.
Reproductibilité A/B : r20261-mist-ab-qa.cjs conservé localement ; diff PNG : qa-mist-exp/compare-screens.mjs.
La précédente capture de la variante A a été réécrite lors de l'essai B ; seules les mesures A attestées par la sortie PID 152620 sont conservées.
Les erreurs JS/réseau de ces A/B en échec ne sont pas déclarées PASS : le runner s'arrête au critère pixel avant le contrôle terminal.

## Durabilité / rollback
Aucune mutation de main, PR stable, ZIP final ou source distante. Aucun push, merge, déploiement, PAYG.
Après rejet, les quatre fichiers sources, tests historiques et bundle ont été restaurés à l'état de HEAD 77b83b7. 'git diff --name-only' vide ; seules captures, scripts et probes restent en fichiers QA locaux non suivis.
L'image de référence acceptée (SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881) reste MANQUANTE.
FUNCTION_REPORT=PARTIAL ; VISUAL_ADJUSTMENT=REJECTED ; TECHNICAL_RELEASE_R20261=PASS_REUSED ; ART_SIGNOFF=PENDING.
