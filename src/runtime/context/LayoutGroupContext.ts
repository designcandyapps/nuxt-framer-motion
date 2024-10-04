import type { InjectionKey } from 'vue'
import type { NodeGroup } from '#motion/projection/node/group'

export interface LayoutGroupContextProps {
  id?: string
  group?: NodeGroup
  forceRender?: VoidFunction
}

export const IKLayoutGroupContext: InjectionKey<LayoutGroupContextProps> = Symbol('IKLayoutGroupContextProps')
