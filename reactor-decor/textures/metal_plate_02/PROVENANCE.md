# R216 — PBR photographic metal provenance

Source: https://polyhaven.com/a/metal_plate_02
License: CC0 (Poly Haven, original author Rob Tuytel)
License reference: https://polyhaven.com/license
API metadata endpoint: https://api.polyhaven.com/files/metal_plate_02
Downloaded: 2026-10-29, 1K JPG, via unique User-Agent SynestraStudio-PBR-Research/1.0

| Map | Semantics | SHA256 |
|---|---|---|
| metal_plate_02_diff_1k.jpg | baseColor (sRGB) | 6E80877D0E9D5973D96298C6091DF7ACE906B0A6760AFC4F3592E4855F3F1D4C |
| metal_plate_02_nor_gl_1k.jpg | normal OpenGL (Non-Color) | 58736FBB8AA4FC6690CF8152B174DB65CAF22A766375B625FB0087E1BC955BC7 |
| metal_plate_02_rough_1k.jpg | roughness (Non-Color) | 73A6BD6393F6DE7BE42058584C2D382F2A3E9148CEABC2D02E748E2C860E74D1 |
| metal_plate_02_metal_1k.jpg | metalness (Non-Color) | FB1B120A2BE5887DFEEBED7A198A8151B292E963713D914B74ED7669434AFB41 |

All four source maps are included in project and packed in Blender for offline reproducibility. Babylon imports them through embedded GLB image assets; no live API calls in production.

Known limitation: Metal Plate 02 is a weathered/corroded steel photo. Its full albedo is restricted to selected maintenance insets, while structural surfaces retain their approved Synestra dark finish plus photographic roughness and normals. This is not equivalent to clean aerospace brushed aluminum across the whole chamber. Further photographed clean material sets will be required for ultimate cinematic parity.
