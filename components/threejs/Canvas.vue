<script setup lang='ts'>
import { Scene, PerspectiveCamera, SphereGeometry, MeshBasicMaterial, Mesh, WebGLRenderer } from 'three'
import { ref } from 'vue'

let renderer
const experience: ref<HTMLCanvasElement | null> = ref(null)
const scene = new Scene()
// const width = window.innerWidth, height = window.innerHeight
const {width, height} = useWindowSize()
const aspectRatio = computed(() => width.value/height.value)
const camera = new PerspectiveCamera(75, aspectRatio.value, .1, 1000)
camera.position.set(0,0,2)
scene.add(camera)
const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0x008080 })
);
scene.add(sphere)

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}
function updateRenderer() {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

function setRenderer() {
  if (experience.value) {
    renderer = new WebGLRenderer({
      canvas: experience.value,
    });
    updateRenderer()
  }
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})
onMounted(() => {
  setRenderer()
})
</script>
<template>
  <div>
    <canvas ref='experience'/>
  </div>
</template>
