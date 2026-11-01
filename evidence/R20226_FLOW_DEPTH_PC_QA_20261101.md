# R202.26 — densité de plasma le long du rayon de profondeur (PC, 01/11/2026)

## Changement exact
- Base immuable **R202.25** : commit `cde9659449c44a6fe7d3641122faddc4df51e94f`, PR #30.
- Candidat **R202.26** isolé : `lab-babylon/src/plasma-field.js` uniquement pour le shader du matériau du cœur, avec deux tests de contrat. La géométrie `CreateIcoSphere(radius:.38, subdivisions:2)`, **80 triangles / 240 sommets**, `core.renderingGroupId=1`, volume, filaments et autres sources demeurent inchangés.
- R202.25 utilisait une modulation analytique presque uniforme du voile. R202.26 calcule la densité des flux en **3 positions fixes du segment visible caméra → facette**, suivant les mouvements sinusoïdaux des courants du plasma. La transmission `exp(-.70*frontDepth*veil)` demeure bornée à **[0.63, 1]**, puis module davantage la luminosité et l'alpha du cœur. Un seul engine/canvas et aucun nouveau render pass.
- Ce procédé constitue une **approximation optique sans occlusion géométrique réelle par filament**. L'approbation du rendu incombe toujours au propriétaire.

## Preuves d'exécution réelle
- Tests ciblés de non-régression et de préservation de la géométrie : **5 PASS / 0 FAIL**. Build `npm.cmd run build` PASS. Bundle candidat SHA256 `d0145143112321a4bb837c281e9de471b8168bdabcdc6c90b329177be108d235`.
- GPU **RTX 3090 / D3D11**, Chrome headless avec profil temporaire isolé et serveur HTTP localhost (aucune nouvelle fenêtre visible). Capture des deux versions sous les mêmes conditions : viewport 1100×900, DPR1, Ultra, énergie 145 %, frame 6, 80 facettes/240 sommets, un canvas. Le profil Chrome temporaire a été supprimé.
- Court essai comparatif **AB**, une mesure de ~6 s par version : **R202.25 99.948 FPS / P10 97.564**, **R202.26 100.042 FPS / P10 97.866**. Écart relatif **+0.094 %**, trop faible pour conclure à un gain ou à une équivalence sur d'autres GPU.
- Analyse du comparatif autour du cœur, échantillonnage 6 160 pixels à pas de 2 : différence moyenne de **6.814 valeurs RGB sur 255** ; **47.5 %** des échantillons au-dessus de deux valeurs. Comparatif rapproché `evidence/R20226_R20225_CORE_AB_V2.png`, SHA256 `59f0d27fa3c4e0c30943f03c3d2e4efdd5a392d737972f41e557855487fa619f`.
- Rapport GPU brut : `evidence/R20226_R20225_GPU_AB_20261101.json` (provenance sans modification au shader).
- Le premier smoke Chromium CLI a échoué à initialiser l'application, y compris avec profil séparé. **Ce test reste FAILED, non maquillé.** Le chemin CDP déjà qualifié a ensuite réussi la capture, le contrat de la géométrie et les mesures. Cause précise de l'échec CLI non attestée.

## Portes restantes
- **Artistic signoff = PENDING**. R202.26 est une variante proposée, non adoptée. Ne pas fusionner sur la branche R202.25 ni `main` sans choix du propriétaire.
- Test sur GPU physique bas de gamme non effectué. E2E Cloudflare Access non effectué. Pas de déploiement, aucune dépense, aucun nouvel onglet/fenêtre utilisateur.
