# R177 — Éclats solidaires du volume

**But :** 360° XYZ, rotation identique au plasma, dérive autonome, répulsion locale.

**Cause :** projection XY seule des éclats dans uPass>4.5 malgré XYZ 3D ; faux parallaxe Z sans occultation, non solidaire du repère uTilt.

**Correctif :** distribution déterministe Fibonacci XYZ, strates radiales, transformation orbitToView inverse de celle du volume, répulsion calculée dans l'espace local, occultation arrière dans le fragment.

**Compatibilité :** six matériaux, 18 champs JSON, onde de plasma R176, WebGL unique, rotation souris/tactile, mobile conservés.

**Tests :** 120/120 régressions et 5/5 géométriques, Chrome réel 6 matériaux et mobile PASS; masques différentiels des éclats tournés/Home : 2380 pixels distincts; WebGL sans erreur.

**Rollback :** branche gh-pages du dépôt lab à commit 270d587b1eeb7191b1346793e0f8f270cb7062ca; source R176 à 0518d941a713983ec8d4d3ff0565c66d0f1c8d8a.

**PENDING :** publication sur URL publique et contrôle navigateur du code publié ; validation esthétique propriétaire.
