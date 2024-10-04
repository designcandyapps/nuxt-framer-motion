import { calcGeneratorDuration, maxGeneratorDuration } from '#motion/animation/generators/utils/calcDuration'
import type { GeneratorFactory, Transition } from '#motion/animation/types'
import { millisecondsToSeconds } from '#motion/utils/timeConversion'

/**
 * Create a progress => progress easing function from a generator.
 */
export function createGeneratorEasing(
  options: Transition,
  scale = 100,
  createGenerator: GeneratorFactory
) {
  const generator = createGenerator({ ...options, keyframes: [0, scale] })
  const duration = Math.min(
    calcGeneratorDuration(generator),
    maxGeneratorDuration
  )

  return {
    type: 'keyframes',
    ease: (progress: number) =>
      generator.next(duration * progress).value / scale,
    duration: millisecondsToSeconds(duration)
  }
}
