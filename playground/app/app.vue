<template>
  <UApp :toaster="appConfig.toaster">
    <div class="flex bg-white w-screen h-screen min-h-0 dark:bg-gray-900" vaul-drawer-wrapper>
      <UNavigationMenu :items="items" orientation="vertical" class="border-r border-gray-200 dark:border-gray-800 overflow-y-auto w-48 p-4" />

      <div class="flex flex-col w-full items-center p-8">
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

      </div>

      <UModal v-model:open="isCommandPaletteOpen" class="sm:h-96">
        <template #content>
          <UCommandPalette placeholder="Search a component..." :groups="[{ id: 'items', items }]" :fuse="{ resultLimit: 100 }" @update:model-value="onSelect" @update:open="value => isCommandPaletteOpen = value" />
        </template>
      </UModal>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'
import appConfig from '~/app.config'

const components = [
  'animation',
  'drag',
  'gestures',
  'keyframes',
  'path',
  'scroll',
  'variants',
  'navigation'
]

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true
})

const items = components.map(component => ({ label: upperName(component), to: `/${component}` }))
</script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
