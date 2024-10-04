import { wrap } from '#motion/utils/wrap'
import type { Easing } from '#motion/easing/types'
import { isEasingArray } from '#motion/easing/utils/isEasingArray'

export function getEasingForSegment(
  easing: Easing | Easing[],
  i: number
): Easing {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing
}
