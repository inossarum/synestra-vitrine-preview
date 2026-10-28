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
