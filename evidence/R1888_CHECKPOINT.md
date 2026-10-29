# R188.8 — Presets et A/B déterministe

Base R188.7 : 234efd3.
Presets originaux et vortex, tressage, impulsions : bibliothèque v1 immuable.
Comparateur A/B : deux instantanés du noyau, restauration atomique des contrôles concernés.
Paramètre labFrame=0..60 gèle l'horloge GPU pour une comparaison reproductible.
Chrome réel RTX3090 : comparaison A/B PASS, captures identiques à horloge fixe, WebGL error 0.
Captures bureau/mobile 1100/390 et matériaux 0/6/8 PASS ; JSON historique compatible.
Tests Node ciblés : 21 PASS. Captures et rapport dans evidence.
Aucune publication ni exposition réseau ; preview loopback uniquement.
