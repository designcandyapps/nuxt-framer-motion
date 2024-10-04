import type { VariantLabels } from '#motion/motion/types'
import type { TargetAndTransition } from '#motion/types'
import type { Ref } from 'vue'

export type ViewportEventHandler = (
  entry: IntersectionObserverEntry | null
) => void

export interface ViewportOptions {
  root?: Ref<Element>
  once?: boolean
  margin?: string
  amount?: 'some' | 'all' | number
}

export interface ViewportProps {
  whileInView?: VariantLabels | TargetAndTransition
  onViewportEnter?: ViewportEventHandler
  onViewportLeave?: ViewportEventHandler
  viewport?: ViewportOptions
}

export type ViewportState = {
  hasEnteredView: boolean
  isInView: boolean
}
