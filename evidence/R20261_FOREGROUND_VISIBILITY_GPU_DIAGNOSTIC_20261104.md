# R202.61 — visibilité GPU native des six clones de flux au premier plan
Date : 2026-11-04 | Mission : labo3d_sphere_r20261 | Owner : Synestra
Statut : FAILED_DIAGNOSTIC (stabilité stricte périphérique), CORE_ROI_OBSERVATION_REPRODUCIBLE.
Scope : observation uniquement sur une copie extraite du ZIP, sans mutation des sources, de la scène persistée, du ZIP ou du workflow HPSYN.

## Préflight et provenance
- Machine réellement exécutante : Inos-Cerebros / Windows / Chrome ANGLE D3D11 / NVIDIA RTX 3090.
- Branche locale et distante vérifiée : task/SYN_LAB_R20261_MIST_OPACITY_EXP_20261104, SHA `3ec0188afa415e1e9eb4b124e999f920eb5bc382`. Worktree suivi propre avant l'expérience.
- Artefact officiel `release/Synestra_Sphere_R20261_Standalone.zip` SHA256 `5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13`, contrôlé avant exécution.
- Copie locale du ZIP à `I:\_STUDIO_STAGING\SYN_LAB_R20261_DD2B_RELEASE_VERIFY_20261103\qa-zip-extracted\index.html`; vérification de provenance de ses 6 membres : Evidence antérieure `R20261_DEPTH_ROI_GPU_DIAGNOSTIC_20261104.md`.
- Runner exactement exécuté en QA locale `r20261-foreground-vis-rtx-20261104.cjs`, SHA256 `d14f717cfb902f34c66d26557f55f98a577b1b7d897b762100e9133525b055e5`.
- Copie publiable `evidence/R20261_FOREGROUND_VISIBILITY_RUNNER_20261104.cjs`, SHA256 `a8ce065bc4f4249d4bce73ff69f377131cde6ea7757a5dd08a5de5a31e7cf21c` : seul le chemin privé de Puppeteer a été remplacé par `SYN_PUPPETEER_DIR` ; `node --check` PASS. Pour la réexécuter, recopier le fichier en racine du worktree où `r20261-depth-roi-probe.cjs` est présent, définir `SYN_PUPPETEER_DIR` et un nouveau dossier QA : ne jamais écraser les captures.
- Validation : `node --check` PASS. Premier préflight de ce tour a rejeté un SHA LOCAL supposé obsolète avant toute exécution (PID 70904); HEAD réel `3ec0188...` et SHA distant identique contrôlés. Nouvelle invocation unique après correction de la précondition, PID 70792, terminé exit 3 (garde de stabilité).
- Retour `mcp__Remote_Desktop_Commander__read_process_output` : 4 modes mesurés, résultat `FAILED_DIAGNOSTIC`, aucune opération restée incertaine.

## Protocole expérimental
- On ouvre le rendu original sous Chrome headless RTX 3090, `viewport=1100x900`, `frame=18`, `Balanced`, puissance=145 %, quatre modes 0,1,2,3.
- Contrôle par mode : un Engine/Scene/Canvas, core=80 faces, depth-mask=80 faces, 28 rubans, 6 nœuds ; 6 meshes `node-plasma-foreground-0..5` activés, groupe 3, stencil enabled func=514 (EQUAL) ref=1, depth-write disabled. Aucun mask/depth ou matériau modifié.
- Captures comparatives du CANVAS : baseline tous visibles, clone i uniquement caché pour i=0..5, six clones cachés, baseline rétablie. Chaque changement ne porte que sur `mesh.isVisible` dans la page isolée, sans sauvegarde dans le produit.
- ROI sur le canvas original 705x675 : core r<62 px, ring 62<=r<125, outer 125<=r<255. Mesure du nombre de pixels où `max(|R1-R2|,|G1-G2|,|B1-B2|)>4` et >=18.
- Ne pas confondre des pixels de rendu différentiel avec le nombre de fragments réellement rejetés par le GPU depth/stencil. Aucune requête occlusion GPU n'a été exécutée.

