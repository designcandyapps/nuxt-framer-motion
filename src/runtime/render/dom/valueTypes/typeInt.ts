import { number } from '#motion/value/types/numbers'

export const int = {
  ...number,
  transform: Math.round
}
