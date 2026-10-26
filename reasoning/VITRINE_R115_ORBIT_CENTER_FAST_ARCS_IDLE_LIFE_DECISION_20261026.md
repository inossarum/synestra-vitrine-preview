---
document_id: VITRINE_R115_ORBIT_CENTER_FAST_ARCS_IDLE_LIFE_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: CLOUD_PREVIEW_45_PASS_BROWSER_VISUAL_PENDING
tested_head: 52be2a4db924f2efe2c8030024c1891c822b8113
evidence: evidence/VITRINE_R115_ORBIT_CENTER_FAST_ARCS_IDLE_LIFE_20261026.json
---
# R115 — Centrage capsules Studio, arcs plus rapides, page vivante sans interaction

## Constat sur preuve utilisateur
La capture Safari fournie après R114 montre que le noyau et les anneaux sont centrés, mais les petites capsules portent un décalage par rapport au cercle théorique. Source : le transform orbital positionne le **coin supérieur gauche** de chaque capsule sur le rayon, non son centre. Correction sur la **vraie vitrine** PR #5 et non sur un prototype.

## Décisions et périmètre
- Ajouter `translate(-50%,-50%)` au `span` de la capsule, puis le conserver explicitement **dans les deux étapes** de `@keyframes core-tools-upright` afin de maintenir le centrage pendant la contre-rotation. Aucun déplacement arbitraire des rayons ou du noyau et aucune mutation des 7 noms réels.
- Conserver huit arcs radiaux dont chaque croissance part du centre et reste à l'intérieur du masque sphérique. Évolution du shader : `cycleTime=1.85` à `1.12` seconde, `growingTip` en phase `.04-.46`, avec enveloppe de lissage existante. La cadence de dessin reste bornée à 32 ms et l'allocation GPU à 1.2 million pixels.
- Enrichir l'ambiance sur toutes les pages via le script partagé existant, sans réseau ni seconde boucle JS : 2 nappes lumineuses et 2 impulsions circulaires sur mobile (3+3 desktop) dans l'overlay `aria-hidden` à `pointer-events:none`, CSS animées indépendamment de tout événement utilisateur, en complément du champ de particules R114. Ajouter une pulsation très légère à la bordure du panneau Core. Garder les pauses onglet masqué et le mode mouvement réduit.

## Contrôles, livraison, limites
Git branch `task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024`, code commit `52be2a4db924f2efe2c8030024c1891c822b8113` après relecture de 4 fichiers. SHA GLSL FNV1a32 `40d987a4`. Prévisualisation isolée Cloudflare Pages `17ccf74e-606a-48e9-b8b8-d87a5138a042` pour le même SHA : **45/45 tests Node PASS, export statique 38 fichiers PASS, build et déploiement PASS**. Aperçu exact : https://17ccf74e.synestra-vitrine-preview.pages.dev/ . Retour version précédente : https://b68fe24b.synestra-vitrine-preview.pages.dev/ . Aucun merge sur main ; publication production désactivée.

Le navigateur externe de l'assistant renvoie « not accessible via this tool », donc aucune preuve de visual QA Safari/iOS après la correction. Le contrôle CSS/CI ne garantit pas le centrage optique sur l'appareil réel. `FUNCTION_REPORT=PARTIAL`, `VISUAL_PREVIEW_GATE=PENDING_BROWSER_VISUAL`. Prochaine action : retour propriétaire fondé sur la nouvelle capture, correctif visuel ciblé si nécessaire.
