---
document_id: VITRINE_R105_ADVANCED_CORE_NAVIGATION_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_VISUAL_QA_PENDING
evidence: evidence/VITRINE_R105_ADVANCED_CORE_UX_CLOUD_PREVIEW_20261026.json
tested_code_head: a63e2cb0cc1627b7db1bde35dbabfb007496e5da
---
# R105 — Core avancé et navigation orientée parcours

## Décision
Le R104 déjà publié répondait au thème, mais le propriétaire souhaite un Core plus sophistiqué ainsi qu'une navigation et des contenus mieux travaillés. Conserver l'identité R99 et l'architecture statique Cloudflare, sans nouveau serveur, JS public ni surcharge visuelle gratuite.

Le Core est désormais une chambre énergétique géométrique à trois gyroscopes et iris facetté, accompagnée de flux **illustratifs** vers SiteForge, Connect et Bridge. L'animation est désactivée selon prefers-reduced-motion et ne représente aucune télémétrie ni état opérationnel. La bannière officielle Synestra en haut de page est inchangée.

## UX, contenu et choix rejetés
Les 10 liens primaires de la navigation R104 ont été simplifiés : cinq destinations principales, un menu native details « Explorer » pour les rubriques internes et un accès pilote. Un guide « Quel projet voulez-vous faire avancer ? » présente trois choix contextualisés. Les pages Connect, Bridge, Offres possèdent un sommaire de chapitres et des exemples pédagogiques fidèles. Aucun prix, faux téléchargement Bridge, bouton de connexion locale ou prétendue capacité live. Rejet de JS pour le menu tant que la navigation native couvre le besoin ; rejet de modèle 3D/WebGL lourd pour éviter dépendances, coûts et régressions.

## Tests et récupération
Deux builds Cloudflare ont échoué dans les tests source : ajout d'un details natif et changement SiteForge direct, puis ancien test de nom de classe et regex d'espacement. Les assertions ont été corrigées en **conservant** l'exigence des cinq FAQ, du menu natif et de la structure. Structure HTML de la scène réparée et testée. Exécution finale Cloudflare **35/35 Node PASS**, liste blanche de 37 fichiers, déploiement preview `8a5e3575-8da8-4dc1-a83a-6fe96c046bee` au CODE HEAD `a63e2cb0cc1627b7db1bde35dbabfb007496e5da`. La version intermédiaire `e19350f4-d9fd-4eed-b371-56d67f395d2e` constitue un rollback immédiat. Production désactivée, main non modifié et PR #5 DRAFT.

## Limites
Pas d'inspection de pixels réels : navigateur web de consultation incapable d'ouvrir l'URL Pages et pas de capture qualifiée. Aucun E2E lecteur d'écran ni Lighthouse annoncé. Le passage en production nécessite ces vérifications et une décision propriétaire distincte.
FUNCTION_REPORT=PARTIAL
