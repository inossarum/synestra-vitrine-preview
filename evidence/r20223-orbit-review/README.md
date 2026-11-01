# R202.23 — Revue orbitale PC : 4 angles × 2 révisions

Date : 2026-11-01 · **Statut : capture et qualification technique PASS ; acceptation artistique PENDING**

## Provenance et isolation
- Baseline **R202.22** : `88392a4fa33b0c355ac438d6457a7d3010c3a16b` / PR #26, boule à 80 triangles et rayon 0,38 dans le groupe de rendu par défaut.
- Candidat **R202.23** : `3191a6ab0da3e4205b5609273e42795b8cd06f07` / PR #27, même géométrie, matériau borné et `core.renderingGroupId=1`.
- Environnement : Chrome 156, RTX 3090, WebGL ANGLE D3D11, 1100 × 900 CSS pixels, DPR 1, `labFrame=6`, qualité Ultra, émission `qaPower=145`.
- Quatre caméras fixes : face (alpha -0,38, beta 1,2), côté (1,2 / 1,25), dessus (1,8 / 0,67), arrière (3,0 / 1,24). Distance caméra 4,8, visée sur le noyau.
- Les maillages de la scène complète restent actifs. Aucune capture n'est remplacée par un dessin synthétique ; les deux panneaux recomposent des captures natives.
- **4/4 captures R202.22 et 4/4 captures R202.23 : PASS**, GPU matériel vérifié, matériau attendu, volume actif, un seul canvas. Le contrôle R202.23 vérifie en plus que le noyau seul utilise le groupe 1.
- Sources du panneau : huit PNG GPU originaux, SHA256 et tailles dans `R20223_ORBIT_CAPTURE_MANIFEST.json` (conservés sur Inos-Cerebros).
- Les deux grands panneaux PNG et aperçus JPEG sont versionnés **uniquement dans cette branche QA**, issue du commit PR #27. Aucun changement aux sources ni à la PR #27.

## Observations ciblées
- **R202.22** : noyau physiquement intégré au flux lumineux, facettes peu lisibles en raison de la superposition des rubans et du raymarch.
- **R202.23** : facettes visuellement isolées et nettement lisibles de face, du côté, de dessus et de l'arrière.
- Limitation importante : la priorité de groupe 1 signifie que le noyau est composé après les autres maillages ; la boule apparaît alors comme un volume blanc-violet au premier plan dans les quatre vues. Cette solution privilégie la lisibilité, mais ne prouve pas une occlusion/transparence physiquement satisfaisante sous tous les angles.
- **Décision suggérée :** conserver R202.23 comme candidat PC autonome et ne pas la promouvoir tant que l'utilisateur n'a pas arbitré le compromis lisibilité/profondeur. Si correction souhaitée : explorer sous une nouvelle branche *une atténuation locale des rubans/du volume autour du noyau* plutôt qu'un nouveau boost d'émission ou un second rendu.

## Ce que la preuve ne démontre pas
- Ni approbation artistique, ni fidélité HDR, ni précision colorimétrique absolue, ni FPS prolongés pour les nouvelles poses, ni preview hébergée.
- Aucune mesure de profondeur ou de sorting GPU exhaustive : l'écart de superposition est établi visuellement et attribué à la configuration du groupe de rendu.
- Les travaux restent **FREE_ONLY**, pas de déploiement, pas de fusion, pas de manipulation de `main`.

## Fichiers
- `R20223_ORBIT_scene_4ANGLES_RTX3090.png` : vue globale avant/après, 4 angles.
- `R20223_ORBIT_core_4ANGLES_RTX3090.png` : recadrage noyau avant/après, 4 angles.
- `PREVIEW_scene_960.jpg`, `PREVIEW_core_960.jpg` : aperçus rapides, les PNG restant la preuve maîtresse.
- `R20223_ORBIT_CAPTURE_MANIFEST.json` : provenance, contrôles et SHA256 des huit PNG bruts.
