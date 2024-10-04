import type { DependencyList, EffectCallback } from '#motion/html'
import { flushEffects, queueEffect } from '#motion/react/effectQueue'

export function useEffect(effect: EffectCallback, deps: DependencyList = []) {
  let cleanup

  function runEffect() {
    queueEffect(() => {
      if (cleanup) {
        cleanup()
        cleanup = null
      }
      cleanup = effect()
    })
  }

  onMounted(() => {
    runEffect()
    flushEffects()
  })

  onUpdated(() => {
    runEffect()
    flushEffects()
  })

  onBeforeUnmount(() => {
    if (cleanup) {
      cleanup()
    }
  })

  if (deps.length > 0) {
    watch(deps, () => {
      runEffect()
      flushEffects()
    })
  }
}
