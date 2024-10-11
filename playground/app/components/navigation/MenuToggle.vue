<template>
  <button class="button" @click="toggle">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <MenuPath
        :variants="{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' }
        }"
      />
      <MenuPath
        d="M 2 9.423 L 20 9.423"
        :variants="{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }"
        :transition="{ duration: 0.1 }"
      />
      <MenuPath
        :variants="{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' }
        }"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import MenuPath from '~/components/navigation/MenuPath.vue'

defineProps<{
  toggle: () => void
}>()
</script>

<style scoped>
.button {
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
}
</style>
