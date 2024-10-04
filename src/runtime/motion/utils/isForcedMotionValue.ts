import { scaleCorrectors } from '#motion/projection/styles/scaleCorrection'
import type { MotionProps } from '#motion/motion/types'
import { transformProps } from '#motion/render/html/utils/transform'

export function isForcedMotionValue(
  key: string,
  { layout, layoutId }: MotionProps
) {
  return (
    transformProps.has(key)
    || key.startsWith('origin')
    || ((layout || layoutId !== undefined)
      && (!!scaleCorrectors[key] || key === 'opacity'))
  )
}
