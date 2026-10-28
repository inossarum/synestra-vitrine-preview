# R178 — Rotation commune plasma / éclats 3D

## Intention et cause

Les éclats de R177 suivaient les transformations de la caméra mais ne tournaient pas spontanément avec la spirale de plasma. La spirale utilisait winding=angle*5-t*.52; les éclats n'avaient qu'une dérive locale.

## Décision

Une phase GPU unique `uSpinPhase=elapsed*.104` alimente la rotation positive locale des éclats et la phase winding du plasma, sans ajouter de nouvelle couche visuelle ni de programme GPU. L'éclat tourne autour de l'axe Z local, puis dérive et est repoussé localement, puis suit le repère caméra inverse. Sa direction lumineuse tangentielle est projetée avec la même caméra.

Le facteur .104 provient de .52/5 de R176 : même sens et même vitesse angulaire que les bras principaux. La cadence temporelle plafonnée passe à .15s pour améliorer la fluidité sous faible FPS sans saut de simulation important. L'orbite horizontale accepte 360° via wrap dans la période réelle du shader (2PI/1.5), sans modifier le réglage ni la sensibilité.

## Alternatives exclues

Pas de deuxième contexte WebGL, pas de fausses particules 2D, pas de remplacement du moteur, pas de remplacement du JSON 18 champs, pas de changement des états Cloudflare.

## Preuves

131/131 tests Node PASS; export 49 fichiers PASS; Chrome WebGL local PASS avec six matériaux, mobile, motes, perturbation des ondes, temps de spin et pause réelle; rotation à 180/360 contrôlée par 35 événements clavier Chrome. Captures versionnées et masque comparatif.

## Publication / rollback

Branche source `task/SYN_SITEFORGE_R178_SHARED_SPIN_20261028`; aperçu versionné `r178.html` sur GitHub Pages laboratoire. R176 racine et R177 restent inchangées. Rollback par retrait seulement de `r178.html` (ou retour au lien R177). Production du Studio immuable.

## Ouvert

Exécution Chrome sur l'URL publique requise avant DONE de la publication ; acceptation esthétique utilisateur séparée.
