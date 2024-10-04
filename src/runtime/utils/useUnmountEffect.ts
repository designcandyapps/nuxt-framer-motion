import { useEffect } from '#motion/react/useEffect'

export function useUnmountEffect(callback: () => void) {
  return useEffect(() => () => callback(), [])
}
