import type { MotionProps } from '#motion/motion/types'

export function checkShouldInheritVariant({
  animate,
  variants,
  inherit
}: MotionProps): boolean {
  return inherit !== undefined ? inherit : !!variants && !animate
}
