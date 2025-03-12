<template>
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
</style>




<!--script setup lang="ts">
</script>

<template>
  Choose a page
</template>

<style scoped>
</style-->
