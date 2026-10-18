# Synestra Web Pilot — outils locaux de pilotage web (prototype V1)

Status: SOURCE_READY / WINDOWS_CHROME_E2E_PASS / REMOTE_CHATGPT_MCP_NOT_CONNECTED / FREE_ONLY.

## Trois capacités qualifiées dans la prévisualisation

1. **Web Structure & Accessibility Audit** (`tools/web_pilot_core.mjs:inspectCapture`).
   - Valide strictement une capture typée et bornée (`synestra.web-pilot.capture.v1`).
   - Vérifie ancrages internes, ID dupliqués, H1, sections, libellés de liens, noms de rôles AX interactifs, focus observé, débordement horizontal et requêtes HTTP(S).
   - Retourne `ADVISORY_NO_FLAGS`, `ADVISORY_WARNINGS`, `REVIEW_REQUIRED` ou `REJECTED`, **jamais une certification WCAG**.
2. **Differential Regression Gate** (`compareCaptures`) pour deux captures de même taille d'écran. Rapporte les alertes nouvelles/disparues ; `qualityImprovementProven=false`, aucune réparation automatique.
3. **Local MCP stdio** (`tools/web_pilot_mcp_stdio.mjs`) expose exactement deux outils :
   - `synestra_web_inspect_capture`
   - `synestra_web_compare_captures`

La passerelle MCP analyse **uniquement des objets JSON fournis** et ne possède aucune méthode de lecture de fichiers, de navigateur, d'accès réseau, d'exécution système, d'ouverture de ports ou de mutation. Ce processus local n'est pas un connecteur distant ChatGPT ; aucun endpoint/proxy MCP Synestra ni privilège PC n'a été créé.

## Intégration réelle dans la vitrine

Le script Chrome/CDP **existant** `tests/browser_cdp_qa.mjs` conserve ses tests de viewport, FAQ et clavier ; il collecte maintenant, après les vérifications de navigation :

- le graphe DOM des IDs, sections, titres, liens, focus contrôlés et éventuels débordements ;
- les noms accessibles depuis le vrai `Accessibility.getFullAXTree` de Chrome ;
- les événements `Network.requestWillBeSent` observés pendant les rechargements locaux ;
- des rapports temporaires `web-pilot-mobile.json` et `web-pilot-desktop.json` dans le clone de test (ne pas publier de chemins locaux ni de données privées).

Commandes **dans une extraction isolée de la branche de prévisualisation** sous Windows avec Chrome installé :

```powershell
node --test tests/*.test.mjs
node tests/browser_cdp_qa.mjs
node tests/web_pilot_real_capture_qa.mjs
```

Le dernier script fait de véritables appels JSON-RPC à un processus enfant MCP via stdio avec les **captures Chrome effectivement produites**. Pas d'installation NPM, pas de package externe, pas de paiement.

## Contrats de refus et limites

- `REJECTED` sur structure invalide, données hors bornes, prétendu champ `qualityProven`, contexte de viewport incompatible ; les tools MCP refusent les commandes, les outils inconnus, les paramètres supplémentaires et les payloads trop volumineux.
- Un `ADVISORY_NO_FLAGS` est uniquement « aucune anomalie parmi les règles automatisées appliquées ». Ce n'est PAS WCAG AA, audit lecteur d'écran, test d'authentification du portail, vrai Core Web Vitals terrain ou release publique.
- Un résultat sur `file://` ne prouve pas l'absence de requêtes tierces sur un site déployé. La capture de navigation au clavier couvre le lien d'évitement et des FAQ spécifiques, pas toutes les fonctionnalités de la page.
- La capture est locale et son origine native n'est pas authentifiée cryptographiquement. Ne pas afficher de données clients ou de session dans les preuves Git.
- Le profil Chrome temporaire peut être provisoirement verrouillé sous Windows (`CDP_PROFILE_CLEANUP_PENDING EPERM`) ; tests et relances passent grâce aux profils uniques ; nettoyage complet reste PENDING.
- Pas de publication de nouvelles commandes privilégiées via Site MCP, Bridge, Cloudflare ou Supervisor. Les outils restent dans cette PR DRAFT jusqu'à une qualification/revue de sécurité pour une éventuelle promotion au Studio central.

## Recherche / références canoniques

