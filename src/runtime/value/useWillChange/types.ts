import type { MotionValue } from '#motion/value'

export interface WillChange extends MotionValue {
  add(name: string): void
}
