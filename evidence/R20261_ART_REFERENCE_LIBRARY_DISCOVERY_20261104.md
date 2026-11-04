# R202.61 — Découverte ciblée de la référence artistique (Library)
Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Scope : diagnostic de provenance et lecture visuelle uniquement. Sans mutation Babylon ni déploiement.
HEAD de branche vérifié avant cette écriture : 6760e021c8088077f67d80f26145613df1ee872e.

## Référence enregistrée (autorité documentaire Git)
- ref : reference/SPHERE_CANONICAL_20261029.md, blob Git 93e6802a3c4e894235aabcd45f1e2ace1e0fba82 ;
- REFERENCE_ID=SYN_SPHERE_ART_REFERENCE_20261029 ; OWNER_ACCEPTED=YES historique ;
- image attendue : sphère_d_énergie_néon_cosmique.png, 1254 x 1254 ;
- SHA256 attendu : 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881.

## Découverte nouvelle en bibliothèque privée
- Source : Bibliothèque Synestra native, dossier /Synestra (pas le dépôt Git).
- Fichier nommé : « Sphère d’énergie néon cosmique.png ».
- Création bibliothèque : 2026-10-29T17:32:30.994404+00:00.
- Métadonnées lues : PNG, 1254 x 1254, 2329740 octets.
- Lecture visuelle réussie avec files.read(mode=image_file).
- Concordance : intitulé et dimensions correspondent à la référence documentaire ; identité cryptographique NON prouvée.
- Deux essais de files.materialize (références fichier et Library canonique) refusés : « This Project file does not have an authorized raw-byte materialization path ». Aucun accès non autorisé ni contournement.
- SHA256 des octets bruts de l'image Library : UNKNOWN. IMAGE_BINARY_VERIFIED=NO.
- Aucune image n'a été copiée dans Git ni sur le PC par cette opération.

## Comparaison qualitative avec le rendu courant, sans prétention pixel-perfect
Rendu natif existant : evidence/R20261_DEPTH_ROI_MODE0_ORIGINAL_20261104.png (SHA256 6c11b58d5593196be084b21c2ac4938c429667098c701f7c1c2502bf77a321bc). La référence Library a été affichée et examinée ; ces observations sont qualitatives et provisoires.
- Noyau : référence saturée blanc-violet, petit foyer très lumineux et connexions radiales continues ; rendu courant : masse facettée plus large, pâle, relativement opaque, cœur lumineux moins concentré.
- Connexions : référence comporte de forts arcs du centre vers les nœuds externes ; rendu courant : connexions moins lisibles près du centre.
- Enveloppe : référence comporte une couronne énergique nettement éclairée, arcs cyan/vert/violet largement visibles ; rendu courant : certaines structures périphériques plus fines et moins lumineuses.
- Plasma : référence associe fines fibres et éclats avec un fond sombre ; rendu courant : voiles magenta diffus occupant le volume et traversant le noyau.
- Les deux images n'ont ni le même cadrage ni la même taille (1254x1254 vs canvas 705x675) : aucune différence pixel, colorimétrie calibrée, métrique de fidélité ou verdict d'acceptation calculable.
- L'expérience précédente « mist-hidden » améliorait la séparation apparente des facettes mais réduisait la diffusion ; elle reste REJECTED, ne pas la promouvoir.

## Gates
- Dernier vrai E2E GPU reste le diagnostic ROI sur quatre modes du checkpoint 6760e021. Nouveau test orbital : fichier local source-only, lancement POLICY_DENIED au tour précédent, non rejoué et NON_EXECUTED.
- Priorité : obtenir les octets de la Library par un chemin autorisé, comparer leur SHA256 à la valeur attendue, puis seulement définir des seuils visuels fiables et qualifier la fidélité.
- Visual Observer spécialisé : NON_EXECUTED ; comparaison qualitative par lecture directe des deux images.
- Aucun changement de code, de ZIP, de main, de service, de quota, de sécurité ou d'exposition.
- SOURCE_GATE=LIMITED ; ART_SIGNOFF=PENDING ; FUNCTION_REPORT=PARTIAL.
