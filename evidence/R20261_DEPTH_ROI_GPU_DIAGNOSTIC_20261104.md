# R202.61 — Diagnostic GPU de profondeur et ROI, 4 modes
Date : 2026-11-04 | Mission : labo3d_sphere_r20261
Owner : Synestra | Exécution : Desktop Commander sur Inos-Cerebros (Windows, RTX 3090).
Périmètre : Babylon.js R202.61 ; aucune mutation du renderer, du noyau, du ZIP, ni de main.
Dépôt : inossarum/synestra-vitrine-preview.
Checkpoint avant travail : 5223639a7a1bd050788833153b0344cada052c97.
Base technique : dd2b0f1eecf3e2782d750df7e4dea811ed285a8d.
Règles locales AGENTS.md : SHA256 34cc2a8649bda4230bd2fa73d4a4de0edaf65dc1e3bdaf2b8b78ff58f4e4ea21.

## Vérification de provenance
- ZIP inchangé : SHA256 5088f87190de0e0bab84633569c0585664a7151666e29fda1b434c76d0f8ae13.
- Six fichiers du ZIP vérifiés octet par octet contre l'extraction utilisée par Chrome : ZIP_EXTRACT=VERIFIED.
- Image canonique acceptée : SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881, mais octets toujours MANQUANTE.
- Pas de publication publique, pas d'installation, pas d'appel PAYG.

## Tests réellement exécutés
- FAILURE-FIRST : `node --test r20261-depth-roi-probe.test.cjs`, PID 39500, exit 1 attendu (module absent AVANT implémentation).
- GREEN : `node --check r20261-depth-roi-probe.cjs`, puis `node --test r20261-depth-roi-probe.test.cjs`, PID 42972, 2 PASS, 0 FAIL, exit 0.
- GPU natif : `node r20261-depth-roi-probe.cjs`, PID 44284, exit 0, rapport `PASS_DIAGNOSTIC` (18.83 s).
- Chrome ANGLE D3D11 / NVIDIA RTX 3090 ; fenêtre 1100x900 ; canvas centre 705x675 ; frame 18 ; Balanced ; puissance 145 % ; 4 modes 0/1/2/3 et test puissance zéro.
- Invariants par mode : 80 faces du noyau et masque, 28 rubans, 6 nœuds, 1 canvas, aucune perte WebGL ; puissance zéro vérifiée.
- Trois contrôles ROI : centre rayon <62 px, couronne 62–125 px, extérieur 125–255 px.
- Variantes DIAGNOSTIC UNIQUEMENT : intact, 18 voiles masqués, volume R20215 masqué, 28 rubans masqués, intact recapturé. Les masques ne persistent pas et ne changent pas la source.
- Dérive original/recapture sur les 4 modes : 0 % dans les 3 ROI ; erreurs JS = 0 ; appels HTTP(S) = 0.

## Résultats visuels mesurés (relatifs à l'image intacte)
- Masquer les 18 voiles : luminance moyenne du centre entre -4.376 et -5.746 ; fraction de pixels du centre modifiés (écart de canal >=18) entre 18.965 % et 28.704 %. Gradient central +0.0205 à +0.0440, sous l'ancien seuil artistique +0.10. Luminance extérieure : variation entre -0.0565 et +0.0007.
- Masquer le volume R20215 : luminance extérieure -25.326 à -25.748 ; contribution majeure au plasma périphérique. Ne pas supprimer cette couche.
- Masquer les 28 rubans : luminance extérieure -2.927 à -3.621 ; perte notable de structure externe, sans gain central démontré.
- Captures GPU originales mode 0 et mode 0 sans voiles relues visuellement. Les facettes paraissent davantage séparées sans voile, mais le volume interne est appauvri ; constat de diagnostic, non validation artistique.

## Artefacts SHA256
- `evidence/R20261_DEPTH_ROI_GPU_REPORT_20261104.json` : df3d8bf3ddbfa92214012ccfe24f1a211626662876d7c1bb0fb7421910a9728d.
- `evidence/R20261_DEPTH_ROI_MODE0_ORIGINAL_20261104.png` : 6c11b58d5593196be084b21c2ac4938c429667098c701f7c1c2502bf77a321bc.
- `evidence/R20261_DEPTH_ROI_MODE0_MIST_HIDDEN_20261104.png` : e756752939370243a1272e82e3de947ad6789c1d2bb86846cb0c634e4cb68f35.
- Reproduction : définir SYN_SPHERE_URL (URI file:/// de l'extraction vérifiée), SYN_PUPPETEER_DIR (installation locale préexistante), exécuter `node r20261-depth-roi-probe.cjs`. Le runner refuse d'écraser le dossier QA déjà présent. Les autres PNG restent dans qa-depth-roi/ sur la machine.

## Limites et gates
DOCTOR / PREVISE : méthodes diagnostiques appliquées, aucun moteur externe de ces noms attesté.
FAST : Central Skill fast-path-delta-only@1.0.0#9f47cb553dcc1bb285af1646d60c12b8e71d6c3d CONSULTED/APPLIED ; SkillRuntime EXECUTION DISABLED.
Visual Regression : méthode du Central Skill visual-regression-testing@1.0.0#aa98fffe9149dfcc0e153f0d1b8b91f3c0a6b4ae appliquée ; Visual Observer nommé NON exécuté.
La comparaison à l'image canonique est impossible sans ses octets. SOURCE_GATE=LIMITED ; MEMORY_V1=NON_ATTESTEE ; HOOKS_STATUS=UNKNOWN.
Aucune variation artistiquement acceptée. Pas de shader ajouté, pas de nouvelle géométrie, pas de push main, pas de déploiement.
FUNCTION_REPORT=PARTIAL | DIAGNOSTIC=PASS | ART_SIGNOFF=PENDING.
