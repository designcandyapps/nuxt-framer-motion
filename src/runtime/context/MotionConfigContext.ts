import type { TransformPoint } from '#motion/projection/geometry/types'
import type { Transition } from '#motion/types'
import type { InjectionKey } from '@vue/runtime-core'

export type ReducedMotionConfig = 'always' | 'never' | 'user'

/**
 * @public
 */
export interface MotionConfigContext {
  /**
   * Internal, exported only for usage in Framer
   */
  transformPagePoint: TransformPoint

  /**
   * Internal. Determines whether this is a static context ie the Framer canvas. If so,
   * it'll disable all dynamic functionality.
   */
  isStatic: boolean

  /**
   * Defines a new default transition for the entire tree.
   *
   * @public
   */
  transition?: Transition

  /**
   * If true, will respect the device prefersReducedMotion setting by switching
   * transform animations off.
   *
   * @public
   */
  reducedMotion?: ReducedMotionConfig

  /**
   * A custom `nonce` attribute used when wanting to enforce a Content Security Policy (CSP).
   * For more details see:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#unsafe_inline_styles
   *
   * @public
   */
  nonce?: string
}

export const IKMotionConfigContext: InjectionKey<MotionConfigContext> = Symbol('IKMotionConfigContext')
export const motionConfigContextDefault = {
  transformPagePoint: p => p,
  isStatic: false,
  reducedMotion: 'never'
}
