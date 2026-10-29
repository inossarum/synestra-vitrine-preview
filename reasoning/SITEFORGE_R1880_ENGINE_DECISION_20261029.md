# SiteForge R188.0 — optimisation du moteur 3D énergétique (2026-10-29)

## Objectif / preuves
Reprise autonome HPSYN : améliorer le Labo et les technologies 3D à partir de R187.9, sans multiplier les effets décoratifs. Base Git exacte `949bb34b024377ac424204b31aca37d51dc74716` et HTML SHA `8b6a0f4de28cbe9c2ce8ffaee5d31fc53655c3fab398963c97828251bd83ce63`. Travail en worktree isolé, branche `task/SYN_SITEFORGE_R1880_ADAPTIVE_GPU_20261029`.

## Choix techniques (reuse-first)
1. Le shader du matériau 6 utilisait toujours `max(34.,uVolumeSteps)` malgré le menu Performance/Qualité. Le nouveau champ uniforme `uEnergySteps` est calculé depuis le contrôle existant, sans nouvelle propriété JSON. 34 (référence équilibrée), 26 bureau/24 mobile en Performance, 40 en Détaillée, 34/32 en auto à défaut de surcharge ; 30 minimum pour diamètre très fin.
2. Les trois trajectoires 3D additionnelles F/G/H étaient calculées pour toutes les scènes, même avec 3–5 flux. Une branche uniforme conditionnelle `if(flowCount>5.5)` élimine leur évaluation dans ces cas. Variables déclarées à portée externe et initialisées à zéro ; rendu avec 6–8 flux préservé.
3. Trois `Float32Array` de couleurs étaient créés à chaque frame : mise en cache par valeur hexadécimale, actualisée sur modification des commandes et avant rendu. Contrôle de couleurs indépendant inchangé.
4. Aucun nouveau Worker, moteur, broker, bibliothèque ou extension WebGL. Strict CSP SHA-256 recalculé. Trois fonctionnalités anciennes (souris, couleurs, JSON) restent invariantes.

## Failure-first, corrections et E2E
- Compilateur WebGL : erreur `onF/onG/onH undeclared` lors du premier passage ; correction de portée et réexécution.
- Régression DOM détectée : le même sélecteur `[data-energy-samples]` correspondait au conteneur 3D et au compteur. Le compteur remplaçait le canvas par du texte. Correction ciblée : `stage.dataset.energyRaySamples` distinct, sélection `output[data-energy-samples]`. Nouveau test statique et contrôle DOM pendant tous les changements de qualité. Le canvas est de nouveau présent et WebGL renvoie 0 erreur.
- 5/5 tests statiques PASS. Chrome desktop et mobile simulé PASS, qualité 4 modes et flux fins PASS, 5→8 flux, palette Or et toggle souris PASS. Bureau : changement de flux 18 533 pixels, palette 31 998. Mobile simulé : 9 927 et 17 074. Voir `evidence/SITEFORGE_R1880_STRESS*_20261029.json`, `evidence/SITEFORGE_R1880_ADAPTIVE_GPU_E2E_20261029.json` et images.
- Attention : 34→26/24 représente une baisse de budget d'intégration, **pas** une démonstration de FPS ou de puissance consommée. La télémétrie Chrome SwiftShader vaut 0.0 FPS et reste non fiable ; performance physique UNKNOWN.
- Capture `r1880-stress-eight-gold.png` inspectée visuellement : huit flux visibles, croisements encore lumineux ; pas de promotion artistique automatique.

## Inspirations vérifiées
- MDN, bonnes pratiques WebGL : https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices — limiter les opérations fragments et les allocations pendant le rendu.
- Emscripten, Optimizing WebGL : https://emscripten.org/docs/optimizing/Optimizing-WebGL — éviter les créations de ressources GL et synchronisations coûteuses dans la boucle.
- Extension de dérivées Khronos WebGL1 : https://registry.khronos.org/webgl/extensions/OES_standard_derivatives/ ; étudiée mais NON intégrée (fallback/compatibilité et impact visuel encore à qualifier).

## Rebuild / rollback
Sur la branche isolée : `python tools/build_r1880_adaptive_gpu.py` → comparer SHA à Evidence. `node --test tests/siteforge_r1880_isolation.test.mjs` (5/5). Démarrer `python -m http.server 19100 --bind 127.0.0.1 --directory <worktree>`. Lancer `node tests/siteforge_r1880_stress.mjs` puis `node tests/siteforge_r1880_stress.mjs --mobile`. Chaque cas doit vérifier `canvasPresent=true`, `webgl=0`, niveaux d'échantillons et interactions. En cas d'échec revenir au worktree R187.9 SHA `949bb34`, sans altérer les branches concurrentes. Aucun déploiement public.

## Statut / NEXT
Candidat local testé. `ART_ACCEPTANCE=PENDING`, `HARDWARE_GPU_PERF=UNKNOWN`, `PUBLIC_RELEASE=NO`. Avant promotion : revue esthétique et mesure GPU physique. Prochaine évolution pertinente : presets d'énergie nommés dans JSON, avec validation anticorruption et contrôle sécurité, seulement après conservation du rendu accepté.
