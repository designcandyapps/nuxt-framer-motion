import { isMotionValue } from '#motion/value/utils/isMotionValue'
import type { WillChange } from '#motion/value/useWillChange/types'

export function isWillChangeMotionValue(value: any): value is WillChange {
  return Boolean(isMotionValue(value) && (value as WillChange).add)
}
