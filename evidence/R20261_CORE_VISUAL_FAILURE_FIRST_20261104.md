# R202.61 — Diagnostic GPU différentiel et refus de deux corrections insuffisantes
Date : 2026-11-04 | Mission : labo3d_sphere_r20261 | Owner : propriétaire Synestra
Exécution : ChatGPT, depuis le PC Windows Inos-Cerebros | Statut : DIAGNOSTIC_PASS / CHANGE_REJECTED / ART_PENDING

## Autorité et frontière
Dépôt : inossarum/synestra-vitrine-preview
Base immuable : dd2b0f1eecf3e2782d750df7e4dea811ed285a8d
Branche de diagnostic locale isolée : task/SYN_LAB_R20261_CORE_WHITE_FOCUS_EXP_20261104
Aucune édition publiée, aucun push, aucun merge, aucun déploiement.
Le ZIP R202.61 validé reste SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.
CI originale : GitHub Actions run 41719154760, SUCCESS. Windows local base : 177 PASS / 0 FAIL / 3 SKIP ; GPU final deux profils PASS (checkpoint antérieur).
AGENTS.md local : SHA256 34cc2a8649bda4230bd2fa73d4a4de0edaf65dc1e3bdaf2b8b78ff58f4e4ea21.
Référence artistique : reference/SPHERE_CANONICAL_20261029.md ; image binaire canonique SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881 MANQUANTE.

## Failure-first / expérimentation ciblée
1. Nouveau test r20261-core-white-focus-exp.test.mjs : RED initial (PID 141388, exit échec attendu), puis trois tests statiques PASS (PID 144956).
2. Option A : émission des faces exposées (1.25,1.12,2.15) -> (1.85,1.76,2.24), aucune modification d'alpha/maillage. GPU A/B RTX 3090 Chrome, modes 0/2, PID 138112 :
   mode 0 coreMeanLuma +0.1346, brightness +0.1323 ; mode 2 +0.1319. changedPercent(seuil canal>=18)=0.
   Verdict : ÉCHEC_VISUEL, rejeté.
3. Option B après diagnostic : palette haute (1.74,1.44,2.30) -> (2.40,2.22,2.65), émission restaurée ; test de validation RED avant correction (PID 145376), puis 3/3 ciblés PASS (PID 145076), build exit 0 (PID 145076).
   GPU A/B RTX 3090 Chrome, modes 0/2, PID 144700 : coreMeanLuma mode 0 +1.2735, mode 2 +1.2712 ; brightness mode 0 +0.8350, mode 2 +0.3142 ; variation courants extérieurs pratiquement nulle (luma <0.0004).
   changedPercent(seuil >=18)=0 ; test de visibilité ÉCHEC, rejeté sans abaisser le seuil pour prétendre un PASS.
   PNG A/B mode 0 SHA256 : baseline 2584aba0f8edcbced5980390f5dcffeea823394eebf1c82e0b3e1542c005323d ; candidate c0a0b5ea8b2f4287b81d328b03f0b08e2e7a509a200c0fa7419760b7f556281b.

## Diagnostic de composition isolé et PASS
Script local de probe : r20261-occlusion-probe.cjs SHA256 e7c649a5ecdebc0c6a02ed6651eb807b61f83fb39fb133dc6cd983673f6f8635.
Exécution native Chrome RTX 3090 PID 137596, exit 0 ; 7 captures ; rapport R20261_OCCLUSION_PROBE.json SHA256 a5b7f04ea9bb028a8930d6c19df1f974a97be1fdfcb42b6e5df61dd3149188f0.
Cadre fixe 18, qualité Balanced, puissance 145 %, même page ZIP final extraite ; mesures du disque central de rayon 62 px.
- Original : coreMeanLuma 119.7194.
- Masquage du volume R20215 (1 mesh) : 117.7029 ; delta -2.0165.
- Masquage des 18 voiles 'core plasma diffusion' : 115.3436 ; delta -4.3758.
- Masquage des 28 rubans : 118.7725 ; delta -0.9468.
- Masquage des six auras soft shell : 119.7201 ; delta négligeable.
- Core-only : 93.3614 ; ne constitue pas une attribution causale isolée.
Le masquage des voiles internes améliore la séparation apparente des facettes dans la capture GPU inspectée, mais supprime une partie du plasma diffus. Interprétation : contribution de composition/voile au cœur ; ne pas inférer que l'émission seule est défectueuse. Les chiffres sont des mesures à angle, mode et frame fixés, pas une décision artistique.

## Nettoyage, durabilité et NEXT
Les deux edits shader/test et le bundle reconstruit ont été RESTAURÉS sur cette branche de diagnostic : 'git diff --name-only' = vide. Aucun changement testé mais refusé n'est livré.
Données expérimentales originales conservées localement sous qa-core-focus-exp/, avec scripts de reproductibilité ; scripts host-specific non destinés à être distribués.
NEXT : si la conception artistique est réouverte, créer une branche dédiée pour tester uniquement un rééquilibrage des voiles de diffusion près du noyau, avec test GPU A/B de lisibilité ET préservation des courants, 80 faces, 4 modes, puissance zéro ; ne pas altérer la R202.61 validée.
ART_SIGNOFF=PENDING ; SOURCE_GATE=LIMITED (Memory V1 autonome non attestée, image canonique absente) ; HOOKS_STATUS=UNKNOWN ; FUNCTION_REPORT=PARTIAL.
