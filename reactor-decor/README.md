# Réacteur Synestra R212 — DECOR ONLY

- Mission : **décor uniquement**, pas de sphère, pas de flux énergétiques du Core ; CORE_SOCKET réservé au Labo 3D.
- Source reproductible : `build_reactor_decor.py` (Blender 5.2.2 LTS, géométrie/matériaux d'origine).
- Livrables : `dist/synestra_reactor_decor_r212.blend`, `dist/synestra_reactor_decor_r212.glb`, `dist/reactor-decor-preview.png`, `dist/reactor_manifest.json`.
- 28 segments muraux, 7 anneaux de plafond, 22 segments de passerelle, 2 pylônes, socle, panneaux PBR et 3 textures intégrées au GLB.
- Adapter Babylon.js 9.33.0 : repo Studio `05_PROJECTS/atlas-babylon-3d` (PR #360) ; il réutilise Engine/Scene de l'hôte, sans deuxième moteur.
- Essais Chrome réel Inos-Cerebros : 1440x900 et 390x844, WebGL READY, 1 canvas, Core absent, 283 maillages importés, 3 textures PBR, Ultra→Économie, Core externe préservé après `dispose()`, aucun débordement mobile.
- SHA des captures et GLB à vérifier avant publication ; `evidence/` contient vrais PNG Chrome.
- **Statut** : candidat esthétique encore insuffisant face à la référence cinématique ; infrastructure Atlas candidate, SiteForge hero final NON DONE. Aucun déploiement / merge `main`.
- Seul le propriétaire arbitre la validation artistique finale. FREE_ONLY.
