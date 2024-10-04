import { FocusGesture } from '#motion/gestures/focus'
import { HoverGesture } from '#motion/gestures/hover'
import { PressGesture } from '#motion/gestures/press'
import type { FeaturePackages } from '#motion/motion/features/types'
import { InViewFeature } from '#motion/motion/features/viewport'

export const gestureAnimations: FeaturePackages = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
}
