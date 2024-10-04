import type { RenderComponent } from '#motion/motion/features/types'
import type { HTMLRenderState } from '#motion/render/html/types'
import type { SVGRenderState } from '#motion/render/svg/types'
import { Fragment } from 'vue'
import { useHTMLProps } from '#motion/render/html/useProps'
import { filterProps } from '#motion/render/dom/utils/filterProps'
import { isSVGComponent } from '#motion/render/dom/utils/isSVGComponent'
import { useSVGProps } from '#motion/render/svg/useProps'

export function createUseRender(): RenderComponent<
  HTMLElement | SVGElement,
  HTMLRenderState | SVGRenderState
> {
  return (component, props, children, motionRef, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(component)
      ? useSVGProps
      : useHTMLProps

    const visualProps = useVisualProps(
      props as any,
      latestValues,
      isStatic,
      component
    )
    const filteredProps = filterProps(
      props,
      typeof component === 'string'
    )
    const elementProps = component !== Fragment ? { ...filteredProps, ...visualProps } : {}

    return h(
      component,
      {
        onVnodeMounted: ({ el }) => {
          motionRef.value = el
        },
        ...elementProps
      },
      children()
    )
  }
}
