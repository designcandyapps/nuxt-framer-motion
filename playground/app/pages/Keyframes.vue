<template>
  <div class="body" />
  <h1>Keyframes</h1>
  <MotionDiv
    class="box"
    :animate="{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ['20%', '20%', '50%', '50%', '20%']
    }"
    :transition="{
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1
    }"
  />
</template>

<script setup lang="ts">
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: white;
}
</style>
