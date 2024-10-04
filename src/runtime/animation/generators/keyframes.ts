import { easeInOut } from '#motion/easing/ease'
import type { EasingFunction } from '#motion/easing/types'
import { isEasingArray } from '#motion/easing/utils/isEasingArray'
import { easingDefinitionToFunction } from '#motion/easing/utils/map'
import { interpolate } from '#motion/utils/interpolate'
import { defaultOffset } from '#motion/utils/offsets/default'
import { convertOffsetToTimes } from '#motion/utils/offsets/time'
import type { ValueAnimationOptions } from '#motion/animation/types'
import type { AnimationState, KeyframeGenerator } from '#motion/animation/generators/types'

export function defaultEasing(
  values: any[],
  easing?: EasingFunction
): EasingFunction[] {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1)
}

export function keyframes<T extends string | number>({
  duration = 300,
  keyframes: keyframeValues,
  times,
  ease = 'easeInOut'
}: ValueAnimationOptions<T>): KeyframeGenerator<T> {
  /**
   * Easing functions can be externally defined as strings. Here we convert them
   * into actual functions.
   */
  const easingFunctions = isEasingArray(ease)
    ? ease.map(easingDefinitionToFunction)
    : easingDefinitionToFunction(ease)

  /**
   * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
   * to reduce GC during animation.
   */
  const state: AnimationState<T> = {
    done: false,
    value: keyframeValues[0]
  }

  /**
   * Create a times array based on the provided 0-1 offsets
   */
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length
      ? times
      : defaultOffset(keyframeValues),
    duration
  )

  const mapTimeToKeyframe = interpolate<T>(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions)
      ? easingFunctions
      : defaultEasing(keyframeValues, easingFunctions)
  })

  return {
    calculatedDuration: duration,
    next: (t: number) => {
      state.value = mapTimeToKeyframe(t)
      state.done = t >= duration
      return state
    }
  }
}
