import { color } from '#motion/value/types/color'
import { complex } from '#motion/value/types/complex'
import { dimensionValueTypes } from './dimensions'
import { testValueType } from './test'

/**
 * A list of all ValueTypes
 */
const valueTypes = [...dimensionValueTypes, color, complex]

/**
 * Tests a value against the list of ValueTypes
 */
export const findValueType = (v: any) => valueTypes.find(testValueType(v))
