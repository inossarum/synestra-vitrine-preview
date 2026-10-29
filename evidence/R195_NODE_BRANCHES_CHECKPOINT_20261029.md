# Synestra Labo 3D — R195 / checkpoint et preuves

MISSION_ID=SYN_LAB_R195_NODE_BRANCHES_20261029
OWNER=Synestra Studio
DATE=2026-10-29
REPO=inossarum/synestra-vitrine-preview
BASE=R194@d052d65f338e64f4fbc0c21bc5aafe3494b7a19b
BRANCH=task/SYN_LAB_R195_NODE_BRANCHES_20261029
REFERENCE=reference/SPHERE_CANONICAL_20261029.md@93e6802a3c4e894235aabcd45f1e2ace1e0fba82
ENGINE=Babylon.js@9.33.0, existing single Engine/Scene/Canvas
ATLAS=ATLAS_BABYLON_3D@0.1.0 CORE_SOCKET preserved, owner worktree unchanged
ART_SCOPE=LAB_3D_SPHERE_ONLY; excludes room, platform, vitrine
PREVIEW=http://127.0.0.1:19120/lab-babylon/index.html?labFrame=4.5
PUBLIC_DEPLOYMENT=NO
BILLING=FREE_ONLY
CANONICAL_REFERENCE_IMAGE_BINARY=MANQUANTE (original chat attachment SHA retained)
TECHNICAL_GATE=PASS
ARTISTIC_GATE=PARTIAL

## Delta réel depuis R194
- Ajout de 12 ramifications XYZ, deux départs par nœud lumineux, vers des points différents de l'enveloppe. Arcs organiques évolutifs, raccordement continu au nœud à u=0, extrémités progressivement effacées.
- Six petites impulsions lumineuses mobiles empruntent les ramifications. Quatre familles chromatiques du logo sont conservées : violet, cyan, bleu foncé, vert.
- Moteur Babylon existant réutilisé, nouvelles géométries sous LAB_SPHERE_ROOT ; pas de scène, canvas, broker ou renderer dupliqué.
- Profil Économie : 4 ramifications / 2 impulsions. Équilibré : 8 / 6. Ultra : 12 / 6.
- Puissance du noyau=0 : 0 ramifications / 0 impulsions (cas négatif natif).
- Première implémentation trop discrète rejetée en failure-first (0.3879 % des pixels image complète modifiés sous le seuil initial de 1%). Correctif appliqué aux largeurs, transparences et taille des impulsions ; même test repassé.

## E2E réel
- Chrome headless sur Inos-Cerebros / ANGLE NVIDIA RTX 3090 D3D11.
- Rapport `lab-babylon/evidence/R195_FORK_BROWSER.json` : status PASS.
- 8 vrais rendus : 4 modes noyau × (1100 desktop, 390 viewport mobile simulé).
- 6 contrôles de profils graphiques, 3 angles caméra front/latéral/dessus, 2 contrôles puissance zéro.
- Aucun gl.getError(), un canvas; contrat Atlas CORE_SOCKET conservé.
- Tests Node (test runner) 29 PASS, 0 FAIL, 0 SKIP, dont géométrie 3D, trajectoires temporelles, divergence des branches, états fail-closed et anciennes régressions.
- Rapport de mesure `lab-babylon/evidence/R195_VISUAL_METRICS.json` status PASS ; comparaison capturée à temps fixe labFrame=4.5.
  - R194→R195 : +2.1789 % pixels modifiés en 1100 et +2.1855 % en 390, après correction.
  - Orbit : face/latéral +22.1574 % et face/dessus +17.9028 % pixels modifiés.
- Ces pourcentages prouvent la différence de rendu sous les mêmes paramètres ; **ils ne prouvent pas la fidélité artistique** à l'image conceptuelle.

## SHA256 fichiers vérifiés sur PC
- lab-babylon/src/node-branches.js B3A8C9C7B4A7A0E642ADFD0CAFBDBBC7B36D302CD5A6A6144C9380553BC5D39C
- lab-babylon/src/main.js 92D6C35F4AB8B7833E17DF15063041A857144A3A69FCDC8C82A0F918B16AA727
- lab-babylon/dist/babylon-lab.js 4D16D0E06255357B381410F99257A649665E8312858E63BED1CFA7A94AA511E5
- lab-babylon/evidence/r195-fork-core0-1100.png 979173DC8F891102FF4EE757C7B0E51A26DE941087802F31D3D2A038D56E20DC
- lab-babylon/evidence/R195_VISUAL_METRICS.json EF553172C9856C90877C062371520DABE356275F51CBBE88C8F9E852E857FA8B

## Qualité, limites, risques
- Rendu visuellement plus ramifié et plus organique, mais noyau encore assez blanc/éblouissant et grands courants parfois isolés ; ARTISTIC_GATE=PARTIAL, sans validation finale du propriétaire.
- Référence art binary non versionnée; ne pas inventer un binaire Git. Vie privée et secrets non inclus.
- Simulated viewport mobile only, no physical phone or modest GPU benchmark. FPS instantané non traité comme benchmark.
- R194 intact; Atlas d'un autre chantier, vitrine, main, Cloudflare, Supervisor non modifiés.
- Pas de nouveau paquet, pas de transaction payante, aucun service externe requis.

## Reprise / rollback
- Rebuild : dans lab-babylon, `npm run build`.
- Browser E2E : `node tests/sphere-forks-e2e.mjs`, serveur local port 19120.
- Node : `node --test tests/node-forks.test.mjs tests/plasma-glow.test.mjs tests/plasma-light.test.mjs tests/plasma-ribbons.test.mjs tests/sphere-reference.test.mjs tests/sphere-regression.test.mjs tests/atlas-interop.test.mjs`.
- Pixel : `node tests/r195-visual-metrics.mjs`.
- Rollback R194 commit d052d65f338e64f4fbc0c21bc5aafe3494b7a19b.
- NEXT R196 : diminuer saturation du noyau central sans perte de halo, reconfigurer densité/enveloppe pour rapprocher l'image de référence; comparaison visuelle indépendante, mobile physique et GPU modeste selon disponibilité.