## Résultats réels
| Mode | Core Δ>4 lorsque les 6 clones sont cachés | Core Δ>=18 | Core Δ>4 en cachant uniquement clone 1 | Autres clones, core Δ>4 | Dérive baseline >4 |
|---|---:|---:|---:|---:|---|
| 0 | 894 (7.390873%) | 274 | 894 | 0 chacun | 0 core / 0 ring / 0 outer |
| 1 | 899 (7.432209%) | 280 | 900 | 0 chacun | 0 / 0 / 0 |
| 2 | 895 (7.399140%) | 270 | 894 | 0 chacun | 0 / 0 / 3 pixels outer |
| 3 | 903 (7.465278%) | 277 | 903 | 0 chacun | 0 / 0 / 0 |

- La contribution dominante au centre au cadrage testé provient du clone `node-plasma-foreground-1`. Les autres n'entraînent aucun delta >4 dans le noyau à ce cadrage, bien que les clones 0,3,4 affectent plusieurs pixels de couronne.
- Résultat plausible : profil caméra+stencil+depth limite la visibilité de 5 connexions au centre, malgré leur existence géométrique. Cette hypothèse ne prouve pas lequel des tests stencil ou depth rejette chaque fragment, ni le résultat en orbite.
- Les captures GPU mode 0 baseline vs six clones cachés ont été relues visuellement ; leur différence est subtile hors mesure différentielle.
- Aucun événement JavaScript `pageerror` observé ; aucune requête HTTP(S) externe. Le champ `jsErrors` du JSON contient une sentinelle de stabilité `NON_DETERMINISTIC_BASELINE_MODE_2`, pas une exception JS.
- Le seuil déterministe strict du script exige zéro pixel de dérive dans toutes les ROI. Comme 3 pixels changent en zone extérieure dans le mode 2, `result=FAILED_DIAGNOSTIC` et exit 3, même si le noyau et la couronne sont parfaitement stables pour 4 modes. NE PAS présenter ce run en PASS ni abaisser le seuil a posteriori.

## Evidence brute et intégrité
- `evidence/R20261_NODE_FOREGROUND_VISIBILITY_GPU_20261104.json` SHA256 `dc4ce326ca787da20606594069f5e705e5405164a4810fc5dcf85ac1fc873cfb`.
- `evidence/R20261_NODE_FOREGROUND_BASELINE_MODE0_20261104.png` SHA256 `1cecb243d986f23f35b9f7613e465632643bcec1fe4bcc42d872487c4d3ca80d`.
- `evidence/R20261_NODE_FOREGROUND_ALL_HIDDEN_MODE0_20261104.png` SHA256 `8f17af4dbd5b60c1cc9e2569e4802f44b3b2add35c4b3a200397008d59e51f79`.
- Fichiers copiés et rehashés à l'identique depuis le dossier QA local. Les versions modes 1..3 restent dans le JSON (pas de duplication de PNG).
- La sortie brute a été lue une seconde fois (PID 75544) et chaque ligne par mode comparée au JSON.

## Garde-fous et NEXT
- Ce nouveau diagnostic n'est ni un test orbital (test précédemment refusé non rejoué), ni un ART_SIGNOFF, ni une validation de la référence PNG Library au SHA256 attendu.
- Pas de correctif shader, pas de stencil désactivé, aucun mesh ou render pass ajouté, aucune nouvelle dépendance, aucune installation, aucun déploiement ou push main.
- Hypothèse NEXT : distinguer par un protocole indépendant et autorisé l'occlusion depth de la restriction stencil, sans modifier la livraison. Ne pas convertir cette observation en changement artistique sans une comparaison canonique certifiée et de nouveaux seuils fixés avant capture.
- SOURCE_GATE=LIMITED ; ART_SIGNOFF=PENDING ; GPU_VISIBILITY_DIAGNOSTIC=FAILED_WITH_REPRODUCIBLE_CORE_OBSERVATION ; FUNCTION_REPORT=PARTIAL.
