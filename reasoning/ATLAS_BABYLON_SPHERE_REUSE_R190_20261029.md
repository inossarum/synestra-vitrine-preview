# Synestra Atlas Babylon / Labo 3D R190 — contrat de réutilisation

MISSION_ID: SYN_LAB_R190_BABYLON_ENGINE_20261029
OWNER: Synestra Studio — worktree dédié task/SYN_LAB_R190_BABYLON_ENGINE_20261029
BASE: R189 commit 70cc534e7ea252a1395ffffe867ac1cf36e671c6
POLICY: FREE_ONLY | REUSE_FIRST | pas de deuxième Atlas ni deuxième moteur dans une scène
CIBLE: UNIQUEMENT le rendu de la sphère du Labo 3D, non le décor de l'image utilisateur.

## Source et état des Atlas
- Atlas R35 trouvé sur I:\_STUDIO_STAGING\ATLAS_R35_TERRAIN_20261029, scripts Blender .blend ; ce n'est pas l'Atlas Babylon annoncé.
- Un pilote Babylon existant **dans un worktree séparé appartenant à un autre chantier** :
  I:\_STUDIO_STAGING\syn_lab_babylon_engine_20261029
  HEAD lors du contrôle d6d041ea17975a792d55ef57fedc7c0508778f17
  branche task/SYN_LAB_BABYLON_ENGINE_R190_20261029 ; plusieurs fichiers NON SUIVIS.
  Le pilotage et les six captures locales R190 ont un rapport PASS ; ne pas modifier ce worktree ou prendre le statut PASS pour un commit/push.
- Aucune référence GitHub d'un Atlas Babylon dédié vérifiée sur les recherches ciblées. État de sa création : PENDING/UNKNOWN, ne pas inventer Atlas ID.
- Décision : les deux expériences Babylon sont des prototypes; **Atlas Babylon dédié unique à réutiliser** lorsqu'un checkpoint/ref@SHA publiés seront disponibles. Aucune deuxième autorité de moteur/renderer.

## Contrat futur Atlas Babylon (à qualifier, pas implémenté)
Module : AtlasSphereRenderer avec runtime Babylon.js@9.33.0, un canvas, aucune URL de texture distante.
Entrées attendues :
- mode 0 original, 1 vortex, 2 tressage, 3 ondes pulsées ;
- palette cyan/violet/magenta/blanc, puissance et rayon du noyau, turbulence, densité de courants, budget GPU ;
- seed, temps de capture et caméra pour des A/B déterministes ;
- hooks capture / contexte perdu-restauré / destruction / export de preset.
Sorties : état de préparation réel, renderer, profil GPU, captures 1440/390, mesures et erreurs, manifeste versionné.
La scène n'a pas le droit de lancer un second engine, second canvas ou broker. Labo et SiteForge consommeront la même capacité qualifiée, mais le Labo garde ses réglages expérimentaux; SiteForge n'accepte que des presets validés.

## Référence artistique de l'utilisateur
Image jointe au chat le 2026-10-29, **seule la sphère fait foi**, pas la pièce, fond, murs, reflets extérieurs ni caméra décorative.
Propriétés retenues : enveloppe sphérique ajourée composée de filaments courbes 3D, diversité cyan-violet/magenta, interactions et croisements de flux avec profondeur, noyau blanc lumineux visible mais non saturé, silhouette sphérique sous rotation 360°, absence de câbles/supports.
La copie binaire de la référence n'a pas été trouvée parmi les fichiers montés par ce chat : IMAGE_CANONIQUE_SUR_GIT=MANQUANTE ; ne jamais prétendre avoir archivé la vraie image.
Le rendu existant du pilote 62 filaments est **trop cyan, trop lumineux et masque une partie des courbes violettes** ; l'essai autonome de ce worktree est plus contrasté mais n'est pas une équivalence artistique validée.

## Exécution du prototype indépendant
- Worktree séparé : I:\_STUDIO_STAGING\syn_lab_r190_babylon_20261029
- Dépendances versionnées @babylonjs/core 9.33.0, esbuild 0.28.2, licence Apache-2.0 ; local, gratuit.
- Livrable : lab-babylon/index.html, style.css, src/main.js, dist/babylon-lab.js, package-lock.json.
- Vrai E2E Chrome 156 / RTX 3090 ANGLE D3D11, HTTP 127.0.0.1:19115 : quatre modes, 1100px et viewport simulé 390px, 8 captures, WebGL2 error=0, canvas=1 ; rapport lab-babylon/evidence/R190_BABYLON_BROWSER.json PASS.
- Deux tests Node de non-régression : PASS (noyaux visuellement différents et scène isolée).
- Premier essai à port 19112 échoué HTTP 404 parce qu'un autre chantier possédait déjà ce port : **aucune erreur moteur imputable**. Correctif : isoler port 19115, HTTP 200 et E2E PASS.
- Limites : pas d'E2E téléphone physique, performances GPU modeste ni test de fidélité validé par propriétaire. Babylon est en prototype R190 ; aucun swap de moteur en production, aucun transfert à SiteForge.
- NE PAS intégrer le worktree concurrent au nôtre sans commit, owner et revue des deltas. Reuse-first = contrôle d'identité/HEAD puis comparaison/partage de module validé.

## NEXT
1. Attendre la publication du véritable Atlas Babylon avec identité, owner, ref@SHA, manifeste, API et tests.
2. Exécuter la comparaison A/B moteur/filaments/centre sans altérer R189 et sans second renderer.
3. Ajuster le contraste des flux (réduction éblouissement cyan, lisibilité violet, noyau défini, courbes plus structurées) en regard de l'image utilisateur.
4. Promouvoir une seule implémentation Atlas validée ; SiteForge consomme une projection de preset après E2E mobile/GPU.
