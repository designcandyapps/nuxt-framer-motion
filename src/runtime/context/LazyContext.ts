import { createSmartKey } from '#motion/react/smartIP'
import type { CreateVisualElement } from '#motion/render/types'

export interface LazyContextProps {
  renderer?: CreateVisualElement<any>
  strict: boolean
}

export const IKLazyContext = createSmartKey<LazyContextProps>(
  'IKLazyContext',
  {}
)
