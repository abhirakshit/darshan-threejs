import * as THREE from 'three'

class House {
  constructor(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams) {
    this.houseNumber = houseNumber
    this.houseZodiac = houseZodiac
    // this.houseColor = houseColor
    this.sideLength = sideLength
    this.meshParams = meshParams
    this.positionCoordinate = positionCoordinate
    // this.#createSquareMesh(positionCoordinate)
  }
}

export class SquareHouse extends House {
  constructor(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams) {
    super(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams)
    this.#setupMesh()
  }

  #setupMesh() {
    const geometry_plane = new THREE.PlaneGeometry(this.sideLength, this.sideLength);
    // Create a mesh with the geometry and a material
    const material = new THREE.MeshBasicMaterial(this.meshParams);
    const mesh_house = new THREE.Mesh(geometry_plane, material);
    mesh_house.rotation.z = Math.PI / 180 * 45
    mesh_house.position.set(this.positionCoordinate.x, this.positionCoordinate.y, this.positionCoordinate.z)
    this.mesh = mesh_house
  }
  getMesh() {
    return this.mesh
  }
}

export class TriangleHouse extends House {
  constructor(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams) {
    super(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams)
    this.#setupMesh()
  }
  #setupMesh() {
    const { x, y } = this.positionCoordinate;

    // Vertices of the triangle
    // Vertices of the triangle
    const vertices = new Float32Array([
      x, y, 0,  // Vertex A
      x, y + this.sideLength, 0,  // Vertex B
      x + this.sideLength, y, 0  // Vertex C
    ]);

    // Indices to define the face of the triangle
    const indices = new Uint16Array([0, 1, 2]);

    // Create a BufferGeometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // Create a material
    const material = new THREE.MeshBasicMaterial(this.meshParams);

    // Create a mesh and return it
    this.mesh = new THREE.Mesh(geometry, material);
  }

  getMesh() {
    return this.mesh
  }
}

export function spawnDebugSphere (scene, pos, color, radius) {
  const sphereGeometry = new THREE.SphereGeometry(radius, 36, 36)
  const mat = new THREE.MeshBasicMaterial({color})
  const m_position = new THREE.Mesh(sphereGeometry, mat)
  m_position.position.set(pos.x, pos.y, pos.z)
  scene.add(m_position)
}
// export function getCoreHouseMesh(side, meshParams, ) {
//   const geometry_plane = new THREE.PlaneGeometry(side, side);
// // Create a mesh with the geometry and a material
//   const material = new THREE.MeshBasicMaterial(meshParams);
//   const mesh_house = new THREE.Mesh(geometry_plane, material);
//   mesh_house.rotation.z = Math.PI / 180 * 45
//   mesh_house.position.set(0, (Math.sqrt(2) * side)/2, 0)
//
//   return mesh_house
// }
