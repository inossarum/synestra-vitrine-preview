---
document_id: VITRINE_R114_RETINA_IDLE_MOTION_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: CLOUD_PREVIEW_PASS_MOBILE_VISUAL_REVIEW_PENDING
tested_head: d28c39a669032e87bfcd507797146e62798d8fbf
evidence: evidence/VITRINE_R114_RETINA_IDLE_MOTION_20261026.json
---
# R114 — Core plus petit, rendu plus net, décharges et atmosphère autonomes

Décision propriétaire : à partir de la version R113 acceptée, diminuer légèrement le noyau, monter la densité de rendu et le nombre d'arcs centre→bord, ajouter des événements d'ambiance sur la vitrine **même sans activité de souris**. Réutilisation exclusive de la vraie vitrine PR #5 ; aucune démo indépendante ni nouvelle boucle JS.

## Delta appliqué
- SVG fallback et Canvas WebGL dans `index.html` passent de `scale(.62)` à `scale(.57)`, sans toucher à l'identité R99, aux liens ou aux sept outils orbitaux R113.
- Taille de framebuffer WebGL en `assets/core-r109-webgl.js` : DPR plafonné à 1.8 mobile (<650px), 2 ordinateur, et 1,200,000 pixels, au lieu de DPR 1.5/800,000 pixels. La fréquence de rafraîchissement est conservée (~30 FPS guard 32 ms), ainsi que le `powerPreference:'low-power'`, la visibilité d'onglet et l'intersection observer existants.
- Le même GLSL conserve ses fronts radiaux `r111Arc`, étendus de cinq à **huit** arcs indépendants (`arcA` à `arcH`), sous la limite physique de la sphère. Fingerprint source shader `fa9a2ccc` ; **pas** de preuve de compilation native GPU de ce nouveau fragment.
- Un unique champ d'ambiance ARIA-hidden est étendu à 38 éléments desktop ou 22 mobiles, avec traînées intermittentes `.syn-ambient-comet` en plus des scintillements et halos. Les mêmes styles existent sur la page d'accueil et les trois pages produit. L'animation ne dépend pas d'événements d'entrée utilisateur ; elle tourne sans interaction tant que la page est visible. Visibilité et `prefers-reduced-motion` stoppent ou cachent les animations.

## Test et récupération
Commit atomique de quatre fichiers `3e71e5693827384e2178d75521a6c4016392f69e` ; diff et lecture retour Git SHA PASS. Premier build preview `4d2a87d1` FAIL 41/42, car un ancien test R109 exigeait encore `800000`. Corrigé **uniquement** l'assertion historique au commit `d28c39a669032e87bfcd507797146e62798d8fbf`, aucune modification de rendu après ce correctif. Cloudflare Pages a publié `https://b68fe24b.synestra-vitrine-preview.pages.dev/` sur le SHA exact `d28c39a669032e87bfcd507797146e62798d8fbf` : **42/42 tests Node PASS, static export PASS 38 fichiers, deploy success**. Previous preview `14668546-eb48-43eb-899a-bed75df26713` disponible comme retour sans mutation de production.

## Limites et prochaine action
Le navigateur externe du modèle ne peut ouvrir la page Cloudflare. Aucun contrôle direct pixel/animation sur Safari iOS, benchmark GPU, WebGL E2E ou rapport CWV/WCAG n'est revendiqué ; `VISUAL_PREVIEW_GATE=PENDING_BROWSER_VISUAL`. L'utilisateur peut ouvrir le preview fourni pour valider le rendu. PR toujours DRAFT, `main` et production non modifiées, `FUNCTION_REPORT=PARTIAL`.
