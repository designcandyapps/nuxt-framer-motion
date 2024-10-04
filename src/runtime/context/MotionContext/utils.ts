import type { MotionContextProps } from '#motion/context/MotionContext/index'
import type { MotionProps } from '#motion/motion/types'
import { isVariantLabel } from '#motion/render/utils/isVariantLabel'
import { isControllingVariants } from '#motion/render/utils/isControllingVariants'

export function getCurrentTreeVariants(
  props: MotionProps,
  context: MotionContextProps
): MotionContextProps {
  if (isControllingVariants(props)) {
    const { initial, animate } = props
    return {
      initial:
        initial === false || isVariantLabel(initial)
          ? (initial as any)
          : undefined,
      animate: isVariantLabel(animate) ? animate : undefined
    }
  }
  return props.inherit !== false ? context : {}
}
