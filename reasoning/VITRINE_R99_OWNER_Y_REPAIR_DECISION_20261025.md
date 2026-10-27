---
document_id: VITRINE_R99_OWNER_Y_REPAIR_DECISION_20261025
document_type: REASONING
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
owner: Inos
status: ACTIVE_CHECKPOINT
release_gate: HOLD
evidence: evidence/VITRINE_R99_OWNER_Y_GLYPH_REPAIR_20261025.json
tested_head: a79474fd7f5eb4853a9197a1d3ef2b6511393c99
---

# R99 — Y réparé, lettrage de référence réintégré

## Retour propriétaire et première cause
L'utilisateur a explicitement rejeté les précédentes retouches du Y, qui ne faisaient qu'ajouter de petits reflets sans reconnecter correctement les trois branches de la lettre. Le raster de bannière validée `en_tête_futuriste_du_studio_synestra.png` est disponible localement : 2804 × 561, SHA256 `db31ff091ff0a8ed5ad2624e83153f22796cf3cc791ab7a4b59eb6a958adf409`. **Fichier éditable/source de la police officielle : MANQUANTE.** On conserve comme autorité visuelle la typographie de cette bannière plutôt que de déclarer une fonte reconnue sans preuve.

## Correction
- Recomposition du Y en silhouette **géométriquement continue** (jointure centrale et fût) en respectant l'épaisseur, la ligne supérieure, la hauteur des lettres voisines et la finition acier de la bannière. Aucun nouveau style de lettre ni texte supplémentaire.
- Preuve purement pixel : le masque des 135 × 95 px entourant le Y contient les 12 702 pixels modifiés ; tous les pixels de la bannière hors rectangle sont **strictement inchangés**. Nouveau PNG `Synestra_Banniere_Y_Corrige_Officiel_R99.png`, SHA256 `e43269c2f07b45292fb5c0b89afe9786ffa6dbd1ac628a84eef1392cdd0739d3`.
- Dérivé transparent WebP 785 × 168, 46 950 octets, SHA256 `07d99fe5aa837522926dc7f4d8e605a020838df2575549bc01bf282cc00d626c` (blob Git `a3e1d5de3ebc4b9735387358ddca67b3d4f31243`). Il contient le S chromé et le lettrage SYNESTRA STUDIO NUMÉRIQUE avec Y corrigé.
- Intégré à l'en-tête de la vitrine sur la branche DRAFT PR #5, sans lettrage CSS doublon. Asset officiel central AVIF indépendant non modifié. Pas de modification au noyau orbital/énergie (chantier distinct déjà demandé par le propriétaire).

## Tests et limites
- Failure-first : le test R99 échoue avant intégration (1 FAIL, 1 PASS) au HEAD `71d538244527aa8cfaf04d3c3bc5330eb2b93d0b`.
- Code effectif du site, HEAD `a79474fd7f5eb4853a9197a1d3ef2b6511393c99` : 112/112 Node PASS ; 15/15 Python PASS ; Chrome CDP 390×844 et 1440×900 PASS. Chargement réel du WebP avec `naturalWidth=785`, logo central conservé, zéro débordement, clavier et `prefers-reduced-motion` PASS. Web Pilot via six appels MCP PASS, `ADVISORY_NO_FLAGS`.
- URL externe exact-head `https://raw.githack.com/inossarum/synestra-vitrine-preview/a79474fd7f5eb4853a9197a1d3ef2b6511393c99/index.html` HTTP 200. WebP HTTP 200 `image/webp` ; GitHack redirige à `raw.githubusercontent.com`, autorisé par CSP R97.
- Les pixels de Chrome ont été capturés localement, mais n'ont pas été transmis à ce modèle par une route Visual Observer LIVE qualifiée. Pas de `E2E_PIXEL_INSPECTION=PASS` ni de validation esthétique propriétaire attestée.
- Les tests historiques R95/R98 liés à l'ancien en-tête ont été mis à jour ; deux erreurs de test intermédiaires (regex/test ancre de reduced motion) ont été corrigées et la suite complète rejouée.
- Le master PNG officiel `Synestra_Studio_Logo_Officiel_V1.png` et le dérivé du noyau `synestra-studio-official-v1.avif` n'ont pas été modifiés.

## Choix et risques
- Ne pas recréer arbitrairement la « police officielle » par le nom d'une fonte non prouvée ; le raster validé tient lieu de référence graphique.
- L'en-tête est une image responsive plutôt qu'un texte éditable. C'est un compromis visuel vérifié ; alt descriptif, lien accueil et contraste nécessaires pour l'accessibilité.
- La version source GitHub ne doit pas incorporer des polices binaires non autorisées ; aucun fichier de police ajouté.
- Le WebP a été dérivé d'une image retouchée : son alpha a été nettoyé du fond bleu nuit ; légère perte possible sur les effets périphériques dans la miniature du header, à inspecter avec le propriétaire.
- Aucun merge, aucune modification Cloudflare, aucune dépense, aucun autre Worker/broker/Supervisor.

## NEXT
Présenter la nouvelle prévisualisation et la bannière haute résolution au propriétaire. Conserver la PR DRAFT et les règles Source Gate. Le travail sur le noyau 3D avec flux vers Bridge/Connect/SiteForge reste **OUVERT** et doit recevoir son propre delta et ses propres tests, pas être déclaré accompli par le changement typographique.
