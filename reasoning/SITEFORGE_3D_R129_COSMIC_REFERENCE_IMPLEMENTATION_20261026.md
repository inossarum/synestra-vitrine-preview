# SiteForge R129 — décision technique et reprise
MISSION_ID=SYN_SITEFORGE_3D_LAB_R129_COSMIC_ORB_METAL_RINGS
CODE_SHA=d8cb907e695c8ae19a1e8684b46aaa95be205a8b
EVIDENCE=evidence/SITEFORGE_3D_R129_COSMIC_CORE_METAL_20261026.md
PREVIEW=https://4e14301d.synestra-vitrine-preview.pages.dev/siteforge/core-3d-lab/

## Décision
La référence artistique validée est le noyau cosmique d'électricité bleu/violet généré en conversation (PNG SHA256 4f981de3a05dce7599d44a175086852a43c6bc4b5b586a44d4df26a71f0e9e2e), entouré de 3 anneaux métalliques. Le besoin porte sur un modèle 3D WebGL réellement animé avec réglages, pas sur un billboard ni sur une texture-image d'un dessin. Le site public R121 reste intact. Le projet SiteForge demeure isolé sur une branche Preview.

## Architecture et choix
Conserver un seul WebGL1 et le maillage sphère réel R128 : 48*96*2 = 9 216 triangles par passe. Remplacer la couche R128 visuellement trop sombre par du bruit 3D multiscale procédural à dérive temporelle, des volutes cyan et violet, un bord de verre lumineux, une alpha partielle et un émetteur sphérique compact supplémentaire au centre (14 % du rayon global) pour matérialiser la source. Conserver arcs XYZ ramifiés et réglables (nombre, nature, formes, vitesse, couleurs). Réutiliser les 3 anneaux maillés 256 segments, leurs chanfreins, les 360° de rotation et les matériaux GGX anisotropes ; améliorer les reflets de bord et leur source centrale.

Choix de performance : ne pas ajouter un deuxième renderer, une dépendance 3D externe, des textures HDR distantes, une ressource premium ni des passes plein écran HDR coûteuses. Rester sur les budgets WebGL/DOM existants. Alternative écartée : plaquer l'image générée sur une sphère ou faire un full-screen shader 2D qui imite une sphère. Cette alternative fausserait la demande de vraie profondeur et de transformation de nature des éclairs.

## Validation et état
Cloudflare Pages Preview déployée avec code d8cb907e; 59 tests Node PASS, zéro échec. Main non modifiée ; homepage blob 43810b6eaa878c523eb06d97542d791543765d55. Ces résultats prouvent build, export et garde-fous structurels, PAS la fidélité des pixels ni le framerate mobile. La capture Chrome R128 existante n'est pas transférable comme preuve visuelle R129. Visual gate=PENDING.

## Préflight et retour arrière
Parent AGENTS.md lu sur inossarum/studio-virtuel main blob a42bcf8055c6f747eaa734f5faa7006cc57409db ; aucun AGENTS.md dans le repo preview. Skills consultés via Synestra Connect :
generative-3d-texture-pbr@1.0.0 blob 44f288ec3e8e3020d0c7e675cebbda4700579b4c (procédural, shading, contrôle énergie/matière);
visual-regression-testing@1.0.0 blob aa98fffe9149dfcc0e153f0d1b8b91f3c0a6b4ae (capture déterministe, comparaison honnête, baseline figée).
R128 Evidence ref: evidence/SITEFORGE_3D_R128_ELECTRIC_ORB_VISUAL_20261026.json ; Reasoning ref: reasoning/SITEFORGE_3D_R128_MESH_LIGHTNING_20261026.md.
Bridge PC read/list QUEUED execution_authorized=false, Desktop Commander timeout. Pas de test navigateur R129 confirmé. FREE_ONLY interdit le recours incertain à Cloudflare Browser Run à facturation additionnelle. Rollback: conserver référence R128 e47e461c et Preview a3aa385f, revert propre sur branche uniquement après contrôle HEAD. Aucune mutation de production/main.

## NEXT
Ouvrir sous une session Cloudflare Access autorisée, fixer viewport Chrome 1440x1050 puis Safari mobile, capturer images et erreurs WebGL/console, tester les réglages d'impulsions, mouvement réduit et repli. Itérer causalement sur le rendu (visibilité du noyau central, courants, arcs et brillance métal) et mesurer le coût FPS. DONE après comparaison visuelle effectivement acceptée.
