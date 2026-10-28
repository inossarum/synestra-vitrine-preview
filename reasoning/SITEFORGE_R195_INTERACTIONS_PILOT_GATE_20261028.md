# Synestra R195 — Hover, architecture du chapitre 01 et accès pilote

## Demande
- Chaque bouton, rubrique et section doit donner une réponse perceptible aux actions utilisateur, pas uniquement au scroll.
- Chapitre 1 jugé pauvre ; différencier chaque chapitre, ajouter relief CSS 3D léger sans cyberpunk et lisibilité.
- Les détails/FAQ s'ouvrent trop brusquement.
- Le portail « Espace pilote » semble obsolète.

## Conception et limites
- Source immuable R194 `f873f123cd920e8e09de2f6391e37003e99515aa`, branche R195 indépendante, copies des 5 pages.
- Chapitre 1 : remplacement du panneau statique par trois véritables liens vers SiteForge/Connect/Bridge, surfaces en strates, repères identifiés, fond subtil, liens utilisables avec clavier.
- Prolongements : boutons éclairés, faible translation, courbure CSS 3D (maximum 2.2° pour galerie, 1.6° rubriques), transformations par pointermove et RAF seulement pendant le survol ; état intégralement supprimé au pointerleave.
- FAQ : `::details-content`, `interpolate-size: allow-keywords` et transition intrinsèque, comportement `<details><summary>` natif conservé. Fallback sans animation si moteur non compatible ; reduced motion coupe les effets.
- Sphère : même canvas R190, aucun tilt ni moteur d'animation ajouté. Couleurs officielles, pas de reflet.
- Les chapitres ont des réactions différenciées : produits à plusieurs plans, galerie à inclinaison, méthode à surlignage, besoins en glissement, confiance en décalage, questions en expansion.
- Pages Connect/Bridge/SiteForge/Offres partagent le même comportement contrôlé sans modifier leur logique métier.

## Portail — fait observé, NON livré
- Cloudflare production `synestra-client-portal`: déploiement 100 % R80 du 24 octobre, version `2ee6a737-af2d-40d6-bb8a-5bad710c1ad0`, restore Access JWT.
- Staging `synestra-client-portal-staging`: version distincte `ac18371b-3745-45eb-bc98-5e9deeae3d10`, déployée le 27 octobre (source=secret). La fraîcheur d'un script ne prouve pas l'adéquation fonctionnelle.
- Parcours navigateur non authentifié confirmé : les deux URLs conduisent au formulaire Cloudflare Access; staging « Portal Staging Owner Only ».
- La copie de la vitrine a été corrigée : *accès contrôlé*, pas ouverture publique. La cible reste l'URL officielle, non le staging.
- **STOP de sûreté** : pas de déploiement du Worker ni modification des ACL, aucune capacité de tester la session authentifiée ou de valider le staging actuel. Pour promouvoir la version, il faut une session Access autorisée et une qualification production/staging avant toute action. Aucune réussite fictive.

## E2E
- Node 135/135 PASS ; Chrome 15/15 pages × largeurs ; 11 contrôles scroll ; 5 tests hover, reset, galerie, details et reduced.
- La transition FAQ a été chronométrée via géométrie réelle (69 px fermé → 132.05 px intermédiaire → 175.72 px ouvert), donc pas instantanée sur Chrome.
- Plasma: `uTilt=[0,0]`, force 0.7354, retour 9.77e-11.
- Navigateur Chrome uniquement ; pas de WebKit/Firefox, ni E2E protégé de l'espace pilote.

## Durabilité
Sources, tests et captures enregistrés sous R195, Evidence/Reasoning versionnés sur branche dédiée. Aucun push/main/deploy. R194 conservée, retour arrière = réutiliser `/r194/`.

NEXT : revue visuelle R195, comparer la véritable UI de l'espace pilote avec le staging sous identité Access autorisée, appliquer correction ciblée au portail si qualifiée, staging E2E, puis gate de publication.
