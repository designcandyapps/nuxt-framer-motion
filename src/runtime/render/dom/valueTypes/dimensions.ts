import { number } from '#motion/value/types/numbers'
import {
  degrees,
  percent,
  px,
  vh,
  vw
} from '#motion/value/types/numbers/units'
import { testValueType } from '#motion/render/dom/valueTypes/test'
import { auto } from '#motion/render/dom/valueTypes/typeAuto'

/**
 * A list of value types commonly used for dimensions
 */
export const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto]

/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
export const findDimensionValueType = (v: any) =>
  dimensionValueTypes.find(testValueType(v))
