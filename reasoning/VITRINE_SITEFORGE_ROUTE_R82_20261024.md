---
document_id: VITRINE-SITEFORGE-ROUTE-R82-20261024
document_type: REASONING
project: Synestra
domain: public-site-web
metadata_state: ACTIVE_TASK_DRAFT
tags: [WEB, SITEFORGE, PORTABILITY, ACCESSIBILITY, EVIDENCE, FREE_ONLY]
---

# R82 — SiteForge portable et entrée « Se connecter »

MISSION_ID=SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
OWNER=Inos
SOURCE_BRANCH=task/SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
PR_PARENT=https://github.com/inossarum/synestra-vitrine-preview/pull/3
DATE=2026-10-24
BASE_R81=2b866ca3a06ca7b3aaaa9b910ab35e873bbec4d2
EVIDENCE=evidence/VITRINE_SITEFORGE_ROUTE_R82_20261024.json
STATUS=SOURCE_ONLY; E2E_RUNTIME_NOT_RUN; NO_CLOUDFLARE_DEPLOYMENT

## Observations et contraintes

Le nouveau lien de la section SiteForge pointait en dur vers `https://inossarum.github.io/synestra-vitrine-preview/siteforge/`. Il fonctionne pour une vitrine sur Pages, mais détournerait le futur site Synestra sur un autre domaine. Son nom accessible mentionnait également cette prévisualisation. L'en-tête de PR #3 disait « Espace pilote », alors que l'entrée publique précédemment publiée sur main et la décision propriétaire #84 demandent un « Se connecter » identifiable.

Le projet principal `inossarum/studio-virtuel` impose SOURCE_GATE, Memory V1, SAL GitHub-first, séparation publique/Web App/Supervisor et qualification honnête. Son Web App/cloud cutover est un chantier concurrent ; aucun IAM, Worker ni route /studio n'est modifié ici.

## Décision minimale

1. Employer `href="./siteforge/"`, chemin relatif à la vitrine, afin de rester sur la même origine et de déplacer ensemble page publique et démo lors d'un cutover autorisé. Prérequis : publier `siteforge/index.html` avec l'accueil ; pas d'affirmation E2E avant vérification HTTP.
2. Remplacer l'étiquette de navigation « Espace pilote » par « Se connecter » sans modifier la destination privée ni introduire une fausse authentification client native. Le texte de prudence demeure.
3. Neutraliser le nom accessible lié à GitHub Pages en le remplaçant par « sur ce site ».
4. Conserver la prévisualisation statique CSS et sa déclaration de non-certification, sans contenu client, requête ou nouveau service.

## Alternatives écartées

- Une redirection JavaScript, un nouveau routeur, ou une passerelle SiteForge : complexité, superficie de sécurité et coûts non justifiés.
- Un lien absolu vers le nouveau domaine Cloudflare : hostname non qualifié, créerait le même couplage.
- Une copie générée de SiteForge dans PR #3 : la source principale existe déjà dans `main:siteforge/` (8 commits derrière la base PR #3), duplication de code évitée.
- Une fusion automatique de `main` : le fichier `index.html` a changé sur les deux lignées ; les modifications concurrentes du chantier de migration doivent être vérifiées.
- Une publication directe `main` ou un build Cloudflare : interdits hors gate de déploiement.

## Tests et preuve

- Exact blobs source `index.html@52fa85bead6fc3db82628164fc41eb2cf14abd39` et `tests/site_contract.test.mjs@ffe28d8676e9304a94346303b19525aa0d19aca4`.
- RED source : 4/4 contrôles ciblés manquants avant correction (vérification pure JS V8, pas suite Node).
- GREEN source : 28/28 contrôles statiques après correction, y compris ancres, labels, CSP, mode pilote, focus, responsive, absence de script tiers et sections existantes.
- Tests natifs Node, Chrome mobile/bureau, Web Pilot MCP, accessibilité lecteur d'écran et HTTP destination : `NOT_RUN` / `NOT_VERIFIED`. Les anciens 82/82 Node et E2E Chrome concernent un autre HEAD, ils ne prouvent pas R82.
- Bridge Connect : diagnostic antérieur `326b2790-2400-4859-993c-ae988888f535` et nouvelle commande de version Node `2fa6ca02-55f1-4746-b35e-9017b9a280d1` restent `QUEUED`, `execution_authorized=false`. Aucun contournement.
- Web public : navigation outil indisponible ; ce n'est pas une preuve que l'URL a été supprimée ou que le site est indisponible.
- GitHub : PR #3 HEAD `78cdb83825478948e9557aae01f4eb0ad562cf60` DRAFT, inchangé au contrôle. Worktree hôte/lease inconnus, donc aucune fusion.

## Recovery et suite

Tout le correctif est isolé dans sa branche ; rollback sans impact sur le site publié en abandonnant cette branche (après accord propriétaire). Première exécution sûre suivante : clone propre de HEAD dédié dans un espace explicitement autorisé, contrôle Git puis `node --test tests/*.test.mjs`, `node tests/browser_cdp_qa.mjs` et `node tests/web_pilot_real_capture_qa.mjs`. Ajouter ensuite la preuve réelle de démo `./siteforge/` dans l'artefact de publication et le test de navigation public. Tester les refus et états de connexion séparément.

FUNCTION_REPORT=PARTIAL
SOURCE_GATE=LIMITED_RUNTIME
HOOKS_STATUS=UNKNOWN
