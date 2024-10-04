import { clamp } from '#motion/utils/clamp'
import { alpha as alphaType, number } from '#motion/value/types/numbers'
import type { RGBA } from '#motion/value/types/types'
import { sanitize } from '#motion/value/types/utils/sanitize'
import { isColorString, splitColor } from '#motion/value/types/color/utils'

const clampRgbUnit = (v: number) => clamp(0, 255, v)
export const rgbUnit = {
  ...number,
  transform: (v: number) => Math.round(clampRgbUnit(v))
}

export const rgba = {
  test: /* @__PURE__ */ isColorString('rgb', 'red'),
  parse: /* @__PURE__ */ splitColor<RGBA>('red', 'green', 'blue'),
  transform: ({ red, green, blue, alpha = 1 }: RGBA) =>
    'rgba('
    + rgbUnit.transform(red)
    + ', '
    + rgbUnit.transform(green)
    + ', '
    + rgbUnit.transform(blue)
    + ', '
    + sanitize(alphaType.transform(alpha))
    + ')'
}
