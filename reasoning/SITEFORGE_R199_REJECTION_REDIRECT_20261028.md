# R199 — Reprise après refus explicite de R198

## Fait
Le propriétaire a explicitement refusé R198 (« non... Je ne valide pas »). En conséquence, cette version ne doit pas être promue, déclarée livrée ni utilisée comme direction artistique approuvée.

## Diagnostic
Superposition de grands anneaux obliques, montants latéraux et halos pseudo-volumétriques produisant du désordre au lieu d'une lecture spatiale. R198 conserve un seul moteur WebGL mais son éclairage environnemental est essentiellement une peinture CSS.

## Nouvelle hypothèse, distincte et réversible
R199 est une alcôve architecturale sobre et perspective : surfaces latérales en métal, joints quasi invisibles et sol mat. Les réponses lumineuses violette et verte sont limitées aux parois faisant face à la sphère et à l'empreinte diffuse immédiate sur le sol. Aucune structure circulaire décorative ne l'entoure et aucun nouveau moteur n'a été créé.

Le shader de la sphère R198 reste **identique au bit près** : position initiale, caméra fixe au survol, perturbation locale, 22 échantillons desktop/14 mobile. Couleurs officielles préservées. Aucun reflet miroir.

## Validation technique
- Node 164/164 PASS, dont les contrats R199 et les tests d'échec (retour anneaux/reflets ou doublon canvas).
- Chrome 15/15 rendus aux largeurs 1440, 768 et 390 ; CSS responsive/reduced motion PASS.
- Pointeur WebGL max 0.7266, décroissance 8.03e-11, tilt [0,0] sur toutes les mesures.
- Captures desktop et mobile comparées visuellement à R198. L'allègement est net, mais **aucune validation subjective du propriétaire**.
- Le rendu d'irradiance est toujours une approximation CSS, pas de PBR. Pas de mesure FPS matérielle.

## Délivrabilité et retour arrière
Branche R199 isolée, R198 conservée au commit ea514ee. FREE_ONLY, aucune fusion main, aucun déploiement ni modification du portail. Owner gate authentique = validation de direction artistique ; si refus, ne pas réitérer en ajoutant encore des effets arbitraires : clarifier une seule référence visuelle ou construire une scène 3D partagée sous perf budget confirmé.

NEXT : revue par propriétaire de `http://127.0.0.1:18850/r199/`; intégrer seulement après validation explicite.
