---
document_id: VITRINE_R113_COMPACT_ORBITAL_RADIAL_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_CLOUDFLARE_SUCCESS_VISUAL_QA_PENDING
tested_head: 5cd37181a6b396bed1997c78bc75770e3939cd1b
evidence: evidence/VITRINE_R113_COMPACT_ORBITAL_RADIAL_20261026.json
---
# R113 — Noyau compact, satellites Studio, arcs électriques centrifuges

La demande explicite est de réduire encore le Core de R112, d'entourer la sphère d'outils du Studio en orbite et d'intensifier les décharges qui naissent au centre et se propagent vers la périphérie. La branche de travail de PR #5 est réutilisée ; aucune autre vitrine ni nouveau moteur d'animation n'est créé.

## Décisions
- CSS WebGL et fallback SVG sont réduits de `.77` à `.62` autour du centre, sans toucher au titre, aux trois vrais liens SiteForge/Connect/Bridge ni au texte de la vitrine.
- Sept capsules portant des noms de composants connus tournent en anneau avec contre-rotation de leur libellé. Leur rendu est **conceptuel**, sans faux état temps réel. Elles ne capturent ni clic ni focus ; les trois liens produit existants restent l'unique navigation de ce Core. La variante mobile limite le rayon de l'orbite, le mode de mouvement réduit arrête la rotation.
- Le shader WebGL existant conserve sa boucle RAF et ses limites de surface/fréquence, sans dépendance supplémentaire. Cinq canaux utilisent une orientation pseudo-aléatoire et un front radial croissant depuis la région centrale jusqu'à `growingTip=.675` pour un rayon sphérique de `.69`, avec ramifications faibles et luminescence augmentée. La contribution reste à l'intérieur de la frontière de sphère. Les arcs sont des effets conceptuels, pas une mesure ou un état réel.
- Les tests anciens du fragment ont été remis à jour au nouveau fingerprint `bda133fc`; deux assertions fonctionnelles testent radialité, compte de canaux, sept capsules, liens, responsive et mouvement réduit.

## Preuves, incident et récupération
Le commit fonctionnel atomique est `3ff844ae162e5c67170ab98e290e40ce681b15c2` (3 fichiers), relu. Le premier Cloudflare Preview `9caf600a` échoue sur une expression régulière suréchappée **dans le test ajouté**. Correction limitée au fichier de tests par commit `5cd37181a6b396bed1997c78bc75770e3939cd1b`. Le déploiement de prévisualisation Cloudflare `14668546-eb48-43eb-899a-bed75df26713` pour ce SHA atteste build et déploiement PASS : **41 tests PASS, 0 FAIL, export statique 38 assets PASS**, production délibérément désactivée.

Lien de prévisualisation exact : https://14668546.synestra-vitrine-preview.pages.dev/ . La navigation web externe n'a pu charger cette URL et aucun E2E navigateur/inspection pixel sur Safari/iPhone n'est attesté. `FUNCTION_REPORT=PARTIAL`, `VISUAL_PREVIEW_GATE=PENDING_BROWSER_VISUAL`, `SOURCE_GATE=LIMITED` ; l'outil de bootstrap Studio a expiré. Rollback preview : déploiement antérieur `b5ee883f-f888-4957-bae8-6b73069efe75`. Ne pas fusionner ni déployer en production sans approbation.
