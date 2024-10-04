import { motionComponentSymbol } from '#motion/motion/utils/symbol'
import type { DefineComponent } from 'vue'

/**
 * Checks if a component is a `motion` component.
 */
export function isMotionComponent(component: string | DefineComponent) {
  return (
    component !== null
    && typeof component === 'object'
    && motionComponentSymbol in component
  )
}
