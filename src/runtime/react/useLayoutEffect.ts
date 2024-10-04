import type { DependencyList, EffectCallback } from '#motion/html'
import { flushEffects, queueLayoutEffect } from '#motion/react/effectQueue'

export function useLayoutEffect(effect: EffectCallback, deps: DependencyList = []) {
  let cleanup

  function runEffect() {
    queueLayoutEffect(() => {
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

  onBeforeUnmount(() => {
    if (cleanup) {
      cleanup()
    }
  })

  if (deps.length > 0) {
    watch(deps, () => {
      runEffect()
      flushEffects()
    }, { flush: 'post' })
  }
}
