# Labo 3D R202.27 — filtrage des flux réellement devant le noyau (01/11/2026)

## Décision technique

**Variante DRAFT**, parent immuable R202.26 `a2fcfd68284aaeca7795e320a866d99446a1df82` (PR #34). Les facettes du noyau (IcoSphere `radius:.38,subdivisions:2`, 80 triangles / 240 sommets) et sa profondeur optique R202.26 demeurent inchangées.

Défaut prouvé : le noyau `renderingGroupId=1` écrasait visuellement les filaments du groupe `0`, même lorsque ceux-ci étaient placés devant lui par la géométrie. **R202.27** conserve les six flux `node-plasma-*` originaux dans leur groupe arrière et ajoute six clones transparents du même chemin, calculés sur le même cycle géométrique, dans le groupe `2`. Les quatre matériaux dédiés calculent en **world space** l'intersection rayon caméra → sphère du cœur, éliminant par `discard` les fragments hors projection ou situés derrière sa face avant. Ils reçoivent chaque frame la caméra, le centre, le rayon et le temps.

La limite est **une sphère analytique inscrite de rayon 0.35×r**, non la profondeur rasterisée exacte des 80 triangles. Il s'agit d'un **filtrage géométrique par fragment des six flux**, non d'un depth buffer par facette. Pas de seconde scène, second moteur ou changement des autres matériaux ; **6 meshes et 4 matériaux supplémentaires** avec un groupe de rendu 2. Les autres filaments restent inchangés.

## Vérifications concrètes

- **Tests source complets : 100 tests ; 98 PASS, 2 SKIP, 0 FAIL** (dont quatre nouveaux contrôles R202.27). Build esbuild PASS. Bundle Windows SHA256 `bd863ec08f5b4e7b441d983171c2c1d48c6812a5f959e5e12fdfa30317ba5068`.
- **GPU RTX 3090 / D3D11** : un seul engine/canvas, 80 facettes/240 sommets, six clones réellement activés en groupe `2`, aucune fenêtre Chrome utilisateur nouvelle. QA par Chrome headless/CDP à profil temporaire supprimé après test.
- Captures même frame 6, viewport 1100×900 DPR1, qualité Ultra, puissance 145 %, caméra identique. **Comparatif gros plan** : `evidence/R20227_R20226_FOREGROUND_CORE_AB.png`, SHA256 `918855f43dbb9603e135219c833c60318ed42af3f1802bb7a8ae2a6bfcad8b7f`. La ligne cyan de premier plan se superpose désormais localement aux facettes.
- Échantillonnage visuel zone noyau : delta RGB moyen 0.702/255 sur 3740 points ; **6.36 %** changent de plus de deux niveaux RGB. Effet géométriquement limité, non modification globale de la palette.
- Mesures AB brèves, 6 s par condition : R202.26 **99.974 FPS**, R202.27 **99.988 FPS**, écart **+0.014 %**. Trop court pour prouver une absence de régression sur GPU moins puissant ou un gain significatif.
- Tests négatifs mathématiques : fragment derrière le noyau / au centre / hors du disque / rayon nul rejeté ; fragment dans le demi-espace avant admis. Voir `lab-babylon/tests/r20227-foreground-streams.test.mjs`.
- Rapport machine brut : `evidence/R20227_R20226_GPU_AB_QA_20261101.json`, produit par la mesure CDP. Les captures plein écran sont conservées dans le dossier QA local.

## Portes ouvertes

- **Validation artistique propriétaire PENDING**. Conserver les PR #30 / #34 et `main` intacts ; aucun merge ou déploiement.
- CI GitHub spécifique à R202.27 NON EXÉCUTÉE dans ce rapport. GPU physique faible puissance, occlusion raster exacte des triangles, E2E Cloudflare Access : NON EXÉCUTÉS.
- FREE_ONLY, aucune dépense PAYG, une seule fenêtre Chrome utilisateur.
