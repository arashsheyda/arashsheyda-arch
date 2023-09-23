---
layout: post
title: Nuxt 3 with Three.js
image: /uploads/images/blog/nuxt-with-threejs.jpg
date: 2023-01-03
tags: ['logos:nuxt-icon']
published: true
---

# Nuxt 3 with Three.js

In this article, we will learn how to use Three.js with Nuxt 3 and build cool things!

## What is Three.js?

Three.js is a cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser. Three.js uses WebGL.

## What is Nuxt 3?

Nuxt 3 is a web application framework based on Vue.js, it is designed to make web development powerful and performant.

## Getting Started

First, we need to create a new Nuxt 3 project:

```bash [terminal]
npx nuxi init nuxt-threejs
```

Then, we need to install the Three.js dependency:

```bash [terminal]
yarn add three @types/three --dev
```

## Using Three.js

Now, we can use Three.js in our Nuxt 3 project. Let's create a new component called `arch.vue` in the `components` directory and add the following code:

```vue [arch.vue]
<script lang="ts" setup>
import { Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import { useWindowSize } from '@vueuse/core'
import { Ref } from 'vue'

let renderer: WebGLRenderer
const container: Ref<HTMLCanvasElement | null> = ref(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0, 4)

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

function updateRenderer() {
  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
}

function setRenderer() {
  if (container.value) {
    renderer = new WebGLRenderer({ canvas: container.value })
    updateRenderer()
  }
}

function animate() {
  updateRenderer()
  requestAnimationFrame(animate)
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

onMounted(() => {
  setRenderer()
  animate()
})
</script>

<template>
  <canvas ref="container" />
</template>
```

- don't forget when using `arch.vue` component you need to wrap it with `ClientOnly` component to prevent errors on server-side rendering; or add `.client` to end of component name.
