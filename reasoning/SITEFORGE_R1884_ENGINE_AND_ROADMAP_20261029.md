# SiteForge / Lab3D R188.4 — moteur de flux unifié

## Mission et point de départ
`SYN_SITEFORGE_R1884_UNIVERSAL_FLUX_20261029`, owner `inossarum`. Parent GitHub `c90565ba2c1b9ef3e387e0520cdb0a13346ecff4`, branche propre séparée `task/SYN_SITEFORGE_R1884_UNIVERSAL_FLUX_20261029`, référence R188.3 intacte. Aucune mutation `main`, ni nouveau moteur/Worker.

## Implémentation / rationale
Le lab possédait six matériaux historiques (0–5) sous une voie volumétrique, et un septième (6) avec raymarching distinct. Plusieurs contrôles `uFlowLab/uEnergyTurbulence/uEnergyMouse/uEnergyA-B` n'avaient pas d'effet sur 0–5. R188.4 propage **les commandes de flux partagées** aux deux voies : turbulence 3D bornée 0–200 %, vitesse des impulsions, densité angulaire liée au nombre 3–8, espacement, intensité des pulsations, diamètre optique, souris Oui/Non et couleurs. Le noyau `uCore` reste indépendant.

Nouveaux matériaux *dans le shader existant*, sans surface opaque : **7 — Arcs pulsés** (cisaillement harmonique local), **8 — Vortex polaire** (rotation différentielle liée à la profondeur). Le matériau 6 « Flux vivants » conserve son tressage fin et gagne une modulation interne subtile. La Brume ionique (3) reçoit un facteur d'émission 2,25 : correction failure-first d'un signal quasi absent sur la simulation mobile.

**SiteForge** dispose désormais de `siteforge-materials-r1884.json` (catalogue typé et versionné) et `siteforge-catalogue-r1884.html` (9 cartes accessibles, 1 colonne mobile), chacun ouvrant la page unique `siteforge-r1884-autonome.html?demo=energy&material=ID`. Validation stricte du paramètre URL `/^[0-8]$/` ; les ids 0–6 sont inchangés. JSON historique `synestra.siteforge.plasma-settings.v1` préservé ; aucun fetch externe.

## Résultats / tests
- Builder : `python tools/build_r1884_universal_flux.py` → SHA256 normalisé LF `3f4b14d97919d5a2d36a2f93e7b0beb8189f06f6b5dd0fe66df784c06c744439` ; hash CSP script régénéré.
- `node --test tests/siteforge_r1884_universal.test.mjs tests/siteforge_r1884_catalogue.test.mjs` = 8/8 PASS ; base R188.3 : 4/4.
- `node tests/siteforge_r1884_gpu_qa.mjs` desktop RTX3090 : 9 familles, 0 erreur WebGL, chaque changement groupé visible, minimum 7 760 pixels; 0,100,200 %, JSON export/import/ancien/invalide PASS.
- `node tests/siteforge_r1884_gpu_qa.mjs --mobile` Chrome mobile simulé 390×844 sur RTX3090 : 9 familles, minimum 3 795 pixels, 0 erreur, JSON et uniform PASS.
- `node tests/siteforge_r1884_link_e2e.mjs` Chrome RTX3090 : 9 liens profonds sélectionnent la bonne famille, WebGL ready, 0 erreur ; galerie 390px sans débordement.
- Voir `evidence/SITEFORGE_R1884_GPU_QA*.json`, `evidence/SITEFORGE_R1884_LINKS_E2E_20261029.json` et PNG familles 6,7,8. Captures sur vraie RTX3090, mobile seulement émulation.
- Limitations : le test screenshot compare des réglages **groupés**, pas l'influence visuelle isolée de chacun; l'animation interne reste temporelle et non parfaitement déterministe. Lien/catalogue n'est pas un module d'insertion commercial final. Mesure FPS/GPU temps spécifique non réalisée.

## Retours et innovations à poursuivre
1. **GPU timer réel WebGL1** via `EXT_disjoint_timer_query`, fallback sur indisponibilité, instrumentation sans appels bloquants (MDN WebGL best practices). Faire une matrice 9 familles / niveaux 0–200 / qualité sur GPU modeste physique.
2. **Curseur perturbation souris**, rayon/intensité séparés (aujourd'hui simple Oui/Non), et contrôle d'« apaisement »/récupération après impulsion, partagés sur 9 familles.
3. **Presets nommés et comparaison avant/après** à seed fixe, stockés dans le même JSON, sans nouveau broker; sauvegarde et import atomiques.
4. **Module embarquable SiteForge**, renderer singleton allowlist + paramètres de matériau ; préserver page et performance; l'actuelle galerie constitue l'entrée de bibliothèque, pas un déploiement.
5. **Champ fluide à rétroaction** en prototype optionnel, comparaison GPU et rendu artistique avant intégration; ne pas ajouter à l'aveugle des buffers VRAM.

## Retrait / rollback
R188.3 parent `c90565b` reste disponible sans patch. R188.4 en worktree dédié. Reconstruire avec les deux builders, tester, ouvrir serveur 19105. Aucune publication sur main. État local PASS; promotion publique et approbation artistique encore hors périmètre.
