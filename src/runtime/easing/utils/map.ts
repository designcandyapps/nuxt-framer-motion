import { invariant } from '#motion/utils/errors'
import { cubicBezier } from '#motion/easing/cubic-bezier'
import { noop } from '#motion/utils/noop'
import { easeIn, easeInOut, easeOut } from '#motion/easing/ease'
import { circIn, circInOut, circOut } from '#motion/easing/circ'
import { backIn, backInOut, backOut } from '#motion/easing/back'
import { anticipate } from '#motion/easing/anticipate'
import type { Easing } from '#motion/easing/types'

const easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
}

export const easingDefinitionToFunction = (definition: Easing) => {
  if (Array.isArray(definition)) {
    // If cubic bezier definition, create bezier curve
    invariant(
      definition.length === 4,
      `Cubic bezier arrays must contain four numerical values.`
    )

    const [x1, y1, x2, y2] = definition
    return cubicBezier(x1, y1, x2, y2)
  } else if (typeof definition === 'string') {
    // Else lookup from table
    invariant(
      easingLookup[definition] !== undefined,
      `Invalid easing type '${definition}'`
    )
    return easingLookup[definition]
  }

  return definition
}
