# SiteForge R187.7 — diamètre réglable des flux énergétiques

- Retour utilisateur : le Labo R187.6 doit pouvoir **augmenter et diminuer le diamètre des flux** sans toucher au diamètre global de la sphère. Demande également la prochaine étape logique.
- Constat : le contrôle existant `flowStructure` affichait « Largeur des courants » (30–200 %), mais le shader du matériau 6 bloquait silencieusement la largeur entre 55 et 175 %. À 30 %, l'utilisateur n'obtenait pas sa demande.
- Choix : REUSE_FIRST. Conserver `flowStructure` et ses exports JSON v1 à 18 champs. Renommer le curseur « Diamètre des flux énergétiques » et élargir à 30–250 %, préciser « Diamètre de la sphère » pour l'autre commande. Aucun nouveau réglage, aucune migration JSON.
- Correctif shader `flowType=6` uniquement : clamp `[.30,2.50]`; noyau d'échantillonnage optique adaptatif sous 100 % pour éviter la disparition des traits très fins; compensation du gain lumineux lorsque plusieurs flux se recouvrent à 250 %, sans épaissir la géométrie SDF ou perdre cyan/magenta. À 100 %, le gain demeure identique à R187.6.
- Failure-first : premier rendu 30 % discontinu / 250 % fusionné en blanc ; test de coloration non monotone. Une compensation d'énergie et un correctif d'antialiasing ont été apportés et retestés.
- Tests : statiques `5/5 PASS`. Chrome bureau Windows SwiftShader WebGL 0 erreur ; 30, 100, 250 % → 3 499, 13 925, 41 911 pixels lumineux ; la rotation et le diamètre de la sphère restent constants. Chrome mobile simulé 390×844 PASS : 1 573, 6 695, 23 804 pixels. Captures et JSON de mesure disponibles sous `evidence/`.
- R187.6 et les six matériaux précédents sont conservés. URL locale : http://127.0.0.1:19097/siteforge-r1877-autonome.html?demo=energy ; aucune publication.
- Prochaine amélioration recommandée (R187.8) : réglage **du nombre de flux et de leur écartement** indépendamment de leur diamètre, puis maîtrise de la vitesse/amplitude des impulsions, sans multiplier arbitrairement les champs ni créer des surfaces opaques. Préférer un test A/B contrôlé avant promotion.
- Limite : esthétique R187.7 à valider par le propriétaire ; performance GPU mobile physique non mesurée.
