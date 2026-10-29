# R205 — Reasoning, adaptation GPU sans architecture parallèle

MISSION_ID: SYN_SITEFORGE_R204_LIGHTWEIGHT_CORE_20261029
CANDIDATE_BRANCH: task/SYN_SITEFORGE_R205_ADAPTIVE_GPU_20261029
BASE: inossarum/synestra-vitrine-preview@fd23e9c325214715b08b508da6756374f2535aef
OWNER: Synestra Studio ; QA/patch isolé, aucun lease d'une autre branche présumé.

## Défaillance/risque observé

La R204 adapte seulement le ratio de pixels lors d'un ralentissement répété; les échantillons du shader LAB R188.1 restent ceux de la classe GPU initiale (jusqu'à 34 par rayon). Sur CPU/GPU saturé, cette politique ne garantit pas le maintien de WebGL sur les petits postes. Le premier relevé headless 1440 a montré ~16 FPS durant l'initialisation; le même rendu s'est ensuite stabilisé à ~46 FPS. Ne pas confondre warmup et débit durable.

## Décision technique ciblée

Introduire une politique pure `evolveAdaptiveBudget` sans dépendance. Trois fenêtres de 30 frames dont le temps moyen dépasse 140 % de la cible abaissent d'un niveau **le tier effectif** (pas la classification de carte), les pas de shader [8,14,22,34] et volumétrie [8,10,14,18], la limite de pixels, le shadow budget et la cadence cible. Au tier zéro, WebGL reste actif. La qualité ne descend jamais sous 0,60. Dix fenêtres rapides permettent la remontée incrémentale de la résolution, pas une remontée de tier (anti-oscillation). Caches de compteurs remis à zéro quand l'onglet est caché. Les valeurs hors domaine sont refusées. Le renderer/canvas/scène/autorité existants sont réutilisés.

Fichiers modifiés: `r204-build/scene.mjs`, `tools/build_vitrine_static.mjs`; ajouté `r204-build/adaptive-tier.mjs`, tests R205 et workflow CI isolé. Le matériau d'énergie LAB R188.1 épinglé est **inchangé**. Le nouvel export n'est autorisé que sur la branche R205 exacte; `main` et production restent inchangées.

## Test/évidence

Voir `evidence/SITEFORGE_R205_ADAPTIVE_GPU_20261029.md`, JSON et captures du navigateur. Tous les tests source/contrats 11/11 PASS et Chromium réel PASS. Test navigateur au ralenti artificiel (callback RAF différé, pas un GPU faible) a fait passer le tier effectif de 3 à 2, 34 à 22 ray samples, qualité 1.00 à 0.90, avec canvas WebGL restant actif.

## Risques et gates

Le GPU intégré/entrée de gamme réel, FPS durable, perf mobile et validation esthétique AAA++ restent NON PROUVÉS. Le 404 local et l'avertissement CSP meta sont observés sans conclusion de sécurité; vérifier séparément si nécessaire. Aucun déploiement Cloudflare, changement Access, push/merge sur main, installation nouvelle IA ou dépense. Le déploiement de PREVIEW privée nécessite sa propre validation Access/HTTP/JS/WebGL et le produit commercial l'approbation du propriétaire.

## Reprise/rollback

Reproduire: `npm --prefix r204-build ci --ignore-scripts --no-audit --no-fund`, `node r204-build/build.mjs`, `node --test tests/siteforge_r204_core.test.mjs tests/siteforge_r205_adaptive_tier.test.mjs`, `$env:CF_PAGES_BRANCH='task/SYN_SITEFORGE_R205_ADAPTIVE_GPU_20261029'`, `node tools/build_vitrine_static.mjs`, lancer serveur HTTP localhost puis `node tests/siteforge_r205_browser_qa.mjs`. Ne pas partager publiquement un serveur local. Rollback par retour à la branche immutable R204 `fd23e9c...` ou revert de commit candidat sur la branche feature uniquement. Pas de dépendance au Supervisor/Bridge/Visual Observer.
