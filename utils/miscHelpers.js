// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
// https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733
import * as THREE from 'three'

export function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
  pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld

  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position) // compensate for world coordinate
  }

  obj.position.sub(point) // remove the offset
  obj.position.applyAxisAngle(axis, theta) // rotate the POSITION
  obj.position.add(point) // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position) // undo world coordinates compensation
  }
  obj.rotateOnAxis(axis, theta) // rotate the OBJECT
}


export function spawnDebugSphere(scene, pos, color, radius) {
  const sphereGeometry = new THREE.SphereGeometry(radius, 36, 36)
  const mat = new THREE.MeshBasicMaterial({ color })
  const m_position = new THREE.Mesh(sphereGeometry, mat)
  m_position.position.set(pos.x, pos.y, pos.z)
  scene.add(m_position)
}
