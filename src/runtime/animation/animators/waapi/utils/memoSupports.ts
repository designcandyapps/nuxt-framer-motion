import { supportsFlags } from '#motion/animation/animators/waapi/utils/supportsFlags'
import { memo } from '#motion/utils/memo'

export function memoSupports<T extends any>(
  callback: () => T,
  supportsFlag: keyof typeof supportsFlags
) {
  const memoized = memo(callback)
  return () => supportsFlags[supportsFlag] ?? memoized()
}
