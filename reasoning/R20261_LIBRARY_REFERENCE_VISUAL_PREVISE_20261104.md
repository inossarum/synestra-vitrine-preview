# R202.61 — PREVISE après lecture visuelle de la candidate Library
Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Owner : Synestra. Dernier rapport Evidence : evidence/R20261_ART_REFERENCE_LIBRARY_DISCOVERY_20261104.md.
Point de départ : commit de preuve 372b7f227d1549abb04f3105c4fe83a752f6c431.
Référence documentaire Git : reference/SPHERE_CANONICAL_20261029.md (blob 93e6802a3c4e894235aabcd45f1e2ace1e0fba82).

## État de preuve, limites et portée
La Bibliothèque Synestra possède une image du 29 octobre nommée « Sphère d’énergie néon cosmique.png » de 1254x1254 pixels. Son contenu VISUEL a pu être lu. Le SHA256 attendu 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881 demeure NON VÉRIFIÉ faute d'accès autorisé aux octets.
Les observations qui suivent sont une hypothèse de direction artistique, pas un verdict de fidélité ni un accord owner. Le rendu Babylon actuel a été déjà qualifié sur RTX3090 en quatre modes ; aucune nouvelle capture GPU n'a été produite dans ce delta.

## Hiérarchie des écarts visuels (provisoire)
1. P0 — Centre : le rendu possède un gros noyau facetté pastel et peu concentré, alors que l'image candidate montre un foyer quasi blanc avec forte énergie violette et des attaches radiales bien définies. Rechercher un contraste de noyau/flux par profondeur et composition, sans supprimer les facettes ni ajouter un second renderer.
2. P1 — Connexions : les six nœuds périphériques de l'image candidate sont fortement reliés au centre par des courants continus et visibles. Dans le rendu courant, certains courants semblent dilués par les voiles. Préserver 28 flux et 6 nœuds ; améliorer leur lisibilité plutôt que créer de la géométrie.
3. P2 — Coque : l'image candidate montre une sphère énergique quasi complète avec arcs lumineux cyan/vert/violet. Le rendu courant a un pourtour plus obscur et des arcs moins soutenus. Préserver la profondeur 3D réelle et les quatre modes, sans texture-écran substitutive.
4. P3 — Atmosphère : les voiles magenta actuels sont larges et traversent visuellement le centre ; la candidate sépare mieux filaments lumineux fins, espaces noirs et lueurs localisées. Éviter les réductions globales d'alpha et largeur précédemment rejetées.

## Hypothèses rejetées et sécurité
- REJECTED : amplification uniforme d'émission/palette (rapport R20261_CORE_VISUAL_FAILURE_FIRST), baisse uniforme de l'alpha et de la largeur des voiles (rapport R20261_MIST_AB_FAILED_GATES).
- REJECTED : disparition générale des voiles ou du volume R20215 ; le diagnostic 4 modes montre perte de diffusion interne ou perte d'enveloppe périphérique.
- Un nouveau shader/matériau, un masque écran, des passes supplémentaires ou un nouveau moteur sont hors périmètre en l'absence de preuve de performance et de préservation des invariants.
- Le test orbital préparé localement au tour antérieur n'a PAS été exécuté ; son appel direct a été refusé. Ne pas relancer ni détourner vers un autre outil pour obtenir le même résultat.
- Métadonnées de l'image Library ne valent pas SHA de contenu. Deux demandes de matérialisation ont échoué ; ne pas les répéter sans changement d'autorité/permissions.

## NEXT minimal autorisé
A. Préserver la candidate Library en tant que piste et le présent checkpoint Git, sans publier l'image ni la recopier par un chemin non autorisé.
B. Si une source autorisée expose réellement les octets, confirmer le SHA256 officiel AVANT de recalibrer la vision ou toute métrique. Sinon rester à l'analyse qualitative.
C. Une fois les conditions de sécurité et de source réunies, qualifier le relief 3D sous deux angles et 4 modes, tests failure-first, E2E GPU RTX3090/SwiftShader, Auto, puissance zéro, coûts GPU et stabilité des flux ; art signoff owner requis avant DONE.
D. Ne pas confondre source-only, rapport Git ou comparaison visuelle non calibrée avec tests natifs E2E.

Résumé : nouvel indice de référence récupéré, diagnostic artistique priorisé ; code R202.61, ZIP, main et déploiement inchangés.
SOURCE_GATE=LIMITED | CORPUS_FRESHNESS=CACHED_SHA_VERIFIED (skills) | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL.
