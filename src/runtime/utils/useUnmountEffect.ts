import { useEffect } from '#motion/composables/useEffect'

export function useUnmountEffect(callback: () => void) {
  return useEffect(() => () => callback(), [])
}
