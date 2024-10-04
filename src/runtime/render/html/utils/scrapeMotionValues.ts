import type { MotionProps, MotionStyle } from '#motion/motion/types'
import { isForcedMotionValue } from '#motion/motion/utils/isForcedMotionValue'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import type { VisualElement } from '#motion/render/VisualElement'

export function scrapeMotionValuesFromProps(
  props: MotionProps,
  prevProps: MotionProps,
  visualElement?: VisualElement
) {
  const { style } = props
  const newValues: { [key: string]: any } = {}

  for (const key in style) {
    if (isMotionValue(style[key as keyof MotionStyle])
      || (prevProps.style
        && isMotionValue(prevProps.style[key as keyof MotionStyle]))
        || isForcedMotionValue(key, props)
        || visualElement?.getValue(key)?.liveStyle !== undefined) {
      newValues[key] = style[key as keyof MotionStyle]
    }
  }

  /**
   * If the willChange style has been manually set as a string, set
   * applyWillChange to false to prevent it from automatically being applied.
   */
  if (visualElement && style && typeof style.willChange === 'string') {
    visualElement.applyWillChange = false
  }

  return newValues
}
