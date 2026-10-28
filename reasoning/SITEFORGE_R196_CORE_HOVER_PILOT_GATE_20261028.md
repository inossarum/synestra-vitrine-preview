# R196 — Core et micro-interactions précises

**Objectif :** corriger les halos jugés artificiels sur les chapitres 2/3 et les quatre pages produits, rendre les boutons visibles, donner de la présence à la scène Core et qualifier le retard de l'espace pilote.

**Architecture :** R195 `f586610b2fe0f0721fb726fb963beab8b2b2428d` inchangée. R196 est une copie de cinq pages et un seul delta CSS additionnel, sans nouveau shader, vidéo, canvas ou second gestionnaire de scroll.

**Chapitre 2 :** pseudo-calque de halo intégralement désactivé par CSS. CTA explicite avec fond dégradé, bord visible même sans survol, icône et réponse au focus.

**Chapitre 3 :** remplacement du halo souris diffus par une lueur linéaire de bordure de 1 px masquée sur le périmètre. Le pointeur existant suit le déplacement sans nouvelle boucle.

**Pages produits :** supprimer le halo de la section « Un parcours compréhensible », conserver ombres et lignes de structure.

**Core :** 2 arcs métalliques très légers en perspective CSS et animés lentement par transform, axe et repères latéraux, marqueur de sol; pointeur transparent. Sur mobile, supprimer repères secondaires. Aucune réflexion WebGL et reduced motion coupe l'animation.

**Tests :** 143/143 Node; 15/15 vues Chrome; 11 E2E scroll; 5 tests hover/FAQ; test ciblé Chrome du DOM/CSS PASS; WebGL `uTilt=[0,0]`, force souris max 0.727 et extinction ~6.66e-11. Captures `r196-studio-1440.png`, `r196-story-systeme-1440.png`, `r196-story-siteforge-1440.png`. Rendu visuel revu contre captures utilisateur mais pas validé par propriétaire.

**Espace pilote :** Cloudflare production toujours 100% sur R80, version `2ee6a737-af2d-40d6-bb8a-5bad710c1ad0`; staging 100% version `ac18371b-3745-45eb-bc98-5e9deeae3d10`. Staging plus récent NE GARANTIT PAS mise à jour fonctionnelle ni compatibilité. Portail propriétaire sous Cloudflare Access: session authentifiée et revue de sécurité indispensables avant qualification puis promotion; aucun contournement, déploiement, ni mise à jour du portail effectués.

**Durabilité :** preuve locale et raisonnement enregistrés sur branche Git isolée. Pas de déploiement public. Les états Memory V1/Supervisor/Runbooks globaux restent MANQUANTE/UNKNOWN pour ce chantier documentaire ciblé.

**NEXT :** autorisation Access et E2E du portail, qualification du staging et Gate de production séparé; prévisualisation R196 pour approbation visuelle puis intégration contrôlée.
