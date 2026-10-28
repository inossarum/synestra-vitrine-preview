# SiteForge R187.5 — suppression totale des sections de tuyau

- Directive : **réduire les sections des tuyaux de 100 %**. Une réduction stricte annule la section solide ; effacer également tout signal lumineux aurait rendu les cinq flux invisibles. Choix technique : rayon géométrique nul, filaments émissifs au centre de chacune des cinq trajectoires magnétiques. L'empreinte visuelle gaussienne sert seulement à l'antialiasing optique, pas de surface cylindrique.
- Source immuable R187.4 commit `9871eee`, worktree isolé R187.5, seuls shader `flowType=6` et libellés modifiés. Six matériaux historiques intacts.
- Validation : `node --test tests/siteforge_r1875_isolation.test.mjs` **5/5 PASS** (CSP exacte, aucune géométrie de corps/shell/spec, cinq trajectoires, reconstruction exacte R187.4 en restaurant shader/libellés/CSP, réglages JSON). Chrome Windows SwiftShader E2E bureau PASS, 9,89 % pixels animés entre deux captures avec spin et vitesse des particules figés. Chrome mobile simulé 390×844 PASS, 21,17 %. WebGL error 0.
- Premier rendu quasi éteint ; correction par émission/alpha plus élevés sans modifier largeur de filament géométrique. Captures actuelles plus lumineuses mais beaucoup moins volumétriques que R187.4, conséquence demandée.
- Aperçu : http://127.0.0.1:19095/siteforge-r1875-autonome.html?demo=energy . Serveur uniquement `127.0.0.1`.
- R187.4 source intacte, pas de publication. Restent : validation esthétique et performance GPU physique.
