---
document_id: SYN_VITRINE_SITEFORGE_R84_CONNECT_FIRST_20261024
document_type: REASONING
scope: Synestra public vitrine development
state: CHECKPOINT
---
# R84 — SiteForge regroupé et bascule de l'exécution PC vers Connect

MISSION_ID=SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
OWNER=Inos
DATE=2026-10-24
QUALIFIED_SOURCE_COMMIT=f27cd61fb828bb10a0fa7d8aec90faebceb4e073
EVIDENCE=evidence/VITRINE_SITEFORGE_BUNDLED_E2E_R84_20261024.json

## Décision de canal PC
Demande explicite propriétaire : privilégier exclusivement Synestra Connect pour les nouvelles opérations PC, sans bascule systématique vers Desktop Commander en cas de QUEUED. À compter de cette instruction, aucune nouvelle action Desktop Commander n'a été lancée. Connect Bridge `pc_start_process` a renvoyé `QUEUED` puis `get_operation` a confirmé `DONE` pour la commande read-only de vérification du worktree et des deux routes de prévisualisation, request_id `870c1e49-98ff-4818-9858-457e7ef15d08`. Le résultat observé inclut HEAD exact, diff suivi vide et deux HTTP 200. Les flags généraux `execution_authorized=false` ne sont pas remplacés par une prétention à l'attestation native : la preuve est limitée à l'exécution propriétaire avec clé logicielle, `SOFTWARE_KEY`. Les PID externes à Bridge ne sont pas nécessairement des sessions Bridge. `QUEUED` seul n'est ni PASS ni FAIL.

## Delta confirmé
Le HTML vitrine R82 et ses outils Web Pilot/Visual Gate existants ont été testés en checkout temporaire. Correctif ciblé de lecture verrouillée `DevToolsActivePort` sous Windows (reprise bornée EBUSY/EPERM) et mise à jour du contrat MCP de 4 vers les 6 outils existants, sans ajout de nouveau service. Intégration des 23 fichiers `siteforge/` de `main@1eb9f9acc1d7091d42077f30d3159483057a02a6` avec blobs inchangés, plus test public canonique et ajustement du libellé `Démo SiteForge`. Commit GitHub créé avec objets Git natifs, arbre validé bit-à-bit contre `git write-tree`, puis `update_ref` non forcé, attendu sur l'ancien HEAD. Les fichiers de la branche PR #3, de `main`, des Workers, du Bridge et du chantier Web App parallèle restent intacts.

## Qualification
À `f27cd61fb828bb10a0fa7d8aec90faebceb4e073` dans un checkout propre : 87/87 tests Node PASS, 5/5 contrats Python SiteForge PASS. Chrome mobile 390x844 et bureau 1440x900 PASS pour viewport, clavier, FAQ ; Web Pilot `ADVISORY_NO_FLAGS`, 0 requête externe observée et 0 débordement ; MCP local 6 appels PASS. Visual Gate a observé 26 puis 5 cases modifiées par changement CSS isolé ; retour source SHA exact, 0 changement prominent résiduel, 2 différences mobiles subtiles ; le code de sortie final de cette dernière exécution n'a pas été relu via Connect, ne pas le qualifier de preuve intégrale `exit0`. Le nettoyage CDP rend encore parfois `EPERM` : laisser PENDING et ne pas déclarer résolution. La consultation limitée au PC a répondu HTTP 200 pour la vitrine et la page SiteForge avec octets UTF-8 source vérifiés.

## Choix et limites
Ne pas déployer Cloudflare, GitHub Pages public ni fusionner avec la PR #3 : chantier de migration séparé et aucune autorisation de cutover. L'URL `http://127.0.0.1:4189/` n'est visible que depuis Inos-Cerebros. Ne pas assimiler les indications de lab Chrome à un Core Web Vitals réel ou à une conformité WCAG certifiée. Les screenshots sont locaux sur PC, pas des fichiers rendus dans le chat. La source est réversible à la branche isolée, aucun runtime public modifié.

## NEXT
Garder Connect pour les tâches PC : une requête unique autorisée, récupérer l'UUID puis `get_operation` et l'ID réel du processus s'il est renvoyé ; éviter les boucles si panne prolongée. Terminer les nettoyages CDP sans aveuglement, exécuter le Visual Gate sur HEAD exact via Connect avec exit code attesté, vérifier les liens des sous-pages SiteForge sur le paquet complet, puis proposer l'intégration contrôlée à la PR #3 avec vérification de lease/HEAD et audit visuel réel avant tout déploiement cloud. Evidence et Reasoning restent distincts ; lecture ≠ exécution ≠ certifié.

FUNCTION_REPORT=PARTIAL
SOURCE_GATE=LIMITED_RUNTIME
HOOKS_STATUS=UNKNOWN
