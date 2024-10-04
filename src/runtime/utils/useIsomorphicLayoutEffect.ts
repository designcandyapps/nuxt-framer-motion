import { useEffect } from '#motion/react/useEffect'
import { useLayoutEffect } from '#motion/react/useLayoutEffect'
import { isBrowser } from './isBrowser'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
