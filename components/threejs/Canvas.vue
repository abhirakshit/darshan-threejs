<script setup lang='ts'>
import * as THREE from 'three';
import { ref } from 'vue'

let renderer
const experience: ref<HTMLCanvasElement | null> = ref(null)
const scene = new THREE.Scene()

// Camera
const {width, height} = useWindowSize()
const chartWidthPercent = .75
const aspectRatio = computed(() => width.value * chartWidthPercent/height.value)
const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, .1, 1000)
// camera.position.set(0,0,5)
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);
scene.add(camera)

//Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

spawnDebugSphere(scene, {x: 0, y: 0, z: 0}, 'red', .2)
// const sphereGeometry = new THREE.SphereGeometry(.2, 36, 36)
// const mat = new THREE.MeshBasicMaterial({color: 'red'})
// const m_position = new THREE.Mesh(sphereGeometry, mat)
// m_position.position.set(0,0,0)
// scene.add(m_position)

//Chart Background

// House 1
// Create a square using THREE.PlaneGeometry
const side = 5
// const house1 = getCoreHouseMesh(side, {color: 0x00ff00, side: THREE.DoubleSide})
// house1.position.set(0, (Math.sqrt(2) * side)/2, 0)
// scene.add(house1);
const pos = {x: 0, y: (Math.sqrt(2) * side)/2, z: 0}
const h1 = new SquareHouse(pos, 1, 'Aries',
  side, {color: 0x00ff00, side: THREE.DoubleSide})
scene.add(h1.getMesh())
console.log(h1.getMesh().geometry.attributes.position.array )
const arr = h1.getMesh().geometry.attributes.position.array
spawnDebugSphere(scene, {x: arr[0], y: arr[1], z: arr[2]}, 'blue', .2)
const h2 = new TriangleHouse({x:0, y: 5, z: 0}, 2, 'Taurus',
  side, {color: 0x00fff0, side: THREE.DoubleSide})
scene.add(h2.getMesh())



// const planeWidth = 20, planeHeight = 12
// const geometry = new PlaneGeometry(planeWidth, planeHeight);  // Adjust size as needed
// const material = new MeshBasicMaterial({color: 0x008080, side: DoubleSide});
// const ground = new Mesh(geometry, material);
// ground.position.set(0,0,0)
// scene.add(ground);
//
// const x_center = 0;  // Replace with the x-coordinate of the center
// const y_center = 0;  // Replace with the y-coordinate of the center
//
// const directions = {
//   N: {x: x_center, y: y_center + planeHeight / 2},
//   NE: {x: x_center + planeWidth / 2, y: y_center + planeHeight / 2},
//   E: {x: x_center + planeWidth / 2, y: y_center},
//   SE: {x: x_center + planeWidth / 2, y: y_center - planeHeight / 2},
//   S: {x: x_center, y: y_center - planeHeight / 2},
//   SW: {x: x_center - planeWidth / 2, y: y_center - planeHeight / 2},
//   W: {x: x_center - planeWidth / 2, y: y_center},
//   NW: {x: x_center - planeWidth / 2, y: y_center + planeHeight / 2}
// };
//
// const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });  // Blue color
// function createLine(start, end) {
//   const geometry = new BufferGeometry();
//   const points = [];
//   points.push(start)
//   points.push(end)
//   geometry.setFromPoints(points);
//   return new Line(geometry, lineMaterial);
// }
//
// // Create lines based on the specified directions
// const lineNE = createLine(directions.N, directions.E);
// const lineNW = createLine(directions.N, directions.W);
// const lineSW = createLine(directions.S, directions.W);
// const lineSE = createLine(directions.S, directions.E);
// const lineNWSE = createLine(directions.NW, directions.SE);
// const lineNESW = createLine(directions.NE, directions.SW);
// // Add lines to the scene
// scene.add(lineNE, lineNW, lineSW, lineSE, lineNWSE, lineNESW);
//
// const map = new TextureLoader().load( '/ganesha.png' );
// const mat_ganesha = new MeshBasicMaterial( { map: map, color: 'white', opacity: .5 } );
// const geo_ganesha = new PlaneGeometry(2,2)
// const mesh_ganesha = new Mesh(geo_ganesha, mat_ganesha)
// scene.add( mesh_ganesha );

// console.log(getRhombus())


function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}
function updateRenderer() {
    renderer.setSize(width.value * chartWidthPercent, height.value)
    renderer.render(scene, camera)
}

function setRenderer() {
  if (experience.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: experience.value,
    });
    renderer.setClearColor(0xebe7df);
    updateRenderer()
  }
}

// function loop() {
//   sphere.position.x += 0.01
//   renderer.render(scene, camera)
//   requestAnimationFrame(loop)
// }

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})
onMounted(() => {
  setRenderer()
  // loop()
  // createChartBackground()
})
</script>
<template>
  <div>
    <canvas ref='experience'/>
  </div>
</template>
