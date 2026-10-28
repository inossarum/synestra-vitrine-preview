# SiteForge 3D Lab R187.8 — paramétrage architecture et impulsions

**Mission** `SYN_SITEFORGE_R1878_FLOW_DENSITY_20261028`, propriétaire inossarum. Base immuable `bcff1ddd750223eb967f152df72d3c28f945e116` R187.7, branch dédiée `task/SYN_SITEFORGE_R1878_FLOW_DENSITY_20261028`.

## Décisions
- Reuse-first : éviter une refonte du moteur WebGL1 et préserver R187.7. Ajouter quatre commandes affichées avant « Volume et noyau » (nombre 3–8, écartement 70–130 %, vitesse 0–250 %, intensité 0–200 %).
- Les trois anneaux A/B/C restent toujours présents ; D et E sont activés aux nombres 4 et 5 ; F/G/H sont des géométries toriques inclinées nouvelles aux nombres 6, 7 et 8. Deux filaments satellites tressent chaque trajectoire active. Chaque trajectoire a son centre, son rayon et sa vitesse de déformation ; aucune coque opaque.
- L'écartement modifie uniquement les rayons des trajectoires (donc leur distribution), pas leur diamètre individuel. La vitesse de l'impulsion multiplie `uLabTime` pour les flux uniquement : 0 % fige leur animation interne tout en laissant la rotation globale indépendante. L'intensité multiplie la composante oscillante et les flashes localisés.
- Le JSON v1 conserve **exactement 18 paramètres** historiques. Le bloc frère optionnel `energyFlow` introduit 4 nombres validés sans migration des anciennes sauvegardes; absence du bloc = valeurs par défaut, import invalide = refus atomique.
- Résolution 3D et exposition restent bornées; facteur optique `pow(5./flowCount,.28)` rééquilibre la luminance sans duplication d'un shader ou de runtime.

## Vérifications
- `node --test tests/siteforge_r1878_isolation.test.mjs` = **5/5 PASS** ; hash CSP exact, aucune permission supplémentaire.
- Chrome desktop CDP WebGL SwiftShader : six matériaux historiques, contrôles 18+10 et affichage labo PASS ; 3→8 flux = 29 556 pixels modifiés ; écartement 70→130 % = 50 852 pixels ; vitesse 0 % = **0 pixel modifié en 1,65 s**, vitesse 250 % = **30 529 pixels** modifiés. Rotation et `particleSpeed` figés pendant le test.
- Chrome mobile simulé 390×844 PASS : 3→8 = 15 770 pixels, écartement = 27 167 pixels ; import legacy et invalides passés.
- Captures : `evidence/r1878-flows-{3,5,8}.png`, `evidence/r1878-controls-ui.png`, `evidence/r1878-pulse-active-*.png`, captures mobiles ; rapports machine `SITEFORGE_R1878_LIVE_CONTROLS_*_20261028.json` et synthèse `SITEFORGE_R1878_FLOW_DENSITY_E2E_20261028.json`.
- Preview locale isolée : http://127.0.0.1:19098/siteforge-r1878-autonome.html?demo=energy ; pas de publication ni push.

## Gate et récupération
- L'esthétique reste à valider visuellement par le propriétaire, en particulier le chevauchement de huit anneaux et le noyau électrique. L'E2E sur GPU mobile physique et la mesure FPS matériel ne sont pas réalisés ; donc pas de promotion automatique.
- Rollback sûr : conserver R187.7 au commit `bcff1dd`. Rebuild déterministe via `python tools/build_r1878_flow_density.py` ; test `node --test tests/siteforge_r1878_isolation.test.mjs` ; navigateur `node tests/siteforge_r1878_diameter_qa.mjs` et `node tests/siteforge_r1878_mobile_qa.mjs` après démarrage serveur HTTP local.
- Prochaine étape suggérée après acceptation : optimiser la densité lumineuse et l'occlusion des croisements en mode 8 flux, vérifier cadence GPU matériel; ne pas multiplier les effets avant validation.
