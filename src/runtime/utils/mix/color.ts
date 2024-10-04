import { mixNumber } from '#motion/utils/mix/number'
import { warning } from '#motion/utils/errors'
import { hslaToRgba } from '#motion/utils/hslaToRgba'
import { hex } from '#motion/value/types/color/hex'
import { rgba } from '#motion/value/types/color/rgba'
import { hsla } from '#motion/value/types/color/hsla'
import type { Color, HSLA, RGBA } from '#motion/value/types/types'
import { mixImmediate } from '#motion/utils/mix/immediate'

// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
export const mixLinearColor = (from: number, to: number, v: number) => {
  const fromExpo = from * from
  const expo = v * (to * to - fromExpo) + fromExpo
  return expo < 0 ? 0 : Math.sqrt(expo)
}

const colorTypes = [hex, rgba, hsla]
const getColorType = (v: Color | string) =>
  colorTypes.find(type => type.test(v))

function asRGBA(color: Color | string) {
  const type = getColorType(color)

  warning(
    Boolean(type),
    `'${color}' is not an animatable color. Use the equivalent color code instead.`
  )

  if (!type) return false

  let model = type!.parse(color)

  if (type === hsla) {
    // TODO Remove this cast - needed since Framer Motion's stricter typing
    model = hslaToRgba(model as HSLA)
  }

  return model as RGBA
}

export const mixColor = (from: Color | string, to: Color | string) => {
  const fromRGBA = asRGBA(from)
  const toRGBA = asRGBA(to)

  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to)
  }

  const blended = { ...fromRGBA }

  return (v: number) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v)
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v)
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v)
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v)
    return rgba.transform!(blended)
  }
}
