import { resolveElements } from '#motion/render/dom/utils/resolveElement'
import { invariant } from '#motion/utils/errors'
import { secondsToMilliseconds } from '#motion/utils/timeConversion'
import type {
  AnimationPlaybackControls,
  AnimationScope,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector
} from '#motion/animation/types'
import { getValueTransition } from '#motion/animation/utils/getValueTransition'
import { NativeAnimation } from '#motion/animation/animators/waapi/NativeAnimation'

export function animateElements(
  elementOrSelector: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: DynamicAnimationOptions,
  scope?: AnimationScope
) {
  const elements = resolveElements(elementOrSelector, scope)
  const numElements = elements.length

  invariant(Boolean(numElements), 'No valid element provided.')

  const animations: AnimationPlaybackControls[] = []

  for (let i = 0; i < numElements; i++) {
    const element = elements[i]
    const elementTransition = { ...options }

    /**
     * Resolve stagger function if provided.
     */
    if (typeof elementTransition.delay === 'function') {
      elementTransition.delay = elementTransition.delay(i, numElements)
    }

    for (const valueName in keyframes) {
      const valueKeyframes
        = keyframes[valueName as keyof typeof keyframes]!
      const valueOptions = {
        ...getValueTransition(options as any, valueName)
      }

      valueOptions.duration = valueOptions.duration
        ? secondsToMilliseconds(valueOptions.duration)
        : valueOptions.duration

      valueOptions.delay = secondsToMilliseconds(valueOptions.delay || 0)

      animations.push(
        new NativeAnimation(
          element,
          valueName,
          valueKeyframes,
          valueOptions
        )
      )
    }
  }

  return animations
}
