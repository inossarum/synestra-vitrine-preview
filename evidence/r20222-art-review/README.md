# R202.22 — QA artistique du noyau facetté (01/11/2026)

## Périmètre / provenance
- Référence R202.21 : PR #25, SHA `916a2651d1024b2d92f5973bd73b9e4af22803dc`, IcoSphere 320 triangles / 960 sommets, rayon de construction 0,30.
- Candidat R202.22 : PR #26, SHA `88392a4fa33b0c355ac438d6457a7d3010c3a16b`, IcoSphere 80 triangles / 240 sommets, rayon de construction 0,38.
- Cette branche `qa/SYN_LAB_R20222_ART_REVIEW_20261101` contient **uniquement des éléments de revue**, indépendants de la PR #26, de `main` et des déploiements.
- Captures réelles réalisées sous Chrome 156 WebGL 2 avec RTX 3090 / ANGLE Direct3D11, 1100 × 900, DPR1, `labFrame=6`, Ultra, `qaPower=145`, même banc, même cadrage pour chaque angle.
- Vue isolée : 170 autres maillages masqués **en mémoire du navigateur uniquement** (sans mutation du code ni du dépôt), caméra à distance 1,75, angles (`alpha,beta`) : face (0 ; 1,32), côté (1,45 ; 1,32), dessus (2,75 ; 0,60). La vue complète conserve le plasma, les filaments et tous les maillages.

## Verdict technique et lecture visuelle
- Les trois vues isolées PASS pour les deux révisions : 320 et 80 triangles réels (960/240 sommets), canvas unique, shader actif, renderer matériel RTX 3090 D3D11 vérifié. Les triangles de R202.22 sont sensiblement plus larges.
- **Écart artistique dominant :** dans la scène complète, la luminosité magenta diffuse et les filaments au premier plan masquent une partie des arêtes. Le nombre de triangles n'est plus le point bloquant. Augmenter uniquement l'émission risque de blanchir la zone centrale sans rétablir les facettes.
- **Recommandation de revue :** retenir R202.22 comme baseline technique PC, mais `ART_SIGNOFF=PENDING` pour l'aspect de la sphère composée dans le plasma. Toute correction de premier-plan, de diffusion ou d'éclairage est à faire sous une nouvelle branche isolée et après jugement des preuves, sans changer PR #26 rétroactivement.
- Les valeurs d'émission et les captures isolées ne sont pas assimilables à la scène complète ; aucune métrique HDR ou fidélité artistique n'est revendiquée.

## Contenu
- `R20222_ART_REVIEW_4VIEWS_20261101.png` : panneau 2 × 4 avant/après, face/côté/dessus/composition réelle, SHA256 `f66f342c834109cf0dcd68c8632ebe35e66914e87fad77101315ec6365aaa19e`.
- `R20221_ISOLATED_facet-front_RTX3090.png` : SHA256 `e7478e6a75962036987ab400639689e5c5667f9bad0b01568ac4bcebedf8942f`.
- `R20221_ISOLATED_facet-side_RTX3090.png` : SHA256 `d7fc619a139d18acd85607eda7223e5f5d1557739426b48e30ac4568bacd3311`.
- `R20221_ISOLATED_facet-top_RTX3090.png` : SHA256 `50c9f162b860c569260aba40a51af3b7618283bee4606ae4955b2c81d56acbff`.
- `R20222_ISOLATED_facet-front_RTX3090.png` : SHA256 `500958db6ccb4aa45f00fda4cd44d1d621ca5f797ba7beca839e2914e162c7c8`.
- `R20222_ISOLATED_facet-side_RTX3090.png` : SHA256 `849ae0e15ac4f079332c67fb77011eb00adfa6075c16c622e926bfa837a211ec`.
- `R20222_ISOLATED_facet-top_RTX3090.png` : SHA256 `39dcbd318291f6f34bce5518076d5d05a523c9263b5b545a2624b22b324b7da1`.

## Statuts
`QA_GEOMETRY_3_ANGLES=PASS`; `QA_SCENE_COMPOSITING=OBSERVED`; `ART_SIGNOFF=PENDING`; `HOSTED_E2E=NOT_RUN`; `CI_SOURCE_PR26=ALREADY_PASS`; `MERGE=NOT_AUTHORIZED`; `DEPLOY=NOT_AUTHORIZED`; `FREE_ONLY=PASS`.
