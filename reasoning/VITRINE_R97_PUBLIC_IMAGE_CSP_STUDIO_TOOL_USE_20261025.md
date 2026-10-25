---
document_id: VITRINE_R97_PUBLIC_IMAGE_CSP_STUDIO_TOOL_USE_20261025
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
status: ACTIVE_CHECKPOINT
owner: Inos
evidence: evidence/VITRINE_R97_LOGO_PUBLIC_PREVIEW_SOURCE_GATE_20261025.json
code_head_at_tests: 12d526ac77e026ade902c1c1aa841af393a4c9ab
publication: HOLD
---

# R97 — Normes Studio appliquées à un défaut visuel constaté

## Observation → première cause
La capture envoyée par le propriétaire montre deux icônes cassées : le logo officiel dans l'en-tête et au centre de la scène orbitale. Le rendu local R96 avait réussi les tests Chrome, ce qui ne prouvait **pas** le bon fonctionnement via la prévisualisation GitHack.

Sur l'URL exacte au commit R96, une requête image revient HTTP 200 mais le proxy GitHack la redirige vers `raw.githubusercontent.com`. La CSP de la page contient seulement `img-src 'self'`. Ce domaine de destination n'est donc pas autorisé. Le test failure-first écrit spécifiquement pour ce défaut échoue avant correction : **1 FAIL / 1 PASS** ; sortie de l'erreur enregistrée dans l'Evidence R97.

## Correction minimale sans substitution de marque
Modification unique de `index.html` :
```
img-src 'self' https://raw.githubusercontent.com
```
Le contrôle ne modifie pas `default-src 'none'`, `form-action 'none'`, `base-uri 'none'`, le code des animations ni l'actif officiel AVIF. Pas de wildcard, `data:` ou script supplémentaire. Cette exception est limitée au proxy de prévisualisation et devra être réévaluée pour le domaine officiel.

## Outils Synestra réellement employés
- **Central Skills via Synestra Connect** : lecture réelle avec versions et SHA des trois skills actifs `failure-first@1.0.0` (`373c5f50`), `web-accessibility-engineering@1.0.0` (`172c4425`), `ui-ux@1.0.0` (`0a362a09`). Mode `CONTEXT_ADVISORY_ONLY` ; ne pas confondre lecture/application par l'assistant et SkillRuntime exécuté.
- **Méthode appliquée, et non simplement lue** : test du refus avant correctif, test nominal après correctif, contrôle clavier/animations accessibles, cohérence d'identité officielle et refus de la publication.
- **Synestra Bridge/Connect** : `PAIRED`, `execution_authorized=true`, commandes PC autorisées réellement exécutées sur checkout isolé (Git, Node, Python, Chrome/CDP, Web Pilot, HTTP).
- **GitHub MCP** : statut PR/HEAD, création du test, modification exacte de la CSP, relecture SHA, Evidence/Reasoning sur branche isolée.
- **Moteurs Web** : `synestra_web_visual_direction(prism)` a répondu `PASS`, mais sa palette beige/orange est **incompatible** avec le logo officiel violet/cyan/vert ; proposition non appliquée. `synestra_web_site_blueprint`, `synestra_web_change_impact`, `synestra_web_content_readiness` ont chacun répondu `Operation denied or unavailable`. **POLICY_DENIED conservé, aucun contournement et aucun second moteur.** Générer un site parallèle avec `page_scaffold` est non pertinent.
- **Visual Observer LIVE** : outils directs absents de cette conversation. Le runbook PR #302 indique un transport d'image natif non qualifié ; Chrome/CDP produit des captures mais ne remplace pas une réception multimodale de pixels par ChatGPT.
- **Memory V1, AGENTS, règles L0, décision produit Web et SAL** : consultés, aucune prétention de PASS pour des normes non vérifiées.
- **Unreal, modules pédagogiques, Supervisor, mutation Cloudflare/IAM** : pas utilisés, sans valeur pour ce correctif précis.

## Vérification et limite
- Code testé : `12d526ac77e026ade902c1c1aa841af393a4c9ab`.
- Node `107/107 PASS`, Python `15/15 PASS`, Chrome local mobile + desktop `PASS` (logo chargé aux deux emplacements, animations et reduced motion vérifiés, aucun overflow), Web Pilot 6 appels MCP `PASS` et `ADVISORY_NO_FLAGS`.
- Prévisualisation exacte à ce SHA : HTML `200` et deux références au logo ; AVIF `200` / `20 508 octets` redirigé vers `raw.githubusercontent.com` ; CSP corrigée en cohérence avec cette origine.
- **Limite de preuve** : navigation de Chrome headless Windows sur la page GitHack externe inaccessible pendant l'essai ; ne pas annoncer `PUBLIC_BROWSER_PIXEL_E2E=PASS` ou `VISUAL_OBSERVER=PASS` à partir de la preuve HTTP.
- Les captures locales restent des artefacts QA éphémères dont seules les empreintes sont retenues. Pas de déploiement public officiel, pas de merge main.

## NEXT
Le propriétaire peut ouvrir :
https://raw.githack.com/inossarum/synestra-vitrine-preview/12d526ac77e026ade902c1c1aa841af393a4c9ab/index.html

Vérifier **visuellement** la présence effective du logo officiel dans les deux emplacements sur le navigateur public. Corriger uniquement un défaut résiduel prouvé ; préparer une version de publication indépendante avec domaine, E2E réel, rollback, décision distincte du propriétaire.
