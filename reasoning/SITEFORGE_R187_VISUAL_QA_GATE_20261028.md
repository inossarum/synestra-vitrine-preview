# SiteForge Labo 3D R187 — checkpoint de reprise

- R186 public réel : https://inossarum.github.io/synestra-siteforge-r176-lab/r186.html (HTTP 200 vérifié localement).
- Référence : R185 + R186 add-only. Septième matériau `flowType=6` seul modifiable. Les matériaux `0..5`, noyau et réglages historiques sont protégés.
- Worktree autonome R187 à HEAD `2b9677b839ef25db3bc21ea46e0784c579868802`; aucune mutation de main ni publication.
- R187 généré : rails éclairés plus fins, réduction du halo et du cœur surexposé. L'ancien R186 reste intact par comparaison exacte du code hors branche du matériau 6.
- Tests : syntaxe JavaScript PASS, build/isolement PASS; contrôle navigateur R186 PASS. Browser R187 FAIL : `data-core-ready=null` et message initial WebGL, malgré contexte WebGL disponible. Échec également avec changement d'une seule constante, suggérant un problème de compilation à froid, non prouvé.
- Conséquence : **NE PAS qualifier R187, ne pas publier, ne pas présenter son rendu comme visible**. Première étape de reprise : instrumentation du cycle de compilation WebGL (temps, shader info log, contexte GPU), nouvelle capture réelle avant toute itération artistique.
- Retour arrière : abandon de la branche isolée R187 ; la preview R186 publiée n'a pas été modifiée.
