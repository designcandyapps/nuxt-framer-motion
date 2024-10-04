import { useConstant } from '#motion/utils/useConstant'
import { WillChangeMotionValue } from '#motion/value/useWillChange/WillChangeMotionValue'
import type { WillChange } from '#motion/value/useWillChange/types'

export function useWillChange(): WillChange {
  return useConstant(() => new WillChangeMotionValue('auto'))
}
