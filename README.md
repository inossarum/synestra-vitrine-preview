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

## Requalification ciblée du clavier (18/10/2026)

Le lien « Aller au contenu » mène maintenant vers `<main id="contenu" tabindex="-1">`, afin de permettre le déplacement explicite du focus après activation au clavier. Les cinq FAQ restent en HTML natif `details/summary`, sans JavaScript applicatif.

- Contrat statique : `node --test tests/site_contract.test.mjs` (10 tests déclarés, dont 2 nouveaux).
- Contrôle navigateur existant étendu : `node tests/browser_cdp_qa.mjs` ; Chrome sur Windows, profil et port CDP temporaires, captures mobile 390 px et bureau 1440 px **avant** les actions clavier. Puis vérification du lien d'évitement avec Entrée et des FAQ avec Entrée/Espace.
- Source du nouveau delta relue statiquement : 19/19 invariants PASS ; analyse syntaxique des corps JavaScript PASS. **Le nouveau test Node et les interactions clavier Chrome n'ont pas encore été exécutés contre ce HEAD**. Ne pas convertir la réussite navigateur de la version précédente en PASS de cette version.
- Environnement Linux local disponible : Chromium ouvre une page d'erreur pour le fichier HTML de démonstration (`chrome-error://chromewebdata/`) ; cause non qualifiée, pas une preuve d'échec du site.
- Le portail client réel, le lecteur d'écran, la CI et la publication restent PENDING. Ne pas fusionner ni déployer depuis cette PR brouillon.

Evidence : `evidence/VITRINE_KEYBOARD_FOCUS_20261018.json`.
