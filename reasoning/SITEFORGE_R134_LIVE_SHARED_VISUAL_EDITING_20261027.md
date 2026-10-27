# SiteForge R134 — coédition visuelle d'une scène 3D en direct
DATE=2026-10-27
MISSION_ID=SYN_SITEFORGE_SHARED_LIVE_RENDER_CONVERSATION_20261027
OWNER=Inos
OBJECTIVE=Le propriétaire et ChatGPT observent le même rendu 3D animé SiteForge; le propriétaire donne des consignes pendant la revue, une modification de code est appliquée sous contrôle puis immédiatement revérifiée ensemble.
STATUS=PRODUCT_REQUIREMENT_VALIDATED; INTEGRATION_NOT_LIVE
BASE_SITEFORGE=R116_CODE:b602b60755bd31e3645045116ef2f0946c48c712
SOURCE_BRANCH=task/SYN_SITEFORGE_R116_CLEAN_LAB_20261027
SOURCE_LAB_BLOB=1e2a1e234f9f9f47266913b6512258eab1af2764
PR_VISUAL_BROWSER=studio-virtuel#310@abbcca2dacc7a096a0e74d0b5a23270b5d2ae7c5 (DRAFT)
PR_VISUAL_CLIENT=studio-virtuel#198@c2ac6309b15caefb857bccdf2cc6c19bd350869c (DRAFT)
EVIDENCE_R82=studio-virtuel:07_REPORTS/TEST_EVIDENCE/SYN_VISUAL_OBSERVER_R82_INDEPENDENT_BROWSER_RELEASE_SCHEMA_20261027.md@04220fc01758ca5632cef4bb12981f9e0278e331
ARCHITECTURE_R80=studio-virtuel:07_REPORTS/REASONING_CORPUS_V1/SYN_VISUAL_OBSERVER_R80_BROWSER_ONLY_NO_BRIDGE_ARCHITECTURE_20261027.md@92a04fe8d48f463206c1b23ed82793f2653ac275

## Product flow (propriétaire et assistant)
1. Le propriétaire ouvre un aperçu SiteForge portant un identifiant de version/source SHA visibles. Il voit la sphère WebGL R116 réellement animée; aucun nouveau panneau de paramètres de création.
2. Une action dédiée « Partager la scène avec l'observateur » ouvre le flux existant Visual Observer côté navigateur. Sélection explicite par le propriétaire de l'onglet SiteForge via getDisplayMedia, puis second consentement pour le lecteur agent nommé. Aucune capture automatique ni pré-autorisation.
3. Tant que la session est valide, le propriétaire donne oralement ou par chat ses instructions et désigne la zone concernée (annotation/pointeur contextualisé sans autorité de code). Les notes sont rattachées à un `session_id`, un `frame_index` et au SHA de la révision visualisée. Aucun texte du navigateur n'est un grant.
4. ChatGPT consomme, via le Synestra Connect existant, des images JPEG bornées + des reçus vérifiés; il inspecte les pixels effectivement retournés à son contexte. Réception MCP seule ≠ inspection par le modèle. Le rendu WebGL reste continu chez le propriétaire; l'assistant analyse des captures authentifiées à la demande, pas un flux vidéo permanent déjà garanti.
5. Une modification demandée passe par Git isolé / test / preuve / nouvel aperçu, puis un nouvel échantillon du rendu de la même session autorisée. L'UI affiche version initiale → modification en cours → version candidate → acceptation ou retour, sans annoncer de succès sur un commit non chargé en navigateur.
6. Les frames sont ACK/revoquées/purgées; l'autorisation est brève et renouvelée explicitement si nécessaire, sans diffusion publique automatique ni stockage vidéo.

## Réutilisation obligatoire
- Le composant de capture du navigateur WebApp PR #198, le coordinateur privé / Visual Browser DO et le futur `synestra_visual_browser_frame` de PR #310, la même Cloudflare Access et le même Connect MCP.
- Ni Bridge/Windows, ni Desktop Commander, ni second Worker/DO identitaire/broker/MCP, ni nouveau service SaaS, ni API payante.
- Le tldraw R133 existant peut rester un tableau d'annotation d'appoint, mais **ne remplace pas** les frames animées du vrai moteur 3D; ne pas le présenter comme une session d'observation AI live.
- Aucun bypass du refus `POLICY_DENIED` de la mutation de consentement agent R76.

## GATES : conditions falsifiables du DONE
A. Le propriétaire ouvre un lien officiel de prévisualisation HTTP 200 et voit la sphère R116 animée, pas un 403 raw.githack; la version/sha est attribuable. Branch preview Cloudflare actuellement non allowlistée, donc publication non autorisée automatiquement.
B. Sans Bridge en service, avec Chrome natif et consentements explicites, WebApp/Visual Browser DO accepte une session et seulement un Visual reader nommé, puis Connect expose vraiment l'outil ImageContent.
C. L'assistant reçoit et inspecte au moins deux vraies frames de rendus différents, en reliant chaque commentaire à session_id/frame_index/source_sha256 et au SHA de code; le propriétaire voit l'état de la modification correspondante.
D. Failure-first : deny sans consentement, lecteur non autorisé, cadre périmé, SHA faux, replay, origine refusée, départ/retrait du partage; test de purge/ACK, rollback Git et non-régression des bindings Cloudflare existants.
E. Relecture humaine du rendu avant d'entériner chaque itération; aucune fusion sur main ni nouveau déploiement public implicite.

## État réellement observé le 27-10-2026
- PR #198 et #310 OPEN DRAFT. R82 décrit overlay Visual Browser `enabled=false`, autorisation serveur encore couplée à Bridge dans quatre modules et identité indépendante non admise.
- Dernière source Cloudflare Pages vitrine : seules previews `task/SYN_VITRINE_SITEFORGE_R91_PREVIEW_20261024` autorisées; R132 non déployée.
- Current ChatGPT tool catalog: aucun outil `synestra_visual_browser_frame` exposé; ChatGPT ne voit pas encore les pixels WebGL.
- SiteForge R132 est au GitHub SHA de référence, pas test GPU réel ni URL publique qualifiée.
- Aucun delta runtime, migration D1, IAM, Cloudflare ou code observer dans cette décision. Aucun E2E live prétendu.

SAFE_NEXT=Reprendre la qualification browser-only PR #310 sans contourner POLICY_DENIED, puis test d'admission et publication de prévisualisation autorisés; raccorder SiteForge R116 au composant PR #198 seulement après ces preuves.
SOURCE_GATE=LIMITED (Memory V1/SAL current non attestés); HOOKS_STATUS=UNKNOWN; FUNCTION_REPORT=PARTIAL.
