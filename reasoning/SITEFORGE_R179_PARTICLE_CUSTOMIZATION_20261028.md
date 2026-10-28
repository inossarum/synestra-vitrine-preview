# SiteForge R179 — Particules personnalisables avec vitesse liée au plasma

## Contrat
L'utilisateur demande que la vitesse de rotation des éclats soit exactement celle du plasma et souhaite ajuster en direct nombre, couleurs, éloignement, dispersion, taille et luminosité.

## Choix
Réutiliser strictement la phase R178 `uSpinPhase=elapsed*.104` commune à la matière volumétrique et aux éclats. Le seul curseur de vitesse reste `particleSpeed` (0 = pause intégrale, 250 = 2,5x) ; information de synchronisation en tête du panneau éclats. Ajouter 7 contrôles HTML distincts du bloc historique 18 `data-sphere-control`. Uniformes WebGL `uMoteStyle`, `uMotePrimary`, `uMoteSecondary`; borne 160 éclats desktop, 96 mobile ; aucun contexte GPU nouveau. Ne pas introduire de particules 2D.

## JSON / compatibilité
Le document reste `synestra.siteforge.plasma-settings.v1`, `version=1`, `parameters` toujours exactement 18 propriétés. Export optionnel `motes` avec 7 valeurs et booléen `enabled`, afin que les anciens consommateurs de `parameters` ne changent pas. Reset restaure indépendamment les deux groupes et réactive les éclats.

## Tests / état
137/137 tests Node PASS, export statique 49 fichiers PASS. Chrome réel : variation du nombre 3332 pixels, couleurs 3176 pixels, diamètre/rayon/éclat 14149 pixels sur 307840 ; WebGL zéro erreur ; phase commune sous vitesse 250%, export JSON, reset PASS. E2E régression complet et publication externe en cours lors de cette première trace. Aucun DONE avant E2E public.

## Contraintes / rollback
Source isolée `task/SYN_SITEFORGE_R179_CUSTOM_MOTES_20261028` issue de R178 `887ce2d868d22941d524f4645736b179a3a35b63`. Publication versionnée `r179.html` dans un dépôt Pages déjà public ; R176, R177, R178 et `main` inchangés. Rollback via retrait du seul fichier `r179.html` et réutilisation de R178. Aucune autorisation de changement Cloudflare Access, paiement ou secrets.

## Qualification publique définitive

- R179 servi par GitHub Pages isolé : https://inossarum.github.io/synestra-siteforge-r176-lab/r179.html (HTTP 200, sans Cloudflare Access).
- Chrome réel sur l'URL publiée : processus exit 0 ; 7 réglages des éclats réagissent dans le GPU, export JSON v1 conserve 18 paramètres historiques et ajoute `motes` ; 6 matériaux, mobile 390px, rotation 180/360, pause commune et WebGL sans erreur.
- Différences de pixels observées sur 307 840 : nombre 3 317, couleurs 3 176, dispersion/taille/distance 13 881.
- Preuve détaillée et identifiants : `evidence/SITEFORGE_R179_PARTICLE_CONTROLS_20261028.json` (blob ef09520ae6be0a823499b2eeff868e2e38fcc126).
- R176, R177, R178 et `main` demeurent inchangés ; acceptation visuelle propriétaire encore ouverte.
