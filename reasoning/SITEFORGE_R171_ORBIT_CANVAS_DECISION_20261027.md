# R171 — Orbite volumétrique, horloge stable et recadrage réel du canvas

MISSION_ID=SYN_SITEFORGE_R171_ORBIT_CANVAS_FIX_20261027
BASE=324d8d28757ad9d3d1468b2caad14345aa7e0a09
EVIDENCE=evidence/SITEFORGE_R171_ORBIT_CANVAS_20261027.json

## Périmètre
Le propriétaire demande de poursuivre le laboratoire 3D. R169 reste une maquette de pièce futuriste archivée comme visuellement trop chargée ; aucune modification de l'index de vitrine, de sa sphère officielle ou de main. R170 est la base validée par tests, mais les courants doivent pouvoir être inspectés réellement en profondeur.

## Modifications réversibles
Ajouter à la scène du laboratoire (et non au site officiel) une orbite tactile/souris persistante, bornée, avec pointer capture, clavier fléché et reset Home/double-clic. Aucun nouveau réglage dans le JSON (18 préservés). Utiliser une horloge de simulation unique pondérée par la vitesse utilisateur : 0%=freeze, reprise à partir de la même phase et non du temps écoulé en pause.
Défaut visuel découvert par vraie capture : en desktop, canvas restait en 960×570 malgré un panneau de 593×520, donc la sphère était coupée à droite. Le canvas est désormais explicitement calé sur stage.clientWidth/Height ; backing viewport 591×518, centrage mesuré à 0.0312px. Correction intégrée au périmètre R171 (failure-first), sans toucher au shader officiel de la vitrine.

## Validation
79/79 contrats Node PASS, Chrome WebGL réel avec SwiftShader : 5/5 matériaux, erreur WebGL=0, 18 contrôles, seul canvas. Test souris : yaw 0.519/pitch -0.181 ; clavier Home recentre et flèche modifie yaw ; tactile : yaw 0.391 et touchAction none. Pause = captures identiques, reprise = différentes, mobile 390px sans débordement. Captures WebGL courantes versionnées.
Le GPU SwiftShader ne prouve pas le FPS sur matériel physique ; esthétique et publication Cloudflare doivent rester séparées des tests techniques.

## Gate Git et durabilité
Publier sur branche SiteForge preview uniquement si remote HEAD correspond exactement à 324d8d28757ad9d3d1468b2caad14345aa7e0a09. Préférence pour plugin GitHub create_blob/create_tree/create_commit/update_ref avec comparaison d'arbre SHA et expected_sha sans force. Pas de modification de la sphère approuvée (blobs index.html 1413e30138ba1657f7056401818e697ddbd32ac8 et moteur dd63d75fdb966de2052595c95b7b6cb736d6c7cc).
