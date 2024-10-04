import type { MotionStyle } from '#motion/motion/types'
import type { IProjectionNode } from '#motion/projection/node/types'
import { camelToDash } from '#motion/render/dom/utils/camelToDash'
import { renderHTML } from '#motion/render/html/utils/render'
import type { SVGRenderState } from '#motion/render/svg/types'
import { camelCaseAttributes } from '#motion/render/svg/utils/camelCaseAttrs'

export function renderSVG(
  element: SVGElement,
  renderState: SVGRenderState,
  _styleProp?: MotionStyle,
  projection?: IProjectionNode
) {
  renderHTML(element as any, renderState, undefined, projection)

  for (const key in renderState.attrs) {
    element.setAttribute(
      !camelCaseAttributes.has(key) ? camelToDash(key) : key,
      renderState.attrs[key] as string
    )
  }
}
