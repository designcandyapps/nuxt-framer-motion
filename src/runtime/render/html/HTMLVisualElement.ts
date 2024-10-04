import type { MotionConfigContext } from '#motion/context/MotionConfigContext'
import type { Box } from '#motion/projection/geometry/types'
import { measureViewportBox } from '#motion/projection/utils/measure'
import type { HTMLRenderState } from '#motion/render/html/types'
import type { DOMVisualElementOptions } from '#motion/render/dom/types'
import { buildHTMLStyles } from '#motion/render/html/utils/buildStyles'
import { isCSSVariableName } from '#motion/render/dom/utils/isCSSVariable'
import { transformProps } from '#motion/render/html/utils/transform'
import { scrapeMotionValuesFromProps } from '#motion/render/html/utils/scrapeMotionValues'
import { renderHTML } from '#motion/render/html/utils/render'
import { getDefaultValueType } from '#motion/render/dom/valueTypes/defaults'
import type { MotionProps } from '#motion/motion/types'
import { DOMVisualElement } from '../dom'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import type { ResolvedValues } from '#motion/render/types'
import type { VisualElement } from '#motion/render/VisualElement'

export function getComputedStyle(element: HTMLElement) {
  return window.getComputedStyle(element)
}

export class HTMLVisualElement extends DOMVisualElement<
  HTMLElement,
  HTMLRenderState,
  DOMVisualElementOptions
> {
  type = 'html'

  applyWillChange = true

  readValueFromInstance(
    instance: HTMLElement,
    key: string
  ): string | number | null | undefined {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key)
      return defaultType ? defaultType.default || 0 : 0
    } else {
      const computedStyle = getComputedStyle(instance)
      const value
        = (isCSSVariableName(key)
          ? computedStyle.getPropertyValue(key)
          : computedStyle[key as keyof typeof computedStyle]) || 0

      return typeof value === 'string' ? value.trim() : (value as number)
    }
  }

  measureInstanceViewportBox(
    instance: HTMLElement,
    { transformPagePoint }: MotionProps & Partial<MotionConfigContext>
  ): Box {
    return measureViewportBox(instance, transformPagePoint)
  }

  build(
    renderState: HTMLRenderState,
    latestValues: ResolvedValues,
    props: MotionProps
  ) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate)
  }

  scrapeMotionValuesFromProps(
    props: MotionProps,
    prevProps: MotionProps,
    visualElement: VisualElement
  ) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement)
  }

  childSubscription?: VoidFunction
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription()
      delete this.childSubscription
    }

    const { children } = this.props
    if (isMotionValue(children)) {
      this.childSubscription = children.on('change', (latest) => {
        if (this.current) this.current.textContent = `${latest}`
      })
    }
  }

  renderInstance = renderHTML
}
