import type { MotionValue } from '#motion/value/index'
import { collectMotionValues } from '#motion/value/index'
import { useCombineMotionValues } from '#motion/value/useCombineValues'

export function useMotionComputed<O>(compute: () => O): MotionValue<O> {
  /**
   * Open session of collectMotionValues. Any MotionValue that calls get()
   * will be saved into this array.
   */
  collectMotionValues.current = []

  compute()

  const value = useCombineMotionValues(collectMotionValues.current, compute)

  /**
   * Synchronously close session of collectMotionValues.
   */
  collectMotionValues.current = undefined

  return value
}
