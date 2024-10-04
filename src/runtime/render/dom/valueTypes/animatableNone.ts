import { complex } from '#motion/value/types/complex'
import { filter } from '#motion/value/types/complex/filter'

export function getAnimatableNone(key: string, value: string) {
  let defaultValueType = getDefaultValueType(key)
  if (defaultValueType !== filter) defaultValueType = complex
  // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
  return defaultValueType.getAnimatableNone
    ? defaultValueType.getAnimatableNone(value)
    : undefined
}
