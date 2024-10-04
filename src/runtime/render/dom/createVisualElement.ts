import { type DefineComponent, Fragment } from 'vue'
import { HTMLVisualElement } from '#motion/render/html/HTMLVisualElement'
import { SVGVisualElement } from '#motion/render/svg/SVGVisualElement'
import type { CreateVisualElement, VisualElementOptions } from '#motion/render/types'
import { isSVGComponent } from '#motion/render/dom/utils/isSVGComponent'

export const createDomVisualElement: CreateVisualElement<
  HTMLElement | SVGElement
> = (
  component: string | DefineComponent,
  options: VisualElementOptions<HTMLElement | SVGElement>
) => {
  return isSVGComponent(component)
    ? new SVGVisualElement(options)
    : new HTMLVisualElement(options, {
      allowProjection: component !== Fragment
    })
}
