import type { MotionProps } from '#motion/motion/types'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import type { VisualElement } from '#motion/render/VisualElement'
import { scrapeMotionValuesFromProps as scrapeHTMLMotionValuesFromProps } from '#motion/render/html/utils/scrapeMotionValues'
import { transformPropOrder } from '#motion/render/html/utils/transform'

export function scrapeMotionValuesFromProps(
  props: MotionProps,
  prevProps: MotionProps,
  visualElement?: VisualElement
) {
  const newValues = scrapeHTMLMotionValuesFromProps(
    props,
    prevProps,
    visualElement
  )

  for (const key in props) {
    if (
      isMotionValue(props[key as keyof typeof props])
      || isMotionValue(prevProps[key as keyof typeof prevProps])
    ) {
      const targetKey
        = transformPropOrder.includes(key)
          ? 'attr' + key.charAt(0).toUpperCase() + key.substring(1)
          : key

      newValues[targetKey] = props[key as keyof typeof props]
    }
  }

  return newValues
}
