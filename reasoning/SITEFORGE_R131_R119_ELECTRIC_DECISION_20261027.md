# SiteForge R131 — R119 électrique seul, décision de référence
DATE=2026-10-27
MISSION=SYN_SITEFORGE_3D_R119_ELECTRIC_FIDELITY_20261027
OWNER=Inos
BRANCH=task/SYN_SITEFORGE_3D_R119_RINGFREE_LAB_20261027
CODE_SHA=d9bd2c38b768d4b5d20ffa84e52f3b88034cd7a5
EVIDENCE=evidence/SITEFORGE_R131_R119_ELECTRIC_ONLY_20261027.json

## Décision explicite
Le propriétaire a confirmé : « Garde les effets electriques de la R119 dans le labo. Pas le nouveaux. » La fidélité R119 prime sur le précédent moteur R129. Ne charger aucun shader nouveau de plasma, aucun `siteforge-3d-pulse-geometry.js`, aucun `siteforge-3d-sphere-shaders.js`, aucun gyroscope `core-r122-gyro.js`. Conserver un canevas utilisant le moteur analytique original R119-no-rings, huit r111Arc indépendants, même cadence et mêmes valeurs par défaut. Les uniformes ajoutés ne changent pas l'aspect par défaut.

## Architecture et nuance 3D
L'ancien moteur WebGL de géométrie sphérique R129 demeure dans l'historique et ses assets préexistants, mais n'est **pas chargé** par la nouvelle page. Le R131 est une **base esthétique verrouillée**, pas encore une sphère maillée 3D validée. Ne pas annoncer de projection XYZ ou AAA vérifiée. Une adaptation sur vraie sphère 3D devra reproduire les effets R119 puis passer un contrôle de fidélité visuelle sur vrais pixels avant remplacement. Le besoin a été privilégié sans inventer une image de substitution.

## Reprise technique
Dépôt `inossarum/synestra-vitrine-preview`, branche `task/SYN_SITEFORGE_3D_R119_RINGFREE_LAB_20261027`, HEAD code `d9bd2c38b768d4b5d20ffa84e52f3b88034cd7a5`. La vitrine `index.html` est inchangée au blob `43810b6eaa878c523eb06d97542d791543765d55`. Trois fichiers fonctionnels et les tests R131 sont versionnés. Les tests de l'ancien moteur R122-R129 ont été remplacés **seulement sur cette branche isolée** pour refléter la nouvelle intention; les branches précédentes en conservent l'historique. Contrôles JS simulés et lecture des blobs PASS; **Node complet, véritable compilation GPU et capture visuelle NON exécutés**. La branche n'est pas incluse dans la règle Cloudflare Pages Preview autorisée; pas d'élargissement IAM ni de déploiement.

## Skills, risques, reprise
Skills Synestra Connect consultés : `visual-regression-testing@1.0.0#aa98fffe9149dfcc0e153f0d1b8b91f3c0a6b4ae` et `failure-first@1.0.0#373c5f508b3ef91d1ffc1fc5afec7007a643d590`; méthodes de baseline et entrée invalide appliquées personnellement, SkillRuntime non exécuté. AGENTS racine lu, Memory V1 et SAL/Runbooks courants pas entièrement attestés : SOURCE_GATE=LIMITED. Aucun coût, main, Cloudflare, secret ni ACL modifiés.

## Next
1. Exécuter Node 22 `node --test tests/vitrine_r104_products_core.test.mjs` sur un checkout correspondant au code SHA incluant cette evidence, puis la suite de build.
2. Qualifier en navigateur réel le shader sur GPU avec des captures (390/768/1440), comparer R119 originale sans anneaux avant toute modification de surface.
3. Conserver les réglages R119 et projeter plus tard ces mêmes éclairs sur une géométrie sphérique XYZ seulement si le rendu reste fidèle.
FUNCTION_REPORT=PARTIAL.
