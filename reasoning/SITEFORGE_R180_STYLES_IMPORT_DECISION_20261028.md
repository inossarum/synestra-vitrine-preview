# SiteForge R180 — Styles volumétriques et import JSON

## Intention / continuation

Suite directe de R179 : donner des formes réellement différentes aux éclats 3D, et permettre de recharger en toute sécurité les paramètres exportés, sans altérer le plasma ni la vitesse commune.

## Décisions

Ajouter un unique sélecteur `moteShape` en plus des 7 réglages R179 ; fragment WebGL1 0=étincelles, 1=fragments cristallins facettés, 2=orbes ioniques. Aucun moteur ni draw call ajouté. La rotation commune `uSpinPhase` reste propriétaire de la vitesse.

Ajouter un bouton d'import et un champ local input[type=file]. Limite 64 KB, parse JSON local, validation des 18 propriétés du plasma, bornes, options sélecteur et couleurs, champ `motes` facultatif pour anciens exports. Tous les champs sont validés avant écriture, refus atomique. Ni fetch réseau ni exécution de données externes.

Le contrat `synestra.siteforge.plasma-settings.v1` et version 1 ne changent pas ; `parameters` conserve exactement 18 entrées. `motes` est facultatif et contient désormais `moteShape` plus les 7 autres contrôles et `enabled`.

## Preuves

142 tests Node PASS, 49 fichiers static PASS, Chrome Windows SwiftShader local PASS : différence GPU de 14 677 pixels sur 307 840 entre facettes et orbes, export/import roundtrip, refus sans mutation, ancien fichier JSON sans `motes`, six matériaux, 390px mobile, orbite complète, pause synchronisée. Captures `r180-style-crystal.png` et `r180-style-orbs.png`.

## Publication / rollback

Branche isolée `task/SYN_SITEFORGE_R180_STYLES_JSON_IMPORT_20261028`, export autonome SHA-pinned. Publier un nouveau fichier `r180.html` dans lab GitHub Pages, préserver index R176 et r177/r178/r179, main/Access intacts. Rollback : retirer seulement r180.html.

## Ouvert

Test navigateur de l'URL publique encore PENDING au moment de la première écriture de cette note. Validation esthétique utilisateur séparée.

## Qualification publique — 2026-10-28

- Prévisualisation dédiée : https://inossarum.github.io/synestra-siteforge-r176-lab/r180.html ; HTTP 200 public et GitHub Pages `built`, aucun écran Cloudflare Access.
- Chrome Windows sur **l'URL publique réelle** : exit=0, WebGL error=0, six matériaux PASS, mobile 390 px PASS, drag/touch PASS, 180°/360° PASS, rotation et pause communes PASS.
- Effet GPU de changement de forme : 14 275 pixels différents sur 307 840 (4,64 %). Import/export et compatibilité legacy PASS ; JSON invalide refusé atomiquement.
- Premiers essais publics : assertion de vitesse trop précoce sous rendu logiciel lent ; attente active d'une nouvelle image GPU ajoutée aux deux scripts QA, commit `de1c9ff360ce2487b09fe5bffe38ebb505340bc5` ; parcours complet ensuite PASS. Défaut de synchronisation du moteur non reproduit.
- Evidence révisée : `evidence/SITEFORGE_R180_PARTICLE_STYLES_IMPORT_20261028.json` blob `c17cf99b4d672c3a79f04045ab72aa9e677984f8`.
- Production `main` inchangée, toutes les prévisualisations R176–R179 conservées ; acceptation esthétique utilisateur distincte.
