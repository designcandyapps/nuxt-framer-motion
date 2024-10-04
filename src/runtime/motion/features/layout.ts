import { HTMLProjectionNode } from '#motion/projection/node/HTMLProjectionNode'
import MeasureLayout from '#motion/motion/features/layout/MeasureLayout.vue'
import type { FeaturePackages } from '#motion/motion/features/types'

export const layout: FeaturePackages = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
}
