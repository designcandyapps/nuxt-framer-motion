import type { Transition } from '#motion/animation/types'
import type { AnimationType } from '#motion/render/utils/types'

export type VisualElementAnimationOptions = {
  delay?: number
  transitionOverride?: Transition
  custom?: any
  type?: AnimationType
}
