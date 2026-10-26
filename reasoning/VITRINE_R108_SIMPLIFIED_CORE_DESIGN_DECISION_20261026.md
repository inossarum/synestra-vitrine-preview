---
document_id: VITRINE_R108_SIMPLIFIED_CORE_DESIGN_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_VISUAL_QA_PENDING
tested_source_head: b655a5aae9ef492334308f186e1e777993bb77ae
evidence: evidence/VITRINE_R108_SIMPLIFIED_CORE_PREVIEW_20261026.json
---
# R108 — Réduire la surcharge du Core

Le propriétaire constate que R107 contient trop d'effets simultanés. Après lecture ciblée des règles AGENTS/L0, mémoire V1, Reasoning/Evidence R107, skills Design System, Accessibility et Visual Regression, décision de simplifier plutôt que d'ajouter un moteur ou des effets.

## Arbitrage visuel
Conserver l'identité R99 et la palette cyan/violet. Remplacer toute la scène R107 par un unique noyau plasma, deux arcs fins et quatre points. Limiter les animations à la respiration lente et à une circulation lumineuse discrète ; accessibilité motion reduced. Trois liens simples sous le Core vers SiteForge, Connect et Bridge. Retirer la bande défilante et le second sélecteur de produits de la page, qui faisaient doublon. Les autres contenus et pages ne sont pas supprimés.

## Reuse et risque
Intervention limitée à l'accueil et aux tests associés, sans nouvelle bibliothèque, souscription ou backend. BRIDGE/Connect/cloud workers inchangés. Aucun état live simulé. Bannière officielle R99 préservée. Contrôles failure-first sur duplication des liens, identité, scripts, une seule scène, fallback. Tests historiques de marque R96/R98/R99 ajustés à la nouvelle scène sans supprimer les vérifications de l'identité.

## Preuve et limites
Déploiement Cloudflare Pages preview `09878cec-39d1-4ca7-a3c3-09a60a11a48b` au code SHA `b655a5aae9ef492334308f186e1e777993bb77ae` ; 36 tests PASS, 0 FAIL, 37 fichiers allowlistés, statut deploy success. Production disabled, PR #5 DRAFT, main inchangé. Ancienne R107 disponible comme rollback.
Pixels/Safari/mobile/E2E navigateur et performances mesurées : NON VÉRIFIÉS ; ne pas présenter les tests source comme une validation esthétique.

NEXT : validation visuelle desktop/iPhone sur la prévisualisation; si nécessaire, retouches ciblées de taille/respiration/contraste, pas d'effets supplémentaires sans justification.
FUNCTION_REPORT=PARTIAL
