import { isAnimationControls } from '#motion/animation/utils/isAnimationControls'
import type { MotionProps } from '#motion/motion/types'
import { isVariantLabel } from '#motion/render/utils/isVariantLabel'
import { variantProps } from '#motion/render/utils/variantProps'

export function isControllingVariants(props: MotionProps) {
  return (
    isAnimationControls(props.animate)
    || variantProps.some(name => isVariantLabel(props[name as keyof typeof props])
    )
  )
}

export function isVariantNode(props: MotionProps) {
  return Boolean(isControllingVariants(props) || props.variants)
}
