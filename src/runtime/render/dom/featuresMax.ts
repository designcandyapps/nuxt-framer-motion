import { drag } from '#motion/motion/features/drag'
import { layout } from '#motion/motion/features/layout'
import type { FeatureBundle } from '#motion/motion/features/types'
import { domAnimation } from '#motion/render/dom/featuresAnimation'

/**
 * @public
 */
export const domMax: FeatureBundle = {
  ...domAnimation,
  ...drag,
  ...layout
}
