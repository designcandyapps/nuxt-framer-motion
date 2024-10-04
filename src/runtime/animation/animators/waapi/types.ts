import type { Easing } from '#motion/easing/types'

export interface NativeAnimationOptions {
  delay?: number
  duration?: number
  ease?: Easing | Easing[]
  times?: number[]
  repeat?: number
  repeatType?: 'loop' | 'reverse' | 'mirror'
}
