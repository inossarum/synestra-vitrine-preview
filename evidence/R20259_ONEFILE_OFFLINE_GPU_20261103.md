# Synestra Sphere R202.59 — un seul fichier HTML, hors ligne

Date : 2026-11-03
Dépôt : `inossarum/synestra-vitrine-preview`, PR #64
Base source inchangée au départ : `e141493dc7bb6ec492c77256564a842be10c4d0b`.
Portée : **nouveau format de diffusion uniquement**, aucun changement de Babylon, de géométrie, de lumière, de couleurs, d'API, ni du ZIP déjà distribué.

## Nouveau livrable

- **`release/Synestra_Sphere_R20259_OneFile.html`** : page HTML autonome contenant le HTML, le CSS et le JavaScript Babylon en une seule ressource. Ouvrir par double-clic dans Chrome ou Edge. Aucune extraction ZIP, Python, serveur, installation, connexion Internet ou compte.
- Taille : **7 437 023 octets**. SHA256 : `e58d699cf5b1ca10747101ea5177b586b6cf559c4ed03bc3eda394250b565933`.
- Le JavaScript embarqué est **identique** au bundle Babylon validé, SHA256 : `b727a8614800e7e0f035a39203133892cc31ff0a868b1322fb7b5e0359cecef9`, 7 430 694 octets.
- CSS embarqué et contrôlé par SHA256. La Content-Security-Policy de cette version n'autorise l'exécution des deux contenus inline que par leurs empreintes `sha256-...` ; pas de `unsafe-inline`, aucune ressource web externe.
- Nouveau constructeur reproductible `release/build_onefile_from_zip.py` utilisant **uniquement Python 3 standard-library** et le ZIP déjà versionné. La création du fichier ne nécessite Python que **pour le reconstruire**, pas pour le lancer.
- Le script refuse une archive inattendue et un bundle changé (contrôle fail-closed par SHA) ; aucune modification du ZIP ni de la version précédente.

## Vérifications réellement exécutées

1. Préflight Git : PR #64 et HEAD local identiques (`e141493dc7bb6ec492c77256564a842be10c4d0b`), branche isolée, aucun changement suivi.
2. Failure-first : source incomplète rejetée (`ONEFILE_NEGATIVE_PASS`). Les deux dépendances HTML externes étaient présentes dans le paquet d'origine, preuve de la différence apportée.
3. Construction locale : `ONEFILE_BUILD_PASS`, 7 437 023 octets.
4. Reproduction **indépendante depuis le ZIP versionné** : `ONEFILE_REPRODUCIBLE_PASS`, **SHA256 identique octet pour octet** à la première construction.
5. **Chrome matériel RTX 3090 / WebGL2 / D3D11**, origine `file://` : ancienne version ZIP, nouveau HTML unique et nouveau HTML avec `prefers-reduced-motion=reduce`. Scène Babylon unique, noyau et masque 80 triangles, 28 courants, six nœuds : PASS.
6. Sur OneFile : sélection d'un nouveau mode, transition finie, puissance 0 % (masque éteint), rétablissement, et réduction des animations : PASS.
7. Mesure des requêtes : **0 requête HTTP(S)** ; **0 erreur de console et 0 exception JavaScript**. Navigateur fermé proprement, code 0. Aucune modification du réseau local.
8. Captures WebGL contrôlées : ancien et nouveau formats produisent la **même image visible** au même état de la sphère.
9. Rapport d'exécution versionné : `evidence/R20259_ONEFILE_GPU_E2E_REPORT.json`, SHA256 `3d1d531cf810847c2f71f8f7f1dbec1b39fc257c986cae9969de990caa28cc35`.
10. Capture GPU du HTML unique : `evidence/R20259_ONEFILE_GPU.png`, SHA256 `07cee3aacb89062f5d7364ddcefda656338c93dffeb32dba14cd2a296257597a`.

## Durabilité et limites

Reconstruction : `python release/build_onefile_from_zip.py` depuis la racine du dépôt (ou fournir un chemin de sortie en argument).
Rollback : supprimer le nouveau `OneFile.html` ; le ZIP existant, les sources, les versions antérieures et la PR de base restent fonctionnels.

Cette amélioration donne une livraison utilisable sans serveur ni Python **pour l'utilisateur final**, mais ne vaut ni validation esthétique de la référence d'origine ni déploiement de la vitrine publique. `ART_SIGNOFF=PENDING`.

`SKILLS_APPLIED=git-worktrees@1.0.0,failure-first@1.0.0,reasoning-evidence@1.0.0 | ONEFILE_GPU=PASS | NETWORK_REQUESTS=0 | REPRODUCIBLE_SHA=PASS | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
