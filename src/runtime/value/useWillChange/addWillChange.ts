import type { VisualElement } from '#motion/render/VisualElement'
import { isWillChangeMotionValue } from '#motion/value/useWillChange/is'

export function addValueToWillChange(
  visualElement: VisualElement,
  key: string
) {
  if (!visualElement.applyWillChange) return

  const willChange = visualElement.getValue('willChange')

  /**
   * It could be that a user has set willChange to a regular MotionValue,
   * in which case we can't add the value to it.
   */
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key)
  }
}
