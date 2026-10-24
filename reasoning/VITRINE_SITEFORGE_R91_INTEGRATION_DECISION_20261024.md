---
document_id: VITRINE_SITEFORGE_R91_INTEGRATION_DECISION_20261024
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
created_at: 2026-10-24T21:59:02.413Z
updated_at: 2026-10-24T21:59:02.413Z
time_provenance: functions.exec UTC runtime clock
evidence: evidence/VITRINE_SITEFORGE_R91_MERGE_CANDIDATE_20261024.json
source_tree: 4294303bb7a2043235faf10bdd401fafdfc7b642
---

# R91 — Vitrine + SiteForge : réconciliation préparée, livraison publique non autorisée

## Sources exactes

- Base vitrine `main@1eb9f9acc1d7091d42077f30d3159483057a02a6` avec Signal actuel.
- Historique PR #3 DRAFT `78cdb83825478948e9557aae01f4eb0ad562cf60` : **ancêtre** de R85, en état `mergeable_state=dirty`. `git merge-tree` depuis `main` reproduit **un conflit** `index.html`.
- Vitrine R85–R87 `ecf3c59d6497ea015bf117799804c92a2e5251e8` : vingt pages SiteForge et R85 HTML à liens portables, R86 Chrome réel et captures précédemment inspectées, R87 décision de ne pas publier sans gate.
- Générateur canonique SiteForge corrigé sur Studio PR #309, source `1a0b70d1081c1f6073e24ddcab393f8516c7de10`, Node complet **101/101** et Chrome **40/40** ; PR #309 toujours DRAFT vers PR #211, non fusionnée.

## Reproduction des conflits et stratégie retenue

`git merge-tree` sur un clone Git distinct prouve **22 conflits** entre vitrine `main` et R85 : `index.html`, 20 pages SiteForge HTML et `tests/test_siteforge_preview.py`. Les fichiers SiteForge sur `main` proviennent d'une histoire divergente, certaines pages ayant un contenu ancien. Une fusion automatique sans choix explicite pourrait réintroduire les liens fautifs.

Choix réversible en **branche candidate isolée**, jamais dans `main`, PR #3 ou une copie concurrente : créer une vraie fusion de `main` et R85 à deux parents, choisir la version R85 pour les 22 conflits énumérés, conserver les autres éléments de `main`, dont les cinq fichiers de Signal. Les deux assertions anciennes de `test_public_entry.py` ont été adaptées au nouveau contrat d'interface : lien HTTPS propriétaire vérifié **dans les actions du hero**, indépendamment de la classe CSS ; mention explicite du parcours de connexion toujours en qualification, avec variantes typographiques normalisées. Le refus d'un formulaire/JS de connexion public, des secrets et des affirmations infondées reste actif.

Une unique espace de fin de ligne héritée dans un test a été corrigée dans la candidate. Aucun correctif n'a été répercuté dans les sources historiques.

## Qualification obtenue

- Après correction ciblée : `node --test tests/*.test.mjs` **87/87 PASS**, `py -3 -m unittest discover -s tests -p 'test_*.py' -v` **15/15 PASS**, zéro conflit, `git diff --cached --check` **0**.
- Initialement le contrat Python ancien échouait pour 2/15, sans anomalie métier : assertions liées à la classe CSS historique et au texte littéral. Le premier échec git local provenait d'une identité committer absente ; résolu uniquement sur le clone QA par un identifiant synthétique explicite. Causes et requêtes dans Evidence.
- Commit de merge `d6d0b41eb5721f41ca6a7ccd3a70a8540ffde6fb`, arbre `4294303bb7a2043235faf10bdd401fafdfc7b642`, deux parents attendus, worktree local propre. Branche `task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024` **publiée sur GitHub**, HEAD et arbres relus.
- `index.html` blob `c354a8b5b2a89e494f9a061b6cb7f28b68e2aa01` identique R85 ; `siteforge/index.html` blob `b67811bf23f04d147645144fcf735c017db0be79` identique R85 ; Signal blob `d0aa2efac1078de7eabdc36247788fdbdd8274e4` inchangé. La comparaison candidate vs `main` confirme **aucune modification** des fichiers `signal/*`.
- Les hooks Git effectifs de ce clone QA = **0**, mais les hooks de contrôle du Studio et la CI GitHub globale restent **UNKNOWN**.

## Visual Observer et publication

La PR Visual Observer #302 indique le transfert binaire direct via Bridge non qualifié. Un refus `PC_NON_TEXT_RESULT_REFUSED` a été observé en R90. Aucun contournement, aucun Desktop Commander ; les fingerprints R90 ne valent pas approbation visuelle. Les images R86 avaient été réellement examinées sur R85, dont le HTML est identique à celui de R91 pour le parcours de vitrine concerné, mais **aucun nouveau screenshot R91, contrôle visuel direct R91, lecteur d'écran ou E2E public n'a été exécuté**.

La branche candidate en dépôt Git public **n'est pas un déploiement GitHub Pages** : `main` est toujours inchangé. PR #3 reste DRAFT en conflit ; PR #309 et PR #211 restent DRAFT séparées. Ne pas créer de doublon d'outil, IAM, serveur ou PR concurrent avant décision d'intégration.

## HUMAN_GATE / NEXT

1. Le propriétaire doit choisir la voie de publication : **recommandation : garder le commit R91 comme candidat de remplacement de PR #3**, puis organiser un gate de revue/CI et de pixels autorisés ; ne ni pousser PR #3, ni fusionner R91 directement sur `main`.
2. Après validation explicite du nouveau rendu et de l'hébergement, autoriser la publication de façon distincte ; prévoir une procédure de retour au `main@1eb9f9acc1d7091d42077f30d3159483057a02a6` non destructive (nouvelle PR de revert), puis E2E public sur les URL exactes et contrôles 390/1440.

`FREE_ONLY`, `NO_DIRECT_MAIN`, `NO_DESKTOP_COMMANDER`, `NO_DEPLOY_WITHOUT_APPROVAL`.

FUNCTION_REPORT=PARTIAL
PUBLICATION_DONE=NO
