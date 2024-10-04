import type { CreateVisualElement } from '#motion/render/types'
import type { InjectionKey } from 'vue'

export interface LazyContextProps {
  renderer?: CreateVisualElement<any>
  strict: boolean
}

export const IKLazyContext: InjectionKey<LazyContextProps> = Symbol('IKLazyContext')
