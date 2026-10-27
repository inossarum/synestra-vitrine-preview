# SiteForge R132 — remise à zéro du laboratoire sur la sphère R116
DATE=2026-10-27
MISSION=SYN_SITEFORGE_R116_BLANK_LAB_20261027
OWNER=Inos
BRANCH=task/SYN_SITEFORGE_R116_CLEAN_LAB_20261027
BASE_R116=b602b60755bd31e3645045116ef2f0946c48c712
EVIDENCE=evidence/SITEFORGE_R132_R116_CLEAN_LAB_20261027.json

## Décision du propriétaire
« Reprends la sphere R116… et vire tous tes reglages labo. Repars sur un labo vierge. On va repartir etape par etape. »

La R131 et ses outils ne sont pas une baseline à nettoyer : créer un nouveau labo depuis le commit historique R116, avant les gyroscopes métalliques et avant les éditeurs R123/R129/R131. La branche précédente demeure réversible et intacte.

## Implémentation minimale
Une seule page `siteforge/core-3d-lab/index.html`, un seul canevas, aucune UI de réglage et aucun service réseau. Source R116 du GPU `assets/core-r109-webgl.js` blob Git `d78d7222a95fd080a408bba2237dd3b9dda05bd7`. Isoler les lignes de moteur commençant à `const scene` dans `assets/siteforge-r116-sphere-only.js` pour ne pas importer les particules de fond de la vitrine. Le fragment GLSL est conservé **strictement à l'identique** par comparaison directe de chaînes : huit arcs R111, même fréquence et rendu R116. Dimensions CSS et facteur d'échelle `.49` repris du R116 historique. Le fallback SVG ne garde que la sphère, sans capsules de navigation ou orbites externes.

Aucun jeu de préréglages, sélecteur de couleur, JSON, comparaison d'images ou nouveau shader. La source globale R116 et le fichier racine `index.html` sont inchangés. Aucune altération de `main` ni de Cloudflare.

## Vérification honnête
GitHub a confirmé les blobs nouveaux et anciens. Contrôles statiques: absence de panneaux et scripts ultérieurs, CSP fermée, HTML un seul canevas. Scénarios JavaScript simulés 9/9 PASS sur les conditions WebGL refusé, mouvement réduit, shader d'origine et un appel au GPU simulé. Un nouveau fichier de tests Node a été commité, mais **la suite Node complète et un vrai navigateur WebGL n'ont pas été exécutés**. Les 46 tests et le déploiement R116 historiques ne prouvent pas la R132. Ne pas annoncer la R132 comme déployée.

## Choix écartés et garde
Ne pas réinitialiser la R131 en place : son arbre inclut les scripts et panneaux ajoutés depuis R116. Ne pas copier son shader « neutre » : il diffère du R116. Ne pas déployer sur Cloudflare sans habilitation explicite de branche en prévisualisation et contrôle visuel du véritable GPU. Le lien raw.githack dérivé du commit de code n'a pas été validé par navigateur HTTP.

## Suites
1. Faire examiner la sphère R116 seule au propriétaire.
2. N'ajouter ensuite que la prochaine modification expressément demandée, avec diff borné.
3. Pour une URL de labo publiée, vérifier autorisation Preview Cloudflare, tests navigateur et rollback.

SOURCE_GATE=LIMITED (Memory V1 et SAL/Runbooks à revalider).
HOOKS_STATUS=UNKNOWN.
FUNCTION_REPORT=PARTIAL.
