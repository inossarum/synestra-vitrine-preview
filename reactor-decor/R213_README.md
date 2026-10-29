# Synestra R213 — Salle de réacteur fermée

**Livrable : décor Blender/Babylon.js uniquement.** Aucun noyau, filament relié ou moteur supplémentaire. Le Core est exclusivement injecté par le Labo 3D au repère `CORE_SOCKET`.

## Différence réelle avec R212

- Toit fermé et 24 panneaux latéraux raccordés aux murs arrière.
- Paroi côté caméra à l'intérieur de la salle (fermeture physique, jamais un arrière-plan 2D).
- 10 segments d'étanchéité arrière + renforts de plafond.
- Porte de maintenance arrière, consoles, grilles, indicateurs et éclairages techniques.
- Matériaux PBR, trois images embarquées dans le GLB, arcs du plafond et socle conservés.
- Générateur reproductible `build_reactor_r213.py` (Blender 5.2.2) ; production `r213-dist/`.

## Vérification

`node --test qa/r213-closure-contract.test.mjs` : 3/3 PASS ; nombre de maillages et fermeture contrôlés via l'analyse effective du GLB.

`node qa/browser-r213.mjs` sous Inos-Cerebros, Chrome WebGL réel sur l'export glTF R213 :
622 meshes importés, 1 Engine/Scene/Canvas, 0 sphère, `CORE_SOCKET` présent, qualité Ultra→Économie, capture desktop 1440×900 et mobile 390×844, pas de débordement, 0 exception, Core externe préservé au démontage. Mesure FPS du pilote de test en mode Économie uniquement : **non transposable sans précaution aux GPU physiques modestes**.

Les captures et JSON sont dans `r213-evidence/`. Le pilote Babylon 9.33 d'Atlas #360 a été utilisé **sans créer un deuxième moteur en production**. Pour la compatibilité du démonstrateur Atlas R212, le serveur QA expose temporairement le GLB R213 sous le nom d'asset R212 et la compatibilité du schéma dans un fichier statique de test ; l'artefact canonique conserve `synestra.atlas.babylon.decor.r213.v1`.

## Qualité et risques

C'est un progrès architecture et fermeture, pas une reproduction photoréaliste fidèle. Les murs métalliques restent uniformes et la lumière/brume sont perfectibles. Le fichier contient 624 maillages côté Blender ; travail futur : optimisation par instances/LOD des panneaux et validation PC modeste physique. Aucune production ni accès public modifiés. `FREE_ONLY`.

## Références

- Parent : SiteForge PR #20 R212 commit `0e22c8b780addf86e9299511468de36d50a5245b`.
- Atlas Babylon : Studio PR #360 commit `36aef098498c82c3a1c062f495171b8daabc703f`.
- Test navigateur R213 : `qa/browser-r213.mjs`.
- Retour arrière : conserver PR R212 ; ne pas merger cette branche si validation visuelle insuffisante.
