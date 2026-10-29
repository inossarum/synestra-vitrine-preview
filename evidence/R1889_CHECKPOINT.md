# R188.9 — Qualification des budgets GPU

Base R188.8 aedcff4 ; SHA du HTML R1889 : dc869bf6b68164150a88d0a3a20e78659409acb07a11b517650f0d4ee698ce19.
WebGL1 EXT_disjoint_timer_query si disponible, sinon mention explicite du fallback cadence CPU.
Test natif Chrome RTX3090 : matrice 9 matériaux x 4 noyaux x 3 qualités = 108 configurations, erreur GPU 0.
36 configurations par qualité : performance, balanced, quality. Échantillonnage borné entre 24 et 40 couches.
Extension GPU supportée : 108 valeurs lues, mais requêtes asynchrones non strictement attribuables à chaque configuration. Ne pas en déduire un gain comparatif.
Modes noyau 0-3, vue 1100/390 simulée, JSON, A/B et horloge fixe : PASS.
Tests Node ciblés : 19 PASS. Source : evidence/SITEFORGE_LAB_R1889_BROWSER_20261029.json et captures r1889-*.png.
Pas de benchmark GPU physique modeste ; pas de publication.
