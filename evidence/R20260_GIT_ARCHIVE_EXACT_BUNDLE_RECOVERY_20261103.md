# Synestra R202.60 — reprise HPSYN : correction de reproductibilité des exports Git

Date : 2026-11-03
Dépôt : `inossarum/synestra-vitrine-preview`
PR : #64 — `task/SYN_LAB_R20259_FINAL_CANDIDATE_20261103`
Base contrôlée avant correction : `6396656a08c405003ada45a214b3e59f7572efe0`
Commit de correction ciblée : `779d2b3699a36c14e4c3646ccd31c7165c9f58e8`

## Découverte nouvelle : absence de contrôle distant et export Git non fidèle

- GitHub `fetch_commit_workflow_runs(6396656a08c405003ada45a214b3e59f7572efe0)` : **0 workflow runs**. Les 24 workflows existants sont attachés à des branches historiques R201–R20249. **Aucune CI distante validée pour cette PR.**
- Le bundle compilé du ZIP R202.60 et l'objet Git `HEAD:lab-babylon/dist/babylon-lab.js` sont bien **identiques** : SHA256 `7f0fe152e7f8123cc5f0629025cdf598964bf2f41406a4db626fbd943563dbcf`, **7 431 207 octets**, 0 séquence CRLF.
- Le problème ne provenait donc **pas du contenu de l'objet Git**. Le `git archive --format=zip HEAD lab-babylon` sous Windows transformait son contenu en CRLF : SHA256 `9042354f570feb8234d7c1725e6fcb85af195ccf35a0573a6074c42cd4bba679`, **7 466 237 octets**, **35 030** CRLF.
- Test contrefactuel sans commit : `git archive --worktree-attributes` après réglage `.gitattributes` → SHA256 exact `7f0fe152...`, **0 CRLF**, 7 431 207 octets.

## Correction précise et négative → nominale

Dans le commit `779d2b3` :
- `.gitattributes` : pour **`lab-babylon/dist/babylon-lab.js` seulement**, ajouter `-text -diff` tout en conservant `whitespace=-trailing-space` : Git ne réécrit plus les fins de ligne lors d'une archive.
- Nouveau script **`release/verify_r20260_bundle_export.py`**, lecture seule, Python standard library, sans accès réseau : compare SHA256 Git blob, `git archive` du commit, worktree et bundle intérieur du ZIP distribué. Refuse tout écart avec code 2 ; retourne 0 si toutes les empreintes sont identiques.
- Failure-first initial **RED** sur HEAD `6396656` : Git export `9042354f...`, statut `FAIL`.
- Contrôle précommit avec attribut du worktree **GREEN** : Git export `7f0fe152...`, statut `PASS`.
- Contrôle **après commit `779d2b3`**, en mode normal **sans --worktree-attributes** : `R20260_EXPORT_INTEGRITY_PASS`. 4 SHA256 `7f0fe152...`, 0 CRLF, exit 0 (processus Windows **63064**).
- Aucun bundle, code Babylon, image, couleur, archive ou HTML unique n'a été modifié pour cette correction.

## Construction et tests indépendants depuis un export du SHA publié

Espace de vérification isolé, non versionné : `I:\_STUDIO_STAGING\SYN_LAB_R20260_CLEANROOM_QA_20261103`.
- `git archive` de `6396656` suivi d'extraction : dépôt source **sans `node_modules`** (261 fichiers `lab-babylon`).
- `npm ci --offline --no-audit --no-fund` : **PASS**, 3 paquets, code 0. Aucune requête réseau d'installation.
- `npm run build` : **PASS**, bundle reconstitué SHA256 **`7f0fe152...`**.
- Premier `npm test` : **FAIL non applicatif** car export limité à `lab-babylon`, alors que des tests importent `../tests/siteforge_r174_png_diff.mjs` à la racine. Résultat consigné, non dissimulé.
- Correctif de **périmètre de test seulement** : ajout du seul fichier partagé `tests/siteforge_r174_png_diff.mjs` depuis le **même SHA `6396656`**. SHA256 de cette dépendance : `817b51767a5df2adb4f26f1b88461549139c6fdddfff33a4287ab07a0cea8e2c`.
- Réexécution unique de la suite complète : **178 tests, 175 PASS, 0 FAIL, 3 SKIP**, code 0 (processus Windows **66540**).
- Cette exécution est une **vérification locale indépendante**, **pas** un workflow GitHub Actions. Aucune minute distante consommée ou CI verte revendiquée.

## Durabilité, retour arrière, limites

- `R202.60` ZIP et OneFile restent identiques, précédemment vérifiés sur RTX 3090 et SwiftShader. Le SHA du bundle contenu dans le ZIP est conservé.
- Rollback sans migration : retirer la règle `-text -diff` et le nouveau vérificateur dans un commit isolé, ou revenir au SHA précédent ; ne pas restaurer l'écart CRLF comme un changement Babylon intentionnel.
- La PR demeure ouverte pour revue, **pas de merge ni déploiement**, et `ART_SIGNOFF=PENDING` faute de copie canonique exploitable et d'acceptation propriétaire.
- La CI GitHub reste `NOT_RUN` sur le SHA initial ; aucune action GitHub Actions n'a été lancée dans cette récupération, conformément à `FREE_ONLY`.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | GIT_ARCHIVE_BYTES=VERIFIED | CLEAN_SOURCE_BUILD=PASS | CLEAN_SOURCE_TESTS=175_PASS_0_FAIL_3_SKIP | GITHUB_CI=NOT_RUN | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
