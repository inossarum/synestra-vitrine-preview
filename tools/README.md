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
