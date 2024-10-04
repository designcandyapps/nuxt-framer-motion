<script setup lang="ts">
const constraintsRef = useTemplateRef('constraintsRef')
</script>

<template>
  <div class="body" />
  <h1 ref="reference">
    Drag
  </h1>
  <MotionDiv ref="constraintsRef" class="container">
    <MotionDiv class="item" :drag="true" :drag-constraints="constraintsRef" />
  </MotionDiv>
</template>

<style scoped>
.container {
  width: 300px;
  height: 300px;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
}

.item {
  width: 150px;
  height: 150px;
  background: white;
  border-radius: inherit;
}

.body {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -10;
  perspective: 500px;
  background: linear-gradient(180deg, #70f, #40f);
}
</style>
