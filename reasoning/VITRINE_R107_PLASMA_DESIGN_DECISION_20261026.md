---
document_id: VITRINE_R107_PLASMA_DESIGN_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_VISUAL_VALIDATION_PENDING
tested_head: 7ac77af41acb1ea6013c85ad5c7c8800ebaa0b62
evidence: evidence/VITRINE_R107_PLASMA_CORE_ENERGY_20261026.json
---
# R107 — Recentrage Core sur l'énergie plasma

## Décision
Le propriétaire a demandé de chercher une direction **plus énergie** plutôt qu'un objet de mécanique supplémentaire. L'étude des démonstrations récentes de Codrops (GPGPU particules, metaballs fluides) et Magic Energy Bolt (arcs/filaments/bloom) mène à une couche électrique/fluide autour du réacteur R106 existant. Références de concept uniquement, ni sources copiées ni dépendances externes.

Le R107 conserve l'identité officielle R99 et les trois liens fonctionnels du Core R106. SVG procédural local : gradient d'aura, turbulence magnétique en volutes, quatre ramifications électriques en avant-plan (halo flou et tracé net), filaments centraux, particules, décharge et onde de choc. Couleurs cyan/violet/vert Synestra. Mouvement CSS à fréquences complémentaires et mise en pause si préfère réduction de mouvement. Indicateurs expressément conceptuels, aucune donnée PC/Connect live prétendue.

## Choix rejetés
WebGL, GPU particle simulation et bibliothèques Three.js sont pertinents pour une phase suivante mais ne sont pas introduits : budget FREE_ONLY, absence de test de navigateur réel/puissance disponible et nécessité du fallback. Les images de référence trouvées en ligne ne sont ni téléchargées ni intégrées dans la vitrine.

## Exécution et contrôle
Branche PR #5 DRAFT. HEAD de code `7ac77af41acb1ea6013c85ad5c7c8800ebaa0b62`, puis tests R107 ajoutés au paquet existant pour conserver l'intégralité des régressions de marque/navigation. Cloudflare Preview `e95dfa9c-715a-41f9-8b5e-f52aeadf1180` en stage success, **37/37 tests PASS**, 37 fichiers source à liste blanche, 36 assets publics et 1 règle d'entêtes. Publication production désactivée, rollback R106 `d69e75e3-4410-4697-aca1-d0f48e1bcf09` encore disponible.

## NEXT
Inspection visuelle réelle desktop/mobile, Safari et mode réduit (outil web ne peut pas lire la preview). Contrôle rendu/intensité/fps/performance ; ne pas certifier les pixels par seuls tests de structure.
FUNCTION_REPORT=PARTIAL
