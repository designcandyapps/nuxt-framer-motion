import { createSmartKey } from '#motion/react/smartIP'
import type { NodeGroup } from '#motion/projection/node/group'

export interface LayoutGroupContextProps {
  id?: string
  group?: NodeGroup
  forceRender?: VoidFunction
}

export const IKLayoutGroupContext = createSmartKey<LayoutGroupContextProps>(
  'IKLayoutGroupContextProps',
  {}
)
