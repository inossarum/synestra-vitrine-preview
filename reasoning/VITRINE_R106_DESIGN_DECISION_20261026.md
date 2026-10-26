---
document_id: VITRINE_R106_DESIGN_DECISION_20261026
type: REASONING
owner: Inos
mission: SYN_VITRINE_SITEFORGE_SHOWCASE_20261024
status: PREVIEW_CLOUD_PASS_VISUAL_REVIEW_PENDING
evidence: evidence/VITRINE_R106_REFERENCE_CORE_PREVIEW_20261026.json
tested_source_sha: a00217d90d45a125fbbedc45e948343535d94502
---
# Vitrine Synestra R106 — Direction artistique documentée

## Objectif
Après R105 l'utilisateur demande d'examiner les meilleurs sites Internet et d'améliorer une nouvelle fois la scène centrale. Recherche web consultée : Nanoshrine (chambre à matériaux crédibles), Orbyte (objet focal noir/lumineux), GRAIR (sobriété cinématique), guides GoogleChrome et web.dev pour animation accessible et économe. Ce sont des influences, pas des maquettes copiées.

## Delta
Réutiliser la vitrine existante. La figure centrale R106 est une composition SVG vectorielle native avec torii en profondeur, métal bleu-acier, iris à sept pales, cœur de plasma, halo spatial, plancher lumineux, trajectoires et labels techniques. Les trois capsules périphériques deviennent des liens HTML réels vers SiteForge, Connect et Bridge, navigables au clavier. Conserver la bannière R99 exacte en haut ; rien d'autre n'est qualifié de logo officiel. Aucune donnée Connect ou Bridge fictive, aucun téléchargement inventé. Différencier clairement illustration produit et flux live.

CSS autonome, pas de Three.js/WebGL, aucune nouvelle bibliothèque, pas de coût Cloudflare additionnel revendiqué ; animation des transformations/opacity et variante prefers-reduced-motion. La préférence réduit les mouvements mais maintient le contenu.

## Qualification
Premier déploiement R106 bloqué par deux tests hérités de R105 : ancien `stage-pulse-line`, et comptage de quatre éléments dont le conteneur `links` lui-même. La correction vérifie le pulse réel et les trois ancres, sans supprimer les tests. Déploiement Cloudflare `d69e75e3-4410-4697-aca1-d0f48e1bcf09`, commit `a00217d90d45a125fbbedc45e948343535d94502` : **35/35 tests PASS**, **37 fichiers à liste blanche**, `preview/success`. `main` et la production n'ont pas été modifiés ; version R105 disponible pour rollback.

## Limitations et NEXT
Impossible de consulter directement les pixels du déploiement via le navigateur de vérification dans cette session. Ne pas affirmer qu'un navigateur réel ou un écran mobile ont été inspectés. Prochain contrôle utile : capture desktop/mobile, interaction clavier, zoom/reflow, Core Web Vitals, retouches de taille/placement selon rendu réel. Ne pas transformer le logo Bridge : l'annexe R88 du message est une mission distincte, hors périmètre de la vitrine.
FUNCTION_REPORT=PARTIAL
