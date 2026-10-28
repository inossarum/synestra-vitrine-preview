# SiteForge R187.4 — cinq flux énergétiques plus fins
- Demande du 28/10 : réduction de l'épaisseur des trois cylindres énergétiques de R187.3 et augmentation de leur nombre, avant une nouvelle revue visuelle.
- Reuse-first : copie isolée de R187.3 au commit `5a0c16e`. Ancienne source inchangée.
- Décision : **3 → 5** volumes toriques superposés en trois dimensions, centres dynamiques et directions distinctes, section des trois anciens réduite ~31-34 % (rayon normalisé) ; deux nouvelles familles inclinées. Conserver les couleurs cyan/magenta, les surfaces translucides et les reflets mobiles; surtout pas de tuyau SDF opaque.
- Régression optique : première capture R187.4 sous-exposée, correction bornée de l'émission et de l'alpha sans épaissir la géométrie.
- Preuve technique : 5/5 tests statiques PASS (CSP exacte et isolation `flowType=6`, reconstitution R187.3), Chrome HTTP SwiftShader bureau PASS 23,52 % de pixels animés en 2,1 s, mobile simulé 390×844 PASS 39,13 % ; phase spin et vitesse particule inchangées à zéro, WebGL 0 erreur.
- Captures réelles `evidence/r1874-first.png`, `r1874-later.png`, `r1874-energy-ui.png`, et deux captures mobile. Les métriques de pixels mesurent un mouvement, non la qualité artistique.
- Aperçu en local `http://127.0.0.1:19094/siteforge-r1874-autonome.html?demo=energy`; environnement sur Inos-Cerebros.
- Aucun push, merge, déploiement. R187.3 et R186 public préservées. Limites : GPU physique/performance, esthétique finale non approuvée.
