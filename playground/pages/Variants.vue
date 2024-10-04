<script setup lang="ts">
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const idx = [0, 1, 2, 3]
</script>

<template>
  <div class="body" />
  <h1>Variants</h1>
  <MotionUl
    class="container"
    :variants="container"
    initial="hidden"
    animate="visible"
  >
    <MotionLi v-for="i in idx" :key="i" class="item" :variants="item" />
  </MotionUl>
</template>

<style scoped>
.container {
  width: 150px;
  height: 150px;
  display: grid;
  overflow: hidden;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}

.item {
  background: white;
  border-radius: 100%;
}

.body {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(180deg, #d0e, #91f);
}
</style>
