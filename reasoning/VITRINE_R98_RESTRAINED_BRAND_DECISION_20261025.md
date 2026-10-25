---
document_id: VITRINE_R98_RESTRAINED_BRAND_DECISION_20261025
document_type: REASONING
status: ACTIVE_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
test_head: e728f6aa585020a64717dd37b5cb1614f122f69e
evidence: evidence/VITRINE_R98_RESTRAINED_OFFICIAL_LOGO_20261025.json
release_gate: HOLD
---

# R98 — Correction de l'identité visuelle à partir des captures du propriétaire

## Observation et demande
Le propriétaire a envoyé des captures montrant l'emblème de Synestra tronqué dans l'en-tête et une présentation centrale trop flash, incongrue avec le système bleu nuit/acier de la vitrine. Il exige une signature **plus sobre, premium et cohérente**, sans altération du logo officiel validé.

## Origine prouvée
La version R97 utilisait dans l'en-tête un conteneur `brand-mark` de 53 × 55 pixels avec `overflow:hidden` et une image de 75 × 75 pixels décalée en absolu. L'image officielle carrée comportant déjà son propre lettrage, le site lui ajoutait « SYNESTRA / STUDIO NUMÉRIQUE » à côté. Dans la scène centrale, le logo était affiché en 202 × 202 pixels non désaturé, et animé par `logo-buoyancy`.

## Décision de composition
- **En-tête :** marque typographique lisible `SYNESTRA / STUDIO NUMÉRIQUE` sans image recadrée ni doublon de signature.
- **Scène centrale :** préserver le logo officiel complet `assets/synestra-studio-official-v1.avif`, sans crop, `object-fit:contain`, avec `brightness(.72) saturate(.58)`, opacité .91 et sans animation de logo ; disque et halo atténués.
- **Identité :** conserver le fond bleu nuit, les accents violet/cyan/vert mais réduire leur concurrence visuelle avec l'emblème chromé.
- Les animations non critiques des orbites, Connect, lignes de narration restent en place et les réductions de mouvement restent respectées.
- Aucune nouvelle version du logo n'est créée ; le PNG original en bibliothèque et son dérivé AVIF n'ont pas changé.

## Qualification failure-first
Test nouveau `tests/vitrine_r98_brand_restraint.test.mjs` : **3/3 FAIL sur l'ancien HEAD** `3e1fe83aac1f98033ddf39df36488375b8bdf2cf`. Les trois attentes négatives correspondent directement à l'observation du propriétaire : crop, éclat/mouvement et doublon.

Sur HEAD `e728f6aa585020a64717dd37b5cb1614f122f69e` :
- **Node 110/110 PASS**, Python 15/15 PASS ;
- **Chrome mobile 320, 390, tablette 768, ordinateur 1440 et 1920 pixels PASS** : aucun débordement, en-tête sans image, signature textuelle présente, image centrale décodée, `brightness(0.72) saturate(0.58)`, `animationName=none`, dimensions du logo respectées, navigation clavier/FAQ et `prefers-reduced-motion` PASS ;
- Web Pilot local : **6 appels MCP PASS**, `ADVISORY_NO_FLAGS` ;
- Prévisualisation publique GitHack au SHA exact : HTML HTTP 200, une référence à l'AVIF, ressource image HTTP 200 (20 508 octets), politique CSP existante préservée.

Les captures de rendu sont réellement produites localement, avec les SHA256 des cinq vues enregistrés dans Evidence. **La réception native de ces pixels par ChatGPT via Visual Observer n'est pas attestée** : aucun PASS esthétique autonome ne peut être affirmé. La preuve de la correction du crop est structurelle et navigateur calculée ; la validation artistique finale reste au propriétaire.

## Risques et alternatives rejetées
- Recadrer ou régénérer le logo approuvé pour créer un nouveau pictogramme compact : rejeté, car cela reviendrait à réinterpréter la marque sans décision.
- Augmenter le halo/le chrome pour « intégrer » : rejeté, car contredit précisément le retour du propriétaire.
- Supprimer toute animation de la vitrine : rejeté, le mouvement est apprécié en dehors du logo.
- Compter sur un test local `file://` comme preuve publique : rejeté ; R97 a justement corrigé un défaut de prévisualisation externe.
- Publier officiellement ou fusionner directement `main` : interdiction conservée.

## Durabilité et NEXT
- Evidence : `evidence/VITRINE_R98_RESTRAINED_OFFICIAL_LOGO_20261025.json`, blob `3c081d511e56ef214c9974a1659724d70e13d47d`.
- Lien immuable : https://raw.githack.com/inossarum/synestra-vitrine-preview/e728f6aa585020a64717dd37b5cb1614f122f69e/index.html
- Rollback sur PR #5 : revert ciblé R98, puis rejouer tests Node/Python/Chrome. Asset logo intact.
- **NEXT** : visionner cette version dans le navigateur du propriétaire ; n'ajuster que les écarts visuels observés et garder la publication en `HOLD` jusqu'à approbation distincte.
