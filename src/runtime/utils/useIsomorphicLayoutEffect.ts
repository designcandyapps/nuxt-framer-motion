import { useEffect } from '#motion/composables/useEffect'
import { useLayoutEffect } from '#motion/composables/useLayoutEffect'
import { isBrowser } from './isBrowser'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
