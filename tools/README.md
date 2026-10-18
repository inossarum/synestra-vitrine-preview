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
