<script setup lang='ts'>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { ref } from 'vue'
import { TAURUS, LIBRA } from '@/constants/'

let renderer, controls
const experience: ref<HTMLCanvasElement | null> = ref(null)
const scene = new THREE.Scene()
const manager = new THREE.LoadingManager();
const fontLoader =  new FontLoader(manager);
let savedFont

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
const sideLength = 4



//Chart Background
// House 1
// Create a square using THREE.PlaneGeometry
// const pos = {x: 0, y: (Math.sqrt(2) * sideLength)/2, z: 0}
// const h1 = new SquareHouse(pos, 1, 'Aries',
//   sideLength, {color: 0x00ff00, side: THREE.DoubleSide})
// scene.add(h1.getMesh())
// addTextToPlane(savedFont, 'hello', {x: 0, y:0, z: 0.1}, h1.getMesh())
//
// const anchor1Coordinate =  getEndingCoordinate(0, 0, 135, sideLength)
// spawnDebugSphere(scene, {x: anchor1Coordinate.x, y: anchor1Coordinate.y, z: 0}, 'blue', .2)
// // House 2
// const h2 = new TriangleHouse({x:anchor1Coordinate.x, y: anchor1Coordinate.y, z: 0}, 2, 'Taurus',
//   sideLength, {color: 0x00fff0, side: THREE.DoubleSide})
// scene.add(h2.getMesh())
// rotateAboutPoint(h2.getMesh(),
//   new THREE.Vector3(anchor1Coordinate.x, anchor1Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(45),
//   true
// )
//
// // House 3
// const h3 = new TriangleHouse({x:anchor1Coordinate.x, y: anchor1Coordinate.y, z: 0}, 3, 'Gemini',
//   sideLength, {color: 0x00bbccff, side: THREE.DoubleSide})
// scene.add(h3.getMesh())
// rotateAboutPoint(h3.getMesh(),
//   new THREE.Vector3(anchor1Coordinate.x, anchor1Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(135),
//   true
// )
//
// // House 4
// const pos2 = {x: -(Math.sqrt(2) * sideLength)/2, y: 0, z: 0}
// const h4 = new SquareHouse(pos2, 4, 'Cancer',
//   sideLength, {color: 0x00df00, side: THREE.DoubleSide})
// scene.add(h4.getMesh())
//
// const anchor2Coordinate =  getEndingCoordinate(0, 0, 225, sideLength)
// spawnDebugSphere(scene, {x: anchor2Coordinate.x, y: anchor2Coordinate.y, z: 0}, 'yellow', .2)
// console.log(anchor2Coordinate)
//
// //House 5
// const h5 = new TriangleHouse({x:anchor2Coordinate.x, y: anchor2Coordinate.y, z: 0}, 5, 'Leo',
//   sideLength, {color: 0x0ffff0, side: THREE.DoubleSide})
// scene.add(h5.getMesh())
// rotateAboutPoint(h5.getMesh(),
//   new THREE.Vector3(anchor2Coordinate.x, anchor2Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(135),
//   true
// )
//
// //House 6
// const h6 = new TriangleHouse({x:anchor2Coordinate.x, y: anchor2Coordinate.y, z: 0}, 6, 'Virgo',
//   sideLength, {color: 0x0ffdd0, side: THREE.DoubleSide})
// scene.add(h6.getMesh())
// rotateAboutPoint(h6.getMesh(),
//   new THREE.Vector3(anchor2Coordinate.x, anchor2Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(225),
//   true
// )
//
// //House 7
// const pos3 = {x: 0, y: -(Math.sqrt(2) * sideLength)/2, z: 0}
// const h7 = new SquareHouse(pos3, 7, 'Libra',
//   sideLength, {color: 0x0fddd0, side: THREE.DoubleSide})
// scene.add(h7.getMesh())
//
// const anchor3Coordinate =  getEndingCoordinate(0, 0, 315, sideLength)
// spawnDebugSphere(scene, {x: anchor3Coordinate.x, y: anchor3Coordinate.y, z: 0}, 'yellow', .2)
// console.log(anchor3Coordinate)
//
// //House 8
// const h8 = new TriangleHouse({x:anchor3Coordinate.x, y: anchor3Coordinate.y, z: 0}, 8, 'Scorpio',
//   sideLength, {color: 0x0ffdd0, side: THREE.DoubleSide})
// scene.add(h8.getMesh())
// rotateAboutPoint(h8.getMesh(),
//   new THREE.Vector3(anchor3Coordinate.x, anchor3Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(225),
//   true
// )
//
// //House 9
// const h9 = new TriangleHouse({x:anchor3Coordinate.x, y: anchor3Coordinate.y, z: 0}, 9, 'Sagittarius',
//   sideLength, {color: 0x0ffff0, side: THREE.DoubleSide})
// scene.add(h9.getMesh())
// rotateAboutPoint(h9.getMesh(),
//   new THREE.Vector3(anchor3Coordinate.x, anchor3Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(315),
//   true
// )
//
// //House 10
// const pos4 = {x: (Math.sqrt(2) * sideLength)/2, y: 0, z: 0}
// const h10 = new SquareHouse(pos4, 10, 'Capricorn',
//   sideLength, {color: 0x0fdddd, side: THREE.DoubleSide})
// scene.add(h10.getMesh())
//
// const anchor4Coordinate =  getEndingCoordinate(0, 0, 45, sideLength)
// spawnDebugSphere(scene, {x: anchor4Coordinate.x, y: anchor4Coordinate.y, z: 0}, 'yellow', .2)
// console.log(anchor4Coordinate)
//
// //House 11
// const h11 = new TriangleHouse({x:anchor4Coordinate.x, y: anchor4Coordinate.y, z: 0}, 11, 'Aquarius',
//   sideLength, {color: 0x00fff0, side: THREE.DoubleSide})
// scene.add(h11.getMesh())
// rotateAboutPoint(h11.getMesh(),
//   new THREE.Vector3(anchor4Coordinate.x, anchor4Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(45),
//   true
// )
//
// // House 12
// const h12 = new TriangleHouse({x:anchor4Coordinate.x, y: anchor4Coordinate.y, z: 0}, 12, 'Pieces',
//   sideLength, {color: 0x00bbccff, side: THREE.DoubleSide})
// scene.add(h12.getMesh())
// rotateAboutPoint(h12.getMesh(),
//   new THREE.Vector3(anchor4Coordinate.x, anchor4Coordinate.y, 0),
//   new THREE.Vector3(0, 0, 1),
//   THREE.MathUtils.degToRad(315),
//   true
// )

function setupControls() {
  //Controls
  controls = new OrbitControls( camera, renderer.domElement );
  controls.listenToKeyEvents( window ); // optional

//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 5;
  controls.maxDistance = 20;

  controls.maxPolarAngle = Math.PI / 2;

}

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
    setupControls()
  }
}

function animate() {
  requestAnimationFrame(animate)
  controls.update();
  // h2.getMesh().rotation.z += 0.01
  // rotateAboutPoint(h5.getMesh(),
  //   new THREE.Vector3(anchor2Coordinate.x, anchor2Coordinate.y, 0),
  //   new THREE.Vector3(0, 0, 1),
  //   THREE.MathUtils.degToRad(.2),
  //   true
  // )
  updateRenderer()
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})
onMounted(() => {
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    console.log('Load complete', font)
    savedFont = font
    setRenderer()
    // loop()
    // createChartBackground()

    drawChart(LIBRA.text, sideLength, scene, savedFont)

    animate()

  })
})
</script>
<template>
  <div>
    <canvas ref='experience'/>
  </div>
</template>
