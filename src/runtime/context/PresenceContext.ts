import { createSmartKey } from '#motion/react/smartIP'
import type { VariantLabels } from '#motion/motion/types'

/**
 * @public
 */
export interface PresenceContextProps {
  id: string
  isPresent: boolean
  register: (id: string | number) => () => void
  onExitComplete?: (id: string | number) => void
  initial?: false | VariantLabels
  custom?: any
}

export const IKPresenceContext = createSmartKey<PresenceContextProps>(
  'IKPresenceContext',
  null
)
