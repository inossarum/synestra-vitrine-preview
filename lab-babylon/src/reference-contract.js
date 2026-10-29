/**
 * SYN_SPHERE_ART_REFERENCE_20261029 v1.
 * Source: owner-confirmed sphere image in the current ChatGPT project,
 * SHA256 584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881.
 * Palette identity: official Synestra Studio logo, provided 2026-10-29.
 * These are scene-linear emissive RGB intensities, not sampled sRGB pixels.
 * Artistic similarity still requires native rendered screenshot review.
 */
export const SPHERE_REFERENCE = Object.freeze({
  id:'SYN_SPHERE_ART_REFERENCE_20261029',
  version:'1.0.0',
  imageSha256:'584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881',
  shape:'open, connected, deep 3D spherical web of curved plasma streams',
  exclusions:['laboratory chamber','platform','environment','supports','cables','logo text'],
  colors:Object.freeze([
    Object.freeze({id:'violet',linear:[.67,.20,1.18]}),
    Object.freeze({id:'cyan',linear:[.09,.96,1.25]}),
    Object.freeze({id:'dark-blue',linear:[.065,.21,.67]}),
    Object.freeze({id:'green',linear:[.10,.82,.43]})
  ]),
  core:'white-violet luminous distinguishable nucleus with restrained bloom',
  energyNodes:6,
  renderEngine:'Babylon.js 9.33.0',
  sceneScope:'sphere-only'
});
