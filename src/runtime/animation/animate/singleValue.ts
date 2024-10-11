import { animateMotionValue } from '#motion/animation/interfaces/motionValue'
import { motionValue as createMotionValue, type MotionValue } from '#motion/value'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import type { GenericKeyframesTarget } from '#motion/types'
import type { AnimationPlaybackControls, ValueAnimationTransition } from '#motion/animation/types'

export function animateSingleValue<V extends string | number>(
  value: MotionValue<V> | V,
  keyframes: V | GenericKeyframesTarget<V>,
  options?: ValueAnimationTransition
): AnimationPlaybackControls {
  const motionValue = isMotionValue(value) ? value : createMotionValue(value)

  motionValue.start(animateMotionValue('', motionValue, keyframes, options))

  return motionValue.animation!
}
