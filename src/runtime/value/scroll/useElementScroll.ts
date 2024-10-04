import type { Ref } from 'vue'
import { warnOnce } from '#motion/utils/warnOnce'
import { useScroll } from '#motion/value/useScroll'

/**
 * @deprecated useElementScroll is deprecated. Convert to useScroll({ container: ref })
 */
export function useElementScroll(ref: Ref<HTMLElement>) {
  if (process.env.NODE_ENV === 'development') {
    warnOnce(
      false,
      'useElementScroll is deprecated. Convert to useScroll({ container: ref }).'
    )
  }

  return useScroll({ container: ref })
}
