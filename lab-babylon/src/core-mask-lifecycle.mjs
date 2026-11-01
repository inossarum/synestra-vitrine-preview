/** R202.29: visibility gate for the existing 80-facet depth/stencil mask. */
export function isFacetMaskActive(power,radius,coreEnabled){
 // A powered-off, collapsed, externally disabled or invalid core has no stencil.
 if(!Number.isFinite(power)||!Number.isFinite(radius)||typeof coreEnabled!=='boolean')return false;
 return power>0&&radius>.001&&coreEnabled;
}
