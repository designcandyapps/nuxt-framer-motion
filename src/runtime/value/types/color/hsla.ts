import { alpha as alphaType } from '#motion/value/types/numbers'
import { percent } from '#motion/value/types/numbers/units'
import type { HSLA } from '#motion/value/types/types'
import { sanitize } from '#motion/value/types/utils/sanitize'
import { isColorString, splitColor } from '#motion/value/types/color/utils'

export const hsla = {
  test: /* @__PURE__ */ isColorString('hsl', 'hue'),
  parse: /* @__PURE__ */ splitColor<HSLA>('hue', 'saturation', 'lightness'),
  transform: ({ hue, saturation, lightness, alpha = 1 }: HSLA) => {
    return (
      'hsla('
      + Math.round(hue)
      + ', '
      + percent.transform(sanitize(saturation))
      + ', '
      + percent.transform(sanitize(lightness))
      + ', '
      + sanitize(alphaType.transform(alpha))
      + ')'
    )
  }
}
