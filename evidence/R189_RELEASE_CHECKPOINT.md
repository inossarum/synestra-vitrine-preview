# R189 — Qualification WebGL native, baseline avant moteur Babylon

Base R188.9 b3ebbfd5a7ee1e0fccf40ac3b04dee15dd4dedd6.
Chrome RTX 3090 : WebGL ready, quatre noyaux, vues 1100 et 390px, familles 0/6/8, erreur GPU 0.
Récupération après perte du contexte WebGL : PASS, bouton puis reload contrôlé. Clavier et reduced motion : PASS.
R188.9 matrice GPU : 108/108 combinaisons sans erreur. 30 tests de régression Node R1883–R189 : PASS.
Captures du navigateur et JSON vérifiés dans evidence/SITEFORGE_LAB_R189_BROWSER_20261029.json et evidence/r189-*.png.
Firefox et Edge physiques, téléphone physique, GPU modeste : PENDING ; aucun déploiement public.
Décision ultérieure propriétaire : migrer vers le moteur web 3D le plus capable. Nouvelle branche expérimentale Babylon.js, R189 conservé pour rollback.
