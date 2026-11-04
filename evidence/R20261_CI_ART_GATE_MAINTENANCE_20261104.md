# R202.61 — Maintenance de stagnation : garde artistique exécutable

Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Owner : Synestra | Branche : task/SYN_LAB_R20261_MIST_OPACITY_EXP_20261104
HEAD exact au préflight : 3f8579610e49a4b641a9db81814c3ebeba07c300.
Règles AGENTS.md : SHA256 34cc2a8649bda4230bd2fa73d4a4de0edaf65dc1e3bdaf2b8b78ff58f4e4ea21.
ZIP R202.61 SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13, inchangé.

## Cause et corrective ciblée
- Cause vérifiée : le fichier reference/R20261_VISUAL_ART_SOURCE_GATE.json était documentaire et aucun exécutable CI n'en contrôlait les invariants.
- Le workflow existant .github/workflows/r20261-standalone-zip-integrity.yml ne ciblait que la branche WHITE_VIOLET et ignorait les changements du gate.
- Correctif : release/verify_r20261_art_gate.py (Python stdlib, lecture seule, zéro accès externe) ; release/test_verify_r20261_art_gate.py (12 tests dont 11 cas négatifs) ; raccordement au workflow existant avec branche et paths explicites, même runner Ubuntu 24.04, concurrency isolée par ref.
- Aucune nouvelle CI concurrente, aucun service, nouveau runner payant, credential, modification de moteur, shader, source Babylon, ZIP ou main.

## Tests locaux exécutés sur Windows Inos-Cerebros
- RED failure-first : PID 50612, unittest échoue car module vérificateur absent. Échec attendu avant correction.
- GREEN : PID 49920, 12 tests PASS, 0 FAIL, unittest exit 0 ; vérificateur exit 0 avec statut R20261_ART_GATE_PASS_HOLD.
- Revalidation : PID 51540, 12 tests PASS/0 FAIL, même statut et exit 0.
- git diff --check : PASS.
- Le script vérifie : référence documentaire Git (SHA blob), SHA de l'image attendu mais octets réels non attestés, SHA de l'archive et du rapport GPU, invariants structurels, E2E orbital NON_EXECUTED, validation owner PENDING, et refus explicite de toute promotion.
- Les tests négatifs rejettent : promotion artificielle, fausse preuve source, E2E artificiel, signature fictive, SHA d'image déclaré sans octets, SHA attendu altéré, ZIP altéré/absent, référence documentaire altérée, état orbital promu, rapport GPU altéré.
- L'exécution du test orbital précédemment refusé n'a pas été retentée ; un PASS_HOLD ne prouve pas une conformité artistique.

## Coûts et CI
- `gh repo view inossarum/synestra-vitrine-preview --json isPrivate --jq .isPrivate` -> false (repo public).
- Documentation officielle GitHub Actions : runners standard ubuntu-24.04 gratuits et illimités pour dépôts publics (https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job).
- Le changement de workflow peut déclencher un run gratuit sur branche isolée à la publication. État de CI à écrire après réception réelle ; CI PENDING au moment de cette Evidence.
- Le workflow existant conserve ses étapes build, tests, vérification ZIP et bundle, plus le gate statique ajouté.

## Portée et gates
- Art image Library candidate : octets toujours DENIED, SHA de référence NON_VERIFIED ; aucune validation artistique.
- Projet livré et code original : inchangés. CI pass ne prouvera pas GPU E2E ni art signoff.
- SOURCE_GATE=LIMITED (Memory V1 autonome non prouvée) ; HOOKS_STATUS=UNKNOWN.
- Correctif local : PASS ; Git/CI/persistance : PENDING à ce stade.
- FUNCTION_REPORT=PARTIAL.
