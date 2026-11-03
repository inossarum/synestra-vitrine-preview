# Synestra — Labo 3D R202.57 — transitions continues entre les 4 formes
Date : 2026-11-03
Source : `inossarum/synestra-vitrine-preview`, base PR #61 `14349a0dcb7eb02852def16bc9274baa4c62f14b`.
Branche de travail isolée : `task/SYN_LAB_R20257_MODE_TRANSITION_CHATGPT_20261103`.

## Changement livré et délimité
- Le changement entre rayonnement / vortex / tressage / pulsation ne fait plus sauter les 28 courants extérieurs d'un état à l'autre.
- Interpolation progressive **0,72 s** à coefficients lissés, transition déterministe, interrompable : un nouveau choix reprend la forme exacte courante.
- Le contrôleur conserve quatre poids qui totalisent 1 ; les mêmes **28 meshes Babylon** sont réactualisés sans créer de rendu, matériau ou shader supplémentaire.
- Les points d'ancrage des trajets restent inchangés ; les six nœuds mobiles et le masque exact de 80 triangles sont préservés.
- `prefers-reduced-motion=reduce` : changement de mode immédiat et transition inactive.
- Les transferts de géométrie suivent le budget CPU préexistant (28 ms en équilibré) ; mise à jour finale exacte après 0,72 s, même lorsque `labFrame` fige le temps de la scène.
- **Aucun changement de lumière, couleur, ombrage, matériaux ou shaders.**

## Preuves effectivement obtenues sur Inos-Cerebros
- Skills SHA-pinnés consultés et appliqués :
  - `git-worktrees` v1.0.0 / `81dae259362bcb6c5142180a97d7dfc84f479a63`
  - `failure-first` v1.0.0 / `373c5f508b3ef91d1ffc1fc5afec7007a643d590`
  - `reasoning-evidence` v1.0.0 / `b1d95e26cddce504adcbb0ba69d7c4ca36990836`
- Préflight local : worktree isolé depuis HEAD PR #61 inchangé, aucun fichier suivi modifié avant création.
- Failure-first réel : module `shell-mode-transition.mjs` absent, ERR_MODULE_NOT_FOUND avant la correction.
- **3 tests ciblés PASS** : continuité au changement de cible, réduction des animations, valeurs invalides, préservation des 28 meshes, géométrie interpolée, cadence CPU à temps figé.
- Installation locale `npm ci --offline` code 0 (3 paquets), compilation esbuild **PASS**, bundle SHA256 `81793bea1814362af6e68ca3b5066593f7f9e8325aea378591f9d782344abe79`.
- Suite complète Node : **170 tests, 167 PASS, 0 FAIL, 3 SKIP**, code 0.
- **E2E réel dans Chrome sur NVIDIA RTX 3090 Direct3D11**, en qualité équilibrée, frame 18, puissance 145, même scène, même canvas, mêmes 28 rubans, même noyau 80 triangles. Déplacement de géométrie cumulé sur 26 rubans actifs au cours de la transition : **0,140705 → 2,068018 → 6,271374** (unités du banc QA). Poids au milieu `[0.61695,0.38305,0,0]`; à la fin `[0,1,0,0]`.
- **Retargeting rapide** 1→2→3, sans saut de poids au second changement : PASS ; arrivée au mode 3 PASS.
- **Puissance 0** : masque de profondeur invisible, aucune branche visible PASS. **Animations réduites** : mode final immédiat sans transition PASS. 0 erreur JavaScript. Navigateur fermé proprement. Code de sortie 0.
- Rapport du test GPU relu : `qa-transition/R20257_CONTINUOUS_TRANSITION_GPU_REPORT.json` SHA256 `35b51df3cfce5671a4872dfa8b91c0f85987297375aad2a6703d7fa06c86d710`. Capture native `R20257_F18_AFTER_TRANSITION_D3D11.png` et script `r20257-native-transition-qa.cjs` conservés dans le worktree local, non poussés.

## Reprise et protections
- La PR #61 et main ne sont pas modifiées ; aucune fusion ni déploiement.
- La prévisualisation du chantier répond localement à `http://127.0.0.1:5179/` tant que le serveur temporaire fonctionne.
- Rollback simple : base immuable PR #61 HEAD `14349a0dcb7eb02852def16bc9274baa4c62f14b`.
- `ART_SIGNOFF=PENDING`. Cette étape finalise la continuité structurelle des quatre modes, pas la finition artistique globale.
- `FREE_ONLY`, zéro service payant invoqué.

`FUNCTION_REPORT=PARTIAL | R20257_CONTINUOUS_TRANSITIONS=VERIFIED | GPU_E2E=PASS | REGRESSION=167_PASS_3_SKIP_0_FAIL | PERSISTENCE=LOCAL_CHECKPOINT | GITHUB_RECHECK_REQUIRED`