- Chrome DevTools Protocol : [Accessibility.getFullAXTree](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/), [DOMSnapshot.captureSnapshot](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/), [Performance.getMetrics](https://chromedevtools.github.io/devtools-protocol/tot/Performance/).
- [W3C WCAG 2.2](https://www.w3.org/TR/wcag/) : critères clavier/focus et limites des contrôles automatisés.

## Provenance et reprise

PR vitrine #3, `inossarum/synestra-vitrine-preview`. Evidence `evidence/VITRINE_WEB_PILOT_MCP_REAL_E2E_20261018.json`. Vérifier HEAD/SHA, puis exécuter tests Node + vrai Chrome + échange local MCP, documenter toute nouvelle limitation avant promotion de code réutilisable dans Synestra Studio.

## V2 — Observations de performance en laboratoire (18/10/2026)

Deux nouvelles fonctions *consultatives* sont disponibles dans le MCP local, en plus de l'audit structurel :
- `synestra_web_inspect_lab_performance({lab})` — valide un relevé CDP typé `synestra.web-pilot.lab-metrics.v1`, borné et sans champ d'auto-validation.
- `synestra_web_compare_lab_performance({before,after})` — compare deux relevés de même viewport et même fenêtre d'observation ; retourne **AFTER_MINUS_BEFORE**, sans conclure à une amélioration.

Le collecteur `tools/web_pilot_lab.mjs` lit `Performance.getMetrics` de Chrome avec `timeDomain=timeTicks` après un rechargement et les contrôles de la page. Les valeurs directes observées (`nodes`, `jsHeapUsedBytes`, compteurs layout/styles et durées tâches/styles/scripts) **ne sont pas des durées normalisées par chargement**. Chrome peut réinitialiser les compteurs lors de la navigation : ne **jamais** soustraire une mesure effectuée avant le rechargement d'une autre effectuée après. Toute métrique non fournie demeure `null`/`PENDING_LAB_METRICS`.

Un premier essai réel avec soustraction trans-navigation a effectivement produit des compteurs négatifs/inconnus, *sans faux PASS* ; le correctif de collecte directe a ensuite produit deux observations complètes (`ADVISORY_LAB_OBSERVATION`) avec tests à jour. Ce résultat ne fournit **aucun score Core Web Vitals terrain**, notamment ni LCP, ni INP, ni CLS au 75e percentile : ces métriques doivent faire l'objet de sources RUM/CrUX adaptées.

L'essai Chrome local sur la vitrine a affiché : mobile 390 px, 1 048 nœuds, 808 524 octets de heap JS, TaskDuration observée 38,706 ms ; bureau 1440 px, 1 572 nœuds, 1 060 080 octets, TaskDuration observée 42,245 ms. **Ce ne sont que deux échantillons** non représentatifs et non comparables entre formats.

Tests de développement sur Inos-Cerebros/Windows Node 24.19 : `node --test tests/*.test.mjs` **60/60 PASS**, puis `node tests/browser_cdp_qa.mjs` et `node tests/web_pilot_real_capture_qa.mjs` **PASS**, six appels MCP réels dont deux relevés lab et une comparaison identique. Chrome profile cleanup `EPERM` reste PENDING. Pas de mise en production, serveur MCP distant, changement d'autorisations, service tiers payant ou accès Bridge.

Source officielle : https://chromedevtools.github.io/devtools-protocol/tot/Performance/ ; limites CWV : https://web.dev/articles/defining-core-web-vitals-thresholds/ . Evidence durable : `evidence/VITRINE_WEB_PILOT_LAB_V2_20261018.json`.

## R3 — Visual Gate intégré, captures Chrome sur vitrine réelle (18/10/2026)

**Réutilisation R3** : \`tools/visual_fingerprint.mjs\` est un port légèrement adapté du prototype local archivé (la version portée **n'a pas le même blob SHA** que l'archive originale), puis testé sur le vrai site via le Chrome déjà autorisé. Les deux outils visuels sont **intégrés au serveur MCP local existant**, soit **six** outils read-only ; aucun nouveau serveur, privilège ou accès fichier MCP. Les arguments contiennent uniquement des empreintes dérivées (grille 16 × 12, moyennes RGB, hashes de tuiles), jamais des PNG ni chemins du PC.

- \`synestra_web_inspect_visual_fingerprint({visual})\` inspecte un rapport dérivé strict.
- \`synestra_web_compare_visual_fingerprints({before,after})\` compare deux vues strictement à la même résolution physique.
- Exécution locale explicite de \`node tests/visual_site_e2e.mjs\` sur **clone isolé uniquement** : capture baseline Chrome 390/1440, changement d'un jeton CSS de couleur, seconde capture, restauration du HTML dans un \`finally\`, troisième capture, deux appels MCP par viewport. Le script modifie **seulement** le \`index.html\` de la copie isolée ; il n'effectue aucune publication ou mutation du Studio actif.
- Validation initiale du clone Git exact : **71/71 tests Node PASS**. Navigateur réel : changement volontaire observé sur 24 tuiles mobiles et de 5 à 7 tuiles bureau suivant le passage. Récupération : HTML restauré au blob \`7e485223af98a1281a91b4cb75fe66d31734f8a6\`, **0 tuile PROMINENTE restante sur mobile/bureau** ; 2 tuiles SUBTLE restent différentes entre captures mobiles malgré réduction des animations et attente des polices. Ces différences ne sont pas masquées : retour au pixel identique NON PROUVÉ.
- Le prototype synthétique précédent passe **34/34 tests** après extraction propre. Le composant Studio central équivalent passe **60/60 tests** de contrat/MCP sur un sparse checkout Windows. Les pixels varient selon la capture ; aucune appréciation automatique de conformité ou de défaut esthétique.
- **Rappel sécurité** : rapports dérivés potentiellement sensibles, ne pas les publier pour un client sans permission ; les outils MCP locaux n'ont aucun lecteur de PNG, navigateur, shell ni réseau ; \`visual_site_e2e\` n'est pas un outil MCP.
- Le nettoyage de profils Chrome peut encore émettre \`CDP_PROFILE_CLEANUP_PENDING EPERM\`; grâce aux profils uniques les essais successifs fonctionnent, mais cleanup complet PENDING. Portail client, lecteur d'écran, review indépendante, connecteur distant et déploiement PENDING.

Evidence : \`evidence/VITRINE_WEB_PILOT_VISUAL_R3_20261018.json\`. Aucun fichier de capture brute ni dossier local personnel n'est ajouté à Git.

## R7 — Export couplé Visual Gate → Web App (18/10/2026)

Le collecteur Chrome/R3 réutilisé dans `tests/visual_site_e2e.mjs` produit désormais, pour chaque viewport mobile/bureau, **deux fichiers locaux associés** :

- `visual-review-<viewport>.json` : enveloppe `synestra.web-pilot.visual-review.v1` contenant les résultats originaux du comparateur MCP pour modification et restauration ;
- `visual-review-<viewport>.sha256-manifest.json` : manifeste `synestra.web-pilot.visual-evidence-digest.v1`, avec SHA-256 des **octets exacts** du fichier JSON ci-dessus.

Le module portable `tools/visual_evidence_pair.mjs` assemble le couple sans accès disque, shell, réseau ni dépendance tierce. Le script de test autorisé écrit les sorties uniquement dans un **répertoire temporaire Windows**, jamais dans Git. L'empreinte lie deux fichiers ; elle **n'atteste pas l'auteur ni la provenance**, qui restent `UNVERIFIED` et `attestation=NONE`. Le SHA du checkout est enregistré comme **contexte déclaré**, pas comme preuve d'origine authentifiée.

Validation initiale dans un clone isolé du commit `12d7e2f91d73c7f696cb2fc845be340fd2c48a67` avec trois fichiers nouveaux/édités : **82/82 tests Node PASS** (dont 11 nouveaux tests d'export et de refus). Le premier test a exposé une validation insuffisante de `../repo` (81/82), corrigée avant l'E2E.

**Chrome réel** sur la vitrine, mobile 390 et desktop 1440 : CSS volontairement modifié, 24/5 zones détectées, fichier source restauré au blob `7e485223af98a1281a91b4cb75fe66d31734f8a6`. Deux rapports et deux manifestes produits ; SHA-256 des fichiers comparés à leur manifeste PASS. Sur cette exécution, 0 zone résiduelle ; ne pas inférer la reproductibilité pixel-par-pixel puisque des variations mobiles subtiles ont été observées sur d'autres runs.

**E2E véritable navigateur Chrome → producteurs locaux R7 → Web App React R6** : import du rapport mobile et **du manifeste réellement produit**, état `INTEGRITY_MATCH` avec origine `UNVERIFIED` PASS, modification volontaire de l'empreinte et refus `INTEGRITY_MISMATCH` PASS, grille/filtre/clavier/restauration/refus JSON invalides PASS. Aucun réseau hors loopback, aucun nouveau backend ou IAM.

Tests finalisés sur la branche Git après publication : à confirmer dans une extraction propre du commit R7, les tests locaux précédents ne sont pas encore cette vérification. Aucun rapport réel, PNG, chemin de client, clé privée ou token commité.

Evidence durable : `evidence/VITRINE_WEB_PILOT_VISUAL_R7_PAIR_20261018.json`.
