# R206 — preuves navigateur local et contrôle de scène

MISSION_ID=SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029
SOURCE_BASE=inossarum/synestra-vitrine-preview@a17d2192ec0f6fd3f8df8a5abe916b42f2f6817f
BRANCH=task/SYN_SITEFORGE_R206_GRAIN_MIST_STAGE_20261029
OWNER=Synestra Studio ; REVIEW=ChatGPT (inspection des captures réelles)
DATE=2026-10-29
DEPLOYMENT=NOT_EXECUTED_AT_THIS_CHECKPOINT

## Livrables locaux
- Hero exclusif : grain de film self-hosted PNG 96x96 (11 443 octets), micro-animation uniquement Tier 2/3, masqué Tier 0/reduced motion, aucun évènement pointeur.
- Brume basse : un seul mesh plane shader UV bon marché, pas de raymarch ni de second renderer, teintes violettes/vertes; Tier 0 désactive le mesh, Tier 1 réduit l'intensité, Tier 2/3 donnent un léger voile.
- Socle : deux anneaux encastrés supplémentaires ; arrière-plan proche : six nervures discrètes.
- Source LAB R188.1 préservée. Governor GPU R205, architecture 1 renderer/1 canvas, pages produits HTML inchangées.

## Résultats observés
- Installation npm verrouillée existante ; esbuild bundle 584110 octets (R205 582499), delta +1611 octets; budget de bruit PNG 11443 octets.
- Node --test R204+R205+R206 : 19 PASS, 0 FAIL.
- Export Cloudflare branch-specific : 72 fichiers, assets R206 présents, PASS.
- Chrome CDP réel sous Inos-Cerebros depuis serveur localhost 127.0.0.1:18882 : viewport 1440x900, 768x900, 390x900, WebGL READY, un canvas, shader LAB R188.1, pas de débordement horizontal. Quatre pages produit non WebGL (Connect/Bridge/SiteForge/Offres) PASS; mode reduced-motion statique PASS.
- FPS headless indicatifs: 1440 warmup 15.7 puis stabilisé 47.6 ; sous CPU x6 ~39.5 ; 768=42.9 ; 390=45.4. **Pas une preuve de GPU modeste physique ni une garantie utilisateur**.
- Sous injection RAF lente (test navigateur) : tier effectif 3→2, échantillons 34→22, qualité 1→0.90, Core READY, un canvas; PASS.
- Revues humaines des vraies captures à 1440/390 : Core toujours filaire et volontairement sobre; socle plus structuré; brume subtile, grain faible. Pas d'AAA++ officiellement accepté.
- Captures : evidence/SITEFORGE_R206_CHROME_1440.png SHA256 C2A24F75FA20B18E46594296B5E8DF2CFE858A07A4212139F036890273EF25B4 ; 768.png B77101055B6A609E88D553EA0F5F2C15B6D9C862AD1B77CB505A00C72D5957E5 ; 390.png 23DD62BB118B39CEED2588CDFA06E7D44C58D202D081BC0E552B82B4EA61F251.
- Capture metadata : evidence/SITEFORGE_R206_CHROME_20261029.json; test reproductible tests/siteforge_r206_browser_qa.mjs.
- WMI GPU physique : NVIDIA GeForce RTX 3090 uniquement, driver 32.0.16.1692. SYNESTRA-WIN-01 est OFFLINE. LOW_END_PHYSICAL_E2E=NOT_PROVEN.
- Browser local logs: avertissements CSS CSP frame-ancestors et un 404 de ressource locale déjà connus R205; ne pas qualifier comme fail E2E des ressources critiques sans examen distinct.

## Contrôles sécurité/durabilité
- R206 isolé de main, production interdit; rollback R205 commit a17d2192ec0f6fd3f8df8a5abe916b42f2f6817f.
- Un seul canvas, aucun nouveau Worker/broker, aucun média externe, aucune installation globale ni coût.
- Cloudflare private PREVIEW Access + test en ligne : PENDING. Approval artistique : PENDING.
