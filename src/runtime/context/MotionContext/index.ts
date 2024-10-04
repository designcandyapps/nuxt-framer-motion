import type { VisualElement } from '#motion/render/VisualElement'
import type { InjectionKey } from 'vue'

export interface MotionContextProps<Instance = unknown> {
  visualElement?: VisualElement<Instance>
  initial?: false | string | string[]
  animate?: string | string[]
}

export const IKMotionContext: InjectionKey<MotionContextProps> = Symbol('IKMotionContext')
