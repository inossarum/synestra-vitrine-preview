# SiteForge R165 — Première identité visuelle du Core sur la vitrine

MISSION_ID=SYN_SITEFORGE_R165_FIRST_PROTOTYPE_FALLBACK_20261027
BASE=69bfdba281af4a4ace6c21dea17f555ec4743c4e
EVIDENCE=evidence/SITEFORGE_R165_FIRST_PROTOTYPE_FALLBACK_20261027.json

## Motif et intention
Après visualisation de R164 en capture Chrome, la sphère WebGL reflète bien la palette Synestra et garde exactement l'ancienne échelle 0,49. Un défaut restait au mode sans WebGL / prefers-reduced-motion : ancienne sphère SVG bleue et opaque, contraire au nouveau prototype.

## Décision DELTA_ONLY
Modifier seulement le fallback SVG et les éléments descriptifs du Core. Remplacer l'ancienne coque par des filaments statiques violet #53318d, vert #69dcb4, noyau #eaffff. Désigner la vitrine « PROTOTYPE / 01 ». Ne toucher ni aux moteurs WebGL R163, ni aux 18 données JSON, ni à la taille, ni aux liens produits.
Ne pas ajouter d'animation en mode mouvement réduit.

## Vérification
Échec d'abord sur R164, puis 68/68 tests Node PASS. Chrome normal desktop et mobile : glError=0, un seul canvas, échelle matrix(0.49...), 18 contrôles. Chrome reduced motion desktop et mobile : nouvelle version de secours visible, ancienne sphère absente, moteur animé désactivé. Captures versionnées.
Source Cloudflare denied dans cette session antérieure : ne pas modifier droits/IAM ni retenter le même chemin. Version Git preview seulement après fast-forward confirmé. Les URL Web Cloudflare nécessitent validation séparée.

## Rollback
Git R164 SHA 69bfdba281af4a4ace6c21dea17f555ec4743c4e. Aucun déploiement production; main inchangée. Validation esthétique propriétaire distincte des tests.
