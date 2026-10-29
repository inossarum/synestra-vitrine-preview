# SiteForge R188.3 — turbulence jusqu'à 200 % et suite technologique

## Périmètre / autorisations
Mission `SYN_SITEFORGE_R1883_TURBULENCE_200_20261029`. Base GitHub vérifiée : `71278f3e1eb2b8f13bafe5d105e12ccb9c7a425f`, branche `task/SYN_SITEFORGE_R1882_LIVE_TURBULENCE_20261029`. Branche cible `task/SYN_SITEFORGE_R1883_TURBULENCE_200_20261029` réservée sur GitHub avant tout changement. Aucun changement `main`, worker, Bridge ou permission.

## Implémentation
Le curseur `sf-energyTurbulence` va désormais de 0 à **200 %**, par pas 1 %, défaut 35. L'uniform shader est conservé `Number(value)/100` pour rendre 100 % strictement identique à l'ancien niveau R188.2. La limite shader est `clamp(uEnergyTurbulence,0.,2.)`; amplitude `q.xy += shear*(energyEddy*.027)` devient deux fois l'ancienne à 200 %. Les filaments restent volumétriques ; aucune section de tube opaque ou sprite supplémentaire. JSON v1 accepte les entiers 0..200 et rejette 201 avant mutation.

## Validation
Builder source: `python tools/build_r1883_turbulence_200.py` → SHA256 normalisé LF `942e587b7d4e18bc33b75cc2083cd5b6df37d3efa9b2cfab1583ca23167d9061`. Nouvelle suite `node --test tests/siteforge_r1883_isolation.test.mjs` 4/4 PASS. Chrome RTX3090 réel (ANGLE D3D11) en bureau et mobile simulé : **PASS** pour 0/100/200, uniforms GPU 0/1/2, sortie écran, export JSON 200, JSON historique sans `energyDynamics` restauré à 35, 201 rejeté atomiquement en préservant 91, import 200 réussi. Différence visuelle des captures 100→200 : ~40 795 pixels bureau et ~21 222 mobile simulé. Attention : le temps d'animation reste mouvant entre deux captures ; ce chiffre **ne prouve pas** l'effet isolé de 200 %, seuls les tests de contrôles/uniforms le prouvent exactement. Deux captures réelles bureau 100/200 inspectées.

Une commande composite de lancement serveur a été refusée, le lancement simple documenté sur localhost est autorisé et effectué. Aucun refus contourné par élévation ou désactivation de contrôle.

## Innovations — ordre de livraison
1. **R188.4 Instrumentation GPU** : `EXT_disjoint_timer_query` WebGL1 réellement disponible sur Chrome RTX3090 : méthode non bloquante début/fin de passe, résultats différés, test d'indisponibilité extension, tolérance aux GPU_DISJOINT ; ne jamais comparer des temps de `requestAnimationFrame` au temps GPU.
2. **R188.5 Presets intelligents** : enregistrer/sauvegarder des configurations (Noyau, Ondes, Arc, Tressage) avec seed/version, sans démultiplier les effets ni les onglets. Partage JSON validé ; migrateur rétrocompatible et galerie.
3. **R188.6 Champ fluide avec rétroaction** : prototype `ping-pong` render targets comme Three.js GPUComputationRenderer (référence technique, **sans importer un deuxième moteur**), simuler advection/vorticité faible et préserver l'apparence raymarching actuelle. Mettre derrière option OFF, prouver qualité et performance sur petites machines.
4. **SiteForge productisation** : registre unique de matériaux, composants paramétriques partageables, mini-pages intégrant le noyau, presets responsive, qualité automatique conditionnée au timer réel. Aucun serveur nouveau, rester FREE_ONLY.
5. **WebGPU seulement expérimental** : backend sous feature flag, progressive enhancement ; WebGL1/2 comme chemin fiable pour navigateurs non compatibles.

Références techniques consultées : https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query/ ; https://threejs.org/docs/pages/GPUComputationRenderer.html ; https://typeshade.dev/guide/examples/domain-warp/ ; https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API .

## Reprise
Comparer le commit GitHub distant à l'état local, vérifier le SHA HTML normalisé et les rapports `evidence/SITEFORGE_R1883_GPU_QA*_20261029.json`. R188.2 reste intact. Avant promotion publique, qualification esthétique finale sur le rendu en mouvement. Ne pas inventer de gain FPS ou de validation mobile physique.
