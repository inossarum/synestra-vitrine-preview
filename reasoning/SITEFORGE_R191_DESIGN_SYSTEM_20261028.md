# R191 — Structure éditoriale numérique et ambiance mutualisée

**Décision visuelle :** abandon des gros blocs sombres, bordures accumulées, halos agressifs et surcharge HUD. Privilégier une grille calme, davantage d'espace respirant, contrastes typographiques, surfaces semi-transparentes, ponctuations cyan/menthe/violet et transitions lentes. Pas de cyberpunk, néons agressifs ou effets de scan.

**Architecture :** cinq routes de présentation dans `r191/` (Studio, Connect, Bridge, SiteForge, Offres). Une seule feuille `assets/r191-system.css` et un script `assets/r191-ambient.js` extraits de l'existant Connect/Bridge (R111-R115), sans bibliothèques ni deuxième contexte GPU. L'ambient est décoratif, `pointer-events:none`, `aria-hidden`, borné et contrôlé par `prefers-reduced-motion`.

**Préservation :** le plasma R190, sa perturbation localisée au pointeur et sa caméra fixe ne sont pas modifiés. Le logo `synestra-studio-official-header.webp` sert aux cinq pages. Les trois pages produits réemploient leurs contenus métier et leurs schémas ; SiteForge reçoit une page de présentation cohérente, tandis que Prism/Signature/Open Form restent accessibles sur leurs routes historiques (laboratoires artistiques non altérés).

**Navigation et intégrité :** liens relatifs, ancres, ressources locales, CSP et focus clavier inchangés. Les liens de galerie issus du Studio sont corrigés pour pointer vers les démonstrations originales, sans routes fictives.

**QA vérifiée :** 104/104 tests Node, 10/10 captures Chrome de 5 routes à 1440 et 390 pixels, aucun overflow horizontal, logo chargé, 44 objets ambiance bureau / 26 mobile, fond absent lorsque le mode réduit est actif, zéro WebGL supplémentaire. Captures et relevés dans `evidence/SITEFORGE_R191_BROWSER_20261028.json`.

**Limites :** ce commit est un candidat en branche isolée, pas une publication. Intégration à la source déployée, gate humain de publication et E2E production restent ouverts. Aucun paiement, déploiement, fusion ni modification des laboratoires.
