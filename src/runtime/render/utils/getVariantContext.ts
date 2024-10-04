import type { VisualElement } from '#motion/render/VisualElement'
import { isVariantLabel } from '#motion/render/utils/isVariantLabel'
import { variantProps } from '#motion/render/utils/variantProps'

const numVariantProps = variantProps.length

type VariantStateContext = {
  initial?: string | string[]
  animate?: string | string[]
  exit?: string | string[]
  whileHover?: string | string[]
  whileDrag?: string | string[]
  whileFocus?: string | string[]
  whileTap?: string | string[]
}

export function getVariantContext(
  visualElement?: VisualElement
): undefined | VariantStateContext {
  if (!visualElement) return undefined

  if (!visualElement.isControllingVariants) {
    const context = visualElement.parent
      ? getVariantContext(visualElement.parent) || {}
      : {}
    if (visualElement.props.initial !== undefined) {
      context.initial = visualElement.props.initial as any
    }
    return context
  }

  const context = {}
  for (let i = 0; i < numVariantProps; i++) {
    const name = variantProps[i] as keyof typeof context
    const prop = visualElement.props[name]

    if (isVariantLabel(prop) || prop === false) {
      context[name] = prop
    }
  }

  return context
}
