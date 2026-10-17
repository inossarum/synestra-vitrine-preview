# synestra-vitrine-preview
Previsualisation statique du site vitrine Synestra sans code prive

## Contrôles de la vitrine

La branche de travail reste une **prévisualisation statique** : elle ne déploie rien en production.
Le site public vitrine et le portail privé Synestra sont deux périmètres distincts.

- Entrée du site : `index.html` (HTML/CSS, aucune dépendance JavaScript ni ressource externe).
- Validation automatisée prévue : `node --test tests/site_contract.test.mjs` avec Node.js récent (tests natifs, sans `npm install`).
- Contrats couverts : ancres, titres, navigation, FAQ native, `noindex`, CSP, responsive, clavier, prudence des affirmations sur le pilote.
- La présence du portail dans les liens n'établit pas qu'il est utilisable de bout en bout.
- Revues encore nécessaires : exécution Node sur extraction propre, navigateur desktop/mobile avec clavier et lecteur d'écran, CI, vérification du parcours portail réel et autorisation de publication.

Documentation et preuves de ce delta : `evidence/VITRINE_FAQ_ABOUT_20261017.json`.
