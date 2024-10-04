import { isBrowser } from '#motion/utils/isBrowser'
import { hasReducedMotionListener, prefersReducedMotion } from '#motion/utils/reducedMotion/state'

export function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true
  if (!isBrowser) return

  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion)')

    const setReducedMotionPreferences = () =>
      (prefersReducedMotion.current = motionMediaQuery.matches)

    motionMediaQuery.addListener(setReducedMotionPreferences)

    setReducedMotionPreferences()
  } else {
    prefersReducedMotion.current = false
  }
}
