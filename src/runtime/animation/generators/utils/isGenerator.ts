import type { AnimationGeneratorType, GeneratorFactory } from '#motion/animation/types'

export function isGenerator(
  type?: AnimationGeneratorType
): type is GeneratorFactory {
  return typeof type === 'function'
}
