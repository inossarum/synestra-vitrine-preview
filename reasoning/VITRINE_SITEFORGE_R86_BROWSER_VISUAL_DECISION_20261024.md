---
document_id: SYN_VITRINE_SITEFORGE_R86_REAL_BROWSER_DECISION_20261024
document_type: REASONING
status: ACTIVE_MISSION_CHECKPOINT
mission_id: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
source_commit: 018ce0a7620dc15caf05a74f6772f3620a4ee76e
evidence: evidence/VITRINE_SITEFORGE_REAL_BROWSER_R86_20261024.json
---
# R86 — R85 qualifié en navigateur réel, preview propriétaire et cache restauré

## Sources et invariants
AGENTS.md (Studio main @ b74399167683e27f6a43c5a8f1f33267e83d66d6), L0 @ cdfd624d, Memory V1 manifest @ bc43f64a, décision Web @ b1a70c73, SAL GitHub-first @ 2bbf6256, R-WEB-VISUAL-PREVIEW-001 @ 70de2947, R-VISUAL-001/002 @ c5e394d0, trois skills UX/accessibilité/browser et leurs dépendances advisory (snapshot @ a2d09123). Préservation main/PR #3/Cloudflare/Bridge et FREE_ONLY.

## Récupération sans altérer le worktree staged
Synestra Connect a requalifié une autorisation logicielle suffisante pour des commandes PC effectuées réellement ; l'inscription/autorisation natives du Bridge restent distinctes et non attestées. Le checkout historique R85 était au commit 8239e6b0 avec 20 HTML modifiés ; il n'a pas été écrit ni nettoyé. Le premier clone isolé au commit 018ce0a7 a échoué avec 23 blobs manquants dans l'object store local, malgré la présence du commit. Correction autorisée exclusivement sur **la nouvelle copie isolée** : Git fetch --refetch depuis la branche GitHub publique, puis git restore --worktree --source du SHA immuable sur cette seule copie. Après réparation, HEAD=018ce0a7, fichiers manquants=0, état clean.

## Tests nominaux et négatifs
Node 87/87, Python 5/5, exit=0. Serveur Python de prévisualisation local lié à 127.0.0.1:4190 : dix routes échantillonnées HTTP 200, ancienne route préfixée fautive HTTP 404. Le blob de siteforge/index.html servi est b67811bf23f04d147645144fcf735c017db0be79. CDP Chrome réel 390×844 et 1440×900 : viewport, clavier, FAQ, overflow, zéro requête externe PASS. Web Pilot MCP local : six appels PASS, statut ADVISORY_NO_FLAGS, jamais WCAG ni CWV de terrain. Visual Gate : exit=0, delta CSS temporaire observé par empreintes, HTML restauré au blob c354a8b5b2a89e494f9a061b6cb7f28b68e2aa01, zéro tuile résiduelle après restauration sur les deux viewports. Un E2E HTTP/Chrome supplémentaire a visité 22 routes à chacune des deux tailles (44 navigation checks), réellement cliqué SiteForge→Projets, et validé URL, DOM, absence d'overflow et profils Chrome nettoyés, exit=0.

## Revue visuelle effective
Quatre JPEG provenant de la vraie session Chrome CDP (vitrine + SiteForge, 390 mobile / 1440 bureau) ont été transmis au modèle et examinés. Vitrine : titre et CTA lisibles, navigation mobile répartie sans collision ; SiteForge : menu et styles visibles, composition éditoriale et géométrique sur desktop, typographie et CTA lisibles en mobile. Aucun défaut matériel observé dans **ces premiers viewports**. Les sections hors premier écran n'ont pas subi une revue esthétique intégrale. Les fichiers médias de test ont été purgés de leur cache identifié après réception et hachage ; les hashes figurent dans l'Evidence, aucun pixel n'est committé. Copie isolée de test redevenue Git clean ; serveur privé maintenu le temps de la revue utilisateur.

## Décision et limites
Code R85 et preview locale qualifiés, mais ne pas confondre avec une publication cloud ni l'intégration autorisée. Prévisualisation locale : http://127.0.0.1:4190/ et /siteforge/, uniquement sur Inos-Cerebros tant que le process est actif. Les metadata canonical/og:url ne doivent pas être modifiées sans hostname cible qualifié ; le générateur HTML canonique doit être identifié avant régénération. PR #3 conserve son HEAD historique et reste DRAFT. Aucun déploiement, merge, changement d'identité, de politique ni modification du worktree historique. Aucun besoin de refaire 87+5+44 à SHA et runtime inchangés.

## Prochaine action
Identifier le générateur canonique SiteForge et son propriétaire sur les références Git pertinentes, sans modifier une autre branche. Déterminer l'intégration contrôlée après revue de PR #3/conflits ; coordonner la prévisualisation de la révision intégrée avec le chantier Cloudflare. Préserver le preview privé et ne pas publier sans approbation humaine et rollback. En cas de nouveau delta visuel, URL exacte/Chrome/pixels réels avant toute correction suivante. FUNCTION_REPORT=PARTIAL ; HOOKS_STATUS=UNKNOWN ; PUBLIC_E2E=NOT_RUN.
