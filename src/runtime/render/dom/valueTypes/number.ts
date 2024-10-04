import { browserNumberValueTypes } from '#motion/render/dom/valueTypes/numberBrowser'
import { transformValueTypes } from '#motion/render/dom/valueTypes/transform'
import { int } from '#motion/render/dom/valueTypes/typeInt'
import { alpha } from '#motion/value/types/numbers'
import { px } from '#motion/value/types/numbers/units'
import type { ValueTypeMap } from '#motion/render/dom/valueTypes/types'

export const numberValueTypes: ValueTypeMap = {
  ...browserNumberValueTypes,
  ...transformValueTypes,
  zIndex: int,
  size: px,

  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
}
