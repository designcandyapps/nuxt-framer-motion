import { createHtmlRenderState } from '#motion/render/html/utils/createRenderState'
import type { SVGRenderState } from '#motion/render/svg/types'

export const createSvgRenderState = (): SVGRenderState => ({
  ...createHtmlRenderState(),
  attrs: {}
})
