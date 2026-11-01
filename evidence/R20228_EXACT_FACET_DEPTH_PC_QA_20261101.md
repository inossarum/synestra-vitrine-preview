# R202.28 — Occlusion réelle des 80 faces du noyau par profondeur et stencil GPU (01/11/2026)

## Modifications effectives

- Parent exact **R202.27** : `302c4d6614ec5216fff10773f1ddc1a8cc3eb501`, PR #35 (inchangée).
- Branch isolée **R202.28** : noyau visible inchangé : `CreateIcoSphere('central nucleus',{radius:.38,subdivisions:2})` soit **80 triangles / 240 sommets**. Shader de couleur R202.26 conservé.
- Un mesh invisible `central nucleus facet depth mask` est cloné depuis le noyau, **partage sa géométrie réelle** et suit son mouvement, sa rotation et son zoom. Material `disableColorWrite=true`, `forceDepthWrite=true` et stencil `ALWAYS → REPLACE(ref 1)`. Il écrit seulement profondeur et stencil dans le groupe 2, sans colorer la scène.
- Les **six flux de premier plan** passent au groupe 3 ; leur stencil `EQUAL(ref 1)` et le depth test natif filtrent les fragments **exactement suivant le raster des triangles**. Aucun test par sphère analytique dans leurs shaders. `scene.setRenderingAutoClearDepthStencil(3,false)` préserve les tampons entre les groupes 2 et 3.
- Aucun second Engine/Scene/Canvas, aucun depth renderer/texture séparé ; une copie de mesh **à géométrie partagée** sert de masque invisible. Le coût est un draw call de 80 triangles + stencil. Les six flux R202.27 et quatre matériaux dédiés restent ; tous les autres filaments sont inchangés.

## Vérifications Windows réelles (RTX 3090, ANGLE D3D11)

- **Suite complète finale : 101 tests, 99 PASS / 2 SKIP / 0 FAIL**. Les deux tests mathématiques obsolètes de l'ancienne sphère R202.27 ont été supprimés ; trois tests spécifiques aux masques de profondeur et stencil des 80 faces ont été ajoutés. Build et bundle SHA-256 reproduits sans variation.
- Build `npm.cmd run build` : **PASS**, bundle SHA256 `03ea466fb2ac205a7ce70cbc27ede51fdda53505be08e9c4fe9581a043061dd6`.
- E2E CDP isolé : scène WebGL prête, GPU réel RTX3090/D3D11, 80 facettes et 240 sommets pour le noyau, **masque 80 facettes / 240 sommets partageant exactement la géométrie du noyau**, `renderingGroupId=2`, color write désactivé, stencil write REPLACE, six flux avant en groupe 3 avec stencil EQUAL, aucun clear entre les deux groupes. Profil Chrome temporaire nettoyé. **Une seule fenêtre Chrome utilisateur** avant et après.
- AB court même frame 6, Ultra, puissance 145 %, viewport 1100 × 900 DPR1 : R202.27 **100.034 FPS**, R202.28 **100.009 FPS**, delta **−0.024 %**, non significatif. Le GPU moins puissant et la stabilité thermique restent non qualifiés.
- Différence visuelle localisée : dans la zone du cœur, variation RGB moyenne **0.0503/255** sur **10 735 échantillons**, **0.596 %** changent de plus de deux unités. Le rendu global et la palette restent inchangés ; cela ne constitue pas une validation esthétique.
- Captures source : `evidence/R20228_R20227_EXACT_FACET_AB.png`, SHA256 `ead24982aa7391a85da37abe58e0aadb841271b615f7131344db95d798ea43fe` ; mesures GPU `evidence/R20228_R20227_GPU_AB_QA_20261101.json` (rapport exact du CDP).

## Contraintes et limites

- Le stencil du masque assure un contour **rasterisé des triangles** : contrairement aux versions R202.25–R202.27, la projection visible est exacte selon les 80 faces du noyau. Ne pas confondre avec un système de vraie réfraction, d'épaisseur volumétrique ou d'occlusion de l'ensemble des autres filaments.
- **ART_SIGNOFF PENDING** ; aucune fusion ni déploiement. L'interface visuelle des autres flux n'est pas redessinée.
- CI GitHub dédiée R202.28 : à exécuter et vérifier séparément. Cloudflare Access privé, GPU physique faible gamme et stress prolongé : non exécutés.
- **FREE_ONLY, NO MAIN, NO MERGE, NO DEPLOY, une seule fenêtre Chrome utilisateur.**
