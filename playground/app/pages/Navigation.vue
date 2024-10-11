<script setup lang="ts">
import { useCycle } from '#motion/utils/useCycle'
import MenuToggle from '~/components/navigation/MenuToggle.vue'
import Navigation from '~/components/navigation/Navigation.vue'
import { useDimensions } from '~/components/navigation/useDimensions'

const [isOpen, toggleOpen] = useCycle(false, true)
const containerRef = useTemplateRef('containerRef')
const { height } = useDimensions(containerRef)

const sidebar = {
  open: {
    clipPath: `circle(2200px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}
</script>

<template>
  <div class="relative border border-red-500 w-full h-full m-0">
    <MotionNav
      ref="containerRef"
      class="nav"
      :initial="false"
      :animate="isOpen ? 'open' : 'closed'"
      :custom="height"
    >
      <MotionDiv class="background" :variants="sidebar" />
      <Navigation />
      <MenuToggle :toggle="toggleOpen" />
    </MotionNav>
  </div>
</template>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #fff;
}
</style>
