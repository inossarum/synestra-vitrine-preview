# Labo 3D SiteForge — réorientation R187.1

- Intent utilisateur : les boucles énergétiques lumineuses cyan/magenta de R187 étaient la référence la plus proche, malgré manque de consistance, de mouvement et de relief. Refus de la trajectoire ultérieure R188/188.1 (tubes plastiques) et R188.2 (réseau électrique diffus et désordonné).
- Décision : retour au shader R187 sans remplacer ses trois enveloppes toriques transparentes. Animer les centres 3D et les rainures/filaments dans la géométrie existante, avec phase indépendante de `particleSpeed`; éviter toute SDF opaque et toute multiplication chaotique d'arcs.
- Delta optique borné : augmenter la présence des flux sans exagérer l'alpha au point de produire des tuyaux. Conserver l'occlusion progressive avant/arrière, réduire la taille du noyau blanc.
- QA : `node --test tests/siteforge_r1871_isolation.test.mjs` = 3/3 PASS ; R187 reconstitué exactement après inversion des ajouts, sans toucher aux matériaux 0–5. CSP hachée exactement.
- Chrome réel HTTP local (SwiftShader) : desktop 27,74 % pixels animés en 2,1 s, mobile simulé 41,19 % ; rotation globale inchangée et `particleSpeed=0` ; WebGL 0 erreur.
- Preuves : `evidence/SITEFORGE_R1871_ENERGY_MOTION_20261028.json`, captures 4 PNG, hashes. La comparaison est temporelle, pas un score de qualité artistique.
- Preview locale : http://127.0.0.1:19091/siteforge-r1871-autonome.html?demo=magnetic ; R187, R188, R188.1, R188.2 restent inchangés. Aucun push ni publication.
- Gate : rendu visuel toujours diffus et approbation artistique propriétaire non obtenue. Test FPS réel GPU matériel mobile non exécuté.
