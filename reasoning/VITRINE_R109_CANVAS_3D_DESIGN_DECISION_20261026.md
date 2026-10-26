---
document_id: VITRINE_R109_CANVAS_3D_DESIGN_DECISION_20261026
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: PREVIEW_DEPLOYED_BROWSER_3D_QA_PENDING
source_head: 49ceb23a2b8dbec7f7651e4f8c5d61d7f3e54346
evidence: evidence/VITRINE_R109_WEBGL_CANVAS_3D_20261026.json
---
# R109 — Canvas WebGL, profondeur sans surcharge

## Intent
L'utilisateur demande si le Core peut être construit « dans un canevas » ou recevoir un effet 3D. Dans le contexte de la vitrine, il s'agit d'un Canvas HTML et non de l'ancien éditeur Canvas de ChatGPT. Reprise de la R108 approuvée : un seul objet énergétique, trois liens natifs et des mouvements légers.

## Choix et architecture
Ajouter un Canvas WebGL léger au-dessus du SVG R108, rendu opt-in par l'attribut `data-core-ready` une fois la première image dessinée. Un shader de fragment calcule une sphère en relief avec normales, Fresnel, illumination cyan/violet, turbulence 3D bornée et lumière de bord. Le pointeur change légèrement l'orientation lumineuse. Pas de maillage lourd, Three.js, modèle téléchargé, bibliothèques CDN ni nouveau service Cloudflare.

Conserver le SVG R108 si JS est désactivé, WebGL absent, contexte perdu ou préférence de mouvement réduit au chargement. Les trois liens restent HTML natifs. Pas de données Connect/Bridge simulées. Le document HTML n'autorise que `script-src 'self'` sous CSP restrictive ; tests de provenance vérifient précisément l'unique script et rejettent les scripts arbitraires. L'export statique requiert et publie exactement l'asset JS local.

## Performance et accessibilité
Shader borné à 800 000 pixels, DPR ≤1,5, faible puissance, pause hors viewport et onglet inactif ; arrêt de l'animation dans le mode « réduire les mouvements ». Style dynamique uniquement après initialisation réussie du rendu. R108 statique reste utile sans JavaScript.

## Preuves et incidents
Deux constructions initiales ont échoué sur des assertions historiques de l'accueil supposé sans script et de l'ancien attribut de classe. Corrections ciblées sans suppression des vérifications. Cloudflare final preview `c1734bb8-6a14-4512-bd7f-550217effe1a` code HEAD `49ceb23a2b8dbec7f7651e4f8c5d61d7f3e54346` : **37/37 tests PASS**, `node --check` PASS, 38 fichiers à liste blanche, stage deploy success, pas de production.
**Limites** : pas d'exécution WebGL réelle dans un navigateur, pas de pixels vérifiés, pas de capture mobile/Safari. La réussite du déploiement ne prouve pas le rendu GLSL sur tous GPU. Garder R108 `09878cec-39d1-4ca7-a3c3-09a60a11a48b` comme rollback.

NEXT : capturer le Canvas sur un navigateur WebGL qualifié et sur Safari mobile, vérifier contexte initial/échec, CSP HTTP, fallback reduced-motion, clavier, performance/frame rate. N'autoriser la production qu'après revue visuelle et accord propriétaire.
FUNCTION_REPORT=PARTIAL
