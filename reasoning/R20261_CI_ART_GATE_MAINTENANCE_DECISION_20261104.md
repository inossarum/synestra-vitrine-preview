# R202.61 — DOCTOR/FAST/PREVISE/MAINTENANCE : sortie de stagnation

Date : 2026-11-04 | Périmètre : seule branche R202.61, sans promotion artistique.
Evidence : evidence/R20261_CI_ART_GATE_MAINTENANCE_20261104.md.

## Root cause
Le même diagnostic « image canonique SHA inaccessible » était répété alors qu'un garde documentaire existait sans exécution. Une intervention indépendante est possible : rendre le refus de promotion falsifiable et contrôlé dans la CI existante.

## Choix
- REUSE_FIRST : adapter .github/workflows/r20261-standalone-zip-integrity.yml, ne pas créer un second workflow/runner ou nouveau broker.
- TEST-DRIVEN : modèle fail-closed avec 11 cas négatifs et un cas HOLD nominal. Le check local valide le code et le ZIP, PAS la qualité artistique.
- FAST : pas de nouveau GPU/capture ni de reprise du test orbital préalablement POLICY_DENIED. Les preuves SHA du ZIP et du GPU précédent sont réutilisées et vérifiées.
- FREE_ONLY : GitHub repo public confirmé; runner standard Ubuntu gratuit confirmé dans la documentation officielle.
- SECURITY : échec si le manifeste affiche une preuve non démontrée; jamais d'approbation par simple bascule de booléen.
- DURABILITY : preuves et script versionnés dans la branche isolée, CI lue après publication.

## Rejet des autres options
- Refaire un rapport sans effet exécutable : rejeté (stagnation).
- Copier/matérialiser l'image via un chemin déjà refusé : rejeté (POLICY_DENIED).
- Rejouer le test orbital via un autre outil : rejeté (POLICY_DENIED).
- Ajouter un shader/filtre/suppression de voiles sans référence SHA et test multi-angles : rejeté (risque artistique et performances).
- Déployer/pousser main : rejeté (hors autorisation).

## Next
1. Vérifier delta et ne stager que vérificateur, test, workflow, Evidence et Reasoning.
2. Commit/push sur la branche R202.61, vérifier le remote HEAD.
3. Contrôler la nouvelle CI via run ID, remédier au plus un défaut reproductible sans boucle.
4. Conserver ART_SIGNOFF=PENDING tant que les octets référence et E2E orbital non disponibles; ne jamais conclure DONE sur seul succès de CI.
