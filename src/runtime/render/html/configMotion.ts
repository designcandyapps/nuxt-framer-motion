import type { MotionComponentConfig } from '#motion/motion'
import { makeUseVisualState } from '#motion/motion/utils/useVisualState'
import type { HTMLRenderState } from '#motion/render/html/types'
import { scrapeMotionValuesFromProps } from '#motion/render/html/utils/scrapeMotionValues'
import { createHtmlRenderState } from '#motion/render/html/utils/createRenderState'

export const htmlMotionConfig: Partial<
  MotionComponentConfig<HTMLElement, HTMLRenderState>
> = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
}
