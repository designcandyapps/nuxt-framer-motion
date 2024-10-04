import type { MotionValue } from '#motion/value'
import { isCustomValue } from '#motion/utils/resolveValue'
import type { CustomValueType } from '#motion/types'
import { isMotionValue } from '#motion/value/utils/isMotionValue'

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */
export function resolveMotionValue(
  value?: string | number | CustomValueType | MotionValue
): string | number {
  const unwrappedValue = isMotionValue(value) ? value.get() : value
  return isCustomValue(unwrappedValue)
    ? unwrappedValue.toValue()
    : unwrappedValue
}
