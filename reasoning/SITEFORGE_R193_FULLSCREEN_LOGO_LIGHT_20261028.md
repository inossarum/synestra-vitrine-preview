# R193 — plein écran, sol éclairé sans reflet, palette logo

- **Demande** : la scène sphère doit occuper toute la première vue, sans texte dense; retirer la réflexion coûteuse et conserver seulement la lumière réellement perceptible projetée sur le métal. Aligner la sphère et la charte violet–vert sur le logo officiel.
- **Source** : R192 `659865069fb67bbd63491b035edd54e960a0ce3a`, conservée bit-à-bit. Shader WebGL R190 et son état de pointeur inchangés.
- **Couleurs échantillonnées** dans le logo officiel réel via canvas Chromium: violet médian `rgb(85,42,157)` / `#552A9D` ; vert médian `rgb(45,156,110)` / `#2D9C6E`; cyan secondaire `rgb(42,131,169)`. Le shader utilise violet échantillonné et vert légèrement éclairci `#55D49A`.
- **Composition** : en tête, scène `height:100svh`, header superposé, seul CTA discret en bas. Grand titre HTML/H1 déplacé sous la première vue dans le chapitre suivant. Sur mobile, canvas source élargi mais rendu visuellement centré afin d'éviter de découper les filaments.
- **Performance** : `-webkit-box-reflect:below` supprimé de la source générée, miroir DOM supprimé, pas de filtre blur animé ni image re-capturée, aucun nouveau canvas/WebGL. Sol éclairé par gradients radiaux fixes violets et verts avec chute d'intensité, et métal brossé léger. Ce n'est **pas un calcul radiométrique physique**.
- **Accessibilité** : lien d'évitement repositionné hors du flux sans perdre son focus; correction vérifiée de 21px en tête. `prefers-reduced-motion` préservé.
- **Qualité** : 118/118 tests Node, 15/15 captures Chrome, 3/3 vérifications de plein écran et absence de reflet; survol GPU vrai `uTilt=[0,0]`, force max 0.753, décroissance 9.2e-11.
- **Cadence indicative** : en Chrome local et 4 essais alternés, R192 49,5 images/s et R193 100 images/s pour la boucle `requestAnimationFrame`. Ceci ne mesure pas directement les FPS GPU sur le poste du visiteur; le résultat est à prendre comme indication de meilleur pacing, non comme promesse universelle.
- **Publication** : branche R193 locale uniquement; aucune fusion, push ni déploiement. Valider le rendu sur écran utilisateur puis raccorder à la branche active avec tests de production.
