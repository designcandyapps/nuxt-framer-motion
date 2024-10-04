<template>
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
</style>
