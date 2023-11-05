import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { HOUSES_ARRAY } from '@/constants/'

class House {
  constructor(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams) {
    this.houseNumber = houseNumber
    this.houseZodiac = houseZodiac
    this.sideLength = sideLength
    this.meshParams = meshParams
    this.positionCoordinate = positionCoordinate
  }
}

export class SquareHouse extends House {
  constructor(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams) {
    super(positionCoordinate, houseNumber, houseZodiac, sideLength, meshParams)
    this.#setupMesh()
    // addTextToPlane('hello', {x: 0, y:0, z: .1}, this.mesh)
    // console.log(HOUSES_ARRAY)
  }

  #setupMesh() {
    const geometry_plane = new THREE.PlaneGeometry(this.sideLength, this.sideLength)
    // Create a mesh with the geometry and a material
    const material = new THREE.MeshBasicMaterial(this.meshParams)
    const mesh_house = new THREE.Mesh(geometry_plane, material)
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
    const { x, y } = this.positionCoordinate

    // Vertices of the triangle
    // Vertices of the triangle
    const vertices = new Float32Array([
      x, y, 0,  // Vertex A
      x, y + this.sideLength, 0,  // Vertex B
      x + this.sideLength, y, 0  // Vertex C
    ])

    // Indices to define the face of the triangle
    const indices = new Uint16Array([0, 1, 2])

    // Create a BufferGeometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))

    // Create a material
    const material = new THREE.MeshBasicMaterial(this.meshParams)

    // Create a mesh and return it
    this.mesh = new THREE.Mesh(geometry, material)

    // new THREE.spr
  }

  getMesh() {
    return this.mesh
  }
}

export function getEndingCoordinate(startX, startY, angleDegrees, length) {
  // Convert the angle from degrees to radians
  const angleRadians = angleDegrees * (Math.PI / 180)

  // Calculate the ending coordinates
  const xEnd = startX + length * Math.cos(angleRadians)
  const yEnd = startY + length * Math.sin(angleRadians)

  return { x: xEnd, y: yEnd, z: 0 }
}

export function addTextToPlane(font, text, position, plane) {
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 0.5,  // Adjust size to fit your needs
    height: 0.05  // Adjust depth to fit your needs
  })

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const textMesh = new THREE.Mesh(textGeometry, textMaterial)

  textMesh.position.set(position.x, position.y, position.z)
  textMesh.rotateZ(-47)
  // Optionally, adjust the rotation and scale of the text mesh to fit your needs
  // textMesh.rotation.x = Math.PI / 2;  // Rotate 90 degrees around the X-axis
  // textMesh.scale.set(1, 1, 1);  // Scale the text mesh
  plane.add(textMesh)
}

function reorderArray(arr, elementText) {
  // Find the index of the object with a matching 'text' property
  let index = arr.findIndex(obj => obj.text === elementText)

  // If the element is not found, return the original array
  if (index === -1) return arr

  // Split the array into two parts at the index of the specified object
  let firstPart = arr.slice(0, index)
  let secondPart = arr.slice(index)

  // Concatenate the two parts in reverse order and return the result
  return secondPart.concat(firstPart)
}

function drawHouse(houseNumberinChart, houseInfo) {

}

export function drawChart(ascendant, sideLength, scene, savedFont) {
  let orderedHouses = reorderArray(HOUSES_ARRAY, ascendant)

  /**
   * Create all core houses
   */
  // House 1
  createCoreHouse(scene, sideLength, savedFont,
    { x: 0, y: (Math.sqrt(2) * sideLength) / 2, z: 0 },
    { color: 0x00ff00, side: THREE.DoubleSide },
    orderedHouses[0])
  // House 4
  createCoreHouse(scene, sideLength, savedFont,
    { x: -(Math.sqrt(2) * sideLength) / 2, y: 0, z: 0 },
    { color: 0x00df00, side: THREE.DoubleSide },
    orderedHouses[3])
  // House 7
  createCoreHouse(scene, sideLength, savedFont,
    { x: 0, y: -(Math.sqrt(2) * sideLength) / 2, z: 0 },
    { color: 0x0fddd0, side: THREE.DoubleSide },
    orderedHouses[6])
  // House 10
  createCoreHouse(scene, sideLength, savedFont,
    { x: (Math.sqrt(2) * sideLength) / 2, y: 0, z: 0 },
    { color: 0x0fdddd, side: THREE.DoubleSide },
    orderedHouses[9])

  /**
   * Create all peripheral houses
   */
  const anchor1Coordinate = getEndingCoordinate(0, 0, 135, sideLength)
  // House 2
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor1Coordinate.x, y: anchor1Coordinate.y, z: 0 },
    { color: 0x00fff0, side: THREE.DoubleSide },
    45,
    orderedHouses[1])
  // House 3
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor1Coordinate.x, y: anchor1Coordinate.y, z: 0 },
    { color: 0x00bbcc, side: THREE.DoubleSide },
    135,
    orderedHouses[2])

  const anchor2Coordinate = getEndingCoordinate(0, 0, 225, sideLength)
  // House 5
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor2Coordinate.x, y: anchor2Coordinate.y, z: 0 },
    { color: 0x0ffff0, side: THREE.DoubleSide },
    135,
    orderedHouses[4])
  // House 6
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor2Coordinate.x, y: anchor2Coordinate.y, z: 0 },
    { color: 0x0ffdd0, side: THREE.DoubleSide },
    225,
    orderedHouses[5])

  const anchor3Coordinate = getEndingCoordinate(0, 0, 315, sideLength)
  // House 8
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor3Coordinate.x, y: anchor3Coordinate.y, z: 0 },
    { color: 0x0ffdd0, side: THREE.DoubleSide },
    225,
    orderedHouses[7])
  // House 9
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor3Coordinate.x, y: anchor3Coordinate.y, z: 0 },
    { color: 0x0ffff0, side: THREE.DoubleSide },
    315,
    orderedHouses[8])

  const anchor4Coordinate = getEndingCoordinate(0, 0, 45, sideLength)
  // House 11
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor4Coordinate.x, y: anchor4Coordinate.y, z: 0 },
    { color: 0x00fff0, side: THREE.DoubleSide },
    315,
    orderedHouses[10])
  // House 12
  createPeripheralHouses(scene, sideLength, savedFont,
    { x: anchor4Coordinate.x, y: anchor4Coordinate.y, z: 0 },
    { color: 0x00fff0, side: THREE.DoubleSide },
    45,
    orderedHouses[11])
}

function createCoreHouse(scene, sideLength, font, pos, meshParams, { text, houseNumber, ruler }) {
  const house = new SquareHouse(pos, houseNumber, text, sideLength, meshParams)
  scene.add(house.getMesh())
  addTextToPlane(font, getText(text, houseNumber), { x: 0, y: 0, z: 0.1 }, house.getMesh())
}

function createPeripheralHouses(scene, sideLength, font, pos,
                                meshParams, rotation, { text, houseNumber, ruler }) {
  const house = new TriangleHouse(pos,
    houseNumber,
    text,
    sideLength, meshParams)
  scene.add(house.getMesh())
  rotateAboutPoint(house.getMesh(),
    new THREE.Vector3(pos.x, pos.y, 0),
    new THREE.Vector3(0, 0, 1),
    THREE.MathUtils.degToRad(rotation),
    true
  )
  addTextToPlane(font, getText(text, houseNumber), { x: 0, y: 0, z: 0.1 }, house.getMesh())
}

function getText(text, houseNumber) {
  // return text + '-' + houseNumber
  return houseNumber
}
