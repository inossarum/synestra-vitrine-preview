# R175 — Éclats énergétiques réactifs, sans surcharger la sphère
MISSION_ID=SYN_SITEFORGE_R175_INTERACTIVE_ENERGY_MOTES_20261028
EVIDENCE=evidence/SITEFORGE_R175_INTERACTIVE_MOTES_20261028.json

## Intentions et conservation
L'utilisateur fournit une capture du plasma cyan/violet déjà apprécié et demande davantage d'effets 3D originaux (« des feuilles qui s'envolent au passage de la souris, ou des particules qui flottent »). Les feuilles réalistes seraient étrangères au laboratoire énergétique, le choix créatif est une petite couronne de braises lumineuses qui orbitent avec profondeur et s'écartent au passage du pointeur. Pas de saturation particulaire ; le vortex, le noyau, la palette et le diamètre restent visuellement inchangés.

## Implémentation isolée
Un seul programme WebGL existant : un branchement pass=5 utilisant des positions XYZ, perspective liée à z, couleurs cyan/violet, et réaction à l'uniform vec4 uPointer. 46 instances desktop/28 mobile. Pointermove réel alimente une impulsion bornée, décroissance progressive ; pas de second canvas, texture ou Worker. Contrôle accessible d'activation/désactivation, hors du JSON historique à 18 champs. Les comparateurs magnétiques/relief fonctionnent comme avant.

## QA
Failure-first : nouveaux tests absents sur R174, puis 96/96 tests Node PASS. Chrome ANGLE SwiftShader réel : six familles WebGL, 0 erreur GPU, mobile 390px, orbite souris/tactile, pause/reprise, toggle OFF et repulsion (impulsion 1), régressions A/B PASS. Capture sur/off au même temps figé : 669 pixels sur 308360 (0.217%) changent au-dessus de 12 intensités ; 400 au-dessus de 28. Les éclats sont volontairement clairsemés et leur mouvement est plus expressif que la différence en image fixe. Performances GPU matériel et approbation visuelle : non mesurées.

## Protection, autorité et prochaine étape
R174 HEAD distant 917ed2a3f4629889a1b0e2a822dd831d261ae853, arbre 9920a7ebc1a309710039bd265a3dfed996310bb8 ; local d6c7455 est un commit de contenu identique (arbre égal). Nouvelle branche R175 isolée afin de préserver les agents concurrents. Ne pas fusionner main, ne pas modifier la vitrine approuvée (blobs 1413e301..., dd63d75...), ne pas publier Cloudflare sans revue. Reprise R174 par reset/revert de branche dédiée uniquement.
