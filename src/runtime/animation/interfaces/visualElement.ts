import { resolveVariant } from '#motion/render/utils/resolveDynamicVariants'
import type { VisualElement } from '#motion/render/VisualElement'
import type { AnimationDefinition } from '#motion/animation/types'
import type { VisualElementAnimationOptions } from '#motion/animation/interfaces/types'
import { animateTarget } from '#motion/animation/interfaces/visualElementTarget'
import { animateVariant } from '#motion/animation/interfaces/visualElementVariant'

export function animateVisualElement(
  visualElement: VisualElement,
  definition: AnimationDefinition,
  options: VisualElementAnimationOptions = {}
) {
  visualElement.notify('AnimationStart', definition)
  let animation: Promise<any>

  if (Array.isArray(definition)) {
    const animations = definition.map(variant =>
      animateVariant(visualElement, variant, options)
    )
    animation = Promise.all(animations)
  } else if (typeof definition === 'string') {
    animation = animateVariant(visualElement, definition, options)
  } else {
    const resolvedDefinition
      = typeof definition === 'function'
        ? resolveVariant(visualElement, definition, options.custom)
        : definition

    animation = Promise.all(
      animateTarget(visualElement, resolvedDefinition, options)
    )
  }

  return animation.then(() => {
    visualElement.notify('AnimationComplete', definition)
  })
}
