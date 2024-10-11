<template>
  <MotionUl :variants class="ul">
    <MenuItem v-for="i in itemIds" :key="i" :i="i" />
  </MotionUl>
</template>

<script setup lang="ts">
import MenuItem from '~/components/navigation/MenuItem.vue'

const itemIds = [0, 1, 2, 3, 4]

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}
</script>

<style scoped>
.ul {
  margin: 0;
  padding: 25px;
  position: absolute;
  top: 100px;
  width: 230px;
}
</style>
