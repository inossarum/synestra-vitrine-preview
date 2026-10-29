# SiteForge R204 — QA WebGL réelle sur Inos-Cerebros (2026-10-29)

- MISSION_ID: SYN_SITEFORGE_R204_LIGHTWEIGHT_CORE_20261029
- Baseline immuable: inossarum/synestra-vitrine-preview `fd23e9c325214715b08b508da6756374f2535aef` (PR #14, DRAFT)
- Isolation: branche QA dérivée uniquement, aucune mutation de PR #14, `main`, Cloudflare Access ou production.
- Source LAB épinglée: R188.1 `81b9cf1cfbbb2920f33482eeaca8655ac6ec475d`.
- GitHub Actions: run `40866466095`, job `123422373240`, conclusion SUCCESS (compilation/contrats/export, pas E2E).
- Machine: Inos-Cerebros, Chrome headless isolé, boucle HTTP locale `127.0.0.1:18880`. Le navigateur retourne `WebKit WebGL`; ne pas assimiler ceci à une mesure GPU RTX natif.
- Installation de test: `npm ci --ignore-scripts --no-audit --no-fund --prefer-offline` à partir du lockfile uniquement, sans dépendance globale.
- Compilation Three.js: PASS, `581582` octets, benchmarks GPU locaux 16 fichiers.
- Tests statiques R204: 5/5 PASS.
- Export statique R204: PASS, 70 fichiers, `SYNESTRA_R204_PREVIEW=PASS assets=16`. Le premier échec provenait d'une affectation de variable d'environnement Windows incorrectement formulée dans le lanceur QA; corrigé en utilisant `$env:CF_PAGES_BRANCH`. Le code source d'exporteur n'a pas été modifié.
- Chrome: 1440x900 / 768x900 / 390x900: **WebGL actif, un seul canvas, shader R188.1, H1 unique, pas de débordement horizontal**, PASS trois formats.
- Pages Connect, Bridge, SiteForge, Offres: HTML conventionnel, zéro canvas, H1 unique, pas de débordement à 390 px: 4/4 PASS.
- `prefers-reduced-motion:reduce`: scène statique sans animation GPU, PASS.
- Captures probantes: `SITEFORGE_R204_CHROME_1440.png` SHA-256 `9c790202e5fc2334f776c8013e25f3e8ac5276f054d08ae88da2e8c163e71e78`; `SITEFORGE_R204_CHROME_768.png` SHA-256 `de53b35b9eec9262498c96f98da8f975f1e519d479243cb481655cc4fb64dde7`; `SITEFORGE_R204_CHROME_390.png` SHA-256 `09f6f593f124903ac695882df817d0a18005f5e88a0b586cf3f63885a6bb9859`.
- Mesure initiale FPS déclarée par la scène: 1440=15.4, 768=44.8, 390=44.1; **mesures headless ponctuelles et non benchmark matériel qualifié**. Le hero à 1440 présente une performance insuffisamment démontrée pour une acceptation premium.
- Journal navigateur: avertissements `frame-ancestors` CSP en balise meta (la directive n'est pas appliquée depuis meta), une ressource locale 404 non attribuée ; pas d'erreur shader/GLSL détectée par le filtrage du test. Aucun secret extrait.
- Relecture visuelle des screenshots: la scène réelle montre un socle et une sphère d'arcs lumineux plutôt fins/filaires; densité du Core, relief lumineux du socle et présence premium encore à valider avec le propriétaire.

## Gates restants

1. Performance sur GPU d'entrée de gamme réel, tiers GPU 0/1/2 et stress test durée (PENDING).
2. Référence artistique et 3D premium à améliorer/faire valider sur capture réelle (PENDING).
3. Cloudflare Pages PREVIEW privée R204, HTTP + JS/WebGL sur domaine Access avec session autorisée (NOT TESTED). Aucun déploiement n'a été réalisé par cette QA.
4. Approbation esthétique, et toute mise en production/merge uniquement après autorisation humaine authentique.

## Reprise

R204 PR #14 demeure le candidat source. Réutiliser ce dossier evidence et `tests/siteforge_r204_browser_qa.mjs` pour préparer itérations ciblées en branche distincte, sans relancer les builds GitHub déjà attestés si le SHA est inchangé.

`FUNCTION_REPORT=PARTIAL | SOURCE_READY=YES | LOCAL_CHROME_E2E=PASS | PREMIUM_RELEASE_DONE=NO`
