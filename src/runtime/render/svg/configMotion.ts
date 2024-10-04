import { frame } from '#motion/frameloop'
import type { MotionComponentConfig } from '#motion/motion'
import { makeUseVisualState } from '#motion/motion/utils/useVisualState'
import { scrapeMotionValuesFromProps as scrapeSVGProps } from '#motion/render/html/utils/scrapeMotionValues'
import type { SVGRenderState } from '#motion/render/svg/types'
import { buildSVGAttrs } from '#motion/render/svg/utils/buildAttrs'
import { createSvgRenderState } from '#motion/render/svg/utils/createRenderState'
import { isSVGTag } from '#motion/render/svg/utils/isSvgTag'
import { renderSVG } from '#motion/render/svg/utils/render'

export const svgMotionConfig: Partial<
  MotionComponentConfig<SVGElement, SVGRenderState>
> = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeSVGProps,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      frame.read(() => {
        try {
          renderState.dimensions
            = typeof (instance as SVGGraphicsElement).getBBox
            === 'function'
              ? (instance as SVGGraphicsElement).getBBox()
              : (instance.getBoundingClientRect() as DOMRect)
        } catch (e) {
          // Most likely trying to measure an unrendered element under Firefox
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        }
      })

      frame.render(() => {
        buildSVGAttrs(
          renderState,
          latestValues,
          isSVGTag(instance.tagName),
          props.transformTemplate
        )

        renderSVG(instance, renderState)
      })
    }
  })
}
