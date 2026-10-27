# R122 — laboratoire de maillage 3D réel, sans toucher la vitrine
MISSION_ID=SYN_VITRINE_R122_REAL_MESH_LAB_20261026
CODE_SHA=776fb9b29329885d1e0d1151b4e1f0f5937619d4
LAB_URL=https://539836a7.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/
DEPLOYMENT_ID=539836a7-5540-4867-9173-1ceab1758b8d

## Contexte déterminant
L'utilisateur a rejeté plusieurs tentatives shader/WebGL simulant des anneaux plats et une sphère électrique dégradée. La restauration R121 a remis la sphère originale (huit arcs) et son fallback. R119 existe toujours mais réintroduirait les anneaux plats. Ne pas écraser R121 avec un nouvel effet avant validation visuelle réelle.

## Delta exécuté
Ajout d'un module WebGL natif autonome assets/core-r122-gyro.js, avec trois maillages polygonaux annulaires extrudés et chanfreinés (144 segments, 8 facettes de section, normales calculées). Rotation indépendante par base locale et Rodrigues. Le depth buffer d'une sphère invisible masque les faces arrière, la sphère d'énergie originale reste dessinée sur sa propre toile. Stage de test dans siteforge/core-3d-lab/index.html, qui n'est lié à aucune navigation publique et expose explicitement le statut de laboratoire. Pas de nouvelle dépendance, pas de CDN, pas de télémétrie, ni de publication production. index.html et shader R121 ont été re-vérifiés inchangés.

## Validation et limites
Cloudflare Pages Preview déploiement 539836a7-5540-4867-9173-1ceab1758b8d : SUCCESS, code SHA 776fb9b29329885d1e0d1151b4e1f0f5937619d4, 48/48 tests Node PASS, export 40 fichiers. Le premier build a échoué sur une assertion syntaxique de test, ensuite corrigée; **le module de rendu n'a pas été modifié par ce correctif**. Chromium local refuse getContext('webgl') dans les quatre configurations ANGLE/SwiftShader essayées, pas de pixels GPU observables. Desktop Commander PCs hors ligne au contrôle. La récupération publique de la nouvelle URL via un outil web a échoué. WEB_VISUAL_GATE=PENDING, GPU_E2E=PENDING, pas de faux DONE visuel.

## Alternatives rejetées
- Injection immédiate sur la page d'accueil: risque élevé de régression esthétique.
- Fusion/push main : non autorisé.
- Cloudflare Browser Rendering sans budget vérifié : plan payant potentiellement facturable, FREE_ONLY.
- Prendre image_gen pour résultat WebGL : image statique != scène GPU opérationnelle.

## Première action suivante
Inspecter réellement le lab sur appareil compatible WebGL (390x844 et 1440x900), tester la condition reduced-motion, contrôler le GPU et les normales, puis améliorer métallisation/éclairage après preuves visuelles. Sans navigateur autorisé, conserver le laboratoire hors parcours principal. Ne pas modifier le Core public avant cette vérification.
