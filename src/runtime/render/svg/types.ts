import type { MakeMotion, MotionProps } from '#motion/motion/types'
import type { HTMLRenderState } from '#motion/render/html/types'
import type { ResolvedValues } from '#motion/render/types'
import type { SVGAttributes } from 'vue'

export interface SVGRenderState extends HTMLRenderState {
  /**
   * Measured dimensions of the SVG element to be used to calculate a transform-origin.
   */
  dimensions?: SVGDimensions

  /**
   * A mutable record of attributes we want to apply directly to the rendered Element
   * every frame. We use a mutable data structure to reduce GC during animations.
   */
  attrs: ResolvedValues
}

export type SVGDimensions = {
  x: number
  y: number
  width: number
  height: number
}

interface SVGAttributesWithoutMotionProps<T>
  extends Pick<
    SVGAttributes<T>,
    Exclude<keyof SVGAttributes<T>, keyof MotionProps>
  > {}

/**
 * Blanket-accept any SVG attribute as a `MotionValue`
 * @public
 */
export type SVGAttributesAsMotionValues<T> = MakeMotion<
  SVGAttributesWithoutMotionProps<T>
>

/**
 * @public
 */
export interface SVGMotionProps<T>
  extends SVGAttributesAsMotionValues<T>,
  MotionProps {}
