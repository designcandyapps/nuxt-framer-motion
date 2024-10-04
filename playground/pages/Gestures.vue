<template>
  <div class="body" />
  <h1>Gestures</h1>
  <MotionDiv
    class="container"
    :while-hover="{ scale: 1.2, rotate: 90 }"
    :while-tap="{ scale: 0.8, rotate: -90, borderRadius: '100%' }"
  />
</template>

<style scoped>
.container {
  width: 150px;
  height: 150px;
  background: white;
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
  background: linear-gradient(180deg, #91f, #70f);
}
</style>
