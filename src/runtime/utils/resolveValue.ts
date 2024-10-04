import { isKeyframesTarget } from '#motion/animation/utils/isKeyframesTarget'
import type { CustomValueType, SingleTarget, ValueTarget } from '#motion/types'

export const isCustomValue = (v: any): v is CustomValueType => {
  return Boolean(v && typeof v === 'object' && v.mix && v.toValue)
}

export const resolveFinalValueInKeyframes = (v: ValueTarget): SingleTarget => {
  // TODO maybe throw if v.length - 1 is placeholder token?
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v
}
