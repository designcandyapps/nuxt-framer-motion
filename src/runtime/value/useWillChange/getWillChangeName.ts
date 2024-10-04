import { acceleratedValues } from '#motion/animation/animators/utils/acceleratedValues'
import { camelToDash } from '#motion/render/dom/utils/camelToDash'
import { transformProps } from '#motion/render/html/utils/transform'

export function getWillChangeName(name: string): string | undefined {
  if (transformProps.has(name)) {
    return 'transform'
  } else if (acceleratedValues.has(name)) {
    return camelToDash(name)
  }
}
