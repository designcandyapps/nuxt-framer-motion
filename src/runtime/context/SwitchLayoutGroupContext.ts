import type { IProjectionNode } from '#motion/projection/node/types'
import { createSmartKey } from '#motion/react/smartIP'
import type { Transition } from '#motion/types'

export interface SwitchLayoutGroup {
  register?: (member: IProjectionNode) => void
  deregister?: (member: IProjectionNode) => void
}

export type SwitchLayoutGroupContext = SwitchLayoutGroup & InitialPromotionConfig

export type InitialPromotionConfig = {
  /**
   * The initial transition to use when the elements in this group mount (and automatically promoted).
   * Subsequent updates should provide a transition in the promote method.
   */
  transition?: Transition
  /**
   * If the follow tree should preserve its opacity when the lead is promoted on mount
   */
  shouldPreserveFollowOpacity?: (member: IProjectionNode) => boolean
}

export const IKSwitchLayoutGroupContext = createSmartKey<SwitchLayoutGroupContext>(
  'IKSwitchLayoutGroupContext',
  {}
)
