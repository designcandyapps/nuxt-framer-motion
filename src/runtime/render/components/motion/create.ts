import { animations } from '#motion/motion/features/animations'
import { drag } from '#motion/motion/features/drag'
import { gestureAnimations } from '#motion/motion/features/gestures'
import { layout } from '#motion/motion/features/layout'
import { createMotionComponentFactory } from '#motion/render/components/createFactory'
import { createDomVisualElement } from '#motion/render/dom/createVisualElement'
import type { MotionHTML } from '#motion/html'
import type { ComponentProps, DefineSetupFnComponent } from 'vue'

const createUnderlyingComponent = /* @__PURE__ */ createMotionComponentFactory(
  {
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout
  },
  createDomVisualElement
)

export function createMotionComponent<T extends keyof MotionHTML>(tag: T): DefineSetupFnComponent<MotionHTML[T]> {
  return defineComponent({
    name: `Motion${tag.charAt(0).toUpperCase() + tag.slice(1)}`,
    props: {} as ComponentProps<T>,
    setup(props, { attrs, slots }) {
      const children = () => slots.default ? slots.default() : []
      return () => h(createUnderlyingComponent(tag), { ...props, ...attrs }, children)
    }
  })
}
