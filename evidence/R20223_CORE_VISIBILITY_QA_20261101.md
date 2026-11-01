# HPSYN — Labo 3D R202.23 : facettes visibles dans le plasma

Date : 2026-11-01. **Statut : candidat artistique isolé, techniquement testé, non fusionné/non déployé.**

## Objectif et source
- Base immuable : R202.22 PR #26 au SHA `88392a4fa33b0c355ac438d6457a7d3010c3a16b`.
- Branche isolée : `task/SYN_LAB_R20223_CORE_FACET_VISIBILITY_20261101`. Ne modifie pas les PR #23, #24, #25, #26, ni `main`.
- Problème : la sphère centrale à 80 triangles est presque invisible lorsque les rubans et le plasma volumétrique sont actifs.
- Correction bornée : placer le **maillage réel** `central nucleus` dans `renderingGroupId=1`, les autres groupes restant à 0 ; conserver une seule scène, un seul moteur, un seul canvas et les 80 triangles. Sur le seul matériau de cette boule, utiliser `Engine.ALPHA_COMBINE` et une palette blanc-violet bornée pour éviter la saturation additive. Le rayon, le maillage et le plasma externe ne changent pas.
- Première itération testée : priorité de rendu avec ancien additif, résultat sursaturé (disque blanc). **Rejetée** après inspection des captures. Deuxième itération avec composition alpha et contraste par facette : retenue comme candidat technique pour revue esthétique.

## Tests et preuves
- `npm ci` local, sans PAYG ; `npm test` : **89 tests, 87 PASS, 2 SKIP, 0 FAIL**.
- `npm run build` Windows : PASS. Bundle exact SHA256 `d46f6a7445ce9dffbed72836c70195b1775fcbb62708c14afaf1662dcddce392`.
- Source normalisée LF : `src/main.js` SHA256 `171d12bfd9c9ba647627bb195121d463d36dc453407569a8135646b07ae61943`, `src/plasma-field.js` SHA256 `2af11692d51297f74fb31ac18229f2c72d5ea93d87ea2672a90ce7002e6d2a49`.
- E2E GPU RTX 3090 / ANGLE D3D11 / Chrome : **6/6 PASS** (frames 0 et 6, Economy, Balanced, Ultra, puissance zéro) ; animation frame0/frame6 distincte ; canvas unique ; volume désactivé à puissance zéro.
- E2E interface PC Chrome normal : **8/8 PASS**, notamment contrôle d'émission, reset, modes, rotation souris, molette et frame continue. JSON SHA256 `776f26463828c12a0d54c3cd78a187e777490ee237cf376fdd98f82b7a263d98` (sur le poste local).
- Test Ultra 1100x900, 8 s, fenêtres Chrome : candidat R202.23 **82,23 FPS** (P10 fenêtres 250 ms 73,39) ; contrôle R202.22 **85,35 FPS** (P10 80,22) après une première tentative TIMEOUT sans mesures. Variation indicative **−3,66 %** ; pas de preuve de stabilité multi-runs ou de SLA. Régression mesurée modeste, à surveiller. Profil Chrome spécifique aux tests terminé, 0 processus QA résiduel.
- Comparatif fixe Ultra, frame=6, captures matérielles 1100×900 même réglage. Tableau `R20223_BEFORE_AFTER_RTX3090.png` SHA256 `3bda63c294a3789911257a073764ebc9e683cf853ab000d51454f217369dedc6`.
- Capture R202.23 Ultra originelle : SHA256 `09d77cb3422fe861bd3e0a66e4f4bce12fd7f9e2e08c0c5192b97ead4c1a4a78`.

## Limites et jalons
- **ART_SIGNOFF=PENDING** : les facettes sont plus visibles, mais leur intégration artistique et le poids du cœur dans la composition doivent être validés par le propriétaire.
- `PRIVATE_HOSTED_E2E=NOT_RUN` ; `CI_GITHUB=PENDING` jusqu'à confirmation sur le commit exact.
- Aucun merge vers main, aucun déploiement, aucun coût PAYG.
- Les outils locaux de QA et JSON restent au chemin `I:\_STUDIO_STAGING\SYN_LAB_R20223_CORE_VISIBILITY_QA_20261101\qa_r20223` ; la revue versionnée ne reprend que les fichiers utiles.
