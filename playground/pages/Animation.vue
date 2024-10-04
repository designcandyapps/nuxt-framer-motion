<template>
  <div class="body" />
  <h1>Animation</h1>
  <MotionMain
    class="container"
    :initial="{ backgroundSize: '100%' }"
    :animate="{ backgroundSize: '200%' }"
    :transition="{
      type: 'spring',
      stiffness: 400,
      damping: 40,
      repeat: Infinity,
      repeatType: 'mirror',
      repeatDelay: 0.2
    }"
  />
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
  width: 150px;
  height: 150px;
  background-image: url("https://framerusercontent.com/images/M4SNURkNYCDjIiopKdiL689jOQ.svg");
  border-radius: 30px;
}

.body {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(180deg, #f08, #d0e);
}
</style>
