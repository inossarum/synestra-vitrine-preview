---
document_id: VITRINE_R116_THREE_PRODUCTS_CLEAN_CORE_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_46_46_BROWSER_VISUAL_PENDING
tested_head: b602b60755bd31e3645045116ef2f0946c48c712
evidence: evidence/VITRINE_R116_THREE_REAL_PRODUCTS_CLEAN_CORE_20261026.json
---
# R116 — Noyau épuré, trois véritables produits seulement

Le propriétaire trouve le Core encore trop gros et brouillon. Périmètre explicite : réduire le diamètre apparent du noyau et conserver seulement trois capsules orbitales portant les vrais produits Connect, Bridge, SiteForge, avec logos officiels **seulement si disponibles et vérifiés**.

## Analyse et décisions
- La source de référence reste `inossarum/synestra-vitrine-preview`, PR #5 et sa branche dédiée. Les pages Connect/Bridge/SiteForge examinées ne contiennent pas de logo propre confirmé (seule marque de l'en-tête Synestra est référencée dans Connect/Bridge). Les recherches ciblées de logo officiel n'ont pas fourni d'actif attribuable. Les noms des trois produits ont été conservés sans forger ni attribuer faussement un logo.
- CSS WebGL et SVG fallback : échelle `.57 → .49`, centre conservé. Capsules exclusivement Connect, Bridge, SiteForge, réparties à 120° sur un unique parcours orbital lent de 55 s ; labels centrés et anti-rotation, mobile et reduced-motion maintenus.
- Core : suppression du deuxième anneau elliptique dans le SVG et d'une lueur parasite ; shader rendu plus sobre par baisse du bloom de l'orbite, des courants de surface, du bruit violet et des spéculaires. Ajout d'une source lumineuse subtile au centre pour donner une origine cohérente aux huit filaments radiaux rapides. Pas de seconde boucle d'animation, de dépendance ni de réseau.

## Vérification, incident, limites
Le blocage précédent était un refus d'une grosse exécution de code avant toute écriture GitHub ; son origine précise n'était pas établie. La branche était intacte. Lors de la nouvelle tentative, trois blobs Git ont été produits par opérations bornées, puis tree, commit et update_ref sous contrôle HEAD, **sans changement de sécurité ou ACL**. Git commit code `b602b60755bd31e3645045116ef2f0946c48c712` confirmé par lecture retour. Déploiement Cloudflare Pages preview `10d72a08-1688-4899-bb0e-ecb1fa377fa8` : stage **success**, 46/46 tests Node PASS, export statique 38 fichiers PASS, `main` et production inchangés.

Aperçu exact : https://10d72a08.synestra-vitrine-preview.pages.dev/ . Retour version précédente : https://17ccf74e.synestra-vitrine-preview.pages.dev/ . Aucune inspection réelle Safari iPhone, capture de pixels, compilation native du shader ou benchmark GPU sur cette révision n'est attestée : `VISUAL_PREVIEW_GATE=PENDING_BROWSER_VISUAL`. `FUNCTION_REPORT=PARTIAL` au sens E2E, livraison preview prouvée.
