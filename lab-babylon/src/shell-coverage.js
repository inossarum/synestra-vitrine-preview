/**
 * SYNESTRA LAB R197: Deterministic low-discrepancy anchors for the 28 pre-existing
 * Babylon energy ribbon paths. This module has no renderer or core dependency.
 * It preserves 28 paths, existing 4-color cycling and each quality profile's
 * mesh budget; it changes only where the ribbons travel on the shell.
 */
export const R197_RIBBONS = 28;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const SLOT_STEP = 13; // coprime with 28; first eight paths span both hemispheres

function slotToUnit(slot) {
  const y = 1 - 2 * (slot + .5) / R197_RIBBONS;
  const radius = Math.sqrt(Math.max(0, 1 - y*y));
  const angle = slot * GOLDEN_ANGLE;
  return [radius*Math.cos(angle), y, radius*Math.sin(angle)];
}
export function shellAnchor(index) {
  if (!Number.isInteger(index) || index < 0) throw new RangeError('R197_INVALID_INDEX');
  const slot = ((index % R197_RIBBONS) * SLOT_STEP) % R197_RIBBONS;
  return slotToUnit(slot);
}
export function shellAnchorPair(index) {
  if (!Number.isInteger(index) || index < 0) throw new RangeError('R197_INVALID_INDEX');
  const slot = ((index % R197_RIBBONS) * SLOT_STEP) % R197_RIBBONS;
  const targetSlot = (slot * 11 + 7) % R197_RIBBONS;
  return [slotToUnit(slot), slotToUnit(targetSlot)];
}
export function shellCoverageMetrics(active = R197_RIBBONS) {
  if (!Number.isInteger(active) || active < 1 || active > R197_RIBBONS) {
    throw new RangeError('R197_INVALID_ACTIVE_RIBBONS');
  }
  const octants = new Array(8).fill(0);
  let north = 0, south = 0;
  for (let i = 0; i < active; i++) {
    const [x,y,z] = shellAnchor(i);
    const octant = (x >= 0 ? 4 : 0) + (y >= 0 ? 2 : 0) + (z >= 0 ? 1 : 0);
    octants[octant]++;
    if (y >= 0) north++; else south++;
  }
  return {active, occupiedOctants:octants.filter(x=>x>0).length, octants, north, south};
}
