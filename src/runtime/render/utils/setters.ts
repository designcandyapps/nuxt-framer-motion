import type { TargetAndTransition, TargetResolver } from '#motion/types'
import { resolveFinalValueInKeyframes } from '#motion/utils/resolveValue'
import { motionValue } from '#motion/value'
import type { VisualElement } from '#motion/render/VisualElement'
import { resolveVariant } from '#motion/render/utils/resolveDynamicVariants'

/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(
  visualElement: VisualElement,
  key: string,
  value: string | number
) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key)!.set(value)
  } else {
    visualElement.addValue(key, motionValue(value))
  }
}

export function setTarget(
  visualElement: VisualElement,
  definition: string | TargetAndTransition | TargetResolver
) {
  const resolved = resolveVariant(visualElement, definition)
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {}

  target = { ...target, ...transitionEnd }

  for (const key in target) {
    const value = resolveFinalValueInKeyframes(
      target[key as keyof typeof target] as any
    )
    setMotionValue(visualElement, key, value as string | number)
  }
}
