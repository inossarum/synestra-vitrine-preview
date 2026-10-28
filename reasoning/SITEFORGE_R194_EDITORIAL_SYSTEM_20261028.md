# R194 — Refonte éditoriale et cinématique numérique

## Besoin réel et critique R193
Les captures utilisateur montrent une sphère encore trop volumineuse, une projection de lumière trop large et des sections sous la scène restées trop proches d'une vitrine ordinaire. Cette itération change l'architecture et non seulement les teintes.

## Choix structurants
- Conserver R193 et R190 intacts. Nouveau dossier de preview `r194/`, CSS unique `assets/r194-editorial.css`, motion unique `assets/r194-scroll.js`. Palette officielle logo violet `#552A9D`, vert `#2D9C6E`.
- Sphère : échelle réduite, centre libre, métal discret. La lumière reste une **approximation perceptuelle CSS** : pas de reflet miroir, pas de WebGL supplémentaire, pas de lecture périodique de pixels.
- Repenser intégralement le récit de l'accueil : 8 sections indépendantes (vision, capacités, laboratoire, méthode, besoins, confiance, FAQ, espace pilote), avec compositions propres. Écarter les anciennes grilles répétées et les assertions commerciales non prouvées.
- Connect, Bridge, SiteForge, Offres : conservations des contenus produits authentiques et de leurs états; nouvelles scènes d'ouverture, index de chapitre, bande d'architecture et rythme de section. Les démonstrations SiteForge historiques restent séparées.
- Scroll : IntersectionObserver détermine les scènes entrantes, méthode indexée par étape réelle visible, rail accessible via liens natifs, progression demandée sur un seul RAF par page. Suppression du gestionnaire R192 dans les copies R194 évite les doublons. Reduced-motion => contenu toujours visible.

## Règles et risques
- FREE_ONLY, pas de merge direct ni publication publique. Aucun secret, aucun changement de la politique CSP ou du navigateur global.
- Progrès d'accessibilité testé (focus CSS, navigation native, détails et liens, motion réduite). Validation WCAG complète et navigateurs non-Chromium NON revendiqués.
- Préflight limité à corpus Synestra essentiel local (AGENTS SHA lu et skills SHA-pinned); Memory V1, Reasoning global, Evidence global et Supervisor n'ont pas de preuve d'autorité runtime.
- E2E Chrome local ≠ E2E Cloudflare production.

## Qualification
- 126/126 tests Node, 15/15 contrôles Chrome à 1440/768/390, 11 résultats de scénario scroll et méthode `03` actives.
- WebGL en contexte réel : caméra `uTilt=0,0`, perturbation `0.7266` puis extinction `6.65e-11`.
- Captures comparées visuellement à R193 : sections et hiérarchie distinctes; absence d'anneaux décoratifs autour du noyau.

## Reprise / NEXT
Vérifier la prévisualisation locale `/r194/` sur l'écran de référence, puis retrouver la source effective du site publié et faire le transfert contrôlé du delta avec test de performance multi-pages et E2E staging avant gate de publication.
