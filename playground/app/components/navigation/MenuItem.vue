<script setup lang="ts">
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

const props = defineProps<{
  i: number
}>()

const stl = { border: `2px solid ${colors[props.i]}` }
</script>

<template>
  <MotionLi
    class="li"
    :variants
    :while-hover="{ scale: 1.1 }"
    :while-tap="{ scale: 0.95 }"
  >
    <div class="icon-placeholder" :style="stl" />
    <div class="text-placeholder" :style="stl" />
  </MotionLi>
</template>

<style scoped>
.li {
  padding: 0;
  list-style: none;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 20px;
}

.text-placeholder {
  border-radius: 5px;
  width: 200px;
  height: 20px;
  flex: 1;
}
</style>
