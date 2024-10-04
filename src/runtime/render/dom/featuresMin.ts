import { animations } from '#motion/motion/features/animations'
import type { FeatureBundle } from '#motion/motion/features/types'
import { createDomVisualElement } from '#motion/render/dom/createVisualElement'

/**
 * @public
 */
export const domMin: FeatureBundle = {
  renderer: createDomVisualElement,
  ...animations
}
