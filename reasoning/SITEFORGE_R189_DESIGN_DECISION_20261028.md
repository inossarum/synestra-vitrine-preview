# SiteForge R189 — composition autour du noyau (candidat isolé)

- **Intention propriétaire** : écran R188 trop vide autour de la sphère reculée. Ne pas augmenter sa taille, ne pas remplacer son matériau.
- **Source vérifiée** : R186 Git `2b9677b839ef25db3bc21ea46e0784c579868802` du dépôt de prévisualisation. La source exacte R188 n'a pas été retrouvée ; ne pas présenter ce travail comme une intégration R188.
- **Choix** : ajoute une hiérarchie éditoriale à gauche et une carte statique SiteForge / Connect / Bridge à droite, avec repères de bord minimalistes. Conserve le script et le canvas. La couche supplémentaire est désactivée en mobile lorsqu'elle aurait gêné la sphère.
- **Régression historique revalidée** : anneaux autour de la sphère explicitement refusés (R173) ; retirés de la composition avant validation.
- **QA** : 95/95 tests Node PASS, captures réelles Chrome 1440x900 et 390x844, URL loopback HTTP 200. Au mobile, correction du titre et de la navigation après échec de la première revue visuelle.
- **Limites** : approbation esthétique propriétaire, source et E2E exacts R188, publication extérieure NON EFFECTUÉS.
- **Reprise** : consulter la prévisualisation locale, valider le langage visuel puis identifier un commit exact R188 pour transposer ce delta sans écraser ses modifications.
