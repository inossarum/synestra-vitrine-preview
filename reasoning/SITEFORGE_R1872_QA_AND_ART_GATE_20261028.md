# R187.2 — QA du nettoyage du laboratoire 3D

- Reprise du checkpoint R187.2 précédemment bloqué. Autorisation Desktop Commander rétablie pour le générateur : BUILD PASS ; SHA256 HTML `3b09b41f7970f071e2a44b568eab27ae95e6dacc219a3f7aa68c6846f5c3b95e`.
- Nettoyage visible : anciens comparateurs R171/R172 et R173/R174 et boutons de démonstration historiques retirés. Les recettes artistiques et les 10 contrôles d'éclats sont préservés dans `details` fermé par défaut.
- Contrat : 18 contrôles de scène + 10 contrôles d'éclats, 7 matériaux, import/export JSON conservés. Shader des matériaux 0–5 et JavaScript commun vérifiés inchangés (à l'exception du `?demo=energy` explicite).
- Shader 7 : atténuation arrière plus marquée, gain de reflets, largeur liée à `uFlow.y`, horloge `uLabTime` inchangée. Pas de nouveaux tubes opaques.
- Test statique `node --test tests/siteforge_r1872_cleanup.test.mjs` : **5/5 PASS** (CSP exacte, isolation shader, contrats JSON, UI, offline).
- Tests Chrome CDP via HTTP local : bureau PASS, mobile simulé 390×844 PASS, et `?demo=energy` PASS (flowType=6, WebGL zéro erreur). Le matériau 7 varie de 25,82 % de pixels en 2,1 s avec rotation figée / particules vitesse zéro (le taux est une preuve de mouvement, non une note d'esthétique).
- Capture d'interface entière : `evidence/r1872-energy-ui.png` ; captures de rendu temporel : `evidence/r1872-energy-first.png`, `r1872-energy-later.png` ; captures mobile également disponibles.
- Aperçu : http://127.0.0.1:19092/siteforge-r1872-autonome.html?demo=energy (loopback sur Inos-Cerebros).
- Maintien R187.1, R186 public et anciennes variantes. **Pas de push, merge, déploiement public**. La revue artistique de l'utilisateur reste PENDING. Limites : GPU physique non validé, avertissement `frame-ancestors` dans la CSP meta hérité, favicon 404 accessoire.
- Ce rapport supersède `SITEFORGE_R1872_CLEANUP_CHECKPOINT_20261028.md` pour l'exécution R187.2.
