---
document_id: VITRINE_R111_RANDOM_ARCS_AMBIENT_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_PUBLISHED_NATIVE_GL_PASS_BROWSER_E2E_PENDING
tested_head: 2a8840e240963623a9cc8267091181d224f7ba38
evidence: evidence/VITRINE_R111_RANDOM_ARCS_AMBIENT_20261026.json
---
# R111 — Étincelles organiques dans le Core, ambiance vivante du site

## Arbitrage
Le propriétaire demande plus d'arcs électriques qui apparaissent et disparaissent de manière aléatoire **dans la sphère**, et des événements discrets en arrière-plan de toutes les pages. Préserver la sobriété R108 et le Core 3D R110 : pas de nouveaux anneaux ni de réseau de décharges extérieures. Respecter la direction visuelle Synestra validée (noir/bleu nuit, cyan-violet contrôlé, lisibilité, pas de faux états).

## Implémentation
Dans le shader WebGL existant : fonction `r111Arc`, trois circuits indépendants activés selon des graines pseudo-aléatoires par période (~2,05 s), angles et décalages changeants, enveloppe d'apparition puis extinction progressive. Les contributions sont ajoutées **après** le test de la frontière sphérique. Le matériau et l'orbite R110 sont conservés.

Dans le même JS, avant l'early return WebGL : `startAmbient` construit une couche DOM non interactive et aria-hidden de 25 points desktop / 14 mobiles, dont quelques lueurs brèves, mouvements/délais variés, pause quand l'onglet est caché. CSS partagé avec les trois pages produit ; deux halos lentement changeants. CSP product-pages élargie strictement à `script-src 'self'`, sans appels réseau ni télémétrie. Le SVG de repli et `prefers-reduced-motion` sont préservés. Aucune nouvelle bibliothèque, service ou coût connu.

## Exécution et preuve
PR #5 DRAFT sous contrôle de SHA, production désactivée. Cloudflare Pages déploiement `1960b289-cb01-4162-a5ff-cf9e4d4b6ed9`, source `2a8840e240963623a9cc8267091181d224f7ba38`, **40 tests PASS / 0 FAIL**, 38 fichiers statiques autorisés. Test source et native EGL OpenGL ES Mesa : GLSL FNV1a32 `cd66a4ce` correspondant au Git, shader compile/link/draw/readback PASS (GL_NO_ERROR). Quatre captures à 0.7, 2.1, 3.8, 6.9 s montrent un contenu lumineux temporellement différent. Fichier local QA `/mnt/data/r110qa/core-r111-electric-arcs-qa.png`, SHA256 `1c7ae04eb3ca16442c8e36cdd718d9fa4611c06d90daacc7e01c171bdecefb1c`, non enregistré comme binaire Git.

## Limites, rollback et NEXT
La compilation et les pixels natifs ne prouvent pas le fonctionnement complet en navigateur WebGL, ni l'intégration visuelle du fond sur Safari ou l'ensemble des pages. Statut `PENDING_BROWSER_E2E`. Version R110 intacte : `https://268810ee.synestra-vitrine-preview.pages.dev`. Pas de merge sur main, aucune production changée.
NEXT : capturer l'accueil et les trois pages sur bureau/mobile depuis un navigateur autorisé, vérifier lisibilité, rythme des arcs, fond et mode mouvement réduit, puis itérer sur preuve réelle seulement.
FUNCTION_REPORT=PARTIAL
