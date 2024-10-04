<template>
  <div class="body" />
  <h1>Scroll</h1>
  <div class="wrapper">
    <MotionDiv class="container" :style="{ scale }">
      <MotionDiv class="item" :style="{ scaleY: scrollYProgress }" />
    </MotionDiv>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '#motion/value/useScroll'
import { useTransform } from '#motion/value/useTransform'

const { scrollYProgress } = useScroll()
const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2])
</script>

<style scoped>
.wrapper {
  width: 150px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
}

.item {
  width: inherit;
  height: inherit;
  background: white;
  transform-origin: 50% 100%;
}

.body {
  position: absolute;
  width: 100vw;
  height: 300vh;
  overflow-x: hidden;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(180deg, #40f, #05f);
}
</style>
