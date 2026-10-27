---
document_id: VITRINE_R110_DEPTH_ORB_DESIGN_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_NATIVE_GL_VERIFIED_BROWSER_PENDING
tested_code_head: fc4b6ff84fb30fecd83bd5526e856c613988e156
evidence: evidence/VITRINE_R110_DEPTH_ORB_NATIVE_GL_20261026.json
---
# R110 — Noyau plus élégant, profondeur et énergie lisible

## Intent et décisions
Demande propriétaire : rendre le Core R109 plus réussi, tout en maintenant l'impératif de sobriété de R108. Après consultation d'AGENTS, L0 et Memory V1 Direction Visuelle, conserver un objet central unique, de l'énergie visuelle **à l'intérieur de l'objet** et une seule orbite extérieure. Proscrire le retour aux multiples anneaux/décharges/particules R107. Palette officielle R99 bleue, cyan, violet, sans changement du logo ni des trois liens SiteForge/Connect/Bridge.

La direction créative R110 : shading sphérique 3D basé sur normales, écoulement lumineux à deux fréquences dans un matériau bleu nuit, reflets spéculaires, liseré Fresnel, un fin anneau elliptique incliné avec occlusion avant/arrière et halo discret. L'effet répond au pointeur et reste conceptualisé comme illustration, non comme télémétrie. SVG R108 conservé comme fallback.

## Sécurité, performance et alternatives
Modification du shader de la seule ressource `assets/core-r109-webgl.js`, sans dépendance WebGL externe, Three.js, service, client ou Worker supplémentaires. Fréquence de dessin plafonnée à environ 30 images/s, avec limites préexistantes de surface GPU, suspension onglet/hors champ et no-motion/fallback. Le contrôle de source a vérifié le SHA PR/branche avant mutation. Pas de merge ni de changement en production.

Alternatives rejetées : une scène WebGL complète avec pipeline 3D et modèles externes (complexité / performance), retour aux arcs électriques multiples R107 (surcharge), substitution à l'identité graphique officielle (hors périmètre).

## Preuve supplémentaire R110
Source du shader en Git et shader du contrôle graphique Mesa comparés par empreinte FNV1a32 `d2557d11` : exacte après trim. EGL 1.5 surfaceless + OpenGL ES 3.2 Mesa : shader compilé, programme lié, dessin et lecture RGBA PASS, GL_NO_ERROR. Deux surfaces d'essai 760×390 et 390×275 ont été rendues pour examiner les proportions. Le Chromium local n'expose pas WebGL même en SwiftShader : **le test GL natif ne constitue pas une validation de l'application navigateur réelle**.

Cloudflare Pages : deployment `268810ee-9976-41f2-a809-43f3ca89b71f` sur SHA `fc4b6ff84fb30fecd83bd5526e856c613988e156`, prévisualisation publiée, 38/38 Node PASS, export 38 fichiers autorisés, production désactivée et PR #5 DRAFT. Retour arrière immédiat via la prévisualisation R109 `c1734bb8-6a14-4512-bd7f-550217effe1a`.

## Limite et NEXT
Ouvrir sur vrai navigateur WebGL desktop/iPhone, vérifier couleurs/composition, mouvement, réduction d'animations et clavier puis seulement statuer sur le design et l'autorisation production. Fonctionnalité Cloudflare staging ≠ QA browser E2E.
FUNCTION_REPORT=PARTIAL
