# R124 — SiteForge 3D : image de référence côte à côte et métaux à deux sources lumineuses

MISSION_ID=SYN_SITEFORGE_3D_LAB_REFERENCE_COMPARE_R124_20261026
DECISION_ID=DEC-SITEFORGE-3D-LAB-001 (conserver et développer)
DATE=2026-10-26
OWNER=SiteForge 3D / PR #5 DRAFT
CODE_SHA=1ffcc41fffa4a03505aa272c5aae4e03ac4516f9
PREVIEW=https://b05c9f96.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/

## Décision et résultat
La nouvelle interface SiteForge 3D permet de charger localement une photographie de référence (PNG, JPEG, WebP, 8 Mio maximum) et de la comparer côte à côte au moteur WebGL réel sans la téléverser. L'objet WebGL existant reçoit des reflets acier froid et ambre chaud, des paramètres bornés de roughness/warmth/exposure et un contrôle périodique des erreurs GL. Les paramètres rejoignent l'ancien export JSON, sans changement de schéma. Aucun nouveau MCP, serveur ou éditeur concurrent. La page d'accueil conserve EXACTEMENT le blob `43810b6eaa878c523eb06d97542d791543765d55`, donc le Core électrique n'a pas été remplacé.

## Preuves
GitHub HEAD code `1ffcc41fffa4a03505aa272c5aae4e03ac4516f9` relu avant documentation. Cloudflare Pages Preview `b05c9f96-0f7e-4c5d-a27c-3ee586f785d0` : SUCCESS, 50/50 tests Node PASS, export PASS (41 fichiers), SHA correspondant. Premier build : une assertion héritée imposait l'ancien titre « Core R122 — Laboratoire 3D isolé » ; corrigée sans modifier le rendu. L'atelier R124 n'a pas fait l'objet d'une capture GPU ou QA iPhone depuis un navigateur autorisé : GPU / PIXEL / VISUAL_GATE = PENDING, et il est interdit de déclarer une fidélité à l'image synthétique générée.

## Position de qualité
Un visuel photoréaliste image_gen n'est pas un modèle 3D animé. Une image 2D n'expose pas la topologie arrière, les matériaux physiques ni l'éclairage, donc une reconstruction est un processus manuel/art-direction et validation. R124 facilite la comparaison et rend des reflets paramétrables, mais n'est pas encore une reconstruction fidèle. Conserver l'objectif sans recourir à une fausse vidéo ou à un PNG présenté comme rendu GPU.

## Contrôles / suite
FREE_ONLY, NO_DIRECT_MAIN, noindex, CSP pas de réseau externe; import image local, dimension et MIME validés, révocation URL. Prochain delta conditionné par une vraie revue visuelle WebGL dans un navigateur cible. Si WebGL indisponible, continuer seulement des mesures de contexte et fallback, ne pas prétendre au GPU. Rollback par revert non destructif vers R123 `2210c81ebc3ac82f2afdda148b9ac65b8331818c`.
