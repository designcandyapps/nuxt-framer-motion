import type { VisualElement } from '#motion/render/VisualElement'
import { isWillChangeMotionValue } from '#motion/value/useWillChange/is'
import { getWillChangeName } from '#motion/value/useWillChange/getWillChangeName'

export function addValueToWillChange(
  visualElement: VisualElement,
  key: string
) {
  if (!visualElement.applyWillChange) return

  const willChange = visualElement.getValue('willChange')

  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key)
  } else if (
    !visualElement.props.style?.willChange
    && getWillChangeName(key)
  ) {
    visualElement.setStaticValue('willChange', 'transform')
  }
}
