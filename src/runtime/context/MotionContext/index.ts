import { createSmartKey } from '#motion/react/smartIP'
import type { VisualElement } from '#motion/render/VisualElement'

export interface MotionContextProps<Instance = unknown> {
  visualElement?: VisualElement<Instance>
  initial?: false | string | string[]
  animate?: string | string[]
}

export const IKMotionContext = createSmartKey<MotionContextProps>(
  'IKMotionContext',
  {}
)
