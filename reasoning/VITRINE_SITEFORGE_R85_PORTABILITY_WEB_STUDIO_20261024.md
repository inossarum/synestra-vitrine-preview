---
document_id: SYN_VITRINE_SITEFORGE_R85_PORTABILITY_WEB_STUDIO_20261024
document_type: REASONING
state: ACTIVE_MISSION_CHECKPOINT
scope: public Synestra vitrine / existing SiteForge
---
# R85 — Procédure de création Web Studio réappliquée, liens SiteForge portables

MISSION_ID=SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
DATE=2026-10-24
OWNER=Inos
BASE=08511f59e90c7303f96b29d7cad290dc722d6e3e
SOURCE_FIX=4d40ceee9ef9020f641630c60d0ad1bef96e14c6
BRANCH=task/SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
EVIDENCE=evidence/VITRINE_SITEFORGE_PORTABLE_LINKS_R85_20261024.json
HOOKS_STATUS=UNKNOWN

## Source Gate et méthode réutilisée
Sources : `AGENTS.md@8fa0088e` (Studio), décision maître Web `b1a70c73`,
Memory V1 manifeste `bc43f64a`, SAL GitHub-first `2bbf6256`,
`tools/README.md` complété sur la branche `@5f19de1e`, Central Skills UX,
accessibilité et browser compatibility. Aucune nouvelle infrastructure Web,
MCP, autorité ou système d'identité. Le programme Studio attend une vraie
revue visuelle Chrome et un Visual Gate : test textuel ≠ jugement esthétique.

## Cause racine
À la prévisualisation locale R84 `127.0.0.1:4189`, la sous-page
`/siteforge/projects/` répond 200 alors que l'ancien chemin codé en dur
`/synestra-vitrine-preview/siteforge/projects/` répond 404.
Vingt pages HTML SiteForge contiennent des liens liés au chemin GitHub Pages,
non compatibles avec une vitrine publiée à la racine d'un domaine cloud.
Le test Python canonique initial valide à tort ce préfixe fixe ; il a été
mis à jour sur R85 avant de modifier les pages.

## Décision
Rendre les liens de navigation internes relatifs à chaque répertoire,
sans modifier les URLs canoniques SEO dans cette phase et sans introduire de
router JavaScript, de redirection cloud ni de duplication de page. Réécriture
bornée de 210 `href` dans 20 pages. Les 20 nouveaux blobs Git ont été comparés
à leurs SHA locaux, puis déposés sur la branche isolée via les primitives
GitHub Git tree / commit / update_ref non forcé. Pas de modification de main,
PR #3, Web App / Cloudflare ni Worker. Le script temporaire PowerShell
de transformation n'est pas un générateur canonique ; lors d'une future
régénération SiteForge, localiser et adapter d'abord le générateur propriétaire
et vérifier le propriétaire de cette source.

## Preuves
Failure-first : test Python nouveau contrat RED (25 échecs), then GREEN
5/5 PASS sur copie locale modifiée, exit 0. Audit statique sur les blobs
GitHub issus du commit correctif : 20 pages distinctes et 0 cible interne
absente parmi les liens relatifs vérifiés. Diff du commit source : seulement
20 fichiers `siteforge/*/index.html`. Documentation `tools/README.md`
actualisée, sans changer les outils.
Le seul Chrome validé est R84 ; Chrome R85, Vision Gate R85, Node R85,
HTTP R85 et inspection directe de captures R85 = NOT_RUN.
Le portail public reste inchangé. `rel=canonical` et `og:url` conservent
l'ancienne adresse GitHub Pages ; leur migration dépend du futur hostname
et de l'autorité du chantier Cloudflare.

## Canal PC et incident
Usage prioritaire Connect → Bridge, conformément à la consigne du propriétaire.
Une commande a produit `PC_TOOL_EXECUTION_FAILED:ValueError` sur une sortie
de test volumineuse ; la récupération bornée du journal a permis de
vérifier les 5 tests PASS. Plus tard, l'opération Connect
`5f9e0a2b-a258-43d3-9a5a-0fd6a15110f8` est devenue `BLOCKED`.
Ce refus n'est pas une permission de passer sur DC ni de modifier la politique.
Pas d'attestation Windows native revendiquée (`SOFTWARE_KEY` seulement).

## Décisions négatives et recovery
- Ne pas corriger les métadonnées canonique/OG sans domaine qualifié.
- Ne pas merger directement main/PR #3, ni publier Cloudflare/GitHub Pages.
- Ne pas déclarer une inspection visuelle ou un E2E Chrome R85 sans
  capture/source/viewport et preuve du code de sortie.
- Ne pas effacer les modifications staged du worktree R85 tant qu'aucune
  opération autorisée et propriétaire n'a relu le contexte.
- Préserver la source commitée : le rollback est possible en revenant
  au commit précédent sur la branche dédiée après contrôle d'owner/lease.

## NEXT
1. Requalifier Connect sans boucle ni contournement de BLOCKED ; vérifier
   le propriétaire/lease du worktree R85 et son SHA exact.
2. Checkout propre du HEAD R85, tests Node, Python, Chrome 390/1440,
   navigation SiteForge effectivement cliquée et inspection des captures.
3. Passer Web Pilot et Visual Gate avant/après au même viewport, contrôler
   débordement, clavier, demandes externes et rollback, produire Evidence.
4. Préparer l'intégration contrôlée PR #3 une fois les conflits et l'autorité
   vérifiés, puis laisser le cutover Cloudflare au chantier concurrent.

FUNCTION_REPORT=PARTIAL
SOURCE_GATE=LIMITED_RUNTIME
