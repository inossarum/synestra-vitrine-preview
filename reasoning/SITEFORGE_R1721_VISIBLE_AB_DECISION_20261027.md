# R172.1 — Écart visuel réel avec démonstration et comparaison A/B

MISSION_ID=SYN_SITEFORGE_R1721_VISIBLE_MAGNETIC_AB_20261027
EVIDENCE=evidence/SITEFORGE_R1721_VISIBLE_AB_20261027.json
SOURCE_BASE=1ebd0cd3dbf12b2bb14c9f3fdbd439598852aaff

## Retour utilisateur et diagnostic
« Je ne vois aucune différence ». Constat confirmé. R172 amplifiait les fins rubans seulement à 6 % de leur valeur, effet imperceptible dans la majorité des vues. En outre la page de laboratoire était initialisée sur Flux plasma (0), hors du matériau Rubans magnétiques (1) réellement modifié. Les 82 tests verts R172 prouvaient la sûreté fonctionnelle, pas un écart esthétique perceptible.

## Correction causale
Dans l'unique shader volumétrique déjà présent, préserver le champ magnétique R171 à quatre grandes courbes et son noyau. Composer une version R172.1 plus sculptée à partir de rails lumineux, deux profils transversaux et un petit tressage attaché au même champ; activer un uniforme supplémentaire `uCompare` qui ne crée aucun nouveau renderer ni propriété JSON. Les boutons A/B affichent R171 strict ou R172.1 au même angle, sous la même horloge. Le bouton de démonstration applique flowType 1, 200/211/166 et la query `?demo=magnetic` initialise directement ce rendu, sans changer les valeurs par défaut de restauration ni l'export 18 champs.

## Preuves
Node 85/85 PASS, Chrome WebGL SwiftShader 5/5 matériaux, souris/tactile/clavier, pause/reprise, mobile 390px. Capture A/B du canvas au même instant et à la même vue, vitesse 0%; référence longueur base64 257380 contre candidate 285820, écart relatif de taille compressée 9.95%. Cette métrique n'est pas une différence en pourcentage des pixels et ne peut remplacer une revue humaine. Les captures montrent des stries internes nettement lisibles sans élargissement de la sphère. Propriétaire : acceptation esthétique R172.1 PENDING.

## Garde-fous
La page d'accueil et le shader officiel conservent leurs SHA blobs 1413e30138ba1657f7056401818e697ddbd32ac8 et dd63d75fdb966de2052595c95b7b6cb736d6c7cc. Aucun passage en main, aucune dépense, aucun déploiement Cloudflare, aucune modification de R169 conservée. Rollback à R172 base 1ebd0cd3dbf12b2bb14c9f3fdbd439598852aaff. GitHub plugin : vérification SHA blobs/tree/parent et update_ref(expected_sha,false) avant marquage publié.
