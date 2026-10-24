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

## R3 — inventaire MCP/skills et QA clavier réelle sur Windows (2026-10-18)

La capacité recherchée existe déjà : GitHub MCP pour les commits/PR ; Desktop Commander pour l'exécution bornée sur le PC déjà autorisé ; Synestra Connect pour le catalogue de cinq Central Skills attestés ; Skill Library Synestra v1.13.0 pour l'accessibilité, les tests E2E, la sécurité et la release. **Aucun nouveau serveur MCP** requis ni déployé.

Depuis une copie temporaire et indépendante sur **disque C: uniquement**, source prélevée sur `f5185c07100eae1128e769149288156445ba854b` et correctifs testés par SHA blob exact :
- `node --test tests/site_contract.test.mjs` : **11/11 PASS**, Windows Node 24.19.0.
- `node --check tests/browser_cdp_qa.mjs` : PASS.
- Chrome headless, viewport 390 et 1440 px, FAQ native, lien d'évitement et activation via Entrée/Espace : **PASS deux exécutions indépendantes**, processus terminé code 0 à chaque passage.
- Défaut identifié et corrigé : `Input.dispatchKeyEvent` devait inclure `text` et `unmodifiedText` ; sinon `FAQ_KEYBOARD_OPEN_FAIL mobile Enter`. Profil Chrome désormais distinct par lancement, ce qui élimine la réutilisation d'un `DevToolsActivePort` périmé.
- Limite résiduelle : sous Windows, la suppression immédiate du profil Chrome peut retourner `EPERM` ; un avertissement `CDP_PROFILE_CLEANUP_PENDING` est émis sans maquiller le résultat. Les profils sont isolés ; nettoyage complet **PENDING**.
- Un écran lecteur d'écran réel, la connexion au portail client, CI et publication ne sont **pas** qualifiés par ces tests. Site prévisualisation `noindex`, CSP, zéro nouveau script HTML ou formulaire. Les screenshots restent des artefacts temporaires de QA, sans publication automatique.

Evidence et checkpoint : `evidence/VITRINE_MCP_SKILLS_BROWSER_QA_20261018.json`.


## R81 — Présentation SiteForge dans la vitrine (24/10/2026)

Mission : `SYN_VITRINE_SITEFORGE_SHOWCASE_20261024`. Branche indépendante :
`task/SYN_VITRINE_SITEFORGE_SHOWCASE_20261024`, dérivée du HEAD vérifié de PR #3
`78cdb83825478948e9557aae01f4eb0ad562cf60`. Cette branche **n'est pas**
une mise à jour de `main` ni un déploiement Cloudflare.

- La section `#siteforge` relie la vitrine aux travaux de démonstration déjà présents
  sur `main:siteforge/index.html` (Git blob `3d4884a271e5b520d21be47de5ba5fe9d47bedfe`).
- L'illustration HTML/CSS porte la mention « aperçu conceptuel » : elle ne prétend
  pas être une capture réelle, une réalisation client, un audit WCAG ou une
  exécution autonome du Studio.
- Aucun script, formulaire, élément `img`, ressource tierce, cookie, outil MCP,
  nouveau Worker, service payant ou changement d'identité ajouté.
- Procédures réutilisées : SAL `GITHUB-FIRST-DURABLE-AUTHORING-V1`,
  outils Web Pilot / Visual Gate source de PR #3, Central Skills
  `ui-ux@1.0.0`, `web-accessibility-engineering@1.0.0` et
  `browser-compatibility-progressive-enhancement@1.0.0` (consultatifs).
- Préflight : PR #3 reste DRAFT, en avance de 22 et en retard de 8 commits
  par rapport à `main` lors de la reprise. Ne pas fusionner à l'aveugle.
- Vérifications effectuées : 20 contrôles statiques de la source Git relue,
  20 PASS, 0 échec ; **Node/Chrome E2E NOT_RUN** car la requête Bridge
  `326b2790-2400-4859-993c-ae988888f535` est `QUEUED` au dernier contrôle.
  Les résultats historiques des outils Web Pilot ne sont pas réattribués à R81.
- La route publique GitHub Pages `/siteforge/` est référencée par le code source
  existant ; sa disponibilité HTTP au 24/10/2026 n'est **pas** revalidée.
- Evidence détaillée : `evidence/VITRINE_SITEFORGE_SHOWCASE_R81_20261024.json`.

Pour qualifier le delta avant intégration : checkout Git isolé au SHA de R81,
`node --test tests/*.test.mjs`, `node tests/browser_cdp_qa.mjs`, puis
`node tests/web_pilot_real_capture_qa.mjs` et les cas Visual Gate appropriés.
Recueillir les sorties réelles, contrôler les screenshots mobile/desktop et
la parité de l'adresse SiteForge. Ne pas promouvoir sans tests ni gate d'owner.
