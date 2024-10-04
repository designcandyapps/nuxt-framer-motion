import type { AnimationType } from '#motion/render/utils/types'

export const variantPriorityOrder: AnimationType[] = [
  'animate',
  'whileInView',
  'whileFocus',
  'whileHover',
  'whileTap',
  'whileDrag',
  'exit'
]

export const variantProps = ['initial', ...variantPriorityOrder]
