# R188.7 — Noyau énergie XYZ

Base R188.6 7cf9750814951898d3a96e0034afe62d3e94dc6e.
Nouvelle fonction GLSL nucleusFlow3D(xyz), échantillonnée dans les deux branches WebGL du Labo.
Variantes vortex, tressage et ondes sphériques cohérentes avec la rotation des coordonnées 3D.
Original R188.6 conservé. Un canvas, un contexte WebGL1 et CSP SHA mise à jour.
Chrome RTX3090 sur serveur 127.0.0.1:19108 : modes 0-3 sur 1100 et 390 px, matériaux 0/6/8, error=0.
Import ancien et nouveau JSON, test mode invalide, vitesse/pouvoir nul : PASS.
Tests Node ciblés : 21 PASS. Captures et JSON R1887 stockés dans evidence.
À qualifier sur GPU modeste et téléphone physique ; aucun déploiement public.
