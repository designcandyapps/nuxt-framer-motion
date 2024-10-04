<script setup lang="ts">
import { usePresence } from '#motion/components/AnimatePresence/usePresence'
import { IKLayoutGroupContext } from '#motion/context/LayoutGroupContext'
import { IKSwitchLayoutGroupContext } from '#motion/context/SwitchLayoutGroupContext'
import type { MotionProps } from '#motion/motion/types'
import type { VisualElement } from '#motion/render/VisualElement'
import MeasureLayoutWithContext from './MeasureLayoutWithContext.vue'

defineProps<MotionProps & { visualElement: VisualElement }>()

const [isPresent, safeToRemove] = usePresence()
const layoutGroup = inject(IKLayoutGroupContext, {})
</script>

<template>
  <MeasureLayoutWithContext
    :attrs="$attrs"
    :layout-group="layoutGroup"
    :switch-layout-group="inject(IKSwitchLayoutGroupContext, {})"
    :is-present="isPresent"
    :safe-to-remove="safeToRemove"
  />
</template>
