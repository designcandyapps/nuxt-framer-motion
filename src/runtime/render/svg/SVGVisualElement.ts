import { scrapeMotionValuesFromProps } from '#motion/render/svg/utils/scrapeMotionValues'
import type { SVGRenderState } from '#motion/render/svg/types'
import { DOMVisualElement } from '#motion/render/dom'
import type { DOMVisualElementOptions } from '#motion/render/dom/types'
import { buildSVGAttrs } from '#motion/render/svg/utils/buildAttrs'
import { camelToDash } from '#motion/render/dom/utils/camelToDash'
import { camelCaseAttributes } from '#motion/render/svg/utils/camelCaseAttrs'
import { transformProps } from '#motion/render/html/utils/transform'
import { renderSVG } from '#motion/render/svg/utils/render'
import { getDefaultValueType } from '#motion/render/dom/valueTypes/defaults'
import type { MotionProps, MotionStyle } from '#motion/motion/types'
import type { MotionValue } from '#motion/value'
import type { ResolvedValues } from '#motion/render/types'
import { createBox } from '#motion/projection/geometry/models'
import type { IProjectionNode } from '#motion/projection/node/types'
import { isSVGTag } from '#motion/render/svg/utils/isSvgTag'
import type { VisualElement } from '#motion/render/VisualElement'

export class SVGVisualElement extends DOMVisualElement<
  SVGElement,
  SVGRenderState,
  DOMVisualElementOptions
> {
  type = 'svg'

  isSVGTag = false

  getBaseTargetFromProps(
    props: MotionProps,
    key: string
  ): string | number | MotionValue<any> | undefined {
    return props[key as keyof MotionProps]
  }

  readValueFromInstance(instance: SVGElement, key: string) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key)
      return defaultType ? defaultType.default || 0 : 0
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key
    return instance.getAttribute(key)
  }

  measureInstanceViewportBox = createBox

  scrapeMotionValuesFromProps(
    props: MotionProps,
    prevProps: MotionProps,
    visualElement: VisualElement
  ) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement)
  }

  build(
    renderState: SVGRenderState,
    latestValues: ResolvedValues,
    props: MotionProps
  ) {
    buildSVGAttrs(
      renderState,
      latestValues,
      this.isSVGTag,
      props.transformTemplate
    )
  }

  renderInstance(
    instance: SVGElement,
    renderState: SVGRenderState,
    styleProp?: MotionStyle | undefined,
    projection?: IProjectionNode<unknown> | undefined
  ): void {
    renderSVG(instance, renderState, styleProp, projection)
  }

  mount(instance: SVGElement) {
    this.isSVGTag = isSVGTag(instance.tagName)
    super.mount(instance)
  }
}
