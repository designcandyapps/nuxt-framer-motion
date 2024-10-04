import { useCallback } from '#motion/react/useCallback'
import type { Ref } from 'vue'
import type { VisualElement } from '#motion/render/VisualElement'
import type { VisualState } from '#motion/motion/utils/useVisualState'

/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
export function useMotionRef<Instance, RenderState>(
  visualState: VisualState<Instance, RenderState>,
  visualElement?: VisualElement<Instance> | null
): Ref<Instance> {
  return useCallback(
    (instance: Instance) => {
      instance && visualState.mount && visualState.mount(instance)

      if (visualElement) {
        if (instance) {
          visualElement.mount(instance)
        } else {
          visualElement.unmount()
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  )
}
