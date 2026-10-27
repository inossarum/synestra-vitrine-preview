# SiteForge 3D Lab — capacité conservée et feuille de route (R123)

MISSION_ID=SYN_SITEFORGE_3D_LAB_CAPABILITY_20261026
DECISION_ID=DEC-SITEFORGE-3D-LAB-001
DATE=2026-10-26
OWNER=SiteForge / Synestra Studio
STATUS=APPROVED_TO_KEEP_AND_DEVELOP; QUALITY_GATE=PENDING
SOURCE_REPO=inossarum/synestra-vitrine-preview
HEAD_CODE_SHA=5de53989dfc693fd70c8b85d2601e20a47af564c
BRANCH=task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024
PREVIEW=https://92a95fc5.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/

## Décision utilisateur
L'utilisateur a explicitement demandé de **conserver le laboratoire 3D R122 et de le développer comme outil de création de sites web**. Ne plus le supprimer après le chantier Core, ne pas le réduire à un prototype sans suite. Réutiliser ce composant dans les futurs projets SiteForge via la pile existante et les sources vérifiées. Aucune création de nouvel app, serveur, MCP, bridge, identité, SaaS ou service séparé. Cette décision concerne le **dépôt vitrine/SiteForge**, et ne constitue pas une écriture avérée dans la Memory V1 du Studio central (MANQUANTE).

## État exécuté — R123
Le moteur natif WebGL historique `assets/core-r122-gyro.js` conserve les trois anneaux à maillage réel (144 segments × huit facettes chanfreinées) et le depth mask de la sphère. R123 ajoute une API de configuration bornée `window.SynestraSiteForge3D` (snapshot / configure / reset), édition en direct de largeur, épaisseur, vitesse, orientation yaw/pitch, matériaux acier/graphite/or, pause, status GPU et import/export JSON local; interface `siteforge/core-3d-lab/index.html` + `assets/siteforge-3d-editor.js`. La configuration exportée porte `schema: synestra.siteforge.3d-preset.v1`. Import taille plafonnée à 16 Ko, champs numériques bornés, finition par allowlist. Pas de télémétrie, pas d'écriture de compte, pas de CDN. Reduced-motion donne un aperçu fixe et les réglages/export restent utilisables. Le Core R121 en accueil reste strictement identique au blob `43810b6eaa878c523eb06d97542d791543765d55` et à son shader.

Tests Cloudflare Preview: 49/49 PASS ; export statique 41 fichiers PASS ; déploiement `92a95fc5-9215-4edc-a1c6-a1d6c4d8267c` SUCCESS ; code SHA `5de53989dfc693fd70c8b85d2601e20a47af564c`. Tests fonctionnels de l'API effectués sous Node VM pour le cas WebGL indisponible (clamps, reset, refus champs inconnus) ; exécution GPU dans vrai navigateur reste NON PROUVÉE. Le contexte Chromium de la session n'offre pas de WebGL; l'ouverture HTTP directe de l'URL depuis le container a échoué par absence de DNS. Ne jamais assimiler BUILD PASS et qualité visuelle PASS.

## Développement prioritaire — sans doublons
1. **Qualité 3D** : vérifier dans navigateur GPU sur 390×844 et 1440×900; diagnostiquer shader, normals, depth, pointer, performance FPS et accessibilité. Ne pas promettre un rendu photoréaliste avant captures acceptées.
2. **Scène éditable** : presets nommés, éclairages orientables, roughness/métal, arrière-plan, décharges volumétriques, effets optionnels et réglage performance. Garder un fallback SVG/2D clair.
3. **Réutilisation SiteForge** : découpler le rendu du plasma R121 pour accepter d'autres objets/éléments de sites, empaqueter une intégration locale accessible, vérifier API versionnée, CSS sans fuite et imports/exports compatibles.
4. **Pipeline d'image de référence** : importer une image comme référence artistique, définir par matériau/géométrie/éclairage les éléments équivalents, animer séparément rotation, lumière, énergie et particules; vérifier un rendu réel comparé à l'image. Une photo 2D ne révèle pas de manière unique ses surfaces cachées : pas de conversion 3D exacte et automatique annoncée.
5. **Validation produit** : captures réelles et accord visuel avant intégration au Core principal, documentation de rollback et budget GPU/mobile. FREE_ONLY, NO_MAIN_MUTATION, aucune activation PAYG.

## Alternatives écartées et conditions de réouverture
- Régénérer une photo 2D et la prétendre 3D : non.
- Utiliser un nouveau service WebGL commercial/pay-as-you-go : refus FREE_ONLY.
- Remplacer immédiatement le Core sur l'accueil : refus tant que VISUAL_GATE n'est pas PASS.
- Implémenter un nouvel éditeur/siteforge concurrent : préférer le composant existant.

## Prochain pas exécutable
Tester le laboratoire sur un navigateur WebGL réel avec status GPU visible et capture du rendu dynamique; si GPU indisponible, recueillir seulement l'état de fallback, préserver la scène fonctionnelle et ne pas annoncer DONE visuel.
