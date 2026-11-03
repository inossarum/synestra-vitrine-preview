# HPSYN — R202.59 — Revue orbitale réelle de la sphère, six orientations

Date : 2026-11-03
Portée : Labo 3D, dépôt `inossarum/synestra-vitrine-preview`, PR #64.
Checkpoint source : `30683d00995a85b693f450604041fd292dd03a38`.
Archive inchangée : `release/Synestra_Sphere_R20259_Standalone.zip` SHA256 `33140bda8eea1645cb8ea7ea416bf4610c85e40b76c0f6bca95aa5373e324765`.

## Nouvelle vérification effectivement exécutée

Le fichier **index.html extrait du ZIP** a été ouvert en `file://` sur Inos-Cerebros dans Chrome GPU **NVIDIA RTX 3090 / ANGLE D3D11**. Même fenêtre 1100 × 900, `labFrame=18`, `qaQuality=balanced`, `qaPower=145`, scène identique.

Six orientations de la caméra Babylon ont été testées puis capturées :
1. face (alpha -0.38, beta 1.20) ;
2. droite (alpha -0.38 + PI/2, beta 1.20) ;
3. dos (alpha -0.38 + PI, beta 1.20) ;
4. gauche (alpha -0.38 + 3PI/2, beta 1.20) ;
5. dessus (alpha -0.38, beta 0.35) ;
6. dessous (alpha -0.38, beta PI - 0.35).

À chaque orientation : **1 canvas**, noyau **80 triangles**, masque **80 triangles**, **28 courants**, **6 nœuds**, contexte WebGL2 disponible, GPU RTX 3090, 0 perte de contexte, 0 erreur JS. Test complet **PASS**, navigateur fermé proprement, code 0.

La planche `evidence/R20259_SIX_ANGLES_RTX3090.png` regroupe les six captures **réelles** sans dessin synthétique additionnel, SHA256 `f834616e53def19a68b331b25a145eff99d5e26ea5c4dfe2b3852b246a17e1df`. Rapport JSON local `qa-360/R20259_360_GPU_REPORT.json` SHA256 `add45f284d12454785462a779b130b9e4975b033f6f3d52114f92f6d7732769c`. Les six PNG d'origine et le script `r20259-360-review.cjs` sont conservés localement en QA non suivie.

## Analyse limitée et honnête

La planche est visuellement **compatible avec une silhouette sphérique ronde sous orbite**, des croisements en 3D, un noyau polygonal visible, des arcs externes et plusieurs nœuds colorés. Le rendu exact de la référence originale **n'est pas certifié** : le manifeste `reference/SPHERE_CANONICAL_20261029.md` donne SHA256 `584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881`, mais le binaire de la pièce jointe originale n'a pas été récupéré. Le propriétaire a accepté le concept, pas explicitement le rendu R202.59.

Ce test porte sur un PC RTX 3090 à six angles ; il ne prouve ni un téléphone physique, ni un GPU modeste. Aucun résultat E2E déjà réussi n'a été relancé inutilement, aucun shader ni code de produit changé.

## Statut

`ORBITAL_6_VIEWS_GPU=PASS | SCOPE=EVIDENCE_ONLY | ZIP_SHA_UNCHANGED | SOURCE_CODE_UNCHANGED | ART_SIGNOFF=PENDING | FUNCTION_REPORT=PARTIAL`
