<script setup lang='ts'>
import {
  Scene, PerspectiveCamera, SphereGeometry,
  MeshBasicMaterial, Mesh, WebGLRenderer, PlaneGeometry,
  DoubleSide, AmbientLight, DirectionalLight, Vector3, Line, LineBasicMaterial, BufferGeometry
} from 'three'
import { ref } from 'vue'

let renderer
const experience: ref<HTMLCanvasElement | null> = ref(null)
const scene = new Scene()
// const width = window.innerWidth, height = window.innerHeight

// Camera
const {width, height} = useWindowSize()
const chartWidthPercent = .75
const aspectRatio = computed(() => width.value * chartWidthPercent/height.value)
const camera = new PerspectiveCamera(75, aspectRatio.value, .1, 1000)
// camera.position.set(0,0,5)
camera.position.set(0, 15, 0);
camera.lookAt(0, 0, 0);
scene.add(camera)

//Lighting
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const sphereGeometry = new SphereGeometry(1, 24, 24)
const mat = new MeshBasicMaterial({color: 'red'})
const m_position = new Mesh(sphereGeometry, mat)
m_position.position.set(0,0,0)
scene.add(m_position)

//Chart Background
const geometry = new PlaneGeometry(30, 16);  // Adjust size as needed
const material = new MeshBasicMaterial({color: 0x008080, side: DoubleSide});
const ground = new Mesh(geometry, material);
ground.position.set(0,0,0)
ground.rotation.x = Math.PI / 2;  // Rotate the ground to be horizontal
scene.add(ground);

const groundWidth = ground.geometry.parameters.width;
const groundHeight = ground.geometry.parameters.height;
// console.log(ground.position)
function findIntersection(angle) {
  const m = Math.tan(angle);
  const x1 = groundWidth / 2;
  const z1 = m * x1;
  if (Math.abs(z1) <= groundHeight / 2) {
    return new Vector3(x1, 0, z1);
  }
  const x2 = -groundWidth / 2;
  const z2 = m * x2;
  if (Math.abs(z2) <= groundHeight / 2) {
    return new Vector3(x2, 0, z2);
  }
  const z3 = groundHeight / 2;
  const x3 = z3 / m;
  if (Math.abs(x3) <= groundWidth / 2) {
    return new Vector3(x3, 0, z3);
  }
  const z4 = -groundHeight / 2;
  const x4 = z4 / m;
  if (Math.abs(x4) <= groundWidth / 2) {
    return new Vector3(x4, 0, z4);
  }
}

const extendedDirections = {
  N: findIntersection(Math.PI / 2),
  NE: findIntersection(Math.PI / 4),
  E: findIntersection(0),
  SE: findIntersection(-Math.PI / 4),
  S: findIntersection(-Math.PI / 2),
  SW: findIntersection(-3 * Math.PI / 4),
  W: findIntersection(Math.PI),
  NW: findIntersection(3 * Math.PI / 4)
};
console.log(extendedDirections)
const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });  // Blue color
function createLine(start, end) {
  const geometry = new BufferGeometry();
  const adjustedStart = new Vector3(start.x, 0.01, start.z);
  // const adjustedStart = new Vector3(0, 0.01, 0);
  const adjustedEnd = new Vector3(end.x, 0.01, end.z);
  // const adjustedEnd = new Vector3(10, 0.01, 0);
  console.log(start, end)
  const points = [];
  points.push(adjustedStart)
  points.push(adjustedEnd)
  geometry.setFromPoints(points);
  return new Line(geometry, lineMaterial);
}

// Create lines based on the specified directions
const lineNE = createLine(extendedDirections.N, extendedDirections.E);
const lineNW = createLine(extendedDirections.N, extendedDirections.W);
const lineSW = createLine(extendedDirections.S, extendedDirections.W);
const lineSE = createLine(extendedDirections.S, extendedDirections.E);
const lineNWSE = createLine(extendedDirections.NW, extendedDirections.SE);
const lineNESW = createLine(extendedDirections.NE, extendedDirections.SW);
// console.log(lineNE, lineNW)
// Add lines to the scene
// scene.add(lineNE, lineNW, lineSW, lineSE, lineNWSE, lineNESW);
scene.add(lineSW, lineNW);


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
    renderer = new WebGLRenderer({
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
