import type { VueHTML } from '#motion/html'
import type { MotionProps } from '#motion/motion/types'
import type { HTMLElements } from '#motion/render/html/supportedElements'
import type { DefineComponent, HTMLAttributes } from 'vue'
import type { ResolvedValues } from '../types'

export interface TransformOrigin {
  originX?: number | string
  originY?: number | string
  originZ?: number | string
}

export interface HTMLRenderState {
  /**
   * A mutable record of transforms we want to apply directly to the rendered Element
   * every frame. We use a mutable data structure to reduce GC during animations.
   */
  transform: ResolvedValues

  /**
   * A mutable record of transform origins we want to apply directly to the rendered Element
   * every frame. We use a mutable data structure to reduce GC during animations.
   */
  transformOrigin: TransformOrigin

  /**
   * A mutable record of styles we want to apply directly to the rendered Element
   * every frame. We use a mutable data structure to reduce GC during animations.
   */
  style: ResolvedValues

  /**
   * A mutable record of CSS variables we want to apply directly to the rendered Element
   * every frame. We use a mutable data structure to reduce GC during animations.
   */
  vars: ResolvedValues
}

/**
 * Support for React component props
 */
export type UnwrapFactoryAttributes<F> = F extends (props: infer P) => any ? P : never
export type UnwrapFactoryElement<F> = F extends (props: infer P) => any ? P : never

type HTMLAttributesWithoutMotionProps<
  Attributes extends HTMLAttributes<Element>,
  Element extends HTMLElement
> = { [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K] }

/**
 * @public
 */
export type HTMLMotionProps<TagName extends keyof VueHTML> =
  HTMLAttributesWithoutMotionProps<
    UnwrapFactoryAttributes<VueHTML[TagName]>,
    UnwrapFactoryElement<VueHTML[TagName]>
  > & MotionProps

/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
export type HTMLMotionComponents = {
  [K in HTMLElements]: DefineComponent<
    UnwrapFactoryElement<ReactHTML[K]>,
    HTMLMotionProps<K>
  >
}
