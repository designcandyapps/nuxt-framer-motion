import { useAnimationFrame } from '#motion/utils/useAnimationFrame'
import { useMotionValue } from '#motion/value/useMotionValue'

export function useTime() {
  const time = useMotionValue(0)
  useAnimationFrame(t => time.set(t))
  return time
}
