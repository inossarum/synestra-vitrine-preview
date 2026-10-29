/**
 * R190 Babylon Labo -> ATLAS_BABYLON_3D v0.1.
 * Atlas supplies CORE_SOCKET from a validated decor GLB.
 * Labo owns the sphere hierarchy; no new Engine, Scene, broker or asset fetch.
 */
export const CORE_SOCKET = 'CORE_SOCKET';
export const ATLAS_ID = 'ATLAS_BABYLON_3D';

export function mountCoreAtAtlasSocket(scene, coreRoot, {required = false} = {}) {
 if (!scene || typeof scene.getNodeByName !== 'function' ||
     !scene.getEngine || !coreRoot || typeof coreRoot.setParent !== 'function') {
  throw new TypeError('ATLAS_LAB_INVALID_EXISTING_SCENE');
 }
 const socket = scene.getNodeByName(CORE_SOCKET);
 if (!socket) {
  if (required) throw new Error('ATLAS_CORE_SOCKET_MISSING');
  return {mode:'standalone',mounted:false,coreRoot};
 }
 if (coreRoot === socket || socket.isDescendantOf?.(coreRoot)) {
  throw new Error('ATLAS_CORE_SOCKET_CYCLE');
 }
 // Never alter an existing atlas decor hierarchy or replace scene/engine.
 const originalParent=coreRoot.parent;
 coreRoot.setParent(socket);
 return {
  mode:'atlas-socket',mounted:true,coreRoot,socket,
  unmount(){ if(coreRoot.parent===socket)coreRoot.setParent(originalParent); }
 };
}
