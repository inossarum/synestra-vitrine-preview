# Labo 3D — revue artistique hors ligne V4 (R202.24 / R202.25)

**Statut : candidat à approbation artistique, non approuvé.** Aucun merge de cette branche DRAFT n'autorise une publication publique du Labo 3D.

## Périmètre immuable

- Base R202.24 : `edabe06b16d1e36548b34f80a0450f8be9017a33` (PR #28). Bundle SHA-256 : `ffd1326751e6ecbbe2fd997d25a00a8eb5d2bd7efbb36c5f52875e7a50e628da`.
- Candidat R202.25 : `cde9659449c44a6fe7d3641122faddc4df51e94f` (PR #30). Bundle SHA-256 : `58ffa01ce8a7c22206b3a6b4795cf4c8c9d2d6e125a98940a64401a2f6e16ed2`.
- Aucune modification des 80 triangles, des shaders, du raymarch, du WebGL runtime, de `main`, ni des PR #23–#32.
- Ce dossier versionne uniquement **l'interface de revue**, deux adaptateurs postMessage, le PNG fixe et la procédure de reconstruction. Les deux bundles compilés (~7,4 Mo chacun) sont **exclus du commit Git** pour ne pas dupliquer les artefacts.

## Reconstitution du paquet Windows (sans internet)

Prérequis : Node.js 22+, deux dossiers ayant chacun `dist/babylon-lab.js` correspondant **exactement** aux empreintes ci-dessus. Depuis la racine du dépôt :

```powershell
node review/r20225-v4/assemble-offline.mjs "I:\_STUDIO_STAGING\SYN_LAB_R20224_DEPTH_COMPOSITE_20261101\lab-babylon" "I:\_STUDIO_STAGING\SYN_LAB_R20225_AB_EXPORT_REVIEW_20261101\versions\r20225" "I:\_STUDIO_STAGING\SYN_LAB_R20225_V4_REBUILT"
```

Le script échoue sans écrire de résultat final si une empreinte manque ou diffère, si le dossier de destination existe déjà ou si une copie échoue. Il ajoute `SHA256SUMS.txt` au paquet. Ouvrir ensuite `index.html` (ou `OUVRIR-COMPARATEUR.cmd`). Il n'installe rien et n'exécute aucun appel réseau.

## Régression de reconstruction (sans fenêtre Chrome)

Depuis PowerShell, fournir les chemins vers les deux bundles compilés **exactement** validés :

```powershell
$env:SYN_R20224_BUNDLE_ROOT="I:\_STUDIO_STAGING\SYN_LAB_R20225_AB_EXPORT_REVIEW_20261101\versions\r20224"
$env:SYN_R20225_BUNDLE_ROOT="I:\_STUDIO_STAGING\SYN_LAB_R20225_AB_EXPORT_REVIEW_20261101\versions\r20225"
node --test review/r20225-v4/assemble-offline.test.mjs
```

Six tests doivent passer (sans skip) : empreintes sources, mauvais bundle, bundle corrompu, destination existante, sortie dans les sources, puis copie nominale avec manifeste 15/15. Les variables manquantes provoquent un échec explicite, pas un faux PASS. Aucun Chrome n'est lancé et les sorties temporaires de ce banc sont supprimées à sa fin.

## Utilisation / limites

Le comparateur affiche un seul moteur 3D à la fois. Il synchronise l'angle, le zoom, les sept réglages et la frame figée 6 lors du passage R202.24 / R202.25. La V3 rétablit la version précédente sur erreur d'application et suspend la comparaison si la récupération échoue. La V4 ajoute une prévisualisation de PNG côte à côte, ainsi qu'un `COMPARATIF_MEME_ANGLE.png` statique déjà calculé. Le téléchargement direct par clic n'a **pas** été confirmé sous Chrome hors ligne : utiliser « Enregistrer l'image sous » sur la prévisualisation, ou le PNG statique.

Une fois assemblé, le ZIP testé localement le 1er novembre 2026 contenait 15 fichiers, SHA-256 `162e4427cd865620084c1f12af942b7f4bb16d136dfc2e83d3b0e9fb6bf1a06c`. Ce SHA désigne le ZIP local original, **pas** les nouvelles archives pouvant être reconstruites depuis ce dépôt.

PNG de revue, SHA-256 `277910e7e476f8509554f9ff81b8f029f6a7c214c771d29462704a4ba712fc04`. Comparatif des quatre angles réutilisé de `evidence/R20225_R2_R20224_GPU_4ANGLES_AB.png` (SHA-256 `7cbc3dd356fe13abbb7531454e06499447456c93fd9b014487d05eb326697011`).

## Contrôles passés / non passés

**PASS, sur le PC Inos-Cerebros RTX 3090 / D3D11 :** V4 extraite, rendu WebGL, PNG de 2 044 × 577, restauration caméra et contrôles, intégrité du ZIP, tests E2E de la comparaison. Le test V4 sur ZIP extrait a terminé avec code 0 (rapport local SHA-256 `1e239182ae30b86825009ace1659520d9e7b60538bc2b476c290aaceacd0257c`).

**PENDING :** approbation artistique du propriétaire, hébergement privé sous Access avec E2E authentifié, GPU de classe inférieure et stress thermique long. Pas de CI GitHub spécifique à ce dossier d'interface dans cette PR.

**FREE_ONLY · DRAFT · NO MERGE · NO DEPLOY · NO PAYG.**
