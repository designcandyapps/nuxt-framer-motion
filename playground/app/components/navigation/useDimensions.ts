// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
import { useEffect } from '#motion/react/useEffect'

export const useDimensions = (ref) => {
  const dimensions = reactive({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.width = ref.value.offsetWidth
    dimensions.height = ref.value.offsetHeight
  }, [])

  return dimensions
}
