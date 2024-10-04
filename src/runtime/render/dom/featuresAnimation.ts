import { animations } from '#motion/motion/features/animations'
import { gestureAnimations } from '#motion/motion/features/gestures'
import type { FeatureBundle } from '#motion/motion/features/types'
import { createDomVisualElement } from '#motion/render/dom/createVisualElement'

/**
 * @public
 */
export const domAnimation: FeatureBundle = {
  renderer: createDomVisualElement(),
  ...animations,
  ...gestureAnimations
}
