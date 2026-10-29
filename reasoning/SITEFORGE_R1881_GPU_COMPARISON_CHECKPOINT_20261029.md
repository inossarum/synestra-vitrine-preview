# R188.1 — qualification GPU matériel et comparaison visuelle (2026-10-29)

Mission : `SYN_SITEFORGE_R1881_GPU_COMPARE_20261029`. Périmètre : valider la comparaison graphique R188.0/R188.1 dans Chrome sur `Inos-Cerebros`, vérifier GPU physique réellement utilisé, sans modification des moteurs, du site public ou de `main`.

## Source et états immuables
- Référentiel : `inossarum/synestra-vitrine-preview`. Branch QA dédiée GitHub initialisée depuis R188.1 `fcc95858725c8089c9b83bad564dbf5a53ed59ac`.
- Référence R188.0 : `d0032d2ce37fc572e805b9325abba6c87d1ce6bb` ; SHA256 HTML **après normalisation CRLF→LF** `80444c99fcd55b1066c5c98e497a5efb935a6610b9d215a85f6c31cdd41d72b7`.
- Candidat R188.1 : `fcc95858725c8089c9b83bad564dbf5a53ed59ac` ; SHA256 HTML normalisé `22a0ab5a3f814b6c4dfc7f831319aa40f17241b475f29689bab0c774d9a4d9a8`.
- Les octets du worktree Windows peuvent contenir CRLF au checkout, contrairement à l'HTML source généré LF : ne jamais comparer les SHA bruts d'un worktree CRLF à ceux du builder LF sans expliciter la normalisation ; le test de non-régression encode cela.

## Exécution navigateur native
- Chrome Windows démarré sur le PC avec `--headless=new --use-angle=d3d11 --enable-webgl`, sans `--enable-unsafe-swiftshader` ni désactivation de sandbox.
- `WEBGL_debug_renderer_info` retourne exactement `ANGLE (NVIDIA, NVIDIA GeForce RTX 3090 (0x00002204) Direct3D11 vs_5_0 ps_5_0, D3D11)` pour les deux versions : **rendu GPU réel vérifié**.
- `nvidia-smi` confirme la présence de la RTX 3090 ; cela ne mesure pas le coût spécifique du matériau.
- Scène testée : viewport navigateur 1100×800, canvas 544×477, 8 flux, palette Synestra, diamètre 100 %, qualité Équilibrée, souris désactivée, vitesse des flux et des impulsions à zéro.
- Deux captures successives de chaque version produisent **0 pixel modifié**, donc scène de comparaison déterministe. Différence entre R188.0 et R188.1 : **4 308 / 259 488 pixels**, soit **1,66 %**. Le changement attendu des croisements est détectable, mais la métrique n'est pas une preuve de supériorité esthétique. Captures R188.0 et R188.1 personnellement inspectées : relief et silhouette conservent le parti pris cyan/magenta, différence subtile dans les jonctions.
- 72 intervalles `requestAnimationFrame` enregistrés par version : **10,0014 ms en moyenne**, médiane 10 ms, p95 10,1 ms pour les deux versions. Cela mesure la **cadence du navigateur proche de 100 Hz**, potentiellement plafonnée par le scheduling/vsync. **Cela ne mesure ni le temps GPU brut par frame ni un gain de FPS**. Ne pas présenter R188.1 comme plus rapide sur la base de cette donnée.
- 0 erreur WebGL, contexte non perdu, aucun JS exception `Runtime.exceptionThrown` relevée.

## Tests failure-first et correctifs
- Premier test de SHA échoue : checkout Git Windows a converti les LF en CRLF, sans modification sémantique. Vérification distincte des SHA bruts et normalisés ; correction ciblée du contrôle : SHA256 du contenu normalisé CRLF→LF.
- `node --test tests/siteforge_r1881_gpu_compare.test.mjs` : **4/4 PASS**, dont rejet de `SwiftShader` et d'un renderer vide, vérification du renderer NVIDIA, des SHA exacts, de la stabilité des screenshots et du statut des métriques de cadence.
- Aucun patch du code R188.0/R188.1 n'a été réalisé. Un seul script de comparaison réutilisable, un test et une page statique avant/après ont été créés dans une branche dédiée.
- Preuve machine : `evidence/SITEFORGE_R1881_GPU_COMPARE_20261029.json` et 4 PNG `r1881-gpu-r188*-{fixed,repeat}.png`. Page comparateur `r1881-comparaison-rtx3090.html`. Quatre liens HTTP sur localhost:19102 vérifiés 200.
- Les résultats sont propres à Chrome Windows RTX 3090, ils ne valident ni mobile physique ni release publique.

## Qualification responsive du comparateur
- Capture Chrome CLI `--window-size=390,844` : image visuellement rognée en raison de sa fenêtre virtuelle, donc non retenue comme preuve mobile.
- Correctif au **test** (pas à la page) : Chrome CDP `Emulation.setDeviceMetricsOverride` avec 390×844 mobile=true, et 1200×840 desktop. Les deux vues ont été réellement rendues, capturées et inspectées.
- Résultat : desktop `innerWidth=1200`, `scrollWidth=1200`, grille deux colonnes de 555 px ; mobile `innerWidth=390`, `scrollWidth=390`, grille une colonne de 358 px. Les deux images sont chargées sur chaque écran. Zéro débordement horizontal.
- Preuves : `evidence/SITEFORGE_R1881_VIEWER_RESPONSIVE_20261029.json`, `evidence/r1881-gpu-viewer-desktop.png`, `evidence/r1881-gpu-viewer-mobile.png`. Test réexécutable : `node tests/siteforge_r1881_viewer_responsive.mjs` (Chrome D3D11, sans relâchement de sandbox).

## Sécurité, récupération, prochains jalons
- Local uniquement `http://127.0.0.1:19102/r1881-comparaison-rtx3090.html`. Aucun hébergement externe, aucune dépense, aucun secret, aucune mutation de `main`.
- En cas d'arrêt des serveurs R1880/R1881, les démarrer avec `python -m http.server 19100 --bind 127.0.0.1 --directory I:\_STUDIO_STAGING\siteforge_r1880_adaptive_gpu_20261029` et le port 19101 pour R1881 ; ne pas changer les ports s'ils appartiennent à un autre propriétaire.
- Requalification : `node tests/siteforge_r1881_gpu_compare.mjs`, puis `node --test tests/siteforge_r1881_gpu_compare.test.mjs`. Tout retour `SwiftShader` = **GPU_NATIVE_UNVERIFIED**, jamais PASS matériel.
- Statut : **qualification GPU matériel et comparaison R188.0/R188.1 DONE**. Le choix esthétique final et la promotion du site restent indépendants, non exécutés. Prochaine étape produit : contrôle artistique par le propriétaire et, si nécessaire, optimisation mesurée par vrai timer GPU / variation de charge, pas déduite de 10 ms RAF.

## Preuve HPSYN
Connect `synestra_command_hpsyn` lu et appelé ; inbox vide. Skills Central consultés : `visual-regression-testing@1.0.0#aa98fff`, `browser-e2e-diagnostics@1.0.0#50e513a`, `e2e-testing@1.0.0#3fcb719`, `failure-first@1.0.0#373c5f5`, `debugging@1.0.0#e3ddf70`, instructions appliquées directement, sans Supervisor. Snapshot Memory V1 local non qualifié, ne pas prétendre qu'il est chargé. GitHub branche canonique à vérifier après publication des preuves.
