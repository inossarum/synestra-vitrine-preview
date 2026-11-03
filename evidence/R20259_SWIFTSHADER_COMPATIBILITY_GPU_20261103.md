# HPSYN — R202.59 — Compatibilité WebGL sans carte graphique dédiée (SwiftShader)

Date : 2026-11-03.
Dépôt `inossarum/synestra-vitrine-preview`, PR #64.
Base vérifiée avant test : `818b53c8edc33d6612b964646c3ec4d4874010ce`.
Périmètre : validation **nouvelle** de compatibilité, **sans aucune modification de l'application**.

## Méthode et négatif
La chaîne d'exécution a été forcée dans Chrome avec `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`. Le banc refuse de valider le test si la chaîne identifiée contient le GPU physique au lieu de `SwiftShader`, ou si le contexte WebGL2 est perdu.

Le moteur identifié dans les **deux** profils :
`ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`.

L'hôte physique est Inos-Cerebros (RTX 3090), mais Chrome a utilisé explicitement un **rendu WebGL logiciel** : ce n'est pas un essai sur un autre PC sans GPU.

## Test réel depuis HTML OneFile
Application testée : `release/Synestra_Sphere_R20259_OneFile.html` par origine `file://`, avec frame 18 et puissance 145 %, viewport 900 × 700.
- Qualité **economy** : **PASS**, 1 canvas, 28 rubans, 6 nœuds, noyau + masque à 80 triangles, WebGL non perdu.
- Qualité **balanced** : **PASS**, mêmes invariants.
- Dans chaque profil : bascule mode 0→2 jusqu'à transition stabilisée, puis extinction à puissance 0 : **PASS**.
- Dans chaque profil : retour de la puissance à 145 % et **capture WebGL réelle** : PASS.
- **0 requête HTTP(S)**, **0 erreur JavaScript**, fermeture propre du navigateur, exit **0**.
- Processus Windows **54224** : `SWIFTSHADER_GPU_E2E_PASS`, 2 profils et fermeture `BROWSER_CLEAN_CLOSE=PASS`.
- Rapport brut conservé : `evidence/R20259_SWIFTSHADER_E2E_REPORT.json`, SHA256 `2d77abc2fd300245fa883c78ae625ed8a1b8cb59b3bb3b4bfc5af7c59f1286c1`.
- Capture réelle qualité economy : `evidence/R20259_SWIFTSHADER_ECONOMY_GPU.png`, SHA256 `9a8adc26608d80306f1bb3983aea8fe26680f1a76d37ca2e749eb7d025c2ee32`.

## Limites et décisions
L'absence de GPU dédié est **simulée par SwiftShader** sous Chrome sur un ordinateur physiquement équipé d'une RTX 3090. Les profils réussissent dans cet environnement, mais les FPS, la mémoire et les performances d'un petit PC réel ne sont pas certifiés ici. Le test ne remplace pas l'acceptation artistique.

La version ZIP a conservé SHA256 `2ce059c7d047f81b56e3b733f0168d8471ae7f0ddd3448661ed410e22f7d4483`.
Le HTML OneFile a conservé SHA256 `e58d699cf5b1ca10747101ea5177b586b6cf559c4ed03bc3eda394250b565933`.

`SWIFTSHADER_E2E=PASS | CODE_DELTA=NONE | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`.
