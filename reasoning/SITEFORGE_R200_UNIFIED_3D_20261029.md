# R200 — Une scène WebGL cohérente

## Décision d'architecture
Référence visuelle Overworld Audio, mais aucune copie d'identité visuelle. La direction souhaitée n'est pas réalisable proprement en ajoutant des halos CSS à un shader isolé. R200 remplace le décor CSS par un **monde calculé par le même fragment shader WebGL1 que le Core**. La sphère n'est pas tournée au survol.

## Réalisation
- Base `e13050cb5d5cf6bda7c4648141899306dc44efe4`, branche isolée et build reproductible avec SHA-pinned R199.
- Une seule scène/rendu/programme/canvas : rayon perspective, intersections monde 3D avec sol, plafond, murs, alcôve arrière et estrade métallique.
- Core à l'origine : émission violet et vert utilisée pour le Lambert diffus, spéculaire rugueux et atténuation par distance sur les surfaces. Fog de profondeur sur les surfaces. Il ne s'agit ni de ray tracing global ni d'un rendu PBR calibré.
- Core plasma R198 réutilisé par injection contrôlée, aucune librairie externe. Matériaux avec saturation limitée et noyau lumineux. Ne pas confondre démonstration unifiée et résultat AAA++ homologué.
- `uSceneScroll` anime un petit déplacement de caméra pendant le scroll. Pointeur = perturbation locale des flux, `uTilt=[0,0]` invariants.
- Qualité : WebGL1, résolution plafonnée à 720k pixels sur bureau/260k mobile, 18 et 12 échantillons respectivement, réduction progressive bornée à 0.65 pour ralentissement plus grave et ré-augmentation en stabilité. Ne pas réduire pour la cadence ~25 headless si cela n'améliore rien.
- Progressive enhancement : texte, navigation et art statique fallback conservés avec motion réduite et perte WebGL.

## Validation et limites
- 172 tests Node PASS (contrats d'héritage et failure-first).
- 15 rendu Chrome PASS (5 pages, 3 tailles) ; Chrome WebGL shader ready.
- E2E pointeur `max=0.7310`, retour `4.44e-11`, `uTilt=0,0`; scroll 430 px => caméra 0.478.
- Cadence headless observée 25.1 FPS bureau et 25.7 FPS mobile, qualité 1, sans garantie GPU RTX3090. L'essai de réduction à qualité .65 ne changeait pas la cadence headless (25 FPS), d'où la conservation d'un seuil conservateur. Un benchmark GPU réel et une revue visuelle sont requis avant publication.
- Capture `r200-studio-1440.png` et `r200-studio-390.png`, **non approuvées esthétiquement par le propriétaire**.
- R199 conservé ; aucun main merge, push ni Cloudflare Access/portal mutation ; port local isolé 18852.
- Le CSP `frame-ancestors` livré par meta HTML produit un avertissement préexistant. Cela relève d'une vraie politique d'en-tête HTTP avant mise en production, pas du moteur graphique.

## Recovery
Revenir à `/r199/` pour rollback visuel, ou branche `task/SYN_SITEFORGE_R199_CINEMATIC_ALCOVE_20261028`. En cas d'absence de WebGL/reduced motion, art fallback préservé. Après validation artistique : E2E multi-moteurs, benchmark RTX3090 et appareil modeste, tests et adaptation réelle sous contrainte, intégration contrôlée au site de référence.
