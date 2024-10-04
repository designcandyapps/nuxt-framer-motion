import { DragGesture } from '#motion/gestures/drag'
import { PanGesture } from '#motion/gestures/pan'
import { HTMLProjectionNode } from '#motion/projection/node/HTMLProjectionNode'
import MeasureLayout from '#motion/motion/features/layout/MeasureLayout.vue'
import type { FeaturePackages } from '#motion/motion/features/types'

export const drag: FeaturePackages = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
}
